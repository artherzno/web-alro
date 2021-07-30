import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect,SectionSelect } from '../../components/report'
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
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';

class PayLoanTab extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExporting: false,
            farmerPayLoanList: [],
            dataSummary: {},
            displaySection: "",
            sectionProvince: "",
            month: "",
            year: "",
            display2: "",
            startDate: "",
            endDate: "",
            receiptType: "",
            receiptProvince: "",
            provinceZoneLabel: "",
            montLabel: "",
            yearLabel: "",
            dateRangLabel: "",
            page: 0,
            count: 10

        }
    }

    componentDidMount() {


        this.loadPayLoan()
    }

    loadPayLoan() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        api.getPayLoanList(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate,  } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        this.setState({
            isExporting: true
        })
        api.exportPayLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการจ่ายเงินกู้.xlsx');
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

    render() {

        const { classes } = this.props;
        const { dataSummary, page, count} = this.state

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect
                                onChange={(event) => {

                                    this.setState({
                                        displaySection: event.target.value,
                                        sectionProvince: "",
                                        provinceZoneLabel: ""
                                    }, () => {
                                        this.loadPayLoan()
                                    })
                                }}
                                onChangeProvince={(event) => {
                                    this.setState({
                                        sectionProvince: event.target.value,
                                        provinceZoneLabel: `จังหวัด${event.label}`
                                    }, () => {
                                        this.loadPayLoan()
                                    })
                                }}
                                onChangeSection={(event) => {
                                    this.setState({
                                        sectionProvince: event.target.value,
                                        provinceZoneLabel: `${event.label}`
                                    }, () => {
                                        this.loadPayLoan()
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
                                        yearLabel: "",
                                        montLabel: "",
                                        dateRangLabel: ""

                                    }, () => {
                                        this.loadPayLoan()
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
                                            dateRangLabel: `${moment(event[0]).format("DD MMMM YYYY")} - ${moment(event[1]).format("DD MMMM YYYY")}`
                                        }, () => {
                                            this.loadPayLoan()
                                        })
                                    }
                                }}
                                onChangeMonth={(event) => {

                                    this.setState({
                                        month: event.target.value,
                                        montLabel: `เดือน${event.label}`
                                    }, () => {
                                        this.loadPayLoan()
                                    })

                                }}
                                onChangeYear={(event) => {
                                    this.setState({
                                        year: event.target.value,
                                        yearLabel: event.target.value
                                    }, () => {
                                        this.loadPayLoan()
                                    })
                                }}
                            />
                        </Grid>

                    </Grid>
                </Grid>

    
            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานการจ่ายเงินกู้ {`${this.state.provinceZoneLabel}`}</Typography>
                    {this.state.dateRangLabel != "" ? <Typography variant="h6" align="center">{`${this.state.dateRangLabel}`}</Typography> : <Typography variant="h6" align="center">{`${this.state.montLabel} ${this.state.yearLabel}`}</Typography>}
                </Box>
            </div>
            <Grid container>
                <Grid item xs>

                </Grid>

                <Grid item>
                    <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting} />
                </Grid>
            </Grid>

            <Box mt={2}>
                <Paper>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ลำดับที่</StyledTableCell>
                                    <StyledTableCell align="center">รหัสจังหวัด</StyledTableCell>
                                    <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                    <StyledTableCell align="center">สัญญาเลขที่</StyledTableCell>
                                    <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                    <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
                                    <StyledTableCell align="center">ธนาคาร</StyledTableCell>
                                    <StyledTableCell align="center">เลขบัญชีธนาคาร</StyledTableCell>
                                    <StyledTableCell align="center">เลขที่ใบเสร็จรับเงิน</StyledTableCell>
                                    <StyledTableCell align="center">ว/ด/ป รับเงินกู้</StyledTableCell>
                                    <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                    <StyledTableCell align="center">ว/ด/ป เริ่มชำระ</StyledTableCell>
                                    <StyledTableCell align="center">ว/ด/ป ครบกำหนด</StyledTableCell>
                                    <StyledTableCell align="center">การจ่ายเงิน (งวด)</StyledTableCell>
                                    <StyledTableCell align="center">จ่ายเงินงวดแรก</StyledTableCell>
                                    <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center">สถานะสมาชิก</StyledTableCell>
                                    <StyledTableCell align="center">จำนวนวันทำการ</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine > {farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.provinceCode}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.projName}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.idCard}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.bank}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.bankNumber}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.receiptNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.loanDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.loanAmount)}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.payDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.dueDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.payout)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.payFirstInstallment)}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.interestRate}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.memStatus}</StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.workingDay}</StyledTableCellLine>

                                        </TableRow>
                                    )
                                })}
                                <TableRow>
                                    <StyledTableCellLine colSpan={10} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loanAmount)}</StyledTableCellLine>
                                    <StyledTableCellLine colSpan={3} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.payFirstInstallment)}</StyledTableCellLine>
                                    <StyledTableCellLine colSpan={3} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

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

export default withStyles(styles)(PayLoanTab)