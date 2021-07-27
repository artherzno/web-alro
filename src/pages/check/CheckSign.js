import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect, BorrowTypeSelect } from '../../components/check'

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import {
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'

class CheckSign extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: true,
            isExporting: false,
            dateSelect: null,
            Date: "",
            ContractNo: "",
            ProjName: "",
            FullName: "",
            Order: "",
            Display: "",
            ProjMain:"",
            ProjSec: "",
            LoanType: "",
            BorrowerType: "",
            LoanPlan: "",
            LoanPurpose: "",
            LoanType2: "",
            loanAmount:0,
            remainAmount:0,
            totalContract:0,
            data: [],
            page: 0,
            count: 10
        }
    }

    componentDidMount() {

        this.loadData()
    }

    loadData() {

        const { Date, ContractNo, ProjName, FullName, Order, Display, ProjMain, ProjSec, LoanType, BorrowerType, LoanPlan, LoanPurpose, LoanType2,} = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('FullName', FullName);
        parameter.append('Order', Order);
        parameter.append('Display', Display);
        parameter.append('Display', ProjMain);
        parameter.append('Display', ProjSec);
        parameter.append('Display', LoanType);
        parameter.append('Display', BorrowerType);
        parameter.append('Display', LoanPlan);
        parameter.append('Display', LoanPurpose);
        parameter.append('Display', LoanType2);

        api.getContract(parameter).then(response => {

            const dataSummary = response.data.dataSummary.length > 0 ? response.data.dataSummary[0] : {}

            this.setState({
                data: response.data.data,
                loanAmount: dataSummary.loanAmount,
                remainAmount: dataSummary.remainAmount,
                totalContract: dataSummary.totalContract,
            })

        }).catch(error => {

        })
    }

    exportExcel() {


        const { Date, ContractNo, ProjName, FullName, Order, Display, ProjMain, ProjSec, LoanType, BorrowerType, LoanPlan, LoanPurpose, LoanType2, } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('FullName', FullName);
        parameter.append('Order', Order);
        parameter.append('Display', Display);
        parameter.append('Display', ProjMain);
        parameter.append('Display', ProjSec);
        parameter.append('Display', LoanType);
        parameter.append('Display', BorrowerType);
        parameter.append('Display', LoanPlan);
        parameter.append('Display', LoanPurpose);
        parameter.append('Display', LoanType2);

        this.setState({
            isExporting: true
        })


        api.exportContract(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบสัญญา.xlsx');
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

    onChange = (state) => (event) => {

        this.setState({
            [state]: event.target.value
        }, () => {

            if (this.delay) {
                clearTimeout(this.delay)
                this.delay = null
            }
            this.delay = setTimeout(() => {
                this.loadData()
            }, 500);

        })


    }


    render() {

        const { classes } = this.props;
        const { data, page, count } = this.state

        return (
            <div>
                <div className="header-nav">
                    <Header bgColor="bg-light-green" status="logged" />
                    <Nav />
                </div>

                <Fade in={this.state.loaded} timeout={800}>
                    <div className="fade">
                        <Container maxWidth="lg">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page">
                                    <h1>ตรวจสอบสัญญา</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" value={this.state.dateSelect} onChange={(event) => {
                                                this.setState({ Date: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {
                                                    this.loadData()
                                                })
                                            }} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("ContractNo")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" onChange={this.onChange("ProjName")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ค้นหาชื่อ" onChange={this.onChange("FullName")}  />
                                        </Grid>
                                        

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck onChange={this.onChange("Order")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <DisplayCheck onChange={this.onChange("Display")} />
                                        </Grid>


                                    </Grid>
                                </Grid>

                            </Grid>

                            <div className="container-filter">
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <MainProjectSelect onChange={this.onChange("ProjMain")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <SecondProjectSelect onChange={this.onChange("ProjSec")} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanTypeSelect onChange={this.onChange("LoanType")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanderTypeSelect onChange={this.onChange("BorrowerType")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <ObjectiveLoanSelect onChange={this.onChange("LoanPlan")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <BorrowTypeSelect onChange={this.onChange("LoanPurpose")}/>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <LoanPlanSelect onChange={this.onChange("LoanType2")}/>
                                        </Grid>
                                        
                                    </Grid>
                                </Box>
                            </div>
                            
                            <Box mt={2}>
                                <Grid container spacing={2} justifyContent="center">
                                    <Grid item xs={2} >
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData() }} />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div style={{marginTop:-8}}>
                                            <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                          
                            <Box mt={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield disabled={true} value={this.state.loanAmount} label="จำนวนสัญญา" />
                                    </Grid>
                                    <Grid item xs={12}  md={3}>
                                        <MuiTextfield disabled={true} value={this.state.remainAmount} label="จำนวนเงินเหลือ" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield disabled={true} value={this.state.totalContract} label="จำนวนเงินกู้" />
                                    </Grid>
                           
                                </Grid>
                            </Box>

                            <Box mt={2}>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                <StyledTableCell align="center">Mindex</StyledTableCell>
                                                <StyledTableCell align="center">รหัส</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                <StyledTableCell align="center">คำนำหน้า</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อ</StyledTableCell>
                                                <StyledTableCell align="center">นามสกุล</StyledTableCell>
                                                <StyledTableCell align="center">ที่อยู่</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่</StyledTableCell>
                                                <StyledTableCell align="center">หมู่</StyledTableCell>
                                                <StyledTableCell align="center">ตำบล</StyledTableCell>
                                                <StyledTableCell align="center">อำเภอ</StyledTableCell>
                                                <StyledTableCell align="center">จังหวัด</StyledTableCell>
                                                <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">Prentno</StyledTableCell>
                                                <StyledTableCell align="center">วันที่สัญญา</StyledTableCell>
                                                <StyledTableCell align="center">หมู่(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">ตำบล(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">อำเภอ(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">ประเภท(ที่ดิน)</StyledTableCell>
                                                <StyledTableCell align="center">Titleno</StyledTableCell>
                                                <StyledTableCell align="center">Group</StyledTableCell>
                                                <StyledTableCell align="center">แปลง</StyledTableCell>
                                                <StyledTableCell align="center">ไร่</StyledTableCell>
                                                <StyledTableCell align="center">งาน</StyledTableCell>
                                                <StyledTableCell align="center">วา</StyledTableCell>
                                                <StyledTableCell align="center">วันที่กู้</StyledTableCell>
                                                <StyledTableCell align="center">วงเงินกู้</StyledTableCell>
                                                <StyledTableCell align="center">อัตราดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center">รหัสงาน</StyledTableCell>
                                                <StyledTableCell align="center">ประเภท</StyledTableCell>
                                                <StyledTableCell align="center">ใช้เงินปี</StyledTableCell>
                                                <StyledTableCell align="center">บัตรประชาชน</StyledTableCell>
                                                <StyledTableCell align="center">อัตราค่าปรับ</StyledTableCell>
                                                <StyledTableCell align="center">Trnf_date</StyledTableCell>
                                                <StyledTableCell align="center">Typeplan</StyledTableCell>
                                                <StyledTableCell align="center">หมายเหตุ</StyledTableCell>
                                                <StyledTableCell align="center">ชื่อย่อจังหวัด</StyledTableCell>
                                                <StyledTableCell align="center">Finish_flag</StyledTableCell>
                                                <StyledTableCell align="center">Rpay</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้เงินต้น</StyledTableCell>
                                                <StyledTableCell align="center">ศาล(ต้น+ดอก)</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้ดอกเบี้ย</StyledTableCell>
                                                <StyledTableCell align="center">ตั้งหนี้ค่าปรับ</StyledTableCell>
                                                <StyledTableCell align="center">สถานะตั้งหนี้</StyledTableCell>
                                                <StyledTableCell align="center">Obj_code</StyledTableCell>
                                                <StyledTableCell align="center">Cus_code</StyledTableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {data.slice(page * count, page * count + count).map((element, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">{element.saveCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.recordingDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mindex}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.id}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.projName}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.prefix}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.name}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.lastName}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.address}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.no}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.moo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.subDistrict}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.district}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.province}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.contractNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.prentno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.contractDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.mooLand}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.subDistrictLand}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.districtLand}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.landType}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.titlno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.groups}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.shape}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.rai}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.ngan}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.wa}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.loanDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.creditLimit)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.interestRate)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.jobCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.category}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.annuity}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.idCard}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.fineRate)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.trnfDate}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.typeplan}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.note}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.provinceAbbreviation}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.finishFlag}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.rpay)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.principalDebt)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.court)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.interestDebt)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.fineDebt)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{formatNumber(element.debtStatus)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.objCode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="center">{element.cusCode}</StyledTableCellLine>


                                                    </TableRow>
                                                )
                                            })}


                                        </TableBody>
                                    </Table>

                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.data.length}
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
                                    
                                </TableContainer>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(CheckSign)