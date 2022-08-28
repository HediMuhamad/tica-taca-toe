import { createContext, useCallback, useState } from "react";

import { DEFAULT_APP_PROPS } from "./constants"

const AppContext = createContext(DEFAULT_APP_PROPS);
AppContext.displayName="app_states";
export {AppContext};

const AppContextProvider = ({children}) => {
	const [theme, setTheme] = useState(DEFAULT_APP_PROPS.props.theme);
	const [markerType, setMarkerType] = useState(DEFAULT_APP_PROPS.props.markerType);
	const [isIdle, setIsIdle] = useState(DEFAULT_APP_PROPS.props.isIdle);

 	const switchTheme = useCallback(() => {
		if(theme==="light"){
			 setTheme("dark")
		}else{
			setTheme("light");
		}
	}, [theme])

	const switchMarkerType = useCallback(() => {
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
		<AppContext.Provider value={{props: { theme, markerType, isIdle }, actions: { switchTheme, switchMarkerType, setIsIdle, setPersisted }}}>
			{children}
		</AppContext.Provider>
	)

}

export default AppContextProvider;