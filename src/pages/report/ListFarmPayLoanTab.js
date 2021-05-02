import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect } from '../../components/report'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const StyledTableCell = withStyles((theme) => ({
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

const StyledTableCellLine = withStyles((theme) => ({
    root: {
        border: "1px solid rgba(224, 224, 224, 1)"
    }
}))(TableCell);


const styles = {
    table: {
        minWidth: 900,
    },
    cellSummary:{
        fontWeight:"bold"
    }
}

class ListFarmPayLoanTab extends React.Component {

    render() {

        const { classes} = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <DisplaySelect />
                        </Grid>
                        <Grid item>
                            <ProvinceSelect />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item/>
                <Grid item>
                    <Grid container spacing={1}>
                        <Grid item>
                            <DisplayMonthSelect />
                        </Grid>
                        <Grid item>
                            <MonthSelect />
                        </Grid>
                        <Grid item>
                            <YearSelect />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item />
                <Grid item>
                    <Grid container spacing={1}>

                        <Grid item>
                            <TypeBillSelect />
                        </Grid>
                        <Grid item>
                            <ProvinceSelect />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้ จังหวัดกรุงเทพ</Typography>
                    <Typography variant="h6" align="center">เดือนมกราคม 2563</Typography>
                    <Typography variant="h6" align="center">ประเภทใบเสร็จรับเงิน ส.ป.ก.จังหวัด</Typography>
                </Box>
            </div>
            <Grid container>
                <Grid item xs>

                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary"><Box mr={1}><i className="far fa-file-excel"></i> </Box>Export to Excel</Button>
                </Grid>
            </Grid>

            <Box mt={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center">สัญญาเลขที่</StyledTableCell>
                                <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
                                <StyledTableCell align="center">เลขที่ใบแจ้งหนี้</StyledTableCell>
                                <StyledTableCell align="center"><div><Typography align="center" variant="body2">ว/ด/ป</Typography><Typography align="center" variant="body2">ใบแจ้งนี้</Typography></div></StyledTableCell>
                                <StyledTableCell align="center">เลขที่ใบเสร็จ</StyledTableCell>
                                <StyledTableCell align="center">ช่องทางการชำระเงิน</StyledTableCell>
                                <StyledTableCell align="center">ชำระเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                <StyledTableCell align="center" colSpan={2}>
                                  <div>
                                        <div className="sub-header-table">
                                           <Box p={2}>
                                                <Typography align="center" variant="body2">ค้างรับ</Typography>
                                           </Box>
                                      </div>

                                       
                                        <Box mt={2}>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Typography align="center" variant="body2">ค้างรับ</Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography align="center" variant="body2">รับ</Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                  </div>
                                 
                                </StyledTableCell>
                                <StyledTableCell align="center">ค่าปรับ</StyledTableCell>
                                <StyledTableCell align="center">ชำระเกิน</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    xxxx
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right" colSpan={2}> <Grid container>
                                    <Grid item xs>
                                        <Typography align="center" variant="body2">ค้างรับ</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography align="center" variant="body2">รับ</Typography>
                                    </Grid>
                                </Grid></StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                            </TableRow>
                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    xxxx
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right" colSpan={2}> <Grid container>
                                    <Grid item xs>
                                        <Typography align="center" variant="body2">ค้างรับ</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography align="center" variant="body2">รับ</Typography>
                                    </Grid>
                                </Grid></StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                            </TableRow>
                            <TableRow  >
                                <StyledTableCellLine colSpan={7} scope="row"> </StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">รวมทั้งสิ้น</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right" colSpan={2}> <Grid container>
                                    <Grid item xs>
                                        <Typography className={classes.cellSummary} align="center" variant="body2">ค้างรับ</Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography className={classes.cellSummary} align="center" variant="body2">รับ</Typography>
                                    </Grid>
                                </Grid></StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(ListFarmPayLoanTab)