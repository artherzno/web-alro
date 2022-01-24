import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect } from '../../components/report'
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
import { makeStyles, withStyles } from '@material-ui/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class DebtStatusPerContractTab extends React.Component {

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
            provinceZoneLabel: "",
            montLabel: "",
            yearLabel: "",
            dateRangLabel: "",
            page: 0,
            count: 10,
            totalResult: 0,

        }
    }

    componentDidMount() {


        this.loadPayLoan(this.state.page, this.state.count)
    }

    loadPayLoan(page, count) {

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate} = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
       
        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getDebtStatusPerContract(parameter).then(response => {

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

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        

        this.setState({
            isExporting: true
        })

        api.exportRequestLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานสถานะหนี้เงินกู้รายสัญญา.xlsx');
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
                            />
                        </Grid>
                       
                      
                    </Grid>
                </Grid>

                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan(0, this.state.count) }} />
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานสถานะหนี้เงินกู้ รายสัญญา {`${this.state.provinceZoneLabel}`}</Typography>
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
                                   
                                    <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ประเภท/โครงการ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ชื่อ - นามสกุล</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เลขที่สัญญา</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>คงเหลือต้นปี</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เงินกู้ระหว่างปี</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3} >เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>คงเหลือปลายปี</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ค้างรับต้นปี</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}>ดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}>ดอกเบี้ยค้างรับปลายงวด</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}>คปก.</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={2}>ปรับปรุง</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>ค่าปรับ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>รายได้อื่น</StyledTableCell> 

                                </TableRow>
                                <TableRow>
                                   
                                   <StyledTableCell align="center">ค้างรับ</StyledTableCell>
                                   <StyledTableCell align="center">รับ</StyledTableCell>
                                   <StyledTableCell align="center">รวม</StyledTableCell>

                                   <StyledTableCell align="center">ค้างรับ</StyledTableCell>
                                   <StyledTableCell align="center">รับ</StyledTableCell>
                                   <StyledTableCell align="center">รวม</StyledTableCell>

                                   <StyledTableCell align="center">ปีก่อน</StyledTableCell>
                                   <StyledTableCell align="center">ปีปัจจุบัน</StyledTableCell>
                                   <StyledTableCell align="center">รวมค้าง</StyledTableCell>

                                   <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                   <StyledTableCell align="center">ดอกเบี้ย</StyledTableCell>

                                   <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                   <StyledTableCell align="center">ดอกเบี้ย</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.map((farmer, index) => {

                                
                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine align="center" >{farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.projName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.balYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.duringYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.accrued)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.receive)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.collectReceive)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.endYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.accruedYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.accrued2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.receive2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.collectReceive2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.lastYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.currentYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.totalBacklog)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.principle)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.interest)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.principle2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.interest2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.fine)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.otherIncome)}</StyledTableCellLine>
                                           


                                        </TableRow>
                                    )

                                })}

                                <TableRow> 
                                    <StyledTableCellLine colSpan={4} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.balYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.duringYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.accrued)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.receive)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.collectReceive)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.endYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.accruedYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.accrued2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.receive2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.collectReceive2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.lastYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.currentYear)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.totalBacklog)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interest)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interest2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.fine)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.otherIncome)}</StyledTableCellLine>
                            

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

export default withStyles(styles)(DebtStatusPerContractTab)