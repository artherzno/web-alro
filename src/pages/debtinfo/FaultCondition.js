import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import TablePagination from '@material-ui/core/TablePagination';
import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiTextfieldEndAdornment,
    MuiTextfieldStartAdornment,
    MuiRadioButton,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';
import api from '../../services/webservice'
import { formatNumber } from '../../utils/Utilities';
import { useFormikContext, Formik, Form, Field, } from 'formik';
import moment from 'moment';
import { ButtonExport, OverlayLoading } from '../../components';
import { getAccount } from '../../utils/Auth';

function FaultCondition() {
    const history = useHistory();

    const formikRef = useRef();
    const [loaded, setLoaded] = useState(false);
    const [paramLoanID, setParamLoanID] = useState("")
    const [paramIDCard, setParamIDCard] = useState("")
    const [resultList, setResultList] = useState([])
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(10)
    const [selectedData, setSelectedData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false)
    const [isExporting1, setIsExporting1] = useState(false)
    const [isExporting2, setIsExporting2] = useState(false)
    const [isExporting3, setIsExporting3] = useState(false)

    useEffect(() => {
        setLoaded(true);
        getDebtDataByLoan()

    }, [])


    async function getDebtDataByLoan() {

        const parameter = {
            LoanID: paramLoanID
        }

        const parameter1 = {
            IDCard: paramIDCard
        }

        try {
            setIsLoading(true)
            const res = await Promise.all([api.getDebtDataByLoan(parameter), api.getDebtDataByID(parameter1)])
            const resultList = res[0].data.concat(res[1].data)
            setResultList(resultList)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("error", error)
        }



    }

    function getDebtConditionByContractPdf() {

        const parameter = new FormData()
        parameter.append('ContractNo', paramLoanID);
        const account = getAccount()
        parameter.append('UserName', account.username);

        setIsExporting(true)

        api.getDebtConditionByContractPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    function getFaultConditionByUserNamePdf(){

        const parameter = new FormData()
        const account = getAccount()
        parameter.append('UserName', account.username);


        setIsExporting1(true)

        api.getFaultConditionByUserNamePdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting1(false)

        }).catch(error => {

            setIsExporting1(false)

        })

    }

    function getDebtConditionByUserNamePdf(){

        const parameter = new FormData()
        const account = getAccount()
        parameter.append('UserName', account.username);


        setIsExporting2(true)

        api.getDebtConditionByUserNamePdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting2(false)

        }).catch(error => {

            setIsExporting2(false)

        })

    }

    function getFaultConditionByContractPdf(){
     
        const parameter = new FormData()
        parameter.append('ContractNo', paramLoanID);
        const account = getAccount()
        parameter.append('UserName', account.username);

        setIsExporting3(true)

        api.getFaultConditionByContractPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting3(false)

        }).catch(error => {

            setIsExporting3(false)

        })

    }

 

    return (
        <div className="faultcondition-page">
            <OverlayLoading isLoading={isLoading} />
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">
                                <h1>รับสภาพหนี้/รับสภาพตามความผิด</h1>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="ค้นหาเลขที่สัญญา" onChange={(e) => { setParamLoanID(e.target.value) }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="เลขประจำตัวประชาชนเกษตรกร" onChange={(e) => { setParamIDCard(e.target.value) }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="ค้นหา" onClick={getDebtDataByLoan} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">รหัสโครงการ</TableCell>
                                                    <TableCell align="left">ชื่อโครงการ</TableCell>
                                                    <TableCell align="left">เลขที่สัญญา</TableCell>
                                                    <TableCell align="left">คำนำหน้า</TableCell>
                                                    <TableCell align="left">ชื่อ</TableCell>
                                                    <TableCell align="left">นามสกุล</TableCell>
                                                    <TableCell align="left">เลขบัตรประชาชน</TableCell>
                                                    <TableCell align="left">บ้านเลขที่</TableCell>
                                                    <TableCell align="left">หมู่ที่</TableCell>
                                                    <TableCell align="left">ถนน</TableCell>
                                                    <TableCell align="left">ตำบล</TableCell>
                                                    <TableCell align="left">อำเภอ</TableCell>
                                                    <TableCell align="left">จังหวัด</TableCell>
                                                    <TableCell align="left">เบอร์โทรศัพท์</TableCell>
                                                    <TableCell align="left" className="cell-blue">จำนวนเงินให้กู้</TableCell>
                                                    <TableCell align="left" className="cell-green">อัตราดอกเบี้ย</TableCell>
                                                    <TableCell align="left" className="cell-red">หนี้ค้างชำระ</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                                {resultList.length <= 0 && <TableRow>
                                                    <TableCell colSpan={17} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>}
                                                {resultList.slice(page * count, page * count + count).map((element, index) => {

                                                    return (
                                                        <TableRow key={index} hover={true} onClick={() => {
                                                            setSelectedData(element)
                                                        }}>
                                                            <StyledTableCellLine align="left">{element.Projectcode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ProjectName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.LoanNumber}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.FrontName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Name}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Sirname}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCard}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_AddNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_AddMoo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_AddrSoiRoad}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_Addrsubdistrictname}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_AddrDistrictname}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCARD_AddrProvinceName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Tel}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.principle)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.Interest)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.PrincipleBalance2)}</StyledTableCellLine>
                                                        </TableRow>
                                                    )
                                                })}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={resultList.length}
                                        rowsPerPage={count}
                                        page={page}
                                        onPageChange={(e, newPage) => {
                                            setPage(newPage)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            setPage(0)
                                            setCount(+event.target.value)
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Formik
                        enableReinitialize={true}
                        innerRef={formikRef}
                        initialValues={{
                            ...selectedData,
                            Total:0,

                        }}
                        validate={values => {
                            const requires = []
                            let errors = {};
                            requires.forEach(field => {
                                if (!values[field]) {
                                    errors[field] = 'Required';
                                }
                            });


                            return errors;
                        }}
                        onSubmit={(values, actions) => {

                        }}
                        render={(formik) => {

                            const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik

                            return (
                                <Form>
                                    <Container maxWidth={false}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>

                                                {/* Paper 1 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <form className="root" noValidate autoComplete="off">
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfieldMultiLine
                                                                    name="Comment"
                                                                    value={values.Comment}
                                                                    error={errors.Comment}
                                                                    helperText={errors.Comment}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="หมายเหตุ"
                                                                    label="หมายเหตุ" row="3" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <p>หนี้ค้างชำระ</p>
                                                                <Box className="box box-red-summary">{formatNumber(values.PrincipleBalance2)}</Box>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <p>จำนวนดอกเบี้ย</p>
                                                                <Box className="box box-black-summary">{formatNumber(values.Interest)}</Box>
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <p>ยอด ณ วันที่</p>
                                                                {/* <Box className="box box-black-summary"> */}
                                                                <MuiDatePicker 
                                                                    name="mDate"
                                                                    value={values.mDate}
                                                                    error={errors.mDate}
                                                                    helperText={errors.mDate}
                                                                    onChange={(event) => {
                                                                        setFieldValue("mDate", moment(event).format("YYYY-MM-DD"))

                                                                        if (selectedData.ReceiptDate && selectedData.ReceiptDate!=""){

                                                               
                                                                            const diffDate = moment(event).diff(moment(selectedData.ReceiptDate, "YYYY-MM-DD"),'days')
                                                                            const interest = selectedData.PrincipleBalance2 * ((selectedData.Interest / 100) / 365) * diffDate
                                                                            setFieldValue("Interest",interest)
                                                                            setFieldValue("Total", selectedData.PrincipleBalance2+interest)

                                                                        }
                                                                      
                                                                    }}
                                                                    onChangeDate={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="วันที่บันทึก"
                                                                    label="วันที่บันทึก"
                                                                label="" />
                                                                {/* </Box> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <p>รวมเป็นจำนวนเงินทั้งสิ้น</p>
                                                                <Box className="box box-red-summary">{formatNumber(values.Total)}</Box>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </Paper>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <h3 className="txt-red txt-center txt-regular">การทำรายงานหน้านี้ต้องประมวลวัน ณ วันที่ต้องการคำนวณการรับสภาพหนี้</h3>
                                                    </Grid>
                                                </Grid>

                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <form className="root" noValidate autoComplete="off" >
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield
                                                                    name="IDCard"
                                                                    value={values.IDCard}
                                                                    error={errors.IDCard}
                                                                    helperText={errors.IDCard}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="เลขบัตรประจำตัวประชาชน"
                                                                    label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect
                                                                    name="FrontName"
                                                                    id="FrontName"
                                                                    value={values.FrontName}
                                                                    error={errors.FrontName}
                                                                    helperText={errors.FrontName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="คำนำหน้า"
                                                                    listsValue={['นาย', 'นาง', 'นางสาว']}
                                                                    label="คำนำหน้า" lists={['นาย', 'นาง', 'นางสาว']} />
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield
                                                                    name="Name"
                                                                    value={values.Name}
                                                                    error={errors.Name}
                                                                    helperText={errors.Name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="ชื่อ"
                                                                    label="ชื่อ" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                {/* Field Text ---------------------------------------------------*/}
                                                                <MuiTextfield
                                                                    name="Sirname"
                                                                    value={values.Sirname}
                                                                    error={errors.Sirname}
                                                                    helperText={errors.Sirname}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="นามสกุล"
                                                                    label="นามสกุล" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield
                                                                    name="IDCARD_AddrSoiRoad"
                                                                    value={values.IDCARD_AddrSoiRoad}
                                                                    error={errors.IDCARD_AddrSoiRoad}
                                                                    helperText={errors.IDCARD_AddrSoiRoad}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="ที่อยู่"
                                                                    label="ที่อยู่" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                {/* Field Text ---------------------------------------------------*/}
                                                                <MuiTextfield
                                                                    name="IDCARD_AddNo"
                                                                    value={values.IDCARD_AddNo}
                                                                    error={errors.IDCARD_AddNo}
                                                                    helperText={errors.IDCARD_AddNo}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="เลขที่"
                                                                    label="เลขที่" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                {/* Field Text ---------------------------------------------------*/}
                                                                <MuiTextfield
                                                                    name="IDCARD_AddMoo"
                                                                    value={values.IDCARD_AddMoo}
                                                                    error={errors.IDCARD_AddMoo}
                                                                    helperText={errors.IDCARD_AddMoo}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="หมู่"
                                                                    label="หมู่" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield
                                                                    name="IDCARD_AddrProvinceName"
                                                                    value={values.IDCARD_AddrProvinceName}
                                                                    error={errors.IDCARD_AddrProvinceName}
                                                                    helperText={errors.IDCARD_AddrProvinceName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="จังหวัด"
                                                                    label="จังหวัด" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield
                                                                    name="IDCARD_AddrDistrictname"
                                                                    value={values.IDCARD_AddrDistrictname}
                                                                    error={errors.IDCARD_AddrDistrictname}
                                                                    helperText={errors.IDCARD_AddrDistrictname}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="เขต/อำเภอ"
                                                                label="เขต/อำเภอ" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield
                                                                    name="IDCARD_Addrsubdistrictname"
                                                                    value={values.IDCARD_Addrsubdistrictname}
                                                                    error={errors.IDCARD_Addrsubdistrictname}
                                                                    helperText={errors.IDCARD_Addrsubdistrictname}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="แขวง/ตำบล"
                                                                    label="แขวง/ตำบล" />
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </Paper>

                                                <Grid container spacing={2} className="btn-row">
                                                    <Grid item  xs={12} md={3}>
                                                        <ButtonExport label="พิมพ์ใบรับสภาพหนี้ รายตัว" handleButtonClick={() => { getDebtConditionByContractPdf() }} loading={isExporting} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <ButtonExport label="พิมพ์ใบรับสภาพหนี้ รวม" handleButtonClick={() => { getDebtConditionByUserNamePdf() }} loading={isExporting2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <ButtonExport label="พิมพ์ใบรับสภาพความผิด รายตัว" handleButtonClick={() => { getFaultConditionByContractPdf() }} loading={isExporting3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <ButtonExport label="พิมพ์ใบรับสภาพความผิด รวม" handleButtonClick={() => { getFaultConditionByUserNamePdf() }} loading={isExporting1} />
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Container>

                                </Form>)
                        }} />

                </div>
            </Fade>
        </div>
    )
}

export default FaultCondition
