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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'

class RequestLoanTab extends React.Component {

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
                            <ApproveStatusSelect/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานคำขอกู้ยืมรายสัญญา ภาคตะวันออก</Typography>
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
                                <StyledTableCell align="center">จังหวัด</StyledTableCell>
                                <StyledTableCell align="center">ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center">เลขที่คำขอกู้</StyledTableCell>
                                <StyledTableCell align="center">วันที่ยื่นคำขอกู้</StyledTableCell>
                               <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center">ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                <StyledTableCell align="center">สถานะคำขอ</StyledTableCell>
                                <StyledTableCell align="center">อายุ</StyledTableCell>
                                <StyledTableCell align="center">ที่อยู่ตามบัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center">ที่อยู่ที่ติดต่อได้</StyledTableCell>
                                <StyledTableCell align="center">โทรศัพท์</StyledTableCell>
                                <StyledTableCell align="center">ประเภทเอกสารสิทธิ</StyledTableCell>
                                <StyledTableCell align="center">เลขที่เอกสารสิทธิ์</StyledTableCell>
                                <StyledTableCell align="center">ที่ตั้งที่ดิน</StyledTableCell>
                                <StyledTableCell align="center">ขนาดที่ดินตามเอกสารสิทธิ์</StyledTableCell>
                                <StyledTableCell align="center">ภาระหนี้สิน</StyledTableCell>
                                <StyledTableCell align="center">จำนวน (บาท)</StyledTableCell>
                                <StyledTableCell align="center">จุดประสงค์การกู้ยืม</StyledTableCell>
                                <StyledTableCell align="center">ประเภทเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">เงินกู้ยืม</StyledTableCell>
                                <StyledTableCell align="center">ผลการพิจารณา</StyledTableCell>
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
                                <StyledTableCellLine align="right"><div className="status-approve approved">อนุมัติ</div></StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine colSpan={16} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center"  className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={2} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="center"  className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(RequestLoanTab)