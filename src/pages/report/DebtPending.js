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
import { ButtonExportExcel,ButtonApp } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';

class DebtPending extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExporting: false,
            loaded: true,
            farmerPayLoanList: [],
            dataSummary: {},
            dateSelect: null,
            page: 0,
            count: 10

        }
    }

    componentDidMount() {


        // this.loadPayLoan()
    }

    loadPayLoan() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append('ReceiptType', receiptType);
        parameter.append('ALROProvince', receiptProvince);

        api.getBilled(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
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
                // this.loadData()
            }, 500);

        })


    }


    render() {

        const { classes } = this.props;
        const { dataSummary, page, count } = this.state

        return (<div>
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={this.state.loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">

                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่คำสั่ง" onChange={this.onChange("ContractNo")} />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่คำสั่ง" value={this.state.dateSelect} onChange={(event) => {
                                            this.setState({ Date: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {
                                                // this.loadData()
                                            })
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อ-สกุล ผู้ชดใช้หนี้แทน" onChange={this.onChange("ContractNo")} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่ประจำตัวประชาชนผู้ชดใช้หนี้แทน" onChange={this.onChange("ContractNo")} />
                                    </Grid>



                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่คำสั่ง" onChange={this.onChange("ContractNo")} />
                                    </Grid>


                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ชื่อ-สกุล เกษตรกร" onChange={this.onChange("ContractNo")} />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                            this.loadData()
                                        }} />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <div>
                            <Box mt={5} mb={5}>
                                <Typography variant="h6" align="center">รายงานสถานะหนี้เงินรอเรียกคืน</Typography>
                            </Box>
                        </div>


                        <Box mt={2}>
                            <Paper>
                                <TableContainer>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>

                                                <StyledTableCell align="center" rowSpan={2}>ลำดับ</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>ชื่อ-สกุล</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>เลขที่คำสั่ง</StyledTableCell>
                                                <StyledTableCell align="center" colSpan={3}>เงินรอเรียกคืน</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>ดอกเบี้ยค้างชำระ</StyledTableCell>
                                                <StyledTableCell align="center" colSpan={3}>รับชำระดกอเบี้ย (รายได้อื่น)</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>รวมรับชำระต่องวด</StyledTableCell>
                                                <StyledTableCell align="center" rowSpan={2}>หมายเหตุ</StyledTableCell>

                                            </TableRow>
                                            <TableRow>

                                                <StyledTableCell align="center" ></StyledTableCell>
                                                <StyledTableCell align="center" >รับชำระ</StyledTableCell>
                                                <StyledTableCell align="center" >คงเหลือ</StyledTableCell>
                                                <StyledTableCell align="center" >ค้างรับ</StyledTableCell>
                                                <StyledTableCell align="center" >รับ</StyledTableCell>
                                                <StyledTableCell align="center" >รวม</StyledTableCell>

                                            </TableRow>


                                        </TableHead>
                                        <TableBody>
                                            { //this.state.farmerPayLoanList.slice(page * count, page * count + count)
                                                [1, 1, 1, 1].map((farmer, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <StyledTableCellLine >xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="center">xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="center">xxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxxx</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">xxxxx</StyledTableCellLine>

                                                        </TableRow>
                                                    )
                                                })}
                                            <TableRow>
                                                <StyledTableCellLine align="center" colSpan={3} className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                                    รวม
                                                </StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`} colSpan={2}></StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>xxxxx</StyledTableCellLine>
                                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                                            </TableRow>

                                        </TableBody>
                                    </Table>

                                </TableContainer>
                               <Box mt={3}>
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <ButtonApp label="พิมพ์ PDF" />
                                        </Grid>
                                    </Grid>
                               </Box>
                            </Paper>
                        </Box>

                    </Container>
                </div>
            </Fade>


        </div>)
    }
}

export default withStyles(styles)(DebtPending)