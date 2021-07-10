import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect, BorrowTypeSelect } from '../../components/check'

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

class CheckSign extends React.Component {

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
                                    <h1>ตรวจสอบสัญญา</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาชื่อ" />
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

                            <div className="container-filter">
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <MainProjectSelect/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <SecondProjectSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanTypeSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanderTypeSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <ObjectiveLoanSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <BorrowTypeSelect />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanPlanSelect />
                                        </Grid>
                                        
                                    </Grid>
                                </Box>
                            </div>
                            
                            <Box mt={2}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={3} >
                                        <ButtonFluidPrimary label="ค้นหา" />
                                    </Grid>
                                </Grid>
                            </Box>
                          
                            <Box mt={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="จำนวนสัญญา" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="จำนวนเงินเหลือ" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="จำนวนเงินกู้" />
                                    </Grid>
                           
                                </Grid>
                            </Box>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">รหัส</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">คำนำหน้า</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อ</StyledTableCell>
                                                <StyledTableCell align="center">นามสกุล</StyledTableCell>
                                                <StyledTableCell align="center">ที่อยู่</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่</StyledTableCell>
                                                <StyledTableCell align="center">หมู่</StyledTableCell>
                                                <StyledTableCell align="center">ตำบล</StyledTableCell>
                                                <StyledTableCell align="center">อำเภอ</StyledTableCell>
                                                <StyledTableCell align="center">จังหวัด</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">วันที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">หมู่(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">ตำบล(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">อำเภอ(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">ประเภท(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">Titleno</StyledTableCell>
                                                <StyledTableCell align="center">Group</StyledTableCell>
                                                <StyledTableCell align="center">แปลง</StyledTableCell>
                                                <StyledTableCell align="center">ไร่</StyledTableCell>
                                                <StyledTableCell align="center">งาน</StyledTableCell>
                                                <StyledTableCell align="center">วา</StyledTableCell>
                                                <StyledTableCell align="center">วันที่กู้</StyledTableCell>
                                                <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                                <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center">รหัสงาน</StyledTableCell>
                                                <StyledTableCell align="center">ประเภท</StyledTableCell>
                                                <StyledTableCell align="center">ใช้เงินปี</StyledTableCell>
                                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                                <StyledTableCell align="center">อัตราค่าปรับ</StyledTableCell>
                                                <StyledTableCell align="center">Trnf_date</StyledTableCell>
                                                <StyledTableCell align="center">Typeplan</StyledTableCell>
                                                <StyledTableCell align="center">หมายเหตุ</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อย่อจังหวัด</StyledTableCell>
                                                <StyledTableCell align="center">Finish_flag</StyledTableCell>
                                                <StyledTableCell align="center">Rpay</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้เงินต้น</StyledTableCell>
                                                <StyledTableCell align="center">ศาล(ต้น+ดอก)</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้ดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้ค่าปรับ</StyledTableCell>
                                                <StyledTableCell align="center">สถานะตั้งหนี้</StyledTableCell>
                                                <StyledTableCell align="center">Obj_code</StyledTableCell>
                                                <StyledTableCell align="center">Cus_code</StyledTableCell>
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

export default withStyles(styles)(CheckSign)