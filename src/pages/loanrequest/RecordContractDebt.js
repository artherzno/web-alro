import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiTextfieldCurrency,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiLabelHeaderCheckbox,
    MuiRadioButton,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
    MuiSelectDistrict,
    MuiSelectProvince,
    MuiSelectSubDistrict,
    MuiTextNumber,
    MuiSelectObj,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

let action = 'add';
let action_loanstatus = 'draft';

function EditContractDebt() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')
    let provincename = localStorage.getItem('provincename');

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
    const [tableResult, setTableResult] = useState([])
    const [formField, setFormField] = useState(false)
    const [confirmSuccessStep1, setConfirmSuccessStep1] = useState(false)


    const [loanNumber, setLoanNumber] = useState('')
    const [dueAmount, setDueAmount] = useState(2)
    const dueAmountList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

    // const [provinceList, setprovinceList] = useState(['กรุณาเลือกจังหวัด']);
    let provinceList = JSON.parse(localStorage.getItem('provincelist'))
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))

    const [inputDataFarmer, setInputDataFarmer] = useState({
        BirthDate: moment(),
        Contact_AddMoo: null,
        Contact_AddNo: null,
        Contact_AddrDistrictID: null,
        Contact_AddrProvinceID: null,
        Contact_AddrSoiRoad: null,
        Contact_AddrSubdistrictID: null,
        Contact_Addrzone: null,
        Contact_PicPatch: null,
        Contact_Postcode: null,
        FarmerGrade: null,
        FarmerID: null,
        FrontName: null,
        IDCARD_AddMoo: null,
        IDCARD_AddNo: null,
        IDCARD_AddrDistrictID: null,
        IDCARD_AddrProvinceID: null,
        IDCARD_AddrSoiRoad: null,
        IDCARD_AddrSubdistrictID: null,
        IDCARD_Postcode: null,
        IDCard: null,
        IDCardEXP_Date: moment(),
        IDCard_Addrzone: null,
        IDCard_PicPatch: null,
        LoanFarmerTypeID: null,
        Name: null,
        Request: null,
        Sirname: null,
        Tel: null,
        admin_nMEMID: null,
        dCreated: null,

    })
    const [inputDataLandData, setInputDataLandData] = useState([])
    const [inputDataLoanDuc, setInputDataLoanDuc] = useState([])
    const [inputDataLoanDus, setInputDataLoanDus] = useState([])
    const [inputDataLoanDue, setInputDataLoanDue] = useState([])
    const [inputDataLoanRec, setInputDataLoanRec] = useState([])

    const [inputDataNewFarmerID, setInputDataNewFarmerID] = useState(null)
    const [inputDataNewFarmer, setInputDataNewFarmer] = useState({
        FarmerGrade: null,
        FarmerID: 0,
        FrontName: null,
        IDCard: null,
        Name: null,
        OldName1: null,
        OldName2: null,
        OldSirname1: null,
        OldSirname2: null,
        Sirname: null,

    })

    const [inputDataIndividualcard, setInputDataIndividualcard] = useState([])

    const [inputDataSearch, setInputDataSearch] = useState({
        Name: '',
        Sirname: '',
        IDCard: '',
        LoanID: '',
        LoanNumber: '',
    })

    const [inputDataSubmitIndividual, setInputDataSubmitIndividual] = useState({
        principle: 0,
        Interest: 0,
        OldInterest: 0,
        OldFine: 0,
        ChargeRate: 0,
    })

    const [inputDataSubmit, setInputDataSubmit] = useState({
        Old_LoanID: null,
    
        ChangeDebtDate: moment(),
        OldInterest: '',
        OldFine: '',
        
        LoanDate: moment(),
        Nationality: 'ไทย',
        RecordCode: '',
        RecDate: moment(),
        FarmerID: '',
        AGE: '',
        ProjectID: null,
        IDCardMadeDistrict: '',
        IDCardMadeProvince: '',
        FarmerInDistrict: '',
        FarmerInProvince: '',
        Officer: '',
        OfficerRank: '',
        SPK_Order: '',
        SPK_OrderDate: moment(),
        Loan_Obj1: '',
        Loan_Obj1Amount: '',
        Loan_Obj2: '',
        Loan_Obj2Amount: '',
        Loan_Obj3: '',
        Loan_Obj3Amount: '',
        Loan_Installment1: '',
        Loan_Installment2: '',
        Loan_Installment3: '',
        Loan_Installment4: '',
        Loan_Installment5: '',
        Farmer_Accept: '',
        Guarantee_Property: '',
        LoanContactBook: '',
        Guarantee_PropertyDate: moment(),
        Guarantee_Person: '',
        LoanGuaranteeBook: '',
        LoanGuaranteeBookDate: moment(),
        WarrantBookOwner1: '',
        WarrantBook1: '',
        WarrantBookDate1: moment(),
        WarrantBookOwner2: '',
        WarrantBook2: '',
        WarrantBookDate2: moment(),
        Free_of_debt_Month: '',
        Free_of_debt_Year: '',
        Free_of_debt_Time: '',
        FirstDatePaid: moment(),
        principle: 0,
        Interest: 0,
        ChargeRate: '',
        LastDatePaid: moment(),
        OfficeProvince: '',
        WitnessName: '',
        WitnessAddr: '',
        WitnessIDCard: '',
        WitnessIDCardMade: '',
        WitnessName2: '',
        WitnessAddr2: '',
        WitnessIDCard2: '',
        WitnessIDCardMade2: '',
        WitnessName3: '',
        WitnessAddr3: '',
        WitnessIDCard3: '',
        WitnessIDCardMade3: '',
        WitnessName4: '',
        WitnessAddr4: '',
        WitnessIDCard4: '',
        WitnessIDCardMade4: '',
        ChangeContactCommit: '',
        ChangeContactCommitDate: moment(),
        ChangeContactCommitTime: '',
        Overdue_debt: '',
        Overdue_debt_principle: '',
        Overdue_debt_interest: '',
        PaidOverdue_debt_principle_Interest: '',
        PaidYear: '',
        PaidTime_month: '',
        TotalPaidTime: '',
        LoanTypeID: '',
        projectID: '',
        Projectcode: '',
        ProjectName: '',
        Obj: '',
        LoanCost: '',
        FarmArea_Rai: '',
        Plant_Type: '',
        YearProductPer_Rai: '',
        Total_Year_cost: '',
        YearInterest: '',
        Debt: '',
        DebtWith: '',
        DebtCost: '',
        LoanDocPatch: '',
        LoanStatusID: '',
        Status: '',
        ProvinceID: '',
        IDCard: '',
        LoanStatus: '',
        loandue_data: [
            // {
            //     DUEDATE: "2022-01-01",
            //     PAYREC: 1000.00
            // },
            // {
            //     DUEDATE: "2023-01-01",
            //     PAYREC: 2000.00
            // },
            // {
            //     DUEDATE: "2024-01-01",
            //     PAYREC: 500.00
            // }
        ],

        DebtEditNumber: '',
        CurrentYear: '',
        RecYear: '',
        PV_CODE: '',
        PV_NAME: '',
        ProjectSubCode: '',
        ProjectSubName: '',
        DebtEditDate: moment(),
        LoanChangeDate: moment(),
    })

    const [summaryTable, setSummaryTable] = useState(0)
    const [inputDataSubmitLoanDUE, setInputDataSubmitLoanDUE] = useState([
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
        { ITEM: null, DUEDATE: null, PAYREC: null },
    ])

    const [rows, setRows] = useState([])

    const rowsLabel = [
        // 'ApplicantID',
        // 'FarmerGrade',
        'Status', 
        'LoanNumber',
        'dCreated',
        'IDCard', 
        'FrontName',
        'Name',
        'Sirname', 
        'Tel',
    ]

    const headCells = [
        // { id: 'ApplicantID', numeric: false, disablePadding: true, widthCol: '0px', label: 'รหัสบันทึก' },
        // { id: 'FarmerGrade', numeric: false, disablePadding: true, widthCol: '0px', label: 'ระดับเกษตรกร' },
        { id: 'Status', numeric: false, disablePadding: false, widthCol: '150px', label: 'สถานะสัญญา' },
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขที่สัญญา' },
        { id: 'dCreated', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่กู้' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '180px', label: 'เลขบัตรประชาชน' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '150px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '150px', label: 'นามสกุล' },
        { id: 'Tel', numeric: false, disablePadding: false, widthCol: '150px', label: 'โทรศัพท์' },
    ]

    function createData(LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel) {
        return {LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel }
    }

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
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

    

    const getSearchCloseLoanRec = () => {
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/search_close_loanrec`, {
                Name: inputDataSearch.Name,
                Sirname: inputDataSearch.Sirname,
                IDCard: inputDataSearch.IDCard,
                LoanID: inputDataSearch.LoanID,
                LoanNumber: inputDataSearch.LoanNumber,
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
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
                    if(!data.length) {
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                    } else {
                        setTableResult(data.data)
                        // setRows(data.data)
                        setRows(
                            data.data.map((item,i)=>
                                createData(
                                    item.LoanID,
                                    item.FarmerGrade,
                                    item.ApplicantID,
                                    item.Statue === null ? '' : !item.Statue ? 'ปิด' : 'เปิด',
                                    item.LoanNumber === null ? '' : item.LoanNumber,
                                    item.dCreated ? newOrderDate(item.dCreated) : null,
                                    item.IDCard === null ? '' : item.IDCard,
                                    item.FrontName === null ? '' : item.FrontName,
                                    item.Name === null ? '' : item.Name,
                                    item.Sirname === null ? '' : item.Sirname,
                                    item.Tel === undefined ? '' : item.Tel 
                                )
                            )
                        )
                    }
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }


    const getCloseLoanDetail = (loanID) => {
        setIsLoading(true)
        setFormField(false)
        setInputDataFarmer({
            BirthDate: moment(),
            Contact_AddMoo: null,
            Contact_AddNo: null,
            Contact_AddrDistrictID: null,
            Contact_AddrProvinceID: null,
            Contact_AddrSoiRoad: null,
            Contact_AddrSubdistrictID: null,
            Contact_Addrzone: null,
            Contact_PicPatch: null,
            Contact_Postcode: null,
            FarmerGrade: null,
            FarmerID: null,
            FrontName: null,
            IDCARD_AddMoo: null,
            IDCARD_AddNo: null,
            IDCARD_AddrDistrictID: null,
            IDCARD_AddrProvinceID: null,
            IDCARD_AddrSoiRoad: null,
            IDCARD_AddrSubdistrictID: null,
            IDCARD_Postcode: null,
            IDCard: null,
            IDCardEXP_Date: moment(),
            IDCard_Addrzone: null,
            IDCard_PicPatch: null,
            LoanFarmerTypeID: null,
            Name: null,
            Request: null,
            Sirname: null,
            Tel: null,
            admin_nMEMID: null,
            dCreated: null,
    
        })
        setInputDataNewFarmer({
            FarmerGrade: null,
            FarmerID: 0,
            FrontName: null,
            IDCard: null,
            Name: null,
            OldName1: null,
            OldName2: null,
            OldSirname1: null,
            OldSirname2: null,
            Sirname: null,
    
        })
        setInputDataLandData([])
        setInputDataLoanDuc([])
        setInputDataLoanDus([])
        setInputDataLoanDue([])
        setInputDataLoanRec([])

        axios.post(
            `${server_hostname}/admin/api/get_closeloandetail`, {
                LoanID: loanID,
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
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
                    setFormField(true)
                    console.log('get_closeloandetail',data.farmer_data)
                    setInputDataFarmer(data.farmer_data)
                    setInputDataLandData(data.farmer_data.land_data === undefined ? [] : data.farmer_data.land_data[0] )
                    setInputDataLoanDuc(data.loanduc_data)
                    setInputDataLoanDus(data.loandus_data)
                    setInputDataLoanDue(data.loandue_data)
                    setInputDataLoanRec(data.loanrec_data[0])

                    setLoanNumber(data.loanrec_data[0].LoanNumber)
                    // setTableResult(data.data)
                    // setRows(data.data)

                    setInputDataFarmer({
                        ...inputDataFarmer,
                        IDCARD_AddrSubdistrictID: data.farmer_data.IDCARD_AddrSubdistrictID === null ? '' : data.farmer_data.IDCARD_AddrSubdistrictID,
                        IDCARD_AddrDistrictID: data.farmer_data.IDCARD_AddrDistrictID === null ? '' : data.farmer_data.IDCARD_AddrDistrictID,
                        IDCARD_AddrProvinceID: data.farmer_data.IDCARD_AddrProvinceID === null ? '' : data.farmer_data.IDCARD_AddrProvinceID,
                    })

                    getIndividualcard(data.loanrec_data[0].LoanNumber)
                    
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getNewFarmerDetail = () => {
        setIsLoading(true)

        if((inputDataNewFarmerID === null || inputDataNewFarmerID === '')) {
            setErr(true)
            setErrMsg('กรุณาใส่เลขบัตรประชาชน')
        } else {
            if(inputDataNewFarmerID.length === 13) {
                axios.post(
                    `${server_hostname}/admin/api/search_farmer`, {
                        Name: null,
                        Sirname: null,
                        IDCard: inputDataNewFarmerID,
                        FarmerGrade: null,
                        LoanNumber: null,
                        order_by: "IDCard",
                        order_desc: "DESC",
                        page_number: 1,
                        page_length: 200,
                    }, { headers: { "token": token } } 
                ).then(res => {
                    setIsLoading(false)
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
                            console.log(data.data[0])
                            setInputDataNewFarmer(data.data[0])
                        }
                    }
                ).catch(err => { console.log(err); history.push('/') })
                .finally(() => {
                    if (isMounted.current) {
                    setIsLoading(false)
                    }
                });
            } else {
                setErr(true)
                setErrMsg('เลขบัตรประชาชนไม่ถูกต้อง')
            }
           
        }
    }

    const getIndividualcard = (loanNumberVal) => {
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/get_individualcard`, {
                LoanNumber: loanNumberVal,
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
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
                    console.log('getIndividualcard',data.data[data.data.length - 1])
                    setInputDataIndividualcard(data.data[data.data.length - 1])
                }
            }
        ).catch(err => { console.log(err);})
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    // const handleSelectDate = (event) => {
    //     let type = event.target.name
        
    //     setInputSelectDate({
    //         ...inputSelectDate,
    //         [event.target.name]: event.target.value.toString()
    //     })
    // }

    const handleInputDataFarmer = (event) => {
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputDataFarmer({
                    ...inputDataFarmer,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputDataFarmer({
                    ...inputDataFarmer,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputDataFarmer({
                    ...inputDataFarmer,
                    [event.target.name]: event.target.value
                })

            } else {
                setInputDataFarmer({
                    ...inputDataFarmer,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputDataFarmer({
                ...inputDataFarmer,
                [event.target.name]: event.target.value
            })
        }
    }

    const openFormField = () => {
        setFormField(true)
    }

    const handleNewFarmer = (event) => {
        event.target.value = event.target.value.toString().slice(0, 13)  
        // console.log(event.target.value)
        setInputDataNewFarmerID(event.target.value)
    }

    const handleDUEAmount = (event) => {
        setDueAmount(event.target.value)
        console.log(event.target.value)
        setInputDataSubmitLoanDUE([
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
            { ITEM: null, DUEDATE: null, PAYREC: null },
        ])
    }

    const handleInputDataSubmit = (event) => {
        console.log('event.target.value',event.target.value)
        // let name = event.target.name
        // let value = event.target.value.toLocaleString('en-US', {minimumFractionDigits: 2})

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

    const handleInputDataSubmitIndividual = (event) => {
        let value = event.target.value.toLocaleString('en-US', {minimumFractionDigits: 2})

        setInputDataSubmitIndividual({
            ...inputDataSubmitIndividual,
            [event.target.name]: parseFloat(value.split(',').join(''))
        })
    }

    const handleSubmitLoanDUEItem = (event,ind) => {
        let loanDUEArr = [...inputDataSubmitLoanDUE]
        loanDUEArr[ind].ITEM = event.target.value
        setInputDataSubmitLoanDUE(loanDUEArr)
    }

    const handleSubmitLoanDUEDate = (newValue,ind) => {
        let loanDUEArr = [...inputDataSubmitLoanDUE]
        
        loanDUEArr[ind].DUEDATE = moment(newValue).format('YYYY-MM-DD')
        setInputDataSubmitLoanDUE(loanDUEArr)
    }

    const handleSubmitLoanDUEPayrec = (event,ind) => {
        let value = event.target.value.toLocaleString('en-US', {minimumFractionDigits: 2})
        let loanDUEArr = [...inputDataSubmitLoanDUE]
        loanDUEArr[ind].PAYREC = parseFloat(value.split(',').join(''))
        setInputDataSubmitLoanDUE(loanDUEArr)
    }

    const handleSubmit = (event, loanstatus) => {
        action_loanstatus = loanstatus;
        event.preventDefault();
    
        let recordcontractdebt = document.getElementById('recordcontractdebt');
        let formData = new FormData(recordcontractdebt);
        formData.append('LoanStatus', action_loanstatus)

        formData.append('SPK_OrderDate', moment(inputDataSubmit.SPK_OrderDate).format('YYYY-MM-DD'))
        formData.append('RecDate', moment(inputDataSubmit.RecDate).format('YYYY-MM-DD'))
        formData.append('LoanDate', moment(inputDataSubmit.LoanDate).format('YYYY-MM-DD'))
        formData.append('LoanChangeDate', moment(inputDataSubmit.LoanChangeDate).format('YYYY-MM-DD'))
        formData.append('Guarantee_PropertyDate', moment(inputDataSubmit.Guarantee_PropertyDate).format('YYYY-MM-DD'))
        formData.append('DebtEditDate', moment(inputDataSubmit.DebtEditDate).format('YYYY-MM-DD'))
        formData.append('LoanGuaranteeBookDate', moment(inputDataSubmit.LoanGuaranteeBookDate).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate1', moment(inputDataSubmit.WarrantBookDate1).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate2', moment(inputDataSubmit.WarrantBookDate2).format('YYYY-MM-DD'))

        // let principle_value = inputDataSubmit.principle.toLocaleString('en-US', {minimumFractionDigits: 2})
        // formData.set('principle', parseFloat(principle_value.split(',').join('')))
        // let OldInterest_value = inputDataSubmit.OldInterest.toLocaleString('en-US', {minimumFractionDigits: 2})
        // formData.set('OldInterest', parseFloat(OldInterest_value.split(',').join('')))
        // let OldFine_value = inputDataSubmit.OldFine.toLocaleString('en-US', {minimumFractionDigits: 2})
        // formData.set('OldFine', parseFloat(OldFine_value.split(',').join('')))
        // let Interest_value = inputDataSubmit.Interest.toLocaleString('en-US', {minimumFractionDigits: 2})
        // formData.set('Interest', parseFloat(Interest_value.split(',').join('')))
        // let ChargeRate_value = inputDataSubmit.ChargeRate.toLocaleString('en-US', {minimumFractionDigits: 2})
        // formData.set('ChargeRate', parseFloat(ChargeRate_value.split(',').join('')))

        formData.set('principle', inputDataSubmitIndividual.principle)
        formData.set('OldInterest', inputDataSubmitIndividual.OldInterest)
        formData.set('OldFine', inputDataSubmitIndividual.OldFine)
        formData.set('Interest', inputDataSubmitIndividual.Interest)
        formData.set('ChargeRate', inputDataSubmitIndividual.ChargeRate)


        // formData.append('loandue_data', inputDataSubmitLoanDUE)

        let loandueDataArrValue = []
        for(let i=0; i<(dueAmount+1); i++) {
            loandueDataArrValue.push(inputDataSubmitLoanDUE[i])
        }
        formData.append('loandue_data', JSON.stringify(loandueDataArrValue));

        console.log(formData)
        // admin/api/add_loandebt
        let url = ''
        url =`${server_hostname}/admin/api/add_loandebtt`
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

    const handlePrintPDF = () => {
        console.log('PDF - ContractNo:', loanNumber)

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)

        axios({
        url: `${siteprint}/report/pdf/GetContractDebtPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }
    
    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)
        
        // history.push('/manageinfo/searchmember');

    };

    const gotoPrintContractDebt = () => {
        history.push('/loanrequest/PrintContractDebt');
    }

    const sumTable = () => {
        let sum = 0;
        for(let i=0; i<(dueAmount+1); i++) {
            sum += isNaN(inputDataSubmitLoanDUE[i].PAYREC) ? 0 : inputDataSubmitLoanDUE[i].PAYREC
            console.log('inputDataSubmitLoanDUE',inputDataSubmitLoanDUE[i].PAYREC)
            console.log('Sum inputDataSubmitLoanDUE',sum)
        }
        setSummaryTable(sum)
    }

    const rowTable = (val) => {
        // console.log('dueAmount',dueAmount)
        let rowArr = []
        for(let i=0; i<val; i++) {
            rowArr.push(
                <div style={{flex: '1', width: '100%', display: 'flex'}}>
                    <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                        <MuiTextfield label='' value={inputDataSubmitLoanDUE[i].ITEM} onChange={(event)=>{handleSubmitLoanDUEItem(event,i)}} />
                    </Grid>
                    <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                        <MuiDatePicker label="" value={inputDataSubmitLoanDUE[i].DUEDATE} onChange={(event)=>{handleSubmitLoanDUEDate(event,i)}}  />
                        {/* <div className="select-date-option">
                            <MuiSelectDay label=''  />
                            <MuiSelectMonth label=''  />
                            <MuiSelectYear label='' />
                        </div> */}
                    </Grid>
                    <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                        <MuiTextfieldCurrency label='' value={inputDataSubmitLoanDUE[i].PAYREC === null ? 0 : inputDataSubmitLoanDUE[i].PAYREC} onChange={(event)=>{handleSubmitLoanDUEPayrec(event,i); sumTable();}} />
                    </Grid>
                </div>
            )
        }

        return rowArr
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
                                {/* <h1>สร้าง / บันทึกสัญญาแปลงหนี้</h1> */}
                                <h1>สร้าง / พิมพ์สัญญาแปลงหนี้</h1>
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาชื่อ" value={inputDataSearch.Name} name="Name" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหานามสกุล" value={inputDataSearch.Sirname} name="Sirname" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" value={inputDataSearch.LoanNumber} name="LoanNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่คำขอกู้ยืมเงิน" value={inputDataSearch.LoanID} name="LoanID" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขบัตรประชาชน" value={inputDataSearch.IDCard} name="IDCard" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchCloseLoanRec} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(tableResult.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-loanrequestprint mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={36} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionCreate={true}
                                        actionView={false} 
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        printParam1={'LoanNumber'}
                                        tableName={'addRecordCourtContract'}
                                        createEvent={getCloseLoanDetail}
                                        createParam={'LoanID'}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        formField ? 
                            <React.Fragment>  
                                <form className="root" id="recordcontractdebt" noValidate autoComplete="off" onSubmit={handleSubmit}>     
                                    <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <p className="mg-t-20">สัญญาแปลงหนี้ใหม่จากสัญญากู้ยืมเงินเลขที่ RIET2343525/00003</p>
                                                {/* Paper 1 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-10">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="สัญญานี้ทำขึ้นเมื่อวันที่" name="LoanDate" value={inputDataSubmit.LoanDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ณ สำนักงานการปฏิรูปที่ดินจังหวัด" name="OfficeProvince" value={inputDataSubmit.OfficeProvince} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ถนน" value={inputDataFarmer.IDCARD_AddrSoiRoad} onChange={handleInputDataFarmer} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" lists={subdistrictList} value={inputDataFarmer.IDCARD_AddrSubdistrictID}  onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" lists={districtList} value={inputDataFarmer.IDCARD_AddrDistrictID} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" lists={provinceList}  value={inputDataFarmer.IDCARD_AddrProvinceID} onInput = {handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ระหว่างสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.) โดย" name="Officer" value={inputDataSubmit.Officer} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ตำแหน่ง" name="OfficerRank" value={inputDataSubmit.OfficerRank} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ผู้รับมอบอำนาจให้ทำสัญญาแทนตามคำสั่งสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม ที่" name="SPK_Order" value={inputDataSubmit.SPK_Order} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่" name="SPK_OrderDate" value={inputDataSubmit.SPK_OrderDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, SPK_OrderDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="และคำสั่งจังหวัด" inputdisabled="input-disabled"  value={inputDataFarmer.IDCARD_AddrSoiRoad} onChange={handleInputDataFarmer}  />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="ที่" inputdisabled="input-disabled"  />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    {/* ApproveDate */}
                                                                    <MuiDatePicker label="ลงวันที่"  inputdisabled="input-disabled"  />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={2} className="txt-center-v txt-center">
                                                            <p>ฝ่ายหนึ่งกับ</p>
                                                        </Grid>

                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputDataNewFarmerID} onInput={handleNewFarmer} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <p>&nbsp;</p>
                                                            <ButtonFluidPrimary label="ค้นหา" onClick={getNewFarmerDetail} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" value={inputDataNewFarmer.FrontName} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" value={inputDataNewFarmer.Name} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" value={inputDataNewFarmer.Sirname}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfieldEndAdornment label="อายุ" inputdisabled="input-disabled" value={inputDataNewFarmer.Age} endAdornment="ปี"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="อยู่บ้านเลขที่" inputdisabled="input-disabled"  defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ถนน"  inputdisabled="input-disabled"  defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="หมู่"  inputdisabled="input-disabled"  defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectSubDistrict label="จังหวัด"  inputdisabled="input-disabled"  lists={['จังหวัด1','จังหวัด2','จังหวัด3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectDistrict label="เขต/อำเภอ"  inputdisabled="input-disabled"  lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince label="แขวง/ตำบล"  inputdisabled="input-disabled" lists={['แขวง/ตำบล1','แขวง/ตำบล2','แขวง/ตำบล3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="รหัสไปรษณีย์" inputdisabled="input-disabled" defaultValue='' />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={12}>
                                                            <p>ปรากฏตามสำเนาภาพถ่ายบัตรประจำตัวประชาชนและสำเนาทะเบียนบ้านแนบท้ายสัญญานี้ ซึ่งต่อไปในสัญญานี้เรียกว่า “ลูกหนี้ใหม่” อีกฝ่ายหนึ่ง</p>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-20">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เลขที่บันทึก" inputdisabled="input-disabled"  name="DebtEditNumber" value={inputDataSubmit.DebtEditNumber} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่บันทึก" inputdisabled="input-disabled" name="RecDate" value={inputDataSubmit.RecDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, RecDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="ปีปัจจุบัน" inputdisabled="input-disabled" name="CurrentYear" value={inputDataSubmit.CurrentYear} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="PV_CODE" inputdisabled="input-disabled"  name="PV_CODE" value={inputDataSubmit.PV_CODE} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="PV_NAME" inputdisabled="input-disabled"  name="PV_NAME" value={inputDataSubmit.PV_NAME} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญญาเดิม" name="Old_LoanID" value={inputDataSubmit.Old_LoanID} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เงินต้นค้างเดิม" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ดอกเบี้ยค้างเดิม" defaultValue='' />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}> */}
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ค่าปรับค้างเดิม" defaultValue='' />
                                                        </Grid>
                                                            {/* </Grid>
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการ" inputdisabled="input-disabled" name="Projectcode" value={inputDataSubmit.Projectcode} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการ" inputdisabled="input-disabled" name="ProjectName" value={inputDataSubmit.ProjectName} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการรอง" inputdisabled="input-disabled" name="ProjectSubCode" value={inputDataSubmit.ProjectSubCode} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการรอง" inputdisabled="input-disabled" name="ProjectSubName" value={inputDataSubmit.ProjectSubName} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญญาเลขที่" inputdisabled="input-disabled" inputdisabled="input-disabled" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่สัญญา" inputdisabled="input-disabled" inputdisabled="input-disabled" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" id='' inputdisabled="input-disabled" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="บันทึกแปลงหนี้ปี" inputdisabled="input-disabled" id='' name="RecYear" value={inputDataSubmit.RecYear} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            {/* principle */}
                                                            <MuiTextfield label="จำนวนเงินให้กู้" inputdisabled="input-disabled" id='' inputdisabled="input-disabled"/>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการหลัก"  lists={['โครงการหลัก1','โครงการหลัก2','โครงการหลัก3']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการหลัก" inputdisabled="input-disabled" name="Projectcode" value={inputDataSubmit.Projectcode} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการหลัก" inputdisabled="input-disabled" name="ProjectName" value={inputDataSubmit.ProjectName} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['วัตถุประสงค์การกู้ยืม1','วัตถุประสงค์การกู้ยืม2','วัตถุประสงค์การกู้ยืม3']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={6}>
                                                            {/* objective1 */}
                                                            <MuiTextfield label="วัตถุประสงค์การกู้ยืม" inputdisabled="input-disabled"/>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทเงินกู้" inputdisabled="input-disabled" lists={['ประเภทเงินกู้1','ประเภทเงินกู้2','ประเภทเงินกู้3']} value={0} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            {/* LoanPeriod */}
                                                            <MuiTextfield label="&nbsp;" inputdisabled="input-disabled" />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทกู้ยืม" inputdisabled="input-disabled" lists={['ประเภทกู้ยืม1','ประเภทกู้ยืม2','ประเภทกู้ยืม3']} value={0} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            {/* LoanobjName */}
                                                            <MuiTextfield label="&nbsp;" inputdisabled="input-disabled"  />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทผู้กู้" inputdisabled="input-disabled" lists={['ประเภทผู้กู้1','ประเภทผู้กู้2','ประเภทผู้กู้3']} value={0} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            {/* LoanFarmerTypeName */}
                                                            <MuiTextfield label="&nbsp;" inputdisabled="input-disabled"/>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        
                                                    </Grid>
                                                </Paper>
                                                
                                                {/* Paper 3 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper" style={{display: 'none'}}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={8}>
                                                            <MuiTextfield label="เลขบัตรประจำตัวประชาชน"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <p>&nbsp;</p>
                                                            <ButtonFluidPrimary label="ค้นหา"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect disabled label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} value={0} />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield disabled label="ชื่อ" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield disabled label="นามสกุล" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={9}>
                                                            <MuiTextfield disabled label="ที่อยู่" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield disabled label="เลขที่" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield disabled label="หมู่" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="ตำบล" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="อำเภอ" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="จังหวัด" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="รหัสไปรษณีย์" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue='' />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={4}>
                                                            <MuiRadioButton label="&nbsp;" lists={['คำสั่งศาล','เปลี่ยนสัญญา','กทด.']} value={inputData.typeContract} onChange={handleChangeTypeContract} type="row" />
                                                        </Grid> */}
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 4 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Land_AddMoo */}
                                                            <MuiTextfield label="ที่ตั้งที่ดิน หมู่" inputdisabled="input-disabled" value={inputDataLandData.Land_AddMoo} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Land_AddrSubdistrict */}
                                                            <MuiTextfield label="แขวง/ตำบล" inputdisabled="input-disabled"  value={inputDataLandData.Land_AddrSubdistrict}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Land_AddrDistrict */}
                                                            <MuiTextfield label="เขต/อำเภอ" inputdisabled="input-disabled"  value={inputDataLandData.Land_AddrDistrict}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* DocLand_name */}
                                                            <MuiTextfield label="ประเภทที่ดิน" inputdisabled="input-disabled"  value={inputDataLandData.DocLand_name}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* LandNumber */}
                                                            <MuiTextfield label="เลขที่" inputdisabled="input-disabled" value={inputDataLandData.LandNumber} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* LandGroup */}
                                                            <MuiTextfield label="กลุ่ม" inputdisabled="input-disabled" value={inputDataLandData.LandGroup} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Plang */}
                                                            <MuiTextfield label="แปลง" inputdisabled="input-disabled" value={inputDataLandData.Plang} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            {/* Rai */}
                                                            <MuiTextfield label="ไร่" inputdisabled="input-disabled" value={inputDataLandData.Rai} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            {/* Ngan */}
                                                            <MuiTextfield label="งาน" inputdisabled="input-disabled" value={inputDataLandData.Ngan} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            {/* Wa */}
                                                            <MuiTextfield label="วา" inputdisabled="input-disabled" value={inputDataLandData.Wa} />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 6 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={8}>
                                                            <p className="txt-green">เพิ่มข้อมูลลง DUE ให้เพิ่มต่อเนื่องอย่ากระโดดปี</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={9}>
                                                                    <p className="paper-p txt-right">จำนวนข้อมูล DUE</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiSelect label="" lists={dueAmountList} value={dueAmount} onChange={handleDUEAmount} />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiLabelHeaderCheckbox label="งวด"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiLabelHeaderCheckbox label="วันครบกำหนด"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiLabelHeaderCheckbox label="จำนวนเงินต้น" />
                                                        </Grid>
                                                        <div style={{width: '100%', height: '200px', overflow: 'auto'}}>
                                                            {
                                                                rowTable(dueAmount + 1)
                                                            }
                                                            {/* {
                                                                inputDataSubmitLoanDUE.map((item,i)=>{
                                                                    return (
                                                                        <div style={{flex: '1', width: '100%', display: 'flex'}}>
                                                                            <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                                                                                <MuiTextfield label='' value={inputDataSubmitLoanDUE[i].ITEM} onChange={(event)=>{handleSubmitLoanDUEItem(event,i)}} />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                                                                                <MuiDatePicker label="" value={inputDataSubmitLoanDUE[i].DUEDATE} onChange={(event)=>{handleSubmitLoanDUEDate(event,i)}}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                                                                                <MuiTextfieldCurrency label='' value={inputDataSubmitLoanDUE[i].PAYREC} onChange={(event)=>{handleSubmitLoanDUEPayrec(event,i)}} />
                                                                            </Grid>
                                                                        </div>
                                                                    )
                                                                }
                                                                )
                                                            } */}
                                                        </div>
                                                        {/* <Grid item xs={12} md={12} className="txt-center">
                                                            <ButtonFluidIconStartPrimary label="เพิ่ม" startIcon={<AddIcon />} maxWidth="275px" />
                                                        </Grid> */}
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 5 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <Grid container spacing={2} className="paper-container">
                                                        <Grid item xs={12} md={12} >
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiDatePicker label="วันที่เปลี่ยนสัญญา" name="LoanChangeDate" value={inputDataSubmit.LoanChangeDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanChangeDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiDatePicker label="วันที่รับแปลงหนี้" name="DebtEditDate" value={inputDataSubmit.DebtEditDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, DebtEditDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldMultiLine label="หมายเหตุ" row="3" defaultValue='' />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield label="&nbsp;" defaultValue='เงินกู้' />
                                                                            </Grid>
                                                                            {/* <Grid item xs={12} md={6}>
                                                                                <p>&nbsp;</p>
                                                                                <div className="select-date-option">
                                                                                    <MuiSelectDay label='' name="recdatedd" value={inputSelectDate.noticedatedd} onChange={handleSelectDate} />
                                                                                    <MuiSelectMonth label='' name="recdatemm" value={inputSelectDate.noticedatemm} onChange={handleSelectDate} />
                                                                                    <MuiSelectYear label='' name="recdateyyyy" value={inputSelectDate.noticedateyyyy} onChange={handleSelectDate} />
                                                                                </div>
                                                                            </Grid> */}
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid  container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">เงินต้น</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label='' name="principle" value={inputDataSubmitIndividual.principle === null || inputDataSubmitIndividual.principle === '' ? 0 : inputDataSubmitIndividual.principle} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label='' name="OldInterest" value={inputDataSubmitIndividual.OldInterest === null || inputDataSubmitIndividual.OldInterest === '' ? 0 : inputDataSubmitIndividual.OldInterest} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ค่าปรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label=''name="OldFine" value={inputDataSubmitIndividual.OldFine === null || inputDataSubmitIndividual.OldFine === '' ? 0 : inputDataSubmitIndividual.OldFine} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">เงินต้น สัญญาเดิม</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" value={inputDataIndividualcard.principle}/> 
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ย สัญญาเดิม</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" value={inputDataIndividualcard.Interest}/> 
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label='' name="Interest" value={inputDataSubmitIndividual.Interest === null || inputDataSubmitIndividual.Interest === '' ? 0 : inputDataSubmitIndividual.Interest} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">อัตราค่าปรับ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label='' name="ChargeRate" value={inputDataSubmitIndividual.ChargeRate === null || inputDataSubmitIndividual.ChargeRate === '' ? 0 : inputDataSubmitIndividual.ChargeRate} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ผลรวมเงินต้น</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" value={inputDataSubmitIndividual.principle === null ? 0 : inputDataSubmitIndividual.principle} onChange={handleInputDataSubmitIndividual}/> 
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ผลรวมงวดชำระ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" value={summaryTable} onChange={handleInputDataSubmitIndividual}/> 
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            
                                                {/* Paper 7 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p>ในวันทำสัญญานี้ ลูกหนี้ใหม่ได้มอบหลักประกัน ดังต่อไปนี้</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ก. อสังหาริมทัพย์ที่ปราศจากข้อผูกพันใด ๆ คือ" name="Guarantee_Property" value={inputDataSubmit.Guarantee_Property} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="โดยนำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" name="LoanContactBook" value={inputDataSubmit.LoanContactBook} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}> 
                                                            <MuiDatePicker label="ลงวันที่" name="Guarantee_PropertyDate" value={inputDataSubmit.Guarantee_PropertyDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, Guarantee_PropertyDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={8}>
                                                            <MuiTextfieldEndAdornment label="ข. หนังสือสัญญารับรองผูกพันตนรับผิดชอบอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกรรวม" endAdornment="ราย" name="Guarantee_Person" value={inputDataSubmit.Guarantee_Person} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={8}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <p>ข. หนังสือสัญญารับรองผูกพันตนรับผิดชอบอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกรรวม</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                                                                    <MuiTextfield label='' defaultValue='' />
                                                                </Grid>
                                                                <Grid item xs={11} md={6} style={{paddingTop: '0'}} className="dsp-f">
                                                                    <span style={{marginTop: '8px'}}>(&nbsp;</span><MuiTextfieldEndAdornment label='' defaultValue='' endAdornment=") ราย"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid> */}
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญารับรองฯ ที่" name="LoanGuaranteeBook" value={inputDataSubmit.LoanGuaranteeBook} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiDatePicker label="ลงวันที่" name="LoanGuaranteeBookDate" value={inputDataSubmit.LoanGuaranteeBookDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanGuaranteeBookDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <p>ค. หนังสือสัญญาค้ำประกันของ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="(1)"  name="WarrantBookOwner1" value={inputDataSubmit.WarrantBookOwner1} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่" name="WarrantBook1" value={inputDataSubmit.WarrantBook1} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiDatePicker label="ลงวันที่" name="WarrantBookDate1" value={inputDataSubmit.WarrantBookDate1} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate1: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="(2)" name="WarrantBookOwner2" value={inputDataSubmit.WarrantBookOwner2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่"  name="WarrantBook2" value={inputDataSubmit.WarrantBook2} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiDatePicker label="ลงวันที่" name="WarrantBookDate2" value={inputDataSubmit.WarrantBookDate2} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate2: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                                {/* Paper 8 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p>หมายเหตุ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="1. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName" value={inputDataSubmit.WitnessName} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr" value={inputDataSubmit.WitnessAddr} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard" value={inputDataSubmit.WitnessIDCard} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade" value={inputDataSubmit.WitnessIDCardMade} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="2. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName2" value={inputDataSubmit.WitnessName2} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr2" value={inputDataSubmit.WitnessAddr2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard2" value={inputDataSubmit.WitnessIDCard2} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade2" value={inputDataSubmit.WitnessIDCardMade2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                            </Grid>

                                        </Grid>
                                    </Container>
                                    
                                    {/* Button row */}
                                    <Container maxWidth="md">
                                        {
                                            (Number(inputDataSubmitIndividual.principle) === summaryTable) && Number(inputDataSubmitIndividual.principle) > 0 && summaryTable > 0 ?
                                            <Grid container spacing={2} className="btn-row txt-center">
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidPrimary label="บันทึกชั่วคราว" id="" onClick={(event)=>handleSubmit(event, 'draft')} />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" onClick={()=>setConfirm(true)}/>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF}  />
                                                </Grid>
                                            </Grid>
                                            :
                                            <Grid container spacing={2} className="btn-row txt-center" style={{opacity: '0.5', pointerEvents: 'none'}}>
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidPrimary label="บันทึกชั่วคราว" id=""  />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <ButtonFluidPrimary label="ยืนยันสร้างสัญญา"/>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} />
                                                </Grid>
                                            </Grid>
                                        }

                                    </Container>
                                </form>
                            </React.Fragment>
                        : null
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

export default EditContractDebt
