import { createContext, useCallback, useEffect, useState } from "react";

import { DEFAULT_APP_PROPS } from "./constants"

const AppContext = createContext(DEFAULT_APP_PROPS);
AppContext.displayName="app_states";
export {AppContext};

const AppContextProvider = ({children}) => {
	const [theme, setTheme] = useState(DEFAULT_APP_PROPS.props.theme);
	const [markerType, setMarkerType] = useState(DEFAULT_APP_PROPS.props.markerType);

 	const switchTheme = useCallback(() => {
		if(theme==="light"){
			 setTheme("dark")
		}else{
			setTheme("light");
		}
	}, [theme])

	const switchMarkerType = useCallback((markTypeArg) => {
		if(markTypeArg) {
			setMarkerType(markTypeArg)
			return;
		}
		
		if(markerType==="O"){
			setMarkerType("X")
		}else{
			setMarkerType("O")
		}
	}, [markerType])

	
	const setPersisted = useCallback(({theme, markerType}) => {
		setTheme(theme);
		setMarkerType(markerType);
	},[])

	return(
		<AppContext.Provider value={{props: { theme, markerType }, actions: { switchTheme, switchMarkerType, setPersisted }}}>
			{children}
		</AppContext.Provider>
	)

}

export default AppContextProvider;