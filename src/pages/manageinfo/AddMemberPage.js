import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

// import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
// import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

const useStyles = makeStyles((themeGlobal) => ({
    root: {
      flexGrow: 1,
    },
    iconGreen: themeGlobal.iconGreen,
    iconRoot: themeGlobal.iconRoot,
    paper: themeGlobal.paper,
    headerTop: themeGlobal.headerTop,
    headerResult: themeGlobal.headerResult,
    h1: themeGlobal.h1,
    h2: themeGlobal.h2,
    textbox: themeGlobal.textbox,
    buttonNormal: themeGlobal.buttonNormal,
    buttonFluid: themeGlobal.buttonFluid,
    buttonFluidOutlinePrimary: themeGlobal.buttonFluidOutlinePrimary,
    buttonOutlinePrimary: themeGlobal.buttonOutlinePrimary,
    label: themeGlobal.boostrapInputLabel,
    labelHeader: themeGlobal.boostrapInputLabelHeader,
    tableNoResult: themeGlobal.tableNoResult, 
    inputfile: themeGlobal.inputfile,
    boxDashed: themeGlobal.boxDashed,
    buttonRow: themeGlobal.buttonRow,
  }));

const BootstrapInput = withStyles((themeGlobal) => ({
    root: themeGlobal.boostrapRoot,
    input: themeGlobal.boostrapInput,
}))(InputBase);

function AddMemberPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeMember: '1',
        prefix: undefined,
        name: undefined,
        surname: undefined,
        idNum: undefined,
        telNum: undefined,
        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, [])

    // Radio Button

    const BlueRadio = withStyles({
        root: {
          color: '#bfbfbf',
          '&$checked': {
            color: '#2284d0',
          },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const handleChangeTypeMember = (event) => {
        setInputData({...inputData,
            typeMember: event.target.value
        })
        console.log(event.target.value)
    };
    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            idNum: event.target.value
        })
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
        history.push('/searchmember');
    }

    const FormLandInfo = (i) => {
        return (
                <Grid container spacing={3} className="paper-container">
                    <Grid item xs={12}>
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.labelHeader}  shrink htmlFor="addmember-type-input">
                            ที่ตั้งที่ดิน
                            </InputLabel>&nbsp;
                        </FormControl>
                        <Divider variant="middle" style={{ margin: '0'}} />
                    </Grid>
                    <Grid item xs={12}>
                        {/* Field Radio Button ---------------------------------------------------*/}
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                <Checkbox
                                defaultChecked
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                                }
                                label="Alro Land"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-addr1-input">
                            หมู่ที่
                            </InputLabel>
                            <BootstrapInput defaultValue="" id="addmember-landinfo-addr1-input" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Field Select ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label} shrink htmlFor="addmember-landinfo-province-select">
                            จังหวัด
                            </InputLabel>
                            <Select
                                labelId="addmember-landinfo-province-select"
                                id="addmember-landinfo-province-select"
                                // value={age}
                                // onChange={handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                <MenuItem value={2}>นนทบุรี</MenuItem>
                                <MenuItem value={3}>นครปฐม</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Field Select ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label} shrink htmlFor="addmember-landinfo-district-select">
                            เขต / อำเภอ
                            </InputLabel>
                            <Select
                                labelId="addmember-landinfo-district-select"
                                id="addmember-landinfo-district-select"
                                // value={age}
                                // onChange={handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                <MenuItem value={2}>นนทบุรี</MenuItem>
                                <MenuItem value={3}>นครปฐม</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        {/* Field Select ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label} shrink htmlFor="addmember-landinfo-subdistrict-select">
                            แขวง / ตำบล
                            </InputLabel>
                            <Select
                                labelId="addmember-landinfo-subdistrict-select"
                                id="addmember-landinfo-subdistrict-select"
                                // value={age}
                                // onChange={handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                <MenuItem value={2}>นนทบุรี</MenuItem>
                                <MenuItem value={3}>นครปฐม</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {/* Field Select ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label} shrink htmlFor="addmember-landinfo-typebook-input">
                            ประเภทหนังสือสำคัญ
                            </InputLabel>
                            <Select
                                labelId="addmember-landinfo-typebook-input"
                                id="addmember-landinfo-typebook-input"
                                // value={age}
                                // onChange={handleChange}
                                input={<BootstrapInput />}
                            >
                                <MenuItem value={1}>ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ</MenuItem>
                                <MenuItem value={2}>ส.ป.ก. 4-01</MenuItem>
                                <MenuItem value={3}>โฉนด</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-number-input">
                            เลขที่
                            </InputLabel>
                            <BootstrapInput defaultValue="" id="addmember-landinfo-number-input" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-group-input">
                            กลุ่ม
                            </InputLabel>
                            <BootstrapInput defaultValue="" id="addmember-landinfo-group-input" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-field1-input">
                            แปลง
                            </InputLabel>
                            <BootstrapInput defaultValue="" id="addmember-landinfo-field1-input" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-field2-input">
                            แปลง
                            </InputLabel>
                            <BootstrapInput defaultValue="" endAdornment={<InputAdornment position="end">ไร่</InputAdornment>} id="addmember-landinfo-field2-input" /> 
                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-field3-input">
                            &nbsp;
                            </InputLabel>
                            <BootstrapInput defaultValue="" endAdornment={<InputAdornment position="end">งาน</InputAdornment>} id="addmember-landinfo-field3-input" /> 
                            
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {/* Field Text ---------------------------------------------------*/}
                        <FormControl className={classes.textbox}>
                            <InputLabel className={classes.label}  shrink htmlFor="addmember-landinfo-field4-input">
                            &nbsp;
                            </InputLabel>
                            <BootstrapInput defaultValue="" endAdornment={<InputAdornment position="end">วา</InputAdornment>} id="addmember-landinfo-field4-input" /> 
                            
                        </FormControl>
                    </Grid>
                </Grid>
        );
    }

    return (
        <div className="search-page">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            { classes.colorGreen }
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.headerTop}> 
                                <h1 className={classes.h1}>ข้อมูลสมาชิก</h1>
                            </Grid>

                            {/* Paper 1 -------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper+' line-top-green paper'}>
                                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                {/* Field Radio Button ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-type-input">
                                                    ประเภทสมาชิก
                                                    </InputLabel>&nbsp;
                                                    <RadioGroup row aria-label="addmember-type-input" name="addmember-type-input" value={inputData.typeMember} onChange={handleChangeTypeMember}>
                                                        <FormControlLabel value="1" control={<BlueRadio />} label="รายบุคคล" />
                                                        <FormControlLabel value="2" control={<BlueRadio />} label="สถาบัน" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-prefix-input">
                                                    คำนำหน้า
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-prefix-input"
                                                        id="addmember-prefix-input"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>นาย</MenuItem>
                                                        <MenuItem value={2}>นาง</MenuItem>
                                                        <MenuItem value={3}>นางสาว</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-name-input">
                                                    ชื่อ
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-surname-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-surname-input">
                                                    นามสกุล
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-surname-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-id-number-input">
                                                    หมายเลขประจำตัว 13 หลัก
                                                    </InputLabel>
                                                    <BootstrapInput type="number" placeholder="ตัวอย่าง 3 8517 13368 44 4" id="addmember-id-number-input" value={inputData.idNum} onInput = {handleIdNumber} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>

                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-birthday-input">
                                                    วัน เดือน ปี เกิด
                                                    </InputLabel>
                                                    <BootstrapInput type="date" defaultValue="2017-05-24" id="addmember-birthday-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-expire-id-card-input">
                                                    วันหมดอายุบัตรประจำตัวประชาชน
                                                    </InputLabel>
                                                    <BootstrapInput type="date" defaultValue="2017-05-24" id="addmember-expire-id-card-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-tel-number-input">
                                                    เบอร์โทรศัพท์
                                                    </InputLabel>
                                                    <BootstrapInput type="number" placeholder="ตัวอย่าง 0812345678" id="addmember-tel-number-input" value={inputData.telNum} onInput = {handleTelNumber} />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* File upload ---------------------------------------------------*/}
                                                <FormControl className={classes.boxDashed}>
                                                    {inputData.imgUpload.map((item,i)=>
                                                    <List>
                                                        <ListItem key={i}>
                                                            <ListItemIcon>
                                                                <AttachFileIcon  class={classes.iconGreen}/>
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={item}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge="end" aria-label="delete">
                                                                    <RemoveCircleOutlineIcon color="secondary"  />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    </List>
                                                    )}
                                                    <input
                                                        accept="image/*"
                                                        className={classes.inputfile}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                        onChange={handleUploadImg}
                                                    />
                                                    <label htmlFor="contained-button-file">
                                                        <Button variant="contained" className={classes.buttonOutlinePrimary} component="span">
                                                        เลือกไฟล์
                                                        </Button>
                                                    </label>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 -------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper+' line-top-green paper'}>
                                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.labelHeader}  shrink htmlFor="addmember-type-input">
                                                    ที่อยู่ตามบัตรประชาชน
                                                    </InputLabel>&nbsp;
                                                </FormControl>
                                                <Divider variant="middle" style={{ margin: '0'}} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-idcard-addr1-input">
                                                    บ้านเลขที่
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-idcard-addr1-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-idcard-addr2-input">
                                                    หมู่ที่
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-idcard-addr2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-idcard-addr3-input">
                                                    ซอย / ถนน
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-idcard-addr3-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-idcard-province-select">
                                                    จังหวัด
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-idcard-province-select"
                                                        id="addmember-idcard-province-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-idcard-district-select">
                                                    เขต / อำเภอ
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-idcard-district-select"
                                                        id="addmember-idcard-district-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-idcard-subdistrict-select">
                                                    แขวง / ตำบล
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-idcard-subdistrict-select"
                                                        id="addmember-idcard-subdistrict-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-idcard-postcode-input">
                                                    รหัสไปรษณีย์
                                                    </InputLabel>
                                                    <BootstrapInput type="number" defaultValue="" id="addmember-idcard-postcode-input" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        
                            {/* Paper 3 -------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper+' line-top-green paper'}>
                                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.labelHeader}  shrink htmlFor="addmember-type-input">
                                                    ที่อยู่ที่ติดต่อได้
                                                    </InputLabel>&nbsp;
                                                </FormControl>
                                                <Divider variant="middle" style={{ margin: '0'}} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Radio Button ---------------------------------------------------*/}
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={
                                                        <Checkbox
                                                        defaultChecked
                                                            // checked={state.checkedB}
                                                            // onChange={handleChange}
                                                            name="checkedB"
                                                            color="primary"
                                                        />
                                                        }
                                                        label="ที่อยู่ตามบัตรประชาชน"
                                                    />
                                                </FormGroup>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-contact-addr1-input">
                                                    บ้านเลขที่
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-contact-addr1-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-contact-addr2-input">
                                                    หมู่ที่
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-contact-addr2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-contact-addr3-input">
                                                    ซอย / ถนน
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="addmember-contact-addr3-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-contact-province-select">
                                                    จังหวัด
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-contact-province-select"
                                                        id="addmember-contact-province-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-contact-district-select">
                                                    เขต / อำเภอ
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-contact-district-select"
                                                        id="addmember-contact-district-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="addmember-contact-subdistrict-select">
                                                    แขวง / ตำบล
                                                    </InputLabel>
                                                    <Select
                                                        labelId="addmember-contact-subdistrict-select"
                                                        id="addmember-contact-subdistrict-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>กรุงเทพมหานคร</MenuItem>
                                                        <MenuItem value={2}>นนทบุรี</MenuItem>
                                                        <MenuItem value={3}>นครปฐม</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="addmember-contact-postcode-input">
                                                    รหัสไปรษณีย์
                                                    </InputLabel>
                                                    <BootstrapInput type="number" defaultValue="" id="addmember-contact-postcode-input" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        
                            {/* Paper 4 -------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Paper className={classes.paper+' line-top-green paper'}>
                                    <Grid item xs={12}>
                                        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            { <FormLandInfo /> }
                                            { [...Array(countAddLandInfo)].map((_, i) => <FormLandInfo key={i} />) }
                                            <Grid item xs={12}>
                                                <Button className={classes.buttonFluid} variant="contained" color="primary" size="large" onClick={() => setCountAddLandInfo(countAddLandInfo + 1)}>เพิ่มข้อมูล</Button>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className={classes.buttonRow}>
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={6}>
                                <Button className={classes.buttonFluidOutlinePrimary} variant="contained" color="" size="large">ยกเลิก</Button>    
                            </Grid>

                            <Grid item xs={6}>
                                <Button className={classes.buttonFluid} variant="contained" color="primary" size="large" onClick={()=>postData()}>บันทึกข้อมูล</Button>    
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default AddMemberPage;
