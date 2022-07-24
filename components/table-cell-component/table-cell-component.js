import { useRef } from "react"
import styles from "../../styles/table-cell-component.module.scss"

const clickHandler = (cellRef, markerType) => {
	markerType = false;
	const markerClass = (markerType === true ? styles.Omarker : styles.Xmarker);
	cellRef.current.className+=` ${markerClass}`
}

const TableCell = ({id, markerType,...props}) => {
	const cellRef = useRef(null);

	return(
		<div id={id} className={styles.tableCell} ref={cellRef} onClick={(e)=>{clickHandler(cellRef, 'markerType')}}>
			
		</div>
	)
}


export default TableCell;