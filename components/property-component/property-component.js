import styles from "../../styles/property-component.module.scss"

const PropertyComponent = ({value, type}) => {
    type = type.toUpperCase();
    
    let propertyClass = undefined;
    let valueClass = undefined;
    let title = '';

    switch(type){
        case 'O':
            propertyClass = styles.Omarker;
            title = 'Wins';
            break;
        case 'X':
            propertyClass = styles.Xmarker;
            title = 'Wins';
            break;
        case 'D':
            propertyClass = styles.Dmarker;
            title = 'Draw';
            break;
    }

    if(value>=99){
        //TODO Show Game winning and reset points
    }

	return(
		<div className={`${styles.property} ${propertyClass} ${valueClass}`}>
                <div className={styles.header}></div>
                <div className={styles.border}>
                    <div className={styles.valueContainer}>
                        <p className={styles.value}>{value}</p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <p className={styles.title}>{title}</p>
                </div>
		</div>
	)
}

export default PropertyComponent