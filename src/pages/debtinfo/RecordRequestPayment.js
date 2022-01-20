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
} from '../../components/MUIinputs';

import api from '../../services/webservice'
import { dateFormatTensiveMenu, formatNumber } from '../../utils/Utilities';
import { useFormikContext, Formik, Form, Field, } from 'formik';
import moment from 'moment';
import { getAccount } from '../../utils/Auth'
import { dialog, OverlayLoading } from '../../components';
import {
    MuiTextfieldNumber,
} from '../../components/MUIinputs';

function RecordRequestPayment() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const formikRef = useRef();
    const [resultList, setResultList] = useState([])
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(10)
    const [selectedData, setSelectedData] = useState({})
    const [selectedDataClick, setSelectedDataClick] = useState({})
    const [loanNumber, setLoanNumber] = useState("")
    const [selectedExtendData, setSelectedExtendData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
   

    useEffect(() => {
        setLoaded(true);
    }, [])



    function extendTimeGetDataLoan() {

        const parameter = {
            LoanNumber: loanNumber
        }
        setIsLoading(true)
        api.extendTimeGetDataLoan(parameter).then(response => {

            console.log("response", response.data)
            setResultList(response.data)
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })

    }

    function getProcessBeforePay(date) {

        const account = getAccount()

        const parameter = {
            LoanNumber: selectedDataClick.LoanNumber,//values.LoanNumber,
            Fullname: '',//values.Fullname,
            Rentno: selectedDataClick.LoanNumber,
            Date: date
        }
        setIsLoading(true)
        api.getProcessBeforePay(parameter).then(response => {


            const beforeProcess = response.data
            if (beforeProcess.length > 0) {

                const recData = beforeProcess[beforeProcess.length - 1]
                const beforRectData = beforeProcess.length >= 2 ? beforeProcess[beforeProcess.length - 2] : null

                formikRef.current.setFieldValue("PrincipleBalance1", recData.principalBalance)
                formikRef.current.setFieldValue("RecPrincipleBalance", recData.principalBalance)

                formikRef.current.setFieldValue("RemainingPrinciple", recData.principalBalance)

                console.log("selectedExtendData", selectedExtendData)
                if (selectedExtendData .Extend.length > 0) {
                    formikRef.current.setFieldValue("PrintciplePay", selectedExtendData.Extend[0].PrintciplePay)
                    formikRef.current.setFieldValue("InterestOverdue", selectedExtendData.Extend[0].InterestOverdue)
                    formikRef.current.setFieldValue("PaymentPeriodRemain", parseFloat(recData.principalBalance) - parseFloat(selectedExtendData.Extend[0].PrintciplePay))

                }
                
                
                formikRef.current.setFieldValue("RecDueInterest", beforRectData ? recData.InterestKang2 - beforRectData.InterestKang2 : recData.InterestKang2)
                formikRef.current.setFieldValue("RecSumInterest", recData.InterestKang2)
                formikRef.current.setFieldValue("RecOverdueInterest", recData.FineKang)
                formikRef.current.setFieldValue("RecSumPaid", recData.StuckMoney + recData.InterestKang2 + recData.FineKang)

                // formikRef.current.setFieldValue("ChangeInterest", selectedData.Interest)//เช็ค

            }

            setIsLoading(false)

        }).catch(error => {
            setIsLoading(false)
        })


    }

    function selectDataExtendNumber(extendNumber, loanNumber){

        const parameter = {
            ExtendNumber: extendNumber,//"163/00008"//extendNumber
            LoanNumber:loanNumber
        }
        setIsLoading(true)
        api.selectDataExtendNumber(parameter).then(response =>{

            setSelectedExtendData(response.data)

            if (response.data.Extend.length > 0){
                setSelectedDataClick(response.data.Extend[0])

            }
            
            setIsLoading(false)
            
            
            
        }).catch(error =>{
            setIsLoading(false)
        })

    }

    function onChangeRealPay(key,value,index){

        const realPay = selectedExtendData.RealPay
        if (realPay && realPay.length -1<= index) {
            realPay[index][key] = value
        }
        setSelectedData({
            ...selectedExtendData,
            RealPay: realPay
        })
    }

    function saveRecord(){
        
        const realPay = selectedExtendData.RealPay
        if(realPay){

            dialog.showLoading()

            const provinceid = localStorage.getItem('provinceid')

            const extend = selectedExtendData.Extend.length > 0 ? selectedExtendData.Extend[0] : { }
            const parameter  = {
                ExtendTime: [{ ...extend ,  ...formikRef.current.values}] ,
                LoanDus:realPay,
                Username: provinceid
            }

            api.extendTimeInsert(parameter).then(response => {

                dialog.close()
                setTimeout(() => {
                    dialog.showDialogSuccess({ message: "บันทึกข้อมูลสำเร็จ" })
                }, 500);

            }).catch(error => {
                dialog.close()
            })
        }else{
            dialog.showDialogFail({ message:"ไม่พบงวดชำระเงินตามจริง"})
        }
    }
 

    return (
        <div className="recordrequestpayment-page">

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
                                <h1>บันทึกคำขอขยาย</h1>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="ค้นหาเลขที่สัญญา" onChange={(e) => { setLoanNumber(e.target.value) }} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                    extendTimeGetDataLoan()
                                }} />
                            </Grid>
                            {/* <Grid item xs={12} md={7}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <ButtonNormalIconStartPrimary label="เพิ่มคำขอ" startIcon={<AddIcon />} />
                                </Box>  
                            </Grid> */}
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
                                                            selectDataExtendNumber(element.ExtendNumber, element.LoanNumber)
                                                        }}>
                                                            <StyledTableCellLine align="left">{element.RecNum}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.RecDate)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ExtendNumber}</StyledTableCellLine>
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

                    <Grid item xs={12} md={12}>
                        <div className="box-button txt-center">
                            <br />
                            <ButtonFluidPrimary label="เพิ่มคำขอ" maxWidth="320px" onClick={() => {
                                formikRef.current.setFieldValue('ExtendDate', "")
                                formikRef.current.setFieldValue('YEAR', "")
                                formikRef.current.setFieldValue('ExtendNumber', "")
                                formikRef.current.setFieldValue('Ref1', "")
                                formikRef.current.setFieldValue('Ref2', "")
                                formikRef.current.setFieldValue('Item', "")
                                formikRef.current.setFieldValue('Command', "")
                                formikRef.current.setFieldValue('CommandDate', "")

                            }} />
                        </div>
                    </Grid>
                    <Formik
                        enableReinitialize={true}
                        innerRef={formikRef}
                        initialValues={{
                            ...selectedDataClick,
                            ExtendDate: selectedDataClick.ExtendDate || '',
                            CommandDate: selectedDataClick.CommandDate || '',
                            PVCODE_LoanNumber: selectedDataClick.PVSCODE ? `${selectedDataClick.PVSCODE}${selectedDataClick.LoanNumber}` : '',
                            YEAR: (selectedDataClick.LoanDate && selectedDataClick.LoanDate != "") ? moment(selectedDataClick.LoanDate, "YYYY-MM-DD").add(543, 'years').format("YYYY") : ''
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
                                    {!isLoading && <div>
                                        <Container maxWidth="lg">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>

                                                    {/* Paper 1 - -------------------------------------------------- */}
                                                    <Paper className="paper line-top-green paper mg-t-20">
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
                                                                    name="ExtendDate"
                                                                    value={values.ExtendDate}
                                                                    error={errors.ExtendDate}
                                                                    helperText={errors.ExtendDate}
                                                                    onChange={(event) => {
                                                                        setFieldValue("ExtendDate", moment(event).format("YYYY-MM-DD"))
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
                                                                    name="PV_Name"
                                                                    value={values.PV_Name}
                                                                    error={errors.PV_Name}
                                                                    helperText={errors.PV_Name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="จังหวัด"
                                                                    label="จังหวัด" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield
                                                                    name="ExtendNumber"
                                                                    value={values.ExtendNumber}
                                                                    error={errors.ExtendNumber}
                                                                    helperText={errors.ExtendNumber}
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

                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield
                                                                    name="Command"
                                                                    value={values.Command}
                                                                    error={errors.Command}
                                                                    helperText={errors.Command}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="เลขที่คำสั่ง"
                                                                    label="เลขที่คำสั่ง"
                                                                    defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
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
                                                                    label="วันที่คำสั่ง"
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
                                                                                    placeholder="ชื่อโครงการชื่อโครงการ"
                                                                                    label="ชื่อโครงการชื่อโครงการ" defaultValue="" />
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
                                                                    label="เลขบัตรประชาชน" id="" defaultValue="" />
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
                                                                <MuiTextfield name="Name"
                                                                    value={values.Name}
                                                                    error={errors.Name}
                                                                    helperText={errors.Name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="ชื่อ" label="ชื่อ" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield name="SirName"
                                                                    value={values.SirName}
                                                                    error={errors.SirName}
                                                                    helperText={errors.SirName}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    placeholder="นามสกุล" label="นามสกุล" defaultValue="" />
                                                            </Grid>
                                                        </Grid>

                                                    </Paper>


                                                    {/* Paper 2 - -------------------------------------------------- */}
                                                    <Paper className="paper line-top-green paper mg-t-35">
                                                        <Grid container spacing={2} className="paper-container">
                                                            <Grid item xs={12} md={12} >
                                                                <Grid container spacing={2} >
                                                                    <Grid item xs={12} md={6}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={6}>
                                                                                    <MuiDatePicker
                                                                                        label="วันที่ประมวล"
                                                                                        name="ExtendDate"
                                                                                        value={values.ExtendDate}
                                                                                        error={errors.ExtendDate}
                                                                                        helperText={errors.ExtendDate}
                                                                                        onChange={(event) => {
                                                                                            setFieldValue("ExtendDate", moment(event).format("YYYY-MM-DD"))
                                                                                            getProcessBeforePay(moment(event).format("YYYY-MM-DD"))
                                                                                        }}
                                                                                        onChangeDate={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                    />
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <MuiTextfieldMultiLine
                                                                                        name="Commend"
                                                                                        value={values.Commend}
                                                                                        error={errors.Commend}
                                                                                        helperText={errors.Commend}
                                                                                        onChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        placeholder="หมายเหตุ"
                                                                                        label="หมายเหตุ"
                                                                                        row="3"
                                                                                        defaultValue="" />
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
                                                                                        // onChange={handleChange}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        label=""
                                                                                        defaultValue=""
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
                                                                                        endAdornment="บาท" />

                                                                                    {/* <NumberFormat
                                                                                        thousandsGroupStyle="thousand"
                                                                                        value={2456981}
                                                                                        prefix="$"
                                                                                        decimalSeparator="."
                                                                                        displayType="input"
                                                                                        type="text"
                                                                                        thousandSeparator={true}
                                                                                        allowNegative={true}
                                                                                        decimalScale={2}
                                                                                        fixedDecimalScale={true} /> */}
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
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
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
                                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="InterestOverdue"
                                                                                        value={values.InterestOverdue}
                                                                                        error={errors.InterestOverdue}
                                                                                        helperText={errors.InterestOverdue}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
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
                                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="InterestChange"
                                                                                        value={values.InterestChange}
                                                                                        error={errors.InterestChange}
                                                                                        helperText={errors.InterestChange}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
                                                                                        label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">%</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        {/* <Grid item xs={12} md={12}>
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
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
                                                                                    label="" defaultValue="" endAdornment="บาท" />
                                                                                </Grid>
                                                                                <Grid item >
                                                                                    <p className="paper-p txt-right">บาท</p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid> */}
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">จำนวนเงินขอขยายในงวดบัญชีนี้</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldNumber
                                                                                        name="ExtendCost"
                                                                                        value={values.ExtendCost}
                                                                                        error={errors.ExtendCost}
                                                                                        helperText={errors.ExtendCost}
                                                                                        onValueChange={handleChange}
                                                                                        onBlur={handleBlur}
                                                                                        textAlign='right'
                                                                                        decimalScale={2}
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

                                                    </Paper>
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
                                                                                            <Grid container>
                                                                                                <Grid item xs>
                                                                                                    <MuiTextfieldNumber label="" value={row.PAYREC} onValueChange={(e) => {
                                                                                                        onChangeRealPay("PAYREC", e.target.value, i)
                                                                                                    }} />
                                                                                                </Grid>

                                                                                                <Grid item>
                                                                                                    <IconButton onClick={() => {

                                                                                                        const realPay = selectedExtendData.RealPay
                                                                                                        if (realPay) {
                                                                                                            realPay.splice(i, 1)
                                                                                                        }

                                                                                                        setSelectedData({
                                                                                                            ...selectedExtendData,
                                                                                                            RealPay: realPay
                                                                                                        })

                                                                                                    }} > <CloseIcon className="table-item-del" /></IconButton>
                                                                                                </Grid>
                                                                                            </Grid>

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
                                                                                    <MuiTextfieldNumber label="" value={row.PAYREC} />
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
                                                        <ButtonFluidPrimary maxWidth="500px" label="บันทึก" onClick={() => {
                                                            saveRecord()
                                                        }} />
                                                    </div>
                                                </Grid>

                                            </Grid>
                                        </Container>

                                    </div>}
                                </Form>
                            )
                        }} />


                </div>
            </Fade>

        </div>
    )
}

export default RecordRequestPayment
