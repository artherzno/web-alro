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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

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
    MuiSelectObjYear,
    MuiRadioButton, 
    MuiTextNumber, 
    MuiTextfieldCurrency,
    MuiDatePicker, 
    ButtonFluidPrimary, 
    ButtonNormalIconStartPrimary,
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
    const [inputData, setInputData] = useState({
        // ProjectPlanYear: 0,
        // typeLoan: '',

        typeMember: '1',
        typeId: '1',
        typeGuarantee: '1',
        typeDebt: '1',
        prefix: undefined,
        name: undefined,
        surname: undefined,
        idNum: '',
        telNum: undefined,
        activityProject: [],

        IDCard: '', // 1234567891017,
        LoanFarmerTypeID: '', // 1,
        FrontName: '', // 'นาย',
        Name: '', // 'จิมมี่',
        Sirname: '', // 'แซ่ฉ่วย',
        BirthDate: '', // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: '',

        ProjectYear: 0, // 2564,
        LoanPeriodCode: '', // "ส",
        FarmerID: props.FarmerI, // 1,
        LandID: '', // 1,
        FarmerProjectName1: '', // "",
        objective1: '', // "",
        Loan_amount1: '', // "",
        FarmerProjectName2: '', // "",
        objective2: '', // "",
        Loan_amount2: '', // "",
        FarmerProjectName3: '', // "",
        objective3: '', // "",
        Loan_amount3: '', // "",
        Loan_Total: '', // 0,
        Farming_LandRai: '', // 1,
        Main_Plant: '', // "",
        Income_PerYearPerRai: '', // 0,
        Income_PerYear: '', // 0,
        Interest_Percent: '', // 0,
        Principle_YearNoPay: '', // 0,
        Interest_YearNoPay: '', // 0,
        Supporter_Fname1: '', // "aaa",
        Supporter_Lname1: '', // "bbb",
        Supporter_IDCard1: '', // "1234567891014",
        Supporter_Fname2: '', // "xxx",
        Supporter_Lname2: '', // "yyy",
        Supporter_IDCard2: '', // "1234567891014",
        Property: '', // "",
        Hire_purchase_contract_Number: '', // "",
        LandValue: '', // 0,
        LandPaidValue: '', // 0,
        Debt: '', // 0,
        Debt_Owner: '', // "",
        Debt_Amount: '', // 0
    })

    const [countAddActivityProject, setCountAddActivityProject] = useState(1);

    useEffect(() => {
        setLoaded(true);
        
        if(props.FarmerID === 0) {
            setErr(true)
            setErrMsg('ไม่สามารถทำรายการได้')
        } else {
            

        const getFarmer = () => {
            axios.post(
                `${server_hostname}/admin/api/get_farmer`, {"FarmerID": props.FarmerID}, { headers: { "token": token } } 
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
                        console.log(res.data.data)
                        let resFarmer = res.data.data;
                        setInputData({
                            ...inputData,
                            IDCard: resFarmer.IDCard, // 1234567891017,
                            file: resFarmer.file,
                            LoanFarmerTypeID: resFarmer.LoanFarmerTypeID, // 1,
                            FrontName: resFarmer.FrontName, // 'นาย',
                            Name: resFarmer.Name, // 'จิมมี่',
                            Sirname: resFarmer.Sirname, // 'แซ่ฉ่วย',
                            BirthDate: resFarmer.BirthDate, // '2022-12-11',
                            Tel: resFarmer.Tel, // '087-712-8888',
                            IDCardEXP_Date: resFarmer.IDCardEXP_Date,
                        })
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
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
                        getFarmer();
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

    }
        // executed when component mounted
        isMounted.current = true;
        return () => {
            // executed when unmount
            isMounted.current = false;
        }
    }, [])

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
        setInputData({...inputData,
            typeGuarantee: event.target.value
        })
        console.log('typeGuarantee ',event.target.value)
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

    // Input Text field  ********************************
    const handleInputData = (event) => {
        console.log('event.target.name',event.target.name)
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
        console.log(event)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        let addApplicantStep1 = document.getElementById('addApplicantStep1');
        let formData = new FormData(addApplicantStep1);
        formData.delete('typeRadio')
        // formData.append('FarmerID', inputData.FarmerID)

        axios.post(
            `${server_hostname}/admin/api/add_applicant_step1`, formData, { headers: { "token": token } } 
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
        ).catch(err => { console.log(err); history.push('/') })
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

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        history.push('/manageinfo/searchmember');

    };

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

                                {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelectObjYear label="ปีงบประมาณ" valueYaer={10} name="ProjectYear" value={inputData.ProjectYear} onChange={handleInputData} />
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
                                                <MuiTextfield disabled label="วัน เดือน ปี เกิด" value={(inputData.BirthDate) ? moment(inputData.BirthDate).format('DD/MM/YYYY') : ''} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield disabled label="หมายเลขประจำตัว 13 หลัก" value={inputData.IDCard} />
                                            </Grid>
                                            {/* <Grid item xs={12} md={7}>
                                                <MuiRadioButton label="วันหมดอายุบัตรประจำตัวประชาชน" id="loanrequestcontact-step1-typeid-input" lists={['ตลอดชีพ','มีวันหมดอายุ']} value={inputData.typeId} onChange={handleChangeTypeId} type="row" />
                                            </Grid> */}
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield disabled label="วันหมดอายุบัตรประจำตัวประชาชน" value={(inputData.IDCardEXP_Date) ? moment(inputData.IDCardEXP_Date).format('DD/MM/YYYY') : ''} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield disabled label="เบอร์โทรศัพท์" value={inputData.Tel} /></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 2 - ข้อ1  -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
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
                                                        {/* Field Radio Button ---------------------------------------------------*/}
                                                        <MuiCheckbox label="Alro Land" id="loanrequestcontact-step1-no1-alro-checkbox"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="หมู่ที่" id="loanrequestcontact-step1-no1-addr1-input" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiSelect label="จังหวัด" id="loanrequestcontact-step1-no1-province-select" lists={['กรุงเทพฯ','ปทุมธานี','นนทบุรี','นครปฐม']} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiSelect label="เขต / อำเภอ" id="loanrequestcontact-step1-no1-district-select" lists={['เขต/อำเภอ 1','เขต/อำเภอ 2','เขต/อำเภอ 3']} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiSelect label="แขวง / ตำบล" id="loanrequestcontact-step1-no1-subdistrict-select" lists={['แขวง/ตำบล 1','แขวง/ตำบล 2','แขวง/ตำบล 3']} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiSelect label="ประเภทหนังสือสำคัญ" id="loanrequestcontact-step1-no1-typebook-select" lists={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ','ส.ป.ก. 4-01','โฉนด']} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="เลขที่" id="loanrequestcontact-step1-no1-number-input" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="กลุ่ม" id="loanrequestcontact-step1-no1-group-input" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="แปลง" id="loanrequestcontact-step1-no1-field1-input" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="แปลง" id="loanrequestcontact-step1-no1-field2-input" defaultValue="" endAdornment="ไร่"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="แปลง" id="loanrequestcontact-step1-no1-field3-input" defaultValue="" endAdornment="งาน"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="แปลง" id="loanrequestcontact-step1-no1-fieldภ-input" defaultValue="" endAdornment="วา"/>
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
                                                            <MuiTextfield label="1. กิจกรรม / โครงการ" name="FarmerProjectName1" value={inputData.FarmerProjectName1} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective1" value={inputData.objective1} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldEndAdornment label="จำนวนเงิน" defaultValue="50000" endAdornment="บาท" textAlign="right" name="Loan_amount1" value={inputData.Loan_amount1} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box component="div" className="box box-grey" m={1}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield label="2. กิจกรรม / โครงการ" name="FarmerProjectName2" value={inputData.FarmerProjectName2} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective2" value={inputData.objective2} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldEndAdornment label="จำนวนเงิน" defaultValue="50000" endAdornment="บาท" textAlign="right" name="Loan_amount2" value={inputData.Loan_amount2} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box component="div" className="box box-grey" m={1}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield label="3. กิจกรรม / โครงการ" name="FarmerProjectName3" value={inputData.FarmerProjectName3} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldMultiLine label="วัตถุประสงค์" defaultValue="" row="3" name="objective3" value={inputData.objective3} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldEndAdornment label="จำนวนเงิน" defaultValue="50000" endAdornment="บาท" textAlign="right" name="Loan_amount3" value={inputData.Loan_amount3} />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box component="div" className="box box-grey" m={1} textAlign="right">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p className="loanrequestcontact-loan-amount">จำนวนเงินรวม <span className="txt-green">150,000 </span>บาท</p>
                                                            <MuiTextfieldCurrency label="" name="Loan_Total" value={inputData.Loan_Total}  onChange={handleInputData} />
                                                            {/* <p className="loanrequestcontact-loan-amount">จำนวนเงินรวม <span className="txt-green">150,000 </span>บาท</p> */}
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
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 2</h1>
                                                    </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="จำนวนที่ดินสำหรับประกอบเกษตรกรรมในเขตปฏิรูปที่ดิน" defaultValue="" endAdornment="ไร่" name="Farming_LandRai" value={inputData.Farming_LandRai} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="พืชหลักที่ปลูก" defaultValue="" name="Main_Plant" value={inputData.Main_Plant} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="ได้ผลผลิตเป็นรายได้ต่อปี ไร่ละ" defaultValue="" endAdornment="บาท" name="Income_PerYearPerRai" value={inputData.Income_PerYearPerRai}/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="รวมเป็นเงินทั้งสิ้นประมาณปีละ" defaultValue="" endAdornment="บาท" name="Income_PerYear" value={inputData.Income_PerYear} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 4 - ข้อ3  -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 3</h1>
                                                    </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfieldEndAdornment label="ดอกเบี้ยเงินกู้ อัตราร้อยละ" endAdornment="ต่อปี" name="Interest_Percent" value={inputData.Interest_Percent}/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="ระยะเวลาปลอดการชำระเงิน" />
                                                    <Grid container>
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiCheckbox label="เงินต้น" id="loanrequestcontact-step1-no3-cost-checkbox"  />
                                                        </Grid> */}
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfieldEndAdornment row label="เงินต้น" endAdornment="ปี" style={{ margin: '0' }} name="Principle_YearNoPay" value={inputData.Principle_YearNoPay} />
                                                        </Grid> 
                                                    {/* </Grid>
                                                    <Grid container> */}
                                                        {/* <Grid item xs={12} md={3}>
                                                            <MuiCheckbox label="ดอกเบี้ย" id="loanrequestcontact-step1-no3-increse-checkbox"  />
                                                        </Grid> */}

                                                        <Grid item xs={12} md={1}>
                                                            &nbsp;
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfieldEndAdornment label="ดอกเบี้ย" endAdornment="ปี" style={{ margin: '0' }} name="Interest_YearNoPay" value={inputData.Interest_YearNoPay} />
                                                        </Grid> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 5 - ข้อ4  -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 4</h1>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="หลักประกันการกู้ยืมเงิน" />
                                                    <RadioGroup name="typeRadio" value={inputData.typeGuarantee} onChange={handleChangeTypeGuarantee}>
                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="แบบรายบุคคล" />
                                                        
                                                        <div style={ inputData.typeGuarantee === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            <div className="radio-group-content">
                                                                <Box component="div" className="box box-grey result-list">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <span style={{display: 'block'}}>รายที่ 1.</span>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="ชื่อ" defaultValue="" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="นามสกุล" defaultValue="" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleInputData}  />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                                <Box component="div" className="box box-grey result-list">
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <span style={{display: 'block'}}>รายที่ 2.</span>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="ชื่อ" defaultValue="" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="นามสกุล" defaultValue="" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={12}>
                                                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="ืno2-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleInputData}  />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </div>
                                                        </div>
                                                        
                                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="แบบอสังหาริมทรัพย์" />
                                                        <div style={ inputData.typeGuarantee === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            <div className="radio-group-content">
                                                                <MuiTextfieldMultiLine label=""  defaultValue="" row="3" />
                                                            </div>
                                                        </div>
                                                    </RadioGroup> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 6 - ข้อ5  -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 5</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="เลขที่สัญญาเช่าซื้อที่ดินของ ส.ป.ก." />
                                                    <div className="dsp-f">
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" name="Hire_purchase_contract_Number" value={inputData.Hire_purchase_contract_Number}/>
                                                        </Grid>
                                                        <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                            <span>/</span>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label=""  />
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="มูลค่าที่ดิน" endAdornment="บาท" name="LandValue" value={inputData.LandValue} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="มูลค่าที่ดินที่จ่ายให้แก่ส.ป.ก.แล้ว" endAdornment="บาท" name="LandPaidValue" value={inputData.LandPaidValue} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 7 - ข้อ 6  -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 6</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="ปัจจุบัน ข้าพเจ้า" />
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <RadioGroup name="Debt" value={inputData.Debt} onChange={handleChangeTypeDebt}>
                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="ไม่มีหนี้สิน" />
                                                        
                                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="มีหนี้สิน" />
                                                        <div style={ inputData.typeDebt === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <div className="radio-group-content">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Select ---------------------------------------------------*/}
                                                                        <MuiSelect label="โดยมีหนี้อยู่กับ" lists={['ธ.ก.ส.','กองทุนหมู่บ้าน/กองทุนนโยบายรัฐ','หนี้สหกรณ์','หนี้นอกระบบ','อื่น ๆ โปรดระบุ']} name="Debt_Owner" value={inputData.Debt_Owner} />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfieldEndAdornment label="จำนวน" endAdornment="บาท" name="Debt_Amount" value={inputData.Debt_Amount} />
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

                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidPrimary label={'บันทึกข้อมูล 1'} onClick={handleSubmit} /> 
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
            </Fade>

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

export default LoanRequestContactStep1
