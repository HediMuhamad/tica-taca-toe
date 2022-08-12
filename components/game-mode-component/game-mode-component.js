import { useContext} from "react";
import { SettingsContext } from "../../context/settingsContext";
import { SocketContext } from "../../context/socketContext";
import styles from "../../styles/game-mode-component.module.scss";

const GameModeComponent = () => {

	const { props: {playingMode}, actions: { switchPlayingMode } } = useContext(SettingsContext);
	const socket = useContext(SocketContext);

	const onClickHandler = () => {
		switchPlayingMode();
	}

	playingMode==="multiPlayer" ? socket.connect() : socket.disconnect() 
	
	return (
		<div className={styles.GameModeComponent} onClick={onClickHandler} playingmode={playingMode==="singlePlayer" ? "single-player" : "multi-player"}>
			<div className={styles.GameModeContainer}>
				<div className={styles.gameMode} modetype="singlePlayer" playingmode={playingMode}></div>
				<div className={styles.gameMode} modetype="multiPlayer" playingmode={playingMode}></div>
				<div className={styles.detectorCircle}></div>
			</div>
		</div>
	)
}

export default GameModeComponent;