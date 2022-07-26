import { useContext } from "react";
import styles from '../../styles/theme-controller-component.module.scss'
import { AppContext} from '../../context/appContext.js'

const ThemeController = () => {
	const {props: {theme}, actions: {switchTheme}} = useContext(AppContext);

	const clickHandler = () => {
		switchTheme();
	}

	return (
		<div
			className={`${styles.themeController} ${theme==="light" ? styles.lightMode : styles.darkMode}`}
			onClick={clickHandler}
		></div>
	)
}

export default ThemeController