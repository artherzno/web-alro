import { makeStyles, withStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.headerTable,
        color: theme.palette.common.black,
    },
    body: {
        fontSize: 14,
    },
    root: {
        border: "1px solid rgba(224, 224, 224, 1)"
    }
}))(TableCell);

export const StyledTableCellLine = withStyles((theme) => ({
    root: {
        border: "1px solid rgba(224, 224, 224, 1)"
    }
}))(TableCell);

export const styles = {
    table: {
        minWidth: 900,
    },
    cellSummary: {
        fontWeight: "bold"
    },
    cellBlue:{
        backgroundColor:'#E6F4FF'
    },
    cellGreen: {
        backgroundColor: '#E8FFEF'
    }
}
