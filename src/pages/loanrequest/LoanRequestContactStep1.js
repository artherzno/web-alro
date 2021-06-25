import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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
    MuiRadioButton, 
    MuiTextNumber, 
    MuiDatePicker, 
    ButtonFluidPrimary, 
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

function LoanRequestContactStep1() {

    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
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
    })

    const [countAddActivityProject, setCountAddActivityProject] = useState(1);

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

    const handleChangeTypeId = (event) => {
        setInputData({...inputData,
            typeId: event.target.value
        })
        console.log('typeId ',event.target.value)
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
                        <MuiTextfield label={(num+1)+". โครงการรอง"} id="loanrequestcontact-step1-activityproject-name-input" defaultValue="" />
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

    return (
        <div className="loanrequestcontact-step-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>

                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="loanrequestcontact-step1-id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIdNumber}  />
                                            </Grid>
                                            <Grid item xs={12} md={12} className="loanrequestcontact-num-box">
                                                <p className="loanrequestcontact-num">P เลขที่คำขอ 10640037</p>
                                                <MuiRadioButton label="ประเภทเงินกู้" id="loanrequestcontact-step1-type-input" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} value={inputData.typeMember} onChange={handleChangeTypeMember} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" id="loanrequestcontact-step1-prefix-input" lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="loanrequestcontact-step1-name-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ" id="loanrequestcontact-step1-name-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" id="loanrequestcontact-step1-birthday-input" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiRadioButton label="วันหมดอายุบัตรประจำตัวประชาชน" id="loanrequestcontact-step1-typeid-input" lists={['ตลอดชีพ','มีวันหมดอายุ']} value={inputData.typeId} onChange={handleChangeTypeId} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="&nbsp;" id="loanrequestcontact-step1-expire-id-card-input" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="loanrequestcontact-step1-tel-number-input" defaultValue="" placeholder="ตัวอย่าง 0812345678" value={inputData.telNum} onInput = {handleTelNumber}  />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - ข้อ1  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                                            { [...Array(countAddActivityProject)].map((_, i) => <FormActivityProject key={i} num={i} />) }

                                            <Box component="div" className="box box-grey" m={1} textAlign="right">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <p className="loanrequestcontact-loan-amount">จำนวนเงินรวม <span className="txt-green">50,000 </span>บาท</p>
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormActivityProject}/>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 3 - ข้อ2  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 2</h1>
                                                 </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="จำนวนที่ดินสำหรับประกอบเกษตรกรรมในเขตปฏิรูปที่ดิน" id="loanrequestcontact-step1-no2-amountland-input" defaultValue="" endAdornment="ไร่"/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="พืชหลักที่ปลูก" id="loanrequestcontact-step1-no2-plant-input" defaultValue="" />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="ได้ผลผลิตเป็นรายได้ต่อปี ไร่ละ" id="loanrequestcontact-step1-no2-incomeperfield-input" defaultValue="" endAdornment="บาท"/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="รวมเป็นเงินทั้งสิ้นประมาณปีละ" id="loanrequestcontact-step1-no2-incomeperyear-input" defaultValue="" endAdornment="บาท"/>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 4 - ข้อ3  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 3</h1>
                                                 </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="ดอกเบี้ยเงินกู้ อัตราร้อยละ" id="loanrequestcontact-step1-no3-loanrate-input" defaultValue="" endAdornment="ต่อปี"/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="ระยะเวลาปลอดการชำระเงิน" />
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <Grid container>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiCheckbox label="เงินต้น" id="loanrequestcontact-step1-no3-cost-checkbox"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldEndAdornment label="" id="loanrequestcontact-step1-no3-costyear-input" defaultValue="" endAdornment="ปี" style={{ margin: '0' }}/>
                                                        </Grid> 
                                                    </Grid>
                                                    <Grid container>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiCheckbox label="ดอกเบี้ย" id="loanrequestcontact-step1-no3-increse-checkbox"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldEndAdornment label="" id="loanrequestcontact-step1-no3-increseyear-input" defaultValue="" endAdornment="ปี" style={{ margin: '0' }}/>
                                                        </Grid> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 5 - ข้อ4  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 4</h1>
                                                 </Grid>
                                                 <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="หลักประกันการกู้ยืมเงิน" />
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <RadioGroup value={inputData.typeGuarantee} onChange={handleChangeTypeGuarantee}>
                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="แบบรายบุคคล" />
                                                        <div style={ inputData.typeGuarantee === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            <div className="radio-group-content__flex">
                                                                <Grid item xs={12} md={11}>
                                                                    {/* Field Number ---------------------------------------------------*/}
                                                                    <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="loanrequestcontact-step1-no4-id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIdNumber}  />
                                                                </Grid>
                                                                <Grid item xs={12} md={1}>
                                                                    <MuiLabelHeaderCheckbox label="" />
                                                                    <IconButton type="submit" aria-label="search">
                                                                        <SearchIcon />
                                                                    </IconButton>
                                                                </Grid>
                                                            </div>
                                                            <div className="radio-group-content">
                                                                <Grid item xs={12} md={12}>
                                                                    <Box component="div" className="box box-grey result-list" m={1}>
                                                                        <h3>ผลการค้นหา</h3>
                                                                        <div className="loanrequestcontact-step1-no4 result-item">
                                                                            <p>ชื่อ : นายสุชาติ เจตจิรา</p>
                                                                            <p>หมายเลขบัตรประจำตัวประชาชน : 3 8517 13368 44 4</p>
                                                                        </div>
                                                                        <div className="box-button">
                                                                            <p className="txt-red">ไม่มีข้อมูลผู้ค้ำในข้อมูลสมาชิก</p>
                                                                            <ButtonNormalIconStartPrimary label="+ เพิ่มผู้ค้ำ" />
                                                                        </div>
                                                                    </Box>
                                                                </Grid>
                                                            </div>
                                                            <div className="radio-group-content">
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiLabelHeaderCheckbox label="ผู้ค้ำ" />
                                                                    <List className="lists">
                                                                        <ListItem className="list-item">
                                                                            <ListItemText
                                                                                primary="1.นายสุชาติ เจตจิรา (3 8517 13368 44 4)"
                                                                            />
                                                                            <ListItemSecondaryAction>
                                                                                <IconButton edge="end" aria-label="delete">
                                                                                    <CloseIcon  className="list-item-del"/>
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                        <Divider component="li" />
                                                                        <ListItem  className="list-item">
                                                                            <ListItemText
                                                                                primary="2.นายสุชาติ เจตจิรา (3 8517 13368 44 4)"
                                                                            />
                                                                            <ListItemSecondaryAction>
                                                                                <IconButton edge="end" aria-label="delete">
                                                                                    <CloseIcon className="list-item-del" />
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                        <Divider component="li" />
                                                                        <ListItem className="list-item">
                                                                            <ListItemText
                                                                                primary="3.นายสุชาติ เจตจิรา (3 8517 13368 44 4)"
                                                                            />
                                                                            <ListItemSecondaryAction>
                                                                                <IconButton edge="end" aria-label="delete">
                                                                                    <CloseIcon className="list-item-del" />
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                        <Divider component="li" />
                                                                    </List>
                                                                </Grid>
                                                            </div>
                                                        </div>
                                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="แบบอสังหาริมทรัพย์" />
                                                        <div style={ inputData.typeGuarantee === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <div className="radio-group-content">
                                                                <MuiTextfieldMultiLine label="" id="loanrequestcontact-step1-no4-realestate-textarea" defaultValue="" row="3" />
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 6 - ข้อ5  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 5</h1>
                                                 </Grid>
                                                 <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="เลขที่สัญญาเช่าซื้อที่ดินของ ส.ป.ก." />
                                                    <div className="dsp-f">
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" id="loanrequestcontact-step1-no5-forrentnumber1-input" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                            <span>/</span>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" id="loanrequestcontact-step1-no5-forrentnumber2-input" defaultValue="" />
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="มูลค่าที่ดิน" id="loanrequestcontact-step1-no5-landvalue-input" defaultValue="" endAdornment="บาท"/>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldEndAdornment label="มูลค่าที่ดินที่จ่ายให้แก่ส.ป.ก.แล้ว" id="loanrequestcontact-step1-no5-landvaluepay-input" defaultValue="" endAdornment="บาท"/>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 7 - ข้อ 6  -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">ข้อ 6</h1>
                                                 </Grid>
                                                 <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="ปัจจุบัน" />
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <RadioGroup value={inputData.typeDebt} onChange={handleChangeTypeDebt}>
                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="ปัจจุบัน" />
                                                        
                                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="มีหนี้สิน" />
                                                        <div style={ inputData.typeDebt === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <div className="radio-group-content">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Select ---------------------------------------------------*/}
                                                                        <MuiSelect label="โดยมีหนี้อยู่กับ" id="loanrequestcontact-step1-no6-bankdebt-select" lists={['ธ.ก.ส.','กองทุนหมู่บ้าน/กองทุนนโยบายรัฐ','หนี้สหกรณ์','หนี้นอกระบบ','อื่น ๆ โปรดระบุ']} />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfieldEndAdornment label="จำนวน" id="loanrequestcontact-step1-no6-bankdebtamount-input" defaultValue="" endAdornment="บาท"/>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>


                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactStep1
