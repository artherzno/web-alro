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
import { OverlayLoading } from '../../components'

class Payment extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            loaded: true,
            IDCard: "",
            FullName: "",
            ContractNo: "",
            ProjName: "",
            Address: "",
            SubDistrict: "",
            District: "",
            LandType: "",
            Num: "",
            data: [],
            selectedPayment: {},
            dateSelect:null,
            dataSummary: {
                accruedInterest: 0,
                fineRate: 0,
                fines: 0,
                interestPeriod: 0,
                interestRate: 0,
                outPrincipal: 0,
                remPrincipal: 0,
                totalAmount: 0,
                totalInterest: 0,
                calDate:""
            },
            page: 0,
            count: 10
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

        this.setState({ isLoading: true })
        api.getPaymentBalance(parameter).then(response => {

            this.setState({
                data: response.data.data,
                isLoading: false
            })

        }).catch(error => {

            this.setState({ isLoading: false })
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

    getCalPayment() {

        const { selectedPayment, dataSummary } = this.state

        const parameter = new FormData()
        parameter.append("IDCard", selectedPayment.idCard)
        parameter.append("ContractNo", selectedPayment.contractNo)
        parameter.append("RemPrincipal", dataSummary.remPrincipal)
        parameter.append("OutPrincipal", dataSummary.outPrincipal)
        parameter.append("AccruedInterest", dataSummary.accruedInterest)
        parameter.append("InterestPeriod", dataSummary.interestPeriod)
        parameter.append("TotalInterest", dataSummary.totalInterest)
        parameter.append("Fines", dataSummary.fines)
        parameter.append("InterestRate", dataSummary.interestRate)
        parameter.append("FineRate", dataSummary.fineRate)
        parameter.append("TotalAmount", dataSummary.totalAmount)
        parameter.append("CalDate", dataSummary.calDate)
        


        api.getCalPayment(parameter).then(response => {

            this.setState({
                dataSummary: response.data.dataSummary
            })

        }).catch(error => {

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

    changeInputCal = (key) => (event) => {

        const dataSummary = this.state.dataSummary
        dataSummary[key] = event.target.value
        this.setState({
            dataSummary: dataSummary
        },() =>{

            if (this.delay) {
                clearTimeout(this.delay)
                this.delay = null
            }
            this.delay = setTimeout(() => {
                
                this.getCalPayment()

            }, 500);

            
        })
    }

    render() {

        const { classes } = this.props;
        const { data, selectedPayment, page, count, dataSummary } = this.state
        const { accruedInterest,
            fineRate,
            fines,
            interestPeriod,
            interestRate,
            outPrincipal,
            remPrincipal,
            totalAmount,
            totalInterest } = dataSummary

        return (
            <div>
                <OverlayLoading isLoading={this.state.isLoading} />
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
                                <Paper>
                                    <TableContainer >
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
                                                {data.slice(page * count, page * count + count).map((element, index) => {

                                                    return (
                                                        <TableRow hover={true} key={index} selected={selectedPayment.contractNo === element.contractNo} tabIndex={-1} onClick={() => {

                                                            this.setState({
                                                                selectedPayment: element
                                                            },() =>{
                                                                this.getCalPayment()
                                                            })
                                                        }}>
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


                                    </TableContainer>

                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.data.length}
                                        rowsPerPage={this.state.count}
                                        page={this.state.page}
                                        onPageChange={(e, newPage) => {

                                            this.setState({
                                                page: newPage
                                            })
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            this.setState({
                                                count: +event.target.value,
                                                page: 0
                                            })
                                        }}
                                    />
                                </Paper>
                            </Box>

                            <Box mt={5}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="เลขที่สัญญา" value={selectedPayment.contractNo} disabled={true} />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="บัตรประชาชน" value={selectedPayment.idCard} disabled={true} />
                                    </Grid>
                                    <Grid item xs={12} md={4} >
                                        <MuiTextfield label="ชื่อ-นามสกุล เกษตรกร" value={selectedPayment.fullName} disabled={true} />
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
                                            <MuiDatePicker value={this.state.dateSelect}  onChange={(event) => {
                                                // calDate
                                                console.log("event", event)
                                                const date = moment(event).format("YYYY-MM-DD")
                                                console.log("date",date)

                                                this.setState({ dateSelect:date})
                                                this.changeInputCal("calDate")({ target: { value: date } })

                                             }} />
                                        </Grid>
                                        <Grid item xs={3} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ประมวลผล" onClick={() => { 
                                                
                                                this.getCalPayment()

                                             }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} direction="row" justifyContent="center">
                                        <Grid item xs={3} md={2}>
                                            <div className="item-check-payment">
                                                <div>เงินต้นคงเหลือ</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={3}>
                                            <MuiTextfield onChange={this.changeInputCal("remPrincipal")} value={remPrincipal} />
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
                                            <MuiTextfield onChange={this.changeInputCal("outPrincipal")} value={outPrincipal}/>
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
                                            <MuiTextfield onChange={this.changeInputCal("accruedInterest")} value={accruedInterest}/>
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
                                            <MuiTextfield onChange={this.changeInputCal("interestPeriod")} value={interestPeriod}/>
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
                                            <MuiTextfield onChange={this.changeInputCal("totalInterest")} value={totalInterest}/>
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
                                            <MuiTextfield onChange={this.changeInputCal("fines")} value={fines}/>
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
                                            <MuiTextfield type="number" onChange={this.changeInputCal("interestRate")} value={interestRate}/>
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
                                            <MuiTextfield onChange={this.changeInputCal("fineRate")} value={fineRate}/>
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
                                            <MuiTextfield disabled={true} value={totalAmount} />
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