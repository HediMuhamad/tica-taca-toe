import { useContext, useMemo} from "react";
import { SettingsContext } from "../../context/settingsContext";
import { AppContext } from "../../context/appContext";
import { SocketContext } from "../../context/socketContext";
import styles from "../../styles/game-mode-component.module.scss";
import { ACTIONS } from "../../utils/enums";

const GameModeComponent = () => {

	const { props: {playingMode}, actions: { switchPlayingMode } } = useContext(SettingsContext);
	const { props: {isIdle}} = useContext(AppContext);

	const socket = useContext(SocketContext);

	const onClickHandler = () => {
		if(!isIdle){
			playingMode==="multiPlayer" ? socket.emit(ACTIONS.LEAVE_ROOM_REQUEST) : null;
		}
		else{
			switchPlayingMode();
		}
	}
	
	playingMode==="multiPlayer" ? socket.connect() : socket.disconnect();
	
	return (
		<div className={styles.GameModeComponent} onClick={onClickHandler} playingmode={playingMode==="singlePlayer" ? "single-player" : "multi-player"}>
			<div className={styles.GameModeContainer}>
				<div className={styles.gameMode} modetype="singlePlayer" playingmode={playingMode}></div>
				<div className={styles.gameMode} modetype="multiPlayer" playingmode={playingMode}></div>
				<div className={styles.cancelTxt} shown={`${!isIdle}`} ><p>LEAVE</p></div>
				<div className={styles.detectorCircle} is-it-cancel-btn={`${isIdle}`} ></div>
			</div>
		</div>
	)
}

export default GameModeComponent;