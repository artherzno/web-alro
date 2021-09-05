import React from 'react'
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
import { makeStyles, withStyles} from '@material-ui/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'

import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';

class ConvertLoanTab extends React.Component {

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
            resultRequest: "",
            resultLabel: "",
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

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        api.getConvertLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        this.setState({
            isExporting: true
        })

        api.exportConvertLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการทำสัญญาแปลงหนี้.xlsx');
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
                                            dateRangLabel: `${moment(event[0]).add(543, 'years').format("DD MMMM YYYY")} - ${event[1] ? moment(event[1]).add(543, 'years').format("DD MMMM YYYY") : ''}`
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
                    <Typography variant="h6" align="center">รายงานการทำสัญญาแปลงหนี้ {`${this.state.provinceZoneLabel}`}</Typography>
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
                                    <StyledTableCell rowSpan={2} align="center">จังหวัด</StyledTableCell>
                                    <StyledTableCell rowSpan={2} align="center">ลำดับที่</StyledTableCell>
                                    <StyledTableCell rowSpan={2} align="center">บัตรประชาชน</StyledTableCell>
                                    <StyledTableCell rowSpan={2} align="center">ชื่อโครงการ</StyledTableCell>
                                    <StyledTableCell colSpan={8} align="center">สัญญาเดิม</StyledTableCell>
                                    <StyledTableCell colSpan={10} align="center">สัญญาใหม่</StyledTableCell>
                                </TableRow>
                                <TableRow>

                                    <StyledTableCell align="center">ชื่อ-สกุล/ชื่อสถานบันเกษตรกร</StyledTableCell>
                                    <StyledTableCell align="center">ประเภทสัญญา</StyledTableCell>
                                    <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                    <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center">ดอกเบี้ยค้าง</StyledTableCell>
                                    <StyledTableCell align="center">ดอกเบี้ยรับ</StyledTableCell>
                                    <StyledTableCell align="center">รวม</StyledTableCell>
                                    <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>

                                    <StyledTableCell align="center">ชื่อ-สกุล/ชื่อสถานบันเกษตรกร</StyledTableCell>
                                    <StyledTableCell align="center">ประเภทสัญญา</StyledTableCell>
                                    <StyledTableCell align="center">อำนาจ</StyledTableCell>
                                    <StyledTableCell align="center">วันที่อนุมติแปลงหนี้</StyledTableCell>
                                    <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                    <StyledTableCell align="center">วันที่ทำสัญญาใหม่</StyledTableCell>
                                    <StyledTableCell align="center">เงินต้น</StyledTableCell>
                                    <StyledTableCell align="center">ดอกเบี้ย</StyledTableCell>
                                    <StyledTableCell align="center">รวม</StyledTableCell>
                                    <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine > {farmer.province} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.no} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.idCard} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.projName} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.fullName} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.contractType} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.contractNo} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.principle)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.accruedInterest)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interestEarned)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.total)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interestRate)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.fullName2} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.contractType2} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.powers} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.debtApprovalDate} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.contractNo2} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.newContractDate} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.principle2)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interest)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.total2)} </StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.interestRate2)} </StyledTableCellLine>


                                        </TableRow>
                                    )
                                })}

                                <TableRow>
                                    <StyledTableCellLine colSpan={7} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle)} </StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.accruedInterest)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interestEarned)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" colSpan={7} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.principle2)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.interest)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.total2)}</StyledTableCellLine>
                                    <StyledTableCellLine align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

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

export default withStyles(styles)(ConvertLoanTab)