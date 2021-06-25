import React, { useEffect, useState, useContext, useRef } from 'react';
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

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiLabelHeader,
    MuiTextfield,
    MuiTextfieldEndAdornment,
    MuiCheckbox,
    MuiSelect,
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
    const form = useRef(null)
    const auth = useContext(AuthContext);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        // IDCard: 1234567891017,
        IDCard: null, // 1234567891017,
        file: null,
        LoanFarmerTypeID: null, // 1,
        FrontName: null, // 'นาย',
        Name: null, // 'จิมมี่',
        SirName: null, // 'แซ่ฉ่วย',
        BirthDate: null, // '2022-12-11',
        Tel: null, // '087-712-8888',
        IDCardEXP_Date: null, // '2022-12-13',
        IDCARD_AddNo: null, // '123',
        IDCARD_AddMoo: null, // 'หมู่ 4',
        IDCARD_AddrSoiRoad: null, // 'ถ. มิตรภาพ',
        IDCARD_AddrSubdistrictID: null, // 100102,
        IDCARD_AddrDistrictID: null, // 1001,
        IDCARD_AddrProvinceID: null, // 10,
        IDCARD_Postcode: null, // 12345,
        IDCard_Addrzone: null,
        Contact_AddNo: null,
        Contact_AddMoo: null,
        Contact_AddrSoiRoad: null,
        Contact_AddrSubdistrictID: null,
        Contact_AddrDistrictID: null,
        Contact_AddrProvinceID: null,
        Contact_Postcode: null,
        Contact_Addrzone: null,
        FarmerGrade: null,
        Request: null,

        typeMember: '1',
        name: undefined,
        surname: undefined,
        idNum: '',
        telNum: undefined,
        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);


    useEffect(() => {
        console.log(document.cookie)
        async function fetchCheckLogin() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin'
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === null || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsLoaded(true);
                    setErr(true);
                });
        }

        setLoaded(true);
        fetchCheckLogin();

    }, [history, server_hostname, server_port])

    // Radio Button
    const handleChangeTypeMember = (event) => {
        setInputData({
            ...inputData,
            typeMember: event.target.value
        })
        console.log('typeMember ', event.target.value)
    };
    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0, 13)
        setInputData({
            ...inputData,
            idNum: event.target.value
        })
        console.log('idNum ', event.target.value)
    }
    // End Input ID Number

    // Input Tel Number
    const handleTelNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0, 10)
        setInputData({
            ...inputData,
            telNum: event.target.value
        })
    }
    // End Input Tel Number

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
        if(event.target.type === 'number') {
            console.log(event.target.name,':', event.target.id.toString().slice(-3))
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                // setInputData({
                //     ...inputData, w56
                  
                //     [event.target.name]: event.target.value
                // })
            } else {
                event.target.value = event.target.value.toString().slice(0, 13)
                // setInputData({
                //     ...inputData,
                //     [event.target.name]: event.target.value
                // })
            }
        // } else {
        //     setInputData({
        //         ...inputData,
        //         [event.target.name]: event.target.value
        //     })
        }
        console.log(event)
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const myFile = document.querySelector("input[type=file]").files[0];

        let addFarmerForm = document.getElementById('addFarmerForm');
        let formData = new FormData(addFarmerForm);
        
        // formData.append('IDCard', document.getElementById('addmember-idc').value);
        // formData.append("file", myFile);
        // formData.append("LoanFarmerTypeID", inputData.LoanFarmerTypeID);
        // formData.append("FrontName", inputData.FrontName);
        // formData.append("Name", inputData.Name);
        // formData.append("SirName", inputData.SirName);
        // formData.append("BirthDate", inputData.BirthDate);
        // formData.append("Tel", inputData.Tel);
        // formData.append("IDCardEXP_Date", inputData.IDCardEXP_Date);
        // formData.append("IDCARD_AddNo", inputData.IDCARD_AddNo);
        // formData.append("IDCARD_AddMoo", inputData.IDCARD_AddMoo);
        // formData.append("IDCARD_AddrSoiRoad", inputData.IDCARD_AddrSoiRoad);
        // formData.append("IDCARD_AddrSubdistrictID", inputData.IDCARD_AddrSubdistrictID);
        // formData.append("IDCARD_AddrDistrictID", inputData.IDCARD_AddrDistrictID);
        // formData.append("IDCARD_AddrProvinceID", inputData.IDCARD_AddrProvinceID);
        // formData.append("IDCard_Addrzone", inputData.IDCard_Addrzone);
        // formData.append("Contact_AddNo", inputData.Contact_AddNo);
        // formData.append("Contact_AddMoo", inputData.Contact_AddMoo);
        // formData.append("Contact_AddrSoiRoad", inputData.Contact_AddrSoiRoad);
        // formData.append("Contact_AddrSubdistrictID", inputData.Contact_AddrSubdistrictID);
        // formData.append("Contact_AddrDistrictID", inputData.Contact_AddrDistrictID);
        // formData.append("Contact_AddrProvinceID", inputData.Contact_AddrProvinceID);
        // formData.append("Contact_Postcode", inputData.Contact_Postcode);
        // formData.append("Contact_Addrzone", inputData.Contact_Addrzone);
        // formData.append("FarmerGrade", inputData.FarmerGrade);
        // formData.append("Request", inputData.Request);

// console.warn(formData)

        fetch(`http://${server_hostname}:${server_port}/admin/api/add_farmer`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if(data.code === 0) {
                setErr(true);
                setErrMsg(data.message)
            }else {
                history.push('/manageinfo/searchmember')
            }
        })
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
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="IDCard" value={inputData.IDCard} onInput={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="ประเภทสมาชิก" id="addmember-type-input" lists={['รายบุคคล', 'สถาบัน']} value={1} name="LoanFarmerTypeID" onChange={handleInputData} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" id="addmember-prefix-input" lists={['นาย', 'นาง', 'นางสาว']} />
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
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" defaultValue="" value={inputData.BirthDate} name="BirthDate" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input" defaultValue="" value={inputData.IDCardEXP_Date} name="IDCardEXP_Date" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel" defaultValue="" placeholder="ตัวอย่าง 0812345678" name="Tel" data-name="Telephone" value={inputData.Tel} onInput={handleInputData} />
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
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-idcard-addr1-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-idcard-addr2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ซอย / ถนนที่" id="addmember-idcard-addr3-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="จังหวัด" id="addmember-idcard-province-select" lists={['กรุงเทพมหานคร', 'นนทบุรี', 'นครปฐม']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="เขต / อำเภอ" id="addmember-idcard-district-select" lists={['เขต/อำเภอ1', 'เขต/อำเภอ2', 'เขต/อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={['แขวง/ตำบล1', 'แขวง/ตำบล1', 'แขวง/ตำบล1']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-tel-postcode-input" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.telNum} onInput={handleTelNumber} />
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
                                                <MuiSelect label="จังหวัด" id="addmember-contact-province-select" lists={['กรุงเทพมหานคร', 'นนทบุรี', 'นครปฐม']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="เขต / อำเภอ" id="addmember-contact-district-select" lists={['เขต/อำเภอ1', 'เขต/อำเภอ2', 'เขต/อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="แขวง / ตำบล" id="addmember-contact-subdistrict-select" lists={['แขวง/ตำบล1', 'แขวง/ตำบล1', 'แขวง/ตำบล1']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-contact-tel-postcode-input" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.telNum} onInput={handleTelNumber} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 4 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            {<FormLandInfo />}
                                            {[...Array(countAddLandInfo)].map((_, i) => <FormLandInfo key={i} />)}
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormLandInfo} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
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
