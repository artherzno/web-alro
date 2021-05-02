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
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'

class ListNewFarmerPayLoanSectionTab extends React.Component {

    render() {

        const { classes } = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <YearSelect />
                </Grid>


            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานการจ่ายเงินกู้เกษตรกรรายใหม่ รายภาค</Typography>
                    <Typography variant="h6" align="center">ประจำปีงบประมาณ 2563</Typography>
                    <Typography variant="h6" align="center">ข้อมูลสิ้นสุด ณ วันที่ 3 มกราคม 2564</Typography>
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
                                <StyledTableCell align="center">ลำดับ</StyledTableCell>
                                <StyledTableCell align="center">ภาค</StyledTableCell>
                                <StyledTableCell align="center">จำนวนโครงการ</StyledTableCell>
                                <StyledTableCell align="center">จำนวนสัญญา</StyledTableCell>
                                <StyledTableCell align="center">ผลการจ่ายเงินกู้ จำนวนเงิน</StyledTableCell>
                                <StyledTableCell align="center">จำวนราย</StyledTableCell>
                                <StyledTableCell align="center">จำนวนเงิน (เงิน)</StyledTableCell>
                                <StyledTableCell align="center">อัตราร้อยละ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                            </TableRow>
                            <TableRow >
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>
                                    รวมภาคเหนือ
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    1
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>
                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    2
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow >
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>
                                    รวมภาคกลาง
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    1
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(ListNewFarmerPayLoanSectionTab)