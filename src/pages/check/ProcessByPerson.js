import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect, ProcessSelect } from '../../components/check'
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
import Checkbox from '@material-ui/core/Checkbox';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import { format } from 'date-fns';

class ProcessByPerson extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            isExporting: false,
            dateSelect: null,
            ContractNo: "",
            ProjName: "",
            Year: "",
            Order: "",
            Process: "",
            data: [],
            page: 0,
            count: 10
        }
    }

    componentDidMount() {

        this.loadData()
    }

    loadData() {

        const { ContractNo, ProjName, Year, Order, Process, } = this.state

        const parameter = new FormData()
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('Year', Year);
        parameter.append('Order', Order);
        parameter.append('Process', Process);

        api.getAccountsReceivable(parameter).then(response => {

            this.setState({
                data: response.data.data,
            })

        }).catch(error => {

        })
    }

    exportExcel() {


        const { ContractNo, ProjName, Year, Order, Process, } = this.state

        const parameter = new FormData()
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('Year', Year);
        parameter.append('Order', Order);
        parameter.append('Process', Process);

        this.setState({
            isExporting: true
        })


        api.exportAccountsReceivable(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบประมวลพิมพ์ลูกหนี้รายตัว.xlsx');
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
        const { data, page, count } = this.state
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
                                    <h1>ตรวจสอบประมวล พิมพ์ลูกหนี้รายตัว</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("ContractNo")} />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" onChange={this.onChange("ProjName")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="อัตราดอกเบี้ย" type="number"/>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <YearSelect label="ปี" onChange={this.onChange("Year")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                                this.loadData()
                                            }} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                 <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck onChange={this.onChange("Order")}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <ProcessSelect onChange={this.onChange("Process")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonExportExcel label="พิมพ์ลูกหนี้รายตัว" handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting}/>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center" padding="checkbox" minWidth={50}><Checkbox/></StyledTableCell>
                                                <StyledTableCell align="center">mid</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">Projcode</StyledTableCell>
                                                <StyledTableCell align="center">Projname</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">Rentno</StyledTableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                                <StyledTableCell align="center">Loandate</StyledTableCell>
                                                <StyledTableCell align="center">Paydate</StyledTableCell>
                                                <StyledTableCell align="center">Payrec</StyledTableCell>
                                                <StyledTableCell align="center">Rcpno</StyledTableCell>
                                                <StyledTableCell align="center">Principle</StyledTableCell>
                                                <StyledTableCell align="center">Payment</StyledTableCell>
                                                <StyledTableCell align="center">PayIntr</StyledTableCell>
                                                <StyledTableCell align="center">Paycharge</StyledTableCell>
                                                <StyledTableCell align="center">Captpaid</StyledTableCell>
                                                <StyledTableCell align="center">Intpaid</StyledTableCell>
                                                <StyledTableCell align="center">Chrgpaid</StyledTableCell>
                                                <StyledTableCell align="center">Unpaid</StyledTableCell>
                                                <StyledTableCell align="center">Unpaid1</StyledTableCell>
                                                <StyledTableCell align="center">Unpaid2</StyledTableCell>
                                                <StyledTableCell align="center">Credit</StyledTableCell>
                                                <StyledTableCell align="center">Dcapital</StyledTableCell>
                                                <StyledTableCell align="center">Dinterest</StyledTableCell>
                                                <StyledTableCell align="center">Dcharge</StyledTableCell>
                                                <StyledTableCell align="center">Pcapital</StyledTableCell>
                                                <StyledTableCell align="center">Pcap0</StyledTableCell>
                                                <StyledTableCell align="center">Pcap1</StyledTableCell>
                                                <StyledTableCell align="center">Pcap2</StyledTableCell>
                                                <StyledTableCell align="center">Pinterest</StyledTableCell>
                                                <StyledTableCell align="center">Pint_0</StyledTableCell>
                                                <StyledTableCell align="center">Pint_1</StyledTableCell>
                                                <StyledTableCell align="center">Pint_2</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_0</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_1</StyledTableCell>
                                                <StyledTableCell align="center">Pcharge_2</StyledTableCell>
                                                <StyledTableCell align="center">Bcapital</StyledTableCell>
                                                <StyledTableCell align="center">Binterest</StyledTableCell>
                                                <StyledTableCell align="center">Bcharge</StyledTableCell>
                                                <StyledTableCell align="center">Scapital</StyledTableCell>
                                                <StyledTableCell align="center">Sinterest</StyledTableCell>
                                                <StyledTableCell align="center">Minterest</StyledTableCell>
                                                <StyledTableCell align="center">Mcharge</StyledTableCell>
                                                <StyledTableCell align="center">Appendflgs</StyledTableCell>
                                                <StyledTableCell align="center">P_pay</StyledTableCell>
                                                <StyledTableCell align="center">P_intr</StyledTableCell>
                                                <StyledTableCell align="center">P_charge</StyledTableCell>
                                                <StyledTableCell align="center">A_charge</StyledTableCell>
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
                                                <StyledTableCell align="center">Remarks</StyledTableCell>
                                                <StyledTableCell align="center">K_capital</StyledTableCell>
                                                <StyledTableCell align="center">K_interest</StyledTableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {data.slice(page * count, page * count + count).map((element, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center"><Checkbox /></StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mid}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mindex}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projcode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projname}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.prentno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.rentno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.date}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.loandate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.paydate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.payrec)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.rcpno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.principle)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.payment)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.paylntr)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.paycharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.captpaid)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.intpaid)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.chrgpaid)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.unpaid)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.unpaid1)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.unpaid2)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.credit)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.dcapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.dinterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.dcharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcap0)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcap1)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcap2)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pinterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pint_0)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pint_1)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pint_2)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcharge_0)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcharge_1)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcharge_2)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.bcapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.binterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.bcharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.scapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.sinterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.minterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.mcharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.appendFlgs}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pPay)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pIntr)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pCharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.aCapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.aInterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.aCharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.cmddate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.startdate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.enddate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.types1}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rateN)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rateNC)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.tps0}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.tps1}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcap01)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pcap02)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pintr01)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.pintr02)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.ptotal01)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.uintr01)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.kpkAmt1)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.kpkAmt2)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.kpkAmt3)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.remarks}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.kCapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.kInterest)}</StyledTableCellLine>
                                                        


                                                    </TableRow>
                                                )
                                            })}


                                        </TableBody>
                                    </Table>

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
                                    
                                </TableContainer>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(ProcessByPerson)