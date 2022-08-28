import styles from '../../styles/id-component.module.scss'
import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../context/socketContext';
import { ACTIONS } from "../../utils/enums";

const IdComponent = (props) => {

	const socket = useContext(SocketContext);
	const { name, value, setValue, markerType, playingMode } = props;
	const [isDisabled, setIsDisabled] = useState(null);

	const valueHandler = (event) => {
		let value = event.target.value;
		let isValueContainsLetter = false;
		for (let i of value){
			if(isNaN(i)){
				isValueContainsLetter=true;
				break;
			}
		}
		!isValueContainsLetter ? setValue(value) : null;
	}

	const onKeyDownCaptureHandler = (event) => {
		if(event.keyCode===13){
			socket.emit(ACTIONS.NEW_ROOM_REQUEST, {friendId: value});
		}
	}

	useEffect(()=>{
		setIsDisabled(name==='yours' ? true : false)
	}, [name])

	return(
		<div className={styles.idField} idtype={markerType} playingmode={playingMode}>
			<div className={styles.hashSymbol}>#</div>
			<div className={styles.borderContainer}>
				<div className={styles.idValueContainer}>
					<input  disabled={isDisabled} type="text" maxLength="5"
							placeholder={'AUTO'} className={styles.idValue} value={value}
							onChange={valueHandler} onKeyDownCapture={onKeyDownCaptureHandler} />
				</div>
				<div className={styles.idNameContainer}>
					<div className={styles.idNameValue}>{name}</div>
				</div>
			</div>
		</div>
	) 
}

export default IdComponent;