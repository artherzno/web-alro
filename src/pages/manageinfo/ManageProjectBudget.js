import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiTextNumber,
    MuiTextfieldCurrency,
    MuiDatePicker,
    MuiSelectObjYear,
    MuiTextfieldMultiLine,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

function ManageProjectBudget() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [loaded, setLoaded] = useState(false);
    const [goHome, setGoHome] = useState(false)
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoading, setIsLoading] = useState(false);
    const [inputDateDropDown, setInputDateDropDonw] = useState({
        startDD: '',
        startMM: '',
        startYYYY: '',
        endDD: '',
        endMM: '',
        endYYYY: ''
    })
    const [inputData, setInputData] = useState({
        SPKInfoID: '', // 1,
        ProjectBudgetName: '', // null,
        DepartmentName: '', // "สำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม",
        OrganizeName: '', // "สำนักงานการปฏิรูปที่ดินจังหวัดเพชรบูรณ์",
        Addr: '', // "104   หมู่ 10   ถ.สระบุรี-หล่มสัก",
        District: '', // "เมืองเพชรบูรณ์",
        Province: '', // "เพชรบูรณ์",
        ProvinceCodeEN: '', // "PBUN",
        ProvinceCodeTH: '', // "พช",
        Zipcode: '', // "67000",
        Tel: '', // "056-720785 ต่อ 102",
        TaxPayNum: '', // "9.94e+011",
        SPKCode: '', // "713",
        CompCode: '', // "AL67",
        dCrated: '', // null,
        dUpdated: '', // "2021-07-11T13:47:10.000Z",
        admin_nMEMID: '', // 13,
        ProjectBudgetID: '', // 1,
        ProvinceID: '', // 67,
        ProjectYear: '', // null,
        ProjectPlanYear: '', // null,
        FiscalYear: 0, // 2564,
        StartDateFiscalYear: null, // "2020-10-01T00:00:00.000Z",
        EndDateFiscalYear: null, // "2021-09-30T00:00:00.000Z",
        Officer: '', // null,
        Rank: '', // null,
        ProjectBudget: '', // 6000000
        PersonalPlan: '', // 6000000,
        ProjectPlan: '', // 0,
        PrincipalBalance: '', // 125221672.98,
        Debt: '', // null,
        Interest: '', // 13022492.9,
        Fine: '', // 179819.35,
        PrincipleSue: '', // null,
        InterestSue: '', // null,
        InterestSueNoPay: '', // null
        PersonalResultPlan: '',
        ProjectResultPlan: '',
    })

    const [inputDataStartEndYear, setInputDataStartEndYear] = useState({
        StartDateFiscalYear: null, // "2020-10-01T00:00:00.000Z",
        EndDateFiscalYear: null, 
    })

    useEffect(() => {
        setLoaded(true);
        const getSpkInfo = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkinfo`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log('get_spkinfo',res)
                    let data = res.data;
                    if(data.code === 0 || res === null || res === undefined) {
                        setErr(true);
                        if(Object.keys(data.message).length !== 0) {
                            console.error(data)
                            if(typeof data.message === 'object') {
                                setErrMsg('ไม่สามารถทำรายการได้')
                            } else {
                                setErrMsg([data.message])
                            }
                        } else {
                            setErrMsg(['ไม่สามารถทำรายการได้'])
                        }
                    }else {
                        // console.log('get_spkinfo',data.data[0])
                        // setTableResult(data.data)
                        let resSpkInfo = data.data[0];
                        setInputData({
                            ...inputData,
                            SPKInfoID: resSpkInfo.SPKInfoID, // 1,
                            ProjectBudgetName: resSpkInfo.ProjectBudgetName, // null,
                            DepartmentName: resSpkInfo.DepartmentName, // "สำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม",
                            OrganizeName: resSpkInfo.OrganizeName, // "สำนักงานการปฏิรูปที่ดินจังหวัดเพชรบูรณ์",
                            Addr: resSpkInfo.Addr, // "104   หมู่ 10   ถ.สระบุรี-หล่มสัก",
                            District: resSpkInfo.District, // "เมืองเพชรบูรณ์",
                            Province: resSpkInfo.Province, // "เพชรบูรณ์",
                            ProvinceCodeEN: resSpkInfo.ProvinceCodeEN, // "PBUN",
                            ProvinceCodeTH: resSpkInfo.ProvinceCodeTH, // "พช",
                            Zipcode: resSpkInfo.Zipcode, // "67000",
                            Tel: resSpkInfo.Tel, // "056-720785 ต่อ 102",
                            TaxPayNum: resSpkInfo.TaxPayNum, // "9.94e+011",
                            SPKCode: resSpkInfo.SPKCode, // "713",
                            ProvinceID: resSpkInfo.ProvinceID, // 67,
                            CompCode: resSpkInfo.CompCode, // "AL67",
                            dCrated: resSpkInfo.dCrated, // null,
                            dUpdated: resSpkInfo.dUpdated, // "2021-07-11T13:47:10.000Z",
                            admin_nMEMID: resSpkInfo.admin_nMEMID, // 13
                        })
                    }
                }
            ).catch(err => { console.log(err); 
                setErr(true);
                setErrMsg('ไม่สามารถทำรายการได้')
                setGoHome(true);
            })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }


        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log('checklogin',res)
                    let data = res.data;
                    if(data.code === 0) {
                        setErr(true);
                        if(Object.keys(data.message).length !== 0) {
                            console.error(data)
                            if(typeof data.message === 'object') {
                                setErrMsg('ไม่สามารถทำรายการได้')
                            } else {
                                setErrMsg([data.message])
                            }
                        } else {
                            setErrMsg(['ไม่สามารถทำรายการได้'])
                        }
                    }
                    getSpkInfo()
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();
        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }
    }, [])

    const getSpkProjectBudget = (year) => {
        // console.log('year',year)
        axios.post(
            `${server_hostname}/admin/api/get_spkprojectbudget`, {
                "FiscalYear": year + 2500
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log('get_spkprojectbudget',res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    setErr(true);
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            setErrMsg('ไม่สามารถทำรายการได้')
                        } else {
                            setErrMsg([data.message])
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    // console.log('get_spkprojectbudget',data.data[0])
                    // console.log('get_spkprojectbudget_length',data.data.length)
                    let resSpkProjectBudget;

                    if(data.data.length === 0) {
                        resSpkProjectBudget = [];
                        setInputData({
                            ...inputData,
                            FiscalYear:  year, // 2564,
                            // StartDateFiscalYear: null, // "2020-10-01T00:00:00.000Z",
                            // EndDateFiscalYear: null, 
                            ProjectBudget: resSpkProjectBudget.ProjectBudget|| '',
                            PersonalPlan: resSpkProjectBudget.PersonalPlan || '', // 6000000,
                            ProjectPlan: resSpkProjectBudget.ProjectPlan || '', // 0,
                            PrincipalBalance: resSpkProjectBudget.PrincipalBalance || '', // 125221672.98,
                            Debt: resSpkProjectBudget.Debt || '', // null,
                            Interest: resSpkProjectBudget.Interest || '', // 13022492.9,
                            Fine: resSpkProjectBudget.Fine || '', // 179819.35,
                            PrincipleSue: resSpkProjectBudget.PrincipleSue || '', // null,
                            InterestSue: resSpkProjectBudget.InterestSue || '', // null,
                            InterestSueNoPay: resSpkProjectBudget.InterestSueNoPay || '', // null,
                            dCrated: resSpkProjectBudget.dCrated || '', // null,
                            dUpdated: resSpkProjectBudget.dUpdated || '', // null,
                            admin_nMEMID: resSpkProjectBudget.admin_nMEMID || '', // nul
                            PersonalResultPlan: resSpkProjectBudget.PersonalResultPlan || '',
                            ProjectResultPlan: resSpkProjectBudget.ProjectResultPlan || '',
                        })
                    } else {
                        resSpkProjectBudget = data.data[0];
                        setInputData({
                            ...inputData,
                            ProjectBudgetID: resSpkProjectBudget.ProjectBudgetID || '', // 1,
                            ProvinceID: resSpkProjectBudget.ProvinceID || '', // 67,
                            ProjectYear: resSpkProjectBudget.ProjectYear || '', // null,
                            ProjectPlanYear: resSpkProjectBudget.ProjectPlanYear || '', // null,
                            FiscalYear: resSpkProjectBudget.FiscalYear - 2500 || '', // 2564,
                            // StartDateFiscalYear: resSpkProjectBudget.StartDateFiscalYear || null, // "2020-10-01T00:00:00.000Z",
                            // EndDateFiscalYear: resSpkProjectBudget.EndDateFiscalYear || null, // "2021-09-30T00:00:00.000Z",
                            Officer: resSpkProjectBudget.Officer || '', // null,
                            Rank: resSpkProjectBudget.Rank || '', // null,
                            ProjectBudget: resSpkProjectBudget.ProjectBudget || '',
                            PersonalPlan: resSpkProjectBudget.PersonalPlan || '', // 6000000,
                            ProjectPlan: resSpkProjectBudget.ProjectPlan || '', // 0,
                            PrincipalBalance: resSpkProjectBudget.PrincipalBalance || '', // 125221672.98,
                            Debt: resSpkProjectBudget.Debt || '', // null,
                            Interest: resSpkProjectBudget.Interest || '', // 13022492.9,
                            Fine: resSpkProjectBudget.Fine || '', // 179819.35,
                            PrincipleSue: resSpkProjectBudget.PrincipleSue || '', // null,
                            InterestSue: resSpkProjectBudget.InterestSue || '', // null,
                            InterestSueNoPay: resSpkProjectBudget.InterestSueNoPay || '', // null,
                            dCrated: resSpkProjectBudget.dCrated || '', // null,
                            dUpdated: resSpkProjectBudget.dUpdated || '', // null,
                            admin_nMEMID: resSpkProjectBudget.admin_nMEMID || '', // null
                            PersonalResultPlan: resSpkProjectBudget.PersonalResultPlan || '',
                            ProjectResultPlan: resSpkProjectBudget.ProjectResultPlan || '',
                        })  
                    }

                       
                }
            }
        ).catch(err => { console.log(err); /* setErr(true); setErrMsg('ไม่สามารถทำรายการได้')*/ 
    
        })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    const reOrderDate = (val) => {
        if(val===null) {
            setErr(true)
            setErrMsg('กรุณาเลือกปีงบประมาณ')
        } else {
            let yyyy = Number(val.substring(6,10)) - 543
            let mm = val.substring(3,5)
            let dd = val.substring(0,2)
            return yyyy+'-'+mm+'-'+dd
        }
        
    }

    const getSpkStartEndYear = (year) => {
        // console.log('year',year)
        axios.post(
            `${server_hostname}/admin/api/get_StartDateFiscalYear`, {
                "FiscalYear": year + 2500
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log('get_StartDateFiscalYear',res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    setErr(true);
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            setErrMsg('ไม่สามารถทำรายการได้')
                        } else {
                            setErrMsg([data.message])
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    // console.log('get_spkprojectbudget',data.data[0])
                    // console.log('get_spkprojectbudget_length',data.data.length)
                    // let resSpkStartEndYear;

                    // if(data.data.length === 0) {
                    //     resSpkStartEndYear = [];
                    //     setInputDataStartEndYear({
                    //         ...inputDataStartEndYear,
                    //         StartDateFiscalYear: null, // "2020-10-01T00:00:00.000Z",
                    //         EndDateFiscalYear: null, 
                    //     })
                    // } else {
                        let resSpkStartEndYear = data.data;
                        // let newStartDataFiscalYear = (parseInt(resSpkStartEndYear.StartDateFiscalYear.substring(0,4)) + 543)+(resSpkStartEndYear.StartDateFiscalYear.substring(4,10));
                        // let newEndDateFiscalYear = (parseInt(resSpkStartEndYear.EndDateFiscalYear.substring(0,4)) + 543)+(resSpkStartEndYear.EndDateFiscalYear.substring(4,10));
                        // alert(newStartDataFiscalYear)
                        setInputDataStartEndYear({
                            ...inputDataStartEndYear,
                            StartDateFiscalYear: newOrderDate(resSpkStartEndYear.StartDateFiscalYear) || null,
                            EndDateFiscalYear: newOrderDate(resSpkStartEndYear.EndDateFiscalYear) || null,
                            // StartDateFiscalYear: newStartDataFiscalYear || null, // "2020-10-01T00:00:00.000Z",
                            // EndDateFiscalYear: newEndDateFiscalYear || null, // "2021-09-30T00:00:00.000Z",
                        })  
                    // }

                       
                }
            }
        ).catch(err => { console.log(err); /* setErr(true); setErrMsg('ไม่สามารถทำรายการได้')*/ 
    
        })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleInputDate = (event) => {
        console.log(event.target)
        console.log(event.target.value)
        // let value = '2560-12-01'
        // let dayValue = value.slice(-2);
        // let monthValue = value.slice(5,7);
        // let yearValue = (parseInt(value.slice(0,4)) + 543).toString();
    }

    // Input Text field  ********************************
    const handleInputData = (event) => {
        // console.log('event.target.name',event.target.name)
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else {
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
        }
        // console.log(event)
    }

    const handleInputDataYear = (event) => {
        // console.log(event.target.name)
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        getSpkProjectBudget(event.target.value);
        getSpkStartEndYear(event.target.value);
        // if(inputData.FiscalYear.length === 3) {
        //     getSpkProjectBudget(event.target.value);
        //     console.log(inputData.FiscalYear.length)
        // }
    }

    // Submit Data ---------------------------------------------------------------------------//
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputDataStartEndYear.StartDateFiscalYear)
        if(inputDataStartEndYear.StartDateFiscalYear === null) {
            setErr(true)
            setErrMsg('กรุณาเลือกปีงบประมาณ')
        } else {
        
            let setProjectBudget = inputData.ProjectBudget === null ? '0' : inputData.ProjectBudget.toLocaleString('en-US', {minimumFractionDigits: 2})
            
            let updateSpkInfo = document.getElementById('updateSpkInfo');
            let formData = new FormData(updateSpkInfo);
            formData.append('SPKInfoID', inputData.SPKInfoID)
            formData.append('ProjectBudgetName', inputData.ProjectBudgetName)
            formData.append('ProjectYear',null)
            formData.append('ProjectPlanYear',null)
            formData.append('ProjectBudgetID',inputData.ProjectBudgetID);
            formData.set('StartDateFiscalYear',reOrderDate(inputDataStartEndYear.StartDateFiscalYear))
            formData.set('EndDateFiscalYear',reOrderDate(inputDataStartEndYear.EndDateFiscalYear))
            formData.set('FiscalYear',(inputData.FiscalYear + 2500)) // Convert year 2 digit to 4 digit
            formData.set('PersonalPlan',parseFloat(inputData.PersonalPlan.toLocaleString('en-US', {minimumFractionDigits: 2}).split(',').join('')) || 0)
            formData.set('ProjectPlan',parseFloat(inputData.ProjectPlan.toLocaleString('en-US', {minimumFractionDigits: 2}).split(',').join('')) || 0)
            formData.set('PrincipalBalance',parseFloat(inputData.PrincipalBalance) || 0)
            formData.set('Debt',parseFloat(inputData.Debt) || 0)
            formData.set('Interest',parseFloat(inputData.Interest) || 0)
            formData.set('Fine',parseFloat(inputData.Fine) || 0)
            formData.set('PrincipleSue',parseFloat(inputData.PrincipleSue) || 0)
            formData.set('InterestSue',parseFloat(inputData.InterestSue) || 0)
            formData.set('InterestSueNoPay',parseFloat(inputData.InterestSueNoPay) || 0)
            formData.set('ProjectBudget',parseFloat(setProjectBudget.toLocaleString('en-US', {minimumFractionDigits: 2}).split(',').join('')) || 0)
            formData.set('PersonalResultPlan',parseFloat(inputData.PersonalResultPlan.toLocaleString('en-US', {minimumFractionDigits: 2}).split(',').join('')) || 0)
            formData.set('ProjectResultPlan',parseFloat(inputData.ProjectResultPlan.toLocaleString('en-US', {minimumFractionDigits: 2}).split(',').join('')) || 0)

            axios.post(
                `${server_hostname}/admin/api/update_spkinfo`, formData, { headers: { "token": token } } 
            ).then(res => {
                    console.log(res)
                    let data = res.data;
                    if(data.code === 0 || res === null || res === undefined) {
                        setErr(true);
                        if(Object.keys(data.message).length !== 0) {
                            console.error(data)
                            if(typeof data.message === 'object') {
                                setErrMsg('ไม่สามารถทำรายการได้')
                            } else {
                                setErrMsg([data.message])
                            }
                        } else {
                            setErrMsg(['ไม่สามารถทำรายการได้'])
                        }
                    }else {
                        console.log(data)
                        setSuccess(true);
                        setSuccessMsg('บันทึกข้อมูลเรียบร้อย')
                    }
                }
            ).catch(err => { console.log(err); })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        }
    };

    const gotoHome = () => {
        setErr(false);
        setSuccess(false);
        history.push('/home');
    }


    const handleReload = () => {
        setErrMsg('')
        setErr(false);
        setSuccess(false);
        window.location.reload();

    };

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
    };

    return (
        <div className="allcontractsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>จัดการงบประมาณโครงการ</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <form id="updateSpkInfo" className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>    
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อกรม" name="DepartmentName" value={inputData.DepartmentName} onChange={handleInputData} />
                                                {/* <MuiTextfield label="เลขที่บันทึก" inputdisabled="input-disabled" defaultValue="PNGA0001600005/00001" /> */}
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อหน่วยงาน" name="OrganizeName" value={inputData.OrganizeName} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="Addr" value={inputData.Addr} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield inputdisabled="input-disabled" label="อำเภอ" name="District" value={inputData.District} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="จังหวัด" name="Province" value={inputData.Province} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield inputdisabled="input-disabled" label="&nbsp;" name="ProvinceCodeEN" value={inputData.ProvinceCodeEN} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield inputdisabled="input-disabled" label="&nbsp;" name="ProvinceCodeTH" value={inputData.ProvinceCodeTH} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="รหัสไปรษณีย์" name="Zipcode" value={inputData.Zipcode} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="โทรศัพท์"  name="Tel" value={inputData.Tel} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield inputdisabled="input-disabled" label="เลขที่ผู้เสียภาษี ส.ป.ก."  name="TaxPayNum" value={inputData.TaxPayNum} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="รหัสหน่วยงาน ส.ป.ก." name="SPKCode" value={inputData.SPKCode} onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="รหัสจังหวัด" name="ProvinceID" value={inputData.ProvinceID} onChange={handleInputData} />
                                                {/* <MuiDatePicker label="วันที่สัญญา" defaultValue="2017-05-15" /> */}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield inputdisabled="input-disabled" label="CompCode" name="CompCode" value={inputData.CompCode} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ปฏิรูปที่ดินจังหวัด" name="Officer" value={inputData.Officer} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ตำแหน่ง" name="Rank" value={inputData.Rank} onChange={handleInputData}  />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>

                                            <Grid item xs={12} md={4}>
                                                <MuiSelectObjYear label="ปีงบประมาณ" valueYaer={10} name="FiscalYear" value={inputData.FiscalYear} onChange={handleInputDataYear} />
                                                {/* <MuiTextNumber label="ปีงบประมาณ" name="FiscalYear" value={inputData.FiscalYear} onInput={handleInputDataYear} /> */}
                                            </Grid>
                                            {/* <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid> */}
                                            <Grid item xs={12} md={4}>
                                                {/* <MuiDatePicker label="วันที่เริ่มงบประมาณ" name="StartDateFiscalYear"  value={inputData.StartDateFiscalYear} onChange={handleInputDate} /> */}
                                                 <MuiTextfield  inputdisabled="input-disabled"  label="วันที่เริ่มงบประมาณ" name="StartDateFiscalYear"  value={inputDataStartEndYear.StartDateFiscalYear} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield inputdisabled="input-disabled"  label="วันสิ้นสุดงบประมาณ" name="EndDateFiscalYear" value={inputDataStartEndYear.EndDateFiscalYear}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">แผนเงินกู้ปี ปัจจุบัน</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">เงินจากงบประมาณ</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency label="" name="ProjectBudget" value={inputData.ProjectBudget}  onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">แผนรายบุคคล</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency label="" name="PersonalPlan" value={inputData.PersonalPlan}  onChange={handleInputData} />
                                                        {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="PersonalPlan" value={inputData.PersonalPlan}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">แผนรายโครงการ</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency label=""  name="ProjectPlan" value={inputData.ProjectPlan}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="ProjectPlan" value={inputData.ProjectPlan}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ผลรายบุคคล</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   name="PersonalResultPlan" value={inputData.PersonalResultPlan}  onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ผลรายโครงการ</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   name="ProjectResultPlan" value={inputData.ProjectResultPlan}  onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">สถานะหนี้ยกมา ปิดบัญชี</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={11} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="PrincipalBalance" value={inputData.PrincipalBalance}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="PrincipalBalance" value={inputData.PrincipalBalance}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">หนี้ค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="Debt" value={inputData.Debt}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="Debt" value={inputData.Debt}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="Interest" value={inputData.Interest}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="Interest" value={inputData.Interest}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ค่าปรับค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="Fine" value={inputData.Fine}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="Fine" value={inputData.Fine}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">เงินต้นฟ้องศาลคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="PrincipleSue" value={inputData.PrincipleSue}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="PrincipleSue" value={inputData.PrincipleSue}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยฟ้องศาลคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="InterestSue" value={inputData.InterestSue}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="InterestSue" value={inputData.InterestSue}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยฟ้องศาลค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="InterestSueNoPay" value={inputData.InterestSueNoPay}  onChange={handleInputData} />
                                                    {/* <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท" name="InterestSueNoPay" value={inputData.InterestSueNoPay}  onChange={handleInputData} /> */}
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                    
                    <Container  maxWidth="sm">
                        <Grid container spacing={2} className="btn-row">
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={12} md={6}>
                                <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={gotoHome} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                {/* {
                                    inputData.StartDateFiscalYear && inputData.EndDateFiscalYear ?
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                    :
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={()=>{setErr(true); setErrMsg('กรุณาใส่ข้อมูล')}} />
                                } */}
                            </Grid>
                        </Grid>
                    </Container>

                </div>
            </Fade>

            <Dialog
                open={success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{successMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleReload} color="primary" style={{justifyContent: 'center'}} />
                                
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={err}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                   
                    <div className="dialog-error">
                        <p className="txt-center txt-black">{errMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            {
                                goHome ? 
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={gotoHome} color="primary" style={{justifyContent: 'center'}} />
                                :
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            }
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            
        </div>
    )
}

export default ManageProjectBudget
