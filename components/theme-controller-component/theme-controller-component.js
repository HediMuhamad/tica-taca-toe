import { useState } from "react";
import styles from '../../styles/theme-controller-component.module.scss'


const ThemeController = () => {
	const [theme, setTheme] = useState(true);

	const clickHandler = () => {
		setTheme(!theme)
	}

	return (
		<div
			className={`${styles.themeController} ${theme ? styles.lightMode : styles.darkMode}`}
			onClick={clickHandler}
		></div>
	)
}

export default ThemeController