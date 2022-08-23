import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TableComponent from '../components/table-component/table-component'
import PropertiesComponent from '../components/properties-component/properties-component'
import SettingsComponent from '../components/settings-component/settings-component'
import ThemeControllerComponent from '../components/theme-controller-component/theme-controller-component'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/appContext'
import { SettingsContext } from '../context/settingsContext'
import { SocketContext } from '../context/socketContext'
import { ACTIONS } from "../utils/enums"

export default function Home() {

	const theme = useContext(AppContext).props.theme;

	const { actions: { setYourId, setAgainstId }, props: { yourId } } = useContext(SettingsContext);
	const { actions: { switchMarkerType }, props: { markerType } } = useContext(AppContext);
	const socket = useContext(SocketContext);

	const connectionResponseHandler = useCallback((userId)=>{
		setYourId(userId);
	}, [])

	const newRoomBroadcastHandler = useCallback(({roomId, users}, userId)=>{
		markerType != users[userId] ? switchMarkerType() : null;
		Object.keys(users).forEach(key=>{
			if(key!=userId){
				setAgainstId(key)
			}
		})
	}, [markerType, setAgainstId, switchMarkerType]);

	socket.on(ACTIONS.CONNECTION_RESPONSE, ({ userId }) => {
		connectionResponseHandler(userId);

		socket.off(ACTIONS.NEW_ROOM_BROADCAST);
		socket.on(ACTIONS.NEW_ROOM_BROADCAST, (response) => {
			newRoomBroadcastHandler(response, userId)
		});
		
		socket.off(ACTIONS.NEW_ROOM_RESPONSE);
		socket.on(ACTIONS.NEW_ROOM_RESPONSE, (res) => {
			//TODO Show response error as a toast or custom alert dialog.
		})

	})


	return (
		<div className={styles.container} theme={theme}>
			<Head>
				<title>Tica-Taca-Toe</title>
				<meta name="description" content="Multi-Player and Signle-Player Tic-Tac-Toe Game." />
				<meta name="keywords" content="tic-tac-toe, tic tac toe, tica-taca-toe, online game, signle player game" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<TableComponent />
				<PropertiesComponent />
				<SettingsComponent />
				{/* <div onClick={()=>{setId(++id)}} style={{width:"100%", height:"100%", backgroundColor:"red" }} ></div> */}
				<ThemeControllerComponent />
			</main>
		</div>
	)
}
