import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect,TypeContractSelect } from '../../components/report'
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
import {
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class SignTab extends React.Component {

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
            resultRequest: "",
            resultLabel: "",
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

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate, resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append("Result",resultRequest) 
        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getSignLoan(parameter).then(response => {

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

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate, resultRequest } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append("Result",resultRequest)

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
              
                <Grid item>
                            <TypeContractSelect onChange={(event) =>{

                                this.setState({
                                    resultRequest: event.target.value,
                                    resultLabel: event.target.label
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
                <Paper>
                    <TableContainer>
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
                                {this.state.farmerPayLoanList.map((farmer, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine >{farmer.province} </StyledTableCellLine>
                                            <StyledTableCellLine align="center">{farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractID}</StyledTableCellLine>
                                            <StyledTableCellLine align="left"><div className="btn-more-detail-table">{farmer.idCard}<Box ml={1}><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractDate}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.address}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.docType}</StyledTableCellLine>
                                            <StyledTableCellLine align="left"><div className="btn-more-detail-table">{farmer.docNo}<Box ml={1}><i className="far fa-file-alt"></i></Box></div></StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.landLocation}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.loanPurpose}</StyledTableCellLine>
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

export default withStyles(styles)(SignTab)