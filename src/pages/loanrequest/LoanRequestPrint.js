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
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
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

import { MUItable } from '../../components/MUItable'
import { nullFormat } from 'numeral';
import { nullLiteral } from '@babel/types';

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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [applicantProjectYear, setApplicantProjectYear] = useState()
    const [projectList, setProjectList] = useState([]);
    const [projectSubCodeText, setProjectSubCodeText] = useState('')
    const [projectSubNameText, setProjectSubNameText] = useState('')
    const [errNoticeProject, setErrNoticeProject] = useState(false);
    const [errNoticeProjectMsg, setErrNoticeProjectMsg] = useState('ไม่พบข้อมูล');

    const [showConfirmButton, setShowConfirmButton] = useState(true)

    const [inputDataSearch, setInputDataSearch] = useState({
        SearchByApplicantNo: '',
        SearchByLoanNumber: '',
        SearchByName: '',
    })

    const [inputSelectDateLoandata, setInputSelectDateLoandata] = useState([
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
        { dd: '00', mm: '00', yyyy: '0000',},
    ])


    const [inputSelectDate, setInputSelectDate] = useState({
        recdatedd: '00',
        recdatemm: '00',
        recdateyyyy: '0000',

        loandatedd: '00',
        loandatemm: '00',
        loandateyyyy: '0000',

        spkorderdatedd: '00',
        spkorderdatemm: '00',
        spkorderdateyyyy: '0000',

        guaranteepropertydd: '00',
        guaranteepropertymm: '00',
        guaranteepropertyyyyy: '0000',

        loanguaranteebookdd: '00',
        loanguaranteebookmm: '00',
        loanguaranteebookyyyy: '0000',

        warrantbookdate1dd: '00',
        warrantbookdate1mm: '00',
        warrantbookdate1yyyy: '0000',

        warrantbookdate2dd: '00',
        warrantbookdate2mm: '00',
        warrantbookdate2yyyy: '0000',

        firstdatepaiddd: '00',
        firstdatepaidmm: '00',
        firstdatepaidyyyy: '0000',

        lastdatepaiddd: '00',
        lastdatepaidmm: '00',
        lastdatepaidyyyy: '0000',
    })

    const [applicantNo, setApplicantNo] = useState('')
    const [loanID, setLoanID] = useState('')
    const [loanNumber, setLoanNumber] = useState('')
    const [inputDataFarmer, setInputDataFarmer] = useState([])
    const [inputDataLand, setInputDataLand] = useState([])
    const [inputData, setInputData] = useState([])
    const [loanPeriodCodeValue, setLoanPeriodCodeValue] = useState(null)
    // const [inputDataLoan, setinputDataLoan] = useState([])
    const [inputDataSubmit, setInputDataSubmit] = useState({
        ApplicantID: '', // 1,
        LoanDate: moment().format(), // "",
        RecordCode: '', // "",
        RecDate: moment().format(), // "",
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
        SPK_OrderDate: moment().format(), // "",
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
        Guarantee_PropertyDate: moment().format(), // "",
        Guarantee_Person: '', // "",
        LoanGuaranteeBook: '', // "",
        LoanGuaranteeBookDate: moment().format(), // "null",
        WarrantBookOwner1: '', // "",
        WarrantBook1: '', // "",
        WarrantBookDate1: moment().format(), // "null",
        WarrantBookOwner2: '', // "",
        WarrantBook2: '', // "",
        WarrantBookDate2: moment().format(), // "null",
        WarrantBookOwner3: '', // "",
        WarrantBook3: '', // "",
        WarrantBookDate3: moment().format(), // "null",
        WarrantBookOwner4: '', // "",
        WarrantBook4: '', // "",
        WarrantBookDate4: moment().format(), // "null",
        Free_of_debt_Month: '', // "",
        Free_of_debt_Year: '', // "",
        Free_of_debt_Time: 0, // "",
        FirstDatePaid: moment().add(1, 'Y').format(), // "null",
        principle: '', // 123,
        Interest: 0, // 4,
        ChargeRate: '', // "",
        LastDatePaid: moment().add(1, 'Y').format(), // "null",
        OfficeProvince: provincename, // "",
        WitnessName: '', // "",
        WitnessAddr: '', // "",
        WitnessIDCard: '', // "",
        WitnessIDCardMade: '', // "",
        WitnessName2: '', // "",
        WitnessAddr2: '', // "",
        WitnessIDCard2: '', // "",
        WitnessIDCardMade2: '', // "",
        ChangeContactCommit: '', // "",
        ChangeContactCommitDate: moment().format(), // "",
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

    const [loandueDataAPI, setLoandueDataAPI] = useState(null)
    const [loandueDataArr, setLoandueDataArr] = useState([
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
        { DUEDATE: null, PAYREC : null},
    ])

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

    const [Free_of_debt, setFree_of_debt] = useState('1')

    const [summaryTable, setSummaryTable] = useState(0)
    let summaryLoanObj = 
    ((inputDataSubmit.Loan_Obj1Amount === 0 || inputDataSubmit.Loan_Obj1Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj1Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
    (inputDataSubmit.Loan_Obj2Amount === 0 || inputDataSubmit.Loan_Obj2Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj2Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputDataSubmit.Loan_Obj3Amount === 0 || inputDataSubmit.Loan_Obj3Amount === '' ? 0 : parseFloat((inputDataSubmit.Loan_Obj3Amount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})

    let summaryInstallment =  ((inputDataSubmit.Loan_Installment1 === 0 || inputDataSubmit.Loan_Installment1 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputDataSubmit.Loan_Installment2 === 0 || inputDataSubmit.Loan_Installment2 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputDataSubmit.Loan_Installment3 === 0 || inputDataSubmit.Loan_Installment3 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
    (inputDataSubmit.Loan_Installment4 === 0 || inputDataSubmit.Loan_Installment4 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment4.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputDataSubmit.Loan_Installment5 === 0 || inputDataSubmit.Loan_Installment5 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment5.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})

    const [checkSumInstallment, setCheckSumInstallment] = useState(false)
    const [checkSumTable, setCheckSumTable] = useState(false)

    const [tableResult, setTableResult] = useState([])
    const [openLoanRequestInfo, setOpenLoanRequestInfo] = useState(false)

    const [provinceList, setprovinceList] = useState(['กรุณาเลือกจังหวัด']);
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))

    const [confirmSuccessStep1, setConfirmSuccessStep1] = useState(false)
    const [confirmSuccessStep2, setConfirmSuccessStep2] = useState(false)

    const [rows, setRows] = useState([])

    const rowsLabel = [
        // 'ApplicantID',
        'RecordCode',
        'RecDate', 
        'ApplicantDate', 
        'ApplicantNo',
        'ApplicantStatus',
        'ProjectID',
        'ProjectName', 
        'LoanNumber',
        'dCreated',
        'IDCard', 
        'FrontName',
        'Name',
        'Sirname', 
        'IDCARD_AddNo',
    ]

    const headCells = [
        // { id: 'ApplicantID', numeric: false, disablePadding: true, widthCol: '0px', label: 'รหัสบันทึก' },
        { id: 'RecordCode', numeric: false, disablePadding: true, widthCol: '140px', label: 'รหัสบันทึก' },
        { id: 'RecDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่บันทึก' },
        { id: 'ApplicantDate', numeric: false, disablePadding: false, widthCol: '180px', label: 'วันที่ยื่นคำขอ' },
        { id: 'ApplicantNo', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขคำขอ' },
        { id: 'ApplicantStatus', numeric: false, disablePadding: false, widthCol: '150px', label: 'สถานะคำขอ' },
        { id: 'ProjectID', numeric: false, disablePadding: false, widthCol: '150px', label: 'รหัสโครงการ' },
        { id: 'ProjectName', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อโครงการ' },
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขที่สัญญา' },
        { id: 'dCreated', numeric: false, disablePadding: false, widthCol: '180px', label: 'วันที่บันทึกสัญญา' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '180px', label: 'เลขบัตรประชาชน' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '150px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '150px', label: 'นามสกุล' },
        { id: 'IDCARD_AddNo', numeric: false, disablePadding: false, widthCol: '250px', label: 'ที่อยู่' },
    ]
        // <TableCell align="left">{cell.IDCARD_AddNo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddrSoiRoad} {cell.IDCARD_AddrDistrictName} {cell.IDCARD_AddrProvinceName} {cell.IDCARD_Postcode}</TableCell>
                                                            
    
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

    function createData(FarmerID, ApplicantID, LoanID,RecordCode, RecDate, ApplicantDate, ApplicantNo, ApplicantStatus, ProjectID,ProjectName, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, IDCARD_AddNo) {
        return {FarmerID, ApplicantID, LoanID, RecordCode, RecDate, ApplicantDate, ApplicantNo, ApplicantStatus, ProjectID,ProjectName, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, IDCARD_AddNo }
    }

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    // Re order date 2021-08-23 to 2564-08-23
    const reOrderDateENtoTH = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return yyyy+'-'+mm+'-'+dd
    }

    // Re order date 23-08-2564 to 2021-08-23
    const reOrderDateTHtoEN = (val) => {
        let yyyy = Number(val.substring(6,10)) - 543
        let mm = val.substring(3,5)
        let dd = val.substring(0,2)
        return yyyy+'-'+mm+'-'+dd
    }

    const getProject = (planYear, projectID) => {
            
        axios.post(
            `${server_hostname}/admin/api/search_project_step3`, {
                "ProjectYear": planYear + 2500
            }, { headers: { "token": token } } 
        ).then(res => {
                // console.log(res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    // setErr(true);
                    setErrNoticeProject(true);
                    setErrNoticeProjectMsg('ไม่พบข้อมูลโครงการ');
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
                    console.log('ProjectList',data.data)
                    setProjectList(data.data)

                    // Set detail ProjectID
                    for(let i=0; i<data.data.length; i++) {
                        if(data.data[i].ProjectID === projectID) {
                            setProjectSubCodeText(data.data[i].ProjectSubCode)
                            setProjectSubNameText(data.data[i].ProjectSubName)
                        }
                    }
                }
            }
        ).catch(err => { console.log(err);})
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const getSearchApprovedApplicant = () => {
        setIsLoading(true)
        setOpenLoanRequestInfo(false)
        axios.post(
            `${server_hostname}/admin/api/search_approved_applicant`, {
                ApplicantNo: inputDataSearch.SearchByApplicantNo || '',
                LoanNumber: inputDataSearch.SearchByLoanNumber || '',
                Name: inputDataSearch.SearchByName || '',
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
                    setTableResult(data.data)
                    // setRows(data.data)
                    setRows(
                        data.data.map((item,i)=>
                            createData(
                                item.FarmerID,
                                item.ApplicantID,
                                item.LoanID,
                                item.RecordCode === null ? '' : item.RecordCode,
                                item.RecDate === null ? '' : newOrderDate(item.RecDate),
                                !!item.ApplicantDate ? newOrderDate(item.ApplicantDate) : null,
                                item.ApplicantNo === null ? '' : item.ApplicantNo,
                                item.ApplicantStatus === null || !item.ApplicantStatus ? 'P' : item.ApplicantStatus,
                                item.ProjectID === null ? '' : item.ProjectID,
                                item.ProjectName === null ? '' : item.ProjectName,
                                item.LoanNumber === null ? '' : item.LoanNumber,
                                item.dCreated ? newOrderDate(item.dCreated) : null,
                                item.IDCard === null ? '' : item.IDCard,
                                item.FrontName === null ? '' : item.FrontName,
                                item.Name === null ? '' : item.Name,
                                item.Sirname === null ? '' : item.Sirname,
                                item.IDCARD_AddNo === undefined ? '' : item.IDCARD_AddNo +' '+item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo+' '+item.IDCARD_AddrSoiRoad === undefined ? '' : item.IDCARD_AddrSoiRoad+' '+item.IDCARD_AddrSubdistrictName === undefined ? '' : item.IDCARD_AddrSubdistrictName+' '+item.IDCARD_AddrDistrictName === undefined ? '' : item.IDCARD_AddrDistrictName+' '+item.IDCARD_AddrProvinceName === undefined ? '' : item.IDCARD_AddrProvinceName+' '+item.IDCARD_Postcode  === undefined ? '' : item.IDCARD_Postcode
                            )
                        )
                    )
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getDataApprovedApplicant = (applicantID, farmerID, applicantNo, loanID, loanNumber) => {
        
        setIsLoading(true);
        setInputDataFarmer([])
        setInputDataLand([])
        setLoandue_data1({ DUEDATE: null, PAYREC: ''  })
        setLoandue_data2({ DUEDATE: null, PAYREC: ''  })
        setLoandue_data3({ DUEDATE: null, PAYREC: ''  })
        setLoandue_data4({ DUEDATE: null, PAYREC: ''  })
        setLoandue_data5({ DUEDATE: null, PAYREC: ''  })
        setLoandueDataArr([
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
            { DUEDATE: null, PAYREC : null},
        ])
        setInputSelectDateLoandata([
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
            { dd: '00', mm: '00', yyyy: '0000',},
        ])

        setInputSelectDate({
            recdatedd: '00',
            recdatemm: '00',
            recdateyyyy: '0000',
    
            loandatedd: '00',
            loandatemm: '00',
            loandateyyyy: '0000',
    
            spkorderdatedd: '00',
            spkorderdatemm: '00',
            spkorderdateyyyy: '0000',
    
            guaranteepropertydd: '00',
            guaranteepropertymm: '00',
            guaranteepropertyyyyy: '0000',
    
            loanguaranteebookdd: '00',
            loanguaranteebookmm: '00',
            loanguaranteebookyyyy: '0000',
    
            warrantbookdate1dd: '00',
            warrantbookdate1mm: '00',
            warrantbookdate1yyyy: '0000',
    
            warrantbookdate2dd: '00',
            warrantbookdate2mm: '00',
            warrantbookdate2yyyy: '0000',
    
            firstdatepaiddd: '00',
            firstdatepaidmm: '00',
            firstdatepaidyyyy: '0000',
    
            lastdatepaiddd: '00',
            lastdatepaidmm: '00',
            lastdatepaidyyyy: '0000',
        })
        

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
                    console.log(applicantID, farmerID,data.Farmer[0])
                    console.log('action',action)

                    getProject(data.data[0].ProjectPlanYear, data.data[0].ProjectID)
                    

                    if(action === 'add') {
                        console.log('data.data[0].LoanPeriodCode',data.data[0].LoanPeriodCode)
                        // Action : Add
                        setInputDataFarmer(data.Farmer[0])
                        setInputDataLand(data.Land[0])
                        setInputData(data.data[0])
                        setLoanPeriodCodeValue(data.data[0].LoanPeriodCode)
                        setLoandueDataAPI(null)
                        setIsLoading(false);
                        setApplicantNo(applicantNo);

                        setInputData({
                            ...inputData,
                            ProjectID: 0
                        })
                        // setinputDataLoan({
                        //     ...inputDataLoan,

                        // })
                        setInputDataSubmit({
                            ...inputDataSubmit, 
                            FarmerID: farmerID,
                            ApplicantID: applicantID,
                            AGE: data.Farmer[0].AGE || '', // "",
                            Loan_Obj1: data.data[0].objective1 === null ? '' : data.data[0].objective1, // "",
                            Loan_Obj1Amount: data.data[0].Loan_amount1 === null ? 0 : data.data[0].Loan_amount1, // "",
                            Loan_Obj2: data.data[0].objective2 === null ? '' : data.data[0].objective2, // "",
                            Loan_Obj2Amount: data.data[0].Loan_amount1 === null ? 0 : data.data[0].Loan_amount2, // "",
                            Loan_Obj3: data.data[0].objective3 === null ? '' : data.data[0].objective3, // "",
                            Loan_Obj3Amount: data.data[0].Loan_amount3 === null ? '' : data.data[0].Loan_amount3, // "",
                            OfficeProvince: provincename, // "",
                            LoanDate: moment().format(), // "",
                            RecordCode: '', // "",
                            RecDate: moment().format(), // "",
                            Nationality: '',
                            IDCardMadeDistrict: '', // "",
                            IDCardMadeProvince: '0', // "",
                            FarmerInDistrict: '', // "",
                            FarmerInProvince: '0', // "",
                            Officer: '', // "",
                            OfficerRank: '', // "",
                            SPK_Order: '', // "",
                            SPK_OrderDate: moment().format(), // "",
                            Loan_Installment1: 0, // "",
                            Loan_Installment2: 0, // "",
                            Loan_Installment3: 0, // "",
                            Loan_Installment4: 0, // "",
                            Loan_Installment5: 0, // "",
                            Farmer_Accept: '', // "",
                            Guarantee_Property: '', // "",
                            LoanContactBook: '', // "",
                            Guarantee_PropertyDate: moment().format(), // "",
                            Guarantee_Person: '', // "",
                            LoanGuaranteeBook: '', // "",
                            LoanGuaranteeBookDate: moment().format(), // "null",
                            WarrantBookOwner1: (!!data.data[0].Supporter_Fname1?data.data[0].Supporter_Fname1:'')+' '+(!!data.data[0].Supporter_Lname1?data.data[0].Supporter_Lname1:''), // "",
                            WarrantBook1: '', // "",
                            WarrantBookDate1: moment().format(), // "null",
                            WarrantBookOwner2: (!!data.data[0].Supporter_Fname2?data.data[0].Supporter_Fname2:'')+' '+(!!data.data[0].Supporter_Lname2?data.data[0].Supporter_Lname2:''), // "",
                            WarrantBook2: '', // "",
                            WarrantBookDate2: moment().format(), // "null",
                            WarrantBookOwner3: (!!data.data[0].Supporter_Fname3?data.data[0].Supporter_Fname3:'')+' '+(!!data.data[0].Supporter_Lname3?data.data[0].Supporter_Lname3:''), // "",
                            WarrantBook3: '', // "",
                            WarrantBookDate3: moment().format(), // "null",
                            WarrantBookOwner4: (!!data.data[0].Supporter_Fname4?data.data[0].Supporter_Fname4:'')+' '+(!!data.data[0].Supporter_Lname4?data.data[0].Supporter_Lname4:''), // "",
                            WarrantBook4: '', // "",
                            WarrantBookDate4: moment().format(), // "null",
                            Free_of_debt_Month: '', // "",
                            Free_of_debt_Year: '', // "",
                            Free_of_debt_Time: 0, // "",
                            FirstDatePaid: moment().add(1, 'Y').format(), // "null",
                            principle: '', // 123,
                            Interest: 0, // 4,
                            ChargeRate: '', // "",
                            LastDatePaid: moment().add(1, 'Y').format(), // "null",
                            WitnessName: '', // "",
                            WitnessAddr: '', // "",
                            WitnessIDCard: '', // "",
                            WitnessIDCardMade: '', // "",
                            WitnessName2: '', // "",
                            WitnessAddr2: '', // "",
                            WitnessIDCard2: '', // "",
                            WitnessIDCardMade2: '', // "",
                            ChangeContactCommit: '', // "",
                            ChangeContactCommitDate: moment().format(), // "",
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

                        setInputSelectDate({
                            ...inputSelectDate,
                            recdatedd: '00',
                            recdatemm: '00',
                            recdateyyyy: '0000',

                            loandatedd: '00',
                            loandatemm: '00',
                            loandateyyyy: '0000',

                            spkorderdatedd: '00',
                            spkorderdatemm: '00',
                            spkorderdateyyyy: '0000',

                            guaranteepropertydd: '00',
                            guaranteepropertymm: '00',
                            guaranteepropertyyyyy: '0000',

                            loanguaranteebookdd: '00',
                            loanguaranteebookmm: '00',
                            loanguaranteebookyyyy: '0000',

                            warrantbookdate1dd: '00',
                            warrantbookdate1mm: '00',
                            warrantbookdate1yyyy: '0000',

                            warrantbookdate2dd: '00',
                            warrantbookdate2mm: '00',
                            warrantbookdate2yyyy: '0000',

                            firstdatepaiddd: '00',
                            firstdatepaidmm: '00',
                            firstdatepaidyyyy: '0000',

                            lastdatepaiddd: '00',
                            lastdatepaidmm: '00',
                            lastdatepaidyyyy: '0000',
                        })

                        setLoanID(loanID)
                        setLoanNumber(loanNumber);
                        // setApplicantProjectYear(data.data[0].ProjectPlanYear)
                        // console.warn(data.data[0].ProjectPlanYear)
                        
                        

                    } else {
                        // Action : Edit
                        setInputDataFarmer(data.Farmer[0])
                        setInputDataLand(data.Land[0])
                        setInputData(data.data[0])
                        setApplicantNo(applicantNo);
                        setIsLoading(false);
                        // setApplicantProjectYear(data.data[0].ProjectPlanYear)
                        // console.warn(data.data[0].ProjectPlanYear)

                        getViewDataApprovedApplicant(applicantID, farmerID, applicantNo, loanID, loanNumber)
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


    const getViewDataApprovedApplicant = (applicantID, farmerID, applicantNo,loanID, loanNumber) => {
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
                    
                    setInputDataSubmit({
                        ...data.results[0], 
                        FarmerID: farmerID,
                        ApplicantID: applicantID,
                    })
                    setLoanID(loanID)
                    setLoanNumber(loanNumber);
                    // console.warn('Loandue_data',data.loandue_data)
                    setLoandueDataAPI(data.loandue_data)

                    /* 
                        ** How to insert Date on edit mode
                        step 1.loop get date from api insert to 'loandueDataArr'
                        step 2.
                    */
console.log('data.loandue_data.length',data.loandue_data.length)
                    if(data.loandue_data.length > 0) {
                        for(let i=0; i<data.loandue_data.length; i++) {
                            let loandueArr = [...loandueDataArr]

                            // console.warn('DUEDATE',reOrderDateENtoTH(data.loandue_data[i].DUEDATE))
                            loandueArr[i].DUEDATE = data.loandue_data[i].DUEDATE === null ? null : data.loandue_data[i].DUEDATE
                            loandueArr[i].PAYREC = parseFloat(data.loandue_data[i].PAYREC)
                            setLoandueDataArr(loandueArr)
                        }

                        // console.log('loandueDataArr',loandueDataArr)

                        for(let i=0; i<loandueDataArr.length; i++) {
                            // console.log('loandueDataArr[i].DUEDATE',loandueDataArr[i].DUEDATE)
                            let selectLoanDateArr = [...inputSelectDateLoandata]
                            
                            selectLoanDateArr[i].dd = loandueDataArr[i].DUEDATE === null ? '00' : loandueDataArr[i].DUEDATE.substring(8,10)
                            selectLoanDateArr[i].mm = loandueDataArr[i].DUEDATE === null ? '00' : loandueDataArr[i].DUEDATE.substring(5,7)
                            selectLoanDateArr[i].yyyy = loandueDataArr[i].DUEDATE === null ? '0000' : Number(loandueDataArr[i].DUEDATE.substring(0,4)) + 543
                            
                            setInputSelectDateLoandata(selectLoanDateArr)
                        }

                    }

                    // console.log('inputSelectDateLoandata',inputSelectDateLoandata)

                    // Insert Radio Free_of_debt
                    data.results[0].Free_of_debt_Month ? setFree_of_debt('0') : setFree_of_debt('1')

                    // let yyyy = Number(val.substring(0,4)) + 543
                    // let mm = val.substring(5,7)
                    // let dd = val.substring(8,10)
                    // console.log('data.results[0].LoanDate',data.results[0].LoanDate)
                    setInputSelectDate({
                        ...inputSelectDate,
                        loandatedd: data.results[0].LoanDate === null ? '00': data.results[0].LoanDate.substring(8,10),
                        loandatemm: data.results[0].LoanDate === null ? '00': data.results[0].LoanDate.substring(5,7),
                        loandateyyyy: data.results[0].LoanDate === null ? '0000': Number(data.results[0].LoanDate.substring(0,4)) + 543,

                        recdatedd: data.results[0].RecDate === null ? '00': data.results[0].RecDate.substring(8,10),
                        recdatemm: data.results[0].RecDate === null ? '00': data.results[0].RecDate.substring(5,7),
                        recdateyyyy: data.results[0].RecDate === null ? '0000': Number(data.results[0].RecDate.substring(0,4)) + 543,

                        spkorderdatedd: data.results[0].SPK_OrderDate === null ? '00': data.results[0].SPK_OrderDate.substring(8,10),
                        spkorderdatemm: data.results[0].SPK_OrderDate === null ? '00': data.results[0].SPK_OrderDate.substring(5,7),
                        spkorderdateyyyy: data.results[0].SPK_OrderDate === null ? '0000': Number(data.results[0].SPK_OrderDate.substring(0,4)) + 543,

                        guaranteepropertydd: data.results[0].Guarantee_PropertyDate === null ? '00': data.results[0].Guarantee_PropertyDate.substring(8,10),
                        guaranteepropertymm: data.results[0].Guarantee_PropertyDate === null ? '00': data.results[0].Guarantee_PropertyDate.substring(5,7),
                        guaranteepropertyyyyy: data.results[0].Guarantee_PropertyDate === null ? '0000': Number(data.results[0].Guarantee_PropertyDate.substring(0,4)) + 543,

                        loanguaranteebookdd: data.results[0].LoanGuaranteeBookDate === null ? '00': data.results[0].LoanGuaranteeBookDate.substring(8,10),
                        loanguaranteebookmm: data.results[0].LoanGuaranteeBookDate === null ? '00': data.results[0].LoanGuaranteeBookDate.substring(5,7),
                        loanguaranteebookyyyy: data.results[0].LoanGuaranteeBookDate === null ? '0000': Number(data.results[0].LoanGuaranteeBookDate.substring(0,4)) + 543,

                        warrantbookdate1dd: data.results[0].WarrantBookDate1 === null ? '00': data.results[0].WarrantBookDate1.substring(8,10),
                        warrantbookdate1mm: data.results[0].WarrantBookDate1 === null ? '00': data.results[0].WarrantBookDate1.substring(5,7),
                        warrantbookdate1yyyy: data.results[0].WarrantBookDate1 === null ? '0000': Number(data.results[0].WarrantBookDate1.substring(0,4)) + 543,

                        warrantbookdate2dd: data.results[0].WarrantBookDate2 === null ? '00': data.results[0].WarrantBookDate2.substring(8,10),
                        warrantbookdate2mm: data.results[0].WarrantBookDate2 === null ? '00': data.results[0].WarrantBookDate2.substring(5,7),
                        warrantbookdate2yyyy: data.results[0].WarrantBookDate2 === null ? '0000': Number(data.results[0].WarrantBookDate2.substring(0,4)) + 543,

                        firstdatepaiddd: data.results[0].FirstDatePaid === null ? '00': data.results[0].FirstDatePaid.substring(8,10),
                        firstdatepaidmm: data.results[0].FirstDatePaid === null ? '00': data.results[0].FirstDatePaid.substring(5,7),
                        firstdatepaidyyyy: data.results[0].FirstDatePaid === null ? '0000': Number(data.results[0].FirstDatePaid.substring(0,4)) + 543,

                        lastdatepaiddd: data.results[0].LastDatePaid === null ? '00': data.results[0].LastDatePaid.substring(8,10),
                        lastdatepaidmm: data.results[0].LastDatePaid === null ? '00': data.results[0].LastDatePaid.substring(5,7),
                        lastdatepaidyyyy: data.results[0].LastDatePaid === null ? '0000': Number(data.results[0].LastDatePaid.substring(0,4)) + 543,
                    })

                    
                    
                    for(let i=0; i<data.loandue_data.length; i++) {


                        // if(i===0) {
                        //     setLoandue_data1({
                        //         DUEDATE: data.loandue_data[0].DUEDATE,
                        //         PAYREC:  data.loandue_data[0].PAYREC
                        //     })
                        // }
                        // if(i===1) {
                        //     setLoandue_data2({
                        //         DUEDATE: data.loandue_data[1].DUEDATE,
                        //         PAYREC:  data.loandue_data[1].PAYREC
                        //     })
                        // }
                        // if(i===2) {
                        //     setLoandue_data3({
                        //         DUEDATE: data.loandue_data[2].DUEDATE,
                        //         PAYREC:  data.loandue_data[2].PAYREC
                        //     })
                        // }
                        // if(i===3) {
                        //     setLoandue_data4({
                        //         DUEDATE: data.loandue_data[3].DUEDATE,
                        //         PAYREC:  data.loandue_data[3].PAYREC
                        //     })
                        // }
                        // if(i===4) {
                        //     setLoandue_data5({
                        //         DUEDATE: data.loandue_data[4].DUEDATE,
                        //         PAYREC:  data.loandue_data[4].PAYREC
                        //     })
                        // }

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

    const getAction = (actionVal) => {
        action = actionVal;
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



    const handleSelectDate = (event) => {
        let type = event.target.name
        
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        // console.log('type',type, 'value', event.target.value)

        if(type === 'firstdatepaiddd' || type === 'firstdatepaidmm' || type === 'firstdatepaidyyyy') {
            // console.log(inputSelectDate)
            let payrecArr = [...loandueDataArr]
            payrecArr[0].DUEDATE = inputSelectDate.firstdatepaiddd+'-'+inputSelectDate.firstdatepaidmm+'-'+inputSelectDate.firstdatepaidyyyy
            setLoandueDataArr(payrecArr)
        }
    }

    // Handle Date on table
    const handleSelectDateLoandata = (event,index,typeName,installment) => {
        let name = event.target.name
        let type = typeName//event.target.name
        let payrecDateArr = [...loandueDataArr]

        // First pay date value

        if(name === 'recdatedd' || name === 'recdatemm' || name === 'recdateyyyy') {
            if(name === 'recdatedd' ) {
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'firstdatepaiddd': event.target.value.toString(),
                    'lastdatepaiddd': event.target.value.toString()
                })
            } else if (name === 'recdatemm') {
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'firstdatepaidmm': event.target.value.toString(),
                    'lastdatepaidmm': event.target.value.toString()
                })

            } else if (name === 'recdateyyyy') {
                console.log('recdateyyyy',event.target.value)

                console.log(Number(inputDataSubmit.Free_of_debt_Time))
                let value = 0;
                if(Number(inputDataSubmit.Free_of_debt_Time) === 0 || Number(inputDataSubmit.Free_of_debt_Time) === '') {
                    value = (event.target.value+1).toString()
                } else {
                    value = ((event.target.value+1) + Number(inputDataSubmit.Free_of_debt_Time) -1).toString()
                }
                // let value = (event.target.value + Number(inputDataSubmit.Free_of_debt_Time) -1).toString()
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'firstdatepaidyyyy': (event.target.value+1).toString(),
                    'lastdatepaidyyyy': value
                })

            }

            let DateLoandataArr = [...inputSelectDateLoandata]
            for(let i=0; i<25; i++) {
                DateLoandataArr[i][type] = event.target.value.toString()
                if(name === 'recdateyyyy') {
                    DateLoandataArr[i][type] = (Number(event.target.value+1)+i).toString()
                }

                // Add to Array of Submit
                payrecDateArr[i].DUEDATE = DateLoandataArr[i].yyyy === '0000' ? '0000' : DateLoandataArr[i].yyyy - 543+'-'+DateLoandataArr[i].mm+'-'+DateLoandataArr[i].dd
            }
            setInputSelectDateLoandata(DateLoandataArr)

        } else if(name === 'firstdatepaiddd' || name === 'firstdatepaidmm' || name === 'firstdatepaidyyyy') {

            if(name === 'firstdatepaiddd' ) {
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'lastdatepaiddd': event.target.value.toString()
                })
            } else if (name === 'firstdatepaidmm') {
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'lastdatepaidmm': event.target.value.toString()
                })

            } else if (name === 'firstdatepaidyyyy') {
                let value = 0;
                if(Number(inputDataSubmit.Free_of_debt_Time) === 0 || Number(inputDataSubmit.Free_of_debt_Time) === '') {
                    value = event.target.value.toString()
                } else {
                    value = (event.target.value + Number(inputDataSubmit.Free_of_debt_Time) -1).toString()
                }
                // let value = (event.target.value + Number(inputDataSubmit.Free_of_debt_Time) -1).toString()
                setInputSelectDate({
                    ...inputSelectDate,
                    [event.target.name]: event.target.value.toString(),
                    'lastdatepaidyyyy': value
                })

            }
            
            let DateLoandataArr = [...inputSelectDateLoandata]
            for(let i=0; i<25; i++) {
                DateLoandataArr[i][type] = event.target.value.toString()
                if(name === 'firstdatepaidyyyy') {
                    DateLoandataArr[i][type] = (Number(event.target.value)+i).toString()
                }

                // Add to Array of Submit
                payrecDateArr[i].DUEDATE = DateLoandataArr[i].yyyy === '0000' ? '0000' : DateLoandataArr[i].yyyy - 543+'-'+DateLoandataArr[i].mm+'-'+DateLoandataArr[i].dd
            }
            setInputSelectDateLoandata(DateLoandataArr)

        } else {
            let DateLoandataArr = [...inputSelectDateLoandata]
            DateLoandataArr[index][type] = event.target.value.toString()
            setInputSelectDateLoandata(DateLoandataArr)
    
            // console.log('index',index,'type',type, 'value', event.target.value)
            // console.log(inputSelectDateLoandata)


            
            payrecDateArr[index].DUEDATE = (inputSelectDateLoandata[index].yyyy === '0000' ? '0000' : inputSelectDateLoandata[index].yyyy - 543)+'-'+inputSelectDateLoandata[index].mm+'-'+inputSelectDateLoandata[index].dd
            setLoandueDataArr(payrecDateArr)
            // console.log('loandueDataArr',loandueDataArr)
    

        }
    }

    // Handle Value on table
    const handleInputLoanDueDataPay= (event, index, type) => {
        setSummaryTable('2')
        // let payrecArr = [];
        // let payrecID = event.target.id//.toString().slice(-3)
        // console.log(payrecID, payrecValue)
        // console.log('DUEDATE-index',index)

        if(type === 'date') {
            // console.log('DUEDATE',moment(event).format('YYYY-MM-DD'))
            let payrecValue = moment(event)
            // let payrecValue = moment(event).add(index, 'Y')
            let payrecArr = [...loandueDataArr]
            // if(action === 'add') {}
            payrecArr[index].DUEDATE = payrecValue
            setLoandueDataArr(payrecArr)
            // loandueDataArray[index].DUEDATE = parseFloat(payrecValue.split(',').join(''))
        } else {
            let payrecValue = event.target.value
            let payrecArr = [...loandueDataArr]
            // if(action === 'add') {}
            payrecArr[index].PAYREC = parseFloat(payrecValue.split(',').join(''))
            setLoandueDataArr(payrecArr)
            // loandueDataArray[index].PAYREC = parseFloat(payrecValue.split(',').join(''))
        }
        

        // console.log('loandueDataArr',loandueDataArr)
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
            // Get ProjectSub data
            if(event.target.name === 'ProjectID') {
                // console.log('event.target.ProjectCode',event.target.value)
                for(let i=0; i<projectList.length; i++) {
                    if(projectList[i].ProjectID === event.target.value) {
                        setProjectSubCodeText(projectList[i].ProjectSubCode)
                        setProjectSubNameText(projectList[i].ProjectSubName)
                    }
                }
            }
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

    const handleRecdate = (newValue) => {
        console.log(moment(newValue).format())
        setInputDataSubmit({
            ...inputDataSubmit,
            RecDate: moment(newValue).format(),
            FirstDatePaid: moment(newValue).add(1, 'Y'),
            LastDatePaid: moment(newValue).add(Number(inputDataSubmit.Free_of_debt_Time), 'Y')
        })
        
    }

    const handleFirstDatePaid = (newValue) => {
        console.log(moment(newValue).format())
        setInputDataSubmit({
            ...inputDataSubmit,
            FirstDatePaid: moment(newValue).format(),
            LastDatePaid: moment(newValue).add(Number(inputDataSubmit.Free_of_debt_Time), 'Y')
        })

        for(let i=0; i<Number(inputDataSubmit.Free_of_debt_Time); i++) {

            let payrecArr = [...loandueDataArr]
            // if(action === 'add') {}
            payrecArr[i].DUEDATE = moment(newValue).add(i,'Y').format()
            setLoandueDataArr(payrecArr)

        }

        console.warn(loandueDataArr)
    }

    const handleInputDataSubmitFreeDebtTime = (event) => {
console.log('FreeDebtTime',event.target.value)
        
        if(event.target.value <= 25 && event.target.value > 0) {
            setInputDataSubmit({
                ...inputDataSubmit,
                [event.target.name]: event.target.value,     
                LastDatePaid: moment(inputDataSubmit.FirstDatePaid).add((Number(event.target.value) -1), 'Y')
            })
            for(let i=0; i<Number(event.target.value); i++) {

                let payrecArr = [...loandueDataArr]
                // if(action === 'add') {}
                payrecArr[i].DUEDATE = moment(inputDataSubmit.FirstDatePaid).add(i,'Y').format()
                setLoandueDataArr(payrecArr)
    
            }
        } else if(event.target.value <= 0) {
            setInputDataSubmit({
                ...inputDataSubmit,
                [event.target.name]: 0,
                LastDatePaid: moment(inputDataSubmit.FirstDatePaid).format()
            })
            for(let i=0; i<loandueDataArr.length; i++) {

                let payrecArr = [...loandueDataArr]
                // if(action === 'add') {}
                payrecArr[i].DUEDATE = null
                setLoandueDataArr(payrecArr)
    
            }
        } else {
            setInputDataSubmit({
                ...inputDataSubmit,
                [event.target.name]: 25,
                LastDatePaid: moment(inputDataSubmit.FirstDatePaid).add((25 -1), 'Y')
            })

            for(let i=0; i<25; i++) {

                let payrecArr = [...loandueDataArr]
                // if(action === 'add') {}
                payrecArr[i].DUEDATE = moment(inputDataSubmit.FirstDatePaid).add(i,'Y').format()
                setLoandueDataArr(payrecArr)
    
            }
        }

        // Update Last date pay
        // let updateLastdatepaidyyyy;
        // if(event.target.value <= 0 || event.target.value === null || event.target.value === '' || inputSelectDate.firstdatepaidyyyy === '0000') {
        //     updateLastdatepaidyyyy = '0000'
        // } else {
        //     updateLastdatepaidyyyy = Number(event.target.value) + Number(inputSelectDate.firstdatepaidyyyy) -1
        // }
        
        // setInputSelectDate({
        //     ...inputSelectDate,
        //     'lastdatepaidyyyy': updateLastdatepaidyyyy.toString()
        // })
    }

    const handleInputDataSubmit = (event) => {
        // console.log('event.target.id',event.target.id)
        // let name = event.target.name

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

    const handleInputDataSubmitInstallment = (event) => {
        setInputDataSubmit({
            ...inputDataSubmit,
            [event.target.name]: event.target.value
        })

        // setSummaryInstallment(
        //     parseFloat(inputDataSubmit.Loan_Installment1) + parseFloat(inputDataSubmit.Loan_Installment2)
        // )
    }

    const handleSubmit = (event, loanstatus) => {
        action_loanstatus = loanstatus;
        event.preventDefault();

        let loanrequestprint = document.getElementById('loanrequestprint');
        let formData = new FormData(loanrequestprint);
        formData.delete('Free_of_debt')
        formData.delete('LoanPeriodCode')
        formData.delete('dd')
        formData.delete('mm')
        formData.delete('yyyy')

        formData.delete('recdatedd')
        formData.delete('recdatemm')
        formData.delete('recdateyyyy')

        formData.delete('loandatedd')
        formData.delete('loandatemm')
        formData.delete('loandateyyyy')

        formData.delete('spkorderdatedd')
        formData.delete('spkorderdatemm')
        formData.delete('spkorderdateyyyy')

        formData.delete('guaranteepropertydd')
        formData.delete('guaranteepropertymm')
        formData.delete('guaranteepropertyyyyy')

        formData.delete('loanguaranteebookdd')
        formData.delete('loanguaranteebookmm')
        formData.delete('loanguaranteebookyyyy')

        formData.delete('warrantbookdate1dd')
        formData.delete('warrantbookdate1mm')
        formData.delete('warrantbookdate1yyyy')

        formData.delete('warrantbookdate2dd')
        formData.delete('warrantbookdate2mm')
        formData.delete('warrantbookdate2yyyy')

        formData.delete('firstdatepaiddd')
        formData.delete('firstdatepaidmm')
        formData.delete('firstdatepaidyyyy')

        formData.delete('lastdatepaiddd')
        formData.delete('lastdatepaidmm')
        formData.delete('lastdatepaidyyyy')

        formData.append('FarmerID', inputDataSubmit.FarmerID)
        formData.append('ApplicantID', inputDataSubmit.ApplicantID)
        formData.append('LoanStatus', action_loanstatus)

        formData.append('LoanDate', inputDataSubmit.LoanDate === 'Invalid date' || inputDataSubmit.LoanDate === null ? null : moment(inputDataSubmit.LoanDate).format('YYYY-MM-DD'))
        // let LoanDateValue = (inputSelectDate.loandateyyyy === '0000' ? '0000' : inputSelectDate.loandateyyyy - 543)+'-'+inputSelectDate.loandatemm+'-'+inputSelectDate.loandatedd
        // formData.append('LoanDate', LoanDateValue === '0000-00-00' ? null : LoanDateValue)
        
        formData.append('RecDate', inputDataSubmit.RecDate === 'Invalid date' || inputDataSubmit.RecDate === null ? null : moment(inputDataSubmit.RecDate).format('YYYY-MM-DD'))
        // let RecDateValue = (inputSelectDate.recdateyyyy === '0000' ? '0000' : inputSelectDate.recdateyyyy - 543)+'-'+inputSelectDate.recdatemm+'-'+inputSelectDate.recdatedd
        // formData.append('RecDate', RecDateValue === '0000-00-00' ? null : RecDateValue)
  
        formData.append('SPK_OrderDate', inputDataSubmit.SPK_OrderDate === 'Invalid date' || inputDataSubmit.SPK_OrderDate === null ? null : moment(inputDataSubmit.SPK_OrderDate).format('YYYY-MM-DD'))
        // let SPK_OrderDateValue = (inputSelectDate.spkorderdateyyyy === '0000' ? '0000' : inputSelectDate.spkorderdateyyyy - 543)+'-'+inputSelectDate.spkorderdatemm+'-'+inputSelectDate.spkorderdatedd
        // formData.append('SPK_OrderDate', SPK_OrderDateValue === '0000-00-00' ? null : SPK_OrderDateValue)
  
        formData.append('Guarantee_PropertyDate', inputDataSubmit.Guarantee_PropertyDate === 'Invalid date' || inputDataSubmit.Guarantee_PropertyDate === null ? null : moment(inputDataSubmit.Guarantee_PropertyDate).format('YYYY-MM-DD'))
        // let Guarantee_PropertyDateValue = (inputSelectDate.guaranteepropertyyyyy === '0000' ? '0000' : inputSelectDate.guaranteepropertyyyyy - 543)+'-'+inputSelectDate.guaranteepropertymm+'-'+inputSelectDate.guaranteepropertydd
        // formData.append('Guarantee_PropertyDate', Guarantee_PropertyDateValue === '0000-00-00' ? null : Guarantee_PropertyDateValue)
        
        formData.append('LoanGuaranteeBookDate', inputDataSubmit.LoanGuaranteeBookDate === 'Invalid date' || inputDataSubmit.LoanGuaranteeBookDate === null ? null : moment(inputDataSubmit.LoanGuaranteeBookDate).format('YYYY-MM-DD'))
        // let LoanGuaranteeBookDateValue = (inputSelectDate.loanguaranteebookyyyy === '0000' ? '0000' : inputSelectDate.loanguaranteebookyyyy - 543)+'-'+inputSelectDate.loanguaranteebookmm+'-'+inputSelectDate.loanguaranteebookdd
        // formData.append('LoanGuaranteeBookDate', LoanGuaranteeBookDateValue === '0000-00-00' ? null : LoanGuaranteeBookDateValue)
        
        formData.append('WarrantBookDate1', inputDataSubmit.WarrantBookDate1 === 'Invalid date' || inputDataSubmit.WarrantBookDate1 === null ? null : moment(inputDataSubmit.WarrantBookDate1).format('YYYY-MM-DD'))
        // let WarrantBookDate1Value = (inputSelectDate.warrantbookdate1yyyy === '0000' ? '0000' : inputSelectDate.warrantbookdate1yyyy - 543)+'-'+inputSelectDate.warrantbookdate1mm+'-'+inputSelectDate.warrantbookdate1dd
        // formData.append('WarrantBookDate1', WarrantBookDate1Value === '0000-00-00' ? null : WarrantBookDate1Value)
        
        formData.append('WarrantBookDate2', inputDataSubmit.WarrantBookDate2 === 'Invalid date' || inputDataSubmit.WarrantBookDate2 === null ? null : moment(inputDataSubmit.WarrantBookDate2).format('YYYY-MM-DD'))
        // let WarrantBookDate2Value = (inputSelectDate.warrantbookdate2yyyy === '0000' ? '0000' : inputSelectDate.warrantbookdate2yyyy - 543)+'-'+inputSelectDate.warrantbookdate2mm+'-'+inputSelectDate.warrantbookdate2dd
        // formData.append('WarrantBookDate2', WarrantBookDate2Value === '0000-00-00' ? null : WarrantBookDate2Value)
        
        formData.append('FirstDatePaid', inputDataSubmit.FirstDatePaid === 'Invalid date' || inputDataSubmit.FirstDatePaid === null ? null : moment(inputDataSubmit.FirstDatePaid).format('YYYY-MM-DD'))
        // let FirstDatePaidValue = (inputSelectDate.firstdatepaidyyyy === '0000' ? '0000' : inputSelectDate.firstdatepaidyyyy - 543)+'-'+inputSelectDate.firstdatepaidmm+'-'+inputSelectDate.firstdatepaiddd
        // formData.append('FirstDatePaid', FirstDatePaidValue === '0000-00-00' ? null : FirstDatePaidValue)
        
        formData.append('LastDatePaid', inputDataSubmit.ChangeContactLastDatePaidCommitDate === 'Invalid date' || inputDataSubmit.LastDatePaid === null ? null : moment(inputDataSubmit.LastDatePaid).format('YYYY-MM-DD'))
        // let LastDatePaidValue = (inputSelectDate.lastdatepaidyyyy === '0000' ? '0000' : inputSelectDate.lastdatepaidyyyy - 543)+'-'+inputSelectDate.lastdatepaidmm+'-'+inputSelectDate.lastdatepaiddd
        // formData.append('LastDatePaid', LastDatePaidValue === '0000-00-00' ? null : LastDatePaidValue)
        
        formData.append('ChangeContactCommitDate', inputDataSubmit.ChangeContactCommitDate === 'Invalid date' || inputDataSubmit.ChangeContactCommitDate === null ? null : moment(inputDataSubmit.ChangeContactCommitDate).format('YYYY-MM-DD'))
        formData.append('principle', parseFloat(inputDataSubmit.Loan_Obj1Amount) + parseFloat(inputDataSubmit.Loan_Obj2Amount) + parseFloat(inputDataSubmit.Loan_Obj3Amount))

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
        
        // let loandueDataArr = [];
        // loandueDataArr.push(loandue_data1);
        // if(parseInt(inputData.LoanPeriodCode) >= 1) {
        //     loandueDataArr.push(loandue_data2);
        //     loandueDataArr.push(loandue_data3);
        // }
        // if(parseInt(inputData.LoanPeriodCode) >= 2) {
        //     loandueDataArr.push(loandue_data4);
        //     loandueDataArr.push(loandue_data5);
        // }
        let loandueDataArrValue = []
        // console.log('inputDataSubmit.Free_of_debt_Time',inputDataSubmit.Free_of_debt_Time.length)
        for(let i=0; i<inputDataSubmit.Free_of_debt_Time; i++) {
            loandueDataArrValue.push(loandueDataArr[i])
        }
        formData.append('loandue_data', JSON.stringify(loandueDataArrValue));
        let url = '';
        console.log('action_loanstatus:',action_loanstatus)
        if(action==='edit') {
            formData.append('LoanID', loanID)
            url = `${server_hostname}/admin/api/edit_loanrecc`
        } else {
            url =`${server_hostname}/admin/api/add_loanrecc`
            // action = 'edit'
        } 
        console.log(action,'|', action_loanstatus,'|', url.toString())
        console.log('ApplicantID',inputDataSubmit.ApplicantID,'| FarmerID',inputDataSubmit.FarmerID)
        console.log(JSON.stringify(loandueDataArr))

        // formData.forEach(file => {
        //     if(file==='') {
        //         console.log("File: no data:", typeof file)
        //         setShowConfirmButton(false);
        //         return false;
        //     } else {
        //         console.log("File has data: ", file)
        //         setShowConfirmButton(true);
        //     }
        // })

        

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
        console.log('PDF - Username:',localStorage.getItem('provinceid'))

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)
        formData.append('UserName', localStorage.getItem('provinceid'))

        axios({
        url: `${siteprint}/report/pdf/GetContractPdf`, //your url
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

    const handleClearLoanDue = () => {
    }

    const gotoLoanRequestPrint = () => {
        setOpenLoanRequestInfo(true);
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)
        // history.push('/manageinfo/searchmember');
        window.location.reload();
    };
    
    const handleClosePopupErr = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)
    };


    const sumTable = () => {
        let sum = 0;
        for(let i=0; i<loandueDataArr.length; i++) {
            sum += loandueDataArr[i].PAYREC
        }
        setSummaryTable(sum)
    }

    const sumPrinciple = () => {}

    const rowTable = (amountRow, dataRow) => {
        let rowArr = []

        // Check amount of row <= 0 ???
        if(amountRow <= 0 || amountRow === '') {
            rowArr.push(
                <TableRow key={99}>
                    <TableCell colSpan="3">
                        <p className="txt-red font-16 txt-center">กรุณาใส่จำนวนงวด</p>
                    </TableCell>
                </TableRow>
            )
        } else {
            for(let i=0; i<amountRow; i++) {
                
                if(action === 'add') {
                    rowArr.push(
                        <TableRow key={i}>
                            <TableCell align="left">{i+1}</TableCell>
                            <TableCell align="left">
                                {/* <div className="select-date-option">
                                    <MuiSelectDay label="" name="dd" value={inputSelectDateLoandata[i].dd} onChange={(event)=>handleSelectDateLoandata(event,i,'dd')} />
                                    <MuiSelectMonth label="" name="mm" value={inputSelectDateLoandata[i].mm} onChange={(event)=>handleSelectDateLoandata(event,i,'mm')} />
                                    <MuiSelectYear last={25} label="" name="yyyy" value={inputSelectDateLoandata[i].yyyy} onChange={(event)=>handleSelectDateLoandata(event,i,'yyyy')} />
                                </div>   */}
                                {/* <MuiDatePicker label=""  value={moment(inputDataSubmit.FirstDatePaid).add(i, 'Y')} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }  /> */}
                                <MuiDatePicker label=""  value={loandueDataArr[i].DUEDATE} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }  />
                                                                
                            </TableCell>
                            <TableCell align="left">
                                    <MuiTextfieldCurrency  label="" value={loandueDataArr.PAYREC} onChange={(event)=>handleInputLoanDueDataPay(event,i,'value')} /> 
                            </TableCell>
                        </TableRow>
                    )
                } else {
                    // action === 'edit'
                    if(loandueDataAPI === null || loandueDataAPI.length === 0) {
                        rowArr.push(
                            <TableRow key={i}>
                                <TableCell align="left">{i+1}</TableCell>
                                <TableCell align="left">
                                    {/* <div className="select-date-option">
                                        <MuiSelectDay label="" name="dd" value={'00'} onChange={(event)=>handleSelectDateLoandata(event,i,'dd')} />
                                        <MuiSelectMonth label="" name="mm" value={'00'} onChange={(event)=>handleSelectDateLoandata(event,i,'mm')} />
                                        <MuiSelectYear label="" name="yyyy" value={'0000'} onChange={(event)=>handleSelectDateLoandata(event,i,'yyyy')} />
                                    </div>   */}
                                    {/* <MuiDatePicker label=""  value={moment(inputDataSubmit.FirstDatePaid).add(i, 'Y')} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }   />   */}
                                    <MuiDatePicker label=""  value={loandueDataArr[i].DUEDATE} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }  />
                                </TableCell>
                                <TableCell align="left">
                                        <MuiTextfieldCurrency  label="" value={loandueDataArr[i].PAYREC} onChange={(event)=>handleInputLoanDueDataPay(event,i,'value')} /> 
                                </TableCell>
                            </TableRow>
                        )

                    } else {

                        // console.log('dataRow', loandueDataAPI[i] === undefined ? null : loandueDataAPI[i].PAYREC)
                        rowArr.push(
                            <TableRow key={i}>
                                <TableCell align="left">{i+1}</TableCell>
                                <TableCell align="left">
                                    {/* <div className="select-date-option">
                                        <MuiSelectDay label="" name="dd" value={inputSelectDateLoandata[i].dd} onChange={(event)=>handleSelectDateLoandata(event,i,'dd')} />
                                        <MuiSelectMonth label="" name="mm" value={inputSelectDateLoandata[i].mm} onChange={(event)=>handleSelectDateLoandata(event,i,'mm')} />
                                        <MuiSelectYear last={25} label="" name="yyyy" value={inputSelectDateLoandata[i].yyyy} onChange={(event)=>handleSelectDateLoandata(event,i,'yyyy')} />
                                    </div>   */}
                                    {/* <MuiDatePicker label=""  value={moment(inputDataSubmit.FirstDatePaid).add(i, 'Y')} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }  /> */}
                                    <MuiDatePicker label=""  value={loandueDataArr[i].DUEDATE} onChange={(newValue)=> handleInputLoanDueDataPay(newValue,i,'date') }  />
                                </TableCell>
                                <TableCell align="left">
                                        <MuiTextfieldCurrency  label="" value={loandueDataArr[i].PAYREC} onChange={(event)=>handleInputLoanDueDataPay(event,i,'value')} /> 
                                </TableCell>
                            </TableRow>
                        )
                    }
                } 
            }

        }
        
        return rowArr
    }


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
                                <h1>สร้าง / พิมพ์สัญญากู้ยืมเงิน</h1>
                                {/* <h1>พิมพ์สัญญากู้ยืมเงิน</h1> */}
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" value={inputDataSearch.SearchByName} name="SearchByName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่คำขอกู้ยืมเงิน" value={inputDataSearch.SearchByApplicantNo} name="SearchByApplicantNo" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" value={inputDataSearch.SearchByLoanNumber} name="SearchByLoanNumber" onChange={handleInputDataSearch} />
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
                                        actionView={false} 
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        printParam1={'LoanNumber'}
                                        tableName={'loanrequestprint'}
                                        loanrequestprintAction={getAction}
                                        loanrequestprintEvent={getDataApprovedApplicant}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        isLoading ? 
                            <div className="overlay">
                                <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังค้นหาข้อมูล...</p>
                            </div> : 
                            ''
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
                                                            <MuiRadioButton label="ประเภทเงินกู้" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} name="LoanPeriodCode"  value={loanPeriodCodeValue} onChange={handleInputData} type="row" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    {/* <p>วันที่ทำสัญญา</p>
                                                                    <div className="select-date-option">
                                                                        <MuiSelectDay label="" name="recdatedd" value={inputSelectDate.recdatedd} onChange={(event)=>handleSelectDateLoandata(event,0,'dd',inputDataSubmit.Free_of_debt_Time)} />
                                                                        <MuiSelectMonth label="" name="recdatemm" value={inputSelectDate.recdatemm} onChange={(event)=>handleSelectDateLoandata(event,0,'mm',inputDataSubmit.Free_of_debt_Time)} />
                                                                        <MuiSelectYear label="" name="recdateyyyy" value={inputSelectDate.recdateyyyy} onChange={(event)=>handleSelectDateLoandata(event,0,'yyyy',inputDataSubmit.Free_of_debt_Time)} />
                                                                    </div> */}
                                                                    <MuiDatePicker label="วันที่ทำสัญญา" name="RecDate" value={inputDataSubmit.RecDate} onChange={(newValue)=>handleRecdate(newValue)}  />
                                                                </Grid>
                                                                {
                                                                    action === 'add' ? '' : <Grid item xs={12} md={6}><MuiTextfield label="เลขที่สัญญา" inputdisabled="input-disabled" value={loanNumber} /></Grid>
                                                                }
                                                            </Grid>
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
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สถานที่ออกบัตร อำเภอ/เขต" name="IDCardMadeDistrict" value={inputDataSubmit.IDCardMadeDistrict} onChange={handleInputDataSubmit}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelectProvince label="จังหวัด" lists={provinceList} name="IDCardMadeProvince" value={inputDataSubmit.IDCardMadeProvince} onChange={handleInputDataSubmit}/>
                                                        </Grid> */}
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
                                                            {/* <p>ลงวันที่</p>
                                                            <div className="select-date-option">
                                                                <MuiSelectDay label="" name="loandatedd" value={inputSelectDate.loandatedd} onChange={handleSelectDate} />
                                                                <MuiSelectMonth label="" name="loandatemm" value={inputSelectDate.loandatemm} onChange={handleSelectDate} />
                                                                <MuiSelectYear label="" name="loandateyyyy" value={inputSelectDate.loandateyyyy} onChange={handleSelectDate} />
                                                            </div> */}
                                                            <MuiDatePicker label="ลงวันที่" name="LoanDate" value={inputDataSubmit.LoanDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelectObj label="โครงการ" id={`ProjectCode`} itemName={'ProjectCode'} itemValue={'ProjectID'} lists={projectList} value={inputData.ProjectID} name={`ProjectID`} onChange={handleInputData} />
                                                        </Grid> 
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="รหัสโครงการรอง" value={projectSubCodeText} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield disabled label="ชื่อโครงการรอง" value={projectSubNameText} />
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
                                                            <MuiTextfield label="ก" name="Loan_Obj1"  inputdisabled="input-disabled"  value={inputDataSubmit.Loan_Obj1} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="Loan_Obj1Amount" value={inputDataSubmit.Loan_Obj1Amount}  onChange={handleInputDataSubmit} />
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
                                                            <MuiTextfield label="ข" name="Loan_Obj2" inputdisabled="input-disabled"  value={inputDataSubmit.Loan_Obj2} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="Loan_Obj2Amount" value={inputDataSubmit.Loan_Obj2Amount}  onChange={handleInputDataSubmit} />
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
                                                            <MuiTextfield label="ค" name="Loan_Obj3" inputdisabled="input-disabled"  value={inputDataSubmit.Loan_Obj3} onChange={handleInputDataSubmit}/>
                                                        </Grid>
                                                        <Grid item xs={11} md={3}>
                                                            <p>เป็นเงิน</p>
                                                            <MuiTextfieldCurrency  inputdisabled="input-disabled" label="" name="Loan_Obj3Amount" value={inputDataSubmit.Loan_Obj3Amount}  onChange={handleInputDataSubmit} />
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
                                                                <MuiTextfieldCurrency label="" value={ summaryLoanObj }  onChange={handleInputData} />
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
                                                        <Grid item xs={12} md={7}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={11} md={7}>
                                                                    <p>งวดที่ 1 เป็นเงิน</p>
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment1" value={inputDataSubmit.Loan_Installment1}  onChange={handleInputDataSubmitInstallment} />
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
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment2" value={inputDataSubmit.Loan_Installment2}  onChange={handleInputDataSubmitInstallment} />
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
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment3" value={inputDataSubmit.Loan_Installment3}  onChange={handleInputDataSubmitInstallment} />
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
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment4" value={inputDataSubmit.Loan_Installment4}  onChange={handleInputDataSubmitInstallment} />
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
                                                                    <MuiTextfieldCurrency  label="" name="Loan_Installment5" value={inputDataSubmit.Loan_Installment5}  onChange={handleInputDataSubmitInstallment} />
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
                                                                        {
                                                                            summaryInstallment === summaryLoanObj ? null : <Grid item xs={12} md={12}><p className="txt-red">* กรุณาใส่จำนวนเงินรวมให้ตรงกับยอดเงินรวมของวัตถุประสงค์</p> </Grid>
                                                                        }
                                                                        <Grid item xs={12} md={2}>
                                                                            {/* Field Text ---------------------------------------------------*/}
                                                                            <p className="paper-p">รวมเป็นเงิน</p>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={5} className="loanrequestprint-objtotal">
                                                                            {/* <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p> */}
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldCurrency label="" value={ summaryInstallment
                                                                                        // ((inputDataSubmit.Loan_Installment1 === 0 || inputDataSubmit.Loan_Installment1 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        // (inputDataSubmit.Loan_Installment2 === 0 || inputDataSubmit.Loan_Installment2 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        // (inputDataSubmit.Loan_Installment3 === 0 || inputDataSubmit.Loan_Installment3 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
                                                                                        // (inputDataSubmit.Loan_Installment4 === 0 || inputDataSubmit.Loan_Installment4 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment4.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        // (inputDataSubmit.Loan_Installment5 === 0 || inputDataSubmit.Loan_Installment5 === '' ? 0 : parseFloat((inputDataSubmit.Loan_Installment5.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
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
                                                                    <MuiTextfield inputdisabled="input-disabled" label="ตามคำสั่ง ส.ป.ก. ที่" value={`706/2555`}  />
                                                                    {/* <MuiTextfield inputdisabled="input-disabled" label="ตามคำสั่ง ส.ป.ก. ที่" value={inputDataSubmit.SPK_Order}  onChange={handleInputDataSubmit} /> */}
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
                                                            <MuiTextfield inputdisabled="input-disabled" label="ลงวันที่" value={`3 กรกฎาคม 2555`}  />
                                                            {/* <p>ลงวันที่</p>
                                                            <div className="select-date-option">
                                                                <MuiSelectDay label="" name="spkorderdatedd" value={inputSelectDate.spkorderdatedd} onChange={handleSelectDate} />
                                                                <MuiSelectMonth label="" name="spkorderdatemm" value={inputSelectDate.spkorderdatemm} onChange={handleSelectDate} />
                                                                <MuiSelectYear label="" name="spkorderdateyyyy" value={inputSelectDate.spkorderdateyyyy} onChange={handleSelectDate} />
                                                            </div> */}
                                                            {/* <MuiDatePicker label="ลงวันที่" name="SPK_OrderDate" value={inputDataSubmit.SPK_OrderDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, SPK_OrderDate: moment(newValue).format('YYYY-MM-DD')}) }}  /> */}
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
                                                                    {/* <p>ลงวันที่</p>
                                                                    <div className="select-date-option">
                                                                        <MuiSelectDay label="" name="guaranteepropertydd" value={inputSelectDate.guaranteepropertydd} onChange={handleSelectDate} />
                                                                        <MuiSelectMonth label="" name="guaranteepropertymm" value={inputSelectDate.guaranteepropertymm} onChange={handleSelectDate} />
                                                                        <MuiSelectYear label="" name="guaranteepropertyyyyy" value={inputSelectDate.guaranteepropertyyyyy} onChange={handleSelectDate} />
                                                                    </div> */}
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
                                                            {/* <p>ลงวันที่</p>
                                                            <div className="select-date-option">
                                                                <MuiSelectDay label="" name="loanguaranteebookdd" value={inputSelectDate.loanguaranteebookdd} onChange={handleSelectDate} />
                                                                <MuiSelectMonth label="" name="loanguaranteebookmm" value={inputSelectDate.loanguaranteebookmm} onChange={handleSelectDate} />
                                                                <MuiSelectYear label="" name="loanguaranteebookyyyy" value={inputSelectDate.loanguaranteebookyyyy} onChange={handleSelectDate} />
                                                            </div> */}
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
                                                                {/* <p>ลงวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="warrantbookdate1dd" value={inputSelectDate.warrantbookdate1dd} onChange={handleSelectDate} />
                                                                    <MuiSelectMonth label="" name="warrantbookdate1mm" value={inputSelectDate.warrantbookdate1mm} onChange={handleSelectDate} />
                                                                    <MuiSelectYear label="" name="warrantbookdate1yyyy" value={inputSelectDate.warrantbookdate1yyyy} onChange={handleSelectDate} />
                                                                </div> */}
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
                                                                {/* <p>ลงวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="warrantbookdate2dd" value={inputSelectDate.warrantbookdate2dd} onChange={handleSelectDate} />
                                                                    <MuiSelectMonth label="" name="warrantbookdate2mm" value={inputSelectDate.warrantbookdate2mm} onChange={handleSelectDate} />
                                                                    <MuiSelectYear label="" name="warrantbookdate2yyyy" value={inputSelectDate.warrantbookdate2yyyy} onChange={handleSelectDate} />
                                                                </div> */}
                                                                <MuiDatePicker label="ลงวันที่" name="WarrantBookDate2" value={inputDataSubmit.WarrantBookDate2} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate2: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="(3)" name="WarrantBookOwner3" value={inputDataSubmit.WarrantBookOwner3}  onChange={handleInputDataSubmit} />
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
                                                                {/* <p>ลงวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="warrantbookdate2dd" value={inputSelectDate.warrantbookdate2dd} onChange={handleSelectDate} />
                                                                    <MuiSelectMonth label="" name="warrantbookdate2mm" value={inputSelectDate.warrantbookdate2mm} onChange={handleSelectDate} />
                                                                    <MuiSelectYear label="" name="warrantbookdate2yyyy" value={inputSelectDate.warrantbookdate2yyyy} onChange={handleSelectDate} />
                                                                </div> */}
                                                                <MuiDatePicker label="ลงวันที่" name="WarrantBookDate3" value={inputDataSubmit.WarrantBookDate3} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate3: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="(4)" name="WarrantBookOwner4" value={inputDataSubmit.WarrantBookOwner4}  onChange={handleInputDataSubmit} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                            <div className="dsp-f">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfield label=""  name="WarrantBook4" value={inputDataSubmit.WarrantBook4}  onChange={handleInputDataSubmit}/>
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
                                                                {/* <p>ลงวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="warrantbookdate2dd" value={inputSelectDate.warrantbookdate2dd} onChange={handleSelectDate} />
                                                                    <MuiSelectMonth label="" name="warrantbookdate2mm" value={inputSelectDate.warrantbookdate2mm} onChange={handleSelectDate} />
                                                                    <MuiSelectYear label="" name="warrantbookdate2yyyy" value={inputSelectDate.warrantbookdate2yyyy} onChange={handleSelectDate} />
                                                                </div> */}
                                                                <MuiDatePicker label="ลงวันที่" name="WarrantBookDate4" value={inputDataSubmit.WarrantBookDate4} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, WarrantBookDate4: moment(newValue).format('YYYY-MM-DD')}) }}  />
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
                                                                            <MuiTextNumber label="" name="Free_of_debt_Month" id="no1-year" value={Number(inputDataSubmit.Free_of_debt_Month)}  onInput={handleInputDataSubmit} />
                                                                            :
                                                                            <MuiTextNumber label="" name="Free_of_debt_Year" id="no2-year" value={Number(inputDataSubmit.Free_of_debt_Year)}  onInput={handleInputDataSubmit} />    
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
                                                            <MuiTextfieldCurrency  label="" name="Free_of_debt_Time" value={inputDataSubmit.Free_of_debt_Time}  onChange={handleInputDataSubmitFreeDebtTime} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p>&nbsp;</p>
                                                            <p className="paper-p">งวด</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                                {/* <p>เริ่มชำระงวดแรกภายในวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="firstdatepaiddd" value={inputSelectDate.firstdatepaiddd} onChange={(event)=>handleSelectDateLoandata(event,0,'dd',inputDataSubmit.Free_of_debt_Time)} />
                                                                    <MuiSelectMonth label="" name="firstdatepaidmm" value={inputSelectDate.firstdatepaidmm} onChange={(event)=>handleSelectDateLoandata(event,0,'mm',inputDataSubmit.Free_of_debt_Time)} />
                                                                    <MuiSelectYear label="" name="firstdatepaidyyyy" value={inputSelectDate.firstdatepaidyyyy} onChange={(event)=>handleSelectDateLoandata(event,0,'yyyy',inputDataSubmit.Free_of_debt_Time)} />
                                                                </div> */}
                                                            <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่" name="FirstDatePaid" value={inputDataSubmit.FirstDatePaid} onChange={(newValue)=>handleFirstDatePaid(newValue)}  />
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
                                                                {/* <p>ครบกำหนดงวดสุดท้ายในวันที่</p>
                                                                <div className="select-date-option">
                                                                    <MuiSelectDay label="" name="lastdatepaiddd" value={inputSelectDate.lastdatepaiddd} onChange={handleSelectDate} />
                                                                    <MuiSelectMonth label="" name="lastdatepaidmm" value={inputSelectDate.lastdatepaidmm} onChange={handleSelectDate} />
                                                                    <MuiSelectYear last={25} label="" name="lastdatepaidyyyy" value={inputSelectDate.lastdatepaidyyyy} onChange={handleSelectDate} />
                                                                </div> */}
                                                            <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่" name="LastDatePaid" value={inputDataSubmit.LastDatePaid} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, LastDatePaid: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด" inputdisabled="input-disabled" name="OfficeProvince" value={inputDataSubmit.OfficeProvince}  onChange={handleInputDataSubmit} />
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
                                                    <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                                    <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                                        <Table aria-label="normal table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="left">งวดที่</TableCell>
                                                                    <TableCell align="left" style={{minWidth: '200px'}}>วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                                    <TableCell align="left">จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {
                                                                rowTable(inputDataSubmit.Free_of_debt_Time > 25 ? 25 : inputDataSubmit.Free_of_debt_Time, loandueDataAPI)
                                                            }
                                                            {
                                                                summaryTable.toLocaleString('en-US', {minimumFractionDigits: 2}) === summaryLoanObj ? null : <TableRow key={99} className="box box-grey"><TableCell colSpan="3"><Grid container spacing={2}><Grid item xs={12} md={12}><p className="txt-red txt-center font-14">* กรุณาใส่จำนวนเงินรวมให้ตรงกับยอดเงินรวมของวัตถุประสงค์</p> </Grid></Grid></TableCell></TableRow>
                                                            }

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
                                                                                <MuiTextfieldCurrency label="" value={ summaryTable } onChange={sumTable} />
                                                                                {/* <MuiTextfieldCurrency label="" value={ 
                                                                                        ((loandue_data1.PAYREC === 0 || loandue_data1.PAYREC === '' ? 0 : parseFloat((loandue_data1.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data2.PAYREC === 0 || loandue_data2.PAYREC === '' ? 0 : parseFloat((loandue_data2.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data3.PAYREC === 0 || loandue_data3.PAYREC === '' ? 0 : parseFloat((loandue_data3.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
                                                                                        (loandue_data4.PAYREC === 0 || loandue_data4.PAYREC === '' ? 0 : parseFloat((loandue_data4.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
                                                                                        (loandue_data5.PAYREC === 0 || loandue_data5.PAYREC === '' ? 0 : parseFloat((loandue_data5.PAYREC.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                                    }  onChange={handleInputData} /> */}
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
                                                <MuiTextfield inputdisabled="input-disabled" label="1. ชื่อพยาน" name="WitnessName" value={inputDataSubmit.WitnessName}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr" value={`ส.ป.ก.จังหวัด${provincename}`}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man1-idc" name="WitnessIDCard" value={inputDataSubmit.WitnessIDCard}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade" value={'กรมการปกครอง'}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="2. ชื่อพยาน" name="WitnessName2" value={inputDataSubmit.WitnessName2}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr2" value={`ส.ป.ก.จังหวัด${provincename}`}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man2-idc" name="WitnessIDCard2" value={inputDataSubmit.WitnessIDCard2}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade2" value={'กรมการปกครอง'}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="3. ชื่อพยาน" name="WitnessName3" value={inputDataSubmit.WitnessName3}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr3" value={`ส.ป.ก.จังหวัด${provincename}`}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man3-idc" name="WitnessIDCard3" value={inputDataSubmit.WitnessIDCard3}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade3" value={'กรมการปกครอง'}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="4. ชื่อพยาน" name="WitnessName4" value={inputDataSubmit.WitnessName4}  onChange={handleInputDataSubmit}  />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr4" value={`ส.ป.ก.จังหวัด${provincename}`}  onChange={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man4-idc" name="WitnessIDCard4" value={inputDataSubmit.WitnessIDCard4}  onInput={handleInputDataSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade4" value={'กรมการปกครอง'}  onChange={handleInputDataSubmit} />
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
                                                            {/* <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" /> */}
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
                                                            {/* <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" /> */}
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" /> */}
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
                                                                    {/* <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่"  defaultValue="2017-05-24" /> */}
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    {/* <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่"  defaultValue="2017-05-24" /> */}
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    {/* <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด"  defaultValue="" /> */}
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
                                                                <TableRow key={1}>
                                                                    <TableCell align="left" rowSpan={2}>งวดที่</TableCell>
                                                                    <TableCell align="left" rowSpan={2}>วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                                    <TableCell align="left" colSpan={2}>จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                                </TableRow>
                                                                <TableRow key={2}>
                                                                    <TableCell align="left">เงินต้นค้างชำระ</TableCell>
                                                                    <TableCell align="left">ดอกเบี้ยค้างชำระ</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                            {
                                                                [1,2,3,4,5].map((row,i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell align="left">{i+1}</TableCell>
                                                                        <TableCell align="left">
                                                                            <MuiDatePicker label=""  defaultValue="2017-05-24" />
                                                                        </TableCell>
                                                                        <TableCell align="left">
                                                                            <MuiTextfield label=""  defaultValue=""/>
                                                                        </TableCell>
                                                                        <TableCell align="left">
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
                                                                <TableRow key={100}>
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
                                            {
                                                !!showConfirmButton?null:<p className="txt-red txt-center" style={{width: '100%'}}>กรุณากรอกข้อมูลให้ครบทุกครั้งก่อนกดปุ่ม "ยืนยันสร้างสัญญา"</p>
                                            }
                                            {/* <p className="txt-red txt-center" style={{width: '100%'}}>กรุณากดปุ่ม "บันทึกชั่วคราว" ทุกครั้งก่อนกดปุ่ม "ยืนยันสร้างสัญญา"</p> */}
                                            {/* Button Row -------------------------------------------------- */}
                                            <Grid item xs={12} md={4}>
                                                <ButtonFluidPrimary label="บันทึกชั่วคราว" id="" onClick={(event)=>handleSubmit(event, 'draft')} />
                                            </Grid>
                                            <Grid item xs={12} md={4} className={!!showConfirmButton ? '' : 'btn-disabled'}  >
                                                <ButtonFluidPrimary label="ยืนยันสร้างสัญญา" onClick={()=>setConfirm(true)}/>
                                            </Grid>
                                            <Grid item xs={12} md={4} className={loanNumber ? '' : 'btn-disabled'} >
                                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF} />
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
