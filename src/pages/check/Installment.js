import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect } from '../../components/check'

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import {
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';

class Installment extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true
        }
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <div className="header-nav">
                    <Header bgColor="bg-light-green" status="logged" />
                    <Nav />
                </div>

                <Fade in={this.state.loaded} timeout={800}>
                    <div className="fade">
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page">
                                    <h1>ตรวจสอบงวดชำระ&บัญชี</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ดึงข้อมูลตั้งแต่ปีพ.ศ" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <DisplayCheck />
                                        </Grid>


                                    </Grid>
                                </Grid>

                            </Grid>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                <StyledTableCell align="center">Rid_it</StyledTableCell>
                                                <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">ลำดับ</StyledTableCell>
                                                <StyledTableCell align="center">รหัส</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">วันที่ครบชำระ</StyledTableCell>
                                                <StyledTableCell align="center">ยอดชำระ</StyledTableCell>
                                                <StyledTableCell align="center">Rcpno</StyledTableCell>
                                                <StyledTableCell align="center">Rcapital</StyledTableCell>
                                                <StyledTableCell align="center">Rinterest</StyledTableCell>
                                                <StyledTableCell align="center">Rcharge</StyledTableCell>
                                                <StyledTableCell align="center">Rate</StyledTableCell>
                                                <StyledTableCell align="center">Rate_c</StyledTableCell>
                                                <StyledTableCell align="center">Reduce</StyledTableCell>
                                                <StyledTableCell align="center">Rate_n</StyledTableCell>
                                                <StyledTableCell align="center">Stu</StyledTableCell>
                                                <StyledTableCell align="center">Pv_code</StyledTableCell>
                                                <StyledTableCell align="center">รหัสงาน</StyledTableCell>
                                                <StyledTableCell align="center">Finish_flag</StyledTableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {[1, 2, 3, 4].map((farmer, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">XXX</StyledTableCellLine>


                                                    </TableRow>
                                                )
                                            })}


                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(Installment)