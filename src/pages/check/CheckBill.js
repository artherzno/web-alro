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
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'

class CheckBill extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            isExporting: false,
            dateSelect: null,
            PaymentDate: "",
            BookNo: "",
            ProjName: "",
            InvoiceNo: "",
            Order: "",
            Display: "",
            data: [],
            page: 0,
            count: 10
        }
    }

    componentDidMount() {

        this.loadData()
    }

    loadData() {

        const { PaymentDate, BookNo, ProjName, InvoiceNo, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('PaymentDate', PaymentDate);
        parameter.append('BookNo', BookNo);
        parameter.append('ProjName', ProjName);
        parameter.append('InvoiceNo', InvoiceNo);
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        api.getInvoice(parameter).then(response => {

            this.setState({
                data: response.data.data,
            })

        }).catch(error => {

        })
    }

    exportExcel() {


        const { PaymentDate, BookNo, ProjName, InvoiceNo, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('PaymentDate', PaymentDate);
        parameter.append('BookNo', BookNo);
        parameter.append('ProjName', ProjName);
        parameter.append('InvoiceNo', InvoiceNo);
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        this.setState({
            isExporting: true
        })


        api.exportInvoice(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบใบแจ้งหนี้.xlsx');
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
                                    <h1>ตรวจสอบใบแจ้งหนี้</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่หนังสือ" onChange={this.onChange("BookNo")}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            
                                            <MuiDatePicker label="วันที่รับเงิน" value={this.state.dateSelect} onChange={(event) => {
                                                this.setState({ PaymentDate: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {
                                                    this.loadData()
                                                })
                                            }}/>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" onChange={this.onChange("ProjName")}/>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="เลขที่ใบแจ้งหนี้" onChange={this.onChange("InvoiceNo")}/>
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
                                            {data.slice(page * count, page * count + count).map((element, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">{element.saveCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.recordingDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.pvCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.calDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.invoiceNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.month}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.list}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.times}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.amount)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.numCase)}</StyledTableCellLine>


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

export default withStyles(styles)(CheckBill)