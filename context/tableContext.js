import { createContext, useCallback, useReducer, useState } from "react";

import { DEFAULT_TABLE_PROPS } from "./constants"

const TableContext = createContext(DEFAULT_TABLE_PROPS);
TableContext.displayName="table_state";
export {TableContext};

const tableCellReducer = (state, action) => {
	if(action.reset){
		return [...new Array(9)];
	}

	state[action.cellIndex] = action.markerType;
	return [...state];
}

const TableContextProvider = ({children}) => {
	const [tableCells, tableCellDispatcher] = useReducer(tableCellReducer, DEFAULT_TABLE_PROPS.props.tableCells)

	const addTableCell = useCallback((cellIndex, markerType) => {
		tableCellDispatcher({cellIndex: cellIndex, markerType: markerType});
	},[])

	const emptyTableCells = useCallback(()=>{
		tableCellDispatcher({reset: true});
	},[])

	const setPersisted = useCallback(({tableCells})=>{
		tableCells.forEach((_, id) => {
			tableCellDispatcher({cellIndex: id, markerType: tableCells[id]})
		});
	}, [])

	return(
		<TableContext.Provider value={{props: { tableCells }, actions: { addTableCell, emptyTableCells, setPersisted }}}>
			{children}
		</TableContext.Provider>
	)

}

export default TableContextProvider;