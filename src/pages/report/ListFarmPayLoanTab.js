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
import { makeStyles, withStyles } from '@material-ui/styles';

import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'

class ListFarmPayLoanTab extends React.Component {

    render() {

        const { classes} = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect />
                        </Grid>
                      
                    </Grid>

                </Grid>
                <Grid item/>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplayMonthSelect />
                        </Grid>
                       
                    </Grid>
                </Grid>

                <Grid item />
                <Grid item>
                    <Grid container spacing={2}>

                        <Grid item>
                            <TypeBillSelect />
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
                                <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>สัญญาเลขที่</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชื่อ-นามสกุล</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เลขที่ใบแจ้งหนี้</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}><div><Typography align="center" variant="body2">ว/ด/ป</Typography><Typography align="center" variant="body2">ใบแจ้งนี้</Typography></div></StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เลขที่ใบเสร็จ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ช่องทางการชำระเงิน</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชำระเงินกู้</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เงินต้น</StyledTableCell>
                                <StyledTableCell align="center" colSpan={2}> ค้างรับ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ค่าปรับ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชำระเกิน</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">ค้างรับ</StyledTableCell>
                                <StyledTableCell align="center">รับ</StyledTableCell>
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
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                            </TableRow>
                            
                            <TableRow  >
                                <StyledTableCellLine className={classes.cellSummary} colSpan={8} align="right">รวมทั้งสิ้น</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="right">xxx</StyledTableCellLine>
                               
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