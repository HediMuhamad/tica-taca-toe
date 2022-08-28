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

const users = {};
const rooms = {};

//Utils
function getRandomId(){
	let currentId;
	do{
		currentId = Math.random()*limit;
	}while(Object.keys(users).includes(currentId));
	return parseInt(currentId);
}


//User Functions
function createNewUser(socket){
	
	const userId = getRandomId();
	socket.userId = userId;

	const user = {
		userId: userId,
		id: socket.id,
		markerType: undefined,
		isIdle: true,
		roomId: null,
		socket: socket,
	}
	
	users[userId] = user;

	log("SERVER", LOG.USER_CREATION, {id: socket.id});
	
	return user;
}

function getIdleUser(exceptUserId){
	let idleUser = null;
	for (let k of Object.keys(users)){
		if( k!=exceptUserId && users[k].isIdle===true){
			idleUser = users[k];
			break;
		}
	}
	return idleUser;
}

function deleteExistUser(userId){
	if(!users[userId]){
		log("SERVER", LOG.FAILED_USER_DELETION, {userId});
		return false;
	}

	delete users[userId];
	log("SERVER", LOG.USER_DELETION, {userId});
	return true;
}


//Room Functions
function createNewRoom(xGamer, oGamer){

	const roomId = `${xGamer.userId}_${oGamer.userId}`

	log("SERVER", LOG.ROOM_CREATION, {xGamer: xGamer.userId, oGamer: oGamer.userId, roomId})
	
	xGamer.socket.join(roomId);
	oGamer.socket.join(roomId);

	xGamer.roomId = roomId;
	oGamer.roomId = roomId;

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

	rooms[roomId] = room

	return room;
}

function deleteExistRoom(roomId){

	const room = rooms[roomId];

	if(!room){
		return;
	}

	const {xRole, oRole} = room;

	xRole.socket.leave(roomId);
	xRole.markerType = undefined;
	xRole.isIdle = true;
	xRole.roomId = null

	oRole.socket.leave(roomId);
	oRole.markerType = undefined;
	oRole.isIdle = true;
	oRole.roomId = null
	
	delete rooms[roomId];

	log("SERVER", LOG.ROOM_DELETION, {xRole: xRole.userId, oRole: oRole.userId, roomId});
}


//Playing Functions
function playWithFriend(friendId, user){

	log("SERVER", LOG.PROCESSING_PLAY_WITH_FRIEND_REQUEST, {friendId, userId: user.userId})

	const response = {};

	if(user.userId==friendId){
		response.errorCode = "#Vu1UVB"
		log("SERVER", LOG.FAILED_PLAY_WITH_FRIEND_REQUEST,
			{errCode: response.errorCode, errMsg: `#${friendId} is the same as user user-id.`});
		return response
	}

	const hostileUser = users[friendId];

	if(!hostileUser){
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
			(hostileUser.markerType="O", user.markerType="X"):
			(hostileUser.markerType="X", user.markerType="O");

		const { roomId } = hostileUser.markerType==="X" ? createNewRoom(hostileUser, user) : createNewRoom(user, hostileUser);

		response.processCode = "#Czw1rU";
		response.roomId = roomId;
		response.users = {
			[user.userId] : user.markerType,
			[friendId] : hostileUser.markerType
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

	socket.on(ACTIONS.NEW_ROOM_REQUEST, (req)=>{
		
		const doesWantToPlayWithFriend = !!req && !!req.friendId;
		const friendId = doesWantToPlayWithFriend ? req.friendId : null

		const requestedGameType = doesWantToPlayWithFriend ? "play_with_friend" : "play_with_stranger";
		log("SERVER", LOG.NEW_ROOM_REQUEST, {friendId: friendId, requestedGameType})
		
		const response = doesWantToPlayWithFriend ? playWithFriend(friendId, user) : playWithStranger(user);

		const succeeded = !!response.processCode;
		
		if(!succeeded){
			socket.emit(ACTIONS.NEW_ROOM_RESPONSE, response);
			log("SERVER", LOG.NEW_ROOM_RESPONSE, response);
		}else{
			io.in(response.roomId).emit(ACTIONS.NEW_ROOM_BROADCAST, response);
		}

	})
		
	socket.on(ACTIONS.LEAVE_ROOM_REQUEST, ()=>{
		log("SERVER", LOG.LEAVE_ROOM_REQUEST, {userId: user.userId, roomId: user.roomId});
		io.in(user.roomId).emit(ACTIONS.LEAVE_ROOM_BROADCAST);
		deleteExistRoom(user.roomId)
	})

	socket.on(ACTIONS.NEW_MOVE_REQUEST, (req)=>{
		log("SERVER", LOG.NEW_MOVE_REQUEST, {user: socket.userId, ...req});
		const index = req.index;
		const room = rooms[user.roomId];
		if(room && !room.tableCells[index]){
			const markerType = room.xRole.userId==socket.userId ? "X" : "O";
			room.tableCells[index]=markerType;
			
			const res = {index, markerType};
			io.in(user.roomId).emit(ACTIONS.NEW_MOVE_BROADCAST, res);
			log("SERVER", LOG.NEW_MOVE_BROADCAST, {user: socket.userId, ...res})
		}
	} )

	socket.on(ACTIONS.DISCONNECTION, ()=>{

		io.in(user.roomId).emit(ACTIONS.LEAVE_ROOM_BROADCAST);
		log("SERVER", LOG.LEAVE_ROOM_BROADCAST, rooms[user.roomId]);

		deleteExistRoom(user.roomId);
		deleteExistUser(userId);
		log("SERVER", LOG.DISCONNECTION, {id: userId});
	})

})

nextApp.prepare().then(()=>{

	app.get("*", (req, res)=>{
		handle(req, res);
	})

	server.listen(PORT, ()=>{
		log(null, null, {reset: true});
		log("SERVER", LOG.SERVER_STARTED, {port: PORT})
	});

})