import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect,SectionSelect } from '../../components/report'
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

class PayLoanTab extends React.Component {

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
                       
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานการจ่ายเงินกู้ ภาคตะวันออก</Typography>
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
                                <StyledTableCell align="center">ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center">รหัสจังหวัด</StyledTableCell>
                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                <StyledTableCell align="center">สัญญาเลขที่</StyledTableCell>
                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
                                <StyledTableCell align="center">ธนาคาร</StyledTableCell>
                                <StyledTableCell align="center">เลขบัญชีธนาคาร</StyledTableCell>
                                <StyledTableCell align="center">เลขที่ใบเสร็จรับเงิน</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป รับเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป เริ่มชำระ</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป ครบกำหนด</StyledTableCell>
                                <StyledTableCell align="center">การจ่ายเงิน (งวด)</StyledTableCell>
                                <StyledTableCell align="center">จ่ายเงินงวดแรก</StyledTableCell>
                                <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center">สถานะสมาชิก</StyledTableCell>
                                <StyledTableCell align="center">จำนวนวันทำการ</StyledTableCell>
                               
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

                            </TableRow>
                            <TableRow>
                                <StyledTableCellLine colSpan={10} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    xxxx
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine colSpan={3} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine colSpan={3} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(PayLoanTab)