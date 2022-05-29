import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect,TypeContractSelect,GroupDebtSelect  } from '../../components/report'
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
import { ButtonExport, ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class ComparePerContractTab extends React.Component {

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
            groupDebtRequest: "",
            groupDebtLabel: "",
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

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate,resultRequest,groupDebtRequest} = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append('EndDate', endDate);
        parameter.append("Result",resultRequest) ;
        parameter.append("GroupDebt",groupDebtRequest) ;
        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);

        this.setState({ isLoading: true })
        api.getComparePerContract(parameter).then(response => {

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

        const { displaySection, sectionProvince, month, year,  YearTovalue, display2, startDate, endDate ,resultRequest,groupDebtRequest} = this.state

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
        parameter.append("GroupDebt",groupDebtRequest) ;
        this.setState({
            isExporting: true
        })

        api.exportRequestLoan(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานสรุปเปรียบเทียบแผน/ผลจัดเก็บ.xlsx');
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

        const { displaySection, sectionProvince, month, year, YearTovalue, display2, startDate, endDate,resultRequest,groupDebtRequest } = this.state

        const parameter = new FormData()
        parameter.append('LevelDisplay1', displaySection);
        parameter.append('Month', month);
        parameter.append('YearTo', YearTovalue);
        parameter.append('Year', year);
        parameter.append('ZoneProvince', sectionProvince);
        parameter.append('LevelDisplay2', display2);
        parameter.append('StartDate', startDate);
        parameter.append("Result",resultRequest) 
        parameter.append("GroupDebt",groupDebtRequest) ;
        parameter.append('EndDate', endDate);



        this.setState({
            isPrinting: true
        })

        api.getComparePerContractPdf(parameter).then(response => {

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
                <Grid item>
                            <TypeContractSelect onChange={(event) =>{

                                this.setState({
                                    resultRequest: event.target.value,
                                    resultLabel: event.target.label
                                }, () => {
                                })

                            }}/>
                </Grid>  
                <Grid item>
                            <GroupDebtSelect onChange={(event) =>{

                                this.setState({
                                    groupDebtRequest: event.target.value,
                                    groupDebtLabel: event.target.label
                                }, () => {
                                })

                            }}/>
                </Grid>
                <Grid item xs={12} md={2}>
                    <p>&nbsp;</p>
                    <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadPayLoan(0, this.state.count)}} />
                </Grid>

            </Grid>

            <div>
                <Box mt={1} mb={5}>
                    <Typography variant="h6" align="center">รายงานสรุปเปรียบเทียบแผน / ผล จัดเก็บ {`${this.state.provinceZoneLabel}`}</Typography>
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
                                    <StyledTableCell align="center" rowSpan={2}>ชื่อ - นามสกุล</StyledTableCell>
                                    <StyledTableCell align="center" rowSpan={2}>เลขสัญญา</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={5}>กลุ่มที่ 1 (หนี้ค้าง)</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={5}>กลุ่มที่ 2 (หนี้ค้าง + หนี้ครบ)</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={5}>กลุ่มที่ 3 (หนี้ครบ)</StyledTableCell>
                                    <StyledTableCell align="center" colSpan={5}>รวม 3 กลุ่ม</StyledTableCell>

                                </TableRow>

                                <TableRow>
                                    
                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >เป้าค้าง 100%</StyledTableCell>
                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >ผล</StyledTableCell>
                                    <StyledTableCell align="center" >ร้อยละ</StyledTableCell>

                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >เป้าค้าง + ครบ 100%</StyledTableCell>
                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >ผล</StyledTableCell>
                                    <StyledTableCell align="center" >ร้อยละ</StyledTableCell>

                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >เป้าครบ 100%</StyledTableCell>
                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >ผล</StyledTableCell>
                                    <StyledTableCell align="center" >ร้อยละ</StyledTableCell>

                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >เป้ารวม 100%</StyledTableCell>
                                    <StyledTableCell align="center" >ราย</StyledTableCell>
                                    <StyledTableCell align="center" >ผล</StyledTableCell>
                                    <StyledTableCell align="center" >ร้อยละ</StyledTableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {this.state.farmerPayLoanList.map((farmer, index) => {

                                  
                                    return (
                                        <TableRow key={index}>
                                            <StyledTableCellLine align="center" >{farmer.no}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.fullName}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contract1}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.target1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo1}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.result1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.percentage1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contract2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.target2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.result2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.percentage2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contract3}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.target3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo3}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.result3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.percentage3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contract4}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.target4)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left">{farmer.contractNo4}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.result4)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right">{formatNumber(farmer.percentage4)}</StyledTableCellLine>

                                        </TableRow>
                                    )

                                })}

                                <TableRow>
                                    <StyledTableCellLine colSpan={3} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                        รวมทั้งสิ้น
                                    </StyledTableCellLine>
                                             <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contract1}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.target1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contractNo1}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.result1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.percentage1)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contract2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.target2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contractNo2}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.result2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.percentage2)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contract3}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.target3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contractNo3}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.result3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.percentage3)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contract4}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.target4)}</StyledTableCellLine>
                                            <StyledTableCellLine align="left" className={`${classes.cellBlue} ${classes.cellSummary}`}>{dataSummary.contractNo4}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.result4)}</StyledTableCellLine>
                                            <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.percentage4)}</StyledTableCellLine>
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

export default withStyles(styles)(ComparePerContractTab)