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
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import { OverlayLoading } from '../../components'

class CheckBilled extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            loaded: true,
            isExporting: false,
            dateSelect: null,
            Date: "",
            ContractNo: "",
            ProjName: "",
            Retrieveyear: "",
            YearTovalue: "",
            YearToLabel: "",
            Order: 0,
            Display: "",
            data: [],
            page: 0,
            count: 10,
            totalResult:0,
            dataSummary: {},
            checkDocument: false
        }
    }

    componentDidMount() {

        this.loadData(this.state.page,this.state.count)
    }

    loadData(page,count) {

        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear||'');
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        parameter.append('Page', page+1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getReceipt(parameter).then(response => {

            this.setState({
                data: response.data.data,
                dataSummary: response.data.dataSummary,
                isLoading: false,
                page: page,
                totalResult: response.data.totalResult
            })

        }).catch(error => {

            this.setState({ isLoading: false })
        })
    }

    exportExcel() {


        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear||'');
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        this.setState({
            isExporting: true
        })


        api.exportReceipt(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบใบเสร็จรับเงิน.xlsx');
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
        const { data, page, count, dataSummary } = this.state

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
                                    <h1>ตรวจสอบใบเสร็จรับเงิน</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" value={this.state.dateSelect} onChange={(event) => {
                                                this.setState({ Date: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {

                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("ContractNo")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" onChange={this.onChange("ProjName")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <YearSelect label="ดึงข้อมูลตั้งแต่ปีพ.ศ" onChange={this.onChange("RetrieveYear")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData(0,this.state.count) }} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={<Checkbox checked={this.state.checkDocument} onChange={(e) => {
                                                    this.setState({
                                                        checkDocument: e.target.checked,
                                                        Order: e.target.checked ? 1 : 0
                                                    })
                                                }} name="billed" />}
                                                label="ดูใบเสร็จฟ้องศาล"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <DisplayCheck onChange={this.onChange("Display")} />
                                        </Grid>
                                        <Grid item xs={12} md={4}></Grid>
                                        <Grid item xs={12} md={2}>
                                            <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting} />
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
                                                    <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">Mindex</StyledTableCell>
                                                    <StyledTableCell align="center">ครั้งที่</StyledTableCell>
                                                    <StyledTableCell align="center">รหัสโครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่ชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">เล่มที่/เลขที่</StyledTableCell>
                                                    <StyledTableCell align="center">Rcpno 1</StyledTableCell>
                                                    <StyledTableCell align="center">จ่ายเงินต้น</StyledTableCell>
                                                    <StyledTableCell align="center">จ่ายดอกเบี้ย</StyledTableCell>
                                                    <StyledTableCell align="center">จ่ายค่าปรับ</StyledTableCell>
                                                    <StyledTableCell align="center">Rate</StyledTableCell>
                                                    <StyledTableCell align="center">Ref_id</StyledTableCell>
                                                    <StyledTableCell align="center">รวมทั้งสิ้น</StyledTableCell>
                                                    <StyledTableCell align="center">Pcapital</StyledTableCell>
                                                    <StyledTableCell align="center">Pcap_1</StyledTableCell>
                                                    <StyledTableCell align="center">Pcap_2</StyledTableCell>
                                                    <StyledTableCell align="center">Pint_1</StyledTableCell>
                                                    <StyledTableCell align="center">Pint_2</StyledTableCell>
                                                    <StyledTableCell align="center">Paycharge</StyledTableCell>
                                                    <StyledTableCell align="center">Pother</StyledTableCell>
                                                    <StyledTableCell align="center">Pbank</StyledTableCell>
                                                    <StyledTableCell align="center">Pv_code</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่แก้ไข</StyledTableCell>
                                                    <StyledTableCell align="center">Cuserid</StyledTableCell>
                                                    <StyledTableCell align="center">Rate_n</StyledTableCell>
                                                    <StyledTableCell align="center">Rate_nc</StyledTableCell>
                                                    <StyledTableCell align="center">Code</StyledTableCell>
                                                    <StyledTableCell align="center">Pindex</StyledTableCell>
                                                    <StyledTableCell align="center">Bcapital</StyledTableCell>
                                                    <StyledTableCell align="center">S_print</StyledTableCell>
                                                    <StyledTableCell align="center">Bank_file</StyledTableCell>
                                                    <StyledTableCell align="center">Cname</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {data.map((element, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <StyledTableCellLine align="left">{element.saveCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.recordingDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.times}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.id}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.projName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.contractNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.dueDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.receiptNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.rcpno1}</StyledTableCellLine>

                                                            <StyledTableCellLine align="right">{formatNumber(element.payPrincipal)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.payInterest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.fine)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.refId}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.payment)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcap1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pcap2)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint1)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pint2)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.paychage)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.pother)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pbank}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pvCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.dateC}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.cuserid}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rateN)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.rateNc)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.code}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.bcapital)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.sPrint}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.bankFile}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.cname}</StyledTableCellLine>


                                                        </TableRow>
                                                    )
                                                })}

                                                <TableRow>
                                                    <StyledTableCellLine colSpan={10} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                                        รวมทั้งสิ้น
                                                    </StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.payPrincipal)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.payInterest)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.fine)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.rate)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.payment)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.rcapital)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.pcap1)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.pcap2)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.pint1)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.pint2)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.paychage)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.pother)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="left" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.rateN)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.rateNc)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="left" colSpan={2} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.rateN}`}>{formatNumber(dataSummary.bcapital)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="left" colSpan={3} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                                </TableRow>

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

                                            this.loadData(newPage,this.state.count)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            this.setState({
                                                count: +event.target.value,
                                                page: 0
                                            },() =>{
                                                
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

export default withStyles(styles)(CheckBilled)