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

class LiabilityPerCodeTab extends React.Component {

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
            display2: "",
            startDate: "",
            endDate: "",
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

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate} = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
       

        this.setState({ isLoading: true })
        api.getRequestLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
                isLoading: false
            })

        }).catch(error => {
            this.setState({ isLoading: false })
        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate } = this.state

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

        api.exportRequestLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานสภาพความรับผิด(รายประเภทโครงการหลัก).xlsx');
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
                       
                      
                    </Grid>
                </Grid>

                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan() }} />
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานสภาพความรับผิด (รายประเภทโครงการหลัก) {`${this.state.provinceZoneLabel}`}</Typography>
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
                                    <StyledTableCell align="center">จังหวัด</StyledTableCell>
                                    <StyledTableCell align="center">เลขที่คำขอกู้</StyledTableCell>
                                    <StyledTableCell align="center">วันที่ยื่นคำขอกู้</StyledTableCell>
                                    <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                    <StyledTableCell align="center">ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                    <StyledTableCell align="center">สถานะคำขอ</StyledTableCell>
                                    <StyledTableCell align="center">อายุ</StyledTableCell>
                                    <StyledTableCell align="center">ที่อยู่ตามบัตรประชาชน</StyledTableCell>
                                    <StyledTableCell align="center">ที่อยู่ที่ติดต่อได้</StyledTableCell>
                                    <StyledTableCell align="center">โทรศัพท์</StyledTableCell>
                                    <StyledTableCell align="center">ประเภทเอกสารสิทธิ</StyledTableCell>
                                    <StyledTableCell align="center">เลขที่เอกสารสิทธิ์</StyledTableCell>
                                    <StyledTableCell align="center">ที่ตั้งที่ดิน</StyledTableCell>
                                    <StyledTableCell align="center">ขนาดที่ดินตามเอกสารสิทธิ์</StyledTableCell>
                                    <StyledTableCell align="center">ภาระหนี้สิน</StyledTableCell>
                                    <StyledTableCell align="center">จำนวน (บาท)</StyledTableCell>
                                    <StyledTableCell align="center">จุดประสงค์การกู้ยืม</StyledTableCell>
                                    <StyledTableCell align="center">ประเภทเงินกู้</StyledTableCell>
                                    <StyledTableCell align="center">เงินกู้ยืม</StyledTableCell>
                                    <StyledTableCell align="center">ผลการพิจารณา</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.slice(page * count, page * count + count).map((farmer, index) => {

                                    let status = "approved"
                                    if (farmer.result === "อนุมัติ") {
                                        status = "approved"
                                    } else if (farmer.result === "อยู่ระหว่างพิจารณา") {
                                        status = "wating"
                                    } else if (farmer.result === "ไม่อนุมัติ") {
                                        status = "decline"
                                    }

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine align="center" >{farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.province}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.loanReqNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.appDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.idCard}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.loanReqStatus}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.age}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.address1}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.address2}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.tel}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.docType}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.docNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.landLocation}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{farmer.landSize}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.liabilities}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.amount)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.loanPurpose}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.loanType}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.loan)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left"><div className={`status-approve ${status}`}>{farmer.result}</div></StyledTableCellLine>


                                        </TableRow>
                                    )

                                })}

                                <TableRow>
                                    <StyledTableCellLine colSpan={16} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.amount)}</StyledTableCellLine>
                                    <StyledTableCellLine align="left" colSpan={2} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loan)}</StyledTableCellLine>
                                    <StyledTableCellLine align="left" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

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

export default withStyles(styles)(LiabilityPerCodeTab)