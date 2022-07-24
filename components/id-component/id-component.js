import { useState } from 'react'
import styles from '../../styles/id-component.module.scss'

const IdComponent = ({name}) => {
	const [value, setValue] = useState(name==='yours' ? parseInt(Math.random()*100000) : "");
	
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

	return(
		<div className={`${styles.idField} ${styles.yourId} ${styles.disabled}`} idtype={name}>
			<div className={styles.hashSymbol}>#</div>
			<div className={styles.borderContainer}>
				<div className={styles.idValueContainer}>
					<input type="text" maxLength="5" disabled={name==='yours' ? true : false}
							placeholder={'AUTO'} className={styles.idValue} value={value}
							onChange={valueHandler}  />
				</div>
				<div className={`${styles.idNameContainer} ${styles.yoursId}`}>
					<div className={styles.idNameValue}>{name}</div>
				</div>
			</div>
		</div>
	) 
}

export default IdComponent;