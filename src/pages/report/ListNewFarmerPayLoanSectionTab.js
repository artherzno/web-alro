import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect } from '../../components/report'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles} from '@material-ui/styles';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';

class ListNewFarmerPayLoanSectionTab extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isExporting: false,
            farmerPayLoanList: [],
            dataSummary: {},
            month: "",
            year: "",
            display2: "",
            startDate: "",
            endDate: "",
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

        const { month, year, display2, startDate, endDate, } = this.state

        const parameter = new FormData()

        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('LevelDisplay', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        api.getNewSummaryFarmerPayLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { month, year, display2, startDate, endDate, } = this.state

        const parameter = new FormData()

        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('LevelDisplay', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        this.setState({
            isExporting: true
        })
        api.exportNewSummaryFarmerPayLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่รายภาค.xlsx');
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
                                montLabel: `เดือน${event.label}`
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
                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan() }} />
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานการจ่ายเงินกู้เกษตรกรรายใหม่ รายภาค</Typography>
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
                                    <StyledTableCell align="center">ลำดับ</StyledTableCell>
                                    <StyledTableCell align="center">ภาค</StyledTableCell>
                                    <StyledTableCell align="center">จำนวนโครงการ</StyledTableCell>
                                    <StyledTableCell align="center">จำนวนสัญญา</StyledTableCell>
                                    <StyledTableCell align="center">ผลการจ่ายเงินกู้ จำนวนเงิน</StyledTableCell>
                                    <StyledTableCell align="center">จำวนราย</StyledTableCell>
                                    <StyledTableCell align="center">จำนวนเงิน (เงิน)</StyledTableCell>
                                    <StyledTableCell align="center">อัตราร้อยละ</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <StyledTableCellLine colSpan={2} align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.totalProj)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.totalContract)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loanPaymentResult)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.amount)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.percentage)}</StyledTableCellLine>

                                </TableRow>
                                {/* <TableRow >
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>
                                    รวมภาคเหนือ
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    1
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>
                            <TableRow>
                                <StyledTableCellLine component="th" scope="row">
                                    2
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>
                                <StyledTableCellLine align="right">xxx</StyledTableCellLine>

                            </TableRow>

                            <TableRow >
                                <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>
                                    รวมภาคกลาง
                                </StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>
                                <StyledTableCellLine align="center" className={`${classes.cellGreen} ${classes.cellSummary}`}>xxx</StyledTableCellLine>

                            </TableRow> */}

                                {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine component="th" scope="row">
                                                {farmer.no}
                                            </StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.zone}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.totalProj)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.totalContract)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.loanPaymentResult)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.total)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.amount)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.percentage)}</StyledTableCellLine>
                                        </TableRow>
                                    )
                                })}

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

export default withStyles(styles)(ListNewFarmerPayLoanSectionTab)