import { useContext} from "react";
import { PropertiesContext } from "../../context/propertiesContext";
import styles from "../../styles/properties-component.module.scss"
import PropertyComponent from "../property-component/property-component";

const PropertiesComponent = () => {
	const {oWins, xWins, draws} = useContext(PropertiesContext).props;

	return(
		<div className={styles.propertiesComponent}>
			<PropertyComponent type={'x'} value={xWins} />
			<PropertyComponent type={'o'} value={oWins} />
			<PropertyComponent type={'d'} value={draws} />
		</div>
	)

}

export default PropertiesComponent;