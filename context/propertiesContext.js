import { createContext, useState } from "react";

import { DEFAULT_PROPERTIES_PROPS } from "./constants"

export const PropertiesContext = createContext(DEFAULT_PROPERTIES_PROPS);

const PropertiesContextProvider = ({children}) => {
	const [oWins, setOWins] = useState(DEFAULT_PROPERTIES_PROPS.props.oWins);
	const [xWins, setXWins] = useState(DEFAULT_PROPERTIES_PROPS.props.xWins);
	const [draws, setDraws] = useState(DEFAULT_PROPERTIES_PROPS.props.draws);

	return(
		<PropertiesContext.Provider value={{props:{oWins, xWins, draws}, actions: {setOWins, setXWins, setDraws}}}>
			{children}
		</PropertiesContext.Provider>
	)

}

export default PropertiesContextProvider;