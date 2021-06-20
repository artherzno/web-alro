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
import { makeStyles, withStyles } from '@material-ui/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'

class RequestLoanTab extends React.Component {

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
            resultRequest:"",
            resultLabel: "",
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

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, resultRequest} = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append("Result",resultRequest)

        api.getRequestLoan(parameter).then(response => {

            this.setState({
                farmerPayLoanList: response.data.data,
                dataSummary: response.data.dataSummary,
            })

        }).catch(error => {

        })
    }

    exportExcel() {

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate,resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append("Result", resultRequest)

        this.setState({
            isExporting: true
        })

        api.exportRequestLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานคำขอกู้ยืมรายสัญญา.xlsx');
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
                       
                        <Grid item>
                            <ApproveStatusSelect onChange={(event) =>{

                                this.setState({
                                    resultRequest: event.target.value,
                                    resultLabel: event.target.label
                                }, () => {
                                    this.loadPayLoan()
                                })

                            }}/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานคำขอกู้ยืมรายสัญญา {`${this.state.provinceZoneLabel}`}</Typography>
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
                                <StyledTableCell align="center">จังหวัด</StyledTableCell>
                                <StyledTableCell align="center">ลำดับที่</StyledTableCell>
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
                            {this.state.farmerPayLoanList.map((farmer,index) =>{

                                let status = "approved"
                                if (farmer.result === "อนุมัติ"){
                                    status = "approved"
                                } else if(farmer.result === "อยู่ระหว่างพิจารณา"){
                                    status = "wating"
                                } else if (farmer.result === "ไม่อนุมัติ") {
                                    status = "decline"
                                }

                                return(
                                    <TableRow key={index}>
                                        <StyledTableCellLine >{farmer.no}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.province}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.loanReqNo}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.appDate}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.idCard}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.fullName}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.loanReqStatus}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.age}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.address1}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.address2}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.tel}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.docType}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.docNo}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.landLocation}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.landSize}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.liabilities}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(farmer.amount)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.loanPurpose}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{farmer.loanType}</StyledTableCellLine>
                                        <StyledTableCellLine align="right">{formatNumber(farmer.loan)}</StyledTableCellLine>
                                        <StyledTableCellLine align="right"><div className={`status-approve ${status}`}>{farmer.result}</div></StyledTableCellLine>
                                  

                                    </TableRow>
                                )

                            })}

                            <TableRow>
                                <StyledTableCellLine colSpan={16} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.amount)}</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={2} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loan)}</StyledTableCellLine>
                                <StyledTableCellLine align="center" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(RequestLoanTab)