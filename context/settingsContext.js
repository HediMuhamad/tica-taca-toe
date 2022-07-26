import { createContext, useState } from "react";

import { DEFAULT_SETTINGS_PROPS } from "./constants"

export const SettingsContext = createContext(DEFAULT_SETTINGS_PROPS);

const SettingsContextProvider = ({children}) => {
	const [yourId, setYourId] = useState(DEFAULT_SETTINGS_PROPS.props.yourId);
	const [againstId, setAgainstId] = useState(DEFAULT_SETTINGS_PROPS.props.againstId);
	const [playingMode, setPlayingMode] = useState(DEFAULT_SETTINGS_PROPS.props.playingMode);

	const switchPlayingMode = () => {
		if(playingMode==="singlePlayer"){
			setPlayingMode("multiPlayer")
		}else{
			setPlayingMode("singlePlayer")
		}
	}

	return(
		<SettingsContext.Provider value={{props: {yourId, againstId, playingMode}, actions: {setYourId, setAgainstId, switchPlayingMode}}}>
			{children}
		</SettingsContext.Provider>
	)

}

export default SettingsContextProvider;