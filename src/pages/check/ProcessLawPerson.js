import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, ProcessLawSelect, ProcessSelect } from '../../components/check'

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
import Checkbox from '@material-ui/core/Checkbox';

class ProcessLawPerson extends React.Component {

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
                                    <h1>ตรวจสอบประมวลฟ้องศาล พิมพ์ลูกหนี้รายตัว</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="อัตราดอกเบี้ย" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ปี" />
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
                                            <ProcessLawSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="พิมพ์ลูกหนี้รายตัว" />
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center" minWidth={50}><Checkbox/></StyledTableCell>
                                                <StyledTableCell align="center">mid</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">Projcode</StyledTableCell>
                                                <StyledTableCell align="center">Projname</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                                <StyledTableCell align="center">Rcpno</StyledTableCell>
                                                <StyledTableCell align="center">Principle</StyledTableCell>
                                                <StyledTableCell align="center">Unpaid</StyledTableCell>
                                                <StyledTableCell align="center">Credit</StyledTableCell>
                                                <StyledTableCell align="center">Dcapital</StyledTableCell>
                                                <StyledTableCell align="center">Dcapital1</StyledTableCell>
                                                <StyledTableCell align="center">Dinterest</StyledTableCell>
                                                <StyledTableCell align="center">Dinterest1</StyledTableCell>
                                                <StyledTableCell align="center">Djinterest</StyledTableCell>
                                                <StyledTableCell align="center">Dcharge</StyledTableCell>
                                                <StyledTableCell align="center">Pcapital</StyledTableCell>
                                                <StyledTableCell align="center">Pjcapital</StyledTableCell>
                                                <StyledTableCell align="center">Pcap0</StyledTableCell>
                                                <StyledTableCell align="center">Pjinterest</StyledTableCell>
                                                <StyledTableCell align="center">Pinterest</StyledTableCell>
                                                <StyledTableCell align="center">Pint_00</StyledTableCell>
                                                <StyledTableCell align="center">Pint_01</StyledTableCell>
                                                <StyledTableCell align="center">Pint_0</StyledTableCell>
                                                <StyledTableCell align="center">Pint_1</StyledTableCell>
                                                <StyledTableCell align="center">Pint_2</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_0</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_1</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_2</StyledTableCell>
                                                <StyledTableCell align="center">Bcapital</StyledTableCell>
                                                <StyledTableCell align="center">Bcapital1</StyledTableCell>
                                                <StyledTableCell align="center">Bjcapital</StyledTableCell>
                                                <StyledTableCell align="center">Binterest</StyledTableCell>
                                                <StyledTableCell align="center">Binterest1</StyledTableCell>
                                                <StyledTableCell align="center">Bjinterest</StyledTableCell>
                                                <StyledTableCell align="center">Bcharge</StyledTableCell>
                                                <StyledTableCell align="center">Minterest</StyledTableCell>
                                                <StyledTableCell align="center">Scapital</StyledTableCell>
                                                <StyledTableCell align="center">Sinterest</StyledTableCell>
                                                <StyledTableCell align="center">Mcharge</StyledTableCell>
                                                <StyledTableCell align="center">Appendflgs</StyledTableCell>
                                                <StyledTableCell align="center">P_pay</StyledTableCell>
                                                <StyledTableCell align="center">P_intr</StyledTableCell>
                                                <StyledTableCell align="center">P_charge</StyledTableCell>
                                                <StyledTableCell align="center">A_capital</StyledTableCell>
                                                <StyledTableCell align="center">A_interest</StyledTableCell>
                                                <StyledTableCell align="center">A_charge</StyledTableCell>
                                                <StyledTableCell align="center">C_capital</StyledTableCell>
                                                <StyledTableCell align="center">C_interest</StyledTableCell>
                                                <StyledTableCell align="center">C_charge</StyledTableCell>
                                                <StyledTableCell align="center">J_capital</StyledTableCell>
                                                <StyledTableCell align="center">J_interest</StyledTableCell>
                                                <StyledTableCell align="center">J_charge</StyledTableCell>
                                                <StyledTableCell align="center">Rate</StyledTableCell>
                                                <StyledTableCell align="center">Rate_c</StyledTableCell>
                                                <StyledTableCell align="center">Cmddate</StyledTableCell>
                                                <StyledTableCell align="center">Startdate</StyledTableCell>
                                                <StyledTableCell align="center">Enddate</StyledTableCell>
                                                <StyledTableCell align="center">Types</StyledTableCell>
                                                <StyledTableCell align="center">Rate_n</StyledTableCell>
                                                <StyledTableCell align="center">Rate_nc</StyledTableCell>
                                                <StyledTableCell align="center">Tps_</StyledTableCell>
                                                <StyledTableCell align="center">Tps</StyledTableCell>
                                                <StyledTableCell align="center">Pcap_01</StyledTableCell>
                                                <StyledTableCell align="center">Pcap_02</StyledTableCell>
                                                <StyledTableCell align="center">Pintr_01</StyledTableCell>
                                                <StyledTableCell align="center">Pintr_02</StyledTableCell>
                                                <StyledTableCell align="center">Ptotal_01</StyledTableCell>
                                                <StyledTableCell align="center">Uintr_01</StyledTableCell>
                                                <StyledTableCell align="center">Kpk_amt1</StyledTableCell>
                                                <StyledTableCell align="center">Kpk_amt2</StyledTableCell>
                                                <StyledTableCell align="center">Kpk_amt3</StyledTableCell>

                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {[1, 2, 3, 4].map((farmer, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center"><Checkbox /></StyledTableCellLine>
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

export default withStyles(styles)(ProcessLawPerson)