import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import TableComponent from '../components/table-component/table-component'
import PropertiesComponent from '../components/properties-component/properties-component'
import SettingsComponent from '../components/settings-component/settings-component'
import ThemeControllerComponent from '../components/theme-controller-component/theme-controller-component'
import { useCallback, useContext } from 'react'
import { AppContext } from '../context/appContext'
import { SettingsContext } from '../context/settingsContext'
import { SocketContext } from '../context/socketContext'
import { ACTIONS } from "../utils/enums"
import { TableContext } from '../context/tableContext'

export default function Home() {

	const theme = useContext(AppContext).props.theme;

	const { actions: { setYourId, setAgainstId }, } = useContext(SettingsContext);
	const { actions: { switchMarkerType, setIsIdle }, props: { markerType } } = useContext(AppContext);
	const { actions: { switchPlayingMode }, props: {playingMode} } = useContext(SettingsContext);
	const { actions: { emptyTableCells } } = useContext(TableContext);
	const { actions: { addTableCell } } = useContext(TableContext);
	const socket = useContext(SocketContext);

	const connectionResponseHandler = useCallback((userId)=>{
		setYourId(userId);
	}, [])

	const newRoomBroadcastHandler = useCallback(({users}, userId)=>{
		markerType != users[userId] ? switchMarkerType() : null;
		Object.keys(users).forEach(key=>{
			if(key!=userId){
				setAgainstId(key)
			}
		})
		setIsIdle(false);
	}, [markerType]);

	const newMoveBroadcastHandler = useCallback((res)=>{
		const { index, markerType } = res;
		addTableCell(index, markerType);
	}, []);

	const leaveRoomBroadcastHandler = useCallback(()=>{
		setIsIdle(true);
		emptyTableCells();
	}, []);

	const singleDrawBroadcastHandler = useCallback((res)=>{
		console.log(res);
	}, []);

	const singleWinBroadcastHandler = useCallback((res)=>{
		console.log(res);
	}, []);



	socket.off(ACTIONS.CONNECTION_RESPONSE)
	socket.on(ACTIONS.CONNECTION_RESPONSE, ({ userId }) => {
		connectionResponseHandler(userId);

		socket.off(ACTIONS.NEW_ROOM_BROADCAST);
		socket.on(ACTIONS.NEW_ROOM_BROADCAST, (res) => {
			newRoomBroadcastHandler(res, userId);

			socket.off(ACTIONS.NEW_MOVE_BROADCAST);
			socket.on(ACTIONS.NEW_MOVE_BROADCAST, newMoveBroadcastHandler);
			
			socket.off(ACTIONS.LEAVE_ROOM_BROADCAST)
			socket.on(ACTIONS.LEAVE_ROOM_BROADCAST, leaveRoomBroadcastHandler);

			socket.off(ACTIONS.SINGLE_DRAW_BROADCAST);
			socket.on(ACTIONS.SINGLE_DRAW_BROADCAST, singleDrawBroadcastHandler);

			socket.off(ACTIONS.SINGLE_WIN_BROADCAST);
			socket.on(ACTIONS.SINGLE_WIN_BROADCAST, singleWinBroadcastHandler);
		
		});
		
		socket.off(ACTIONS.NEW_ROOM_RESPONSE);
		socket.on(ACTIONS.NEW_ROOM_RESPONSE, (res) => {
			//TODO Show response error as a toast or custom alert dialog.
		})

	})

	socket.off(ACTIONS.DISCONNECTION);
	socket.on(ACTIONS.DISCONNECTION, ()=>{
		leaveRoomBroadcastHandler();
		if(playingMode==="multiPlayer"){
			switchPlayingMode();
		}
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
				<ThemeControllerComponent />
			</main>
		</div>
	)
}
