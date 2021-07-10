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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TablePagination from '@material-ui/core/TablePagination';

class CheckBilled extends React.Component {

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
                                    <h1>ตรวจสอบใบเสร็จรับเงิน</h1>
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
                                            <FormControlLabel
                                                control={<Checkbox  onChange={() =>{}} name="billed" />}
                                                label="ดูใบเสร็จฟ้องศาล"
                                            />
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
                                                <StyledTableCell align="center">วันที่</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">ครั้งที่</StyledTableCell>
                                                <StyledTableCell align="center">รหัส</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">วันที่ชำระ</StyledTableCell>
                                                <StyledTableCell align="center">ใบเสร็จเลขที่</StyledTableCell>
                                                <StyledTableCell align="center">Rcpno 1</StyledTableCell>
                                                <StyledTableCell align="center">จ่ายเงินต้น</StyledTableCell>
                                                <StyledTableCell align="center">จ่ายดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center">จ่ายค่าปรับ</StyledTableCell>
                                                <StyledTableCell align="center">Rate</StyledTableCell>
                                                <StyledTableCell align="center">Ref_id</StyledTableCell>
                                                <StyledTableCell align="center">Payment</StyledTableCell>
                                                <StyledTableCell align="center">Pcapital</StyledTableCell>
                                                <StyledTableCell align="center">Pcap_1</StyledTableCell>
                                                <StyledTableCell align="center">Pcap_2</StyledTableCell>
                                                <StyledTableCell align="center">Pint_1</StyledTableCell>
                                                <StyledTableCell align="center">Pint_2</StyledTableCell>
                                                <StyledTableCell align="center">Paycharge</StyledTableCell>
                                                <StyledTableCell align="center">Pother</StyledTableCell>
                                                <StyledTableCell align="center">Pbank</StyledTableCell>
                                                <StyledTableCell align="center">Stu</StyledTableCell>
                                                <StyledTableCell align="center">S_flag</StyledTableCell>
                                                <StyledTableCell align="center">Pv_code</StyledTableCell>
                                                <StyledTableCell align="center">Date_e</StyledTableCell>
                                                <StyledTableCell align="center">Cuserid</StyledTableCell>
                                                <StyledTableCell align="center">Finish_flag</StyledTableCell>
                                                <StyledTableCell align="center">Rate_n</StyledTableCell>
                                                <StyledTableCell align="center">Rate_nc</StyledTableCell>
                                                <StyledTableCell align="center">R_flag</StyledTableCell>
                                                <StyledTableCell align="center">Code</StyledTableCell>
                                                <StyledTableCell align="center">Pindex</StyledTableCell>
                                                <StyledTableCell align="center">Bcapital</StyledTableCell>
                                                <StyledTableCell align="center">S_print</StyledTableCell>
                                                <StyledTableCell align="center">Bank_file</StyledTableCell>
                                                <StyledTableCell align="center">Cname</StyledTableCell>
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

export default withStyles(styles)(CheckBilled)