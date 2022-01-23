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

class TargetPerContractPTab extends React.Component {

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
        api.getTargetByProject(parameter).then(response => {

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
            link.setAttribute('download', 'รายงานเป้าจัดเก็บรายสัญญา(โครงการ).xlsx');
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
                    <Typography variant="h6" align="center">รายงานเป้าจัดเก็บ รายสัญญา(โครงการ) {`${this.state.provinceZoneLabel}`}</Typography>
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
                                   
                                   
                                    <StyledTableCell align="center" rowSpan={2}>ชื่อโครงการ</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เงินต้นคงเหลือ</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={3}>เป้าจัดเก็บ</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={12}>เป้าจัดเก็บรายเดือน</StyledTableCell>
                                </TableRow>  
                                <TableRow>
                                    <StyledTableCell align="center" >ค้างขำระ</StyledTableCell>
                                    <StyledTableCell align="center">ครบชำระ</StyledTableCell>
                                    <StyledTableCell align="center">รวม</StyledTableCell>

                                    <StyledTableCell align="center">ต.ค</StyledTableCell>
                                    <StyledTableCell align="center">พ.ย</StyledTableCell>
                                    <StyledTableCell align="center">ธ.ค</StyledTableCell>
                                    <StyledTableCell align="center">ม.ค</StyledTableCell>
                                    <StyledTableCell align="center">ก.พ</StyledTableCell>
                                    <StyledTableCell align="center">มี.ค</StyledTableCell>
                                    <StyledTableCell align="center">เม.ย</StyledTableCell>
                                    <StyledTableCell align="center">พ.ค</StyledTableCell>
                                    <StyledTableCell align="center">มิ.ย</StyledTableCell>
                                    <StyledTableCell align="center">ก.ค</StyledTableCell>
                                    <StyledTableCell align="center">ส.ค</StyledTableCell>
                                    <StyledTableCell align="center">ก.ย</StyledTableCell>
                                   

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                           
                                            <StyledTableCellLine align="left">{farmer.projName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.remainPrincipal)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.overdue)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.payment)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.total)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.oct)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.nov)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.dec)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.jan)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.feb)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.mar)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.apr)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.may)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.jun)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.jul)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.aug)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{formatNumber(farmer.sep)}</StyledTableCellLine>
                                          


                                        </TableRow>
                                    )

                                })}

                                <TableRow>
                                    <StyledTableCellLine colSpan={2} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.remainPrincipal)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.overdue)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.payment)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.oct)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.nov)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.dec)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.jan)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.feb)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.mar)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.apr)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.may)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.jun)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.jul)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.aug)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.sep)}</StyledTableCellLine>

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

export default withStyles(styles)(TargetPerContractPTab)