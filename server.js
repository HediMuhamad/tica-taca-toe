import http from "http";
import express from "express";
import next from "next";
import { Server } from "socket.io";
import dotenv from 'dotenv';
import log from "./utils/log.js";

import { ACTIONS, LOG } from "./utils/enums.js"

dotenv.config();

const PORT = process.env.PORT || 6000;
const URL = process.env.URL || "http://localhost:6000/"
const IS_DEV_ENV = process.env.NODE_ENV !== "production";

const nextApp = next({port: PORT, dev: IS_DEV_ENV});
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: URL,
		methods: [ "GET", "POST" ]
	},
});

const handle = nextApp.getRequestHandler();

const limit = 99999;

const users = [];
const rooms = [];

//Utils
function getRandomId(){
	let currentId;
	do{
		currentId = Math.random()*limit;
	}while(users.includes(currentId));
	return parseInt(currentId);
}


//User Functions
function createNewUser(socket){
	
	const user = {
		userId: getRandomId(),
		id: socket.id,
		markerType: undefined,
		isIdle: true,
		socket: socket,
	}
	
	users.push(user);

	log("SERVER", LOG.USER_CREATION, {id: socket.id});
	
	return user;
}

function getUserIndex(userId){
	return users.findIndex((user)=>user.userId===userId)
}

function getUser(index){
	index===-1 ? null : users[userIndex];
}

function getIdleUser(expectUserId){
	let idleUser = users.find((user)=>(user.userId!==expectUserId && user.isIdle===true));
	return idleUser;
}

function deleteExistUser(userId){
	const user = getUserIndex(userId);
	users.splice(user, 1);

	log("SERVER", LOG.USER_DELETION, {userId});
}


//Room Functions
function createNewRoom(xGamer, oGamer){

	const roomId = `${xGamer.userId}_${oGamer.userId}`

	log("SERVER", LOG.ROOM_CREATION, {xGamer: xGamer.userId, oGamer: oGamer.userId, roomId})
	
	xGamer.socket.join(roomId);
	oGamer.socket.join(roomId);

	xGamer.isIdle = false;
	oGamer.isIdle = false;

	const room = {
		roomId: roomId,
		xRole: xGamer,
		oRole: oGamer,
		tableCells: new Array(9),
		xWins: 0,
		oWins: 0,
		draws: 0,
	}

	rooms.push(room);

	return room;
}

function getRoomIndex(gamerId){
	const foundGameIndex = rooms.findIndex((room)=>(room.xRole.userId===gamerId || room.oRole.userId===gamerId));
	return foundGameIndex;
}

function getRoom(index){
	return index===-1 ? null : rooms[index];
}

function deleteExistRoom(gamerId){
	const roomIndex = getRoomIndex(gamerId);
	if(roomIndex===-1){
		return;
	}
	const {xRole, oRole, roomId} = getRoom(roomIndex);
	xRole.socket.leave(roomId);
	xRole.markerType = undefined;
	oRole.socket.leave(roomId);
	oRole.markerType = undefined;
	rooms.splice(roomIndex);

	log("SERVER", LOG.ROOM_DELETION, {xRole: xRole.userId, oRole: oRole.userId, roomId});
}


//Playing Functions
function playWithFriend(friendId, user){

	log("SERVER", LOG.PROCESSING_PLAY_WITH_FRIEND_REQUEST, {friendId, userId: user.userId})

	const response = {};

	if(user.userId===friendId){
		response.errorCode = "#Vu1UVB"
		log("SERVER", LOG.FAILED_PLAY_WITH_FRIEND_REQUEST,
			{errCode: response.errorCode, errMsg: `#${friendId} is the same as user user-id.`});
		return response
	}

	const hostileIndex = getUserIndex(friendId);
	const hostileUser = getUser(hostileIndex);

	
	if(hostileIndex===-1){
		response.errorCode = "#OEJLG3";
		log("SERVER", LOG.FAILED_PLAY_WITH_FRIEND_REQUEST,
			{errCode: response.errorCode, errMsg: `#${friendId} isn't online.`});
	}
	else if(!hostileUser.isIdle){
		response.errorCode = "#wMFcPh"	
		log("SERVER", LOG.FAILED_PLAY_WITH_FRIEND_REQUEST,
			{errCode: response.errorCode, errMsg: `#${friendId} is in another room.`});
	}else{
		
		Math.random()>=0.5 ? 
			(hostileUser.markerType="O", user.markerType="X") :
			(hostileUser.markerType="X", user.markerType="O") ;

		const { roomId } = hostileUser.markerType==="X" ? createNewRoom(hostileUser, user) : createNewRoom(user, hostileUser);
		
		response.processCode = "#Czw1rU";
		response.roomId = roomId;
		response.users = {
			[user.userId] : user.markerType,
			[hostileUser.userId] : hostileUser.markerType
		}
		
		log("SERVER", LOG.SUCCEEDED_PLAY_WITH_FRIEND_REQUEST,
			{prsCode: response.processCode, prsMsg: `Game started with #${friendId} in room #${roomId}.`});
	}

	return response;
}

function playWithStranger(user){

	log("SERVER", LOG.PROCESSING_PLAY_WITH_STRANGER_REQUEST, {userId: user.userId})

	const response = {};
	
	const hostileUser = getIdleUser(user.userId);

	if(users.length===0){
		response.errorCode = "#1Gi1tW";
		log("SERVER", LOG.FAILED_PLAY_WITH_STRANGER_REQUEST,
			{errCode: response.errorCode, errMsg: `No online player found.`});
	}
	else if(!hostileUser){
		response.errorCode = "#mgu7YQ"
		log("SERVER", LOG.FAILED_PLAY_WITH_STRANGER_REQUEST,
			{errCode: response.errorCode, errMsg: `No idle player found.`});
	}
	else{
		Math.random()>=0.5 ? 
		(hostileUser.markerType="O", user.markerType="X") :
		(hostileUser.markerType="X", user.markerType="O") ;

		const { roomId } = hostileUser.markerType==="X" ? createNewRoom(hostileUser, user) : createNewRoom(user, hostileUser);

		response.processCode = "#14LqCt";
		response.roomId = roomId;
		response.users = {
			[user.userId] : user.markerType,
			[hostileUser.userId] : hostileUser.markerType
		}

		log("SERVER", LOG.SUCCEEDED_PLAY_WITH_STRANGER_REQUEST,
			{prsCode: response.processCode, prsMsg: `Game started with #${hostileUser.id} in room #${roomId}.`});

	}

	return response;
}

//Backend Handlers
io.on(ACTIONS.CONNECTION, (socket)=>{
	log("SERVER", LOG.CONNECTION, {id: socket.id})
	
	const user = createNewUser(socket);
	const { userId } = user;

	socket.emit(ACTIONS.CONNECTION_RESPONSE, {userId})
	log("SERVER", LOG.CONNECTION_RESPONSE, {userId})

	socket.on(ACTIONS.NEW_ROOM_REQUEST, async (req)=>{
		
		const doesWantToPlayWithFriend = !!req && !!req.friendId;
		const friendId = doesWantToPlayWithFriend ? req.friendId : null

		const requestedGameType = doesWantToPlayWithFriend ? "play_with_friend" : "play_with_stranger";
		log("SERVER", LOG.NEW_ROOM_REQUEST, {friendId: friendId, requestedGameType})
		
		const response = doesWantToPlayWithFriend ? playWithFriend(friendId, user) : playWithStranger(user);

		const succeeded = !!response.processCode;
		
		if(!succeeded){
			socket.emit(ACTIONS.NEW_ROOM_RESPONSE, response);
			log("SERVER", LOG.NEW_ROOM_RESPONSE, response)
		}else{;
			io.in(response.roomId).emit(ACTIONS.NEW_ROOM_BROADCAST, response);
		}
		
	})

	socket.on(ACTIONS.LEAVE_ROOM_REQUEST, ()=>{
		deleteExistRoom(user.userId)
		log("SERVER", LOG.LEAVE_ROOM_REQUEST, {userId: user.userId, roomId: getRoom(getRoomIndex(user.userId)).roomId});
	})

	socket.on(ACTIONS.DISCONNECTION, ()=>{
		deleteExistRoom(user.userId);
		deleteExistUser(user.userId);
		log("SERVER", LOG.DISCONNECTION, {id: user.userId})
	})

})

nextApp.prepare().then(()=>{

	app.get("*", (req, res)=>{
		handle(req, res);
	})

	server.listen(PORT);

})