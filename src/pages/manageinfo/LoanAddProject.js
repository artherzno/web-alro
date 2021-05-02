import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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
    buttonOutlineGrey: themeGlobal.buttonOutlineGrey,
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

function LoanAddProject() {
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

    useEffect(() => {
        setLoaded(true);
    }, [])

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
        history.push('/loanrequestproject');
    }

    const cancelData = () => {
        history.push('/loanrequestproject');
    }
    
    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="md">
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.headerTop}> 
                                <h1 className={classes.h1}>เพิ่มโครงการขอกู้เงิน</h1>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper+' line-top-green paper'}>
                                <Grid item xs={12}>
                                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-projectcode-input">
                                                    รหัสโครงการ
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-projectcode-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-projectname-input">
                                                    ชื่อโครงการ
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-projectname-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-projectplanyear-input">
                                                    แผนปี
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-projectplanyear-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-province-select">
                                                    จังหวัด
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-province-select"
                                                        id="loanadd-province-select"
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

                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-projectmaincode1-select">
                                                    รหัสโครงการหลัก
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-projectmaincode1-select"
                                                        id="loanadd-projectmaincode1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-projectcode2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-projectcode2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-projectmainname-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-projectmainname-input" />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-subprojectmaincode1-select">
                                                    รหัสโครงการรอง
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-subprojectmaincode1-select"
                                                        id="loanadd-subprojectmaincode1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-subprojectcode2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-subprojectcode2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-subprojectmainname-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-subprojectmainname-input" />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-loantypecode1-select">
                                                    ประเภทกู้ยืม
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-loantypecode1-select"
                                                        id="loanadd-loantypecode1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loantypecode2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loantypecode2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loantypename-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loantypename-input" />
                                                </FormControl>
                                            </Grid>
                                            
                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-loanperiodcode1-select">
                                                    ระยะเวลากู้ยืม
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-loanperiodcode1-select"
                                                        id="loanadd-loanperiodcode1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanperiodcode2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanperiodcode2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanperiodname-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanperiodname-input" />
                                                </FormControl>
                                            </Grid>
                                                                                        
                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-loanobjid1-select">
                                                    วัตถุประสงค์การกู้ยืม
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-loanobjid1-select"
                                                        id="loanadd-loanobjid1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanobjid2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanobjid2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanobjname-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanobjname-input" />
                                                </FormControl>
                                            </Grid>
                                                                                       
                                            <Grid item xs={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="loanadd-loanfarmertypeid1-select">
                                                    ประเภทผู้กู้
                                                    </InputLabel>
                                                    <Select
                                                        labelId="loanadd-loanfarmertypeid1-select"
                                                        id="loanadd-loanfarmertypeid1-select"
                                                        // value={age}
                                                        // onChange={handleChange}
                                                        input={<BootstrapInput />}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>00001</MenuItem>
                                                        <MenuItem value={2}>00002</MenuItem>
                                                        <MenuItem value={3}>00003</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanfarmertypeid2-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanfarmertypeid2-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="loanadd-loanfarmertypename-input">
                                                    &nbsp;
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="loanadd-loanfarmertypename-input" />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid container spacing={2} className={classes.buttonRow+' footer-button'}>
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={6}>
                                <Button className={classes.buttonFluidOutlinePrimary} variant="contained" color="" size="large" onClick={()=>cancelData()}>ยกเลิก</Button>    
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

export default LoanAddProject
