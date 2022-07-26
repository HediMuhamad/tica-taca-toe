import { useContext} from "react";
import { SettingsContext } from "../../context/settingsContext";
import styles from "../../styles/game-mode-component.module.scss";

const GameModeComponent = () => {

	const { props: {playingMode}, actions: { switchPlayingMode } } = useContext(SettingsContext);

	return (
		<div className={styles.GameModeComponent} onClick={switchPlayingMode} playingmode={playingMode==="singlePlayer" ? "single-player" : "multi-player"}>
			<div className={styles.GameModeContainer}>
				<div className={styles.gameMode} modetype="singlePlayer"></div>
				<div className={styles.gameMode} modetype="multiPlayer"></div>
				<div className={styles.detectorCircle}></div>
			</div>
		</div>
	)
}

export default GameModeComponent;