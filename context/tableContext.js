import { createContext, useCallback, useReducer, useState } from "react";

import { DEFAULT_TABLE_PROPS } from "./constants"

const TableContext = createContext(DEFAULT_TABLE_PROPS);
TableContext.displayName="table_state";
export {TableContext};

const tableCellReducer = (state, action) => {
	state[action.cellIndex] = action.markerType;
	return [...state];
}

const TableContextProvider = ({children}) => {
	// const [tableCells, setTableCells] = useState(DEFAULT_TABLE_PROPS.props.tableCells);
	const [tableCells, tableCellDispatcher] = useReducer(tableCellReducer, DEFAULT_TABLE_PROPS.props.tableCells)

	const addTableCell = useCallback((cellIndex, markerType) => {
		tableCellDispatcher({cellIndex: cellIndex, markerType: markerType});
	},[])

	const setPersisted = useCallback(({tableCells})=>{
		tableCells.forEach((_, id) => {
			tableCellDispatcher({cellIndex: id, markerType: tableCells[id]})
		});
	}, [])

	return(
		<TableContext.Provider value={{props: { tableCells }, actions: { addTableCell, setPersisted }}}>
			{children}
		</TableContext.Provider>
	)

}

export default TableContextProvider;