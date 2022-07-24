import styles from '../../styles/settings-component.module.scss'
import GameModeComponent from '../game-mode-component/game-mode-component';

import IdComponent from '../id-component/id-component';

const SettingsComponent = () => {
	return(
		<div className={styles.settingsContainer}>
			<IdComponent name={'yours'} key={0}/>
			<IdComponent name={'against'} key={1}/>
			<GameModeComponent/>
		</div>
	)	
}

export default SettingsComponent;