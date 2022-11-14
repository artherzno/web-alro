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
import Checkbox from '@material-ui/core/Checkbox';

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

function AddRecordCourtContract() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')
    let provincename = localStorage.getItem('provincename');
    let currentDate = moment().format()

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

    const [loanID, setLoanID] = useState(null)
    const [loanNumber, setLoanNumber] = useState('')
    const [oldLoanNumber, setOldLoanNumber] = useState('')
    const [dueAmount, setDueAmount] = useState(2)
    const dueAmountList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    const [year, setYear] = useState({
        CurrentYear: '',
        RecYear: ''
    })

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
    const [inputDataClosecontact, setInputDataClosecontact] = useState([])
    const [inputDataSpkInfo, setInputDataSpkInfo] = useState([])
    const [inputDataSpkInfoBudget, setInputDataSpkInfoBudget] = useState([])

    const [inputDataNewFarmerIDCard, setInputDataNewFarmerIDCard] = useState(null)
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
        Contact_AddMoo: '',
        Contact_AddNo: '',
        Contact_AddrSoiRoad: '',
        Contact_AddrSubdistrictID: 0,
        Contact_AddrDistrictID: 0,
        Contact_AddrProvinceID: 0,
    })

    const [inputDataIndividualcard, setInputDataIndividualcard] = useState([])
    const [inputDataIndividualcardCloseContact, setInputDataIndividualcardCloseContact] = useState([])

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
        RecDate: moment().format(),
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
        ChargeRate: 0,
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
        objective1: '',
        LoanPeriod: '',
        LoanobjName: '',
        LoanFarmerTypeName: '',
        notation: '',
        OrderInterest: true,

        LoanObjName: '',
    })

    const [inputDataOrderInterest, setInputDataOrderInterest] = useState(false)

    const [summaryTable, setSummaryTable] = useState(0)
    const [inputDataSubmitLoanDUE, setInputDataSubmitLoanDUE] = useState([
        { ITEM: 1, DUEDATE: moment(currentDate).add(0, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 2, DUEDATE: moment(currentDate).add(1, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 3, DUEDATE: moment(currentDate).add(2, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 4, DUEDATE: moment(currentDate).add(3, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 5, DUEDATE: moment(currentDate).add(4, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 6, DUEDATE: moment(currentDate).add(5, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 7, DUEDATE: moment(currentDate).add(6, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 8, DUEDATE: moment(currentDate).add(7, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 9, DUEDATE: moment(currentDate).add(8, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 10, DUEDATE: moment(currentDate).add(9, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 11, DUEDATE: moment(currentDate).add(10, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 12, DUEDATE: moment(currentDate).add(11, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 13, DUEDATE: moment(currentDate).add(12, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 14, DUEDATE: moment(currentDate).add(13, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 15, DUEDATE: moment(currentDate).add(14, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 16, DUEDATE: moment(currentDate).add(15, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 17, DUEDATE: moment(currentDate).add(16, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 18, DUEDATE: moment(currentDate).add(17, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 19, DUEDATE: moment(currentDate).add(18, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 20, DUEDATE: moment(currentDate).add(19, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 21, DUEDATE: moment(currentDate).add(20, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 22, DUEDATE: moment(currentDate).add(21, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 23, DUEDATE: moment(currentDate).add(22, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 24, DUEDATE: moment(currentDate).add(23, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 25, DUEDATE: moment(currentDate).add(24, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 26, DUEDATE: moment(currentDate).add(25, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 27, DUEDATE: moment(currentDate).add(26, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 28, DUEDATE: moment(currentDate).add(27, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 29, DUEDATE: moment(currentDate).add(28, 'year').format('YYYY-MM-DD'), PAYREC: null },
        { ITEM: 30, DUEDATE: moment(currentDate).add(29, 'year').format('YYYY-MM-DD'), PAYREC: null },
    ])

    const [rows, setRows] = useState([])

    const rowsLabel = [
        // 'ApplicantID',
        // 'FarmerGrade',
        'Status', 
        'LoanNumber',
        // 'dCreated',
        'LoanDate',
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
        // { id: 'dCreated', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่กู้' },
        { id: 'LoanDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่ทำสัญญา' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '180px', label: 'เลขบัตรประชาชน' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '150px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '150px', label: 'นามสกุล' },
        { id: 'Tel', numeric: false, disablePadding: false, widthCol: '150px', label: 'โทรศัพท์' },
    ]

    function createData(LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,LoanDate, /*dCreated,*/IDCard, FrontName,Name,Sirname, Tel, LoanRecType) {
        return {LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,LoanDate, /*dCreated,*/IDCard, FrontName,Name,Sirname, Tel, LoanRecType }
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
        setFormField(false)
        setRows([])

        axios.post(
            `${server_hostname}/admin/api/search_close_loanrec_for_court`, {
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
                                    item.Status === null ? 'บันทึกชั่วคราว' : item.Status ? 'คำพิพากษาศาล' : 'ปิด',
                                    item.LoanNumber === null ? '' : item.LoanNumber,
                                    item.LoanDate ? newOrderDate(item.LoanDate) : null,
                                    // item.dCreated ? newOrderDate(item.dCreated) : null,
                                    item.IDCard === null ? '' : item.IDCard,
                                    item.FrontName === null ? '' : item.FrontName,
                                    item.Name === null ? '' : item.Name,
                                    item.Sirname === null ? '' : item.Sirname,
                                    item.Tel === undefined ? '' : item.Tel ,
                                    item.LoanRecType === undefined ? '' : item.LoanRecType,
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
            Contact_AddMoo: '',
            Contact_AddNo: '',
            Contact_AddrSoiRoad: '',
            Contact_AddrSubdistrictID: 0,
            Contact_AddrDistrictID: 0,
            Contact_AddrProvinceID: 0,
    
        })
        setInputDataLandData([])
        setInputDataLoanDuc([])
        setInputDataLoanDus([])
        setInputDataLoanDue([])
        setInputDataLoanRec([])
        setInputDataSubmit([])
        setInputDataClosecontact([])
        setInputDataSubmitIndividual([])
        setDueAmount(2)
        setSummaryTable(0)
        setInputDataSubmitLoanDUE([
            { ITEM: 1, DUEDATE: moment(currentDate).add(0, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 2, DUEDATE: moment(currentDate).add(1, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 3, DUEDATE: moment(currentDate).add(2, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 4, DUEDATE: moment(currentDate).add(3, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 5, DUEDATE: moment(currentDate).add(4, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 6, DUEDATE: moment(currentDate).add(5, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 7, DUEDATE: moment(currentDate).add(6, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 8, DUEDATE: moment(currentDate).add(7, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 9, DUEDATE: moment(currentDate).add(8, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 10, DUEDATE: moment(currentDate).add(9, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 11, DUEDATE: moment(currentDate).add(10, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 12, DUEDATE: moment(currentDate).add(11, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 13, DUEDATE: moment(currentDate).add(12, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 14, DUEDATE: moment(currentDate).add(13, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 15, DUEDATE: moment(currentDate).add(14, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 16, DUEDATE: moment(currentDate).add(15, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 17, DUEDATE: moment(currentDate).add(16, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 18, DUEDATE: moment(currentDate).add(17, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 19, DUEDATE: moment(currentDate).add(18, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 20, DUEDATE: moment(currentDate).add(19, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 21, DUEDATE: moment(currentDate).add(20, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 22, DUEDATE: moment(currentDate).add(21, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 23, DUEDATE: moment(currentDate).add(22, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 24, DUEDATE: moment(currentDate).add(23, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 25, DUEDATE: moment(currentDate).add(24, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 26, DUEDATE: moment(currentDate).add(25, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 27, DUEDATE: moment(currentDate).add(26, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 28, DUEDATE: moment(currentDate).add(27, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 29, DUEDATE: moment(currentDate).add(28, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 30, DUEDATE: moment(currentDate).add(29, 'year').format('YYYY-MM-DD'), PAYREC: null },
        ])
        setInputDataNewFarmerIDCard([])
        setInputDataOrderInterest(false)

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
                    // Check plan year
                    let d = new Date();
                    let fullyear = d.getFullYear() + 543;
                    let month = d.getMonth();
                    let planYearFull = fullyear
                    let planYear = fullyear - 2500
                    if(month >= 9) {
                        planYearFull = d.getFullYear() + 544;
                        planYear = (d.getFullYear() + 544) - 2500
                    } 

                    setFormField(true)
                    console.log('get_closeloandetail',data.farmer_data)
                    setInputDataFarmer(data.farmer_data)
                    setInputDataLandData(data.farmer_data.land_data === undefined ? [] : data.farmer_data.land_data[0] )
                    setInputDataLoanDuc(data.loanduc_data)
                    setInputDataLoanDus(data.loandus_data)
                    setInputDataLoanDue(data.loandue_data)
                    setInputDataLoanRec(data.loanrec_data[0])
                    setInputDataClosecontact(data.closecontact_data[0])
                    
                    if(data.spkinfo_data[0] === undefined) {
                        setInputDataSpkInfo({
                            Road: '',
                            Subdistrict: '',
                            District: '',
                            Province: '',
                        })
                    } else {
                        setInputDataSpkInfo(data.spkinfo_data[0])
                    }

                    if(data.spkinfo_budget[0] === undefined) {
                        setInputDataSpkInfoBudget([])
                    } else {
                        setInputDataSpkInfoBudget(data.spkinfo_budget[0])

                        setInputDataSubmit({
                            ...inputDataSubmit,
                            OfficeProvince: data.spkinfo_data[0].Province,
                            Officer: data.spkinfo_budget[0].Officer,
                            OfficerRank: data.spkinfo_budget[0].Rank,
                            objective1: data.loanrec_data[0].objective1,
                            LoanPeriod: data.loanrec_data[0].LoanPeriod,
                            LoanobjName: data.loanrec_data[0].LoanObjName,
                            LoanFarmerTypeName: data.loanrec_data[0].LoanFarmerTypeName,

                            LoanPeriodName: data.loanrec_data[0].LoanPeriodName,
                            LoanTypeName: data.loanrec_data[0].LoanTypeName,
                            LoanObjName: data.loanrec_data[0].LoanObjName,

                            LoanDate: data.loanrec_data[0].LoanDate,
                        })

                        setInputDataLoanRec(data.loanrec_data[0],{
                            // CurrentYear: planYearFull,
                            PV_CODE: data.spkinfo_data[0].ProvinceID,
                            PV_NAME: data.spkinfo_data[0].Province,
                            // RecYear: planYear
                        })

                        setYear({
                            CurrentYear: planYearFull,
                            RecYear: planYear
                        })

                        setInputDataLandData({
                            DocLand_name: data.closecontact_data[0].DocLand_name
                        })
                    }

                    setInputDataLoanRec(data.loanrec_data[0],{
                        Old_LoanID: data.closecontact_data[0].LoanNumber, 
                        OldFine: data.singlecard_data[0].FineKang
                    })

                    // setInputDataIndividualcard({
                    //     principle: data.singlecard_data[0].principalBalance,
                    //     Interest: data.singlecard_data[0].InterestKang2,
                    // })

                    setLoanNumber(data.loanrec_data[0].LoanNumber)
                    setLoanID(data.loanrec_data[0].LoanID)
                    setOldLoanNumber(data.closecontact_data[0].LoanNumber)
                    // setTableResult(data.data)
                    // setRows(data.data)

                    console.warn('action',action)

                    setInputDataFarmer({
                        ...inputDataFarmer,
                        IDCARD_AddrSubdistrictID: data.farmer_data.IDCARD_AddrSubdistrictID === null ? '' : data.farmer_data.IDCARD_AddrSubdistrictID,
                        IDCARD_AddrDistrictID: data.farmer_data.IDCARD_AddrDistrictID === null ? '' : data.farmer_data.IDCARD_AddrDistrictID,
                        IDCARD_AddrProvinceID: data.farmer_data.IDCARD_AddrProvinceID === null ? '' : data.farmer_data.IDCARD_AddrProvinceID,
                    })
                    
                    // Set value new farmer id
                    console.log(data.farmer_data)
                    setInputDataNewFarmer(data.farmer_data)
                    setInputDataNewFarmerIDCard(data.farmer_data.IDCard)

                    getIndividualcard(data.loanrec_data[0].LoanNumber)

                    setInputDataSubmitIndividual({
                        // ...inputDataSubmitIndividual,
                        principle: data.loanrec_data[0].principle === null ? 0 : data.loanrec_data[0].principle,
                        // OldInterest: data.loanrec_data[0].OldInterest === null ? 0 : data.loanrec_data[0].OldInterest,
                        // OldFine: data.loanrec_data[0].OldFine === null ? 0 : data.loanrec_data[0].OldFine,
                        OldInterest: data.singlecard_data[0].InterestKang2 === null ? 0 : data.singlecard_data[0].InterestKang2,
                        OldFine: data.singlecard_data[0].FineKang === null ? 0 : data.singlecard_data[0].FineKang, // P'Pong specify 13/01/22
                        Interest: data.loanrec_data[0].Interest === null ? 0 : data.loanrec_data[0].Interest,
                        ChargeRate: data.loanrec_data[0].ChargeRate === null ? 0 : data.loanrec_data[0].ChargeRate,
                    })
                    
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getLoanDetail = (loanID) => {
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
            Contact_AddMoo: '',
            Contact_AddNo: '',
            Contact_AddrSoiRoad: '',
            Contact_AddrSubdistrictID: 0,
            Contact_AddrDistrictID: 0,
            Contact_AddrProvinceID: 0,
    
        })
        setInputDataLandData([])
        setInputDataLoanDuc([])
        setInputDataLoanDus([])
        setInputDataLoanDue([])
        setInputDataLoanRec([])
        setInputDataSubmit([])
        setInputDataClosecontact([])
        setInputDataSubmitIndividual([])
        setDueAmount(2)
        setSummaryTable(0)
        setInputDataSubmitLoanDUE([
            { ITEM: 1, DUEDATE: moment(currentDate).add(0, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 2, DUEDATE: moment(currentDate).add(1, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 3, DUEDATE: moment(currentDate).add(2, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 4, DUEDATE: moment(currentDate).add(3, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 5, DUEDATE: moment(currentDate).add(4, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 6, DUEDATE: moment(currentDate).add(5, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 7, DUEDATE: moment(currentDate).add(6, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 8, DUEDATE: moment(currentDate).add(7, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 9, DUEDATE: moment(currentDate).add(8, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 10, DUEDATE: moment(currentDate).add(9, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 11, DUEDATE: moment(currentDate).add(10, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 12, DUEDATE: moment(currentDate).add(11, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 13, DUEDATE: moment(currentDate).add(12, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 14, DUEDATE: moment(currentDate).add(13, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 15, DUEDATE: moment(currentDate).add(14, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 16, DUEDATE: moment(currentDate).add(15, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 17, DUEDATE: moment(currentDate).add(16, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 18, DUEDATE: moment(currentDate).add(17, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 19, DUEDATE: moment(currentDate).add(18, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 20, DUEDATE: moment(currentDate).add(19, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 21, DUEDATE: moment(currentDate).add(20, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 22, DUEDATE: moment(currentDate).add(21, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 23, DUEDATE: moment(currentDate).add(22, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 24, DUEDATE: moment(currentDate).add(23, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 25, DUEDATE: moment(currentDate).add(24, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 26, DUEDATE: moment(currentDate).add(25, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 27, DUEDATE: moment(currentDate).add(26, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 28, DUEDATE: moment(currentDate).add(27, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 29, DUEDATE: moment(currentDate).add(28, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 30, DUEDATE: moment(currentDate).add(29, 'year').format('YYYY-MM-DD'), PAYREC: null },
        ])
        setInputDataNewFarmerIDCard([])
        setInputDataOrderInterest(false)
        

        axios.post(
            `${server_hostname}/admin/api/get_loandetail`, {
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
                    // Check plan year
                    let d = new Date();
                    let fullyear = d.getFullYear() + 543;
                    let month = d.getMonth();
                    let planYearFull = fullyear
                    let planYear = fullyear - 2500
                    if(month >= 9) {
                        planYearFull = d.getFullYear() + 544;
                        planYear = (d.getFullYear() + 544) - 2500
                    } 

                    setFormField(true)
                    console.log('get_loandetail',data.farmer_data)
                    setInputDataFarmer(data.farmer_data)
                    setInputDataLandData(data.farmer_data.land_data === undefined ? [] : data.farmer_data.land_data[0] )
                    setInputDataLoanDuc(data.loanduc_data)
                    setInputDataLoanDus(data.loandus_data)
                    setInputDataLoanDue(data.loandue_data)
                    setInputDataLoanRec(data.loanrec_data[0])
                    setInputDataClosecontact(data.closecontact_data[0])
                    
                    if(data.spkinfo_data[0] === undefined) {
                        setInputDataSpkInfo({
                            Road: '',
                            Subdistrict: '',
                            District: '',
                            Province: '',
                        })
                    } else {
                        setInputDataSpkInfo(data.spkinfo_data[0])
                    }

                    if(data.spkinfo_budget[0] === undefined) {
                        setInputDataSpkInfoBudget([])
                    } else {
                        setInputDataSpkInfoBudget(data.spkinfo_budget[0])

                        setInputDataSubmit({
                            ...inputDataSubmit,
                            OfficeProvince: data.spkinfo_data[0].Province,
                            Officer: data.spkinfo_budget[0].Officer,
                            OfficerRank: data.spkinfo_budget[0].Rank,
                            objective1: data.loanrec_data[0].objective1,
                            LoanPeriod: data.loanrec_data[0].LoanPeriod,
                            LoanobjName: data.loanrec_data[0].LoanObjName,
                            LoanFarmerTypeName: data.loanrec_data[0].LoanFarmerTypeName,

                            LoanPeriodName: data.loanrec_data[0].LoanPeriodName,
                            LoanTypeName: data.loanrec_data[0].LoanTypeName,
                            LoanObjName: data.loanrec_data[0].LoanObjName,
                        })

                        setInputDataLoanRec(data.loanrec_data[0],{
                            // CurrentYear: planYearFull,
                            PV_CODE: data.spkinfo_data[0].ProvinceID,
                            PV_NAME: data.spkinfo_data[0].Province,
                            // RecYear: planYear
                        })

                        setYear({
                            CurrentYear: planYearFull,
                            RecYear: planYear
                        })

                        setInputDataLandData({
                            DocLand_name: data.closecontact_data[0].DocLand_name
                        })
                    }

                    setInputDataLoanRec(data.loanrec_data[0],{
                        Old_LoanID: data.close_oldcontact_data[0].LoanNumber, 
                        // OldFine: data.singlecard_data[0].FineKang 
                        OldFine: data.singlecard_data[0].InterestKang2, // P'Pong specify 13/01/22
                    })

                    // setInputDataIndividualcard({
                    //     principle: data.singlecard_data[0].principalBalance,
                    //     Interest: data.singlecard_data[0].InterestKang2,
                    // })

                    setLoanNumber(data.loanrec_data[0].LoanNumber)
                    setLoanID(data.loanrec_data[0].LoanID)
                    setOldLoanNumber(data.close_oldcontact_data[0].LoanNumber)
                    // setTableResult(data.data)
                    // setRows(data.data)

                    console.warn('action',action)

                    setInputDataFarmer({
                        ...inputDataFarmer,
                        IDCARD_AddrSubdistrictID: data.farmer_data.IDCARD_AddrSubdistrictID === null ? '' : data.farmer_data.IDCARD_AddrSubdistrictID,
                        IDCARD_AddrDistrictID: data.farmer_data.IDCARD_AddrDistrictID === null ? '' : data.farmer_data.IDCARD_AddrDistrictID,
                        IDCARD_AddrProvinceID: data.farmer_data.IDCARD_AddrProvinceID === null ? '' : data.farmer_data.IDCARD_AddrProvinceID,
                    })

                    setInputDataSubmit({
                        ...inputDataSubmit,
                        objective1: data.loanrec_data[0].objective1 === null ? '' : data.loanrec_data[0].objective1,
                        LoanobjName: data.loanrec_data[0].LoanobjName === null ? '' : data.loanrec_data[0].LoanobjName,
                        LoanFarmerTypeName: data.loanrec_data[0].LoanFarmerTypeName === null ? '' : data.loanrec_data[0].LoanFarmerTypeName,
                        LoanPeriod: data.loanrec_data[0].LoanPeriod === null ? '' : data.loanrec_data[0].LoanPeriod,
                        notation: data.loanrec_data[0].notation === null ? '' : data.loanrec_data[0].notation,
                        Guarantee_Person: data.loanrec_data[0].Guarantee_Person === null ? '' : data.loanrec_data[0].Guarantee_Person,
                        Guarantee_Property: data.loanrec_data[0].Guarantee_Property === null ? '' : data.loanrec_data[0].Guarantee_Property,
                        Guarantee_PropertyDate: data.loanrec_data[0].Guarantee_PropertyDate === null ? null : data.loanrec_data[0].Guarantee_PropertyDate,
                        LoanContactBook: data.loanrec_data[0].LoanContactBook === null ? '' : data.loanrec_data[0].LoanContactBook,
                        LoanDate: data.loanrec_data[0].LoanDate === null ? '' : data.loanrec_data[0].LoanDate,
                        LoanGuaranteeBook: data.loanrec_data[0].LoanGuaranteeBook === null ? '' : data.loanrec_data[0].LoanGuaranteeBook,
                        LoanNumber: data.loanrec_data[0].LoanNumber === null ? '' : data.loanrec_data[0].LoanNumber,
                        LoanGuaranteeBookDate: data.loanrec_data[0].LoanGuaranteeBookDate === null ? '' : data.loanrec_data[0].LoanGuaranteeBookDate,
                        OfficeProvince: data.loanrec_data[0].OfficeProvince === null ? '' : data.loanrec_data[0].OfficeProvince,
                        Officer: data.loanrec_data[0].Officer === null ? '' : data.loanrec_data[0].Officer,
                        OfficerRank: data.loanrec_data[0].OfficerRank === null ? '' : data.loanrec_data[0].OfficerRank,
                        RecDate: data.loanrec_data[0].RecDate === null ? moment().format() : data.loanrec_data[0].RecDate,
                        RecYear: data.loanrec_data[0].RecYear === null ? '' : data.loanrec_data[0].RecYear,
                        SPK_Order: data.loanrec_data[0].SPK_Order === null ? '' : data.loanrec_data[0].SPK_Order,
                        SPK_OrderDate: data.loanrec_data[0].SPK_OrderDate === null ? '' : data.loanrec_data[0].SPK_OrderDate,
                        WarrantBook1: data.loanrec_data[0].WarrantBook1 === null ? '' : data.loanrec_data[0].WarrantBook1,
                        WarrantBook2: data.loanrec_data[0].WarrantBook2 === null ? '' : data.loanrec_data[0].WarrantBook2,
                        WarrantBookDate1: data.loanrec_data[0].WarrantBookDate1 === null ? '' : data.loanrec_data[0].WarrantBookDate1,
                        WarrantBookDate2: data.loanrec_data[0].WarrantBookDate2 === null ? '' : data.loanrec_data[0].WarrantBookDate2,
                        WarrantBookOwner1: data.loanrec_data[0].WarrantBookOwner1 === null ? '' : data.loanrec_data[0].WarrantBookOwner1,
                        WarrantBookOwner2: data.loanrec_data[0].WarrantBookOwner2 === null ? '' : data.loanrec_data[0].WarrantBookOwner2,
                        IDCard: data.loanrec_data[0].IDCard === null ? '' : data.loanrec_data[0].IDCard,
                        OrderInterest: data.loanrec_data[0].OrderInterest === null ? false : data.loanrec_data[0].OrderInterest === 1 || data.loanrec_data[0].OrderInterest === '1' ? true : false,
                        LoanChangeDate: data.loanrec_data[0].LoanChangeDate === null ? '' : data.loanrec_data[0].LoanChangeDate,
                        DebtEditDate: data.loanrec_data[0].DebtEditDate === null ? '' : data.loanrec_data[0].DebtEditDate,

                        LoanPeriodName: !!data.loanrec_data[0].LoanPeriodName ? data.loanrec_data[0].LoanPeriodName : '',
                        LoanTypeName: !!data.loanrec_data[0].LoanTypeName ? data.loanrec_data[0].LoanTypeName : '' ,
                        LoanObjName: !!data.loanrec_data[0].LoanObjName ? data.loanrec_data[0].LoanObjName : '',
                    })

                    setInputDataOrderInterest(data.loanrec_data[0].OrderInterest === null ? false : data.loanrec_data[0].OrderInterest === 1 || data.loanrec_data[0].OrderInterest === '1' ? true : false)

                    setInputDataSubmitIndividual({
                        // ...inputDataSubmitIndividual,
                        principle: data.loanrec_data[0].principle === null ? 0 : data.loanrec_data[0].principle,
                        // OldInterest: data.loanrec_data[0].OldInterest === null ? 0 : data.loanrec_data[0].OldInterest,
                        // OldFine: data.loanrec_data[0].OldFine === null ? 0 : data.loanrec_data[0].OldFine,
                        OldInterest: data.singlecard_data[0].InterestKang2 === null ? 0 : data.singlecard_data[0].InterestKang2,
                        OldFine: data.singlecard_data[0].FineKang === null ? 0 : data.singlecard_data[0].FineKang, // P'Pong specify 13/01/22
                        Interest: data.loanrec_data[0].Interest === null ? 0 : data.loanrec_data[0].Interest,
                        ChargeRate: data.loanrec_data[0].ChargeRate === null ? 0 : data.loanrec_data[0].ChargeRate,
                    })

                    // Set amout due
                    setDueAmount((data.loandue_data.length -1) > 0 ? data.loandue_data.length -1 : 0)

                    // Set value Array due
                    for(let i=0; i<data.loandue_data.length; i++) {
                        let loanDUEArr = [...inputDataSubmitLoanDUE]
                        loanDUEArr[i].ITEM = data.loandue_data[i].ITEM
                        loanDUEArr[i].DUEDATE = data.loandue_data[i].DUEDATE
                        loanDUEArr[i].PAYREC = data.loandue_data[i].PAYREC
                        setInputDataSubmitLoanDUE(loanDUEArr)
                    }
                    
                    
                    // Set value new farmer id
                    console.log(data.farmer_data)
                    setInputDataNewFarmer(data.farmer_data)
                    setInputDataNewFarmerIDCard(data.farmer_data.IDCard)

                    getIndividualcard(data.loanrec_data[0].LoanNumber)

                    if(data.old_priciple_data[0] === undefined) {
                        console.log('getOldPriciple',data.old_priciple_data[0])
                        setInputDataIndividualcardCloseContact({
                            Fines: null,
                            PrincipleBalance: null,
                            TotalInterest: null
                        })
                    } else {
                        console.log('getOldPriciple',data.old_priciple_data[0])
                        setInputDataIndividualcardCloseContact(data.old_priciple_data[0])
                    }

                    // Edit 18/05/65 ปรับค่า เงินต้น,ดอกเบี้ย ให้เท่ากับ เงินต้นค้างเดิม, ดอกเบี้ยค้างเดิม
                    // if(action === 'edit' || action === 'view') {
                    //     setInputDataSubmitIndividual({
                    //         ...inputDataSubmitIndividual,
                    //         principle: data.old_priciple_data[0].PrincipleBalance,
                    //         OldInterest: data.old_priciple_data[0].TotalInterest,
                    //     })
                    // }
                    
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

        if((inputDataNewFarmerIDCard === null || inputDataNewFarmerIDCard === '')) {
            setErr(true)
            setErrMsg('กรุณาใส่เลขบัตรประชาชน')
        } else {
            if(inputDataNewFarmerIDCard.length === 13) {
                axios.post(
                    `${server_hostname}/admin/api/search_farmer`, {
                        Name: null,
                        Sirname: null,
                        IDCard: inputDataNewFarmerIDCard,
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
                    console.log('getIndividualcard',data.singlecard_data[data.singlecard_data.length - 1])
                    setInputDataIndividualcard(data.singlecard_data[data.singlecard_data.length - 1])
                    if(action === 'add') {
                        if(data.closecontact_data[0] === undefined) {
                            console.log('getIndividualcardCloseContact',data.closecontact_data[0])
                            setInputDataIndividualcardCloseContact({
                                Fines: null,
                                PrincipleBalance: null,
                                TotalInterest: null
                            })
                        } else {
                            console.log('getIndividualcardCloseContact',data.closecontact_data[0])
                            setInputDataIndividualcardCloseContact(data.closecontact_data.length > 0 ? data.closecontact_data[data.closecontact_data.length - 1] : data.closecontact_data[0])
                            setInputDataSubmitIndividual({
                                ...inputDataSubmitIndividual,
                                principle: data.closecontact_data.length > 0 ? data.closecontact_data[data.closecontact_data.length - 1].PrincipleBalance : data.closecontact_data[0].PrincipleBalance,
                                // OldInterest: data.closecontact_data.length > 0 ? data.closecontact_data[data.closecontact_data.length - 1].TotalInterest : data.closecontact_data[0].TotalInterest,
                            })
                        }
                    } 
                    
                    setInputDataSubmitIndividual({
                        ...inputDataSubmitIndividual,
                        principle: data.closecontact_data.length > 0 ? data.closecontact_data[data.closecontact_data.length - 1].PrincipleBalance : data.closecontact_data[0].PrincipleBalance,
                        // OldInterest: data.closecontact_data.length > 0 ? data.closecontact_data[data.closecontact_data.length - 1].TotalInterest : data.closecontact_data[0].TotalInterest,
                    })
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

    const handleChangeCheckbox = (event) => {
        // setInputDataSubmit({
        //     ...inputDataSubmit,
        //     OrderInterest: event.target.checked
        // });
        setInputDataOrderInterest(event.target.checked)
        console.log(event.target.checked)
    };

    const handleNewFarmer = (event) => {
        event.target.value = event.target.value.toString().slice(0, 13)  
        // console.log(event.target.value)
        setInputDataNewFarmerIDCard(event.target.value)
    }

    const handleDUEAmount = (event) => {
        setDueAmount(event.target.value)
        console.log(event.target.value)
        setInputDataSubmitLoanDUE([
            { ITEM: 1, DUEDATE: moment(currentDate).add(0, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 2, DUEDATE: moment(currentDate).add(1, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 3, DUEDATE: moment(currentDate).add(2, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 4, DUEDATE: moment(currentDate).add(3, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 5, DUEDATE: moment(currentDate).add(4, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 6, DUEDATE: moment(currentDate).add(5, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 7, DUEDATE: moment(currentDate).add(6, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 8, DUEDATE: moment(currentDate).add(7, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 9, DUEDATE: moment(currentDate).add(8, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 10, DUEDATE: moment(currentDate).add(9, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 11, DUEDATE: moment(currentDate).add(10, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 12, DUEDATE: moment(currentDate).add(11, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 13, DUEDATE: moment(currentDate).add(12, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 14, DUEDATE: moment(currentDate).add(13, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 15, DUEDATE: moment(currentDate).add(14, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 16, DUEDATE: moment(currentDate).add(15, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 17, DUEDATE: moment(currentDate).add(16, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 18, DUEDATE: moment(currentDate).add(17, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 19, DUEDATE: moment(currentDate).add(18, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 20, DUEDATE: moment(currentDate).add(19, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 21, DUEDATE: moment(currentDate).add(20, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 22, DUEDATE: moment(currentDate).add(21, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 23, DUEDATE: moment(currentDate).add(22, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 24, DUEDATE: moment(currentDate).add(23, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 25, DUEDATE: moment(currentDate).add(24, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 26, DUEDATE: moment(currentDate).add(25, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 27, DUEDATE: moment(currentDate).add(26, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 28, DUEDATE: moment(currentDate).add(27, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 29, DUEDATE: moment(currentDate).add(28, 'year').format('YYYY-MM-DD'), PAYREC: null },
            { ITEM: 30, DUEDATE: moment(currentDate).add(29, 'year').format('YYYY-MM-DD'), PAYREC: null },
        ])
    }

    const handleInputDataSubmit = (event) => {
        // console.log('event.target.value',event.target.value)
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

    const handleDataProjectcode = (e) => {
        setInputDataLoanRec({
            ...inputDataLoanRec,
            Projectcode: e.target.value
        })
    }
    
    const handleDataProjectName = (e) => {
        setInputDataLoanRec({
            ...inputDataLoanRec,
            ProjectName: e.target.value
        })
    }

    const handleDataProjectSubCode = (e) => {
        setInputDataLoanRec({
            ...inputDataLoanRec,
            ProjectSubCode: e.target.value
        })
    }

    const handleDataProjectSubName = (e) => {
        setInputDataLoanRec({
            ...inputDataLoanRec,
            ProjectSubName: e.target.value
        })
    }

    const handleSubmit = (event, loanstatus) => {
        action_loanstatus = loanstatus;
        event.preventDefault();
    
        let addrecordcourtcontract = document.getElementById('addrecordcourtcontract');
        let formData = new FormData(addrecordcourtcontract);
        formData.append('LoanStatus', action_loanstatus)
        formData.append('Old_LoanID', loanID)

        formData.append('SPK_OrderDate', moment(inputDataSubmit.SPK_OrderDate).format('YYYY-MM-DD'))
        formData.append('RecDate', moment().format('YYYY-MM-DD'))
        formData.append('LoanDate', moment(inputDataSubmit.LoanDate).format('YYYY-MM-DD'))
        formData.append('LoanChangeDate', moment(inputDataSubmit.LoanChangeDate).format('YYYY-MM-DD'))
        formData.append('Guarantee_PropertyDate', moment(inputDataSubmit.Guarantee_PropertyDate).format('YYYY-MM-DD'))
        formData.append('DebtEditDate', moment(inputDataSubmit.DebtEditDate).format('YYYY-MM-DD'))
        formData.append('LoanGuaranteeBookDate', moment(inputDataSubmit.LoanGuaranteeBookDate).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate1', moment(inputDataSubmit.WarrantBookDate1).format('YYYY-MM-DD'))
        formData.append('WarrantBookDate2', moment(inputDataSubmit.WarrantBookDate2).format('YYYY-MM-DD'))
        formData.append('FarmerID', inputDataNewFarmer.FarmerID)    

        formData.set('principle', inputDataSubmitIndividual.principle)
        formData.set('OldInterest', inputDataSubmitIndividual.OldInterest)
        formData.set('OldFine', inputDataSubmitIndividual.OldFine)
        formData.set('Interest', inputDataSubmitIndividual.Interest)
        formData.set('ChargeRate', inputDataSubmitIndividual.ChargeRate)
        formData.set('OrderInterest', inputDataOrderInterest ? 1 : 0)
        
        formData.append('ProjectSubCode',!!inputDataLoanRec.ProjectSubCode?inputDataLoanRec.ProjectSubCode:'')
        formData.append('ProjectSubName',!!inputDataLoanRec.ProjectSubName?inputDataLoanRec.ProjectSubName:'')
        formData.append('Projectcode',!!inputDataLoanRec.Projectcode?inputDataLoanRec.Projectcode:'')
        formData.append('ProjectName',!!inputDataLoanRec.ProjectName?inputDataLoanRec.ProjectName:'')

        formData.set('CurrentYear', year.CurrentYear)
        formData.set('RecYear', year.RecYear)


        // formData.append('loandue_data', inputDataSubmitLoanDUE)

        let loandueDataArrValue = []
        for(let i=0; i<(dueAmount+1); i++) {
            loandueDataArrValue.push(inputDataSubmitLoanDUE[i])
        }
        formData.append('loandue_data', JSON.stringify(loandueDataArrValue));

        console.log(action)
        // admin/api/add_loandebt
        let url = ''
        if( action==='edit') {
            url =`${server_hostname}/admin/api/edit_loancourt`
            formData.append('LoanID', loanID)
        } else {
            url =`${server_hostname}/admin/api/add_loancourt`
        }

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

    const saveEditNotation = () => {
         // Edit notation
         axios.post(
            `${server_hostname}/admin/api/edit_notation_loancourt`, { 'notation': inputDataSubmit.notation, 'LoanID': loanID}, { headers: { "token": token } } 
        ).then(res=>{
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
        })
        .catch(err=>{console.log(err)})
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
        
    }

    const handlePrintPDF = () => {
        console.log('PDF - ContractNo:', loanNumber)
        console.log('PDF - UserName:',localStorage.getItem('provinceid'))

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
        url: `${siteprint}/report/pdf/GetContractDebtPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
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
        window.location.reload()
        // history.push('/manageinfo/searchmember');

    };

    const handleClosePopupErr = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)

    };

    const getAction = (actionVal) => {
        action = actionVal;
    }

    const gotoPrintContractDebt = () => {
        history.push('/loanrequest/PrintContractDebt');
    }

    const sumTable = () => {
        let sum = 0;
        for(let i=0; i<(dueAmount+1); i++) {
            sum += isNaN(inputDataSubmitLoanDUE[i].PAYREC) ? 0 : inputDataSubmitLoanDUE[i].PAYREC
            // console.log('inputDataSubmitLoanDUE',inputDataSubmitLoanDUE[i].PAYREC)
            // console.log('Sum inputDataSubmitLoanDUE',sum)
        }
        setSummaryTable(sum)
    }

    const rowTable = (val) => {
        // console.log('loanduc_data',val)
        let rowArr = []
        for(let i=0; i<val; i++) {
            rowArr.push(
                <div style={{flex: '1', width: '100%', display: 'flex'}}>
                    <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                        <MuiTextfield label='' value={!!inputDataSubmitLoanDUE[i].ITEM ? inputDataSubmitLoanDUE[i].ITEM : (i+1) } onChange={(event)=>{handleSubmitLoanDUEItem(event,i)}} />
                    </Grid>
                    <Grid item xs={12} md={4} style={{padding: '16px 0 0 16px'}}>
                        <MuiDatePicker label="" value={inputDataSubmitLoanDUE[i].DUEDATE === null ? moment(currentDate).add(i, 'year').format('YYYY-MM-DD') : inputDataSubmitLoanDUE[i].DUEDATE} onChange={(event)=>{handleSubmitLoanDUEDate(event,i)}}  />
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
        <div className="addrecordcourtcontract-page">
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
                                <h1>บันทึกตามคำพิพากษาศาล</h1>
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
                                    {/* <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่คำขอกู้ยืมเงิน" value={inputDataSearch.LoanID} name="LoanID" onChange={handleInputDataSearch} />
                                    </Grid> */}
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
                                <div className="table-box table-addrecordcourtcontract mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={36} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionCreate={false}
                                        actionView={false} 
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        printParam1={'LoanNumber'}
                                        tableName={'addRecordCourtContract'}
                                        addrecordcourtcontractAction={getAction}
                                        addrecordcourtcontractEvent={getCloseLoanDetail}
                                        createParam={'LoanID'}
                                        editEvent={getLoanDetail}
                                        eventParam={'LoanID'}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        formField ? 
                            <React.Fragment>  
                                <form className={`root ${action === 'view'? '_view': null}`} id="addrecordcourtcontract" noValidate autoComplete="off" onSubmit={handleSubmit}>     
                                    <Container maxWidth="lg">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {/* <p className="mg-t-20">สัญญาแปลงหนี้ใหม่จากสัญญากู้ยืมเงินเลขที่ RIET2343525/00003</p> */}

                                                {/* Paper 1 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <Grid container spacing={2}>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เลขที่บันทึก" name="DebtEditNumber" value={inputDataLoanRec.DebtEditNumber} onChange={handleInputDataSubmit}   />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่บันทึก" name="RecDate" value={inputDataLoanRec.RecDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, RecDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="ปีปัจจุบัน" name="CurrentYear" value={year.CurrentYear} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="PV_CODE"  name="PV_CODE" value={inputDataLoanRec.PV_CODE} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="PV_NAME"  name="PV_NAME" value={inputDataLoanRec.PV_NAME} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญญาเดิม"  inputdisabled="input-disabled"  /*name="Old_LoanID"*/ value={oldLoanNumber} onChange={handleInputDataSubmit}  />
                                                            {/* <MuiTextfield label="สัญญาเดิม"  inputdisabled="input-disabled" value={inputDataLoanRec.Old_LoanID} onChange={handleInputDataSubmit}  /> */}
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;" defaultValue='' />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" defaultValue='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            <p>เงินต้นค้างเดิม</p>
                                                            <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   value={!!inputDataIndividualcardCloseContact.PrincipleBalance ? inputDataIndividualcardCloseContact.PrincipleBalance : 0} onChange={handleInputDataSubmit}  /> {/* Fulor & P'Pong 26/01/22 */}
                                                            {/* <MuiTextfield label="เงินต้นค้างเดิม"  value={inputDataIndividualcard.principalBalance} /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <p>ดอกเบี้ยค้างเดิม</p>
                                                            <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   value={!!inputDataIndividualcardCloseContact.TotalInterest ? inputDataIndividualcardCloseContact.TotalInterest : 0} onChange={handleInputDataSubmit}  /> {/* Fulor & P'Pong 26/01/22 */}
                                                            {/* <MuiTextfield label="ดอกเบี้ยค้างเดิม"  value={inputDataIndividualcard.InterestKang2} /> P'Pong specify 13/01/22 */}
                                                            {/* <MuiTextfield label="ดอกเบี้ยค้างเดิม"  value={inputDataIndividualcard.interestKang} /> P'Pong specify 11/01/22 */}
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}> */}
                                                        <Grid item xs={12} md={3}>
                                                            {/* <MuiTextfield label="ค่าปรับค้างเดิม"  value={inputDataLoanRec.OldFine} /> */}
                                                            {/* <MuiTextfield label="ค่าปรับค้างเดิม"  value={inputDataIndividualcard.FineKang} /> P'Pong specify 11/01/22 */}
                                                            <p>ค่าปรับค้างเดิม</p>
                                                            <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   value={!!inputDataIndividualcardCloseContact.Fines ? inputDataIndividualcardCloseContact.Fines : 0} onChange={handleInputDataSubmit}  /> {/* Fulor & P'Pong 26/01/22 */}
                                                        </Grid>
                                                            {/* </Grid>
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการ" value={inputDataLoanRec.Projectcode} onChange={handleDataProjectcode}   />
                                                            {/* <MuiTextfield label="รหัสโครงการ" name="Projectcode" value={inputDataLoanRec.Projectcode} onChange={handleInputDataSubmit}   /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการ" value={inputDataLoanRec.ProjectName} onChange={handleDataProjectName}   />
                                                            {/* <MuiTextfield label="ชื่อโครงการ" name="ProjectName" value={inputDataLoanRec.ProjectName} onChange={handleInputDataSubmit}   /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการรอง" value={inputDataLoanRec.ProjectSubCode} onChange={handleDataProjectSubCode}  />
                                                            {/* <MuiTextfield label="รหัสโครงการรอง" name="ProjectSubCode" value={inputDataLoanRec.ProjectSubCode} onChange={handleInputDataSubmit}  /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการรอง" value={inputDataLoanRec.ProjectSubName} onChange={handleDataProjectSubName}   />
                                                            {/* <MuiTextfield label="ชื่อโครงการรอง" name="ProjectSubName" value={inputDataLoanRec.ProjectSubName} onChange={handleInputDataSubmit}   /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญญาเลขที่" value={inputDataLoanRec.LoanNumber} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่สัญญา" value={inputDataSubmit.LoanDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" id='' />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="บันทึกคำสั่งศาลปี" id='' name="RecYear" value={year.RecYear} onChange={handleInputDataSubmit}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            {/* principle */}
                                                            <p>จำนวนเงินให้กู้</p>
                                                            <MuiTextfieldCurrency label="" value={inputDataLoanRec.principle} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการหลัก"  lists={['โครงการหลัก1','โครงการหลัก2','โครงการหลัก3']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการหลัก" value={inputDataLoanRec.Projectcode} onChange={handleDataProjectcode}  />
                                                            {/* <MuiTextfield label="รหัสโครงการหลัก" name="Projectcode" value={inputDataLoanRec.Projectcode} onChange={handleInputDataSubmit}  /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการหลัก" value={inputDataLoanRec.ProjectName} onChange={handleDataProjectName}  />
                                                            {/* <MuiTextfield label="ชื่อโครงการหลัก" name="ProjectName" value={inputDataLoanRec.ProjectName} onChange={handleInputDataSubmit}  /> */}
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['วัตถุประสงค์การกู้ยืม1','วัตถุประสงค์การกู้ยืม2','วัตถุประสงค์การกู้ยืม3']} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            {/* objective1 */}
                                                            {/* <MuiTextfield label="วัตถุประสงค์การกู้ยืม" name="objective1" value={inputDataSubmit.objective1} onChange={handleInputDataSubmit} /> */} {/* P'Hanz edit 05/06/22 */}
                                                            <MuiTextfield label="วัตถุประสงค์การกู้ยืม" name="LoanobjName" value={inputDataSubmit.LoanobjName} onChange={handleInputDataSubmit} />          
                                                        
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทเงินกู้" inputdisabled="input-disabled" lists={['ประเภทเงินกู้1','ประเภทเงินกู้2','ประเภทเงินกู้3']} value={0} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            {/* LoanPeriod */}
                                                            {/* <MuiTextfield label="ประเภทเงินกู้" name="LoanPeriod" value={inputDataSubmit.LoanPeriod} onChange={handleInputDataSubmit}  />  */} {/* P'Hanz edit 05/06/22 */}
                                                            <MuiTextfield label="ประเภทเงินกู้" name="LoanPeriodName" value={inputDataSubmit.LoanPeriodName} onChange={handleInputDataSubmit}  /> 
                                                        
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทกู้ยืม" inputdisabled="input-disabled" lists={['ประเภทกู้ยืม1','ประเภทกู้ยืม2','ประเภทกู้ยืม3']} value={0} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            {/* LoanobjName */}
                                                            {/* <MuiTextfield label="ประเภทกู้ยืม" name="LoanobjName" value={inputDataSubmit.LoanobjName} onChange={handleInputDataSubmit} /> */} {/* P'Hanz edit 05/06/22 */}
                                                            <MuiTextfield label="ประเภทกู้ยืม" name="LoanTypeName" value={inputDataSubmit.LoanTypeName} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทผู้กู้" inputdisabled="input-disabled" lists={['ประเภทผู้กู้1','ประเภทผู้กู้2','ประเภทผู้กู้3']} value={0} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={3}>
                                                            {/* LoanFarmerTypeName */}
                                                            <MuiTextfield label="ประเภทผู้กู้" name="LoanFarmerTypeName" value={inputDataSubmit.LoanFarmerTypeName} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue='' />
                                                        </Grid> */}
                                                        
                                                    </Grid>
                                                </Paper>


                                                {/* Paper 2 - -------------------------------------------------- */}
                                                <Paper className="paper line-top-green paper mg-t-35">
                                                    <Grid container spacing={2}>
                                                        {/* <Grid item xs={12} md={2} className="txt-center-v txt-center">
                                                            <p>ฝ่ายหนึ่งกับ</p>
                                                        </Grid> */}

                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" inputdisabled="input-disabled" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputDataNewFarmerIDCard} onInput={handleNewFarmer} />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <p>&nbsp;</p>
                                                            <ButtonFluidPrimary label="ค้นหา" onClick={getNewFarmerDetail} />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" value={inputDataNewFarmer.FrontName} onChange={handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" value={inputDataNewFarmer.Name} onChange={handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" value={inputDataNewFarmer.Sirname} onChange={handleInputDataFarmer}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfieldEndAdornment label="อายุ" inputdisabled="input-disabled" value={inputDataNewFarmer.AGE} endAdornment="ปี" onChange={handleInputDataFarmer} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="อยู่บ้านเลขที่" inputdisabled="input-disabled"  value={inputDataNewFarmer.Contact_AddNo} onChange={handleInputDataFarmer}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="หมู่"  inputdisabled="input-disabled" value={inputDataNewFarmer.Contact_AddMoo} onChange={handleInputDataFarmer}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ถนน"  inputdisabled="input-disabled"  value={inputDataNewFarmer.Contact_AddrSoiRoad} onChange={handleInputDataFarmer}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" startText={' '}  lists={subdistrictList} value={inputDataNewFarmer.Contact_AddrSubdistrictID === null ? '' : inputDataNewFarmer.Contact_AddrSubdistrictID} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ"  startText={' '} lists={districtList} value={inputDataNewFarmer.Contact_AddrDistrictID === null ? '' : inputDataNewFarmer.Contact_AddrDistrictID} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" startText={' '} lists={provinceList} value={inputDataNewFarmer.Contact_AddrProvinceID === null ? '' : inputDataNewFarmer.Contact_AddrProvinceID}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="รหัสไปรษณีย์" inputdisabled="input-disabled"   value={inputDataNewFarmer.Contact_Postcode} onChange={handleInputDataFarmer}   />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue='' />
                                                        </Grid> */}
                                                        {/* <Grid item xs={12} md={12}>
                                                            <p>ปรากฏตามสำเนาภาพถ่ายบัตรประจำตัวประชาชนและสำเนาทะเบียนบ้านแนบท้ายสัญญานี้ ซึ่งต่อไปในสัญญานี้เรียกว่า “ลูกหนี้ใหม่” อีกฝ่ายหนึ่ง</p>
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
                                                                                <MuiDatePicker label="วันที่รับคำพิพากษาศาล" name="DebtEditDate" value={inputDataSubmit.DebtEditDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, DebtEditDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldMultiLine label="หมายเหตุ" row="3" id="notation" name="notation" value={inputDataSubmit.notation} onChange={handleInputDataSubmit}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                            <Checkbox
                                                                                checked={inputDataOrderInterest}
                                                                                onChange={handleChangeCheckbox}
                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                />
                                                                                <span>คำสั่งศาลคิดดอกเบี้ยตามเงินต้นตั้งสัญญา</span>
                                                                                {/* <MuiCheckbox label="Alro Land" /> */}
                                                                            </Grid>
                                                                            {/* <Grid item xs={12} md={6}>
                                                                                <MuiTextfield label="&nbsp;" defaultValue='เงินกู้' />
                                                                            </Grid> */}
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
                                                                                    <p className="paper-p txt-right">เงินต้นศาล</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label='' name="principle" value={inputDataSubmitIndividual.principle === null || inputDataSubmitIndividual.principle === '' ? 0 : inputDataSubmitIndividual.principle} onChange={handleInputDataSubmitIndividual}/>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ยศาล</p>
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
                                                                                    <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   value={!!inputDataIndividualcardCloseContact.PrincipleBalance ? inputDataIndividualcardCloseContact.PrincipleBalance : 0} onChange={handleInputDataSubmitIndividual}  />
                                                                                    {/* <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataIndividualcard.principalBalance} onChange={handleInputDataSubmitIndividual}/> * edit 10/05/65 P'Pong&Foolur */}
                                                                                    {/* <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataIndividualcard.principle} onChange={handleInputDataSubmitIndividual}/>  */}
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ดอกเบี้ย สัญญาเดิม</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency label="" inputdisabled="input-disabled"   value={!!inputDataIndividualcardCloseContact.TotalInterest ? inputDataIndividualcardCloseContact.TotalInterest : 0} onChange={handleInputDataSubmitIndividual}  /> 
                                                            
                                                                                    {/* <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataIndividualcard.interestKang} onChange={handleInputDataSubmitIndividual}/> * edit 10/05/65 P'Pong&Foolur * P'Pong specify 11/01/22 */}
                                                                                    {/* <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataIndividualcard.interest} onChange={handleInputDataSubmitIndividual}/>  */}
                                                                                    {/* <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataIndividualcard.InterestKang2} onChange={handleInputDataSubmitIndividual}/>  */}
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
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={inputDataSubmitIndividual.principle === null ? 0 : inputDataSubmitIndividual.principle} onChange={handleInputDataSubmitIndividual}/> 
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <p className="paper-p txt-right">ผลรวมงวดชำระ</p>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={5}>
                                                                                    <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"  value={summaryTable} onChange={handleInputDataSubmitIndividual}/> 
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
                                                <Paper className="paper line-top-green" style={{display: 'none'}}>
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
                                                        <Grid item xs={12} md={7}>
                                                            <p>ข. หนังสือสัญญารับรองผูกพันตนรับผิดชอบอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกรรวม</p>
                                                            <MuiTextfieldCurrency label="" name="Guarantee_Person" value={inputDataSubmit.Guarantee_Person} onChange={handleInputDataSubmit} />
                                                        </Grid> 
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
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
                                                <Paper className="paper line-top-green" style={{display: 'none'}}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p>หมายเหตุ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="1. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName" value={inputDataLoanRec.WitnessName} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr" value={inputDataLoanRec.WitnessAddr} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard" value={inputDataLoanRec.WitnessIDCard} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade" value={inputDataLoanRec.WitnessIDCardMade} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="2. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName2" value={inputDataLoanRec.WitnessName2} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr2" value={inputDataLoanRec.WitnessAddr2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard2" value={inputDataLoanRec.WitnessIDCard2} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade2" value={inputDataLoanRec.WitnessIDCardMade2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="3. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName3" value={inputDataLoanRec.WitnessName3} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr3" value={inputDataLoanRec.WitnessAddr3} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard3" value={inputDataLoanRec.WitnessIDCard3} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade3" value={inputDataLoanRec.WitnessIDCardMade3} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="4. ชื่อพยาน" inputdisabled="input-disabled" name="WitnessName4" value={inputDataLoanRec.WitnessName4} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr4" value={inputDataLoanRec.WitnessAddr4} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" inputdisabled="input-disabled" name="WitnessIDCard4" value={inputDataLoanRec.WitnessIDCard4} onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMade4" value={inputDataLoanRec.WitnessIDCardMade4} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>

                                            </Grid>

                                        </Grid>
                                    </Container>
                                    
                                    {/* Button row */}
                                    <Container maxWidth="md">
                                          {/* <Grid container spacing={2} className="btn-row txt-center">
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidPrimary label="บันทึกชั่วคราว" id="" onClick={(event)=>handleSubmit(event, 'draft')} />
                                                </Grid>
                                                <Grid item xs={12} md={4} >
                                                    <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" onClick={()=>setConfirm(true)}/>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF}  />
                                                </Grid>
                                            </Grid> */}
                                        {
                                            (Number(inputDataSubmitIndividual.principle) === summaryTable) && Number(inputDataSubmitIndividual.principle) >= 0 && summaryTable >= 0 ?
                                            <Grid container spacing={2} className="btn-row txt-center">
                                                {
                                                    action === 'view' ?  
                                                    <Grid item xs={12} md={12}>
                                                        <ButtonFluidPrimary label="บันทึกแก้ไข" id="" maxWidth="240px" onClick={()=> saveEditNotation() } />
                                                        {/* <ButtonFluidIconStartPrimary maxWidth="240px" label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF}  /> */}
                                                    </Grid> 
                                                    :
                                                    <React.Fragment>
                                                        <Grid item xs={12} md={2}>
                                                            <p >&nbsp;</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <ButtonFluidPrimary label="บันทึกชั่วคราว" id="" onClick={(event)=>handleSubmit(event, 'draft')} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4} >
                                                            <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" onClick={()=>setConfirm(true)}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <p >&nbsp;</p>
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={4}>
                                                            <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF}  />
                                                        </Grid> */}
                                                    </React.Fragment>
                                                }
                                                
                                            </Grid>
                                            :
                                            <Grid container spacing={2} className="btn-row txt-center">
                                                 <Grid item xs={12} md={12}>
                                                    <p className="txt-red">*หมายเหตุ: ช่องผลรวมเงินต้น กับ ช่องผลงวดชำระ ต้องมีจำนวนเท่ากัน จึงสามารถบันทึกได้</p>
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <p >&nbsp;</p>
                                                </Grid>
                                                <Grid item xs={12} md={4}  style={{opacity: '0.5', pointerEvents: 'none'}} >
                                                    <ButtonFluidPrimary label="บันทึกชั่วคราว" id=""/>
                                                </Grid>
                                                <Grid item xs={12} md={4}  style={{opacity: '0.5', pointerEvents: 'none'}}  >
                                                    <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <p >&nbsp;</p>
                                                </Grid>
                                                {/* <Grid item xs={12} md={4}  style={{opacity: '0.5', pointerEvents: 'none'}} >
                                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} />
                                                </Grid> */}
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
                onClose={handleClosePopupErr}
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
                            
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopupErr} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default AddRecordCourtContract
