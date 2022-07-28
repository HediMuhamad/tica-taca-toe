import { useCallback, useContext, useEffect, useState } from "react"

import { AppContext } from "./appContext";
import { TableContext } from "./tableContext"
import { SettingsContext } from "./settingsContext"
import { PropertiesContext } from "./propertiesContext"

const Persistor = ({children, persistnessName}) => {

	const [isReturned, setIsReturned] = useState(false);

	const appContext = useContext(AppContext);
	const tableContext = useContext(TableContext);
	const settingsContext = useContext(SettingsContext);
	const propertiesContext = useContext(PropertiesContext);

	const persistStates = useCallback((contexts, persistnessName) => {

		const object = {
			[persistnessName]:{ }
		}
	
		contexts.forEach(element => {
			object[persistnessName][element[1]] = element[0].props;
		});
	
		localStorage.setItem(persistnessName, JSON.stringify(object[persistnessName]));

	}, [])

	const returnPersistedStates = useCallback((persistnessName) => {
		const returnedObject = JSON.parse(localStorage.getItem(persistnessName));
		
		if(returnedObject === null){
			return
		}
		
		const persistedAppContext = returnedObject[AppContext.displayName];
		const persistedTableContext = returnedObject[TableContext.displayName];
		const persistedSettingsContext = returnedObject[SettingsContext.displayName];
		const persistedPropertiesContext = returnedObject[PropertiesContext.displayName];

		appContext.actions.setPersisted(persistedAppContext);
		tableContext.actions.setPersisted(persistedTableContext);
		settingsContext.actions.setPersisted(persistedSettingsContext);
		propertiesContext.actions.setPersisted(persistedPropertiesContext);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(()=>{
		returnPersistedStates(persistnessName)
		setIsReturned(true);
	}, [returnPersistedStates, persistnessName])

	useEffect(()=>{
		isReturned &&
		persistStates([
			[appContext, AppContext.displayName],
			[tableContext, TableContext.displayName],
			[settingsContext, SettingsContext.displayName],
			[propertiesContext, PropertiesContext.displayName]
		], persistnessName)
	}, [isReturned, appContext, persistStates, persistnessName, propertiesContext, settingsContext, tableContext]);

	return children;
}


export default Persistor;