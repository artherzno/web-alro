import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect } from '../../components/report'
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
import moment from 'moment'
import { formatNumber} from '../../utils/Utilities'
import { ButtonExportExcel} from '../../components'
import {
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class ListFarmPayLoanTab extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isLoading: false,
            isExporting:false,
            farmerPayLoanList: [],
            dataSummary:{},
            displaySection: 0,
            sectionProvince: "",
            month: "",
            year: "",
            display2: "",
            startDate: "",
            endDate: "",
            receiptType: "",
            receiptProvince: "",
            provinceZoneLabel:"",
            montLabel:"",
            yearLabel:"",
            dateRangLabel:"",
            receiptTypeLabel:"",
            provinceReiptLabel:"",
            page: 0,
            count: 10

        }
    }

    componentDidMount() {


        this.loadPayLoan()
    }

    loadPayLoan() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ReceiptType', receiptType);
        parameter.append('ALROProvince', receiptProvince);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        this.setState({ isLoading: true })
        api.getPayLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
                isLoading: false
            })

        }).catch(error => {
            this.setState({ isLoading: false })
        })
    }

    exportExcel(){

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ReceiptType', receiptType);
        parameter.append('ALROProvince', receiptProvince);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        this.setState({
            isExporting: true
        })

        api.exportPayloanExcel(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้.xlsx');
            document.body.appendChild(link);
            link.click();
         
            this.setState({
                isExporting:false
            })

        }).catch(error => {

            this.setState({
                isExporting: false
            })

        })

    }

    render() {

        const { classes } = this.props;
        const { dataSummary, page, count} = this.state

        return (<div>

            <OverlayLoading isLoading={this.state.isLoading} />
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect
                                onChange={(event) => {

                                    this.setState({
                                        displaySection: event.target.value,
                                        sectionProvince: "",
                                        provinceZoneLabel:""
                                    }, () => {
                                    })
                                }}
                                onChangeProvince={(event) => {
                                    this.setState({
                                        sectionProvince: event.target.value,
                                        provinceZoneLabel:`จังหวัด${event.label}`
                                    }, () => {
                                    })
                                }}
                                onChangeSection={(event) => {
                                    this.setState({
                                        sectionProvince: event.target.value,
                                        provinceZoneLabel: `${event.label}`
                                    }, () => {
                                    })
                                }}
                            />
                        </Grid>

                    </Grid>

                </Grid>
                <Grid item />
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplayMonthSelect
                                onChange={(event) => {

                                    this.setState({
                                        display2: event.target.value,
                                        month: "",
                                        year: "",
                                        startDate: "",
                                        endDate: "",
                                        yearLabel:"",
                                        montLabel:"",
                                        dateRangLabel:""

                                    }, () => {
                                    })
                                }}
                                onChangeDate={(event) => {
                                    console.log("event", event)

                                    if (event.length >= 2) {

                                        const startDate = moment(event[0]).format("YYYY-MM-DD")
                                        const endDate = moment(event[1]).format("YYYY-MM-DD")


                                        this.setState({
                                            startDate: startDate,
                                            endDate: endDate,
                                            dateRangLabel: `${moment(event[0]).add(543, 'years').format("DD MMMM YYYY")} - ${event[1] ? moment(event[1]).add(543, 'years').format("DD MMMM YYYY") : ''}`
                                        }, () => {
                                        })
                                    }
                                }}
                                onChangeMonth={(event) => {

                                    this.setState({
                                        month: event.target.value,
                                        montLabel:`เดือน${event.label}`
                                    }, () => {
                                    })

                                }}
                                onChangeYear={(event) => {
                                    this.setState({
                                        year: event.target.value,
                                        yearLabel: event.target.value
                                    }, () => {
                                    })
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item />
                
                <Grid item>
                    <Grid container spacing={2}>

                        <Grid item>
                            <TypeBillSelect
                                onChange={(event) => {
                                    this.setState({
                                        receiptType: event.target.value,
                                        receiptProvince: "",
                                        receiptTypeLabel:event.label,
                                        provinceReiptLabel:""
                                    }, () => {
                                    })
                                }}
                                onChangeProvince={(event) => {
                                    this.setState({
                                        receiptProvince: event.target.value,
                                        provinceReiptLabel:event.label
                                    }, () => {
                                    })
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>

                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan() }} />
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้ {`${this.state.provinceZoneLabel}`}</Typography>
                    {this.state.dateRangLabel != "" ? <Typography variant="h6" align="center">{`${this.state.dateRangLabel}`}</Typography> : <Typography variant="h6" align="center">{`${this.state.montLabel} ${this.state.yearLabel}`}</Typography>}
                    {this.state.receiptTypeLabel != "" ? <Typography variant="h6" align="center">ประเภทใบเสร็จรับเงิน {`${this.state.receiptTypeLabel} ${this.state.provinceReiptLabel}`}</Typography> : ""}
                </Box>
            </div>
            <Grid container>
                <Grid item xs>

                </Grid>

                <Grid item>
                    <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting}/>
                </Grid>
            </Grid>

            <Box mt={2}>
                <Paper>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>บัตรประชาชน</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>สัญญาเลขที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ชื่อ-นามสกุล</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เลขที่ใบแจ้งหนี้</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}><div><Typography align="center" variant="body2">ว/ด/ป</Typography><Typography align="center" variant="body2">ใบเสร็จ</Typography></div></StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เลขที่ใบเสร็จ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ช่องทางการชำระเงิน</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ชำระเงินกู้</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}> ค้างรับ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ค่าปรับ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ชำระเกิน</StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell align="center">ค้างรับ</StyledTableCell>
                                    <StyledTableCell align="center">รับ</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine component="th" align="center" scope="row">
                                                {farmer.no}
                                            </StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.idCard}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.invoiceNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.receiptDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.receiptNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.payChannel}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.payLoan)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.principle)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.overdueAmount)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.amount)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.remaining)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.overPaid)}</StyledTableCellLine>
                                        </TableRow>
                                    )
                                })}


                                <TableRow  >
                                    <StyledTableCellLine className={classes.cellSummary} colSpan={8} align="right">รวมทั้งสิ้น</StyledTableCellLine>
                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.payLoan)}</StyledTableCellLine>
                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.principle)}</StyledTableCellLine>
                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.overdueAmount)}</StyledTableCellLine>
                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.amount)}</StyledTableCellLine>

                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.remaining)}</StyledTableCellLine>
                                    <StyledTableCellLine className={classes.cellSummary} align="right">{formatNumber(dataSummary.overPaid)}</StyledTableCellLine>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={this.state.farmerPayLoanList.length}
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
        </div>)
    }
}

export default withStyles(styles)(ListFarmPayLoanTab)