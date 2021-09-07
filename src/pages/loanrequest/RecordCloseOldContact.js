import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiSelectObjYearStart,
    MuiTextfieldEndAdornment,
    MuiTextfieldCurrency,
    MuiTextfieldStartAdornment,
    MuiRadioButton,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function RecordCloseOldContact() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('ตกลงใช่หรือไม่')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);
    const [formField, setFormField] = useState(false)

    const [inputDataReceipt, setInputDataReceipt] = useState({
        ReceiptID: '',// 1,
        LoanID: '',// 1,
        ReceiptNumber: '',// "sample string 2",
        ref_id1: '',// "sample string 3",
        Reccode: '',// "sample string 4",
        Mindex: '',// "sample string 5",
        Time: '',// 1,
        RecDate: '',// "2021-09-06T16:44:46.2782029+07:00",
        ReceiptDate: '',// "2021-09-06T16:44:46.279202+07:00",
        CalculateDate: '',// "2021-09-06T16:44:46.279202+07:00",
        PaidDate: '',// "2021-09-06T16:44:46.279202+07:00",
        PrincipleBalance1: '',// 1.1,
        PrincipleCalculate: '',// 1.1,
        PaidCalculate: '',// 1.1,
        PrinciplePaid: 0,// 1.1,
        InterestPaid: 0,// 1.1,
        OverdueInterest: 0,// 1.1,
        DueInterest: 0,// 1.1,
        Fines: 0,// 1.1,
        Other: 0,// 1.1,
        PrincipleBalance2: '',// 1.1,
        InterestBalance: '',// 1.1,
        ReceiveInterest: '',// 1.1,
        Type: '',// "sample string 6",
        ReceiptTypeID: '',// 1,
        PrincipleBalance3: '',// 1.1,
        PrincipleDuePaid: '',// 1.1,
        FinesInterest: '',// 1.1,
        FinesInterestDuePaid: '',// 1.1,
        TotalInterest: '',// 1.1,
        FinesOverdue: '',// 1.1,
        TotalPaid: 0,// 1.1,
        PrincipleBalance4: '',// 1.1,
        Cancel: '',// true,
        ProvinceID: '',// 1,
        dCreated: '',// "2021-09-06T16:44:46.2822024+07:00",
        dUpdated: '',// "2021-09-06T16:44:46.2822024+07:00",
        admin_nMEMID: '',// 1
      })

    const [inputDataCloseContact, setInputDataCloseContact] = useState({
        CloseID: '', // 1,
        LoanID: '', // 1,
        FinesRate: '', // 1.1,
        CreateDate: '', // "2021-09-06T16:44:46.283203+07:00",
        Comment: '', // "sample string 2",
        ReceiptNumber: '', // "sample string 3",
        ReceiptDate: '', // "2021-09-06T16:44:46.283203+07:00",
        PrincipleBalance: '', // 1.1,
        PrinciplePaidCalculate: '', // 1.1,
        PaidCalculate: '', // 1.1,
        Principle: '', // 1.1,
        Interest: '', // 1.1,
        PendingInterest: '', // 1.1,
        Fines: '', // 1.1,
        ReceiveInterest: '', // 1.1,
        Types: '', // "sample string 4",
        PrincipleBalance2: '', // 1.1,
        DuePaid: '', // 1.1,
        Pending_Interest2: '', // 1.1,
        DueInterest: '', // 1.1,
        TotalInterest: '', // 1.1,
        PendingFines: '', // 1.1,
        TotalPaid: '', // 1.1,
        TotalBalance: '', // 1.1,
        dCreated: '', // "2021-09-06T16:44:46.2852027+07:00",
        dUpdated: '', // "2021-09-06T16:44:46.2862028+07:00",
        admin_nMEMID: '', // 1
    })

    const [inputDataBeforePay, setInputDataBeforePay] = useState({
        principleBalance: 0,
        principle1: 0,
        InterestKang2: 0,
        InterestKang22: 0,
        InterestKang222: 0,
        FineKang: 0,
        FineKangSum: 0,
    })

    const [inputSelectDate, setInputSelectDate] = useState({
        recdatedd: '00',
        recdatemm: '00',
        recdateyyyy: '0000',

        loanreceiptdatedd: '00',
        loanreceiptdatemm: '00',
        loanreceiptdateyyyy: '0000',

        loandatedd: '00',
        loandatemm: '00',
        loandateyyyy: '0000',

        createdatedd: '00',
        createdatemm: '00',
        createdateyyyy: '0000',

        receiptdatedd: '00',
        receiptdatemm: '00',
        receiptdateyyyyy: '0000',

    })

    const [inputDataSearch, setinputDataSearch] = useState({
        Username: localStorage.getItem('cUsername'),
        LoanNumber:"",
        Rentno: "",
        Fullname: "",
        Date: ""
    })

    const [rows, setRows] = useState([])
    const [getSelectData, setGetSelectData] = useState([])
    const [getProcessBeforePayData, setGetProcessBeforePayData] = useState([])

    const rowsLabel = [
        'LoanNumber',
        'LoanReceiptDate', 
        'ProjectName',
        'ProjectplanYear',
    ]

    const headCells = [
        { id: 'LoanNumber', numeric: false, disablePadding: true, widthCol: '80px', label: 'เลขที่สัญญา' },
        { id: 'LoanReceiptDate', numeric: false, disablePadding: true, widthCol: '80px', label: 'วันที่ใบเสร็จ' },
        { id: 'ProjectName', numeric: false, disablePadding: true, widthCol: '150px', label: 'ชื่อโครงการ' },
        { id: 'ProjectplanYear', numeric: false, disablePadding: true, widthCol: '80px', label: 'ปีงบประมาณ' },
    ]

    function createData(LoanNumber, LoanReceiptDate, ProjectName,ProjectplanYear ) {
        return {LoanNumber, LoanReceiptDate, ProjectName,ProjectplanYear }
    }

    useEffect(() => {
        setLoaded(true);

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
                    // getSpkAllProject()
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();
    }, [])

    

     // Radio Button
    //  const handleChangeTypeBill = (event) => {
    //     setInputData({...inputData,
    //         typeBill: event.target.value
    //     })
    //     console.log('typeBill ',event.target.value)
    // };
    // End Radio Button

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
    }

    const handleInputData = (event) => {
        setGetSelectData({
            ...getSelectData,
            [event.target.name]: event.target.value
        })
    }

    const handleInputDataCloseContact = (event) => {
        setInputDataCloseContact({
            ...inputDataCloseContact,
            [event.target.name]: event.target.value
        })
    }

    const handleInputDataReceipt = (event) => {
        setInputDataReceipt({
            ...inputDataReceipt,
            [event.target.name]: event.target.value
        })
    }

    const getCloseContactSearch = (loanID) => {
        setIsLoading(true);
        setRows([])

        axios.post(
            `${server_spkapi}/CloseContact/GetData`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: inputDataSearch.LoanNumber.toString(),
                Rentno: inputDataSearch.Rentno.toString(),
                Fullname: inputDataSearch.Fullname.toString(),
                Date: inputDataSearch.Date.toString()
              }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('GetData',res.data)
            let data = res.data;
            // setInputData(data)
            // console.log('inputData',inputData)
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
                setIsLoading(false)
                console.log('get_loandetail',data)
                setRows(
                    data.map((item,i)=>
                        createData(
                            item.LoanNumber === null ? '' : item.LoanNumber,
                            item.LoanReceiptDate ? newOrderDate(item.LoanReceiptDate) : null,
                            item.ProjectName === null ? '' : item.ProjectName,
                            item.ProjectplanYear === null ? '' : item.ProjectplanYear + 2500,)
                    ))
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getCloseContactSelect = (loanNumber) => {
        setIsLoading(true);
        // setRows([])
        setFormField(true)

        axios.post(
            `${server_spkapi}/CloseContact/GetSelectData`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: loanNumber,
                Rentno: "",
                Fullname: "",
                Date: ""
              }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('GetSelectData',res.data)
            let data = res.data;
            // setInputData(data)
            // console.log('inputData',inputData)
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
                setIsLoading(false)
                setGetSelectData(data[0])
                console.log('GetSelectData',getSelectData)
                setInputSelectDate({
                    ...inputSelectDate,
                    loandatedd: data[0].LoanDate === null ? '00': data[0].LoanDate.substring(8,10),
                    loandatemm: data[0].LoanDate === null ? '00': data[0].LoanDate.substring(5,7),
                    loandateyyyy: data[0].LoanDate === null ? '0000': Number(data[0].LoanDate.substring(0,4)) + 543,

                    loanreceiptdatedd: data[0].LoanReceiptDate === null ? '00': data[0].LoanReceiptDate.substring(8,10),
                    loanreceiptdatemm: data[0].LoanReceiptDate === null ? '00': data[0].LoanReceiptDate.substring(5,7),
                    loanreceiptdateyyyy: data[0].LoanReceiptDate === null ? '0000': Number(data[0].LoanReceiptDate.substring(0,4)) + 543,
                })
                
                getProcessBeforePay(loanNumber)
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getProcessBeforePay = (loanNumber) => {
        setIsLoading(true);
        // setRows([])
        setFormField(true)

        axios.post(
            `${server_spkapi}/CloseContact/GetProcessBeforePay`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: loanNumber,
                Rentno: "",
                Fullname: "",
                Date: ""
              }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('GetProcessBeforePay',res)
            let data = res.data;
            // setInputData(data)
            // console.log('inputData',inputData)
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
                setIsLoading(false)
                setGetProcessBeforePayData(data[0])
                
                
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // if (value === 'best') {
        //   setHelperText('You got it!');
        //   setError(false);
        // } else if (value === 'worst') {
        //   setHelperText('Sorry, wrong answer!');
        //   setError(true);
        // } else {
        //   setHelperText('Please select an option.');
        //   setError(true);
        // }
    };
    
    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        
        // history.push('/manageinfo/searchmember');

    };

    return (
        
        <div className="loanrequestprint-page">
            {
                isLoading ? 
                    <div className="overlay">
                        <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังค้นหาข้อมูล...</p>
                    </div> : 
                    ''
            }
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>บันทึกปิดสัญญาเดิม</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} >
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            {/* <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" /> */}
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="Fullname" value={inputDataSearch.Fullname} onChange={handleInputData} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputData} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={getCloseContactSearch} />  
                                        </Grid>
                                        <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                            <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <div className="table-box table-loanrecivceprint mg-t-10">
                                                <MUItable 
                                                    headCells={headCells} 
                                                    rows={rows} 
                                                    rowsLabel={rowsLabel} 
                                                    colSpan={12} 
                                                    hasCheckbox={false} 
                                                    hasAction={true}  // show action
                                                    actionCustom={true} 
                                                    customName={"ดูสัญญาเดิม"}
                                                    customWidth={"140px"}
                                                    customEvent={getCloseContactSelect}
                                                    customParam1={'LoanNumber'}
                                                    tableName={'recordcloseoldcontract'}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                        {
                            formField ? 
                                <Grid item xs={12} md={12}>

                                    {/* Paper 1 - -------------------------------------------------- */}
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="เลขที่บันทึก" inputdisabled="input-disabled" defaultValue="RIET2343525/00003" />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p>วันที่บันทึก</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectDate.recdatedd} onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectDate.recdatemm} onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectDate.recdateyyyy} onChange={handleSelectDate} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="" inputdisabled="input-disabled" value={getSelectData.ProvinceID} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="" inputdisabled="input-disabled"  value={getSelectData.PVSCODE} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="" inputdisabled="input-disabled" value={getSelectData.Mindex} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="โครงการ" inputdisabled="input-disabled"  value={getSelectData.Projectcode} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={9}>
                                                    <MuiTextfield label="&nbsp;" inputdisabled="input-disabled"  value={getSelectData.ProjectName} onChange={handleInputData}  />
                                                </Grid>
                                                {/* <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="&nbsp;" value={getSelectData.ProjectMainName} />
                                                </Grid> */}
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="สัญญาเลขที่" inputdisabled="input-disabled"   value={getSelectData.LoanNumber} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p>วันที่สัญญา</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectDate.loandatedd} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectDate.loandatemm} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectDate.loandateyyyy} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled"   value={getSelectData.IDCard} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled" value={getSelectData.FrontName} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled" value={getSelectData.Name} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled" value={getSelectData.Sirname} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p>วันที่รับเงินกู้</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectDate.loanreceiptdatedd} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectDate.loanreceiptdatemm} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectDate.loanreceiptdateyyyy} inputdisabled="input-disabled" onChange={handleSelectDate} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="จำนวนเงินให้กู้" inputdisabled="input-disabled" value={getSelectData.principle} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="อัตราดอกเบี้ย" inputdisabled="input-disabled" value={getSelectData.Interest} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="อัตราค่าปรับ" inputdisabled="input-disabled" value={getSelectData.ChargeRate} onChange={handleInputData}   />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p>วันที่จัดทำ</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectDate.createdatedd} onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectDate.createdatemm} onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectDate.createdateyyyy} onChange={handleSelectDate} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfieldMultiLine label="หมายเหตุ" disabled inputdisabled="input-disabled"  defaultValue="" row="3" />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>

                                     {/* Paper 3 - -------------------------------------------------- */}
                                     <Paper className="paper line-top-green paper">
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ประมวลผลก่อนปรับปรุงหนี้</h1>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="PrincipleBalance" value={inputDataCloseContact.PrincipleBalance} onChange={handleInputDataCloseContact} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยค้างปรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยในงวด</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">รวมดอกเบี้ย</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ค่าปรับค้างรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">รวมต้องชำระทั้งสิ้น</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>



                                    {/* Paper 2 - -------------------------------------------------- */}
                                    <Paper className="paper line-top-green paper">
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                {/* 
                                                
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="ใบเสร็จเลขที่" disabled defaultValue="RIET2343525/00003" />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p>วันที่ใบเสร็จ</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectDate.receiptdatedd} onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectDate.receiptdatemm} onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectDate.receiptdateyyyy} onChange={handleSelectDate} />
                                                    </div>
                                                </Grid> */}
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">จำนวนเงินต้นคงเหลือ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" inputdisabled="input-disabled" name="PrincipleBalance" value={inputDataCloseContact.PrincipleBalance} onChange={handleInputDataReceipt} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right txt-purple">จำนวนเงินต้นที่ชำระ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" name="PrinciplePaid" value={inputDataReceipt.PrinciplePaid} onChange={handleInputDataReceipt}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <ButtonFluidPrimary label="คำนวณเงินชำระ" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right txt-blue">จำนวนเงินที่ชำระ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" name="TotalPaid" value={inputDataReceipt.TotalPaid} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้น</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" inputdisabled="input-disabled" name="PrinciplePaid" value={inputDataReceipt.PrinciplePaid} onChange={handleInputDataReceipt}   />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label=""   inputdisabled="input-disabled"  name="InterestPaid" value={inputDataReceipt.InterestPaid} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label=""   inputdisabled="input-disabled"  name="OverdueInterest" value={inputDataReceipt.OverdueInterest} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ค่าปรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label=""   inputdisabled="input-disabled" name="Fines" value={inputDataReceipt.Fines} onChange={handleInputDataReceipt}   />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label=""   inputdisabled="input-disabled"  name="DueInterest" value={inputDataReceipt.DueInterest} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* <MuiRadioButton label="" lists={['คำสั่งศาล','แปลงหนี้','ภทต.']} value={inputData.typeBill} onChange={handleChangeTypeBill} type="row" /> */}
                                                </Grid>
                                                
                                            </Grid>
                                        </form>
                                    </Paper>

                                   
                                    <Grid container spacing={2} className="btn-row txt-center">
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="380px" onClick={()=>{setSuccess(true);}} />
                                        </Grid>
                                    </Grid>
                                
                                </Grid>
                            : null
                        }
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
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={confirm}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{confirmMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            &nbsp;&nbsp;
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
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
                            
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default RecordCloseOldContact
