import { useState } from "react";
import styles from "../../styles/properties-component.module.scss"
import PropertyComponent from "../property-component/property-component";

const PropertiesComponent = () => {
	const [oWins, setOWins] = useState(12);
	const [xWins, setXWins] = useState(12);
	const [draws, setDraws] = useState(12);

	return(
		<div className={styles.propertiesComponent}>
			<PropertyComponent type={'o'} value={oWins} />
			<PropertyComponent type={'x'} value={xWins} />
			<PropertyComponent type={'d'} value={draws} />
		</div>
	)

}

export default PropertiesComponent;