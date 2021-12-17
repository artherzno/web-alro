import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton'

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiSelect,
    MuiCheckbox,
    ButtonNormalIconStartPrimary,
    MuiTextfieldEndAdornment,
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
    MuiTextfieldMultiLine,
    MuiTextfieldNumber
} from '../../components/MUIinputs';
import api from '../../services/webservice'
import { dateFormatTensiveMenu, formatNumber } from '../../utils/Utilities';

import { useFormikContext, Formik, Form, Field, } from 'formik';
import moment from 'moment';
import { getAccount } from '../../utils/Auth'
import { dialog, OverlayLoading } from '../../components';

function RecordInstallmentPayment() {
    const history = useHistory();

    const formikRef = useRef();

    const [loaded, setLoaded] = useState(false);
    const [paramsSignNo, setParamsSignNo] = useState("")
    const [paramsRequestNo, setParamRequestNo] = useState("")
    const [resultList, setResultList] = useState([])
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(10)
    const [selectedData, setSelectedData] = useState({})
    const [selectedItemData, setSelectedItemData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [checkClose,setCheckClose] = useState(false)
    const [selectedExtendData, setSelectedExtendData] = useState({})
    
    useEffect(() => {
        setLoaded(true);

        getDataByLoan()

    }, [])

    async function getDataByLoan() {

        const parameter = {
            LoanNumber: paramsSignNo,
            RelentNumber: paramsRequestNo
        }

        const parameter1 = {
            RelentNumber: paramsRequestNo
        }

        try {

            setIsLoading(true)
            const res = await api.getDataByLoanRelent(parameter)
            const resultList = res.data
            setResultList(resultList)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("error", error)
        }



    }

    function onChangeRealPay(key, value, index) {

        const realPay = selectedExtendData.RealPay
        if (realPay && realPay.length - 1 <= index) {
            realPay[index][key] = value
        }
        setSelectedData({
            ...selectedExtendData,
            RealPay: realPay
        })
    }


    function selectDataByLoan(LoanNumber) {

        const parameter = {
            LoanNumber: LoanNumber
        }

        setIsLoading(true)
        api.selectDataByLoan(parameter).then(response => {

            if (response.data.length > 0) {

                const selectedData = response.data[0]
                setSelectedData(selectedData)

                
               

            }
            setIsLoading(false)

        }).catch(() =>{
            setIsLoading(false)
        })
    }

    function saveRelent(values) {

        dialog.showLoading()
        api.saveRelent(values).then(response => {
            dialog.close()
            setTimeout(() => {
                dialog.showDialogSuccess({ message: "บันทึกข้อมูลสำเร็จ" })
            }, 500);
        
        }).catch(() => {
            dialog.close()
        })
    }

    function getProcessBeforePay(date) {

        const account = getAccount()

        const parameter = {
            LoanNumber: selectedData.LoanNumber,//values.LoanNumber,
            Fullname: '',//values.Fullname,
            Rentno: selectedData.LoanNumber,
            Date: date
        }
        setIsLoading(true)
        api.getProcessBeforePay(parameter).then(response => {


            const beforeProcess = response.data
            if (beforeProcess.length > 0) {

                const recData = beforeProcess[beforeProcess.length - 1]
                const beforRectData = beforeProcess.length >= 2 ? beforeProcess[beforeProcess.length - 2] : null

                formikRef.current.setFieldValue("PrincipleBalance1", recData.principalBalance)
                formikRef.current.setFieldValue("RemainingPrinciple", recData.principalBalance)
               
                formikRef.current.setFieldValue("RecInterestKang2", recData ? recData.InterestKang2 : 0)
                formikRef.current.setFieldValue("RecDueInterest", beforRectData ? recData.InterestKang2 - beforRectData.InterestKang2 : recData.InterestKang2)
                formikRef.current.setFieldValue("RecSumInterest", recData.InterestKang2)
                formikRef.current.setFieldValue("RecOverdueInterest", recData.FineKang)
                formikRef.current.setFieldValue("RecSumPaid", recData.StuckMoney + recData.InterestKang2 + recData.FineKang)
                formikRef.current.setFieldValue("ChangeInterest", recData.InterestRate)
                

                formikRef.current.setFieldValue("PaymentPeriodRemain", parseFloat(recData.principalBalance) - parseFloat(selectedData.PrintciplePay))
                formikRef.current.setFieldValue("PrintciplePay", selectedData.PrintciplePay)

            }

            setIsLoading(false)

        }).catch(error => {
            setIsLoading(false)
        })


    }


    return (
        <div className="recordinstallmentpayment-page">

            <OverlayLoading isLoading={isLoading} />

            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">
                                <h1>บันทึกขอผ่อนผัน</h1>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="ค้นหาเลขที่สัญญา" onChange={(e) => { setParamsSignNo(e.target.value) }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="ค้นหาเลขที่คำขอ" onChange={(e) => { setParamRequestNo(e.target.value) }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                    getDataByLoan()
                                }} />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Paper className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">รหัสบันทึก</TableCell>
                                                    <TableCell align="left">วันที่บันทึก</TableCell>
                                                    <TableCell align="left">เลขคำขอ</TableCell>
                                                    <TableCell align="left">อ้างถึง</TableCell>
                                                    <TableCell align="left">อ้างถึง</TableCell>
                                                    <TableCell align="left">รหัสสารบัญ</TableCell>
                                                    <TableCell align="left">ลำดับ</TableCell>
                                                    <TableCell align="left">รหัสโครงการ</TableCell>
                                                    <TableCell align="left">ชื่อโครงการ</TableCell>
                                                    <TableCell align="left">เลขที่สัญญา</TableCell>
                                                    <TableCell align="left">วันที่กู้</TableCell>
                                                    <TableCell align="left">เลขบัตรประชาชน</TableCell>
                                                    <TableCell align="left">คำนำหน้า</TableCell>
                                                    <TableCell align="left">ชื่อ</TableCell>
                                                    <TableCell align="left">นามสกุล</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                                {resultList.length <= 0 && <TableRow>
                                                    <TableCell colSpan={15} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>}
                                                {resultList.slice(page * count, page * count + count).map((element, index) => {

                                                    return (
                                                        <TableRow key={index} hover={true} onClick={() => {
                                                            selectDataByLoan(element.LoanNumber)
                                                            setSelectedItemData(element)
                                                        }}>
                                                            <StyledTableCellLine align="left">{element.RecordCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.RecDate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{''/*element.RelentNumber*/}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Ref1}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Ref2}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Order}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Projectcode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ProjectName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.LoanNumber}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.LoanDate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.IDCard}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.FrontName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Name}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.SirName}</StyledTableCellLine>
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
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}


                                <Formik
                                    enableReinitialize={true}
                                    innerRef={formikRef}
                                    initialValues={{
                                        ...selectedItemData,
                                        ...selectedData,
                                        PVCODE_LoanNumber: selectedData.PVSCODE ? `${selectedData.PVSCODE}${selectedData.LoanNumber}`:'',
                                        RelentDateBefore: selectedData.RelentDate,
                                        RelentDate:'',
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
                                        saveRelent(values)
                                    }}
                                    render={(formik) => {

                                        const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik


                                        return (
                                            <Form>
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="RecNum"
                                                                value={values.RecNum}
                                                                error={errors.RecNum}
                                                                helperText={errors.RecNum}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขที่บันทึก"
                                                                label="เลขที่บันทึก"
                                                                disabled
                                                                defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker
                                                                name="RelentDateBefore"
                                                                value={values.RelentDateBefore}
                                                                error={errors.RelentDateBefore}
                                                                helperText={errors.RelentDateBefore}
                                                                onChange={(event) => {
                                                                    setFieldValue("RelentDateBefore", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่บันทึก"
                                                                label="วันที่บันทึก"
                                                                defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield
                                                                name="pvscode"
                                                                value={values.pvscode}
                                                                error={errors.pvscode}
                                                                helperText={errors.pvscode}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="รหัสจังหวัด"
                                                                label="รหัสจังหวัด"
                                                                defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="PV_NAME"
                                                                value={values.PV_NAME}
                                                                error={errors.PV_NAME}
                                                                helperText={errors.PV_NAME}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="จังหวัด"
                                                                label="จังหวัด"
                                                                defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="RelentNumber"
                                                                value={values.RelentNumber}
                                                                error={errors.RelentNumber}
                                                                helperText={errors.RelentNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขที่คำขอ"
                                                                label="เลขที่คำขอ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                // name="Ref1"
                                                                value={'คำขอผ่อนผัน'}
                                                                // error={errors.Ref1}
                                                                // helperText={errors.Ref1}
                                                                disabled
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อ้างถึง"
                                                                label="อ้างถึง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="Ref2"
                                                                value={values.Ref2}
                                                                error={errors.Ref2}
                                                                helperText={errors.Ref2}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อ้างถึง"
                                                                label="อ้างถึง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield
                                                                name="Item"
                                                                value={values.Item}
                                                                error={errors.Item}
                                                                helperText={errors.Item}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อ้างถึง"
                                                                label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="Command"
                                                                value={values.Command}
                                                                error={errors.Command}
                                                                helperText={errors.Command}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขที่คำสั่ง"
                                                                label="เลขที่คำสั่ง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker
                                                                        name="CommandDate"
                                                                        value={values.CommandDate}
                                                                        error={errors.CommandDate}
                                                                        helperText={errors.CommandDate}
                                                                        onChange={(event) => {
                                                                            setFieldValue("CommandDate", moment(event).format("YYYY-MM-DD"))
                                                                        }}
                                                                        onChangeDate={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="วันที่คำสั่ง"
                                                                        label="วันที่คำสั่ง" defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="LoanNumber"
                                                                value={values.LoanNumber}
                                                                error={errors.LoanNumber}
                                                                helperText={errors.LoanNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="สัญญาเลขที่"
                                                                label="สัญญาเลขที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="PVCODE_LoanNumber"
                                                                value={values.PVCODE_LoanNumber}
                                                                error={errors.PVCODE_LoanNumber}
                                                                helperText={errors.PVCODE_LoanNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;" defaultValue="" />
                                                        </Grid>

                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="ProjectPlanYear"
                                                                value={values.ProjectPlanYear}
                                                                error={errors.ProjectPlanYear}
                                                                helperText={errors.ProjectPlanYear}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ใช้เงินตามแผนปี"
                                                                label="ใช้เงินตามแผนปี" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="principle"
                                                                value={values.principle}
                                                                error={errors.principle}
                                                                helperText={errors.principle}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="จำนวนเงินให้กู้"
                                                                label="จำนวนเงินให้กู้" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="Interest"
                                                                value={values.Interest}
                                                                error={errors.Interest}
                                                                helperText={errors.Interest}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อัตราดอกเบี้ย"
                                                                label="อัตราดอกเบี้ย" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={3}>
                                                                            <MuiTextfield
                                                                                name="Projectcode"
                                                                                value={values.Projectcode}
                                                                                error={errors.Projectcode}
                                                                                helperText={errors.Projectcode}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                placeholder="รหัสโครงการ"
                                                                                label="รหัสโครงการ" defaultValue="" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield
                                                                                name="ProjectName"
                                                                                value={values.ProjectName}
                                                                                error={errors.ProjectName}
                                                                                helperText={errors.ProjectName}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                placeholder="ชื่อโครงการ"
                                                                                label="ชื่อโครงการ" defaultValue="" />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield
                                                                name="IDCard"
                                                                value={values.IDCard}
                                                                error={errors.IDCard}
                                                                helperText={errors.IDCard}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขบัตรประชาชน"
                                                                label="เลขบัตรประชาชน" />
                                                        </Grid>

                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="Name"
                                                                value={values.Name}
                                                                error={errors.Name}
                                                                helperText={errors.Name}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขบัตรประชาชน"
                                                                label="ชื่อ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="Sirname"
                                                                value={values.Sirname}
                                                                error={errors.Sirname}
                                                                helperText={errors.Sirname}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขบัตรประชาชน"
                                                                label="นามสกุล" defaultValue="" />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <form className="root" noValidate autoComplete="off" >
                                                        <Grid container spacing={2} className="paper-container">
                                                            <Grid item xs={12} md={12} >
                                                                <Grid container spacing={2} >
                                                                    <Grid item xs={12} md={12}>
                                                                        <h1 className="paper-head-green">ประมวลผล สถานะหนี้ วันที่ประมวล</h1>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiDatePicker
                                                                                        name="RelentDate"
                                                                                        value={values.RelentDate}
                                                                                        error={errors.RelentDate}
                                                                                        helperText={errors.RelentDate}
                                                                                        onChange={(event) => {
                                                                                            setFieldValue("RelentDate", moment(event).format("YYYY-MM-DD"))
                                                                                            getProcessBeforePay(moment(event).format("YYYY-MM-DD"))
                                                                                        }}
                                                                                        onChangeDate={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="วันที่ประมวล"
                                                                                        label="วันที่ประมวล" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <MuiTextfieldMultiLine
                                                                                        name="Comment"
                                                                                        value={values.Comment}
                                                                                        error={errors.Comment}
                                                                                        helperText={errors.Comment}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="หมายเหตุ"
                                                                                        label="หมายเหตุ" row="3" defaultValue="" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="RemainingPrinciple"
                                                                                        value={values.RemainingPrinciple}
                                                                                        error={errors.RemainingPrinciple}
                                                                                        helperText={errors.RemainingPrinciple}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="เงินต้นคงเหลือ"
                                                                                        textAlign='right'
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="PrintciplePay"
                                                                                        value={values.PrintciplePay}
                                                                                        error={errors.PrintciplePay}
                                                                                        helperText={errors.PrintciplePay}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="เงินต้นครบกำหนดชำระ"
                                                                                        textAlign='right'
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        {/* <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="RecInterestKang2"
                                                                                        value={values.RecInterestKang2}
                                                                                        error={errors.RecInterestKang2}
                                                                                        helperText={errors.RecInterestKang2}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="ดอกเบี้ยค้างรับ"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid> */}

                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ChangeInterest"
                                                                                        value={values.ChangeInterest}
                                                                                        error={errors.ChangeInterest}
                                                                                        helperText={errors.ChangeInterest}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="อัตราดอกเบี้ย"
                                                                                        textAlign='right'
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">งวดชำระคงเหลือ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="PaymentPeriodRemain"
                                                                                        value={values.PaymentPeriodRemain}
                                                                                        error={errors.PaymentPeriodRemain}
                                                                                        helperText={errors.PaymentPeriodRemain}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="งวดชำระคงเหลือ"
                                                                                        textAlign='right'
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินขอผ่อนผันในงวดบัญชีนี้</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="RelentCost"
                                                                                        value={values.RelentCost}
                                                                                        error={errors.RelentCost}
                                                                                        helperText={errors.RelentCost}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="จำนวนเงินขอผ่อนผันในงวดบัญชีนี้"
                                                                                        textAlign='right'
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </Paper>
                                              

                                                <Grid container spacing={2} className="btn-row txt-center">
                                                    <Grid item xs={12} md={12}>
                                                        <ButtonFluidPrimary label="บันทึกแก้ไข" maxWidth="320px" onClick={handleSubmit}/>
                                                    </Grid>
                                                </Grid>

                                            </Form>)
                                    }} />





                            </Grid>
                        </Grid>
                    </Container>



                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <h1 className="txt-center">งวดชำระเงินตามจริง</h1>
                                    <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">ลำดับ</TableCell>
                                                    <TableCell align="left">เลขที่สัญญา</TableCell>
                                                    <TableCell align="left">วันที่ชำระ</TableCell>
                                                    <TableCell align="left">จำนวนเงิน</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    selectedExtendData.RealPay && selectedExtendData.RealPay.map((row, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="left">{row.ITEM}</TableCell>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" value={row.RENTNO} onChange={(e) => {
                                                                    onChangeRealPay("RENTNO", e.target.value, i)
                                                                }} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <MuiDatePicker label="" value={(row.DUEDATE && row.DUEDATE != "") ? moment(row.DUEDATE, "YYYY-MM-DD").format("YYYY-MM-DD") : null} onChange={(event) => {

                                                                    onChangeRealPay("DUEDATE", moment(event).format("YYYY-MM-DD"), i)

                                                                }} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                {
                                                                    i === 0 ?
                                                                        <MuiTextfield label="" value={row.PAYREC} onChange={(e) => {
                                                                            onChangeRealPay("PAYREC", e.target.value, i)
                                                                        }} />
                                                                        :
                                                                        <MuiTextfieldEndAdornment label="" value={row.PAYREC} onChange={(e) => {
                                                                            onChangeRealPay("PAYREC", e.target.value, i)
                                                                        }} endAdornment={<IconButton onClick={() => {

                                                                            const realPay = selectedExtendData.RealPay
                                                                            if (realPay) {
                                                                                realPay.splice(i, 1)
                                                                            }

                                                                            setSelectedData({
                                                                                ...selectedExtendData,
                                                                                RealPay: realPay
                                                                            })

                                                                        }} > <CloseIcon className="table-item-del" /></IconButton>} />
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="box-button txt-center">
                                    <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" onClick={() => {

                                        let realPay = selectedExtendData.RealPay

                                        if (!realPay) {
                                            realPay = []
                                        }
                                        realPay.push({
                                            RENTNO: selectedData.LoanNumber,
                                            DUEDATE: "",
                                            PAYREC: ""
                                        })

                                        const dataSave = {
                                            ...selectedExtendData,
                                            RealPay: realPay
                                        }
                                        setSelectedExtendData(dataSave)


                                    }} />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <h1 className="txt-center">งวดชำระเงิน และ งวดบัญชี</h1>
                                    <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">ลำดับ</TableCell>
                                                    <TableCell align="left">เลขที่สัญญา</TableCell>
                                                    <TableCell align="left">สถานะ</TableCell>
                                                    <TableCell align="left">รายการ</TableCell>
                                                    <TableCell align="left">วันที่</TableCell>
                                                    <TableCell align="left">จำนวนเงิน</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    selectedExtendData.AccountPay && selectedExtendData.AccountPay.map((row, i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="left">{i + 1}</TableCell>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" value={row.RENTNO} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" value={row.STAT} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" value={row.List} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <MuiDatePicker label="" value={(row.DUEDATE && row.DUEDATE != "") ? moment(row.DUEDATE, "YYYY-MM-DD").format("YYYY-MM-DD") : ''} />
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" value={row.PAYREC} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                   

                    <Container maxWidth="md">

                        <Grid container spacing={2} className="btn-row txt-center">

                            <Grid item xs={12} md={12}>
                                <div className="box-button txt-center">
                                    {/* <ButtonFluidPrimary label="บันทึกแก้ไข" maxWidth="320px" onClick={() => {
                                        // formikRef.current.handleSubmit()
                                    }} /> */}
                                </div>
                            </Grid>

                        </Grid>
                    </Container>

                </div>
            </Fade>

        </div>
    )
}

export default RecordInstallmentPayment
