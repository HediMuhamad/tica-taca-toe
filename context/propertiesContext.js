import { createContext, useState, useCallback } from "react";

import { DEFAULT_PROPERTIES_PROPS } from "./constants"

const PropertiesContext = createContext(DEFAULT_PROPERTIES_PROPS);
PropertiesContext.displayName = "properties_state";
export {PropertiesContext}

const PropertiesContextProvider = ({children}) => {
	const [oWins, setOWins] = useState(DEFAULT_PROPERTIES_PROPS.props.oWins);
	const [xWins, setXWins] = useState(DEFAULT_PROPERTIES_PROPS.props.xWins);
	const [draws, setDraws] = useState(DEFAULT_PROPERTIES_PROPS.props.draws);

	const setPersisted = useCallback(({oWins, xWins, draws})=>{
		setOWins(oWins);
		setXWins(xWins);
		setDraws(draws);
	}, [])

	return(
		<PropertiesContext.Provider value={{props:{oWins, xWins, draws}, actions: {setOWins, setXWins, setDraws, setPersisted}}}>
			{children}
		</PropertiesContext.Provider>
	)

}

export default PropertiesContextProvider;