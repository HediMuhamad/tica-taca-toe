import styles from "../../styles/property-component.module.scss"

const PropertyComponent = ({value, type}) => {
    type = type.toUpperCase();
    
    let title = 'Wins';

    if(type==="D"){
        title = 'Draw';
    }

    if(value>=99){
        //TODO Show Game winning and reset points
    }

	return(
		<div className={styles.property} markertype={type}>
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