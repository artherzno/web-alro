import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect } from '../../components/check'
import { YearSelect } from '../../components/report'
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

import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import FormData from 'form-data'

class Payment extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            IDCard: "d",
            FullName: "d",
            ContractNo: "d",
            ProjName: "d",
            Address: "d",
            SubDistrict: "d",
            District: "d",
            LandType: "d",
            Num: "d",
            data: []
        }
    }

    componentDidMount() {

        this.loadData()
    }

    loadData() {

        const { IDCard, FullName, ContractNo, ProjName, Address, SubDistrict, District, LandType, Num } = this.state

        const parameter = new FormData()
        parameter.append('IDCard', IDCard);
        parameter.append('FullName', FullName);
        parameter.append('ProjName', ProjName);
        parameter.append('ContractNo', ContractNo);
        parameter.append('Address', Address);
        parameter.append('SubDistrict', SubDistrict);
        parameter.append('LandType', LandType);
        parameter.append('District', District);
        parameter.append('Num', Num);

        api.getPaymentBalance(parameter).then(response => {

            this.setState({
                data: response.data.data,
            })

        }).catch(error => {

        })
    }

    exportExcel() {


        const { IDCard, FullName, ContractNo, ProjName, Address, SubDistrict, District, LandType, Num } = this.state

        const parameter = new FormData()
        parameter.append('IDCard', IDCard);
        parameter.append('FullName', FullName);
        parameter.append('ProjName', ProjName);
        parameter.append('ContractNo', ContractNo);
        parameter.append('Address', Address);
        parameter.append('SubDistrict', SubDistrict);
        parameter.append('LandType', LandType);
        parameter.append('District', District);
        parameter.append('Num', Num);

        this.setState({
            isExporting: true
        })


        api.exportPaymentBalance(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบยอดการชำระเงิน.xlsx');
            document.body.appendChild(link);
            link.click();

            this.setState({
                isExporting: false
            })

        }).catch(error => {

            this.setState({
                isExporting: false
            })

        })
    }

    onChange = (state) => (event) => {

        this.setState({
            [state]: event.target.value
        }, () => {

            if (this.delay) {
                clearTimeout(this.delay)
                this.delay = null
            }
            this.delay = setTimeout(() => {
                this.loadData()
            }, 500);

        })


    }

    render() {

        const { classes } = this.props;
        const { data } = this.state

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
                                    <h1>ตรวจสอบยอดการชำระเงิน</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาบัตรประชาชน" onChange={this.onChange("IDCard")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ชื่อ - นามสกุล" onChange={this.onChange("FullName")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" onChange={this.onChange("ContractNo")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="โครงการ" onChange={this.onChange("ProjName")} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ที่ตั้งที่ดิน หมู่" onChange={this.onChange("Address")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ตำบล" onChange={this.onChange("SubDistrict")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="อำเภอ" onChange={this.onChange("District")} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ประเภทที่ดิน" onChange={this.onChange("LandType")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่" onChange={this.onChange("Num")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                        </Grid>


                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData() }} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <div style={{ marginTop: -8 }}>
                                                <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting} />
                                            </div>

                                        </Grid>

                                    </Grid>
                                </Grid>



                            </Grid>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">ชื่อ-นาสกุล</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                                <StyledTableCell align="center">รหัสโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {data.map((element, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">{element.fullName}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.contractNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.idCard}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projName}</StyledTableCellLine>


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

                            <Box mt={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("1")} />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="บัตรประชาชน" onChange={this.onChange("1")} />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="ชื่อ-นามสกุล เกษตรกร" onChange={this.onChange("1")} />
                                    </Grid>
                                </Grid>


                                <Box mt={2}>
                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>วันที่ประมวลผล</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiDatePicker onChange={() => { }} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ประมวลผล" onClick={() => { this.loadData() }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>เงินต้นคงเหลือ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>เงินต้นคงค้าง</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>ดอกเบี้ยค้างรับ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>ดอกเบี้ยในงวด</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>รวมดอกเบี้ยที่ต้องชำระ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>ค่าปรับค้างรับ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>อัตราดอกเบี้ย</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>อัตราค่าปรับ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>

                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>รวมยอดเงินที่ต้องชำระ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.onChange("1")} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment start">
                                                <div>บาท</div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                </Box>
                               
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(Payment)