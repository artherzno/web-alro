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

class LawSuitTab extends React.Component {

    render() {

        const { classes } = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect />
                        </Grid>
                        <Grid item>
                            <SectionSelect />
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
                            <MonthSelect />
                        </Grid>
                        <Grid item>
                            <YearSelect />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานสัญญาการดำเนินคดีทางศาล ภาคตะวันออก</Typography>
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
                                <StyledTableCell align="center" rowSpan={2}>จังหวัด</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชื่อโครงการ</StyledTableCell>
                                <StyledTableCell align="center" colSpan={8}>สัญญาเดิม</StyledTableCell>
                                <StyledTableCell align="center" colSpan={15}>สัญญาใหม่</StyledTableCell>

                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center" >ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                <StyledTableCell align="center" >ประเภทสัญญา</StyledTableCell>
                                <StyledTableCell align="center" >เลขที่สัญญา</StyledTableCell>
                                <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                <StyledTableCell align="center" >ดอกเบี้ยค้าง</StyledTableCell>
                                <StyledTableCell align="center" >ดอกเบี้ยปรับ</StyledTableCell>
                                <StyledTableCell align="center" >รวม</StyledTableCell>
                                <StyledTableCell align="center" >อัตตราดอกเบี้ย</StyledTableCell>

                                <StyledTableCell align="center" >ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                <StyledTableCell align="center" >ประเภทสัญญา</StyledTableCell>
                                <StyledTableCell align="center" >วันที่ฟ้องศาล</StyledTableCell>
                                <StyledTableCell align="center" >เลขที่สัญญา</StyledTableCell>
                                <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                <StyledTableCell align="center" >ดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center" >ดอกเบี้ยที่ศาลสั่งเพิ่มเติม</StyledTableCell>
                                <StyledTableCell align="center" >รวม</StyledTableCell>
                                <StyledTableCell align="center" >การคิดอัตตราดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center" >อัตตราดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center" >วันที่ทำสัญญาใหม่</StyledTableCell>
                                <StyledTableCell align="center" >คดีหมายเลขดำ</StyledTableCell>
                                <StyledTableCell align="center" >คดีหมายเลขแดง</StyledTableCell>
                                <StyledTableCell align="center" >วันพิพากษา</StyledTableCell>
                                <StyledTableCell align="center" >คำพิพากษา</StyledTableCell>
                                
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
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right"><div className="btn-more-detail-table">ดูรายละเอียด</div></StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine colSpan={7} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={5} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={7} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(LawSuitTab)