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

class SignTab extends React.Component {

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
            resultRequest: "",
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

        const { displaySection, sectionProvince, month, year, display2, startDate, endDate, resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('Display1', displaySection);
        parameter.append('Month', month);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('Display2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);

        api.getSignLoan(parameter).then(response => {

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

        api.exportSignLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานการทำสัญญา.xlsx');
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
                        
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">รายงานการทำสัญญา {`${this.state.provinceZoneLabel}`}</Typography>
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
                                <StyledTableCell align="center">รหัสสัญญา</StyledTableCell>
                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center">ชื่อ-สกุล/ชื่อสถาบันเกษตรกร</StyledTableCell>
                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                <StyledTableCell align="center">วันที่ทำสัญญา</StyledTableCell>
                                <StyledTableCell align="center">ที่อยู่</StyledTableCell>
                                <StyledTableCell align="center">ประเภทเอกสารสิทธิ</StyledTableCell>
                                <StyledTableCell align="center">เลขที่เอกสารสิทธิ</StyledTableCell>
                                <StyledTableCell align="center">ที่ตั้งที่ดิน</StyledTableCell>
                                <StyledTableCell align="center">จุดประสงค์การกู้ยืม</StyledTableCell>
                                <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                <StyledTableCell align="center">จำนวนงวดชำระ</StyledTableCell>
                                <StyledTableCell align="center">หลักฐานค้ำประกัน</StyledTableCell>
                                <StyledTableCell align="center">ระยะเวลาปลอดการชำระเงินต้น</StyledTableCell>
                                <StyledTableCell align="center">ใบสำคัญรับเงิน</StyledTableCell>
                                <StyledTableCell align="center">เอกสารทั้งหมด</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {this.state.farmerPayLoanList.map((farmer,index) =>{

                               return(
                                   <TableRow key={index}>
                                       <StyledTableCellLine >{farmer.province} </StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.no}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.contractID}</StyledTableCellLine>
                                       <StyledTableCellLine align="right"><div className="btn-more-detail-table">{farmer.idCard}<Box ml={1}><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.fullName}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.contractNo}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.contractDate}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.address}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.docType}</StyledTableCellLine>
                                       <StyledTableCellLine align="right"><div className="btn-more-detail-table">{farmer.docNo}<Box ml={1}><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.landLocation}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.loanPurpose}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{formatNumber(farmer.loanAmount)}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.interestRate}</StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.totalInstallment}</StyledTableCellLine>
                                       <StyledTableCellLine align="right"><div className="btn-more-detail-table"><Box><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                       <StyledTableCellLine align="right">{farmer.principalPeriod}</StyledTableCellLine>
                                       <StyledTableCellLine align="right"><div className="btn-more-detail-table"><Box><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                       <StyledTableCellLine align="right"><div className="btn-more-detail-table">{farmer.totalDoc}<Box ml={1}><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>


                                   </TableRow>
                               )
                           })}

                            <TableRow>
                                <StyledTableCellLine colSpan={12} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                    รวมทั้งสิ้น
                                </StyledTableCellLine>
                                <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.loanAmount)}</StyledTableCellLine>
                                <StyledTableCellLine align="right" colSpan={6} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(SignTab)