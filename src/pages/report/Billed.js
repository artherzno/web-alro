import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
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

class Billed extends React.Component {

    render() {

        const { classes } = this.props;

        return (<div>
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            <Box mt={5} ml={2} mr={2}>
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


                    <Grid item ></Grid>

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
                        <Typography variant="h6" align="center">รายงานการใช้ใบเสร็จรับเงิน จังหวัดกรุงเทพมหานคร</Typography>
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
                                   
                                    <StyledTableCell align="center" colSpan={2}>ใบเสร๋จรับเงิน</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={4}>จำนวนเงินทั้งหมดที่จัดเก็บ</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}>ใบเสร็จที่ยกเลิก</StyledTableCell>

                                </TableRow>
                                <TableRow>

                                    <StyledTableCell align="center" rowSpan={2}>เล่มที่/เลขที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>จำนวน(ฉบับ)</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}>เงินกู้</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>อื่นๆ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>รวม</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เล่มที่/เลขที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>จำนวน(ฉบับ)</StyledTableCell>

                                </TableRow>
                                <TableRow>

                                    <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center" >ดอกเบี้ย</StyledTableCell>

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

                                </TableRow>

                                <TableRow>
                                    <StyledTableCellLine  align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                </StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Box>
     
        </div>)
    }
}

export default withStyles(styles)(Billed)