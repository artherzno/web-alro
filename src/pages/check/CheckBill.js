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
import TablePagination from '@material-ui/core/TablePagination';

class CheckBill extends React.Component {

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
                                    <h1>ตรวจสอบใบแจ้งหนี้</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่หนังสือ" />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            
                                            <MuiDatePicker label="วันที่รับเงิน" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="เลขที่ใบแจ้งหนี้" />
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
                                                <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                <StyledTableCell align="center">รหัสจังหวัด</StyledTableCell>
                                                <StyledTableCell align="center">วันที่คำนวณ</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่ใบแจ้งหนี้</StyledTableCell>
                                                <StyledTableCell align="center">เดือน</StyledTableCell>
                                                <StyledTableCell align="center">รายการ</StyledTableCell>
                                                <StyledTableCell align="center">ครั้งที่</StyledTableCell>
                                                <StyledTableCell align="center">จำนวนเงินรวม</StyledTableCell>
                                                <StyledTableCell align="center">จำนวนราย</StyledTableCell>
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


                                                    </TableRow>
                                                )
                                            })}


                                        </TableBody>
                                    </Table>

                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={30}
                                        rowsPerPage={10}
                                        page={1}
                                        onPageChange={() => { }}
                                        onRowsPerPageChange={() => { }}
                                    />
                                    
                                </TableContainer>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(CheckBill)