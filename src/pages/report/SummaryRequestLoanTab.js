import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect } from '../../components/report'
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

class SummaryRequestLoanTab extends React.Component {

    render() {

        const { classes } = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item ></Grid>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplayMonthSelect />
                        </Grid>
                        <Grid item>
                            <YearSelect />
                        </Grid>
                       
                    </Grid>
                </Grid>
                <Grid item ></Grid>
                <Grid item>
                    <ApproveStatusSelect />
                </Grid>
            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">สรุปรายงานคำขอกู้ยืมรายสัญญา ภาคตะวันออก</Typography>
                    <Typography variant="h6" align="center">เดือนมกราคม 2563</Typography>
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
                                <StyledTableCell align="center">เดือน</StyledTableCell>
                                <StyledTableCell align="center">เลฃที่คำขอกู้</StyledTableCell>
                                <StyledTableCell align="center">จำนวนคำขอกู้</StyledTableCell>
                                <StyledTableCell align="center">จำนวนเงิน (เงิน)</StyledTableCell>
                                <StyledTableCell align="center">อำนาจ</StyledTableCell>
                                <StyledTableCell align="center">วันที่อนุมัติ/ไม่อนุมัติ</StyledTableCell>
                                <StyledTableCell align="center">เหตุผลที่ไม่อนุมัติ</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <StyledTableCellLine >
                                    xxxx
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={3} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(SummaryRequestLoanTab)