import { useState } from "react";
import styles from "../../styles/game-mode-component.module.scss";

const GameModeComponent = () => {

	const [isInSingleMode, setisInSingleMode] = useState("true");

	const detectorCircleClickHandler = () => {
		setisInSingleMode(!isInSingleMode);
	}

	return (
		<div className={styles.GameModeComponent} onClick={detectorCircleClickHandler} playingmode={isInSingleMode ? "single-player" : "multi-player"}>
			<div className={styles.GameModeContainer}>
				<div className={styles.gameMode} modetype="singlePlayer"></div>
				<div className={styles.gameMode} modetype="multiPlayer"></div>
				<div className={styles.detectorCircle}></div>
			</div>
		</div>
	)
}

export default GameModeComponent;