import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect, LoanTypeSelect } from '../../components/report'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExport, ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class ModifyTab extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isLoading: false,
            isExporting: false,
            farmerPayLoanList: [],
            dataSummary: {},
            displaySection: 0,
            sectionProvince: "",
            month: "",
            year: "",
            YearTovalue: "",
            YearToLabel: "",
            display2: "",
            startDate: "",
            endDate: "",
            loanType:"",
            loanTypeLabel:"",
            resultRequest: "",
            resultLabel: "",
            provinceZoneLabel: "",
            montLabel: "",
            yearLabel: "",
            dateRangLabel: "",
            page: 0,
            count: 10,
            totalResult: 0,
            isPrinting: false,

        }
    }

    componentDidMount() {


        this.loadPayLoan(this.state.page, this.state.count)
    }

    loadPayLoan(page, count) {

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate, loanType } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append('DebtType', loanType)

        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getModify(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
                isLoading: false,
                page: page,
                totalResult: response.data.totalResult
            })

        }).catch(error => {
            this.setState({ isLoading: false })
        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate, loanType } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append('DebtType', loanType)

        this.setState({
            isExporting: true
        })

        api.exportModify(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้.xlsx');
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

    printPDF() {

        const { displaySection, sectionProvince, month, year, YearTovalue, display2, startDate, endDate, loanType } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append('DebtType', loanType)

        this.setState({
            isPrinting: true
        })

        api.getModifyPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            this.setState({
                isPrinting: false
            })

        }).catch(error => {

            this.setState({
                isPrinting: false
            })

        })

    }

    render() {

        const { classes } = this.props;
        const { dataSummary, page, count } = this.state

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
                                        provinceZoneLabel: ""
                                    }, () => {
                                    })
                                }}
                                onChangeProvince={(event) => {
                                    this.setState({
                                        sectionProvince: event.target.value,
                                        provinceZoneLabel: `จังหวัด${event.label}`
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
            YearTovalue: "",
            YearToLabel: "",
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
                                    onChangeYearEnd={(event) => {
                                        this.setState({
                                            YearTovalue: event.target.value,
                                            YearToLabel: event.target.value
                                        }, () => {
                                        })
                                    }}
                                    onChangeYearBudget={(event) => {
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

                <Grid item></Grid>
                <Grid item>
                    <LoanTypeSelect onChange={(event) =>{

                        this.setState({
                            loanType: event.target.value,
                            loanTypeLabel: event.target.label
                        }, () => {
                        })

                    }}/>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan(0, this.state.count) }} />
                </Grid>
            </Grid>

            <div>
                <Box mt={1} mb={5}>
                    <Typography variant="h6" align="center">รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้ {`${this.state.provinceZoneLabel}`}</Typography>
                    {this.state.dateRangLabel != "" ? <Typography variant="h6" align="center">{`${this.state.dateRangLabel}`}</Typography> : <Typography variant="h6" align="center">{`${this.state.montLabel} ${this.state.yearLabel}`}</Typography>}
                </Box>
            </div>
            <Grid container>
                <Grid item xs>

                </Grid>
                <Grid item>
                    <ButtonExport label="PRINT TO PDF" handleButtonClick={() => { this.printPDF() }} loading={this.state.isPrinting} />
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
                                    <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>จังหวัด</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>บัตรประชาชน</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ชื่อโครงการ</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={8}>สัญญาเดิม</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={11}>สัญญาใหม่</StyledTableCell>

                                </TableRow>
                                <TableRow>
                                    <StyledTableCell align="center" >ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                    <StyledTableCell align="center" >ประเภทสัญญา</StyledTableCell>
                                    <StyledTableCell align="center" >เลขที่สัญญา</StyledTableCell>
                                    <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center" >ดอกเบี้ยค้าง</StyledTableCell>
                                    <StyledTableCell align="center" >ดอกเบี้ยปรับ</StyledTableCell>
                                    <StyledTableCell align="center" >รวม</StyledTableCell>
                                    <StyledTableCell align="center" >อัตตราดอกเบี้ย</StyledTableCell>

                                    <StyledTableCell align="center" >ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                    <StyledTableCell align="center" >ประเภทสัญญา</StyledTableCell>
                                    <StyledTableCell align="center" >ประเภทโครงสร้างหนี้</StyledTableCell>
                                    <StyledTableCell align="center" >เลขที่สัญญา</StyledTableCell>
                                    <StyledTableCell align="center" >เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center" >ดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center" >รวม</StyledTableCell>
                                    <StyledTableCell align="center" >การคิดอัตตราดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center" >อัตตราดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center" >วันที่ทำสัญญาใหม่</StyledTableCell>
                                    <StyledTableCell align="center" >วันที่ครบกำหนดชำระ</StyledTableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine align="center">{farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.province}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.idCard}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.projName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractType}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.principle)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.accruedInterest)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interestEarned)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.total)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interestRate)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName2}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractType2}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.debtType}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.principle2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.interest}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.total2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.interestRate2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.interestRate2}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.newContractDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.dueDate}</StyledTableCellLine>


                                        </TableRow>
                                    )
                                })}

                                <TableRow>
                                    <StyledTableCellLine colSpan={7} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.accruedInterest)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interestEarned)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total)}</StyledTableCellLine>
                                    <StyledTableCellLine align="left" colSpan={5} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle2)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interest)}</StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total2)}</StyledTableCellLine>
                                    <StyledTableCellLine align="left" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                                </TableRow>
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

                            this.loadPayLoan(newPage, this.state.count)
                        }}
                        onRowsPerPageChange={(event) => {

                            this.setState({
                                count: +event.target.value,
                                page: 0
                            }, () => {

                                this.loadPayLoan(0, this.state.count)

                            })
                        }}
                    />
                </Paper>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(ModifyTab)