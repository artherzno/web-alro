import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect } from '../../components/report'
import {
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class PaymentDetail extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isLoading: false,
            isExporting: false,
            loaded: true,
            dataList: [],
            dataSummary: {},
            dateSelect: null,
            page: 0,
            count: 10

        }
    }

    componentDidMount() {


        this.loadData()
    }

    loadData() {

        const parameter = new FormData()
        parameter.append('ContratNo', this.props.match.params.paymentID);

        this.setState({ isLoading: true })
        api.getCompensateDetail(parameter).then(response => {

            this.setState({
                dataList: response.data.data,
                isLoading: false
            })

        }).catch(error => {
            this.setState({ isLoading: false })
        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append('ReceiptType', receiptType);
        parameter.append('ALROProvince', receiptProvince);

        this.setState({
            isExporting: true
        })

        api.exportBilled(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการใช้ใบเสร็จรับเงิน.xlsx');
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
        const { dataSummary, page, count } = this.state

        return (<div>
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
                                <h1>รายละเอียดการชำระเงิน</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <div>
                                            <div className="text-title-payment">คำสั่งเลขที่</div>
                                            <div className="text-value-payment">1234567</div>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div>
                                            <div className="text-title-payment">สัญญาเลขที่</div>
                                            <div className="text-value-payment">1234567</div>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div>
                                            <div className="text-title-payment">เลขประจำตัวประชาชน</div>
                                            <div className="text-value-payment">1234567</div>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <div>
                                            <div className="text-title-payment">ชื่อ-สกุล ผู้ชดใช้หนี้แทน</div>
                                            <div className="text-value-payment">1234567</div>
                                        </div>
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

                                                <StyledTableCell align="center" rowSpan={2}>งวดที่</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={3}>วัน/เดือน/ปี ที่ชำระเงิน</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>เลขที่ใบเสร็จ</StyledTableCell>
                                                <StyledTableCell align="center" colSpan={3}>เงินรอเรียกคืน</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>ดอกเบี้ยค้างชำระ</StyledTableCell>
                                                <StyledTableCell align="center" colSpan={3}>รับชำระดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>รวมรับชำระต่องวด</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>หมายเหตุ</StyledTableCell>

                                            </TableRow>
                                            <TableRow>

                                                <StyledTableCell align="center" >ต้นงวด</StyledTableCell>
                                                <StyledTableCell align="center" >รับชำระ</StyledTableCell>
                                                <StyledTableCell align="center" >คงเหลือ</StyledTableCell>

                                                <StyledTableCell align="center" >ค้างรับ (รายได้อื่น)</StyledTableCell>
                                                <StyledTableCell align="center" >รับ (รายได้อื่น)</StyledTableCell>
                                                <StyledTableCell align="center" >รวม</StyledTableCell>

                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            { //this.state.farmerPayLoanList.slice(page * count, page * count + count)
                                                this.state.dataList.map((data, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <StyledTableCellLine align="left" >{data.installment}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.payDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.receiptNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.beginPeriod}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.paid}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.remaining}</StyledTableCellLine>
                                                            
                                                            <StyledTableCellLine align="left">{data.accruedInterest}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.accrued}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.receive}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.total}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.totalReceivePeriod}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{data.remark}</StyledTableCellLine>
                                                            

                                                        </TableRow>
                                                    )
                                                })}


                                        </TableBody>
                                    </Table>

                                </TableContainer>
                                
                            </Paper>
                        </Box>

                    </Container>
                </div>
            </Fade>


        </div>)
    }
}

export default withStyles(styles)(PaymentDetail)