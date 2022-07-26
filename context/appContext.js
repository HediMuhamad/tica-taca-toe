import { createContext, useState } from "react";

import { DEFAULT_APP_PROPS } from "./constants"

export const AppContext = createContext(DEFAULT_APP_PROPS);

const AppContextProvider = ({children}) => {
	const [theme, setTheme] = useState(DEFAULT_APP_PROPS.props.theme);
	const [markerType, setMarkerType] = useState(DEFAULT_APP_PROPS.props.markerType);

 	const switchTheme = () => {
		if(theme==="light"){
			 setTheme("dark")
		}else{
			setTheme("light");
		}
	}

	const switchMarkerType = (markTypeArg) => {
		if(markTypeArg) {
			setMarkerType(markTypeArg)
			return;
		}
		
		if(markerType==="O"){
			setMarkerType("X")
		}else{
			setMarkerType("O")
		}
	}

	
	return(
		<AppContext.Provider value={{props: { theme, markerType }, actions: { switchTheme, switchMarkerType }}}>
			{children}
		</AppContext.Provider>
	)

}

export default AppContextProvider;