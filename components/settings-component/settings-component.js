import { useContext } from 'react';
import { SettingsContext } from "../../context/settingsContext"
import { AppContext } from '../../context/appContext';
import styles from '../../styles/settings-component.module.scss'
import GameModeComponent from '../game-mode-component/game-mode-component';
import IdComponent from '../id-component/id-component';

const SettingsComponent = () => {

	const { props: {yourId, againstId, playingMode}, actions: {setAgainstId} } = useContext(SettingsContext);
	const { props: {markerType} } = useContext(AppContext);

	const markerTypeCondition = markerType==="X";

	let IdComponentsData = [
		{
			name: 'yours',
			value: yourId,
			setValue: undefined,
		},{
			name: 'against',
			value: againstId,
			setValue: setAgainstId 
		}
	]

	IdComponentsData = markerTypeCondition ? IdComponentsData : IdComponentsData.reverse();
	IdComponentsData[0].markerType = "X";
	IdComponentsData[1].markerType = "O";

	return(
		<div className={styles.settingsContainer}>
			{
				IdComponentsData.map((data, i)=>{
					return <IdComponent name={data.name} value={data.value} setValue={data.setValue} markerType={data.markerType} playingMode={playingMode} key={i}/>
				})
			}
			<GameModeComponent/>
		</div>
	)	
}

export default SettingsComponent;