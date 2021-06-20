import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect } from '../../components/report'
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

class SumaryProjectPayLoanTab extends React.Component {

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
            provinceZoneLabel: "",
            montLabel: "",
            yearLabel: "",
            dateRangLabel: "",


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

        api.getSummaryProjPayLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, } = this.state

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

        api.exportSummaryProjPayLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'สรุปโครงการจ่ายเงินกู้.xlsx');
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
        const { dataSummary } = this.state


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
                    <Typography variant="h6" align="center">สรุปโครงการจ่ายเงินกู้ {`${this.state.provinceZoneLabel}`}</Typography>
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
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                <StyledTableCell align="center">จำนวนราย</StyledTableCell>
                                <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป รับเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป เริ่มชำระ</StyledTableCell>
                                <StyledTableCell align="center">ว/ด/ป ครบกำหนด</StyledTableCell>
                                <StyledTableCell align="center">จ่ายเงินงวดแรก</StyledTableCell>
                                <StyledTableCell align="center">รายเดิม</StyledTableCell>
                                <StyledTableCell align="center">รายใหม่</StyledTableCell>
                                <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center">น้อยกว่า 15 วันทำการ</StyledTableCell>
                                <StyledTableCell align="center">มากกว่า 15 วันทำการ</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.farmerPayLoanList.map((framer,index) =>{

                                return(
                                    <TableRow key={index}>
                                        <StyledTableCellLine align="center" >{framer.projName}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.numCase)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.loanAmount)}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{framer.loanDate}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{framer.payDate}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{framer.dueDate}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.firstInstallment)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.original)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.new)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.interestRate)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.lessThan15)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(framer.moreThan15)}</StyledTableCellLine>

                                    </TableRow>
                                )
                            })}
                            <TableRow>
                                <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.numCase)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loanAmount)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" colSpan={3} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.firstInstallment)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.original)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.new)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interestRate)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.lessThan15)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.moreThan15)}</StyledTableCellLine>


                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(SumaryProjectPayLoanTab)