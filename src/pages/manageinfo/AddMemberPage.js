import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

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


function AddMemberPage(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeMember: '1',
        prefix: undefined,
        name: undefined,
        surname: undefined,
        idNum: '',
        telNum: undefined,
        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, [])

    // Radio Button

    const handleChangeTypeMember = (event) => {
        setInputData({...inputData,
            typeMember: event.target.value
        })
        console.log('typeMember ',event.target.value)
    };
    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            idNum: event.target.value
        })
        console.log('idNum ',event.target.value)
    }
    // End Input ID Number

    // Input Tel Number
    const handleTelNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,10)
        setInputData({...inputData,
            telNum: event.target.value
        })
    }
    // End Input Tel Number

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

    const postData = () => {
        console.log(inputData)
        history.push('/manageinfo/searchmember');
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
                    <Divider variant="middle" style={{ margin: '0'}} />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Radio Button ---------------------------------------------------*/}
                    <MuiCheckbox label="Alro Land" id="addmember-landinfo-alro-checkbox"  />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfield label="หมู่ที่" id="addmember-landinfo-addr1-input" defaultValue="" />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="จังหวัด" id="addmember-landinfo-province-select" lists={['กรุงเทพฯ','ปทุมธานี','นนทบุรี','นครปฐม']} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="เขต / อำเภอ" id="addmember-landinfo-district-select" lists={['เขต/อำเภอ 1','เขต/อำเภอ 2','เขต/อำเภอ 3']} />
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="แขวง / ตำบล" id="addmember-landinfo-subdistrict-select" lists={['แขวง/ตำบล 1','แขวง/ตำบล 2','แขวง/ตำบล 3']} />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* Field Select ---------------------------------------------------*/}
                    <MuiSelect label="ประเภทหนังสือสำคัญ" id="addmember-landinfo-typebook-select" lists={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ','ส.ป.ก. 4-01','โฉนด']} />
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
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field2-input" defaultValue="" endAdornment="ไร่"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field3-input" defaultValue="" endAdornment="งาน"/>
                </Grid>
                <Grid item xs={12} md={4}>
                    {/* Field Text ---------------------------------------------------*/}
                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-fieldภ-input" defaultValue="" endAdornment="วา"/>
                </Grid>
            </Grid>
        );
    }

    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ข้อมูลสมาชิก</h1>
                            </Grid>

                            {/* Paper 1 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="ประเภทสมาชิก" id="addmember-type-input" lists={['รายบุคคล','สถาบัน']} value={inputData.typeMember} onChange={handleChangeTypeMember} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" id="addmember-prefix-input" lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="addmember-name-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ" id="addmember-name-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIdNumber}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel-number-input" defaultValue="" placeholder="ตัวอย่าง 0812345678" value={inputData.telNum} onInput = {handleTelNumber}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* File upload ---------------------------------------------------*/}
                                                <MuiUpload imgUpload={inputData.imgUpload} id="addmember-img-upload-input" onChange={handleUploadImg} />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ตามบัตรประชาชน" />
                                                <Divider variant="middle" style={{ margin: '0'}} />
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
                                                <MuiSelect label="จังหวัด" id="addmember-idcard-province-select" lists={['กรุงเทพมหานคร','นนทบุรี','นครปฐม']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="เขต / อำเภอ" id="addmember-idcard-district-select" lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={['แขวง/ตำบล1','แขวง/ตำบล1','แขวง/ตำบล1']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-tel-postcode-input" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.telNum} onInput = {handleTelNumber}  />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        
                            {/* Paper 3 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                    <Grid container spacing={2} className="paper-container">
                                        <Grid item xs={12} md={12}>
                                            <MuiLabelHeader label="ที่อยู่ที่ติดต่อได้" />
                                            <Divider variant="middle" style={{ margin: '0'}} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            {/* Field Radio Button ---------------------------------------------------*/}
                                            <MuiCheckbox label="ที่อยู่ตามบัตรประชาชน" id="addmember-contact-idcard-checkbox"  />
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
                                            <MuiSelect label="จังหวัด" id="addmember-contact-province-select" lists={['กรุงเทพมหานคร','นนทบุรี','นครปฐม']} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {/* Field Select ---------------------------------------------------*/}
                                            <MuiSelect label="เขต / อำเภอ" id="addmember-contact-district-select" lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {/* Field Select ---------------------------------------------------*/}
                                            <MuiSelect label="แขวง / ตำบล" id="addmember-contact-subdistrict-select" lists={['แขวง/ตำบล1','แขวง/ตำบล1','แขวง/ตำบล1']} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-contact-tel-postcode-input" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.telNum} onInput = {handleTelNumber}  />
                                        </Grid>
                                    </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        
                            {/* Paper 4 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            { <FormLandInfo /> }
                                            { [...Array(countAddLandInfo)].map((_, i) => <FormLandInfo key={i} />) }
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormLandInfo}/>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className="btn-row">
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={12} md={6}>
                                <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={postData}/>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default AddMemberPage;
