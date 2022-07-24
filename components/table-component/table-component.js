import styles from "../../styles/table-component.module.scss"
import TableCell from "../table-cell-component/table-cell-component"

const TableComponent = () => {
	return(
		<div className={styles.tableContainer}>
			<div className={styles.tableComponent}>
				{
					[...Array(9)].map((_,i)=>{
						return <TableCell key={i} id={i+1} />
					})
				}
			</div>
		</div>
	)
}

export default TableComponent