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
        ReceiptID: null,// 1,
        LoanID: null,// 1,
        ReceiptNumber: null,// "sample string 2",
        ref_id1: null,// "sample string 3",
        Reccode: null,// "sample string 4",
        Mindex: null,// "sample string 5",
        Time: null,// 1,
        RecDate: moment().format("YYYY-MM-DD"),// "2021-09-06T16:44:46.2782029+07:00",
        ReceiptDate: moment().format("YYYY-MM-DD"),// "2021-09-06T16:44:46.279202+07:00",
        CalculateDate: moment().format("YYYY-MM-DD"),// "2021-09-06T16:44:46.279202+07:00",
        PaidDate: moment().format("YYYY-MM-DD"),// "2021-09-06T16:44:46.279202+07:00",
        PrincipleBalance1: null,// 1.1,
        PrincipleCalculate: null,// 1.1,
        PaidCalculate: null,// 1.1,
        PrinciplePaid: null,// 1.1,
        InterestPaid: null,// 1.1,
        OverdueInterest: null,// 1.1,
        DueInterest: null,// 1.1,
        Fines: null,// 1.1,
        Other: null,// 1.1,
        PrincipleBalance2: null,// 1.1,
        InterestBalance: null,// 1.1,
        ReceiveInterest: null,// 1.1,
        Type: null,// "sample string 6",
        ReceiptTypeID: null,// 1,
        PrincipleBalance3: null,// 1.1,
        PrincipleDuePaid: null,// 1.1,
        FinesInterest: null,// 1.1,
        FinesInterestDuePaid: null,// 1.1,
        TotalInterest: null,// 1.1,
        FinesOverdue: null,// 1.1,
        TotalPaid: null,// 1.1,
        PrincipleBalance4: null,// 1.1,
        Cancel: null,// true,
        ProvinceID: null,// 1,
        dCreated: null,// "2021-09-06T16:44:46.2822024+07:00",
        dUpdated: null,// "2021-09-06T16:44:46.2822024+07:00",
        admin_nMEMID: null,// 1
      })

    const [inputDataCloseContact, setInputDataCloseContact] = useState({
        CloseID: null, // 1,
        LoanID: null, // 1,
        FinesRate: null, // 1.1,
        CreateDate: null, // "2021-09-06T16:44:46.283203+07:00",
        Comment: null, // "sample string 2",
        ReceiptNumber: null, // "sample string 3",
        ReceiptDate: null, // "2021-09-06T16:44:46.283203+07:00",
        PrincipleBalance: null, // 1.1,
        PrinciplePaidCalculate: null, // 1.1,
        PaidCalculate: null, // 1.1,
        Principle: null, // 1.1,
        Interest: null, // 1.1,
        PendingInterest: null, // 1.1,
        Fines: null, // 1.1,
        ReceiveInterest: null, // 1.1,
        Types: null, // "sample string 4",
        PrincipleBalance2: null, // 1.1,
        DuePaid: null, // 1.1,
        Pending_Interest2: null, // 1.1,
        DueInterest: null, // 1.1,
        TotalInterest: null, // 1.1,
        PendingFines: null, // 1.1,
        TotalPaid: null, // 1.1,
        TotalBalance: null, // 1.1,
        dCreated: null, // "2021-09-06T16:44:46.2852027+07:00",
        dUpdated: null, // "2021-09-06T16:44:46.2862028+07:00",
        admin_nMEMID: null, // 1
    })

    const [inputDataBeforePay, setInputDataBeforePay] = useState([]
        // {
        //     Count: 0,
        //     Date: null, // "2021-09-09T00:00:00"
        //     Detail: '', // "วันที่คำนวน"
        //     FineKang: 0, // 344.76
        //     GetMoney1: 0, // 0
        //     GetmoneyFine: 0, // 0
        //     InterestKang2: 0, // 0
        //     InterestRate: 0, // 0
        //     Other: null, // null
        //     PAID: 0, // 0
        //     REC: 0, // 21
        //     StuckMoney: 0, // 0
        //     fine1: 0, // 0
        //     fine2: 0, // 0
        //     interest1: 0, // 0
        //     interestKang: 0, // 0
        //     interestRub: 0, // 0
        //     principalBalance: 0, // 0
        //     principle1: 0, // 0
        //     principleRub: 0, // 0

        // }
    )

    const [radioType, setRadioType] = useState('')

    let dataCloseContactSelectArr = []; 

    const [inputDataCloseContactSelect, setInputDataCloseContactSelect] = useState({
        // rec: inputDataBeforePay[inputDataBeforePay.length - 1].REC,
        principleBalance: 0,
        principle1: 0,
        interestKang2_first: 0,
        interestKang2_last: 0,
        interestKang2_result: 0,
        finekang: 0,
        allpay: 0,
    })

    const [inputSelectDate, setInputSelectDate] = useState({
        recdatedd: moment().format("YYYY-MM-DD").substring(8,10),
        recdatemm: moment().format("YYYY-MM-DD").substring(5,7),
        recdateyyyy: (Number(moment().format("YYYY-MM-DD").substring(0,4)) + 543).toString(),

        loanreceiptdatedd: '00',
        loanreceiptdatemm: '00',
        loanreceiptdateyyyy: '0000',

        loandatedd: '00',
        loandatemm: '00',
        loandateyyyy: '0000',

        // createdatedd: '00',
        // createdatemm: '00',
        // createdateyyyy: '0000',

        createdatedd: moment().format("YYYY-MM-DD").substring(8,10),
        createdatemm: moment().format("YYYY-MM-DD").substring(5,7),
        createdateyyyy: (Number(moment().format("YYYY-MM-DD").substring(0,4)) + 543).toString(),

        receiptdatedd: '00',
        receiptdatemm: '00',
        receiptdateyyyyy: '0000',

    })

    const [inputDataSearch, setInputDataSearch] = useState({
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
     const handleChangeReceiptTypeID = (event) => {
         setRadioType(event.target.value)

         let type = event.target.value === '2' ? 'กทด.' : event.target.value === '1' ? 'ปน.' : 'ปน.ศาล'
        //  let typeFull = event.target.value === '2' ? 'กทด.' : event.target.name === '1' ? 'แปลงหนี้' : 'คำสั่งศาล'
        setInputDataReceipt({...inputDataReceipt,
            // [event.target.name]: event.target.value,
            ReceiptNumber: type + getSelectData.LoanNumber
        })
        console.log('typeBill ',event.target.value,':',type + getSelectData.LoanNumber)
    };
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

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleInputDataCloseContact = (event) => {
        setInputDataCloseContact({
            ...inputDataCloseContact,
            [event.target.name]: Number(event.target.value)
        })
    }

    const handleInputDataCloseContactSelect = (event) => {
        setInputDataCloseContactSelect({
            ...inputDataCloseContactSelect,
            [event.target.name]: Number(event.target.value)
        })
    }

    const handleInputDataReceipt = (event) => {
        // console.log(event.target.name, event.target.value)
        setInputDataReceipt({
            ...inputDataReceipt,
            [event.target.name]: Number(event.target.value)
        })
    }

    const handleInsertValue = (event) => {
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
                Date: inputDataReceipt.RecDate
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
                
                getProcessBeforePay(loanNumber, )
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getProcessBeforePay = (loanNumber, rentNo, date) => {
        setIsLoading(true);
        // setRows([])
        setFormField(true)

        axios.post(
            `${server_spkapi}/CloseContact/GetProcessBeforePay`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: loanNumber,
                Rentno:  loanNumber,
                Fullname: "",
                Date: inputDataReceipt.RecDate
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

                let dataBeforepay = data
                console.log(dataBeforepay)
                setInputDataBeforePay(dataBeforepay[0])
                dataCloseContactSelectArr = dataBeforepay

                let interestKang2result = Number((dataBeforepay[dataBeforepay.length - 1].InterestKang2) - (dataBeforepay[dataBeforepay.length - 2].InterestKang2) <= 0? 0 : (dataBeforepay[dataBeforepay.length - 1].InterestKang2) - (dataBeforepay[dataBeforepay.length - 2].InterestKang2))

                if(dataBeforepay.length === 0) {
                    setInputDataCloseContactSelect({
                        ...inputDataCloseContactSelect,
                        principleBalance: 0,
                        principle1: 0,
                        interestKang2_first: 0,
                        interestKang2_last: 0,
                        interestKang2_result: 0,
                        finekang: 0,
                        allpay: 0,
                    })
                } else if(dataBeforepay.length === 1) {
                    setInputDataCloseContactSelect({
                        ...inputDataCloseContactSelect,
                        principleBalance: Number(dataBeforepay[0].principalBalance),
                        principle1: Number(dataBeforepay[0].principle1),
                        interestKang2_first: 0,
                        interestKang2_last: Number(dataBeforepay[0].InterestKang2),
                        interestKang2_result: Number((dataBeforepay[0].InterestKang2 - 0)),
                        finekang: Number(dataBeforepay[0].FineKang),
                        allpay: Number(dataBeforepay[0].StuckMoney + dataBeforepay[0].InterestKang2 + dataBeforepay[dataBeforepay.length - 1].FineKang),
                    })
                } else {
                    setInputDataCloseContactSelect({
                        ...inputDataCloseContactSelect,
                        principleBalance: Number(dataBeforepay[dataBeforepay.length - 1].principalBalance),
                        principle1: Number(dataBeforepay[dataBeforepay.length - 1].principle1),
                        interestKang2_first: Number(dataBeforepay[dataBeforepay.length - 2].InterestKang2),
                        interestKang2_last: Number(dataBeforepay[dataBeforepay.length - 1].InterestKang2),
                        interestKang2_result: interestKang2result,
                        finekang: Number(dataBeforepay[dataBeforepay.length - 1].FineKang),
                        allpay: Number(dataBeforepay[dataBeforepay.length - 1].StuckMoney + dataBeforepay[dataBeforepay.length - 1].InterestKang2 + dataBeforepay[dataBeforepay.length - 1].FineKang),
                    })
                }

                
                
                
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const clearCalc = () => {
        setInputDataReceipt({
            ...inputDataReceipt,
            TotalPaid: 0,
            InterestPaid: 0,
            OverdueInterest: 0,
            DueInterest: 0,
            Fines: 0,
        })
    }



    const calcPrinciplePaid = () => {
        // clearCalc()

        console.log('inputDataCloseContactSelect',inputDataCloseContactSelect)

        let parsePrinciplePaid = inputDataReceipt.PrinciplePaid
        let parseTotalPaid = inputDataReceipt.TotalPaid
        let parseInterestKang2_first = inputDataCloseContactSelect.interestKang2_first
        let parseInterestKang2_last = inputDataCloseContactSelect.interestKang2_last
        let parseInterestKang2_result = inputDataCloseContactSelect.interestKang2_result
        let parseFinekang = inputDataCloseContactSelect.finekang

        // console.log('parseFloat',parsePrinciplePaid, parseTotalPaid, parseInterestKang2_first, parseInterestKang2_last, parseInterestKang2_result, parseFinekang)
        // console.log(inputDataReceipt.PrinciplePaid, inputDataReceipt.TotalPaid, inputDataCloseContactSelect.interestKang2_first, inputDataCloseContactSelect.interestKang2_last, inputDataCloseContactSelect.interestKang2_result, inputDataCloseContactSelect.finekang)


        let totalpaid = Number(inputDataReceipt.PrinciplePaid) + parseInterestKang2_last + parseFinekang
        let interestpaid = parseInterestKang2_last <= 0 ? 0 : parseInterestKang2_last
        let overdueinterest = parseInterestKang2_first <= 0 ? 0 : parseInterestKang2_first
        let dueinterest = parseInterestKang2_result <= 0 ? 0 : parseInterestKang2_result
        let fines = parseFinekang <= 0 ? 0 : parseFinekang

        setInputDataReceipt({
            ...inputDataReceipt,
            PrinciplePaid: Number(parsePrinciplePaid),
            TotalPaid: Number(totalpaid) ,
            InterestPaid: Number(interestpaid) ,
            OverdueInterest: Number(overdueinterest) ,
            DueInterest: Number(dueinterest) ,
            Fines: Number(fines) ,
        })
    }

    const calcTotalPaid = () => {
        // clearCalc()

        // let parsePrinciplePaid = parseFloat(inputDataReceipt.PrinciplePaid)
        let parseTotalPaid = inputDataReceipt.TotalPaid
        let parseInterestKang2_first = inputDataCloseContactSelect.interestKang2_first
        // let parseInterestKang2_last = parseFloat(inputDataCloseContactSelect.interestKang2_last)
        let parseInterestKang2_result = inputDataCloseContactSelect.interestKang2_result
        let parseFinekang = inputDataCloseContactSelect.finekang

        // console.log('parseFloat',parsePrinciplePaid, parseTotalPaid, parseInterestKang2_first, parseInterestKang2_last, parseInterestKang2_result, parseFinekang)
        // console.log(inputDataReceipt.PrinciplePaid, inputDataReceipt.TotalPaid, inputDataCloseContactSelect.interestKang2_first, inputDataCloseContactSelect.interestKang2_last, inputDataCloseContactSelect.interestKang2_result, inputDataCloseContactSelect.finekang)

         /* 
            x = inputDataReceipt.TotalPaid
            zz = inputDataCloseContactSelect.interestKang2_first
            II = inputDataCloseContactSelect.interestKang2_result

            z = step1
            I = step2
            Y = step3
            P = x - z - I
        */

        // step1 = (x > zz) ? zz : x
        let step1 = parseTotalPaid > parseInterestKang2_first ? parseInterestKang2_first : parseTotalPaid
        // step2 = (z > 0 & z > II) ? II : x-z 
        let step2 = step1 > 0 && step1 > parseInterestKang2_result ? parseInterestKang2_result : parseTotalPaid - step1
        // step3 = z+I
        let step3 = step1 + step2
        // step4 = x - z -I
        let step4 = parseTotalPaid - step1 - step2

        // let fines = inputDataCloseContactSelect.finekang <= 0 ? 0 : inputDataCloseContactSelect.finekang

        setInputDataReceipt({
            ...inputDataReceipt,
            PrinciplePaid: step4 <= 0 ? 0 : step4,
            TotalPaid: parseTotalPaid <= 0 ? 0 : parseTotalPaid,
            InterestPaid: step3 <= 0 ? 0 : step3,
            OverdueInterest: step1 <= 0 ? 0 : step1,
            DueInterest: step2 <= 0 ? 0 : step2,
            Fines: parseFinekang <= 0 ? 0 : parseFinekang,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        validateValue('ReceiptTypeID',radioType,'* กรุณาเลือกประเภท')

        console.log('inputDataReceipt',inputDataReceipt)
        console.log('inputDataCloseContact',inputDataCloseContact)

        setInputDataReceipt({
            ...inputDataReceipt,
            // LoanID: 12324
        })
        
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

    const validateValue = (id,val,msg) => {
        // let value = document.getElementById(id).value;
        let value = val
        console.warn(value)
        let lengthTxtErr = document.querySelectorAll("#"+id+" > p").length
        
        var para = document.createElement("P")
        var txt = document.createTextNode(msg);  
        para.appendChild(txt);  
        para.setAttribute('id',id+'-txt-err')   
        para.setAttribute('class','txt-err')   

        if(value === null || value === undefined || value === 0 || value === '' || isNaN(value)) {
            console.log('append err')  
            if(!lengthTxtErr) {
                document.getElementById(id).appendChild(para);  
            }
        } else {
            if(lengthTxtErr) {
                document.getElementById(id+'-txt-err').remove();
            }
            console.log('remove err')
        }
    }


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
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="Fullname" value={inputDataSearch.Fullname} onChange={handleInputDataSearch} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
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
                                                        <MuiSelectDay label="" inputdisabled="input-disabled"  name="dd" value={inputSelectDate.recdatedd} onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" inputdisabled="input-disabled"  name="mm" value={inputSelectDate.recdatemm} onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" inputdisabled="input-disabled"  name="yyyy" value={inputSelectDate.recdateyyyy} onChange={handleSelectDate} />
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
                                                        <MuiSelectDay label="" name="dd" inputdisabled="input-disabled" value={inputSelectDate.createdatedd} onChange={handleSelectDate} />
                                                        <MuiSelectMonth label="" name="mm" inputdisabled="input-disabled" value={inputSelectDate.createdatemm} onChange={handleSelectDate} />
                                                        <MuiSelectYear label="" name="yyyy" inputdisabled="input-disabled" value={inputSelectDate.createdateyyyy} onChange={handleSelectDate} />
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
                                                    <h1 className="paper-head-green">ประมวลผลก่อนปรับปรุงหนี้ {inputDataCloseContactSelect.rec}</h1>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="principleBalance" value={inputDataCloseContactSelect.principleBalance} onChange={handleInputDataCloseContact} />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="principle1" value={inputDataCloseContactSelect.principle1} onChange={handleInputDataCloseContactSelect} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  name="interestKang2_first" value={inputDataCloseContactSelect.interestKang2_first}  onChange={handleInputDataCloseContactSelect} />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  name="interestKang2_last" value={inputDataCloseContactSelect.interestKang2_last}  onChange={handleInputDataCloseContactSelect} />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  name="interestKang2_result" value={inputDataCloseContactSelect.interestKang2_result}  onChange={handleInputDataCloseContactSelect} />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  name="finekang" value={inputDataCloseContactSelect.finekang}  onChange={handleInputDataCloseContactSelect} />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="allpay" value={inputDataCloseContactSelect.allpay}  onChange={handleInputDataCloseContactSelect}  />
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
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label=""  name="principleBalance" value={inputDataCloseContactSelect.principleBalance} onChange={handleInputDataCloseContactSelect} />
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
                                                            <MuiTextfieldCurrency label="" textAlign="right" inputdisabled="input-disabled" name="PrincipleBalance" value={inputDataCloseContactSelect.principleBalance} onChange={handleInputDataReceipt} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right txt-purple">จำนวนเงินต้นที่ชำระ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right" name="PrinciplePaid" value={inputDataReceipt.PrinciplePaid} onChange={handleInsertValue} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <ButtonFluidPrimary label="คำนวณเงินชำระ" onClick={calcPrinciplePaid} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right txt-blue">จำนวนเงินที่ชำระ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4} style={{position: 'relative'}}>
                                                            <MuiTextfieldCurrency label="" textAlign="right" name="TotalPaid" value={inputDataReceipt.TotalPaid} onChange={handleInsertValue} />
                                                            <MuiTextfieldCurrency style={{visibility: 'hidden', position: 'absolute', zIndex: '-1'}} label="" textAlign="right" name="TotalPaid" value={inputDataReceipt.TotalPaid} onChange={handleInputDataReceipt} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" onClick={calcTotalPaid}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">เงินต้น</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right" inputdisabled="input-disabled" name="PrinciplePaid" value={inputDataReceipt.PrinciplePaid} onChange={handleInputDataReceipt}   />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right"   inputdisabled="input-disabled"  name="InterestPaid" value={inputDataReceipt.InterestPaid} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right"   inputdisabled="input-disabled"  name="OverdueInterest" value={inputDataReceipt.OverdueInterest} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ค่าปรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right"   inputdisabled="input-disabled" name="Fines" value={inputDataReceipt.Fines} onChange={handleInputDataReceipt}   />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">ดอกเบี้ยรับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldCurrency label="" textAlign="right"   inputdisabled="input-disabled"  name="DueInterest" value={inputDataReceipt.DueInterest} onChange={handleInputDataReceipt}  />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                        <Grid item xs={12} md={4}>
                                                            <p className="paper-p txt-right">&nbsp;</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4} id="ReceiptTypeID">
                                                            <MuiRadioButton label="" lists={['คำสั่งศาล','แปลงหนี้','กทด.']} name="ReceiptTypeID" value={radioType} onChange={handleChangeReceiptTypeID} type="row" />
                                                        </Grid>
                                                    </Grid></Grid>
                                                
                                            </Grid>
                                        </form>
                                    </Paper>

                                   
                                    <Grid container spacing={2} className="btn-row txt-center">
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="380px" onClick={handleSubmit} />
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
