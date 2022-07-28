import { createContext, useCallback, useState } from "react";

import { DEFAULT_SETTINGS_PROPS } from "./constants"

const SettingsContext = createContext(DEFAULT_SETTINGS_PROPS);
SettingsContext.displayName = "settings_state"
export {SettingsContext};

const SettingsContextProvider = ({children}) => {
	const [yourId, setYourId] = useState(DEFAULT_SETTINGS_PROPS.props.yourId);
	const [againstId, setAgainstId] = useState(DEFAULT_SETTINGS_PROPS.props.againstId);
	const [playingMode, setPlayingMode] = useState(DEFAULT_SETTINGS_PROPS.props.playingMode);

	const switchPlayingMode = useCallback(() => {
		if(playingMode==="singlePlayer"){
			setPlayingMode("multiPlayer")
		}else{
			setPlayingMode("singlePlayer")
		}
	}, [playingMode])

	const setPersisted = useCallback(({yourId, againstId, playingMode})=>{
		setYourId(yourId);
		setAgainstId(againstId);
		setPlayingMode(playingMode);
	}, [])

	return(
		<SettingsContext.Provider value={{props: {yourId, againstId, playingMode}, actions: {setYourId, setAgainstId, switchPlayingMode, setPersisted}}}>
			{children}
		</SettingsContext.Provider>
	)

}

export default SettingsContextProvider;