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
import { OverlayLoading } from '../../components'

class CheckBill extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
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
            count: 10,
            totalResult: 0,
            resultList: [],
            pageSub: 0,
            countSub: 10,
            totalResultSub: 0,
            invoiceNo:''
        }
    }

    componentDidMount() {

        this.loadData(this.state.page, this.state.count)
    }

    loadData(page, count) {

        const { PaymentDate, BookNo, ProjName, InvoiceNo, Order, Display, } = this.state

        const parameter = new FormData()
        parameter.append('PaymentDate', PaymentDate);
        parameter.append('BookNo', BookNo);
        parameter.append('ProjName', ProjName);
        parameter.append('InvoiceNo', InvoiceNo);
        parameter.append('Order', Order);
        parameter.append('Display', Display);

        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getInvoice(parameter).then(response => {

            this.setState({
                data: response.data.data,
                isLoading: false,
                totalResult: response.data.totalResult
            })

        }).catch(error => {

            this.setState({ isLoading: false })
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



        })


    }

    getInvoiceById(invoiceNo, page, count) {
        const parameter = new FormData()
        parameter.append("InvoiceNo", invoiceNo)
        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        api.getInvoiceById(parameter).then(response => {

            this.setState({
                resultList: response.data.data,
                pageSub:page,
                totalResultSub: response.data.totalResult,
                invoiceNo: invoiceNo
            })

        }).catch(error => {

        })
    }

    render() {

        const { classes } = this.props;
        const { data, page, count,resultList,pageSub,countSub } = this.state

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
                                    <h1>ตรวจสอบใบแจ้งหนี้</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} md={3}>

                                            <MuiDatePicker label="วันที่รับเงิน" value={this.state.dateSelect} onChange={(event) => {
                                                this.setState({ PaymentDate: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {

                                                })
                                            }} />
                                        </Grid>

                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่ใบแจ้งหนี้" onChange={this.onChange("InvoiceNo")} />
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                            <SortCheck onChange={this.onChange("Order")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <DisplayCheck onChange={this.onChange("Display")} />
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData() }} />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} md={10}></Grid>
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
                                                {data.map((element, index) => {

                                                    return (
                                                        <TableRow key={index} hover={true} onClick={() => {
                                                            this.getInvoiceById(element.invoiceNo,0,this.state.countSub)
                                                        }}>
                                                            <StyledTableCellLine align="left">{element.saveCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.recordingDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pvCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.calDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.invoiceNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.month}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.list}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.times}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.amount)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.numCase)}</StyledTableCellLine>


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

                            <Box mt={2}>
                                <Paper>
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่คำนวน</StyledTableCell>
                                                    <StyledTableCell align="center">รหัสจังหวัด</StyledTableCell>
                                                    <StyledTableCell align="center">ชื่อ</StyledTableCell>
                                                    <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                                    <StyledTableCell align="center">โครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่ยืม</StyledTableCell>
                                                    <StyledTableCell align="center">ใบแจ้งหนี้</StyledTableCell>
                                                    <StyledTableCell align="center">สัญญาเลขที่</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่ครบชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">งวดชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                                    <StyledTableCell align="center">ดอกเบี้ย</StyledTableCell>
                                                    <StyledTableCell align="center">ดอกเบี้ยค้างชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">ดอกเบี้ยชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">Mindex</StyledTableCell>
                                                    <StyledTableCell align="center">จำนวนเงินรับ</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่รับเงิน</StyledTableCell>
                                                    <StyledTableCell align="center">สถานะรับสภาพ</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่รับสภาพ</StyledTableCell>
                                                    <StyledTableCell align="center">Pindex</StyledTableCell>
                                                    <StyledTableCell align="center">Stu</StyledTableCell>
                                                    <StyledTableCell align="center">P_stu</StyledTableCell>
                                                    <StyledTableCell align="center">P_date</StyledTableCell>
                                                    <StyledTableCell align="center">Post_date</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {resultList.slice(pageSub * countSub, pageSub * countSub + countSub).map((element, index) => {

                                                    return (
                                                        <TableRow key={index} hover={true} >
                                                            <StyledTableCellLine align="left">{element.saveCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.recordingDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.calDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pvCode}</StyledTableCellLine>
                                                            
                                                            <StyledTableCellLine align="left">{element.fullName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.idCard}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pvCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.projName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.borrDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.invoice}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.contractNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.dueDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.installment}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.principle}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.interest}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.accruedInterest}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.interestPayment}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.number}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.paymentDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.acquiringStatus}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.acquiringDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.pindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.stu}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.pStu}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.pDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.postDate}</StyledTableCellLine>


                                                        </TableRow>
                                                    )
                                                })}


                                            </TableBody>
                                        </Table>


                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.totalResultSub}
                                        rowsPerPage={this.state.countSub}
                                        page={this.state.pageSub}
                                        onPageChange={(e, newPage) => {

                                            this.getInvoiceById(this.state.invoiceNo, newPage, this.state.countSub)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            this.setState({
                                                countSub: +event.target.value,
                                                pageSub: 0
                                            }, () => {

                                                this.getInvoiceById(this.state.invoiceNo, 0, this.state.countSub)
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

export default withStyles(styles)(CheckBill)