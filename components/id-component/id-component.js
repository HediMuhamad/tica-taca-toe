import styles from '../../styles/id-component.module.scss'

const IdComponent = (props) => {

	const { name, value, setValue, markerType } = props;

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
		<div className={styles.idField} idtype={markerType}>
			<div className={styles.hashSymbol}>#</div>
			<div className={styles.borderContainer}>
				<div className={styles.idValueContainer}>
					<input type="text" maxLength="5" disabled={name==='yours' ? true : false}
							placeholder={'AUTO'} className={styles.idValue} value={value}
							onChange={valueHandler} />
				</div>
				<div className={styles.idNameContainer}>
					<div className={styles.idNameValue}>{name}</div>
				</div>
			</div>
		</div>
	) 
}

export default IdComponent;