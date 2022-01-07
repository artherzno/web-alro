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
import Button from '@material-ui/core/Button';
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
import { OverlayLoading, dialog } from '../../components';


function DebtCondition() {
    const formikRef = useRef();
    const [loaded, setLoaded] = useState(false);
    const [loanNumber, setLoanNumber] = useState("")
    const [resultList, setResultList] = useState([])
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(10)
    const [selectedData, setSelectedData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [masterCondition, setMasterCondition] = useState([])

    useEffect(() => {
        setLoaded(true);
        getChagestructureDataByLoan()
        getMasterSPKCondition()

    }, [])

    function getChagestructureDataByLoan() {

        const parameter = {
            LoanNumber: loanNumber
        }
        setIsLoading(true)
        api.getChagestructureDataByLoan(parameter).then(response => {
            console.log("response", response.data)
            setIsLoading(false)
            setResultList(response.data)
        }).catch(() => {
            setIsLoading(false)
        })
    }

    function selectDataByLoanChangeStructure(loanNumber) {

        const parameter = {
            LoanNumber: loanNumber//'00105/2564'//loanNumber
        }
        setIsLoading(true)
        api.selectDataByLoanChangeStructure(parameter).then(response => {
            console.log("response", response.data)
            setIsLoading(false)
            if (response.data.length > 0){
                setSelectedData(response.data[0])
            }
            
        }).catch(() => {
            setIsLoading(false)
        })
    }

    function changeDeptStructuresSave(values) {

        dialog.showLoading()
        api.changeDeptStructuresSave(values).then(() => {

            dialog.close()
            setTimeout(() => {
                dialog.showDialogSuccess({ message: "บันทึกข้อมูลสำเร็จ" })
            }, 500);

        }).catch(() => {
            dialog.close()

        })
    }

    function getMasterSPKCondition() {

        api.getMasterSPKCondition().then(response => {

            setMasterCondition(response.data)
        }).catch(() => {

        })
    }

    function removeDeptStructures(chengeDeptID){

        dialog.showLoading()

        const parameter = {
            ChangeDeptID: chengeDeptID
        }

        api.chagestructureDelete(parameter).then(() => {

            dialog.close()
            setTimeout(() => {
                dialog.showDialogSuccess({
                    message: "ลบข้อมูลสำเร็จ", 
                    didClose: () => {
                        console.log("on close")
                        getChagestructureDataByLoan()
                    }})
            }, 500);

        }).catch(() => {
            dialog.close()

        })

    }

    return (
        <div className="debtcondition-page">

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
                                <h1>เงื่อนไขปรับโครงสร้างหนี้</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <Box display="flex" justifyContent="flex-start">
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" onChange={(e) => { setLoanNumber(e.target.value) }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                            getChagestructureDataByLoan()
                                        }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">รหัสบันทึก</TableCell>
                                                    <TableCell align="left">วันที่บันทึก</TableCell>
                                                    <TableCell align="left">เลขคำขอ</TableCell>
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
                                                    <TableCell align="left">ที่อยู่</TableCell>
                                                    <TableCell align="left" className="sticky"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                                {resultList.length <= 0 && <TableRow>
                                                    <TableCell colSpan={15} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>}
                                                {resultList.slice(page * count, page * count + count).map((element, index) => {

                                                    return (
                                                        <TableRow key={index} hover={true} onClick={() => {
                                                            // setSelectedData(element)
                                                            selectDataByLoanChangeStructure(element.LoanNumber)
                                                        }}>
                                                            <StyledTableCellLine align="left">{element.RecNum}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.RecDate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ChangeDeptNumber}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.Ref1}</StyledTableCellLine>
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
                                                            <StyledTableCellLine align="left">{element.Address}</StyledTableCellLine>
                                                            <StyledTableCellLine align="center" className="sticky">
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    size="small"
                                                                    onClick={() => {
                                                                        dialog.showDialogConfirm({message:'ยืนยันการลบข้อมูล',onConfirm:() =>{

                                                                            removeDeptStructures(element.ChangeDeptID)

                                                                        },})
                                                                    }}
                                                                >
                                                                    ลบ
                                                                </Button>
                                                            </StyledTableCellLine>

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
                            
                            ReducePrinciple: selectedData.principle,
                            ...selectedData,
                            ChangeDeptCost: 0,
                            ReduceFines:0,
                            InterestReduce:0,
                            PVCODE_LoanNumber: selectedData.PVSCODE ? `${selectedData.PVSCODE}${selectedData.LoanNumber}` : '',
                            YEAR: (selectedData.LoanDate && selectedData.LoanDate != "") ? moment(selectedData.LoanDate, "YYYY-MM-DD").add(543, 'years').format("YYYY") : ''
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
                        onSubmit={(values) => {
                            changeDeptStructuresSave(values)
                        }}
                        render={(formik) => {

                            const { errors, values, setFieldValue, handleChange, handleBlur, handleSubmit } = formik

                            return (
                                <Form>
                                    {!isLoading && <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>

                                                {/* Paper 1 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <form className="root" noValidate autoComplete="off">
                                                        <Grid container spacing={2}>
                                                            {/* <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="RecNum"
                                                                    value={values.RecNum}
                                                                    error={errors.RecNum}
                                                                    helperText={errors.RecNum}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="เลขที่บันทึก"
                                                                    label="เลขที่บันทึก"
                                                                    disabled />
                                                            </Grid> */}
                                                            <Grid item xs={12} md={3}>
                                                                <MuiDatePicker
                                                                    name="ChangeDeptDate"
                                                                    value={values.ChangeDeptDate}
                                                                    error={errors.ChangeDeptDate}
                                                                    helperText={errors.ChangeDeptDate}
                                                                    onChange={(event) => {
                                                                        setFieldValue("ChangeDeptDate", moment(event).format("YYYY-MM-DD"))
                                                                    }}
                                                                    onChangeDate={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="วันที่บันทึก"
                                                                    label="วันที่บันทึก"
                                                                    defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={1}>
                                                                <MuiTextfield
                                                                    name="YEAR"
                                                                    value={values.YEAR}
                                                                    error={errors.YEAR}
                                                                    helperText={errors.YEAR}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="ปี"
                                                                    label="&nbsp;" />
                                                            </Grid>

                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="PVSCODE"
                                                                    value={values.PVSCODE}
                                                                    error={errors.PVSCODE}
                                                                    helperText={errors.PVSCODE}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield
                                                                    name="PV_NAME"
                                                                    value={values.PV_NAME}
                                                                    error={errors.PV_NAME}
                                                                    helperText={errors.PV_NAME}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="จังหวัด"
                                                                    label="จังหวัด" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="ChangeDeptNumber"
                                                                    value={values.ChangeDeptNumber}
                                                                    error={errors.ChangeDeptNumber}
                                                                    helperText={errors.ChangeDeptNumber}
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
                                                                    label="อ้างถึง"
                                                                    defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="Ref2"
                                                                    value={values.Ref2}
                                                                    error={errors.Ref2}
                                                                    helperText={errors.Ref2}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="อ้างถึง"
                                                                    label="อ้างถึง"
                                                                    defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={1}>
                                                                <MuiTextfield
                                                                    name="Item"
                                                                    value={values.Item}
                                                                    error={errors.Item}
                                                                    helperText={errors.Item}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    label="&nbsp;"
                                                                    defaultValue="" />
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
                                                                    label="สัญญาเลขที่"
                                                                    defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="PVCODE_LoanNumber"
                                                                    value={values.PVCODE_LoanNumber}
                                                                    error={errors.PVCODE_LoanNumber}
                                                                    helperText={errors.PVCODE_LoanNumber}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    label="&nbsp;" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiDatePicker
                                                                    name="LoanDate"
                                                                    value={values.LoanDate}
                                                                    error={errors.LoanDate}
                                                                    helperText={errors.LoanDate}
                                                                    onChange={(event) => {
                                                                        setFieldValue("LoanDate", moment(event).format("YYYY-MM-DD"))
                                                                    }}
                                                                    onChangeDate={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="วันที่สัญญา"
                                                                    label="วันที่สัญญา" />
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
                                                                <MuiDatePicker
                                                                    name="LoanReceiptDate"
                                                                    value={values.LoanReceiptDate}
                                                                    error={errors.LoanReceiptDate}
                                                                    helperText={errors.LoanReceiptDate}
                                                                    onChange={(event) => {
                                                                        setFieldValue("LoanReceiptDate", moment(event).format("YYYY-MM-DD"))
                                                                    }}
                                                                    onChangeDate={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="วันที่รับเงินกู้"
                                                                    label="วันที่รับเงินกู้" />
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
                                                                    label="อัตราดอกเบี้ย" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="ChargeRate"
                                                                    value={values.ChargeRate}
                                                                    error={errors.ChargeRate}
                                                                    helperText={errors.ChargeRate}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="อัตราค่าปรับ"
                                                                    label="อัตราค่าปรับ" defaultValue="" />
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
                                                                                    placeholder="รหัสโครงการรอง"
                                                                                    label="รหัสโครงการรอง" defaultValue="" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield
                                                                                    name="ProjectName"
                                                                                    value={values.ProjectName}
                                                                                    error={errors.ProjectName}
                                                                                    helperText={errors.ProjectName}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    placeholder="ชื่อโครงการรอง"
                                                                                    label="ชื่อโครงการรอง" defaultValue="" />
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
                                                            <Grid item xs={12} md={1}>
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
                                                            <Grid item xs={12} md={2}>
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
                                                            <Grid item xs={12} md={3}>
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
                                                        </Grid>
                                                    </form>
                                                </Paper>


                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <form className="root" noValidate autoComplete="off">
                                                        <Grid container spacing={2} className="paper-container">
                                                            <Grid item xs={12} md={12} >
                                                                <Grid container spacing={2} >
                                                                    <Grid item xs={12} md={6}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <MuiTextfieldMultiLine
                                                                                        name="Commend"
                                                                                        value={values.Commend}
                                                                                        error={errors.Commend}
                                                                                        helperText={errors.Commend}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="หมายเหตุ"
                                                                                        label="หมายเหตุ" row="3" defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiTextfield
                                                                                        name="CommandNum"
                                                                                        value={values.CommandNum}
                                                                                        error={errors.CommandNum}
                                                                                        helperText={errors.CommandNum}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="เลขที่คำสั่ง"
                                                                                        label="เลขที่คำสั่ง" />
                                                                                </Grid>
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
                                                                                        label="วันที่คำสั่ง" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiDatePicker
                                                                                        name="StartCommandDate"
                                                                                        value={values.StartCommandDate}
                                                                                        error={errors.StartCommandDate}
                                                                                        helperText={errors.StartCommandDate}
                                                                                        onChange={(event) => {
                                                                                            setFieldValue("StartCommandDate", moment(event).format("YYYY-MM-DD"))
                                                                                        }}
                                                                                        onChangeDate={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="วันที่เริ่มคำสั่ง"
                                                                                        label="วันที่เริ่มคำสั่ง" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiDatePicker
                                                                                        name="EndCommandDate"
                                                                                        value={values.EndCommandDate}
                                                                                        error={errors.EndCommandDate}
                                                                                        helperText={errors.EndCommandDate}
                                                                                        onChange={(event) => {
                                                                                            setFieldValue("EndCommandDate", moment(event).format("YYYY-MM-DD"))
                                                                                        }}
                                                                                        onChangeDate={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="วันที่สิ้นสุด"
                                                                                        label="วันที่สิ้นสุด" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiSelect
                                                                                        name="ConditionCode"
                                                                                        label="ประเภท"
                                                                                        listsValue={masterCondition.map(master => master.ConditionCode)}
                                                                                        lists={masterCondition.map(master => master.ConditionName)}
                                                                                        onChange={(e) => {

                                                                                            const master = masterCondition.find(element => element.ConditionCode === e.target.value)
                                                                                            if (master) {
                                                                                                setFieldValue('ConditionCode', master.ConditionCode)
                                                                                                setFieldValue('ConditionID', master.ConditionID)
                                                                                                setFieldValue('ConditionName', master.ConditionName)
                                                                                                setFieldValue('ConditionDetail', master.ConditionDetail)
                                                                                                setFieldValue('Tps', master.Tps)
                                                                                                setFieldValue('Tps_', master.Tps_)
                                                                                            }

                                                                                        }} />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiTextfield
                                                                                        name="ConditionName"
                                                                                        value={values.ConditionName}
                                                                                        error={errors.ConditionName}
                                                                                        helperText={errors.ConditionName}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        label="&nbsp;"
                                                                                        defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiTextfield
                                                                                        name="ConditionDetail"
                                                                                        value={values.ConditionDetail}
                                                                                        error={errors.ConditionDetail}
                                                                                        helperText={errors.ConditionDetail}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        label="&nbsp;"
                                                                                        defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiTextfield
                                                                                        name="Item"
                                                                                        value={values.Item}
                                                                                        error={errors.Item}
                                                                                        helperText={errors.Item}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="ลำดับที่"
                                                                                        label="ลำดับที่" defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiTextfield
                                                                                        name="Order"
                                                                                        value={values.Order}
                                                                                        error={errors.Order}
                                                                                        helperText={errors.Order}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="ครั้งที่"
                                                                                        label="ครั้งที่" defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiTextfield
                                                                                        name="Tps"
                                                                                        value={values.Tps}
                                                                                        error={errors.Tps}
                                                                                        helperText={errors.Tps}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="Tps"
                                                                                        label="Tps" defaultValue="" />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={3}>
                                                                                    <MuiTextfield
                                                                                        name="Tps_"
                                                                                        value={values.Tps_}
                                                                                        error={errors.Tps_}
                                                                                        helperText={errors.Tps_}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="Tps_"
                                                                                        label="Tps_" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                    <Grid item xs={12} md={6}>
                                                                        {/* <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินลดต้น</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldEndAdornment
                                                                                        name="ReducePrinciple"
                                                                                        value={values.ReducePrinciple}
                                                                                        error={errors.ReducePrinciple}
                                                                                        helperText={errors.ReducePrinciple}
                                                                                        onChange={(e) =>{

                                                                                            handleChange(e)
                                                                                            const changeDeptCost = parseFloat(e.target.value) + parseFloat(values.InterestReduce) + parseFloat(values.ReduceFines)
                                                                                            setFieldValue("ChangeDeptCost",changeDeptCost)
                                                                                        }}
                                                                                        onBlur={handleBlur}
                                                                                        defaultValue=""endAdornment="บาท" />
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid> */}
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                {/* <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินลดต้น</p>
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
                                                                                    <p className="paper-p txt-right">%</p>
                                                                                </Grid> */}

                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินลดต้น</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ReducePrinciple"
                                                                                        value={values.ReducePrinciple}
                                                                                        error={errors.ReducePrinciple}
                                                                                        helperText={errors.ReducePrinciple}
                                                                                        onValueChange={(e) => {

                                                                                            handleChange(e)
                                                                                            const changeDeptCost = parseFloat(e.target.value) + parseFloat(values.InterestReduce) + parseFloat(values.ReduceFines)
                                                                                            if (changeDeptCost) {
                                                                                                setFieldValue("ChangeDeptCost", changeDeptCost)
                                                                                            }


                                                                                        }}
                                                                                        onBlur={handleBlur}
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
                                                                                    <p className="paper-p txt-right">จำนวนเงินลดดอก</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="InterestReduce"
                                                                                        value={values.InterestReduce}
                                                                                        error={errors.InterestReduce}
                                                                                        helperText={errors.InterestReduce}
                                                                                        onChange={(e) => {

                                                                                            handleChange(e)
                                                                                            const changeDeptCost = parseFloat(values.ReducePrinciple) + parseFloat(e.target.value) + parseFloat(values.ReduceFines)
                                                                                            if (changeDeptCost) {
                                                                                                setFieldValue("ChangeDeptCost", changeDeptCost)
                                                                                            }


                                                                                        }}
                                                                                        onBlur={handleBlur}
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
                                                                                    <p className="paper-p txt-right">จำนวนเงินลดค่าปรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ReduceFines"
                                                                                        value={values.ReduceFines}
                                                                                        error={errors.ReduceFines}
                                                                                        helperText={errors.ReduceFines}
                                                                                        onChange={(e) => {

                                                                                            handleChange(e)
                                                                                            const changeDeptCost = parseFloat(values.ReducePrinciple) + parseFloat(values.InterestReduce) + parseFloat(e.target.value)
                                                                                            setFieldValue("ChangeDeptCost", changeDeptCost)

                                                                                        }}
                                                                                        onBlur={handleBlur}
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
                                                                                    <p className="paper-p txt-right">จำนวนเงินปรับโครงสร้าง</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ChangeDeptCost"
                                                                                        value={values.ChangeDeptCost}
                                                                                        error={errors.ChangeDeptCost}
                                                                                        helperText={errors.ChangeDeptCost}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
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
                                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ยที่เปลี่ยน</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ChangeInterest"
                                                                                        value={values.ChangeInterest}
                                                                                        error={errors.ChangeInterest}
                                                                                        helperText={errors.ChangeInterest}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        label="" defaultValue="" />
                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </form>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Container>}

                                    <Container maxWidth="md">
                                        <Grid container spacing={2} className="btn-row txt-center">
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="บันทึก" maxWidth="320px" onClick={handleSubmit} />
                                            </Grid>
                                        </Grid>
                                    </Container>

                                </Form>
                            )
                        }} />



                </div>
            </Fade>

        </div>
    )
}

export default DebtCondition
