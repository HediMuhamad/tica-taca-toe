import styles from '../../styles/id-component.module.scss'
import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../../context/socketContext';
import { ACTIONS } from "../../utils/enums";
import { AppContext } from '../../context/appContext';

const IdComponent = (props) => {

	const socket = useContext(SocketContext);
	const { props: { isIdle } } = useContext(AppContext);
	const { name, value, setValue, markerType, playingMode } = props;
	
	const [isTextfieldDisabled, setIsTextfieldDisabled] = useState(null);
	const [isOverAllDisabled, setIsOverAllDisabled] = useState(false);

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
		setIsTextfieldDisabled(!isIdle || name==='yours' ? true : false)
	}, [name, isIdle])

	useEffect(()=>{
		setIsOverAllDisabled(!isIdle || playingMode==="singlePlayer")
	}, [isIdle, playingMode])

	return(
		<div className={styles.idField} idtype={markerType} is-disabled={isOverAllDisabled+""} >
			<div className={styles.hashSymbol}>#</div>
			<div className={styles.borderContainer}>
				<div className={styles.idValueContainer}>
					<input  disabled={isTextfieldDisabled} type="text" maxLength="5"
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