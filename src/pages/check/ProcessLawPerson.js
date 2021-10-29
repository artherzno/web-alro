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
import { YearSelect } from '../../components/report'
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
import { OverlayLoading } from '../../components'

class ProcessLawPerson extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            loaded: true,
            isExporting: false,
            dateSelect: null,
            ContractNo: "",
            ProjName: "",
            year: "",
            YearTovalue: "",
            YearToLabel: "",
            Order: "",
            Process: "",
            data: [],
            page: 0,
            count: 10,
            totalResult: 0,
        }
    }

    componentDidMount() {

        this.loadData(this.state.page, this.state.count)
    }

    loadData(page, count) {

        const { ContractNo, ProjName, Year, Order, Process, } = this.state

        const parameter = new FormData()
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('Year', Year);
        parameter.append('Order', Order);
        parameter.append('Process', Process);

        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getAppraisalCourt(parameter).then(response => {

            this.setState({
                data: response.data.data,
                isLoading: false,
                page: page,
                totalResult: response.data.totalResult
            })

        }).catch(error => {
            this.setState({ isLoading: false })
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


        api.exportAppraisalCourt(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบประมวลฟ้องศาลพิมพ์ลูกหนี้รายตัว.xlsx');
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


        })


    }


    render() {

        const { classes } = this.props;
        const { data, page, count } = this.state


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
                                    <h1>ตรวจสอบประมวลฟ้องศาล พิมพ์ลูกหนี้รายตัว</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("ContractNo")}/>
                                        </Grid>
                                       
                                        <Grid item xs={12} md={2}>
                                            <YearSelect label="ปี" onChange={this.onChange("Year")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck onChange={this.onChange("Order")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <ProcessLawSelect onChange={this.onChange("Process")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() =>{
                                                this.loadData(0, this.state.count)
                                            }}/>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                       
                                        <Grid item xs={12} md={10}>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonExportExcel label="พิมพ์ลูกหนี้รายตัว" handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting}/>
                                        </Grid>

                                    </Grid>
                                </Grid>

                            </Grid>

                            <Box mt={2}>
                                <Paper>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center" minWidth={50}><Checkbox /></StyledTableCell>
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
                                                {this.state.data.map((element, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <StyledTableCellLine align="left"><Checkbox /></StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.mid}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.projcode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.projname}</StyledTableCellLine>

                                                            <StyledTableCellLine align="left">{element.prentno}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.date}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.rcpno}</StyledTableCellLine>


                                                            <StyledTableCellLine align="right">{formatNumber(element.principle)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.unpaid)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.credit)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.dcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.dcapital1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.dinterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.dinterest1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.djinterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.dcharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pjcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcap0)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pjinterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pinterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint_00)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint_01)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint_0)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint_1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint_2)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcharge_0)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcharge_1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcharge_2)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.bcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.bcapital1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{ }</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.binterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.binterest1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{ }</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.bcharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.minterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.scapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.sinterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.mcharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.appendFlgs)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pPay)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pIntr)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pCharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.aCapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.aInterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.aCharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.cCapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.cInterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.cCharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.jCapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.jInterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.jCharge)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rateC)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.cmddate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.startdate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.enddate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.types1}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rateN)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rateNC)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.tps0}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.tps1}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcap01)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcap02)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pintr01)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pintr02)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.ptotal01)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.uintr01)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.kpkAmt1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.kpkAmt2)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.kpkAmt3)}</StyledTableCellLine>

                                                        </TableRow>
                                                    )
                                                })}


                                            </TableBody>
                                        </Table>

                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.totalResult}
                                        rowsPerPage={this.state.count}
                                        page={this.state.page}
                                        onPageChange={(e, newPage) => {

                                            this.loadData(newPage, this.state.count)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            this.setState({
                                                count: +event.target.value,
                                                page: 0
                                            }, () => {

                                                this.loadData(0, this.state.count)

                                            })
                                        }}
                                    />
                                </Paper>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(ProcessLawPerson)