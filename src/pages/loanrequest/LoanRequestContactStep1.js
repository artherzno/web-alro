import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
// import SearchIcon from '@material-ui/icons/Search';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiLabelHeader, 
    MuiLabelHeaderCheckbox,
    MuiTextfield, 
    MuiTextfieldMultiLine,
    MuiTextfieldEndAdornment,
    MuiCheckbox, 
    MuiSelect, 
    MuiSelectObj, 
    MuiSelectObjYear,
    MuiSelectObjYearValue,
    MuiSelectObjProjectYearValue,
    MuiSelectSubDistrict,
    MuiSelectDistrict,
    MuiSelectProvince,
    MuiRadioButton, 
    MuiTextNumber, 
    MuiTextfieldCurrency,
    MuiDatePicker, 
    ButtonFluidPrimary, 
    ButtonNormalIconStartPrimary,
    ButtonFluidOutlineSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

function LoanRequestContactStep1(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [errLandData, setErrLandData] = useState(false)
    const [inputDataSupporter, setInputDataSupporter] = useState({
        FrontName: '',
        Name: '',
        Sirname: '',
    })

    const [inputData, setInputData] = useState({
        // ProjectPlanYear: 0,
        // typeLoan: '',

        typeMember: '1',
        typeId: '1',
        typeGuarantee: '',
        typeDebt: '1',
        prefix: undefined,
        name: undefined,
        surname: undefined,
        idNum: '',
        telNum: undefined,
        activityProject: [],

        ApplicantNo: '',
        AppLocation: 'สำนักการปฏิรูปที่ดินจังหวัด'+localStorage.getItem('provincename'),
        AppTo: 'ปฏิรูปที่ดินจังหวัด'+localStorage.getItem('provincename'),

        IDCard: '', // 1234567891017,
        LoanFarmerTypeID: '', // 1,
        FrontName: '', // 'นาย',
        Name: '', // 'จิมมี่',
        Sirname: '', // 'แซ่ฉ่วย',
        BirthDate: '', // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: '',
        land_data: [],
        LandID: 0,
        Land_AddrProvinceID: 0,
        Land_AddrDistrictID: 0,
        Land_AddrSubdistrictID: 0,
        Land_description: '',
        DocLand_code: 0,
        LandNumber: '', // "0",
        LandGroup: '', // "10",
        Plang: '', // 0,
        Rai: '', // 0,
        Ngan: '', // 0,
        Wa: '', // 0,

        ProjectYear: 0, // 2564,
        LoanPeriodCode: '', // "ส",
        FarmerID: props.FarmerID, // 1,
        // LandID: '', // 1,
        FarmerProjectName1: '', // "",
        objective1: '', // "",
        Loan_amount1: 0, // "",
        FarmerProjectName2: '', // "",
        objective2: '', // "",
        Loan_amount2: 0, // "",
        FarmerProjectName3: '', // "",
        objective3: '', // "",
        Loan_amount3: 0, // "",
        Loan_Total: 0, // 0,
        Farming_LandRai: 0, // 1,
        Main_Plant: '', // "",
        Income_PerYearPerRai: 0, // 0,
        Income_PerYear: 0, // 0,
        Interest_Percent: 0, // 0,
        Principle_YearNoPay: 0, // 0,
        Interest_YearNoPay: 0, // 0,
        Supporter_Fname1: '', // "aaa",
        Supporter_Lname1: '', // "bbb",
        Supporter_IDCard1: '', // "1234567891014",
        Supporter_Fname2: '', // "xxx",
        Supporter_Lname2: '', // "yyy",
        Supporter_IDCard2: '', // "1234567891014",
        Supporter_Fname3: '', // "xxx",
        Supporter_Lname3: '', // "yyy",
        Supporter_IDCard3: '', // "1234567891014",
        Supporter_Fname4: '', // "xxx",
        Supporter_Lname4: '', // "yyy",
        Supporter_IDCard4: '', // "1234567891014",
        Supporter_Fname5: '', // "aaa",
        Supporter_Lname5: '', // "bbb",
        Supporter_IDCard5: '', // "1234567891014",
        Supporter_Fname6: '', // "aaa",
        Supporter_Lname6: '', // "bbb",
        Supporter_IDCard6: '', // "1234567891014",
        Supporter_Fname7: '', // "aaa",
        Supporter_Lname7: '', // "bbb",
        Supporter_IDCard7: '', // "1234567891014",
        Supporter_Fname8: '', // "aaa",
        Supporter_Lname8: '', // "bbb",
        Supporter_IDCard8: '', // "1234567891014",
        Supporter_Fname9: '', // "aaa",
        Supporter_Lname9: '', // "bbb",
        Supporter_IDCard9: '', // "1234567891014",
        Supporter_Fname10: '', // "aaa",
        Supporter_Lname10: '', // "bbb",
        Supporter_IDCard10: '', // "1234567891014",
        Supporter_Fname11: '', // "aaa",
        Supporter_Lname11: '', // "bbb",
        Supporter_IDCard11: '', // "1234567891014",
        Supporter_Fname12: '', // "aaa",
        Supporter_Lname12: '', // "bbb",
        Supporter_IDCard12: '', // "1234567891014",
        Supporter_Fname13: '', // "aaa",
        Supporter_Lname13: '', // "bbb",
        Supporter_IDCard13: '', // "1234567891014",
        Supporter_Fname14: '', // "aaa",
        Supporter_Lname14: '', // "bbb",
        Supporter_IDCard14: '', // "1234567891014",
        Supporter_Fname15: '', // "aaa",
        Supporter_Lname15: '', // "bbb",
        Supporter_IDCard15: '', // "1234567891014",
        Supporter_Fname16: '', // "aaa",
        Supporter_Lname16: '', // "bbb",
        Supporter_IDCard16: '', // "1234567891014",
        Property: '', // "",
        Hire_purchase_contract_Number: '', // "",
        LandValue: 0, // 0,
        LandPaidValue: 0, // 0,
        Debt: '', // 0,
        Debt_Owner: '', // "",
        Debt_Amount: 0, // 0
        dCreated: null,

        ApplicantDate: moment().format(),
        RecDate: moment().format()
    })

    const [supporterAmount,setSupporterAmount] = useState(4)
    const supporterAmountList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    const [approvalData, setApprovalData] = useState([])
    const [approvalStatus, setApprovalStatus] = useState('')

    const [countAddActivityProject, setCountAddActivityProject] = useState(1);

    const [docLandTypeList, setDocLandTypeList] = useState([])
    const [provinceLandList, setProvinceLandList] = useState(['กรุณาเลือกจังหวัด']);

    const [Land_AddMoo, setLand_AddMoo] = useState('')
    const [Land_AddrProvinceID, setLand_AddrProvinceID] = useState('')
    const [Land_AddrDistrictID, setLand_AddrDistrictID] = useState('')
    const [Land_AddrSubdistrictID, setLand_AddrSubdistrictID] = useState('')
    const [DocLand_code, setDocLand_code] = useState('')
    const [LandNumber, setLandNumber] = useState('')
    const [LandGroup, setLandGroup] = useState('')
    const [Plang, setPlang] = useState('')
    const [Rai, setRai] = useState('')
    const [Ngan, setNgan] = useState('')
    const [Wa, setWa] = useState('')

    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))

     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))

    useEffect(() => {
        setLoaded(true);

        // New order date 2021-08-23 to 23/08/2564
        const newOrderDate = (val) => {
            let yyyy = Number(val.substring(0,4)) + 543
            let mm = val.substring(5,7)
            let dd = val.substring(8,10)
            return dd+'/'+mm+'/'+yyyy
        }

        console.log('---------------------')
        console.log('Step1 applicantID', inputData.ApplicantID || props.ApplicantID)
        console.log('Step1 action:',props.action)
        console.log('Step1 stepper status:',localStorage.getItem('stepperStatus'))
        console.log('---------------------')

        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceLandList(dataProvinceList)

        let dataDocLandTypeList = JSON.parse(localStorage.getItem('doclandtypelist'))
        setDocLandTypeList(dataDocLandTypeList)

        // Action : view Applicant Step1
        const getViewApplicantStep1 = () => {
            setIsLoading(true)
            axios.post(
                `${server_hostname}/admin/api/view_applicant_step1`, {
                    "ApplicantID": localStorage.getItem('stepperStatus') === 'processing' ? localStorage.getItem('applicantID') : props.ApplicantID
                }, { headers: { "token": token } } 
            ).then(res => {
                    console.log(res)
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
                        setIsLoading(false)
                    } else {
                        let dataFarmer = data.Farmer[0];
                        let dataLand = data.Land[0]
                        let dataDetail = data.data[0]
                        let dataApproval = (typeof data.approval_data === 'object') ? '' : data.approval_data[0]
                        // console.log('view farmer:',res.data.Farmer[0])
                        // console.log('view land:',res.data.Land[0])
                        // console.log('view detail:',res.data.data[0])

                        setLand_AddMoo(dataLand.Land_AddMoo)
                        setLand_AddrProvinceID(dataLand.Land_AddrProvinceID)
                        setLand_AddrDistrictID(dataLand.Land_AddrDistrictID)
                        setLand_AddrSubdistrictID(dataLand.Land_AddrSubdistrictID)
                        setDocLand_code(dataLand.DocLand_code)
                        setLandNumber(dataLand.LandNumber)
                        setLandGroup(dataLand.LandGroup)
                        setPlang(dataLand.Plang)
                        setRai(dataLand.Rai)
                        setNgan(dataLand.Ngan)
                        setWa(dataLand.Wa)
                        

                        console.log(data.approval_data.length)
                        setApprovalData(dataApproval)
                        setApprovalStatus(data.approval_data.length === undefined ? '' : data.approval_data[0].Approval === 1 ? 'P' : data.approval_data[0].Approval === 0 ? 'C' : data.approval_data[0].Approval === null || data.approval_data[0].Approval === '' ? '' : 'F')

                        setInputData({
                            ...inputData,
                            typeGuarantee: (dataDetail.Property === '' || dataDetail.Property === null) && (dataDetail.Supporter_Fname1 === '' || dataDetail.Supporter_Fname1 === null) ? '' : (dataDetail.Property === '' || dataDetail.Property === null) ? '1' : '2',

                            IDCard: dataFarmer.IDCard, // 1234567891017,
                            LoanFarmerTypeID: dataFarmer.LoanFarmerTypeID, // 1,
                            FrontName: dataFarmer.FrontName, // 'นาย',
                            Name: dataFarmer.Name, // 'จิมมี่',
                            Sirname: dataFarmer.Sirname, // 'แซ่ฉ่วย',
                            BirthDate: dataFarmer.BirthDate, // '2022-12-11',
                            Tel: dataFarmer.Tel, // '087-712-8888',
                            IDCardEXP_Date: dataFarmer.IDCardEXP_Date,
                            land_data: [],
                            LandID: dataLand.LandID,
                            Land_description: dataLand.Land_description,
                            Land_AddrProvinceID: dataLand.Land_AddrProvinceID,
                            Land_AddrDistrictID: dataLand.Land_AddrDistrictID,
                            Land_AddrSubdistrictID: dataLand.Land_AddrSubdistrictID,
                            DocLand_code: dataLand.DocLand_code,
                            LandNumber: dataLand.LandNumber, // "0",
                            LandGroup: dataLand.LandGroup, // "10",
                            Plang: dataLand.Plang, // 0,
                            Rai: dataLand.Rai, // 0,
                            NganNgan: dataLand.NganNgan, // 0,
                            Wa: dataLand.Wa, // 0,
                    
                            ApplicantNo: dataDetail.ApplicantNo || '',
                            AppLocation: dataDetail.AppLocation || '',
                            AppTo: dataDetail.AppTo || '',
                            ProjectYear: dataDetail.ProjectYear - 2500 || null, // 2564,
                            LoanPeriodCode: dataDetail.LoanPeriodCode || '', // "ส",
                            FarmerID: props.FarmerID, // 1,
                            // LandID: '', // 1,
                            FarmerProjectName1: dataDetail.FarmerProjectName1 || '', // "",
                            objective1: dataDetail.objective1 || '', // "",
                            Loan_amount1: dataDetail.Loan_amount1 || 0, // "",
                            FarmerProjectName2: dataDetail.FarmerProjectName2 || '', // "",
                            objective2: dataDetail.objective2 || '', // "",
                            Loan_amount2: dataDetail.Loan_amount2 || 0, // "",
                            FarmerProjectName3: dataDetail.FarmerProjectName3 || '', // "",
                            objective3: dataDetail.objective3 || '', // "",
                            Loan_amount3: dataDetail.Loan_amount3 || 0, // "",
                            Loan_Total: dataDetail.Loan_Total || '', // 0,
                            Farming_LandRai: dataDetail.Farming_LandRai || 0, // 1,
                            Main_Plant: dataDetail.Main_Plant || '', // "",
                            Income_PerYearPerRai: dataDetail.Income_PerYearPerRai || 0, // 0,
                            Income_PerYear: dataDetail.Income_PerYear || 0, // 0,
                            Interest_Percent: dataDetail.Interest_Percent || 0, // 0,
                            Principle_YearNoPay: dataDetail.Principle_YearNoPay || 0, // 0,
                            Interest_YearNoPay: dataDetail.Interest_YearNoPay || 0, // 0,
                            Supporter_Fname1: dataDetail.Supporter_Fname1 || '', // "aaa",
                            Supporter_Lname1: dataDetail.Supporter_Lname1 || '', // "bbb",
                            Supporter_IDCard1: dataDetail.Supporter_IDCard1 || '', // "1234567891014",
                            Supporter_Fname2: dataDetail.Supporter_Fname2 || '', // "xxx",
                            Supporter_Lname2: dataDetail.Supporter_Lname2 || '', // "yyy",
                            Supporter_IDCard2: dataDetail.Supporter_IDCard2 || '', // "1234567891014",
                            Supporter_Fname3: dataDetail.Supporter_Fname3 || '', // "xxx",
                            Supporter_Lname3: dataDetail.Supporter_Lname3 || '', // "yyy",
                            Supporter_IDCard3: dataDetail.Supporter_IDCard3 || '', // "1234567891014",
                            Supporter_Fname4: dataDetail.Supporter_Fname4 || '', // "xxx",
                            Supporter_Lname4: dataDetail.Supporter_Lname4 || '', // "yyy",
                            Supporter_IDCard4: dataDetail.Supporter_IDCard4 || '', // "1234567891014",
                            Supporter_Fname5: dataDetail.Supporter_Fname5 || '', // "aaa",
                            Supporter_Lname5: dataDetail.Supporter_Lname5 || '', // "bbb",
                            Supporter_IDCard5: dataDetail.Supporter_IDCard5 || '', // "1234567891014",
                            Supporter_Fname6: dataDetail.Supporter_Fname6 || '', // "aaa",
                            Supporter_Lname6: dataDetail.Supporter_Lname6 || '', // "bbb",
                            Supporter_IDCard6: dataDetail.Supporter_IDCard6 || '', // "1234567891014",
                            Supporter_Fname7: dataDetail.Supporter_Fname7 || '', // "aaa",
                            Supporter_Lname7: dataDetail.Supporter_Lname7 || '', // "bbb",
                            Supporter_IDCard7: dataDetail.Supporter_IDCard7 || '', // "1234567891014",
                            Supporter_Fname8: dataDetail.Supporter_Fname8 || '', // "aaa",
                            Supporter_Lname8: dataDetail.Supporter_Lname8 || '', // "bbb",
                            Supporter_IDCard8: dataDetail.Supporter_IDCard8 || '', // "1234567891014",
                            Supporter_Fname9: dataDetail.Supporter_Fname9 || '', // "aaa",
                            Supporter_Lname9: dataDetail.Supporter_Lname9 || '', // "bbb",
                            Supporter_IDCard9: dataDetail.Supporter_IDCard9 || '', // "1234567891014",
                            Supporter_Fname10: dataDetail.Supporter_Fname10 || '', // "aaa",
                            Supporter_Lname10: dataDetail.Supporter_Lname10 || '', // "bbb",
                            Supporter_IDCard10: dataDetail.Supporter_IDCard10 || '', // "1234567891014",
                            Supporter_Fname11: dataDetail.Supporter_Fname11 || '', // "aaa",
                            Supporter_Lname11: dataDetail.Supporter_Lname11 || '', // "bbb",
                            Supporter_IDCard11: dataDetail.Supporter_IDCard11 || '', // "1234567891014",
                            Supporter_Fname12: dataDetail.Supporter_Fname12 || '', // "aaa",
                            Supporter_Lname12: dataDetail.Supporter_Lname12 || '', // "bbb",
                            Supporter_IDCard12: dataDetail.Supporter_IDCard12 || '', // "1234567891014",
                            Supporter_Fname13: dataDetail.Supporter_Fname13 || '', // "aaa",
                            Supporter_Lname13: dataDetail.Supporter_Lname13 || '', // "bbb",
                            Supporter_IDCard13: dataDetail.Supporter_IDCard13 || '', // "1234567891014",
                            Supporter_Fname14: dataDetail.Supporter_Fname14 || '', // "aaa",
                            Supporter_Lname14: dataDetail.Supporter_Lname14 || '', // "bbb",
                            Supporter_IDCard14: dataDetail.Supporter_IDCard14 || '', // "1234567891014",
                            Supporter_Fname15: dataDetail.Supporter_Fname15 || '', // "aaa",
                            Supporter_Lname15: dataDetail.Supporter_Lname15 || '', // "bbb",
                            Supporter_IDCard15: dataDetail.Supporter_IDCard15 || '', // "1234567891014",
                            Supporter_Fname16: dataDetail.Supporter_Fname16 || '', // "aaa",
                            Supporter_Lname16: dataDetail.Supporter_Lname16 || '', // "bbb",
                            Supporter_IDCard16: dataDetail.Supporter_IDCard16 || '', // "1234567891014",
                            Property: dataDetail.Property || '', // "",
                            Hire_purchase_contract_Number: dataDetail.Hire_purchase_contract_Number || '', // "",
                            LandValue: dataDetail.LandValue || 0, // 0,
                            LandPaidValue: dataDetail.LandPaidValue || 0, // 0,
                            Debt: dataDetail.Debt === '' || dataDetail.Debt === null ? '' : (!dataDetail.Debt) ? '0' : '1', // 0,
                            Debt_Owner: dataDetail.Debt_Owner || '', // "",
                            Debt_Amount: dataDetail.Debt_Amount || 0, // 0
                            dCreated: dataDetail.dCreated === null ? '-' : newOrderDate(dataDetail.dCreated),
                        })

                        setSupporterAmount(!!dataDetail.supporterAmount?dataDetail.supporterAmount: 4)
                        // let resApplicant = res.data.data[0];
                        setIsLoading(false)
                    }
                }
            ).catch(err => { console.log(err); })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        } 

        // Get Farmer
        const getFarmer = () => {
            setIsLoading(true)
            axios.post(
                `${server_hostname}/admin/api/get_farmer_step1`, {"FarmerID": props.FarmerID}, { headers: { "token": token } } 
            ).then(res => {
                    // console.log(res)
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
                    } else {
                        // console.log('land_data',res.data.data.land_data)
                        let resFarmer = res.data.data;
                        setInputData({
                            ...inputData,
                            IDCard: resFarmer.IDCard || '', // 1234567891017,
                            file: resFarmer.file || '',
                            LoanFarmerTypeID: resFarmer.LoanFarmerTypeID || '', // 1,
                            FrontName: resFarmer.FrontName || '', // 'นาย',
                            Name: resFarmer.Name || '', // 'จิมมี่',
                            Sirname: resFarmer.Sirname || '', // 'แซ่ฉ่วย',
                            BirthDate: resFarmer.BirthDate || null, // '2022-12-11',
                            Tel: resFarmer.Tel || '', // '087-712-8888',
                            IDCardEXP_Date: resFarmer.IDCardEXP_Date || null,
                            land_data: resFarmer.land_data || [],
                        })
                        

                        if(res.data.data.land_data === undefined) {
                            setErrLandData(true);
                        }
                        setIsLoading(false)
                    }
                }
            ).catch(err => { console.log(err);  })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        } 


        
        // Action :  View -----------------------------------------//
        if(props.action === 'view') {
            console.log("View ApplicantID", props.ApplicantID)  
            getViewApplicantStep1();     
        } else if(props.action === 'edit') {
            console.log("Edit ApplicantID", props.ApplicantID)  
            getViewApplicantStep1();     
        } else if(props.action === 'add' && localStorage.getItem('stepperStatus') === 'processing' ) {
            console.log("Add Processing ApplicantID", props.ApplicantID)  
            getViewApplicantStep1();
        } else {
            // Action : Add -----------------------------------------//
            if(props.FarmerID === 0) {
                setErr(true)
                setErrMsg('ไม่สามารถทำรายการได้')
            } else {    

                getFarmer();     
            }
        }


        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    // console.log(res)
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
                    } else {
                        // getFarmer();
                    }
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

    const handleInputLandData = (event) => {
        // console.log('handleInputLandData', event.target.value)
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })

        let land_data = inputData.land_data;
        for(let i=0; i<land_data.length; i++){
            if(land_data[i].LandID === event.target.value) {
                setLand_AddMoo(land_data[i].Land_AddMoo || '')
                setLand_AddrProvinceID(land_data[i].Land_AddrProvinceID || '')
                setLand_AddrDistrictID(land_data[i].Land_AddrDistrictID || '')
                setLand_AddrSubdistrictID(land_data[i].Land_AddrSubdistrictID || '')
                setDocLand_code(land_data[i].DocLand_code || '')
                setLandNumber(land_data[i].LandNumber || '')
                setLandGroup(land_data[i].LandGroup || '')
                setPlang(land_data[i].Plang || '')
                setRai(land_data[i].Rai || '')
                setNgan(land_data[i].Ngan || '')
                setWa(land_data[i].Wa || '')

                setInputData({
                    ...inputData,
                    LandID: land_data[i].LandID || '',
                    // Land_AddrProvinceID: land_data[i].Land_AddrProvinceID || '',
                    // Land_AddrDistrictID: land_data[i].Land_AddrDistrictID || '',
                    // Land_AddrSubdistrictID: land_data[i].Land_AddrSubdistrictID || '',
                    // Land_AddMoo: land_data[i].Land_AddMoo || '',
                    // DocLand_code: land_data[i].DocLand_code || '',
                    // LandNumber: land_data[i].LandNumber || '', // "0",
                    // LandGroup: land_data[i].LandGroup || '', // "10",
                    // Plang: land_data[i].Plang || '', // 0,
                    // Rai: land_data[i].Rai || '', // 0,
                    // Ngan: land_data[i].Ngan || '', // 0,
                    // Wa: land_data[i].Wa || '', // 0,
                });
            }
        }

    }

    const handleInputSupporterData = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        let typeNumber = event.target.id.toString().slice(-3);
        if (typeNumber === 'idc') {
            event.target.value = event.target.value.toString().slice(0, 13)
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })

        }

        if(event.target.value.length < 13) {
            if(event.target.name === 'Supporter_IDCard1') {
                setInputData({
                    ...inputData,
                    Supporter_Fname1: '', // "aaa",
                    Supporter_Lname1: '', // "bbb",
                    Supporter_IDCard1: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard2') {
                setInputData({
                    ...inputData,
                    Supporter_Fname2: '', // "aaa",
                    Supporter_Lname2: '', // "bbb",
                    Supporter_IDCard2: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard3') {
                setInputData({
                    ...inputData,
                    Supporter_Fname3: '', // "aaa",
                    Supporter_Lname3: '', // "bbb",
                    Supporter_IDCard3: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard4') {
                setInputData({
                    ...inputData,
                    Supporter_Fname4: '', // "aaa",
                    Supporter_Lname4: '', // "bbb",
                    Supporter_IDCard4: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard5') {
                setInputData({
                    ...inputData,
                    Supporter_Fname5: '', // "aaa",
                    Supporter_Lname5: '', // "bbb",
                    Supporter_IDCard5: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard6') {
                setInputData({
                    ...inputData,
                    Supporter_Fname6: '', // "aaa",
                    Supporter_Lname6: '', // "bbb",
                    Supporter_IDCard6: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard7') {
                setInputData({
                    ...inputData,
                    Supporter_Fname7: '', // "aaa",
                    Supporter_Lname7: '', // "bbb",
                    Supporter_IDCard7: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard8') {
                setInputData({
                    ...inputData,
                    Supporter_Fname8: '', // "aaa",
                    Supporter_Lname8: '', // "bbb",
                    Supporter_IDCard8: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard9') {
                setInputData({
                    ...inputData,
                    Supporter_Fname9: '', // "aaa",
                    Supporter_Lname9: '', // "bbb",
                    Supporter_IDCard9: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard10') {
                setInputData({
                    ...inputData,
                    Supporter_Fname10: '', // "aaa",
                    Supporter_Lname10: '', // "bbb",
                    Supporter_IDCard10: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard11') {
                setInputData({
                    ...inputData,
                    Supporter_Fname11: '', // "aaa",
                    Supporter_Lname11: '', // "bbb",
                    Supporter_IDCard11: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard12') {
                setInputData({
                    ...inputData,
                    Supporter_Fname12: '', // "aaa",
                    Supporter_Lname12: '', // "bbb",
                    Supporter_IDCard12: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard13') {
                setInputData({
                    ...inputData,
                    Supporter_Fname13: '', // "aaa",
                    Supporter_Lname13: '', // "bbb",
                    Supporter_IDCard13: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard14') {
                setInputData({
                    ...inputData,
                    Supporter_Fname14: '', // "aaa",
                    Supporter_Lname14: '', // "bbb",
                    Supporter_IDCard14: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard15') {
                setInputData({
                    ...inputData,
                    Supporter_Fname15: '', // "aaa",
                    Supporter_Lname15: '', // "bbb",
                    Supporter_IDCard15: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard16') {
                setInputData({
                    ...inputData,
                    Supporter_Fname16: '', // "aaa",
                    Supporter_Lname16: '', // "bbb",
                    Supporter_IDCard16: event.target.value,
                })
            }

        } else if(event.target.value.length === 13) {
            
            axios.post(
                `${server_hostname}/admin/api/search_supporter_step1`, {"IDCard": event.target.value}, { headers: { "token": token } } 
            ).then(res => {
                    console.log(res)
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
                    } else {

                        if(event.target.name === 'Supporter_IDCard1') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname1: data.data[0].Name || '', // "aaa",
                                Supporter_Lname1: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard1: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard2') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname2: data.data[0].Name || '', // "aaa",
                                Supporter_Lname2: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard2: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard3') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname3: data.data[0].Name || '', // "aaa",
                                Supporter_Lname3: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard3: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard4') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname4: data.data[0].Name || '', // "aaa",
                                Supporter_Lname4: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard4: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard5') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname5: data.data[0].Name || '', // "aaa",
                                Supporter_Lname5: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard5: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard6') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname6: data.data[0].Name || '', // "aaa",
                                Supporter_Lname6: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard6: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard7') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname7: data.data[0].Name || '', // "aaa",
                                Supporter_Lname7: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard7: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard8') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname8: data.data[0].Name || '', // "aaa",
                                Supporter_Lname8: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard8: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard9') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname9: data.data[0].Name || '', // "aaa",
                                Supporter_Lname9: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard9: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard10') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname10: data.data[0].Name || '', // "aaa",
                                Supporter_Lname10: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard10: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard11') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname11: data.data[0].Name || '', // "aaa",
                                Supporter_Lname11: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard11: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard12') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname12: data.data[0].Name || '', // "aaa",
                                Supporter_Lname12: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard12: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard13') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname13: data.data[0].Name || '', // "aaa",
                                Supporter_Lname13: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard13: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard14') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname14: data.data[0].Name || '', // "aaa",
                                Supporter_Lname14: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard14: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard15') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname15: data.data[0].Name || '', // "aaa",
                                Supporter_Lname15: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard15: data.data[0].IDCard || '',
                            })
                        } else if(event.target.name === 'Supporter_IDCard16') {
                            setInputData({
                                ...inputData,
                                Supporter_Fname16: data.data[0].Name || '', // "aaa",
                                Supporter_Lname16: data.data[0].Sirname || '', // "bbb",
                                Supporter_IDCard16: data.data[0].IDCard || '',
                            })
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
    }

    // Radio Button
    const handleChangeTypeMember = (event) => {
        setInputData({...inputData,
            typeMember: event.target.value
        })
        console.log('typeMember ',event.target.value)
    };

    const handleChangeTypeId = (event) => {
        setInputData({...inputData,
            typeId: event.target.value
        })
        console.log('typeId ',event.target.value)
    };
    // End Radio Button

    // Radio Guarantee
    const handleChangeTypeGuarantee = (event) => {
        
        console.log('typeGuarantee ',event.target.value)
        if(event.target.value === '2') {
            setInputData({...inputData,
                typeGuarantee: event.target.value,
                Supporter_Fname1: '',
                Supporter_Lname1: '',
                Supporter_IDCard1: '',
                Supporter_Fname2: '',
                Supporter_Lname2: '',
                Supporter_IDCard2: '',
                Supporter_Fname3: '',
                Supporter_Lname3: '',
                Supporter_IDCard3: '',
                Supporter_Fname4: '',
                Supporter_Lname4: '',
                Supporter_IDCard4: '',
                Supporter_Fname5: '',
                Supporter_Lname5: '',
                Supporter_IDCard5: '',
                Supporter_Fname6: '',
                Supporter_Lname6: '',
                Supporter_IDCard6: '',
                Supporter_Fname7: '',
                Supporter_Lname7: '',
                Supporter_IDCard7: '',
                Supporter_Fname8: '',
                Supporter_Lname8: '',
                Supporter_IDCard8: '',
                Supporter_Fname9: '',
                Supporter_Lname9: '',
                Supporter_IDCard9: '',
                Supporter_Fname10: '',
                Supporter_Lname10: '',
                Supporter_IDCard10: '',
                Supporter_Fname11: '',
                Supporter_Lname11: '',
                Supporter_IDCard11: '',
                Supporter_Fname12: '',
                Supporter_Lname12: '',
                Supporter_IDCard12: '',
                Supporter_Fname13: '',
                Supporter_Lname13: '',
                Supporter_IDCard13: '',
                Supporter_Fname14: '',
                Supporter_Lname14: '',
                Supporter_IDCard14: '',
                Supporter_Fname15: '',
                Supporter_Lname15: '',
                Supporter_IDCard15: '',
                Supporter_Fname16: '',
                Supporter_Lname16: '',
                Supporter_IDCard16: '',
            })
        } else {
            setInputData({...inputData,
                typeGuarantee: event.target.value,
                Property: ''
            })
        }
    }
    // End Radio Guarantee

    // Radio Type Debt
    const handleChangeTypeDebt = (event) => {
        setInputData({...inputData,
            typeDebt: event.target.value
        })
        console.log('typeDebt ',event.target.value)
    }
    // End Radio Type Debt

    const handleUploadImg = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUpload: imgArr
        })
    }


    const newOrderDate = (val) => {

        if(val === null || val === '') {
            return null
        } else {
            let yyyy = Number(val.substring(0,4)) + 543
            let mm = val.substring(5,7)
            let dd = val.substring(8,10)
            return dd+'/'+mm+'/'+yyyy
        }
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

    // Handle Submit ************************************
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('submit')
        let Loan_amount1_value = inputData.Loan_amount1.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Loan_amount2_value = inputData.Loan_amount2.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Loan_amount3_value = inputData.Loan_amount3.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Loan_Total_value = inputData.Loan_Total.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Income_PerYearPerRai_value = inputData.Income_PerYearPerRai.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Interest_Percent_value = inputData.Interest_Percent.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Income_PerYear_value = inputData.Income_PerYear.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Principle_YearNoPay_value = inputData.Principle_YearNoPay.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Interest_YearNoPay_value = inputData.Interest_YearNoPay.toLocaleString('en-US', {minimumFractionDigits: 2})
        let LandValue_value = inputData.LandValue.toLocaleString('en-US', {minimumFractionDigits: 2})
        let LandPaidValue_value = inputData.LandPaidValue.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Debt_Amount_value = inputData.Debt_Amount.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Farming_LandRai_value = inputData.Farming_LandRai.toLocaleString('en-US', {minimumFractionDigits: 2})

        let addApplicantStep1 = document.getElementById('addApplicantStep1');
        let formData = new FormData(addApplicantStep1);
        formData.delete('typeRadio')
        formData.append('FarmerID', inputData.FarmerID)
        // formData.append('LoanPeriodCode', inputData.LoanPeriodCode)
        // formData.append('Debt',parseInt(inputData.Debt))
        formData.set('ProjectYear',(inputData.ProjectYear === 0 ? '' : inputData.ProjectYear + 2500))
        formData.set('Loan_amount1', parseFloat(Loan_amount1_value.split(',').join('')))
        formData.set('Loan_amount2', parseFloat(Loan_amount2_value.split(',').join('')))
        formData.set('Loan_amount3', parseFloat(Loan_amount3_value.split(',').join('')))
        formData.set('Loan_Total', parseFloat(Loan_Total_value.split(',').join('')))
        formData.set('Income_PerYearPerRai', parseFloat(Income_PerYearPerRai_value.split(',').join('')))
        formData.set('Interest_Percent', parseFloat(Interest_Percent_value.split(',').join('')))
        formData.set('Income_PerYear', parseFloat(Income_PerYear_value.split(',').join('')))
        formData.set('Principle_YearNoPay', parseFloat(Principle_YearNoPay_value.split(',').join('')))
        formData.set('Interest_YearNoPay', parseFloat(Interest_YearNoPay_value.split(',').join('')))
        formData.set('LandValue', parseFloat(LandValue_value.split(',').join('')))
        formData.set('LandPaidValue', parseFloat(LandPaidValue_value.split(',').join('')))
        formData.set('Debt_Amount', parseFloat(Debt_Amount_value.split(',').join('')))
        formData.set('Farming_LandRai', parseFloat(Farming_LandRai_value.split(',').join('')))
        formData.set('LandID',parseInt(inputData.LandID))
        formData.set('ApplicantDate',moment(inputData.ApplicantDate).format('YYYY-MM-DD'))
        formData.set('RecDate',moment(inputData.RecDate).format('YYYY-MM-DD'))
        formData.set('supporterAmount',supporterAmount)

        let url = '';
        if(props.action === 'edit') {
            url = `${server_hostname}/admin/api/edit_applicant_step1`;
            console.log('edit step1 !!!')
            formData.append('ApplicantID', props.ApplicantID);
        } else if(localStorage.getItem('stepperStatus') === 'processing' ) {
            url = `${server_hostname}/admin/api/edit_applicant_step1`;
            console.log('add processing step1 !!!')
            formData.append('ApplicantID', localStorage.getItem('applicantID'));
        } else {
            console.log('add step1 !!!')
            url = `${server_hostname}/admin/api/add_applicant_step1`
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
                    console.log('get applicantID:',data.results.recordset[0].ApplicantID)
                    if(props.action === 'add') {
                        localStorage.setItem('applicantID',data.results.recordset[0].ApplicantID)
                    }
                    localStorage.setItem('stepperStatus','processing')
                    localStorage.setItem('applicantProjectYear',inputData.ProjectYear)
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
    };

    const postData = () => {
        console.log(inputData)
        history.push('/manageinfo/searchmember');
    }

    const cancelData = () => {
        history.push('/manageinfo/searchmember');
    }

    const addFormActivityProject = () => {
        setCountAddActivityProject(countAddActivityProject + 1)
        inputData.activityProject.push(countAddActivityProject);
    }

    const FormActivityProject = (props) => {
        // console.log(countAddActivityProject)
        const { num } = props;
        return (
            <Box component="div" className="box box-grey" m={1}>
                 <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        {/* Field Text ---------------------------------------------------*/}
                        
                        <IconButton aria-label="upload picture" component="span" className="box-close">
                        <CloseIcon />
                        </IconButton>
                        <MuiTextfield label={(num+1)+". กิจกรรม / โครงการ"} id="loanrequestcontact-step1-activityproject-name-input" defaultValue="" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {/* Field Text ---------------------------------------------------*/}
                        <MuiTextfieldMultiLine label="วัตถุประสงค์" id="loanrequestcontact-step1-activityproject-obj-textarea" defaultValue="" row="3" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        {/* Field Text ---------------------------------------------------*/}
                        <MuiTextfieldEndAdornment label="จำนวนเงิน" id="loanrequestcontact-step1-activityproject-cash-input" defaultValue="50000" endAdornment="บาท" textAlign="right" />
                    </Grid>
                </Grid>
            </Box>
        );
    }

    const supporterBox = (val) => {
        let boxArr = []
        for(let i=0; i<val; i++) {
            boxArr.push(
                <Box component="div" className="box box-grey result-list">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <span style={{display: 'block'}}>รายที่ {i+1}.</span>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id={`no${i+1}-idc`} placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData["Supporter_IDCard" + (i+1)]} name={`Supporter_IDCard${i+1}`} onInput = {handleInputSupporterData}  />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MuiTextfield inputdisabled="input-disabled" label="ชื่อ" value={inputData["Supporter_Fname"+(i+1)]} name={`Supporter_Fname${i+1}`} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MuiTextfield inputdisabled="input-disabled" label="นามสกุล" value={inputData["Supporter_Lname"+(i+1)]} name={`Supporter_Lname${i+1}`} />
                    </Grid>
                </Grid>
            </Box>
            )
        }

        return boxArr
    }

    const handleSupporterAmount = (e) => {
        console.log('handleSupporterAmount',e.target.value)
        setSupporterAmount(e.target.value)
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        // history.push('/manageinfo/searchmember');

    };

    const handleGotoSearch = () => {
        setErr(false);
        setSuccess(false);
        history.push('/loanrequest/loanrequestcontactsearch')
    };

    if(isLoading) {
        return (
            <div style={{width: '100%', padding: '50px', textAlign: 'center'}}>...Loading...</div>
        )
    } else {
        
        return (
            <div className="loanrequestcontact-step-page">
                <div className="header-nav">
                    <Header bgColor="bg-light-green" status="logged" />
                    <Nav />
                </div>
                
                <Fade in={loaded} timeout={800}>
                    <div className="fade">
                        <Container maxWidth="sm">
                            <form id="addApplicantStep1" className="root" noValidate autoComplete="off">

                                <Grid container spacing={2}>
                                    {/* // Action: view */}
                                    {
                                        props.action === 'view' ? 
                                        <Grid item xs={12} md={12} className="title-page">
                                            <h1>รายละเอียดการยื่นคำขอ</h1>
                                        </Grid> : ''
                                    }
                                    
                                    {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>
                                                {/* <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ลำดับที่" name="ApplicantNo" value={inputData.ApplicantNo} onChange={handleInputData} />
                                                </Grid> */}
                                                {
                                                    props.action === 'view' || props.action === 'edit' ? 
                                                    <React.Fragment>
                                                        <Grid item xs={12} md={6}>
                                                            <p className="txt-green txt-left">วันที่ยื่นคำขอ {inputData.dCreated} </p>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <p className="txt-green txt-right">{approvalStatus}  เลขที่คำขอ {inputData.ApplicantNo}</p>
                                                            {/* <p className="txt-green txt-right">{approvalData.Approval === null || (!approvalData.Approval) ? '' : (approvalData.Approval === 0) ? 'C' : (approvalData.Approval === 1) ?'P' : 'F' } เลขที่คำขอ {inputData.ApplicantNo}</p> */}
                                                        </Grid>
                                                    </React.Fragment>
                                                    : ''
                                                }
                                                 <Grid item xs={12} md={6}>
                                                    <MuiDatePicker label="วันที่ยื่นคำขอ" name="ApplicantDate"  value={inputData.ApplicantDate} onChange={(newValue)=>{ setInputData({ ...inputData, ApplicantDate: moment(newValue).format()}) }}  />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiDatePicker label="วันที่บันทึก" name="RecDate" value={inputData.RecDate} onChange={(newValue)=>{ setInputData({ ...inputData, RecDate: moment(newValue).format()}) }}  />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield label="เขียนที่" inputdisabled="input-disabled" name="AppLocation" value={inputData.AppLocation} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield label="เรียน" inputdisabled="input-disabled" name="AppTo" value={inputData.AppTo} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiSelectObjProjectYearValue label="ปีงบประมาณ" valueYaer={10} name="ProjectYear" value={inputData.ProjectYear} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={9} className="loanrequestcontact-num-box">
                                                        {/* <p className="loanrequestcontact-num">P เลขที่คำขอ 10640037</p> */}
                                                    <MuiRadioButton label="ประเภทเงินกู้" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} name="LoanPeriodCode" value={inputData.LoanPeriodCode} onChange={handleInputData} type="row" />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield disabled label="คำนำหน้า" value={inputData.FrontName} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield disabled label="ชื่อ" value={inputData.Name} />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield disabled label="นามสกุล" value={inputData.Sirname} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* <MuiTextfield disabled label="วัน เดือน ปี เกิด" value={(inputData.BirthDate) ? moment(inputData.BirthDate).format('DD/MM/YYYY') : ''} /> */}
                                                    <MuiTextfield disabled label="วัน เดือน ปี เกิด" value={newOrderDate(inputData.BirthDate)} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield disabled label="หมายเลขประจำตัว 13 หลัก" value={inputData.IDCard} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={7}>
                                                    <MuiRadioButton label="วันหมดอายุบัตรประจำตัวประชาชน" id="loanrequestcontact-step1-typeid-input" lists={['ตลอดชีพ','มีวันหมดอายุ']} value={inputData.typeId} onChange={handleChangeTypeId} type="row" />
                                                </Grid> */}
                                                <Grid item xs={12} md={12}>
                                                    {/* <MuiTextfield disabled label="วันหมดอายุบัตรประจำตัวประชาชน" value={(inputData.IDCardEXP_Date) ? moment(inputData.IDCardEXP_Date).format('DD/MM/YYYY') : ''} /> */}
                                                    <MuiTextfield disabled label="วันหมดอายุบัตรประจำตัวประชาชน" value={newOrderDate(inputData.IDCardEXP_Date)} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield disabled label="เบอร์โทรศัพท์" value={inputData.Tel} /></Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 2 - ข้อ1  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2} className="paper-container">
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อ 1</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiLabelHeader label="ที่ตั้งที่ดิน" />
                                                            <Divider variant="middle" style={{ margin: '0'}} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {
                                                                props.action === 'view' || props.action === 'edit' ? 
                                                                <MuiTextfield inputdisabled="input-disabled" label="หมายเลขที่ตั้งที่ดิน" value={inputData.Land_description} />
                                                                :
                                                                <MuiSelectObj label="หมายเลขที่ตั้งที่ดิน" itemName={'Land_description'} itemValue={'LandID'} lists={inputData.land_data} name="LandID" value={inputData.LandID} onChange={handleInputLandData} />
                                                        }
                                                        </Grid>
                                                        {
                                                            errLandData ? <Grid item xs={12} md={12} className="pd-t-5"><p className="txt-red">ไม่พบข้อมูลที่ตั้งที่ดิน</p></Grid> : ''
                                                        }
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Radio Button ---------------------------------------------------*/}
                                                            <MuiCheckbox label="Alro Land" id="loanrequestcontact-step1-no1-alro-checkbox"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield inputdisabled="input-disabled" label="หมู่ที่" value={Land_AddMoo}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" id={`Land_AddrProvinceID`}  lists={provinceLandList}  value={Land_AddrProvinceID}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" id={`Land_AddrDistrictID`}  lists={districtList} value={Land_AddrDistrictID} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" id={`Land_AddrSubdistrictID`}  lists={subdistrictList} value={Land_AddrSubdistrictID} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiSelectObj inputdisabled="input-disabled" label="ประเภทหนังสือสำคัญ" id={`DocLand_code`} itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={DocLand_code} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield inputdisabled="input-disabled" label="เลขที่"  id={`LandNumbe`}  value={LandNumber} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield inputdisabled="input-disabled" label="กลุ่ม" id={`LandGroup`}  value={LandGroup} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield inputdisabled="input-disabled" label="แปลง" id={`Plang`}  value={Plang} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldEndAdornment inputdisabled="input-disabled" label="ไร่"  id={`Rai`} value={Rai}  endAdornment="ไร่" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldEndAdornment inputdisabled="input-disabled" label="งาน" id={`Ngan`} value={Ngan}  endAdornment="งาน" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfieldEndAdornment inputdisabled="input-disabled" label="วา" id={`Wa`} value={Wa}  endAdornment="วา" />
                                                        </Grid>
                                                    </Grid>


                                                    <Grid item xs={12} md={12}>
                                                        <br/>
                                                        <MuiLabelHeader label="กิจกรรม/โครงการที่มีความประสงค์จะกู้ยืมเงิน" />
                                                        <Divider variant="middle" style={{ margin: '0'}} />
                                                    </Grid>

                                                    <Box component="div" className="box box-grey" m={1}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="1. กิจกรรม / โครงการ" name="FarmerProjectName1" value={inputData.FarmerProjectName1}  onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiSelect label="วัตถุประสงค์" listsValue={['ประกอบเกษตรกรรม','ค่าชดเชย']} lists={['ประกอบเกษตรกรรม','ค่าชดเชย']} name="objective1" value={inputData.objective1} onChange={handleInputData}  />
                                                
                                                                {/* <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective1" value={inputData.objective1}  onChange={handleInputData}  /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={11}>
                                                                <p className="paper-p">จำนวนเงิน</p>
                                                                <MuiTextfieldCurrency label="" name="Loan_amount1" value={inputData.Loan_amount1}  onChange={handleInputData} /> 
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p className="paper-p">&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    <Box component="div" className="box box-grey" m={1}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="2. กิจกรรม / โครงการ" name="FarmerProjectName2" value={inputData.FarmerProjectName2}   onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiSelect label="วัตถุประสงค์" listsValue={['ประกอบเกษตรกรรม','ค่าชดเชย']} lists={['ประกอบเกษตรกรรม','ค่าชดเชย']} name="objective2" value={inputData.objective2} onChange={handleInputData}  />
                                                
                                                                {/* <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective2" value={inputData.objective2}  onChange={handleInputData}  /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={11}>
                                                                <p className="paper-p">จำนวนเงิน</p>
                                                                <MuiTextfieldCurrency label="" name="Loan_amount2" value={inputData.Loan_amount2}  onChange={handleInputData} /> 
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p className="paper-p">&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    <Box component="div" className="box box-grey" m={1}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="3. กิจกรรม / โครงการ" name="FarmerProjectName3" value={inputData.FarmerProjectName3} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiSelect label="วัตถุประสงค์" listsValue={['ประกอบเกษตรกรรม','ค่าชดเชย']} lists={['ประกอบเกษตรกรรม','ค่าชดเชย']} name="objective3" value={inputData.objective3} onChange={handleInputData}  />
                                                
                                                                {/* <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective3" value={inputData.objective3} onChange={handleInputData} /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={11}>
                                                                <p className="paper-p">จำนวนเงิน</p>
                                                                <MuiTextfieldCurrency label="" name="Loan_amount3" value={inputData.Loan_amount3}  onChange={handleInputData} /> 
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p className="paper-p">&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                    <Box component="div" className="box box-grey" m={1} textAlgin="right">
                                                        <Grid container spacing={2} className="loanrequestcontactstep-loantotal">
                                                            <Grid item xs={12} md={6}>
                                                                <p className="paper-p txt-right">จำนวนเงินรวม</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                {/* <p className="loanrequestcontact-loan-amount">จำนวนเงินรวม <span className="txt-green">
                                                                    { 
                                                                        ((inputData.Loan_amount1 === 0 || inputData.Loan_amount1 === '' ? 0 : parseFloat(inputData.Loan_amount1.split(',').join(''))) + 
                                                                        (inputData.Loan_amount2 === 0 || inputData.Loan_amount2 === '' ? 0 : parseFloat(inputData.Loan_amount2.split(',').join(''))) +
                                                                        (inputData.Loan_amount3 === 0 || inputData.Loan_amount3 === '' ? 0 : parseFloat(inputData.Loan_amount3.split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                    } 
                                                                </span> บาท</p> */}
                                                                <MuiTextfieldCurrency label="" name="Loan_Total" value={ 
                                                                        ((inputData.Loan_amount1 === 0 || inputData.Loan_amount1 === '' ? 0 : parseFloat(inputData.Loan_amount1.split(',').join(''))) + 
                                                                        (inputData.Loan_amount2 === 0 || inputData.Loan_amount2 === '' ? 0 : parseFloat(inputData.Loan_amount2.split(',').join(''))) +
                                                                        (inputData.Loan_amount3 === 0 || inputData.Loan_amount3 === '' ? 0 : parseFloat(inputData.Loan_amount3.split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})
                                                                    }  onChange={handleInputData} />
                                                                
                                                                {/* <p className="loanrequestcontact-loan-amount">จำนวนเงินรวม <span className="txt-green">150,000 </span>บาท</p> */}
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>

                                                    {/* { [...Array(countAddActivityProject)].map((_, i) => <FormActivityProject key={i} num={i} />) } 
                                                    <Grid item xs={12} md={12}>
                                                        <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormActivityProject}/>
                                                    </Grid>*/}
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 3 - ข้อ2  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 2</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <p className="">จำนวนที่ดินสำหรับประกอบเกษตรกรรมในเขตปฏิรูปที่ดิน</p>
                                                        <MuiTextfieldCurrency label="" name="Farming_LandRai" value={inputData.Farming_LandRai} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="พืชหลักที่ปลูก" name="Main_Plant" value={inputData.Main_Plant} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <p className="">ได้ผลผลิตเป็นรายได้ต่อปี ไร่ละ</p>
                                                        <MuiTextfieldCurrency label="" name="Income_PerYearPerRai" value={inputData.Income_PerYearPerRai} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <p className="">รวมเป็นเงินทั้งสิ้นประมาณปีละ</p>
                                                        {/* {
                                                            props.action === 'add' ?
                                                            <MuiTextfieldCurrency label="" name="Income_PerYear" value={inputData.Farming_LandRai * inputData.Income_PerYearPerRai} onChange={handleInputData} /> 
                                                            :
                                                            <MuiTextfieldCurrency label="" name="Income_PerYear" value={inputData.Income_PerYear} onChange={handleInputData} /> 
                                                        } */}
                                                        <MuiTextfieldCurrency label=""  name="Income_PerYear" value={parseFloat((inputData.Farming_LandRai.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')) * parseFloat((inputData.Income_PerYearPerRai.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 4 - ข้อ3  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 3</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={10}>
                                                        <p className="">ดอกเบี้ยเงินกู้ อัตราร้อยละ</p>
                                                        <MuiTextfieldCurrency label="" name="Interest_Percent" value={inputData.Interest_Percent} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={2}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ต่อปี</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox label="ระยะเวลาปลอดการชำระเงิน" />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={5}>
                                                                <p className="">เงินต้น</p>
                                                                <MuiTextfieldCurrency label="" name="Principle_YearNoPay" value={inputData.Principle_YearNoPay} onChange={handleInputData} /> 
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">ปี</p>
                                                            </Grid>


                                                            {/* <Grid item xs={12} md={5}>
                                                                <p className="">ดอกเบี้ย</p>
                                                                <MuiTextfieldCurrency label="" name="Interest_YearNoPay" value={inputData.Interest_YearNoPay} onChange={handleInputData} /> 
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">ปี</p>
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 5 - ข้อ4  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 4</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox label="หลักประกันการกู้ยืมเงิน" />
                                                        <RadioGroup name="typeRadio" value={inputData.typeGuarantee} onChange={handleChangeTypeGuarantee}>
                                                            <Grid container spacing={2} className="paper-container">
                                                                <Grid item xs={12} md={8}>
                                                                    <p>&nbsp;</p>
                                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="แบบรายบุคคล" />
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                        <MuiSelect label="จำนวนผู้ค้ำประกัน" listsValue={supporterAmountList} lists={supporterAmountList} value={supporterAmount} onChange={handleSupporterAmount}  />
                                                                </Grid>
                                                            </Grid>
                                                            <div style={ inputData.typeGuarantee === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                                <div className="radio-group-content" style={{height: '480px', overflow: 'auto'}}>
                                                                    {
                                                                        
                                                                        supporterBox(supporterAmount)
                                                                    
                                                                    }
                                                                    {/* <Box component="div" className="box box-grey result-list">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <span style={{display: 'block'}}>รายที่ 1.</span>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.Supporter_IDCard1} name="Supporter_IDCard1" onInput = {handleInputSupporterData}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อ" value={inputData.Supporter_Fname1} name="Supporter_Fname1" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="นามสกุล" value={inputData.Supporter_Lname1} name="Supporter_Lname1" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box component="div" className="box box-grey result-list">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <span style={{display: 'block'}}>รายที่ 2.</span>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no2-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.Supporter_IDCard2} name="Supporter_IDCard2" onInput = {handleInputSupporterData}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อ" value={inputData.Supporter_Fname2} name="Supporter_Fname2" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="นามสกุล" value={inputData.Supporter_Lname2} name="Supporter_Lname2" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box component="div" className="box box-grey result-list">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <span style={{display: 'block'}}>รายที่ 3.</span>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no3-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.Supporter_IDCard3} name="Supporter_IDCard3" onInput = {handleInputSupporterData}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อ" value={inputData.Supporter_Fname3} name="Supporter_Fname3" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="นามสกุล" value={inputData.Supporter_Lname3} name="Supporter_Lname3" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                    <Box component="div" className="box box-grey result-list">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <span style={{display: 'block'}}>รายที่ 4.</span>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no4-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.Supporter_IDCard4} name="Supporter_IDCard4" onInput = {handleInputSupporterData}  />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="ชื่อ" value={inputData.Supporter_Fname4} name="Supporter_Fname4" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiTextfield inputdisabled="input-disabled" label="นามสกุล" value={inputData.Supporter_Lname4} name="Supporter_Lname4" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box> */}
                                                                </div>
                                                            </div>
                                                            
                                                            <FormControlLabel value="2" control={<Radio color="primary" />} label="แบบอสังหาริมทรัพย์" />
                                                            <div style={ inputData.typeGuarantee === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                                <div className="radio-group-content">
                                                                    <MuiTextfieldMultiLine label="" row="3" value={inputData.Property} name="Property" onChange={handleInputData} />
                                                                </div>
                                                            </div>
                                                        </RadioGroup> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 6 - ข้อ5  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 5</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox label="เลขที่สัญญาเช่าซื้อที่ดินของ ส.ป.ก." />
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="" name="Hire_purchase_contract_Number" value={inputData.Hire_purchase_contract_Number} onChange={handleInputData} />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label=""  />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <p className="">มูลค่าที่ดิน</p>
                                                        <MuiTextfieldCurrency label="" name="LandValue" value={inputData.LandValue} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <p className="">มูลค่าที่ดินที่จ่ายให้แก่ส.ป.ก.แล้ว</p>
                                                        <MuiTextfieldCurrency label="" name="LandPaidValue" value={inputData.LandPaidValue} onChange={handleInputData} /> 
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    {/* Paper 7 - ข้อ 6  -------------------------------------------------- */}
                                    <Grid item xs={12} md={12} className={props.action === 'view' ? 'form-view' : ''}>
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 6</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox label="ปัจจุบัน ข้าพเจ้า" />
                                                        {/* Field Radio Button ---------------------------------------------------*/}
                                                        <RadioGroup name="Debt" value={inputData.Debt} onChange={handleInputData}>
                                                            <FormControlLabel value="0" control={<Radio color="primary" />} label="ไม่มีหนี้สิน" />
                                                            
                                                            <FormControlLabel value="1" control={<Radio color="primary" />} label="มีหนี้สิน" />
                                                            <div style={ inputData.Debt === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                                {/* Field Text ---------------------------------------------------*/}
                                                                <div className="radio-group-content">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            {/* Field Select ---------------------------------------------------*/}
                                                                            <MuiTextfield label="โดยมีหนี้อยู่กับ" name="Debt_Owner" value={inputData.Debt_Owner}  onChange={handleInputData} />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={11}>
                                                                            <p className="">จำนวน</p>
                                                                            <MuiTextfieldCurrency label="" name="Debt_Amount" value={inputData.Debt_Amount} onChange={handleInputData} /> 
                                                                        </Grid>
                                                                        <Grid item xs={1} md={1}>
                                                                            <p>&nbsp;</p>
                                                                            <p className="paper-p">บาท</p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </div>
                                                        </RadioGroup>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                    <Grid container spacing={2} className="btn-row txt-center">
                                        {/* // Action: view */}
                                        {
                                            props.action === 'view' ? 
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="ย้อนกลับ" maxWidth="180px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                            </Grid>
                                            : props.action === 'edit' ? 
                                            <React.Fragment>
                                                <Grid item xs={12} md={8}>
                                                    <ButtonFluidPrimary label={'บันทึกแก้ไขข้อมูล ขั้นตอนที่1'} onClick={handleSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>                          
                                                    <ButtonFluidOutlinePrimary label="ถัดไป" onClick={ props.handleComplete} />
                                                </Grid>
                                            </React.Fragment>
                                            
                                            :   
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label={'บันทึกข้อมูล ขั้นตอนที่1'} onClick={handleSubmit} />                             
                                                {/* <ButtonFluidOutlineSecondary label="test ถัดไป" maxWidth="100px"  onClick={ props.handleComplete} /> */}
                                            </Grid>
                                        }

                                    </Grid>
                                </Grid>
                            </form>
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
                                {
                                    props.action === 'edit' ? 
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                                    :
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={ props.handleComplete} color="primary" style={{justifyContent: 'center'}} /> 
                                }
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
}

export default LoanRequestContactStep1
