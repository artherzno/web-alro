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

class ConditionInterest extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            isExporting: false,
            dateSelect: null,
            Date: "",
            ContractNo: "",
            ProjName: "",
            RetrieveYear: "",
            Order: "",
            Display: "",
            data: []
        }
    }

    componentDidMount() {

        this.loadData()
    }

    loadData() {

        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear);
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        api.getTermsAndInterest(parameter).then(response => {

            this.setState({
                data: response.data.data,
            })

        }).catch(error => {

        })
    }

    exportExcel() {


        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear);
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        this.setState({
            isExporting: true
        })


        api.exportTermsAndInterest(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบเงื่อนไข&ดอกเบี้ย.xlsx');
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
                                    <h1>ตรวจสอบเงื่อนไข&ดอกเบี้ย</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" value={this.state.dateSelect} onChange={(event) => {
                                                this.setState({ Date: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {
                                                    this.loadData()
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
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData() }} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck onChange={this.onChange("Order")} />
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
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">ลำดับ</StyledTableCell>
                                                <StyledTableCell align="center">รหัส</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">Date</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่คำสั่ง</StyledTableCell>
                                                <StyledTableCell align="center">วันที่คำสั่ง</StyledTableCell>
                                                <StyledTableCell align="center">วันที่เริ่มต้น</StyledTableCell>
                                                <StyledTableCell align="center">วันที่สิ้นสุด</StyledTableCell>
                                                <StyledTableCell align="center">Code</StyledTableCell>
                                                <StyledTableCell align="center">Rate_nc</StyledTableCell>
                                                <StyledTableCell align="center">Rate</StyledTableCell>
                                                <StyledTableCell align="center">Rate_n</StyledTableCell>
                                                <StyledTableCell align="center">Amount</StyledTableCell>
                                                <StyledTableCell align="center">Mcapital</StyledTableCell>
                                                <StyledTableCell align="center">Minterest</StyledTableCell>
                                                <StyledTableCell align="center">Mcharge</StyledTableCell>
                                                <StyledTableCell align="center">Mindex_1</StyledTableCell>
                                                <StyledTableCell align="center">Types</StyledTableCell>
                                                <StyledTableCell align="center">Tps</StyledTableCell>
                                                <StyledTableCell align="center">Tps_</StyledTableCell>
                                                <StyledTableCell align="center">Pv_code</StyledTableCell>
                                                <StyledTableCell align="center">Finish_flag</StyledTableCell>
                                                <StyledTableCell align="center">Date_e</StyledTableCell>
                                                <StyledTableCell align="center">Cuserid</StyledTableCell>
                                                <StyledTableCell align="center">Cname</StyledTableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {data.map((element, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">{element.saveCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.recordingDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mindex}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.orders}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.id}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projName}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.prentno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.contractNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.date}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.orderNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.orderDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.startDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.endDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.code}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rateNc)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rate)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rateN)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.amount)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.mcapital)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.minterest)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.mcharge)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mindex1}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.types1}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.tps}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.tps1}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.pvCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.finishFlag}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.dateE}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.cuserid}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.cname}</StyledTableCellLine>


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

export default withStyles(styles)(ConditionInterest)