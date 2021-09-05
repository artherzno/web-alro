import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect } from '../../components/report'
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

class Billed extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExporting: false,
            farmerPayLoanList: [],
            dataSummary: {},
            displaySection: 0,
            sectionProvince: "",
            month: "",
            year: "",
            display2: "",
            startDate: "",
            endDate: "",
            receiptType: "",
            receiptProvince: "",
            resultRequest: "",
            resultLabel: "",
            provinceZoneLabel: "",
            montLabel: "",
            yearLabel: "",
            dateRangLabel: "",
            receiptTypeLabel: "",
            provinceReiptLabel: "",
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
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
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

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, receiptType, receiptProvince  } = this.state

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

    render() {

        const { classes } = this.props;
        const { dataSummary, page, count } = this.state

        return (<div>
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            <Box mt={5} ml={2} mr={2}>
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

                    <Grid item ></Grid>

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
                                                dateRangLabel: `${moment(event[0]).add(543, 'years').format("DD MMMM YYYY")} - ${event[1] ? moment(event[1]).add(543, 'years').format("DD MMMM YYYY"):''}`
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


                    <Grid item ></Grid>

                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item>
                                <TypeBillSelect
                                    onChange={(event) => {
                                        this.setState({
                                            receiptType: event.target.value,
                                            receiptProvince: "",
                                            receiptTypeLabel: event.label,
                                            provinceReiptLabel: ""
                                        }, () => {
                                            this.loadPayLoan()
                                        })
                                    }}
                                    onChangeProvince={(event) => {
                                        this.setState({
                                            receiptProvince: event.target.value,
                                            provinceReiptLabel: event.label
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
                        <Typography variant="h6" align="center">รายงานการใช้ใบเสร็จรับเงิน {`${this.state.provinceZoneLabel}`}</Typography>
                        {this.state.dateRangLabel != "" ? <Typography variant="h6" align="center">{`${this.state.dateRangLabel}`}</Typography> : <Typography variant="h6" align="center">{`${this.state.montLabel} ${this.state.yearLabel}`}</Typography>}
                        {this.state.receiptTypeLabel != "" ? <Typography variant="h6" align="center">ประเภทใบเสร็จรับเงิน {`${this.state.receiptTypeLabel} ${this.state.provinceReiptLabel}`}</Typography> : ""}
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

                                        <StyledTableCell align="center" colSpan={2}>ใบเสร๋จรับเงิน</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={4}>จำนวนเงินทั้งหมดที่จัดเก็บ</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}>ใบเสร็จที่ยกเลิก</StyledTableCell>

                                    </TableRow>
                                    <TableRow>

                                        <StyledTableCell align="center" rowSpan={2}>เล่มที่/เลขที่</StyledTableCell>
                                        <StyledTableCell align="center" rowSpan={2}>จำนวน(ฉบับ)</StyledTableCell>
                                        <StyledTableCell align="center" colSpan={2}>เงินกู้</StyledTableCell>
                                        <StyledTableCell align="center" rowSpan={2}>อื่นๆ</StyledTableCell>
                                        <StyledTableCell align="center" rowSpan={2}>รวม</StyledTableCell>
                                        <StyledTableCell align="center" rowSpan={2}>เล่มที่/เลขที่</StyledTableCell>
                                        <StyledTableCell align="center" rowSpan={2}>จำนวน(ฉบับ)</StyledTableCell>

                                    </TableRow>
                                    <TableRow>

                                        <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                        <StyledTableCell align="center" >ดอกเบี้ย</StyledTableCell>

                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                        return (
                                            <TableRow key={index}>
                                                <StyledTableCellLine >
                                                    {farmer.receiptNo1}
                                                </StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.number)}</StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.principle1)}</StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.interest)}</StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.other)}</StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.total)}</StyledTableCellLine>
                                                <StyledTableCellLine align="center">{farmer.receiptNo2}</StyledTableCellLine>
                                                <StyledTableCellLine align="right">{formatNumber(farmer.principle2)}</StyledTableCellLine>

                                            </TableRow>
                                        )
                                    })}

                                    <TableRow>
                                        <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                            รวมทั้งสิ้น
                                        </StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.number)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle1)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interest)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.other)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total)}</StyledTableCellLine>
                                        <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                        <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle2)}</StyledTableCellLine>

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

            </Box>
     
        </div>)
    }
}

export default withStyles(styles)(Billed)