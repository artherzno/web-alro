import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';
// import { makeStyles } from '@material-ui/styles';

import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


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
    ButtonFluidOutlineSecondary,
} from '../../components/MUIinputs';

function LoanRequestContactStep3(props) {
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
        typeMember: '1',
        typeSuitability: '1',
        approve: '1',

        ApplicantID: '', // 1,
        FarmerInPorJor: '', // "",
        LoanTime: '', // "",
        ApplicantDate: null, // "",
        Behave: '', // "",
        PayHistory: '', // "",
        Allasset: '', // "",
        EstimateImcome: '', // 0,
        Cost: '', // 0,
        PayAbility: '', // "",
        Result: '', // 0,
        Explain: '', // "",
        Guarantee: '', // "",
        ProjectRespond_nMEMID: '', // 1,
        Approval: '', // 1,
        ProjectID: '', // 1,
        ProjectValue: '', // 0,
        Condition: '', // "",
        Reason: '', // "",
        AprovalNo: '', // "",
        ApproveDate: null, // "",
        ApproveDetail: '', // ""
    })


    useEffect(() => {
        setLoaded(true);
    }, [])

    // Radio Button
    const handleChangeTypeSuitability = (event) => {
        setInputData({...inputData,
            typeSuitability: event.target.value
        })
        console.log('typeSuitability ',event.target.value)
    };

    const handleChangeApprove = (event) => {
        setInputData({...inputData,
            approve: event.target.value
        })
        console.log('approve ',event.target.value)
    }

    // End Radio Button
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

// Handle Submit ************************************
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        let addApplicantStep2 = document.getElementById('addApplicantStep2');
        let formData = new FormData(addApplicantStep2);
        formData.append('ApplicantID', inputData.ApplicantID || 1)

        axios.post(
            `${server_hostname}/admin/api/add_applicant_step3`, formData, { headers: { "token": token } } 
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

    const tableResult = [
        { a: '1', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '2', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '3', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '4', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '5', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '6', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '7', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '8', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '9', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '10', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '11', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
        { a: '12', b: '11 ก.พ. 2564', c: '10,000.00', d: '100.00', e: '10,100.00' },
    ]

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);

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
                        <Grid container spacing={2}>

                            {/* Paper 1 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">1. ความเหมาะสมของผู้กู้</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiLabelHeader label="1.1 เป็นเกษตรกรที่ได้รับการคัดเลือกให้เข้าทำประโยชน์ในเขตปฏิรูปที่ดิน ตามมติคปจ." />
                                                <MuiTextfield label="" name="FarmerInPorJor" value={inputData.FarmerInPorJor}  onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={7} className="dsp-f">
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="ครั้งที่" name="LoanTime" value={inputData.LoanTime}  onChange={handleInputData}  />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="&nbsp;" id="loanrequestcontact-step1-no3-no1-farmeraward2-input" defaultValue="" />
                                                    </Grid> */}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" name="ApplicantDate"  value={inputData.ApplicantDate} onChange={(newValue)=>{ setInputData({ ...inputData, ApplicantDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="และเป็นผู้มีความประพฤติ" defaultValue="" row="3" name="Behave" value={inputData.Behave}  onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="1.2 ประวัติการชำระหนี้ที่ผ่านมา" />
                                                <MuiTextfieldMultiLine label="" defaultValue="" row="3" name="PayHistory" value={inputData.PayHistory}  onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="1.3 ทรัพย์สินทั้งหมดก่อนทำกิจกรรม/โครงการ" />
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfieldEndAdornment label="จำนวนเงิน" id="loanrequestcontact-step3-no1-assetbefore-input" defaultValue="" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="1.4 ประมาณการรายได้-รายจ่ายของผู้กู้เมื่อดำเนินกิจกรรม/โครงการ" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfieldEndAdornment label="รายได้" id="loanrequestcontact-step1-no5-estimate1-input" defaultValue="" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldEndAdornment label="รายจ่าย" id="loanrequestcontact-step1-no5-estimate2-input" defaultValue="" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiLabelHeader label="1.5 ความสามารถในการชำระหนี้คืน" />
                                                <MuiTextfieldMultiLine label="" id="loanrequestcontact-step3-no1-paydebt-textarea" defaultValue="" row="3" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">2. ผลการพิจารณา</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.1 ความเป็นไปได้และความเหมาะสมที่จะดำเนินกิจกรรม/โครงการ" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiRadioButton label="" id="loanrequestcontact-step3-no2-typeSuitability-input" lists={['เหมาะสม','ไม่เหมาะสม']} value={inputData.typeSuitability} onChange={handleChangeTypeSuitability} type="row" />
                                                <MuiTextfieldMultiLine label="คำชี้แจง" id="loanrequestcontact-step3-no2-typeSuitability-textarea" defaultValue="" row="3" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.2 หลักประกันการกู้ยืม" />
                                                {/* Field Checkbox Button ---------------------------------------------------*/}
                                                <MuiCheckbox label="รายบุคคล" id="loanrequestcontact-step3-loanguarantee1-checkbox" />
                                                {/* Field Checkbox Button ---------------------------------------------------*/}
                                                <MuiCheckbox label="อสังหาริมทรัพย์" id="loanrequestcontact-step3-loanguarantee2-checkbox" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.3 ผู้รับผิดชอบโครงการ" />
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="" id="loanrequestcontact-step3-no2-projectmanager-input" lists={['นายสมชาย มากมี (ตำแหน่ง ....)1','นายสมชาย มากมี (ตำแหน่ง ....)2','นายสมชาย มากมี (ตำแหน่ง ....)3']} />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 3 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">3. การอนุมัติ</h1>
                                                 </Grid>
                                                 <Grid item xs={12} md={12}>
                                                    <MuiLabelHeaderCheckbox label="หลักประกันการกู้ยืมเงิน" />
                                                    {/* Field Radio Button ---------------------------------------------------*/}
                                                    <RadioGroup value={inputData.approve} onChange={handleChangeApprove}>
                                                        <FormControlLabel value="1" control={<Radio color="primary" />} label="เห็นควรอนุมัติเงินกู้" />
                                                        <div style={ inputData.approve === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            <div className="radio-group-content__flex">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={3}>
                                                                        {/* Field Select ---------------------------------------------------*/}
                                                                        <MuiSelect label="โครงการ" id="loanrequestcontact-step3-no3-projectcode-input" lists={['00001','00002','00003']} />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfield label="รหัสโครงการรอง" id="loanrequestcontact-step3-no3-subprojectcode-input" defaultValue="" />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={5}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfield label="ชื่อโครงการรอง" id="loanrequestcontact-step3-no3-subprojectname-input" defaultValue="" />
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfieldEndAdornment label="จำนวน" id="loanrequestcontact-step1-no2-subprojectamount-input" defaultValue="" endAdornment="บาท"/>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <MuiTextfieldMultiLine label="เงื่อนไข" id="loanrequestcontact-step3-no3-disapprovenotice-textarea" defaultValue="" row="3" />
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </div>
                                                        <FormControlLabel value="2" control={<Radio color="primary" />} label="ไม่สมควรอนุมัติ" />
                                                        <div style={ inputData.approve === '2' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <div className="radio-group-content">
                                                                <MuiTextfieldMultiLine label="เหตุผล" id="loanrequestcontact-step3-no3-disapprovenotice-textarea" defaultValue="" row="3" />
                                                            </div>
                                                        </div>
                                                    </RadioGroup>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <ButtonFluidPrimary label="บันทึกข้อมูล" />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>

                            {/* Paper 4 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                        <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <h1 className="paper-head-green">4. คำสั่งของผู้มีอำนาจอนุมัติ</h1>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="เลขที่" id="loanrequestcontact-step3-no4-number-input" defaultValue="" />        
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Date Picker ---------------------------------------------------*/}
                                                    <MuiDatePicker label="ลงวันที่" id="loanrequestcontact-step3-no4-date-input" defaultValue="2017-05-24" />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfieldMultiLine label="รายละเอียดการอนุมัติ" id="loanrequestcontact-step3-no4-detail-textarea" defaultValue="" row="3" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <ButtonFluidPrimary label="บันทึกข้อมูล" />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Paper>
                            </Grid>


                        </Grid>
                    </Container>


                    <Container maxWidth="lg">
                        <div className="table">
                            <h1>ประวัติการชำระเงินคืน</h1>
                            <TableContainer className="table-box">
                                <Table aria-label="normal table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="center">งวดที่</TableCell>
                                        <TableCell align="center">กำหนดชำระภายในวันที่</TableCell>
                                        <TableCell align="center">ชำระเงินต้น(บาท)</TableCell>
                                        <TableCell align="center">ชำระดอกเบี้ย(บาท)</TableCell>
                                        <TableCell align="center">ต้นเงินคงเหลือ(บาท)</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={5} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                    {/* {
                                        tableResult.map((row,i) => (
                                            <TableRow key={i}>
                                            <TableCell align="center">{row.a}</TableCell>
                                            <TableCell align="center">{row.b}</TableCell>
                                            <TableCell align="center">{row.c}</TableCell>
                                            <TableCell align="center">{row.d}</TableCell>
                                            <TableCell align="center">{row.e}</TableCell>
                                            </TableRow>
                                        ))
                                    } */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
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
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={ props.handleComplete} color="primary" style={{justifyContent: 'center'}} />
                                
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
                            <ButtonFluidOutlineSecondary label="test" maxWidth="100px"  onClick={ props.handleComplete} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default LoanRequestContactStep3
