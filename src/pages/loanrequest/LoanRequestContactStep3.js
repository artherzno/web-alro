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
    MuiTextfieldCurrency,
    MuiTextfieldEndAdornment,
    MuiCheckbox, 
    MuiSelect, 
    MuiSelectObj,
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
        typeSuitability: '0',
        approve: '1',

        ApplicantID: '', // 1,
        FarmerInPorJor: '', // "",
        LoanTime: '', // "",
        ApplicantDate: null, // "",
        Behave: '', // "",
        PayHistory: '', // "",
        Allasset: 0, // "",
        EstimateImcome: 0, // 0,
        Cost: 0, // 0,
        PayAbility: '', // "",
        Result: '0', // 0,
        Explain: '', // "",
        Guarantee1: '0', // "",
        Guarantee2: '0',
        ProjectRespond_nMEMID: '0', // 1,
        Approval: '', // 1,
        ProjectID: '', // 1,
        ProjectValue: 0, // 0,
        Condition: '', // "",
        Reason: '', // "",
        AprovalNo: '', // "",
        ApproveDate: null, // "",
        ApproveDetail: '', // ""
    })

    const [applicantProjectYear, setApplicantProjectYear] = useState(localStorage.getItem('applicantProjectYear'))
    
    const [directorList, setDirectorList] = useState([]);

    const [projectList, setProjectList] = useState([]);
    const [projectSubCodeText, setProjectSubCodeText] = useState('')
    const [projectSubNameText, setProjectSubNameText] = useState('')

    useEffect(() => {
        setLoaded(true);

        const getDirector = () => {

            axios.post(
                `${server_hostname}/admin/api/search_director_step3`, '', { headers: { "token": token } } 
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
                        console.log(data.data)
                        setDirectorList(data.data)
                    }
                }
            ).catch(err => { console.log(err); history.push('/') })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        }

        const getProject = () => {
            
            axios.post(
                `${server_hostname}/admin/api/search_project_step3`, {
                    "ProjectYear": applicantProjectYear || 2564
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
                        console.log(data.data)
                        setProjectList(data.data)
                    }
                }
            ).catch(err => { console.log(err); history.push('/') })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        }

        getDirector();
        getProject();
        
    }, [])

    // Radio Button
    const handleChangeTypeSuitability = (event) => {
        setInputData({...inputData,
            Result: event.target.value
        })
        console.log('Result ',event.target.value)
    };

    const handleChangeApprovel = (event) => {
        setInputData({...inputData,
            Approval: event.target.value
        })
        console.log('Approval ',event.target.value)
    }

    const handleChangeGuarantee = (event) => {
        let value = event.target.checked ? '1' : '0'
        setInputData({...inputData,
            [event.target.name]: value
        })
        console.log('Guarantee ',event.target.name, event.target.checked, value)
    }

    // End Radio Button
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
                if(projectList[i].ProjectCode === event.target.value) {
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

// Handle Submit ************************************
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        let Allasset_value = inputData.Allasset.toLocaleString('en-US', {minimumFractionDigits: 2})
        let EstimateImcome_value = inputData.EstimateImcome.toLocaleString('en-US', {minimumFractionDigits: 2})
        let Cost_value = inputData.Cost.toLocaleString('en-US', {minimumFractionDigits: 2})
        let ProjectValue_value = inputData.ProjectValue.toLocaleString('en-US', {minimumFractionDigits: 2})

        let addApplicantStep3 = document.getElementById('addApplicantStep3');
        let formData = new FormData(addApplicantStep3);
        formData.delete('typeRadio')
        formData.append('ApplicantID', inputData.ApplicantID || 1)
        formData.append('ApplicantDate', moment(inputData.ApplicantDate).format('YYYY-MM-DD') === 'Invalid date' ? null : inputData.ApplicantDate)
        formData.append('ApproveDate', moment(inputData.ApproveDate).format('YYYY-MM-DD') === 'Invalid date' ? null : inputData.ApproveDate)
        formData.set('Guarantee1',inputData.Guarantee1);
        formData.set('Guarantee2',inputData.Guarantee2);
        formData.set('Approval',inputData.Approval);
        formData.set('Allasset', parseFloat(Allasset_value.split(',').join('')))
        formData.set('EstimateImcome', parseFloat(EstimateImcome_value.split(',').join('')))
        formData.set('Cost', parseFloat(Cost_value.split(',').join('')))
        formData.set('ProjectValue', parseFloat(ProjectValue_value.split(',').join('')))

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
                        <form id="addApplicantStep3" className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Paper 1 - -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
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
                                                    <p className="paper-p">จำนวนเงิน</p>
                                                    <Grid container spaing={2}>
                                                        <Grid item xs={11} md={11}>
                                                            <MuiTextfieldCurrency label="" name="Allasset" value={inputData.Allasset}  onChange={handleInputData} /> 
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">&nbsp;&nbsp;บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="1.4 ประมาณการรายได้-รายจ่ายของผู้กู้เมื่อดำเนินกิจกรรม/โครงการ" />
                                                    <p className="paper-p">รายได้</p>
                                                    <Grid container spaing={2}>
                                                        <Grid item xs={11} md={11}>
                                                            <MuiTextfieldCurrency label="" name="EstimateImcome" value={inputData.EstimateImcome}  onChange={handleInputData} /> 
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">&nbsp;&nbsp;บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                    <p className="paper-p">รายจ่าย</p>
                                                    <Grid container spaing={2}>
                                                        <Grid item xs={11} md={11}>
                                                            <MuiTextfieldCurrency label="" name="Cost" value={inputData.Cost}  onChange={handleInputData} /> 
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="paper-p">&nbsp;&nbsp;บาท</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>        
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiLabelHeader label="1.5 ความสามารถในการชำระหนี้คืน" />
                                                    <MuiTextfieldMultiLine label="" name="PayAbility" value={inputData.PayAbility} row="3"  onChange={handleInputData}/>
                                                </Grid>
                                            </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">2. ผลการพิจารณา</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.1 ความเป็นไปได้และความเหมาะสมที่จะดำเนินกิจกรรม/โครงการ" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label=""  lists={['ไม่เหมาะสม','เหมาะสม']} value={inputData.Result} name="Result" onChange={handleChangeTypeSuitability} type="row" />
                                                <MuiTextfieldMultiLine label="คำชี้แจง" defaultValue="" row="3" value={inputData.Explain} name="Explain" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.2 หลักประกันการกู้ยืม" />
                                                <MuiCheckbox label="รายบุคคล" name="Guarantee1" value={inputData.Guarantee1} onChange={handleChangeGuarantee} />
                                                <MuiCheckbox label="อสังหาริมทรัพย์" name="Guarantee2" value={inputData.Guarantee2} onChange={handleChangeGuarantee} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="2.3 ผู้รับผิดชอบโครงการ" />
                                                <MuiSelectObj label="" itemName={'Name'} itemValue={'nMEMID'} lists={directorList} value={inputData.ProjectRespond_nMEMID} name={`ProjectRespond_nMEMID`} onChange={handleInputData} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Check Result from 2.1 */}
                                {
                                    inputData.Result === '0' ? 
                                    '' 
                                    :
                                    <React.Fragment>
                                        {/* Paper 3 - -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2} className="paper-container">
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">3. การอนุมัติ</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Radio Button ---------------------------------------------------*/}
                                                            <RadioGroup name="typeRadio" value={inputData.Approval} onChange={handleChangeApprovel}>
                                                                <FormControlLabel value="1" control={<Radio color="primary" />} label="เห็นควรอนุมัติเงินกู้" />
                                                                <div style={ inputData.Approval === '1' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                                    <div className="radio-group-content__flex">
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={3}>
                                                                                <MuiSelectObj label="โครงการ" id={`ProjectCode`} itemName={'ProjectCode'} itemValue={'ProjectCode'} lists={projectList} value={inputData.ProjectID} name={`ProjectID`} onChange={handleInputData} />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={4}>
                                                                                {/* Field Text ---------------------------------------------------*/}
                                                                                <MuiTextfield disabled label="รหัสโครงการรอง" value={projectSubCodeText} />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                {/* Field Text ---------------------------------------------------*/}
                                                                                <MuiTextfield disabled label="ชื่อโครงการรอง" value={projectSubNameText} />
                                                                            </Grid>
                                                                            <Grid item xs={11} md={11}>
                                                                                <p className="paper-p">จำนวน</p>
                                                                                <MuiTextfieldCurrency label="" name="ProjectValue" value={inputData.ProjectValue}  onChange={handleInputData} /> 
                                                                            </Grid>
                                                                            <Grid item xs={1} md={1}>
                                                                                <p className="paper-p">&nbsp;</p>
                                                                                <p className="paper-p">บาท</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldMultiLine label="เงื่อนไข" name="Condition" value={inputData.Condition} row="3"  onChange={handleInputData}/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </div>
                                                                <FormControlLabel value="0" control={<Radio color="primary" />} label="ไม่สมควรอนุมัติ" />
                                                                <div style={ inputData.Approval === '0' ? {opacity: '1'} : {opacity: '0.5', pointerEvents: 'none'} }>
                                                                    {/* Field Text ---------------------------------------------------*/}
                                                                    <div className="radio-group-content">
                                                                        <MuiTextfieldMultiLine label="เหตุผล" name="Reason" value={inputData.Reason} row="3"  onChange={handleInputData}/>
                                                                    </div>
                                                                </div>
                                                            </RadioGroup>
                                                        </Grid>

                                                        {/* <Grid item xs={12} md={12}>
                                                            <ButtonFluidPrimary label="บันทึกข้อมูล" />
                                                        </Grid> */}
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>

                                        {/* Paper 4 - -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2} className="paper-container">
                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">4. คำสั่งของผู้มีอำนาจอนุมัติ</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="เลขที่" name="AprovalNo" value={inputData.AprovalNo} onChange={handleInputData}/>        
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiDatePicker label="ลงวันที่" name="ApproveDate" value={inputData.ApproveDate} onChange={(newValue)=>{ setInputData({ ...inputData, ApproveDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfieldMultiLine label="รายละเอียดการอนุมัติ" name="ApproveDetail" value={inputData.ApproveDetail} onChange={handleInputData} row="3" />
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>

                                    </React.Fragment>
                                }
                                <Grid item xs={12} md={12}>
                                    <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                </Grid>
                            </Grid>
                        </form>
                    </Container>


                    <Container maxWidth="lg" style={{display: 'none'}}>
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
