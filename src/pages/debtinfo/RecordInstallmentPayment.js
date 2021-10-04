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
} from '../../components/MUIinputs';
import api from '../../services/webservice'
import { dateFormatTensiveMenu, formatNumber } from '../../utils/Utilities';

import { useFormikContext, Formik, Form, Field, } from 'formik';
import moment from 'moment';

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

    useEffect(() => {
        setLoaded(true);

        getDataByLoan()

    }, [])

    async function getDataByLoan() {

        const parameter = {
            LoanNumber: paramsSignNo
        }

        const parameter1 = {
            RelentNumber: paramsRequestNo
        }

        try {

            const res = await Promise.all([api.getDataByLoan(parameter), api.getDataByRelentNumber(parameter1)])
            const resultList = res[0].data.concat(res[1].data)
            setResultList(resultList)

        } catch (error) {

            console.log("error", error)
        }



    }

    function selectDataByLoan(LoanNumber) {

        const parameter = {
            LoanNumber: '00639/2556'
        }
        api.selectDataByLoan(parameter).then(response => {

            if (response.data.length > 0) {
                setSelectedData(response.data[0])
            }
        })
    }

    function saveRelent(values) {

   
        console.log("values", values)
        api.saveRelent(values).then(response => {

        
        })
    }



    return (
        <div className="recordinstallmentpayment-page">
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
                                                            <StyledTableCellLine align="left">{element.LoanNumber}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Ref1}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Ref2}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Order}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Projectcode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ProjectName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.RelentNumber}</StyledTableCellLine>
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
                                        RelentDateBefore: selectedData.RelentDate
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
                                                                name="PVSCODE"
                                                                value={values.PVSCODE}
                                                                error={errors.PVSCODE}
                                                                helperText={errors.PVSCODE}
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
                                                                name="Ref1"
                                                                value={values.Ref1}
                                                                error={errors.Ref1}
                                                                helperText={errors.Ref1}
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
                                                                // name="Ref2"
                                                                // value={values.Ref2}
                                                                // error={errors.Ref2}
                                                                // helperText={errors.Ref2}
                                                                // onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                // placeholder="อ้างถึง"
                                                                value="ไม่รู้จัก Field"
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
                                                                // name="LoanNumber"
                                                                // value={values.LoanNumber}
                                                                // error={errors.LoanNumber}
                                                                // helperText={errors.LoanNumber}
                                                                // onChange={handleChange}
                                                                // onBlur={handleBlur}
                                                                // placeholder="สัญญาเลขที่"
                                                                value="ไม่รู้จัก Field"
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
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="RemainingPrinciple"
                                                                                        value={values.RemainingPrinciple}
                                                                                        error={errors.RemainingPrinciple}
                                                                                        helperText={errors.RemainingPrinciple}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="เงินต้นคงเหลือ"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="PrintciplePay"
                                                                                        value={values.PrintciplePay}
                                                                                        error={errors.PrintciplePay}
                                                                                        helperText={errors.PrintciplePay}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="เงินต้นครบกำหนดชำระ"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="InterestOverdue"
                                                                                        value={values.InterestOverdue}
                                                                                        error={errors.InterestOverdue}
                                                                                        helperText={errors.InterestOverdue}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="ดอกเบี้ยค้างรับ"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="ChangeInterest"
                                                                                        value={values.ChangeInterest}
                                                                                        error={errors.ChangeInterest}
                                                                                        helperText={errors.ChangeInterest}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="อัตราดอกเบี้ย"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">งวดชำระคงเหลือ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="PaymentPeriodRemain"
                                                                                        value={values.PaymentPeriodRemain}
                                                                                        error={errors.PaymentPeriodRemain}
                                                                                        helperText={errors.PaymentPeriodRemain}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="งวดชำระคงเหลือ"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินขอผ่อนผันในงวดบัญชีนี้</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="RelentCost"
                                                                                        value={values.RelentCost}
                                                                                        error={errors.RelentCost}
                                                                                        helperText={errors.RelentCost}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="จำนวนเงินขอผ่อนผันในงวดบัญชีนี้"
                                                                                        label="" defaultValue="" endAdornment="บาท" />
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


                </div>
            </Fade>

        </div>
    )
}

export default RecordInstallmentPayment
