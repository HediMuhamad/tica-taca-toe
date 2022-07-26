import { useRef, useCallback, useContext, useEffect } from "react"
import styles from "../../styles/table-cell-component.module.scss"
import { AppContext } from "../../context/appContext";
import { TableContext } from "../../context/tableContext";

const TableCell = ({id, ...props}) => {
	const cellRef = useRef(null);
	const { markerType } = useContext(AppContext).props;
	const { props:{tableCells}, actions:{addTableCell} } = useContext(TableContext);


	const clickHandler = useCallback((id, cellRef, markerType) => {
		addTableCell(id, markerType);
		const markerClass = (markerType === "O" ? styles.Omarker : styles.Xmarker);
		cellRef.current.className+=` ${markerClass}`
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(()=>{
		switch(tableCells[id]){
			case "O":{
				clickHandler(id, cellRef, "O");
				break;
			}
			case "X":{
				clickHandler(id, cellRef, "X");
				break;
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return(
		<div id={id} className={styles.tableCell} ref={cellRef} onClick={(e)=>{clickHandler(id, cellRef, markerType)}}>
		</div>
	)
}


export default TableCell;