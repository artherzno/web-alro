import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';

import { useFormikContext, Formik, Form, Field, } from 'formik';
import { MTextField, D } from '../../components/MaterialUI'
import moment from 'moment';
import { getAccount } from '../../utils/Auth'
import api from '../../services/webservice'
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import { ButtonExport, dialog, OverlayLoading } from '../../components';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { formatNumber} from '../../utils/Utilities'

function RecordBillAlro() {
    const history = useHistory();

    const formikRef = useRef();
    const [loaded, setLoaded] = useState(false);
    const [selectedData, setSelectedData] = useState({})
    const [resultList, setResultList] = useState([])
    const [dataBeforeProcess, setDataBeforeProcess] = useState([])
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typeBill: '1',
    })
    const[isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false)
    const [checkClose, setCheckClose] = useState(false)
    const [isShowClose, setIsShowClose] = useState(false)

    useEffect(() => {
        setLoaded(true);
    }, [])


    function saveData(values) {

        try {
            
            const account = getAccount()

            const parameter = {
                SPKReceipt: {
                    ...values,
                    OverdueInterest: `${values.OverdueInterest}`.replace(",", ''),
                    DueInterest: `${values.DueInterest}`.replace(",", ''),
                    PrinciplePaid: `${values.PrinciplePaid}`.replace(",", ''),
                    InterestPaid: `${values.InterestPaid}`.replace(",", ''),
                    Fines: `${values.Fines}`.replace(",", ''),
                    PrincipleBalance1: `${values.PrincipleBalance1}`.replace(",", ''),
                    RecPrincipleBalance: `${values.RecPrincipleBalance}`.replace(",", ''),
                    RecPrinciple: `${values.RecPrinciple}`.replace(",", ''),
                    RecInterestKang2: `${values.RecInterestKang2}`.replace(",", ''),
                    RecDueInterest: `${values.RecDueInterest}`.replace(",", ''),
                    RecSumInterest: `${values.RecSumInterest}`.replace(",", ''),
                    RecOverdueInterest: `${values.RecOverdueInterest}`.replace(",", ''),
                    RecSumPaid: `${values.RecSumPaid}`.replace(",", ''),
                },
                CloseContact: values.Status,
                dCreated: null,
                dUpdated: null,
                admin_nMEMID: null
            }

            dialog.showLoading()
            console.log("parameter", parameter)
            api.saveReceipt(parameter).then(response => {

                dialog.close()
                setTimeout(() => {
                    dialog.showDialogSuccess({ message: "บันทึกข้อมูลสำเร็จ" })
                }, 500);

            }).catch(error => {
                dialog.close()
            })

        } catch (error) {
            console.log("error", error)
        }


    }

    function getReceiptData(values) {

        const account = getAccount()
        // const parameter = new FormData()
        // parameter.append('LoanNumber', values.LoanNumber);
        // parameter.append('Fullname', values.Fullname);
        // parameter.append('Username', account.username);
        // parameter.append('Rentno', "");
        // parameter.append('Date', "");
        setIsLoading(true)
        const parameter = {
            LoanNumber: values.LoanNumber,
            Fullname: values.Fullname,
            Username: account.cUsername,
        }

        api.getReceiptlectData(parameter).then(response => {

            setResultList(response.data)
            setIsLoading(false)
            console.log("response", response.data)
        }).catch(error => {
            setIsLoading(false)
        })


    }

    function getReceiptSelectData(loanNumber) {

        const account = getAccount()
        // const parameter = new FormData()
        // parameter.append('LoanNumber', values.LoanNumber);
        // parameter.append('Fullname', values.Fullname);
        // parameter.append('Username', account.username);
        // parameter.append('Rentno', "");
        // parameter.append('Date', "");
        setIsLoading(true)
        const parameter = {
            LoanNumber: loanNumber,
            Username: account.cUsername,
        }

        api.getReceiptSelectData(parameter).then(response => {

            if (response.data.length > 0){
                setSelectedData(response.data[0])
            }
           
            setIsLoading(false)
            console.log("response", response.data)
        }).catch(error => {
            setIsLoading(false)
        })


    }

    function getProcessBeforePay(values) {

        const account = getAccount()

        const parameter = {
            LoanNumber: selectedData.LoanNumber,//values.LoanNumber,
            Fullname: '',//values.Fullname,
            Username: account.cUsername,
            Rentno: selectedData.LoanNumber,
            Date: values.CalculateDate
        }
        setIsLoading(true)
        api.getProcessBeforePay(parameter).then(response => {

            setDataBeforeProcess(response.data)

            const beforeProcess = response.data
            if (beforeProcess.length > 0){

                const recData = beforeProcess[beforeProcess.length-1]
                const beforRectData = beforeProcess.length >= 2 ? beforeProcess[beforeProcess.length - 2] : null

                formikRef.current.setFieldValue("PrincipleBalance1", formatNumber(recData.principalBalance,2))
                formikRef.current.setFieldValue("RecPrincipleBalance", formatNumber(recData.principalBalance,2))
                formikRef.current.setFieldValue("RecPrinciple", formatNumber(recData.principle1,2))
                formikRef.current.setFieldValue("RecInterestKang2", beforRectData ? formatNumber(beforRectData.InterestKang2,2) : 0)
                formikRef.current.setFieldValue("RecDueInterest", beforRectData ? formatNumber(recData.InterestKang2 - beforRectData.InterestKang2 ,2): recData.InterestKang2)
                formikRef.current.setFieldValue("RecSumInterest", formatNumber(recData.InterestKang2,2))
                formikRef.current.setFieldValue("RecOverdueInterest", formatNumber(recData.FineKang,2))
                formikRef.current.setFieldValue("RecSumPaid", formatNumber(recData.StuckMoney + recData.InterestKang2 + recData.FineKang,2))
                
            }

            setIsLoading(false)

        }).catch(error => {
            setIsLoading(false)
        })


    }

    function calculatePaid(totalPaid){

        
        

        if(dataBeforeProcess.length > 0){

            const beforeProcess = dataBeforeProcess[dataBeforeProcess.length - 1]
            console.log("beforeProcess", beforeProcess)
            const beforRectData = dataBeforeProcess.length >= 2 ? dataBeforeProcess[dataBeforeProcess.length - 2] : null

            console.log("beforRectData", beforRectData)
            
            const kange = beforRectData ? beforRectData.InterestKang2 : 0
            // const overdue = parseFloat(totalPaid) >= kange ? kange : totalPaid
            const overdue = beforRectData ? beforRectData.InterestKang2 : 0
            console.log("overdue", overdue)

            const recDueInterest = beforRectData ? beforeProcess.InterestKang2 - beforRectData.InterestKang2 : beforeProcess.InterestKang2
            
            const x = parseFloat(totalPaid)
            const i1 = recDueInterest
            const i2 = overdue

            const interestBalance = (x - (i1 + i2)) >= 0 ? 0 :
                (x - i1 >= 0 && x - (i1 + i2) < 0) ? i2 - (x - i1) :
                    x - i1 < 0 ? i2 :
                        0 

            const overdueInterest = x >= i2 ? i2 : x//parseFloat(totalPaid) >= kange ? kange : parseFloat(totalPaid)
            // formikRef.current.setFieldValue("OverdueInterest", overdueInterest > 0 ? formatNumber(overdueInterest,2) : 0)

            const dueInterest = parseFloat(totalPaid) - overdueInterest >= i1 ? i1 : ((parseFloat(totalPaid) - overdueInterest != 0 && parseFloat(totalPaid) - overdueInterest) < i1) ? parseFloat(totalPaid) - overdueInterest : 0
            
            // const dueInterestCal = dueInterest >= recDueInterest ? recDueInterest : ((dueInterest != 0 && dueInterest < recDueInterest) ? dueInterest : 0)
            // const dueInterestValue = dueInterestCal > 0 ? dueInterestCal : 0

            formikRef.current.setFieldValue("DueInterest", dueInterest )


           

            const interest = overdueInterest + dueInterest
            
            const PrinciplePaid = parseFloat(totalPaid) - (i1 + i2) <= 0 ? 0 : parseFloat(totalPaid) - (i1 + i2) //parseFloat(totalPaid) - interest
            formikRef.current.setFieldValue("PrinciplePaid", PrinciplePaid > 0 ? formatNumber(PrinciplePaid, 2) : 0)

            formikRef.current.setFieldValue("InterestPaid", interest)

            formikRef.current.setFieldValue("Fines", overdue > 0 ? (overdue > beforeProcess.FineKang ? beforeProcess.FineKang : formatNumber(overdue, 2))  : 0)
            formikRef.current.setFieldValue("Other", beforeProcess.Other)
            
           

            formikRef.current.setFieldValue("OverdueInterest", overdueInterest)
            // formikRef.current.setFieldValue("InterestBalance", interest - parseFloat(totalPaid) <= 0 ? 0 : interest - parseFloat(totalPaid))
            formikRef.current.setFieldValue("InterestBalance", formatNumber(interestBalance, 2) )

            const principalBalance = parseFloat(beforeProcess.principalBalance) - parseFloat(PrinciplePaid) <= 0 ? 0 : parseFloat(beforeProcess.principalBalance) - parseFloat(PrinciplePaid)

            formikRef.current.setFieldValue("PrincipleBalance2", formatNumber(principalBalance, 2) )
        }else{
            formikRef.current.setFieldValue("InterestPaid", 0)
        }

       
        

    }

    function getCardPdf() {



        const parameter = new FormData()
        parameter.append('ContractNo', selectedData.LoanNumber);


        setIsExporting(true)

        api.getCardPdf(parameter).then(response => {

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
    
    return (
        <div className="recordbillalro-page">
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
                                <h1>บันทึกใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด</h1>
                            </Grid>
                        </Grid>
                    </Container>


                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>

                                <Formik
                                    enableReinitialize={true}
                                    innerRef={formikRef}
                                    initialValues={{
                                        ReceiptID: "",
                                        LoanID: selectedData.LoanID,
                                        LoanNumber: selectedData.LoanNumber,
                                        ReceiptNumber: "",
                                        ref_id1: "",
                                        Reccode: "",
                                        Mindex: selectedData.Mindex,
                                        Time: "",
                                        RecDate: "",
                                        ReceiptDate: "",
                                        CalculateDate: "",
                                        PaidDate: "",
                                        PrincipleBalance1: "",
                                        PrincipleCalculate: "",
                                        PaidCalculate: "",
                                        PrinciplePaid: "",
                                        InterestPaid: "",
                                        OverdueInterest: "",
                                        DueInterest: "",
                                        Fines: "",
                                        Other: "",
                                        PrincipleBalance2: "",
                                        InterestBalance: "",
                                        ReceiveInterest: "",
                                        Type: "",
                                        ReceiptTypeID: "",
                                        PrincipleBalance3: "",
                                        PrincipleDuePaid: "",
                                        FinesInterest: "",
                                        FinesInterestDuePaid: "",
                                        TotalInterest: "",
                                        FinesOverdue: "",
                                        TotalPaid: "",
                                        PrincipleBalance4: "",
                                        Cancel: "",
                                        ProvinceID: selectedData.ProvinceID,
                                        dCreated: "",
                                        dUpdated: "",
                                        admin_nMEMID: "",
                                        Principle: "",
                                        PVSCODE: selectedData.PVSCODE,
                                        Projectcode: selectedData.Projectcode,
                                        ProjectName: selectedData.ProjectName,
                                        ProjectPlanYear: selectedData.ProjectPlanYear,
                                        LandNumber: selectedData.LandNumber,
                                        LoanDate: selectedData.LoanDate,
                                        LoanTypeCode: selectedData.LoanTypeCode,
                                        LoanTypeName: selectedData.LoanTypeName,
                                        ProjectMainCode: selectedData.ProjectMainCode,
                                        ProjectMainName: selectedData.ProjectMainName,
                                        LoanPeriodCode: selectedData.LoanPeriodCode,
                                        LoanPeriodName: selectedData.LoanPeriodName,
                                        IDCard: selectedData.IDCard,
                                        FrontName: selectedData.FrontName,
                                        Name: selectedData.Name,
                                        Sirname: selectedData.Sirname,
                                        Land_AddMoo: selectedData.Land_AddMoo,
                                        Land_AddrDistrict: selectedData.Land_AddrDistrict,
                                        Land_AddrSubdistrict: selectedData.Land_AddrSubdistrict,
                                        DocLand_code: selectedData.DocLand_code,
                                        LandNumber: selectedData.LandNumber,
                                        LoanReceiptDate: selectedData.LoanReceiptDate,
                                        principle: selectedData.principle,
                                        Interest: selectedData.Interest,
                                        ChargeRate: selectedData.ChargeRate,
                                        RecPrincipleBalance: '',
                                        RecPrinciple: '',
                                        RecInterestKang2: '',
                                        RecDueInterest: '',
                                        RecSumInterest: '',
                                        RecOverdueInterest: '',
                                        RecSumPaid: '',
                                        Status:1
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

                                        console.log("values", values)
                                        saveData(values)

                                    }}
                                    render={(formik) => {

                                        const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik
                                        

                                        return (
                                            <Form>
                                            
                                                {/* Paper 1 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6}>
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
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiDatePicker
                                                                name="RecDate"
                                                                value={values.RecDate}
                                                                error={errors.RecDate}
                                                                helperText={errors.RecDate}
                                                                onChange={(event) => {
                                                                    setFieldValue("RecDate", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่บันทึก"
                                                                label="วันที่บันทึก"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="ProvinceID"
                                                                value={values.ProvinceID}
                                                                error={errors.ProvinceID}
                                                                helperText={errors.ProvinceID}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label=""
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="PVSCODE"
                                                                value={values.PVSCODE}
                                                                error={errors.PVSCODE}
                                                                helperText={errors.PVSCODE}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield
                                                                name="Mindex"
                                                                value={values.Mindex}
                                                                error={errors.Mindex}
                                                                helperText={errors.Mindex}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield
                                                                name="ref_id1"
                                                                value={values.ref_id1}
                                                                error={errors.ref_id1}
                                                                helperText={errors.ref_id1}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ใบแจ้งหนี้"
                                                                label="ใบแจ้งหนี้"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="Projectcode"
                                                                value={values.Projectcode}
                                                                error={errors.Projectcode}
                                                                helperText={errors.Projectcode}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield
                                                                name="ProjectName"
                                                                value={values.ProjectName}
                                                                error={errors.ProjectName}
                                                                helperText={errors.ProjectName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;"
                                                            />
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
                                                                label="ใช้เงินตามแผนปี"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield
                                                                name="LoanNumber"
                                                                value={values.LoanNumber}
                                                                error={errors.LoanNumber}
                                                                helperText={errors.LoanNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="สัญญาเลขที่"
                                                                label="สัญญาเลขที่"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
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
                                                                placeholder="สัญญาเลขที่"
                                                                label="วันที่สัญญา"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="LoanTypeCode"
                                                                value={values.LoanTypeCode}
                                                                error={errors.LoanTypeCode}
                                                                helperText={errors.LoanTypeCode}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ประเภทกู้ยืม"
                                                                label="ประเภทกู้ยืม"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield
                                                                name="LoanTypeName"
                                                                value={values.LoanTypeName}
                                                                error={errors.LoanTypeName}
                                                                helperText={errors.LoanTypeName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="ProjectMainCode"
                                                                value={values.ProjectMainCode}
                                                                error={errors.ProjectMainCode}
                                                                helperText={errors.ProjectMainCode}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="หมวดโครงการ"
                                                                label="หมวดโครงการ"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield
                                                                name="ProjectMainName"
                                                                value={values.ProjectMainName}
                                                                error={errors.ProjectMainName}
                                                                helperText={errors.ProjectMainName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="LoanPeriodCode"
                                                                value={values.LoanPeriodCode}
                                                                error={errors.LoanPeriodCode}
                                                                helperText={errors.LoanPeriodCode}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ประเภทเงินกู้"
                                                                label="ประเภทเงินกู้" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield
                                                                name="LoanPeriodName"
                                                                value={values.LoanPeriodName}
                                                                error={errors.LoanPeriodName}
                                                                helperText={errors.LoanPeriodName}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder=""
                                                                label="&nbsp;" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield
                                                                name="IDCard"
                                                                value={values.IDCard}
                                                                error={errors.IDCard}
                                                                helperText={errors.IDCard}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขบัตรประจำตัวประชาชน"
                                                                label="เลขบัตรประจำตัวประชาชน" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            {/* Field Select ---------------------------------------------------*/}
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
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="Name"
                                                                value={values.Name}
                                                                error={errors.Name}
                                                                helperText={errors.Name}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ชื่อ"
                                                                label="ชื่อ" />
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
                                                                label="นามสกุล" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            {/* Field Select ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="Land_AddMoo"
                                                                value={values.Land_AddMoo}
                                                                error={errors.Land_AddMoo}
                                                                helperText={errors.Land_AddMoo}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ที่ตั้งที่ดิน หมู่"
                                                                label="ที่ตั้งที่ดิน หมู่" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="Land_AddrSubdistrict"
                                                                value={values.Land_AddrSubdistrict}
                                                                error={errors.Land_AddrSubdistrict}
                                                                helperText={errors.Land_AddrSubdistrict}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ตำบล"
                                                                label="ตำบล" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="Land_AddrDistrict"
                                                                value={values.Land_AddrDistrict}
                                                                error={errors.Land_AddrDistrict}
                                                                helperText={errors.Land_AddrDistrict}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อำเภอ"
                                                                label="อำเภอ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="DocLand_code"
                                                                value={values.DocLand_code}
                                                                error={errors.DocLand_code}
                                                                helperText={errors.DocLand_code}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ประเภทที่ดิน"
                                                                label="ประเภทที่ดิน" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="LandNumber"
                                                                value={values.LandNumber}
                                                                error={errors.LandNumber}
                                                                helperText={errors.LandNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="เลขที่"
                                                                label="เลขที่" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
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
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield
                                                                name="principle"
                                                                value={values.principle}
                                                                error={errors.principle}
                                                                helperText={errors.principle}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="จำนวนเงินให้กู้"
                                                                label="จำนวนเงินให้กู้" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
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
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="ChargeRate"
                                                                value={values.ChargeRate}
                                                                error={errors.ChargeRate}
                                                                helperText={errors.ChargeRate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="อัตราค่าปรับ"
                                                                label="อัตราค่าปรับ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiDatePicker
                                                                name="ReceiptDate"
                                                                value={values.ReceiptDate}
                                                                error={errors.ReceiptDate}
                                                                helperText={errors.ReceiptDate}
                                                                onChange={(event) => {
                                                                    setFieldValue("ReceiptDate", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่จัดทำ"
                                                                label="วันที่จัดทำ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfieldMultiLine label="หมายเหตุ" defaultValue="" row="3" />
                                                        </Grid>
                                                    </Grid>

                                                </Paper>



                                                {/* Paper 3 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6}>
                                                            <ButtonExport label="พิมพ์ดูการ์ดก่อนชำระเงิน" handleButtonClick={() => { getCardPdf() }} loading={isExporting} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <ButtonExport label="ประมวลผลก่อนชำระเงิน" handleButtonClick={() => { getProcessBeforePay(values) }} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecPrincipleBalance"
                                                                        value={values.RecPrincipleBalance}
                                                                        error={errors.RecPrincipleBalance}
                                                                        helperText={errors.RecPrincipleBalance}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        textAlign='right'
                                                                        placeholder="เงินต้นคงเหลือ"
                                                                        label=""
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecPrinciple"
                                                                        value={values.RecPrinciple}
                                                                        error={errors.RecPrinciple}
                                                                        helperText={errors.RecPrinciple}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="เงินต้นครบกำหนดชำระ"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecInterestKang2"
                                                                        value={values.RecInterestKang2}
                                                                        error={errors.RecInterestKang2}
                                                                        helperText={errors.RecInterestKang2}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ยค้างปรับ"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecDueInterest"
                                                                        value={values.RecDueInterest}
                                                                        error={errors.RecDueInterest}
                                                                        helperText={errors.RecDueInterest}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ยครบชำระ"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">รวมดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecSumInterest"
                                                                        value={values.RecSumInterest}
                                                                        error={errors.RecSumInterest}
                                                                        helperText={errors.RecSumInterest}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="รวมดอกเบี้ย"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ค่าปรับค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecOverdueInterest"
                                                                        value={values.RecOverdueInterest}
                                                                        error={errors.RecOverdueInterest}
                                                                        helperText={errors.RecOverdueInterest}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ค่าปรับค้างรับ"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">รวมต้องชำระทั้งสิ้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecSumPaid"
                                                                        value={values.RecSumPaid}
                                                                        error={errors.RecSumPaid}
                                                                        helperText={errors.RecSumPaid}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="รวมต้องชำระทั้งสิ้น"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment
                                                                        name="RecPrincipleBalance"
                                                                        value={values.RecPrincipleBalance}
                                                                        error={errors.RecPrincipleBalance}
                                                                        helperText={errors.RecPrincipleBalance}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="เงินต้นคงเหลือ"
                                                                        label=""
                                                                        textAlign='right'
                                                                        endAdornment="บาท" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Paper>

                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield
                                                                name="Time"
                                                                value={values.Time}
                                                                error={errors.Time}
                                                                helperText={errors.Time}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ครั้งที่"
                                                                label="ครั้งที่" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="&nbsp;" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield
                                                                name="ReceiptNumber"
                                                                value={values.ReceiptNumber}
                                                                error={errors.ReceiptNumber}
                                                                helperText={errors.ReceiptNumber}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="ใบเสร็จเลขที่"
                                                                label="ใบเสร็จเลขที่" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiDatePicker
                                                                name="ReceiptDate"
                                                                value={values.ReceiptDate}
                                                                error={errors.ReceiptDate}
                                                                helperText={errors.ReceiptDate}
                                                                onChange={(event) => {
                                                                    setFieldValue("ReceiptDate", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่ใบเสร็จ"
                                                                label="วันที่ใบเสร็จ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiDatePicker
                                                                name="CalculateDate"
                                                                value={values.CalculateDate}
                                                                error={errors.CalculateDate}
                                                                helperText={errors.CalculateDate}
                                                                onChange={(event) => {
                                                                    setFieldValue("CalculateDate", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่คำนวณ"
                                                                label="วันที่คำนวณ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiDatePicker
                                                                name="PaidDate"
                                                                value={values.PaidDate}
                                                                error={errors.PaidDate}
                                                                helperText={errors.PaidDate}
                                                                onChange={(event) => {
                                                                    setFieldValue("PaidDate", moment(event).format("YYYY-MM-DD"))
                                                                }}
                                                                onChangeDate={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="วันที่ชำระ"
                                                                label="วันที่ชำระ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">จำนวนเงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="PrincipleBalance1"
                                                                        value={values.PrincipleBalance1}
                                                                        error={errors.PrincipleBalance1}
                                                                        helperText={errors.PrincipleBalance1}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="จำนวนเงินต้นคงเหลือ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                 
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right txt-red">จำนวนเงินที่ชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="TotalPaid"
                                                                        value={values.TotalPaid}
                                                                        error={errors.TotalPaid}
                                                                        helperText={errors.TotalPaid}
                                                                        onChange={(e) =>{
                                                                            handleChange(e)
                                                                            const check = (parseFloat(values.RecSumInterest) + parseFloat(values.RecOverdueInterest) + parseFloat(values.RecPrincipleBalance))


                                                                            if (parseFloat(e.target.value) === check){
                                                                                setIsShowClose(true)
                                                                            }else{
                                                                                setIsShowClose(false)
                                                                            }
                                                                        }}
                                                                        onBlur={handleBlur}
                                                                        placeholder="จำนวนเงินที่ชำระ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <ButtonFluidPrimary label="คำนวณ" onClick={() => {
                                                                        calculatePaid(values.TotalPaid)
                                                                    }} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="PrinciplePaid"
                                                                        value={values.PrinciplePaid}
                                                                        error={errors.PrinciplePaid}
                                                                        helperText={errors.PrinciplePaid}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="เงินต้น"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="InterestPaid"
                                                                        value={values.InterestPaid}
                                                                        error={errors.InterestPaid}
                                                                        helperText={errors.InterestPaid}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ย"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="OverdueInterest"
                                                                        value={values.OverdueInterest}
                                                                        error={errors.OverdueInterest}
                                                                        helperText={errors.OverdueInterest}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ยค้างปรับ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="DueInterest"
                                                                        value={values.DueInterest}
                                                                        error={errors.DueInterest}
                                                                        helperText={errors.DueInterest}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ยครบชำระ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ค่าปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="Fines"
                                                                        value={values.Fines}
                                                                        error={errors.Fines}
                                                                        helperText={errors.Fines}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ค่าปรับ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">อื่นๆ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="Other"
                                                                        value={values.Other}
                                                                        error={errors.Other}
                                                                        helperText={errors.Other}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="อื่นๆ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="PrincipleBalance2"
                                                                        value={values.PrincipleBalance2}
                                                                        error={errors.PrincipleBalance2}
                                                                        helperText={errors.PrincipleBalance2}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="เงินต้นคงเหลือ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield
                                                                        name="InterestBalance"
                                                                        value={values.InterestBalance}
                                                                        error={errors.InterestBalance}
                                                                        helperText={errors.InterestBalance}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ดอกเบี้ยค้างชำระ"
                                                                        textAlign='right'
                                                                        label="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>

                                                </Paper>

                                                <Grid container spacing={2} alignItems="center" justifyContent="center" className="btn-row">
                                                    {isShowClose && <Grid item >
                                                        <div className="box-button txt-center">
                                                            <FormGroup>
                                                                <FormControlLabel control={<Checkbox label="ปิดสัญญา" checked={checkClose} onChange={(e) => {
                                                                    setCheckClose(e.target.checked)
                                                                    if(e.target.checked){
                                                                        setFieldValue("Status",0)
                                                                    }else{
                                                                        setFieldValue("Status", 1)
                                                                    }
                                                                }} />} label="ปิดสัญญา" /></FormGroup>

                                                        </div>

                                                    </Grid>}
                                                    <Grid item xs={12} md={12}>
                                                        <ButtonFluidPrimary label="บันทึกการเพิ่ม" onClick={handleSubmit}/>
                                                    </Grid>
                                            
                                                </Grid>
                                            </Form>)
                                    }}
                                />




                            </Grid>

                            <Grid item xs={12} md={6} style={{ position: 'fixed', width: '100%', right: '0' }}>
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Formik
                                                enableReinitialize={false}
                                                initialValues={{ Fullname: '', LoanNumber: '' }}
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
                                                onSubmit={(value, actions) => {
                                                    getReceiptData(value)
                                                }}
                                                render={(formik) => {

                                                    const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik


                                                    return (
                                                        <Form>
                                                            <Grid container spacing={2}>

                                                                <Grid item xs={12} md={4}>
                                                                    {/* Field Text ---------------------------------------------------*/}
                                                                    <MuiTextfield
                                                                        name="Fullname"
                                                                        value={values.Fullname}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ค้นหาชื่อ-นามสกุล"
                                                                        label="ค้นหาชื่อ-นามสกุล"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    {/* Field Text ---------------------------------------------------*/}
                                                                    <MuiTextfield
                                                                        name="LoanNumber"
                                                                        value={values.LoanNumber}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        placeholder="ค้นหาเลขที่สัญญา"
                                                                        label="ค้นหาเลขที่สัญญา"
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} md={2}>
                                                                    <p>&nbsp;</p>
                                                                    <ButtonFluidPrimary label="ค้นหา" onClick={handleSubmit} />
                                                                </Grid>

                                                            </Grid>

                                                        </Form>
                                                    )
                                                }} />

                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <div className="table">
                                                <TableContainer className="table-box table-recordcloseoldContact1 mg-t-10">
                                                    <Table aria-label="normal table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                                <TableCell align="center">ปีโครงการ</TableCell>
                                                                <TableCell align="center">วันที่กู้</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>{/* // clear mockup */}
                                                            {resultList.length <= 0 ? <TableRow>
                                                                <TableCell colSpan={4} align="center">ไม่พบข้อมูล</TableCell>
                                                            </TableRow> : resultList.map((row, i) => (
                                                                <TableRow key={i} hover={true} role="checkbox" tabIndex={-1} onClick={() => {
                                                                    getReceiptSelectData(row.LoanNumber) 
                                                                }}>
                                                                    <StyledTableCellLine align="left">{row.LoanNumber}</StyledTableCellLine>
                                                                    <StyledTableCellLine align="left">{row.ProjectName}</StyledTableCellLine>
                                                                    <StyledTableCellLine align="left">{row.ProjectPlanYear}</StyledTableCellLine>
                                                                    <StyledTableCellLine align="left">{moment(row.LoanReceiptDate, "YYYY-MM-DD").add(543, 'year').format("DD-MM-YYYY")}</StyledTableCellLine>
                                                                </TableRow>
                                                            ))}


                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default RecordBillAlro
