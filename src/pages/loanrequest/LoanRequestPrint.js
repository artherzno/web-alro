import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

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
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiTextfieldCurrency,
    MuiSelectObj,
    MuiLabelHeader,
    MuiTextfieldEndAdornment,
    MuiLabelHeaderCheckbox,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonNormalIconStartPrimary,
    ButtonFluidOutlineSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

let action = 'add';
let action_loanstatus = 'draft';

function LoanRequestPrint(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    // const [action, setAction] = useState('add');
    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState('เมื่อยืนยันสร้างสัญญาเรียบร้อย ไม่สามารถแก้ไขสัญญาได้')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [inputDataSearch, setInputDataSearch] = useState({
        SearchByApplicantNo: '',
        SearchByLoanNumber: '',
        SearchByName: '',
    })
    const [applicantNo, setApplicantNo] = useState('')
    const [loanID, setLoanID] = useState('')
    const [inputDataFarmer, setInputDataFarmer] = useState([])
    const [inputDataLand, setInputDataLand] = useState([])
    const [inputData, setInputData] = useState([])
    const [inputDataSubmit, setInputDataSubmit] = useState({
        ApplicantID: '', // 1,
        LoanDate: null, // "",
        RecordCode: '', // "",
        RecDate: null, // "",
        FarmerID: '', // "",
        AGE: '', // "",
        Nationality: '',
        IDCardMadeDistrict: '', // "",
        IDCardMadeProvince: '0', // "",
        FarmerInDistrict: '', // "",
        FarmerInProvince: '0', // "",
        Officer: '', // "",
        OfficerRank: '', // "",
        SPK_Order: '', // "",
        SPK_OrderDate: null, // "",
        Loan_Obj1: '', // "",
        Loan_Obj1Amount: 0, // "",
        Loan_Obj2: '', // "",
        Loan_Obj2Amount: 0, // "",
        Loan_Obj3: '', // "",
        Loan_Obj3Amount: 0, // "",
        Loan_Installment1: 0, // "",
        Loan_Installment2: 0, // "",
        Loan_Installment3: 0, // "",
        Loan_Installment4: 0, // "",
        Loan_Installment5: 0, // "",
        Farmer_Accept: '', // "",
        Guarantee_Property: '', // "",
        LoanContactBook: '', // "",
        Guarantee_PropertyDate: null, // "",
        Guarantee_Person: '', // "",
        LoanGuaranteeBook: '', // "",
        LoanGuaranteeBookDate: null, // "null",
        WarrantBookOwner1: '', // "",
        WarrantBook1: '', // "",
        WarrantBookDate1: null, // "null",
        WarrantBookOwner2: '', // "",
        WarrantBook2: '', // "",
        WarrantBookDate2: null, // "null",
        Free_of_debt_Month: '', // "",
        Free_of_debt_Year: '', // "",
        Free_of_debt_Time: 0, // "",
        FirstDatePaid: null, // "null",
        principle: '', // 123,
        Interest: 0, // 4,
        ChargeRate: '', // "",
        LastDatePaid: null, // "null",
        OfficeProvince: '', // "",
        WitnessName: '', // "",
        WitnessAddr: '', // "",
        WitnessIDCard: '', // "",
        WitnessIDCardMade: '', // "",
        WitnessName2: '', // "",
        WitnessAddr2: '', // "",
        WitnessIDCard2: '', // "",
        WitnessIDCardMade2: '', // "",
        ChangeContactCommit: '', // "",
        ChangeContactCommitDate: null, // "",
        ChangeContactCommitTime: '', // "",
        Overdue_debt: '', // "",
        Overdue_debt_principle: '', // "",
        Overdue_debt_interest: '', // "",
        PaidOverdue_debt_principle_Interest: '', // "",
        PaidYear: '', // "",
        PaidTime_month: '', // "",
        TotalPaidTime: '', // "",
        LoanTypeID: '', // "",
        LoanStatus: '',
        projectID: '', // "",
        Projectcode: '', // "",
        ProjectName: '', // "",
        Obj: '', // "",
        LoanCost: '', // "",
        FarmArea_Rai: '', // "",
        Plant_Type: '', // "",
        YearProductPer_Rai: '', // "",
        Total_Year_cost: '', // "",
        YearInterest: '', // "",
        Debt: '', // "",
        DebtWith: '', // "",
        DebtCost: '', // "",
        LoanDocPatch: '', // "",
        LoanStatusID: '', // "",
        Status: '', // "",
        ProvinceID: '', // "",
        IDCard: '', // "",
    })

    const [loandue_data1, setLoandue_data1] = useState({
        DUEDATE: null,
        PAYREC: ''
    });
    const [loandue_data2, setLoandue_data2] = useState({
        DUEDATE: null,
        PAYREC: ''
    });
    const [loandue_data3, setLoandue_data3] = useState({
        DUEDATE: null,
        PAYREC: ''
    });
    const [loandue_data4, setLoandue_data4] = useState({
        DUEDATE: null,
        PAYREC: ''
    });
    const [loandue_data5, setLoandue_data5] = useState({
        DUEDATE: null,
        PAYREC: ''
    });

    const [Free_of_debt, setFree_of_debt] = useState('0')

    const [tableResult, setTableResult] = useState({})
    const [openLoanRequestInfo, setOpenLoanRequestInfo] = useState(false)

    const [provinceList, setprovinceList] = useState(['กรุณาเลือกจังหวัด']);
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))

    const [confirmSuccessStep1, setConfirmSuccessStep1] = useState(false)
    const [confirmSuccessStep2, setConfirmSuccessStep2] = useState(false)

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


    const getSearchApprovedApplicant = () => {
        axios.post(
            `${server_hostname}/admin/api/search_approved_applicant`, {
                ApplicantNo: parseInt(inputDataSearch.SearchByApplicantNo) || '',
                LoanNumber: inputDataSearch.SearchByLoanNumber || '',
                Name: inputDataSearch.SearchByName || '',
            }, { headers: { "token": token } } 
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
                    setTableResult(data.data)
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getDataApprovedApplicant = (applicantID, farmerID, applicantNo) => {
        setIsLoading(true);
        axios.post(
            `${server_hostname}/admin/api/get_approved_applicant`, {
                ApplicantID: applicantID,
            }, { headers: { "token": token } } 
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

                    let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
                    setprovinceList(dataProvinceList)

                    setOpenLoanRequestInfo(true);
                    console.log(data.Farmer[0])
                    console.log('action',action)
                    if(action === 'add') {
                        // Action : Add
                        setInputDataFarmer(data.Farmer[0])
                        setInputDataLand(data.Land[0])
                        setInputData(data.data[0])
                        setIsLoading(false);
                        setApplicantNo(applicantNo);
                        setInputDataSubmit({
                            ...inputDataSubmit, 
                            FarmerID: farmerID,
                            ApplicantID: applicantID
                        })

                        // Clear Field
                        handleClearForm();
                    } else {
                        // Action : Edit
                        setInputDataFarmer(data.Farmer[0])
                        setInputDataLand(data.Land[0])
                        setInputData(data.data[0])
                        setApplicantNo(applicantNo);
                        setIsLoading(false);
                    }
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }


    const getViewDataApprovedApplicant = (applicantID, farmerID, applicantNo,loanID) => {
        setIsLoading(true);
        axios.post(
            `${server_hostname}/admin/api/view_loanrec`, {
                LoanID: loanID,
            }, { headers: { "token": token } } 
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
                    console.log(data.results[0])
                    setOpenLoanRequestInfo(true);
                    setIsLoading(false);
                    // getDataApprovedApplicant(applicantID, farmerID, applicantNo)
                    // setInputDataSubmit(data.results[0])
                    setInputDataSubmit({
                        ...data.results[0], 
                        FarmerID: farmerID,
                        ApplicantID: applicantID,
                    })
                    setLoanID(loanID)

                    // Insert Radio Free_of_debt
                    data.results[0].Free_of_debt_Month ? setFree_of_debt('0') : setFree_of_debt('1')

                    // console.warn(data.loandue_data.length)
                    for(let i=0; i<data.loandue_data.length; i++) {

                        if(i===0) {
                            setLoandue_data1({
                                DUEDATE: data.loandue_data[0].DUEDATE,
                                PAYREC:  data.loandue_data[0].PAYREC
                            })
                        }
                        if(i===1) {
                            setLoandue_data2({
                                DUEDATE: data.loandue_data[1].DUEDATE,
                                PAYREC:  data.loandue_data[1].PAYREC
                            })
                        }
                        if(i===2) {
                            setLoandue_data3({
                                DUEDATE: data.loandue_data[2].DUEDATE,
                                PAYREC:  data.loandue_data[2].PAYREC
                            })
                        }
                        if(i===3) {
                            setLoandue_data4({
                                DUEDATE: data.loandue_data[3].DUEDATE,
                                PAYREC:  data.loandue_data[3].PAYREC
                            })
                        }
                        if(i===4) {
                            setLoandue_data5({
                                DUEDATE: data.loandue_data[4].DUEDATE,
                                PAYREC:  data.loandue_data[4].PAYREC
                            })
                        }

                    }

                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleInputLoanDueDataPay= (event) => {
        if(event.target.id === 'loandue_data1') {
            setLoandue_data1({...loandue_data1, PAYREC: event.target.value.split(',').join('')})
        } else if(event.target.id === 'loandue_data2') {
            setLoandue_data2({...loandue_data2, PAYREC: event.target.value.split(',').join('')})
        } else if(event.target.id === 'loandue_data3') {
            setLoandue_data3({...loandue_data3, PAYREC: event.target.value.split(',').join('')})
        } else if(event.target.id === 'loandue_data4') {
            setLoandue_data4({...loandue_data4, PAYREC: event.target.value.split(',').join('')})
        } else if(event.target.id === 'loandue_data5') {
            setLoandue_data5({...loandue_data5, PAYREC: event.target.value.split(',').join('')})
        }
    }

    const handleInputFreeofDebt = (event) => {
        setInputDataSubmit({
            ...inputDataSubmit,
            Free_of_debt_Month: '',
            Free_of_debt_Year: '',
        })
        // console.log('Free_of_debt',event.target.value);
        setFree_of_debt(event.target.value)
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

    const handleInputDataFarmer = (event) => {
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
    }

    const handleInputDataSubmit = (event) => {
        // console.log('event.target.id',event.target.id)
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputDataSubmit({
                    ...inputDataSubmit,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'age' || typeNumber === 'year') {
                event.target.value = event.target.value.toString().slice(0, 3)
                setInputDataSubmit({
                    ...inputDataSubmit,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputDataSubmit({
                    ...inputDataSubmit,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputDataSubmit({
                    ...inputDataSubmit,
                    [event.target.name]: event.target.value
                })

            } else {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputDataSubmit({
                ...inputDataSubmit,
                [event.target.name]: event.target.value
            })
        }
        // console.log(event)
    }

    const handleSubmit = (event, loanstatus) => {
        action_loanstatus = loanstatus;
        event.preventDefault();

        let loanrequestprint = document.getElementById('loanrequestprint');
        let formData = new FormData(loanrequestprint);
        formData.delete('Free_of_debt')
        formData.delete('LoanPeriodCode')

        formData.append('FarmerID', inputDataSubmit.FarmerID)
        formData.append('ApplicantID', inputDataSubmit.ApplicantID)
        formData.append('LoanStatus', action_loanstatus)

        formData.append('LoanDate', inputDataSubmit.LoanDate === 'Invalid date' || inputDataSubmit.LoanDate === null ? null : moment(inputDataSubmit.LoanDate).format('YYYY-MM-DD'))
        formData.append('RecDate', inputDataSubmit.RecDate === 'Invalid date' || inputDataSubmit.RecDate === null ? null : moment(inputDataSubmit.RecDate).format('YYYY-MM-DD'))
        formData.append('SPK_OrderDate', inputDataSubmit.SPK_OrderDate === 'Invalid date' || inputDataSubmit.SPK_OrderDate === null ? null : moment(inputDataSubmit.SPK_OrderDate).format('YYYY-MM-DD'))
        formData.append('Guarantee_PropertyDate', inputDataSubmit.Guarantee_PropertyDate === 'Invalid date' || inputDataSubmit.Guarantee_PropertyDate === null ? null : moment(inputDataSubmit.Guarantee_PropertyDate).format('YYYY-MM-DD'))
        formData.append('LoanGuaranteeBookDate', inputDataSubmit.LoanGuaranteeBookDate === 'Invalid date' || inputDataSubmit.LoanGuaranteeBookDate === null ? null : moment(inputDataSubmit.LoanGuaranteeBookDate).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate1', inputDataSubmit.WarrantBookDate1 === 'Invalid date' || inputDataSubmit.WarrantBookDate1 === null ? null : moment(inputDataSubmit.WarrantBookDate1).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate2', inputDataSubmit.WarrantBookDate2 === 'Invalid date' || inputDataSubmit.WarrantBookDate2 === null ? null : moment(inputDataSubmit.WarrantBookDate2).format('YYYY-MM-DD'))
        formData.append('FirstDatePaid', inputDataSubmit.FirstDatePaid === 'Invalid date' || inputDataSubmit.FirstDatePaid === null ? null : moment(inputDataSubmit.FirstDatePaid).format('YYYY-MM-DD'))
        formData.append('LastDatePaid', inputDataSubmit.ChangeContactLastDatePaidCommitDate === 'Invalid date' || inputDataSubmit.LastDatePaid === null ? null : moment(inputDataSubmit.LastDatePaid).format('YYYY-MM-DD'))
        formData.append('ChangeContactCommitDate', inputDataSubmit.ChangeContactCommitDate === 'Invalid date' || inputDataSubmit.ChangeContactCommitDate === null ? null : moment(inputDataSubmit.ChangeContactCommitDate).format('YYYY-MM-DD'))

        //Loan_Obj1Amount
        let Loan_Obj1Amount_value = inputDataSubmit.Loan_Obj1Amount.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Obj1Amount', parseFloat(Loan_Obj1Amount_value.split(',').join('')))
        let Loan_Obj2Amount_value = inputDataSubmit.Loan_Obj2Amount.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Obj2Amount', parseFloat(Loan_Obj2Amount_value.split(',').join('')))
        let Loan_Obj3Amount_value = inputDataSubmit.Loan_Obj3Amount.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Obj3Amount', parseFloat(Loan_Obj3Amount_value.split(',').join('')))
        
        let Loan_Installment1_value = inputDataSubmit.Loan_Installment1.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Installment1', parseFloat(Loan_Installment1_value.split(',').join('')))
        let Loan_Installment2_value = inputDataSubmit.Loan_Installment2.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Installment2', parseFloat(Loan_Installment2_value.split(',').join('')))
        let Loan_Installment3_value = inputDataSubmit.Loan_Installment3.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Installment3', parseFloat(Loan_Installment3_value.split(',').join('')))
        let Loan_Installment4_value = inputDataSubmit.Loan_Installment4.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Installment4', parseFloat(Loan_Installment4_value.split(',').join('')))
        let Loan_Installment5_value = inputDataSubmit.Loan_Installment5.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Loan_Installment5', parseFloat(Loan_Installment5_value.split(',').join('')))

        let Free_of_debt_Time_value = inputDataSubmit.Free_of_debt_Time.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Free_of_debt_Time', parseFloat(Free_of_debt_Time_value.split(',').join('')))

        let Interest_value = inputDataSubmit.Interest.toLocaleString('en-US', {minimumFractionDigits: 2})
        formData.set('Interest', parseFloat(Interest_value.split(',').join('')))

        let loandueDataArr = [];
        loandueDataArr.push(loandue_data1);
        if(parseInt(inputData.LoanPeriodCode) >= 1) {
            loandueDataArr.push(loandue_data2);
            loandueDataArr.push(loandue_data3);
        }
        if(parseInt(inputData.LoanPeriodCode) >= 2) {
            loandueDataArr.push(loandue_data4);
            loandueDataArr.push(loandue_data5);
        }
        formData.append('loandue_data', JSON.stringify(loandueDataArr));
        let url = '';
        console.log('action_loanstatus',action_loanstatus)
        if(action==='edit') {
            formData.append('LoanID', loanID)
            url = `${server_hostname}/admin/api/edit_loanrec`
        } else {
            url =`${server_hostname}/admin/api/add_loanrec`
        } 
        console.log(action,'|', action_loanstatus,'|', url.toString())
        axios.post(
            url, formData, { headers: { "token": token } } 
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
                    setSuccess(true);
                    setSuccessMsg('บันทึกข้อมูลเรียบร้อย')
                    setConfirmSuccessStep1(true)
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
      };

    const handleClearForm = () => {

       setInputDataSubmit({

        ...inputDataSubmit,
        ApplicantID: '', // 1,
        LoanDate: null, // "",
        RecordCode: '', // "",
        RecDate: null, // "",
        FarmerID: '', // "",
        AGE: '', // "",
        Nationality: '',
        IDCardMadeDistrict: '', // "",
        IDCardMadeProvince: '0', // "",
        FarmerInDistrict: '', // "",
        FarmerInProvince: '0', // "",
        Officer: '', // "",
        OfficerRank: '', // "",
        SPK_Order: '', // "",
        SPK_OrderDate: null, // "",
        Loan_Obj1: '', // "",
        Loan_Obj1Amount: 0, // "",
        Loan_Obj2: '', // "",
        Loan_Obj2Amount: 0, // "",
        Loan_Obj3: '', // "",
        Loan_Obj3Amount: 0, // "",
        Loan_Installment1: 0, // "",
        Loan_Installment2: 0, // "",
        Loan_Installment3: 0, // "",
        Loan_Installment4: 0, // "",
        Loan_Installment5: 0, // "",
        Farmer_Accept: '', // "",
        Guarantee_Property: '', // "",
        LoanContactBook: '', // "",
        Guarantee_PropertyDate: null, // "",
        Guarantee_Person: '', // "",
        LoanGuaranteeBook: '', // "",
        LoanGuaranteeBookDate: null, // "null",
        WarrantBookOwner1: '', // "",
        WarrantBook1: '', // "",
        WarrantBookDate1: null, // "null",
        WarrantBookOwner2: '', // "",
        WarrantBook2: '', // "",
        WarrantBookDate2: null, // "null",
        Free_of_debt_Month: '', // "",
        Free_of_debt_Year: '', // "",
        Free_of_debt_Time: 0, // "",
        FirstDatePaid: null, // "null",
        principle: '', // 123,
        Interest: 0, // 4,
        ChargeRate: '', // "",
        LastDatePaid: null, // "null",
        OfficeProvince: '', // "",
        WitnessName: '', // "",
        WitnessAddr: '', // "",
        WitnessIDCard: '', // "",
        WitnessIDCardMade: '', // "",
        WitnessName2: '', // "",
        WitnessAddr2: '', // "",
        WitnessIDCard2: '', // "",
        WitnessIDCardMade2: '', // "",
        ChangeContactCommit: '', // "",
        ChangeContactCommitDate: null, // "",
        ChangeContactCommitTime: '', // "",
        Overdue_debt: '', // "",
        Overdue_debt_principle: '', // "",
        Overdue_debt_interest: '', // "",
        PaidOverdue_debt_principle_Interest: '', // "",
        PaidYear: '', // "",
        PaidTime_month: '', // "",
        TotalPaidTime: '', // "",
        LoanTypeID: '', // "",
        LoanStatus: '',
        projectID: '', // "",
        Projectcode: '', // "",
        ProjectName: '', // "",
        Obj: '', // "",
        LoanCost: '', // "",
        FarmArea_Rai: '', // "",
        Plant_Type: '', // "",
        YearProductPer_Rai: '', // "",
        Total_Year_cost: '', // "",
        YearInterest: '', // "",
        Debt: '', // "",
        DebtWith: '', // "",
        DebtCost: '', // "",
        LoanDocPatch: '', // "",
        LoanStatusID: '', // "",
        Status: '', // "",
        ProvinceID: '', // "",
        IDCard: '', // "",
       });
    }

    const gotoLoanRequestPrint = () => {
        setOpenLoanRequestInfo(true);
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        // history.push('/manageinfo/searchmember');

    };


    return (
        <div className="loanrequestprint-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>พิมพ์สัญญากู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" value={inputDataSearch.SearchByName} name="SearchByName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" value={inputDataSearch.SearchByApplicantNo} name="SearchByApplicantNo" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่คำขอกู้ยืมเงิน" value={inputDataSearch.SearchByLoanNumber} name="SearchByLoanNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchApprovedApplicant} />  
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                <TableCell align="center">วันที่บันทึก</TableCell>
                                                <TableCell align="center">เลขคำขอ</TableCell>
                                                <TableCell align="center">รหัสโครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                <TableCell align="center">วันที่กู้</TableCell>
                                                <TableCell align="center">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="center">คำนำหน้า</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">นามสกุล</TableCell>
                                                <TableCell align="center">ที่อยู่</TableCell>
                                                <TableCell align="center" className="sticky" style={{minWidth: '120px', width: '10em'}}>&nbsp;</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tableResult.length ? 
                                                        (rowsPerPage > 0
                                                            ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : tableResult
                                                        ).map((cell,i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="center">{cell.RecordCode}</TableCell>
                                                            <TableCell align="center">{cell.RecDate === null ? '' : moment(cell.RecDate).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="center">{cell.ApplicantNo}</TableCell>
                                                            <TableCell align="center">{cell.ProjectID === 0 ? '' : cell.ProjectID}</TableCell>
                                                            <TableCell align="center">{cell.ProjectName}</TableCell>
                                                            <TableCell align="center">{cell.LoanNumber}</TableCell>
                                                            <TableCell align="center">{cell.dCreated === null ? '' : moment(cell.dCreated).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="center">{cell.IDCard}</TableCell>
                                                            <TableCell align="center">{cell.FrontName}</TableCell>
                                                            <TableCell align="center">{cell.Name}</TableCell>
                                                            <TableCell align="center">{cell.Sirname}</TableCell>
                                                            <TableCell align="center">{cell.IDCARD_AddNo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddrSoiRoad} {cell.IDCARD_AddrDistrictName} {cell.IDCARD_AddrProvinceName} {cell.IDCARD_Postcode}</TableCell>
                                                            <TableCell align="center" className="sticky" style={{minWidth: '120px', width: '10em'}}>
                                                                {
                                                                    cell.LoanID === null ? 
                                                                    <ButtonFluidPrimary label="สร้าง" maxWidth="100px" onClick={(event)=>{action = 'add';getDataApprovedApplicant(cell.ApplicantID, cell.FarmerID, cell.ApplicantNo)}} />
                                                                    :
                                                                    <ButtonFluidPrimary label="แก้ไข" maxWidth="100px" onClick={(event)=>{action = 'edit'; getViewDataApprovedApplicant(cell.ApplicantID, cell.FarmerID, cell.ApplicantNo, cell.LoanID); getDataApprovedApplicant(cell.ApplicantID, cell.FarmerID, cell.ApplicantNo);}} />
                                                                
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={13} align="center">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                        component="div"
                                        count={tableResult.length || 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        isLoading ?
                        <div>
                            <p className="txt-center">...Loading...</p>
                        </div>
                        : ''
                    }
                    { 
                        openLoanRequestInfo && !isLoading ?
                            <React.Fragment>
                                <form id="loanrequestprint" className="root" noValidate autoComplete="off">
                                    <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} className="title-page"> 
                                                <h1 className="txt-green mg-b--20">สัญญากู้ยืมเงินจาก ส.ป.ก. (เลขคำขอ {applicantNo})</h1>
                                            </Grid>

                                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6} className="form-view">
                                                            <MuiRadioButton label="ประเภทเงินกู้" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} name="LoanPeriodCode"  value={parseInt(inputData.LoanPeriodCode)} onChange={handleInputData} type="row" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" value={inputDataFarmer.Name} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" value={inputDataFarmer.Sirname} onChange={handleInputDataFarmer}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="อายุ" id="no1-age" inputdisabled="input-disabled" name="AGE" value={inputDataFarmer.AGE} onInput={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="หมายเลขประจำตัว 13 หลัก" inputdisabled="input-disabled" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputDataFarmer.IDCard} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สถานที่ออกบัตร อำเภอ/เขต" name="IDCardMadeDistrict" value={inputDataSubmit.IDCardMadeDistrict} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince label="จังหวัด" lists={provinceList} name="IDCardMadeProvince" value={inputDataSubmit.IDCardMadeProvince} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญชาติ" name="Nationality" value={inputDataSubmit.Nationality} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield inputdisabled="input-disabled"  label="อยู่บ้านเลขที่"value={inputDataFarmer.IDCARD_AddNo} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield inputdisabled="input-disabled"  label="หมู่ที่" value={inputDataFarmer.IDCARD_AddMoo}  onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield inputdisabled="input-disabled"  label="ถนน/ซอย" value={inputDataFarmer.IDCARD_AddrSoiRoad}  onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" lists={subdistrictList} value={parseInt(inputDataFarmer.IDCARD_AddrSubdistrictID)}  onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" lists={districtList} value={parseInt(inputDataFarmer.IDCARD_AddrDistrictID)} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" lists={provinceList}  value={parseInt(inputDataFarmer.IDCARD_AddrProvinceID)} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ประกอบอาชีพเกษตรกรรมอยู่ในเขตปฏิรูปที่ดินอำเภอ" name="FarmerInDistrict" value={inputDataSubmit.FarmerInDistrict} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelectProvince label="จังหวัด" lists={provinceList} name="FarmerInProvince" value={inputDataSubmit.FarmerInProvince} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ได้ทำสัญญากู้ยืมเงินให้ไว้แก่ ส.ป.ก. โดย" name="Officer" value={inputDataSubmit.Officer} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ตำแหน่งปฏิรูปที่ดินจังหวัด"  name="OfficerRank" value={inputDataSubmit.OfficerRank} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่" name="SPK_Order" value={inputDataSubmit.SPK_Order} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่" name="LoanDate" value={inputDataSubmit.LoanDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>

                                            {/* Paper 2 - ข้อ1 -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 1</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeader label="ผู้กู้ตกลงกู้ และผู้ให้กู้ตกลงให้กู้เพื่อใช้จ่ายตามวัตถุประสงค์ต่อไปนี้" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ก" name="Loan_Obj1" value={inputDataSubmit.Loan_Obj1} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency  label="" name="Loan_Obj1Amount" value={inputDataSubmit.Loan_Obj1Amount}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiLabelHeader label="&nbsp;" />
                                                            <p className="paper-p">(หนึ่งหมื่นสองพันสามร้อยบาท)</p>
                                                        </Grid> */}
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ข" name="Loan_Obj2" value={inputDataSubmit.Loan_Obj2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency  label="" name="Loan_Obj2Amount" value={inputDataSubmit.Loan_Obj2Amount}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiLabelHeader label="&nbsp;" />
                                                            <p className="paper-p">&nbsp;</p>
                                                        </Grid> */}
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ค" name="Loan_Obj3" value={inputDataSubmit.Loan_Obj3} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency  label="" name="Loan_Obj3Amount" value={inputDataSubmit.Loan_Obj3Amount}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiLabelHeader label="&nbsp;" />
                                                            <p className="paper-p">&nbsp;</p>
                                                        </Grid> */}
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <p className="paper-p txt-right">รวมเป็นเงิน</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} className="loanrequestprint-objtotal">
                                                            {/* <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p> */}
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfieldCurrency label="" value={ 
                                                                        ((inputDataSubmit.Loan_Obj1Amount === 0 || inputDataSubmit.Loan_Obj1Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj1Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
                                                                        (inputDataSubmit.Loan_Obj2Amount === 0 || inputDataSubmit.Loan_Obj2Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj2Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                        (inputDataSubmit.Loan_Obj3Amount === 0 || inputDataSubmit.Loan_Obj3Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj3Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                    }  onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <p className="paper-p">(ห้าแสนบาท)</p>
                                                        </Grid> */}

                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeader label="ผู้ให้กู้ตกลงให้ผู้กู้ได้รับเงินกู้ตามวรรคแรกในคราวเดียวกันทั้งหมด หรือแบ่งให้เป็นงวดดังต่อไปนี้" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 1 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment1" value={inputDataSubmit.Loan_Installment1}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    <p>&nbsp;</p>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={5}>
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                                </Grid> */}
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 2 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment2" value={inputDataSubmit.Loan_Installment2}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    <p>&nbsp;</p>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={5}>
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                                </Grid> */}
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 3 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment3" value={inputDataSubmit.Loan_Installment3}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    <p>&nbsp;</p>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={5}>
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                                </Grid> */}
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 4 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment4" value={inputDataSubmit.Loan_Installment4}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    <p>&nbsp;</p>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={5}>
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                                </Grid> */}
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 5 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment5" value={inputDataSubmit.Loan_Installment5}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    <p>&nbsp;</p>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={5}>
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                                </Grid> */}
                                                                <Grid item xs={12} md={12}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={2}>
                                                                            {/* Field Text ---------------------------------------------------*/}
                                                                            <p className="paper-p">รวมเป็นเงิน</p>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={5} className="loanrequestprint-objtotal">
                                                                            {/* <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p> */}
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldCurrency label="" value={ 
                                                                                        ((inputDataSubmit.Loan_Installment1 === 0 || inputDataSubmit.Loan_Installment1 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (inputDataSubmit.Loan_Installment2 === 0 || inputDataSubmit.Loan_Installment2 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (inputDataSubmit.Loan_Installment3 === 0 || inputDataSubmit.Loan_Installment3 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
                                                                                        (inputDataSubmit.Loan_Installment4 === 0 || inputDataSubmit.Loan_Installment4 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment4.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (inputDataSubmit.Loan_Installment5 === 0 || inputDataSubmit.Loan_Installment5 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment5.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                                    }  onChange={handleInputData} />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={1} md={1}>
                                                                            <p className="paper-p">บาท</p>
                                                                        </Grid>
                                                                        {/* <Grid item xs={12} md={3}>
                                                                            <p className="paper-p">(ห้าแสนบาท)</p>
                                                                        </Grid> */}
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeader label="ผู้กู้ยินยอมรับ (เงิน/สิ่งของแทนตัวเงินมูลค่าเท่ากับจำนวนเงินที่ผู้ให้กู้จ่ายให้แก่ผู้กู้)" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="" name="Farmer_Accept" value={inputDataSubmit.Farmer_Accept}  onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>

                                            {/* Paper 3 - ข้อ2 -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 2</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeader label="ผู้กู้สัญญาว่าจะนำเงินกู้รายนี้ไปใช้จ่ายตามวัตถุประสงค์ที่ระบุตามข้อ 1 อย่างแท้จริงและจะปฏิบัติตามระเบียบคณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรมว่าด้วยหลักเกณฑ์ วิธีการ และเงื่อนไข การให้กู้ยืมแก่เกษตรกรและสถาบันเกษตรกรในเขตปฏิรูปที่ดิน และหรือ" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield inputdisabled="input-disabled" label="ตามคำสั่ง ส.ป.ก. ที่" value={inputDataSubmit.SPK_Order}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                    <MuiLabelHeader label="&nbsp;" />
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="&nbsp;" id="loanrequestcontact-step1-no3-no1-farmeraward2-input" defaultValue="" />
                                                                </Grid> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่" name="SPK_OrderDate" value={inputDataSubmit.SPK_OrderDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, SPK_OrderDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                            
                                            {/* Paper 4 - ข้อ3 -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 3</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeaderCheckbox label="ในการกู้เงินรายนี้ ผู้กู้ได้มอบหลักประกันดังต่อไปนี้" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield topic="ก." label="อสังหาริมทรัพย์ที่ปราศจากข้อผู้กพันใดๆ คือ" name="Guarantee_Property" value={inputDataSubmit.Guarantee_Property}  onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiLabelHeaderCheckbox label="นำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield label="" name="LoanContactBook" value={inputDataSubmit.LoanContactBook}  onChange={handleInputDataSubmit}/>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiDatePicker label="ลงวันที่" name="Guarantee_PropertyDate" value={inputDataSubmit.Guarantee_PropertyDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, Guarantee_PropertyDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeaderCheckbox topic="ข." label="หนังสือสัญญารับรองผูกพันคนรับผิดอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกร"/>
                                                        </Grid>
                                                        <Grid item xs={11} md={2}>
                                                            <p>รวม</p>
                                                            <MuiTextfieldCurrency  label="" name="Guarantee_Person" value={inputDataSubmit.Guarantee_Person}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">ราย</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญารับรองฯ ที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield label="" name="LoanGuaranteeBook" value={inputDataSubmit.LoanGuaranteeBook}  onChange={handleInputDataSubmit} />
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่" name="LoanGuaranteeBookDate" value={inputDataSubmit.LoanGuaranteeBookDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanGuaranteeBookDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeaderCheckbox topic="ค." label="หนังสือสัญญาค้ำประกันของ"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="(1)" name="WarrantBookOwner1" value={inputDataSubmit.WarrantBookOwner1}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield label=""  name="WarrantBook1" value={inputDataSubmit.WarrantBook1}  onChange={handleInputDataSubmit}/>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiDatePicker label="ลงวันที่" name="WarrantBookDate1" value={inputDataSubmit.WarrantBookDate1} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate1: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="(2)" name="WarrantBookOwner2" value={inputDataSubmit.WarrantBookOwner2}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield label=""  name="WarrantBook2" value={inputDataSubmit.WarrantBook2}  onChange={handleInputDataSubmit}/>
                                                                </Grid>
                                                                {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiDatePicker label="ลงวันที่" name="WarrantBookDate2" value={inputDataSubmit.WarrantBookDate2} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate2: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                            
                                            {/* Paper 5 - ข้อ4 -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 4</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiLabelHeaderCheckbox label="ผู้ให้กู้ตกลงให้มีระยะเวลาปลอดการชำระคืนเงินต้นเป็นเวลา"/>
                                                            <div className="dsp-f">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={6}>
                                                                        {
                                                                            Free_of_debt === '0' ? 
                                                                            <MuiTextNumber label="" name="Free_of_debt_Month" id="no1-year" value={inputDataSubmit.Free_of_debt_Month}  onInput={handleInputDataSubmit} />
                                                                            :
                                                                            <MuiTextNumber label="" name="Free_of_debt_Year" id="no2-year" value={inputDataSubmit.Free_of_debt_Year}  onInput={handleInputDataSubmit} />    
                                                                        }
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}>
                                                                        <MuiRadioButton label="" lists={['เดือน','ปี']}  type="row" name="Free_of_debt" value={Free_of_debt}  onChange={handleInputFreeofDebt}/>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={11} md={2}>
                                                            <p>รวม</p>
                                                            <MuiTextfieldCurrency  label="" name="Free_of_debt_Time" value={inputDataSubmit.Free_of_debt_Time}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">งวด</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่" name="FirstDatePaid" value={inputDataSubmit.FirstDatePaid} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, FirstDatePaid: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>พร้อมทั้งดอกเบี้ยในอัตราร้อยละ</p>
                                                            <MuiTextfieldCurrency  label="" name="Interest" value={inputDataSubmit.Interest}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">ต่อปี</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่" name="LastDatePaid" value={inputDataSubmit.LastDatePaid} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LastDatePaid: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด" name="OfficeProvince" value={inputDataSubmit.OfficeProvince}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>

                                        </Grid>
                                    </Container>
                                
                                    <Container maxWidth="sm">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <div className="table">
                                                    <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                                    <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                                        <Table aria-label="normal table">
                                                            <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">งวดที่</TableCell>
                                                                <TableCell align="center">วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                                <TableCell align="center">จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                            </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {/* {
                                                                [1,2,3,4,5].map((row,i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell align="center">{i+1}</TableCell>
                                                                        <TableCell align="center">
                                                                            <MuiDatePicker label=""  defaultValue="2017-05-24" />
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            { 
                                                                                i === 0 ? 
                                                                                    <MuiTextfield label=""  defaultValue=""/>
                                                                                    :
                                                                                    <MuiTextfieldEndAdornment label=""  defaultValue="" endAdornment={<CloseIcon  className="table-item-del"/>}/>
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))
                                                            } */}

                                                            <TableRow>
                                                                <TableCell align="center">1</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiDatePicker label="" value={loandue_data1.DUEDATE} onChange={(newValue)=>{ setLoandue_data1({ ...loandue_data1, DUEDATE: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" value={loandue_data1.PAYREC} id="loandue_data1" onChange={handleInputLoanDueDataPay} />
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={parseInt(inputData.LoanPeriodCode) >= 1  ? '' :  'table-row-disabled'} >
                                                                <TableCell align="center">2</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiDatePicker label="" value={loandue_data2.DUEDATE} onChange={(newValue)=>{ setLoandue_data2({ ...loandue_data2, DUEDATE: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" value={loandue_data2.PAYREC} id="loandue_data2" onChange={handleInputLoanDueDataPay}/>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={parseInt(inputData.LoanPeriodCode) >= 1  ? '' :  'table-row-disabled'}>
                                                                <TableCell align="center">3</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiDatePicker label="" value={loandue_data3.DUEDATE} onChange={(newValue)=>{ setLoandue_data3({ ...loandue_data3, DUEDATE: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" value={loandue_data3.PAYREC} id="loandue_data3" onChange={handleInputLoanDueDataPay}/>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={parseInt(inputData.LoanPeriodCode) >= 2  ? '' :  'table-row-disabled'}>
                                                                <TableCell align="center">4</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiDatePicker label="" value={loandue_data4.DUEDATE} onChange={(newValue)=>{ setLoandue_data4({ ...loandue_data4, DUEDATE: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" value={loandue_data4.PAYREC} id="loandue_data4" onChange={handleInputLoanDueDataPay}/>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow className={parseInt(inputData.LoanPeriodCode) >= 2  ? '' :  'table-row-disabled'}>
                                                                <TableCell align="center">5</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiDatePicker label="" value={loandue_data5.DUEDATE} onChange={(newValue)=>{ setLoandue_data5({ ...loandue_data5, DUEDATE: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" value={loandue_data5.PAYREC} id="loandue_data5" onChange={handleInputLoanDueDataPay}/>
                                                                </TableCell>
                                                            </TableRow>

                                                            <TableRow className="box box-grey">
                                                                {/* <TableCell align="right">จำนวนเงินรวม <span className="txt-green">50,000 </span>บาท</TableCell> */}
                                                                <TableCell colSpan="3">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={4}>
                                                                            {/* Field Text ---------------------------------------------------*/}
                                                                            <p className="paper-p txt-right">รวมเป็นเงิน</p>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6} className="loanrequestprint-loanduetotal">
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldCurrency label="" value={ 
                                                                                        ((loandue_data1.PAYREC === 0 || loandue_data1.PAYREC === '' ? 0 : parseFloat((loandue_data1.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data2.PAYREC === 0 || loandue_data2.PAYREC === '' ? 0 : parseFloat((loandue_data2.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data3.PAYREC === 0 || loandue_data3.PAYREC === '' ? 0 : parseFloat((loandue_data3.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
                                                                                        (loandue_data4.PAYREC === 0 || loandue_data4.PAYREC === '' ? 0 : parseFloat((loandue_data4.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data5.PAYREC === 0 || loandue_data5.PAYREC === '' ? 0 : parseFloat((loandue_data5.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                                    }  onChange={handleInputData} />
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={1} md={1}>
                                                                            <p className="paper-p">บาท</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                
                                                                </TableCell>
                                                            </TableRow>
                                                               
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </Grid>
                                            {/* <Grid item xs={12} md={12}>
                                                <div className="box-button txt-center">
                                                    <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" />
                                                </div>
                                            </Grid> */}
                                        </Grid>
                                    </Container>
                                
                                    <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}> 
                                                <p className="mg-t-35">หมายเหตุ</p>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="1. ชื่อพยาน" name="WitnessName" value={inputDataSubmit.WitnessName}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="ที่อยู่" name="WitnessAddr" value={inputDataSubmit.WitnessAddr}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextNumber label="บัตรประชาชนเลขที่" id="no-man1-idc" name="WitnessIDCard" value={inputDataSubmit.WitnessIDCard}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="สถานที่ออกบัตร" name="WitnessIDCardMade" value={inputDataSubmit.WitnessIDCardMade}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="2. ชื่อพยาน" name="WitnessName2" value={inputDataSubmit.WitnessName2}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="ที่อยู่" name="WitnessAddr2" value={inputDataSubmit.WitnessAddr2}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextNumber label="บัตรประชาชนเลขที่" id="no-man2-idc" name="WitnessIDCard2" value={inputDataSubmit.WitnessIDCard2}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="สถานที่ออกบัตร" name="WitnessIDCardMade2" value={inputDataSubmit.WitnessIDCardMade2}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                        </Grid>
                                    </Container>

                                    {/* สัญญาแปลงหนี้ชั่วคราว   */}
                                    <Container maxWidth="lg" style={{display: 'none'}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12} className="title-page"> 
                                                <h1 className="txt-green mg-b--20">ข้อตกลงต่อท้ายสัญญากู้ยืมเงิน</h1>
                                            </Grid>

                                            {/* Paper 1 - -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiLabelHeaderCheckbox label="ตามคำสั่ง ส.ป.ก. ที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                    <span>/</span>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="โดย"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ตำแหน่งปฏิรูปที่ดินจังหวัด"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>

                                            {/* Paper 2 - -------------------------------------------------- */}
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 2</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfieldEndAdornment label="แบ่งเป็นเงินต้นค้างชำระ จำนวน"  defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfieldEndAdornment label="แบ่งเป็นเงินต้นค้างชำระ จำนวน"  defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                                </Grid>
                                                                <Grid item xs={12} md={2}>
                                                                    <MuiTextfieldEndAdornment label="ดอกเบี้ยค้างชำระ จำนวน"  defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldEndAdornment label="ชำระเงินต้นค้างชำระพร้อมดอกเบี้ยในอัตราร้อยละ"  defaultValue="" textAlign="right" endAdornment="ต่อปี"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldEndAdornment label="รวมทั้งดอกเบี้ยค้างชำระคืนให้แก่ผู้ให้กู้ภายในเวลา"  defaultValue="" textAlign="right" endAdornment="ปี"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfieldEndAdornment label="แบ่งเป็นงวดละ"  defaultValue="" textAlign="right" endAdornment="เดือน"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfieldEndAdornment label="รวม"  defaultValue="" textAlign="right" endAdornment="งวด"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่"  defaultValue="2017-05-24" />
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่"  defaultValue="2017-05-24" />
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด"  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>

                                        </Grid>
                                    </Container>
                                    
                                    <Container maxWidth="md"  style={{display: 'none'}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <div className="table">
                                                    <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                                    <TableContainer className="table-box table-loanrequestprint3 table-summary">
                                                        <Table aria-label="normal table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center" rowSpan={2}>งวดที่</TableCell>
                                                                    <TableCell align="center" rowSpan={2}>วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                                    <TableCell align="center" colSpan={2}>จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="center">เงินต้นค้างชำระ</TableCell>
                                                                    <TableCell align="center">ดอกเบี้ยค้างชำระ</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {
                                                                [1,2,3,4,5].map((row,i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell align="center">{i+1}</TableCell>
                                                                        <TableCell align="center">
                                                                            <MuiDatePicker label=""  defaultValue="2017-05-24" />
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <MuiTextfield label=""  defaultValue=""/>
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            { 
                                                                                i === 0 ? 
                                                                                    <MuiTextfield label=""  defaultValue=""/>
                                                                                    :
                                                                                    <MuiTextfieldEndAdornment label=""  defaultValue="" endAdornment={<CloseIcon  className="table-item-del"/>}/>
                                                                            }
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))
                                                            }
                                                                <TableRow>
                                                                    <TableCell>&nbsp;</TableCell>
                                                                    <TableCell align="right">รวม</TableCell>
                                                                    <TableCell align="right">30,000</TableCell>
                                                                    <TableCell align="right">30,000</TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <div className="box-button txt-center">
                                                    <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" />
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                
                                    <Container maxWidth="lg"  style={{display: 'none'}}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}> 
                                                <p className="mg-t-35">หมายเหตุ</p>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="1. ชื่อพยาน"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ที่อยู่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="บัตรประชาชนเลขที่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="สถานที่ออกบัตร"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="2. ชื่อพยาน"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ที่อยู่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="บัตรประชาชนเลขที่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="สถานที่ออกบัตร"  defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </Container>
                                    {/* สัญญาแปลงหนี้ชั่วคราว   */}

                                    {/* Btn Row */}
                                    <Container  maxWidth="md">
                                        <Grid container spacing={2} className="btn-row">
                                            {/* <p className="txt-red txt-center" style={{width: '100%'}}>กรุณากดปุ่ม "บันทึกชั่วคราว" ทุกครั้งก่อนกดปุ่ม "ยืนยันสร้างสัญญา"</p> */}
                                            {/* Button Row -------------------------------------------------- */}
                                            <Grid item xs={12} md={4}>
                                                <ButtonFluidPrimary label="บันทึกชั่วคราว" id="" onClick={(event)=>handleSubmit(event, 'draft')} />
                                            </Grid>
                                            <Grid item xs={12} md={4} >
                                                <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" onClick={()=>setConfirm(true)}/>
                                            </Grid>
                                            <Grid item xs={12} md={4} className={confirmSuccessStep1 || loanID ? '' : 'btn-disabled'} >
                                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />}  />
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </form>
                            </React.Fragment>
                        : ''
                    } 
                
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
                
                    <div className="dialog-confirm">
                        <p className="txt-center txt-black">{confirmMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={(event)=>{ handleSubmit(event, 'confirm');}} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default LoanRequestPrint
