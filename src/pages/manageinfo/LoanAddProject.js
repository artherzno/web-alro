import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiSelect, 
    MuiSelectObjYear,
    MuiSelectObj,
    MuiTextfieldCurrency,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

function LoanAddProject() {
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
        ProjectName: '', // "123",
        ProjectPlanYear: 0, // "64",
        ProjectMainCode: 0, // "1",
        ProjectMainName: 0, // "2",
        ProjectSubCode: 0, // "3",
        ProjectSubName: 0, // "4",
        ProjectBudget: 0,
        LoanTypeCode: 0, // "5",
        LoanTypeName: 0, // "6",
        LoanPeriodCode: 0, // "7",
        LoanPeriodName: 0, // "8",
        LoanobjCode: 0, // "9",
        LoanObjName: 0, // "10",
        LoanFarmerTypeCode: 0, // "11",
        LoanFarmerTypeName: 0, // "12"
        ProvinceName: 0,
    })

    const [spkLoanFarmerType, setSpkLoanFarmerType] = useState([])
    const [spkLoanObj, setSpkLoanObj] = useState([])
    const [spkLoanPeriod,setSpkLoanPeriod] = useState([])
    const [spkLoanType,setSpkLoanType] = useState([])
    const [spkSubProject,setSpkSubProject] = useState([])
    const [spkMainProject,setSpkMainProject] = useState([])
    const [provinceList, setProvinceList] = useState([])

    const [projectMainCodeText, setProjectMainCodeText] = useState('')
    const [projectMainNameText, setProjectMainNameText] = useState('')
    const [projectSubCodeText, setProjectSubCodeText] = useState('')
    const [projectSubNameText, setProjectSubNameText] = useState('')
    const [loanTypeCodeText, setLoanTypeCodeText] = useState('')
    const [loanTypeNameText, setLoanTypeNameText] = useState('')
    const [loanPeriodCodeText, setLoanPeriodCodeText] = useState('')
    const [loanPeriodNameText, setLoanPeriodNameText] = useState('')
    const [loanObjCodeText, setLoanObjCodeText] = useState('')
    const [loanObjNameText, setLoanObjNameText] = useState('')
    const [loanFarmerTypeCodeText, setLoanFarmerTypeCodeText] = useState('')
    const [loanFarmerTypeNameText, setLoanFarmerTypeNameText] = useState('')

    let provincename = localStorage.getItem('provincename');

    useEffect(() => {
        setLoaded(true);

        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceList(dataProvinceList[0])

        const getSpkLoanFarmerType = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkloanfarmertype`, '', { headers: { "token": token } } 
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
                        setSpkLoanFarmerType(res.data.data)
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        const getSpkLoanObj = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkloanobj`, '', { headers: { "token": token } } 
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
                        setSpkLoanObj(res.data.data)
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        const getSpkLoanPeriod = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkloanperiod`, '', { headers: { "token": token } } 
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
                        setSpkLoanPeriod(res.data.data)
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        const getSpkLoanType = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkloantype`, '', { headers: { "token": token } } 
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
                        setSpkLoanType(res.data.data)
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        const getSpkSubProject = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spksubproject`, '', { headers: { "token": token } } 
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
                        setSpkSubProject(res.data.data)
                    }
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        const getSpkMainProject = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkmainproject`, '', { headers: { "token": token } } 
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
                        setSpkMainProject(res.data.data)
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
                        getSpkLoanFarmerType();
                        getSpkLoanObj();
                        getSpkLoanPeriod();
                        getSpkLoanType();
                        getSpkMainProject();
                        getSpkSubProject();
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

    // Input Text field 
    const handleInputData = (event) => {
        console.log('event.target.name',event.target.name)
        // console.log('event.target.value',event.target.value)
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        if(event.target.name === 'ProjectMainCode') {
            let i = parseInt(event.target.value) - 1;
                setProjectMainNameText((i<0) ? '' : spkMainProject[i].ProjectMainName)
                setProjectMainCodeText((i<0) ? '' : spkMainProject[i].ProjectMainCode)
        } else if(event.target.name === 'ProjectSubCode') {
            let i = parseInt(event.target.value) - 1;
            setProjectSubNameText((i<0) ? '' : spkSubProject[i].ProjectSubName || '0')
            setProjectSubCodeText((i<0) ? '' : spkSubProject[i].ProjectSubCode || '0')
        } else if(event.target.name === 'LoanTypeCode') {
            let i = parseInt(event.target.value) - 1;
            setLoanTypeNameText((i<0) ? '' : spkLoanType[i].LoanTypeName || '0')
            setLoanTypeCodeText((i<0) ? '' : spkLoanType[i].LoanTypeCode || '0')
        } else if(event.target.name === 'LoanPeriodCode') {
            event.target.value = (event.target.value === 'ส') ? 1: (event.target.value === 'ก') ? 2 : 3;
            let i = parseInt(event.target.value) - 1;
            setLoanPeriodNameText((i<0) ? '' : spkLoanPeriod[i].LoanPeriodName || '0')
            setLoanPeriodCodeText((i<0) ? '' : spkLoanPeriod[i].LoanPeriodCode || '0')
        } else if(event.target.name === 'LoanobjCode') {
            let i = parseInt(event.target.value) - 1;
            setLoanObjNameText((i<0) ? '' : spkLoanObj[i].LoanobjName || '0')
            setLoanObjCodeText((i<0) ? '' : spkLoanObj[i].LoanobjCode || '0')
        } else if(event.target.name === 'LoanFarmerTypeCode') {
            let i = parseInt(event.target.value) - 1;
            setLoanFarmerTypeNameText((i<0) ? '' : spkLoanFarmerType[i].LoanFarmerTypeName || '0')
            setLoanFarmerTypeCodeText((i<0) ? '' : spkLoanFarmerType[i].LoanFarmerTypeCode || '0')
        }
        
        console.log('name', event.target.name, 'value',event.target.value)
        // let i = parseInt(event.target.value) - 1;
        // console.log(spkMainProject)
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        let setProjectBudget = inputData.ProjectBudget === null ? '0' : inputData.ProjectBudget.toLocaleString('en-US', {minimumFractionDigits: 2})

        let addProject = document.getElementById('addProject');
        let formData = new FormData(addProject);
        formData.set('ProjectBudget',parseFloat(setProjectBudget.split(',').join('')) || 0)

        axios.post(
            `${server_hostname}/admin/api/add_spkproject`, formData, { headers: { "token": token } } 
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
                }else {
                    // history.push('/manageinfo/searchmember')
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
        history.push('/manageinfo/loanrequestproject');
    }

    const cancelData = () => {
        history.push('/manageinfo/loanrequestproject');
    }

    const handleGotoSearch = () => {
        setSuccess(false);
        history.push('/manageinfo/loanrequestproject');

    };

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
                    <Container maxWidth="md">
                        <form id="addProject" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page"> 
                                    <h1>เพิ่มโครงการขอกู้เงิน</h1>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="รหัสโครงการชื่อ" id="loanadd-projectcode-input" defaultValue="" />
                                                </Grid> */}
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="ชื่อโครงการ" name="ProjectName" value={inputData.ProjectName} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiSelectObjYear label="แผนปี" valueYaer={10} name="ProjectPlanYear" value={inputData.ProjectPlanYear} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield disabled label="จังหวัด" value={provincename} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={11} md={7}>
                                                            <span style={{display: 'block'}}>งบประมาณโครงการหลัก</span>
                                                            <MuiTextfieldCurrency label="" name="ProjectBudget" value={inputData.ProjectBudget}  onChange={handleInputData} />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="">&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield disabled label="จังหวัด" value={provincename} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid> */}

                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="รหัสโครงการหลัก" itemName={'ProjectMainName'} itemValue={'ProjectMainCode'} lists={spkMainProject} name="ProjectMainCode" value={inputData.ProjectMainCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-projectcode2-input" disabled  defaultValue="" value={projectMainCodeText} name="ProjectMainCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-projectmainname-input" disabled  defaultValue="" value={projectMainNameText} name="ProjectMainName"  />
                                                </Grid>


                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="รหัสโครงการรอง" itemName={'ProjectSubName'} itemValue={'ProjectSubCode'} lists={spkSubProject} name="ProjectSubCode" value={inputData.ProjectSubCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-subprojectcode2-input" disabled  defaultValue="" value={projectSubCodeText} name="ProjectSubCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-subprojectmainname-input" disabled  defaultValue="" value={projectSubNameText} name="ProjectSubName"  />
                                                </Grid>

                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="ประเภทกู้ยืม" itemName={'LoanTypeName'} itemValue={'LoanTypeCode'} lists={spkLoanType} name="LoanTypeCode" value={inputData.LoanTypeCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loantypecode2-input" disabled  defaultValue="" value={loanTypeCodeText} name="LoanTypeCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loantypename-input" disabled  defaultValue="" value={loanTypeNameText} name="LoanTypeName" />
                                                </Grid>
                                                
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="ระยะเวลากู้ยืม" itemName={'LoanPeriodName'} itemValue={'LoanPeriodCode'} lists={spkLoanPeriod} name="LoanPeriodCode" value={inputData.LoanPeriodCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanperiodcode2-input" disabled  defaultValue="" value={loanPeriodCodeText} name="LoanPeriodCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanperiodname-input" disabled  defaultValue="" value={loanPeriodNameText} name="LoanPeriodName" />
                                                </Grid>
                                                                                            
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="วัตถุประสงค์การกู้ยืม" itemName={'LoanobjName'} itemValue={'LoanobjCode'} lists={spkLoanObj} name="LoanobjCode" value={inputData.LoanobjCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanobjid2-input" defaultValue="" disabled  value={loanObjCodeText} name="LoanobjCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanobjname-input" defaultValue="" disabled  value={loanObjNameText} name="LoanobjName" />
                                                </Grid>

                                                <Grid item xs={12} md={3}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiSelectObj label="ประเภทผู้กู้" itemName={'LoanFarmerTypeName'} itemValue={'LoanFarmerTypeCode'} lists={spkLoanFarmerType} name="LoanFarmerTypeCode" value={inputData.LoanFarmerTypeCode} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanfarmertypeid2-input" defaultValue="" disabled  value={loanFarmerTypeCodeText} name="LoanFarmerTypeCode" />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" id="loanadd-loanfarmertypename-input" defaultValue="" disabled  value={loanFarmerTypeNameText} name="LoanFarmerTypeName" />
                                                </Grid>
                                            </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid container spacing={2} className="btn-row footer-button">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit}/>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={err || success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    {
                        success ? 
                        <DialogContentText className="dialog-success">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{successMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                        <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </DialogContentText>
                        :
                        <DialogContentText className="dialog-error">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{errMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </DialogContentText>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default LoanAddProject
