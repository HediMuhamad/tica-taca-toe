import { createContext, useState } from "react";

import { DEFAULT_TABLE_PROPS } from "./constants"

export const TableContext = createContext(DEFAULT_TABLE_PROPS);

const TableContextProvider = ({children}) => {
	const [tableCells, setTableCells] = useState(DEFAULT_TABLE_PROPS.props.tableCells);

	const addTableCell = (cellIndex, markerType) => {
		const newTableCells = [...tableCells];
		newTableCells[cellIndex] = markerType;
		setTableCells(tableCells);
	} 

	return(
		<TableContext.Provider value={{props: { tableCells }, actions: { addTableCell }}}>
			{children}
		</TableContext.Provider>
	)

}

export default TableContextProvider;