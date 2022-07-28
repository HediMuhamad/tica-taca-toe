import { useCallback, useContext, useEffect, useState } from "react"
import styles from "../../styles/table-cell-component.module.scss"
import { AppContext } from "../../context/appContext";
import { TableContext } from "../../context/tableContext";

const TableCell = ({id, ...props}) => {
	const { markerType } = useContext(AppContext).props;
	const { props:{tableCells}, actions:{addTableCell} } = useContext(TableContext);
	let [markerTypeAttribute, setMarkerTypeAttribute] = useState(null);

	const clickHandler = useCallback(() => {
		addTableCell(id, markerType);
		setMarkerTypeAttribute(markerType);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	
	useEffect(()=>{
		setMarkerTypeAttribute(tableCells[id]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableCells])

	return(
		<div id={id} className={styles.tableCell} markertype={markerTypeAttribute} onClick={clickHandler}>
		</div>
	)
}


export default TableCell;