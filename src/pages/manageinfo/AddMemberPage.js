import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiLabelHeader,
    MuiTextfield,
    MuiTextfieldEndAdornment,
    MuiCheckbox,
    MuiSelect,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary
} from '../../components/MUIinputs';
import { AuthContext } from '../../App';
import { ErrorMessage } from 'formik';


function AddMemberPage(props) {
    const history = useHistory();
    const form = useRef('')
    const auth = useContext(AuthContext);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [provinceList, setProvinceList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtList, setDistrictList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictList, setSubDistrictList] = useState(['กรุณาเลือก เขต/อำเภอ']);
    const [inputData, setInputData] = useState({
        // IDCard: 1234567891017,
        IDCard: '', // 1234567891017,
        file: '',
        LoanFarmerTypeID: '1', // 1,
        FrontName: 1, // 'นาย',
        Name: '', // 'จิมมี่',
        SirName: '', // 'แซ่ฉ่วย',
        BirthDate: '', // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: '', // '2022-12-13',
        IDCARD_AddNo: '', // '123',
        IDCARD_AddMoo: '', // 'หมู่ 4',
        IDCARD_AddrSoiRoad: '', // 'ถ. มิตรภาพ',
        IDCARD_AddrSubdistrictID: '', // 100102,
        IDCARD_AddrDistrictID: '', // 1001,
        IDCARD_AddrProvinceID: '', // 10,
        IDCARD_Postcode: '', // 12345,
        IDCard_Addrzone: '',
        Contact_AddNo: '',
        Contact_AddMoo: '',
        Contact_AddrSoiRoad: '',
        Contact_AddrSubdistrictID: '',
        Contact_AddrDistrictID: '',
        Contact_AddrProvinceID: '',
        Contact_Postcode: '',
        Contact_Addrzone: '',
        FarmerGrade: '',
        Request: '',

        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);


    useEffect(() => {
        console.log(document.cookie)
        // Get Province
        async function fetchGetProvince() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/get_provinces`, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    "ProvinceID": "",
                    "NameEN": "",
                    "NameTH": ""
                })
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        console.log('ไม่พบจังหวัด');
                    }
                    console.log(res.data)
                    setProvinceList(res.data)
                })
                .catch(err => {
                    console.log(err);
                    console.log('ไม่พบจังหวัด');
                });
        }

        // Check Login
        async function fetchCheckLogin() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin'
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }

                    fetchGetProvince();
                })
                .catch(err => {
                    console.log(err);
                    setIsLoaded(true);
                    setErr(true);
                    history.push('/');
                });
        }

        setLoaded(true);
        fetchCheckLogin();

    }, [history, server_hostname, server_port])


        // Get District
        async function fetchGetDistrict(proviceID) {
            console.log('fetchGetDistrict:proviceID',proviceID)
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/get_districts`, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    "ProvinceID": "10",
                    "DistrictID": "",
                    "NameEN": "",
                    "NameTH": ""
                })
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        console.log('ไม่พบ เขต/อำเภอ');
                    }
                    console.log('district',res.data)
                    setDistrictList(res.data)
                })
                .catch(err => {
                    console.log(err);
                    console.log('ไม่พบ เขต/อำเภอ');
                });
        }

         // Get SubDistrict
         async function fetchGetSubDistrict() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/get_subdistricts`, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    "ProvinceID": "",
                    "DistrictID": "1001",
                    "SubdistrictID": "",
                    "NameEN": "",
                    "NameTH": ""
                })
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        console.log('ไม่พบ แขวง/ตำบล');
                    }
                    console.log('district',res.data)
                    setSubDistrictList(res.data)
                })
                .catch(err => {
                    console.log(err);
                    console.log('ไม่พบ แขวง/ตำบล');
                });
        }

    const handleUploadImg = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            imgUpload: imgArr
        })
    }

    // Input Text field 
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

    // Input Province, District, Sub District
    const handleInputDataProvince = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        fetchGetDistrict(event.target.value);
    }

    const handleValidateNumberOnBlur = (event) => {
        console.log(event)
        // if(event.target.value.length !== 13) {
        //     event.target.classList.add("error");
        // } else {
        //     event.target.classList.remove("error");
        // }
        let typeNumber = event.target.id.toString().slice(-3);
        if(typeNumber === 'tel') {
            if(event.target.value.length !== 10) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        } else if (typeNumber === 'zip') {
            if(event.target.value.length !== 5) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        } else {
            if(event.target.value.length !== 13) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        }
    }

    const handleChooseProvince = () => {

    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputData)
    }

    const cancelData = () => {
        history.push('/manageinfo/searchmember');
    }

    const addFormLandInfo = () => {
        setCountAddLandInfo(countAddLandInfo + 1)
    }

    const FormLandInfo = (i) => {
        return (
            <Grid container spacing={2} className="paper-container">
                <Grid item xs={12} md={12}>
                    <MuiLabelHeader label="ที่ตั้งที่ดิน" />
                    <Divider variant="middle" style={{ margin: '0' }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Radio Button ---------------------------------------------------*/}
                    <MuiCheckbox label="Alro Land" id="addmember-landinfo-alro-checkbox" />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfield label="หมู่ที่" id="addmember-landinfo-addr1-input" defaultValue="" />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="จังหวัด" id="addmember-landinfo-province-select" lists={['กรุงเทพฯ', 'ปทุมธานี', 'นนทบุรี', 'นครปฐม']} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="เขต / อำเภอ" id="addmember-landinfo-district-select" lists={['เขต/อำเภอ 1', 'เขต/อำเภอ 2', 'เขต/อำเภอ 3']} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="แขวง / ตำบล" id="addmember-landinfo-subdistrict-select" lists={['แขวง/ตำบล 1', 'แขวง/ตำบล 2', 'แขวง/ตำบล 3']} />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="ประเภทหนังสือสำคัญ" id="addmember-landinfo-typebook-select" lists={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ', 'ส.ป.ก. 4-01', 'โฉนด']} />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfield label="เลขที่" id="addmember-landinfo-number-input" defaultValue="" />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfield label="กลุ่ม" id="addmember-landinfo-group-input" defaultValue="" />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfield label="แปลง" id="addmember-landinfo-field1-input" defaultValue="" />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field2-input" defaultValue="" endAdornment="ไร่" />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field3-input" defaultValue="" endAdornment="งาน" />
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-fieldภ-input" defaultValue="" endAdornment="วา" />
                </Grid>
            </Grid>
        );
    }


    const handleClosePopup = () => {
        setErr(false);
    };

    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <form id="addFarmerForm" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page">
                                    <h1>เพิ่มเกษตรกร</h1>
                                </Grid>

                                {/* Paper 1 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="IDCard" value={inputData.IDCard} onInput={handleInputData} onBlur={handleValidateNumberOnBlur} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="ประเภทสมาชิก" id="addmember-type-input" lists={['รายบุคคล', 'สถาบัน']} defaultValue={inputData.LoanFarmerTypeID} name="LoanFarmerTypeID" onChange={handleInputData} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" id="addmember-prefix-input" lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="addmember-name-input" defaultValue="" value={inputData.Name} name="Name" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ" id="addmember-name-input" defaultValue="" value={inputData.SirName} name="SirName" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" defaultValue="" onChange={(newValue)=>{ setInputData({ ...inputData, BirthDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input" defaultValue="" onChange={(newValue)=>{ setInputData({ ...inputData, IDCardEXP_Date: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel" defaultValue="" placeholder="ตัวอย่าง 0812345678" name="Tel"  value={inputData.Tel} onInput={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* File upload ---------------------------------------------------*/}
                                                <MuiUpload imgUpload={inputData.imgUpload} id="addmember-img-upload-input" onChange={handleUploadImg} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 2 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ตามบัตรประชาชน" />
                                                <Divider variant="middle" style={{ margin: '0' }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-idcard-addr1-input" defaultValue="" value={inputData.IDCARD_AddNo} name="IDCARD_AddNo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-idcard-addr2-input" defaultValue="" value={inputData.IDCARD_AddMoo} name="IDCARD_AddMoo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ซอย / ถนนที่" id="addmember-idcard-addr3-input" value={inputData.IDCARD_AddrSoiRoad} name="IDCARD_AddrSoiRoad" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectProvince label="จังหวัด" id="addmember-idcard-province-select" lists={provinceList}  value={inputData.IDCARD_AddrProvinceID} name="IDCARD_AddrProvinceID" onChange={handleInputDataProvince} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectDistrict label="เขต / อำเภอ" id="addmember-idcard-district-select" lists={districtList} value={inputData.IDCARD_AddrDistrictID} name="IDCARD_AddrDistrictID" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectSubDistrict label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={subDistrictList} value={inputData.IDCARD_AddrSubdistrictID} name="IDCARD_AddrSubdistrictID" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-zip" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.IDCARD_Postcode} name="IDCARD_Postcode" onChange={handleInputData} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 3 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ที่ติดต่อได้" />
                                                <Divider variant="middle" style={{ margin: '0' }} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Radio Button ---------------------------------------------------*/}
                                                <MuiCheckbox label="ที่อยู่ตามบัตรประชาชน" id="addmember-contact-idcard-checkbox" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-contact-addr1-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-contact-addr2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ซอย / ถนนที่" id="addmember-contact-addr3-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectProvince label="จังหวัด" id="addmember-contact-province-select" lists={provinceList} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="เขต / อำเภอ" id="addmember-contact-district-select" lists={districtList} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="แขวง / ตำบล" id="addmember-contact-subdistrict-select" lists={subDistrictList} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-contact-tel-postcode-input" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.telNum} onInput={handleInputData} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 4 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ที่ตั้งที่ดิน" />
                                                    <Divider variant="middle" style={{ margin: '0' }} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <MuiCheckbox label="Alro Land" id="addmember-landinfo-alro-checkbox" />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="หมู่ที่" id="addmember-landinfo-addr1-input" defaultValue="" />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelect label="จังหวัด" id="addmember-landinfo-province-select" lists={['กรุงเทพฯ', 'ปทุมธานี', 'นนทบุรี', 'นครปฐม']} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelect label="เขต / อำเภอ" id="addmember-landinfo-district-select" lists={['เขต/อำเภอ 1', 'เขต/อำเภอ 2', 'เขต/อำเภอ 3']} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelect label="แขวง / ตำบล" id="addmember-landinfo-subdistrict-select" lists={['แขวง/ตำบล 1', 'แขวง/ตำบล 2', 'แขวง/ตำบล 3']} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelect label="ประเภทหนังสือสำคัญ" id="addmember-landinfo-typebook-select" lists={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ', 'ส.ป.ก. 4-01', 'โฉนด']} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="เลขที่" id="addmember-landinfo-number-input" defaultValue="" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="กลุ่ม" id="addmember-landinfo-group-input" defaultValue="" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="แปลง" id="addmember-landinfo-field1-input" defaultValue="" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field2-input" defaultValue="" endAdornment="ไร่" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field3-input" defaultValue="" endAdornment="งาน" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-fieldภ-input" defaultValue="" endAdornment="วา" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    {/* <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            {<FormLandInfo />}
                                            {[...Array(countAddLandInfo)].map((_, i) => <FormLandInfo key={i} />)}
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormLandInfo} />
                                            </Grid>
                                        </Grid>
                                    </Paper> */}
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} className="btn-row">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
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
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>{errMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default AddMemberPage;
