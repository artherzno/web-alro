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

function LoanViewProject(props) {
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
    const [inputData, setInputData] = useState([])

    const [roleID, setRoleID] = useState(localStorage.getItem('nROLEID'))

    let provincename = localStorage.getItem('provincename');

    useEffect(() => {
        setLoaded(true);

        const getSpkProjectByID = () => {
            axios.post(
                `${server_hostname}/admin/api/get_spkproject_by_id`, {"ProjectID": props.location.state.ProjectID}, { headers: { "token": token } } 
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
                        setInputData(res.data.data[0])
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
                        getSpkProjectByID();
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

    const gotoEditLoanRequestProject = (projectID) => {
        history.push({
            pathname: '/manageinfo/loaneditproject',
            state: { 
                ProjectID: projectID,
            }
        });
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
                        <form id="addProject" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page"> 
                                    <h1>รายละเอียดโครงการขอกู้เงิน</h1>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="รหัสโครงการชื่อ" id="loanadd-projectcode-input" defaultValue="" />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    <MuiTextfield disabled label="ชื่อโครงการ" value={inputData.ProjectName}/>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield disabled label="แผนปี" value={parseInt(inputData.ProjectPlanYear) + 2500 } />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={11} md={7}>
                                                            <span style={{display: 'block'}}>งบประมาณโครงการหลัก</span>
                                                            {/* <MuiTextfieldCurrency disabled  label="" value={inputData.ProjectBudget}   /> */}
                                                            <MuiTextfield textAlign="right" label="" disabled value={inputData.ProjectBudget ? (inputData.ProjectBudget.toLocaleString('en-US', {minimumFractionDigits: 2})) : ''}  />
                                                        </Grid>
                                                        <Grid item xs={1} md={1}>
                                                            <p className="">&nbsp;</p>
                                                            <p className="paper-p">บาท</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield disabled label="จังหวัด" value={provincename} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="รหัสโครงการหลัก" disabled value={inputData.ProjectMainCode}  />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.ProjectMainCode} />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled  defaultValue="" value={inputData.ProjectMainName}/>
                                                </Grid>


                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="รหัสโครงการรอง" disabled value={inputData.ProjectSubCode} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.ProjectSubCode} />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.ProjectSubName}  />
                                                </Grid>

                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield disabled label="ประเภทกู้ยืม" value={inputData.LoanTypeCode} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanTypeCode} />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanTypeName} />
                                                </Grid>
                                                
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="ระยะเวลากู้ยืม" disabled value={inputData.LoanPeriodCode} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanPeriodCode}/>
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanPeriodName} />
                                                </Grid>
                                                                                            
                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="วัตถุประสงค์การกู้ยืม" disabled value={inputData.LoanobjCode} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanObjCode} />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanObjName} />
                                                </Grid>

                                                <Grid item xs={12} md={4}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="ประเภทผู้กู้" disabled value={inputData.LoanFarmerTypeCode} />
                                                </Grid>
                                                {/* <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanFarmerTypeCode} />
                                                </Grid> */}
                                                <Grid item xs={12} md={8}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="&nbsp;" disabled value={inputData.LoanFarmerTypeName} />
                                                </Grid>
                                            </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid container spacing={2} className="btn-row footer-button">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={roleID === '8' || roleID === '9' ? 6 : 8}>
                                    <ButtonFluidOutlinePrimary label="ย้อนกลับ" onClick={cancelData}/>
                                </Grid>
                                {
                                    roleID === '8' || roleID === '9' ?  <Grid item xs={12} md={6}><ButtonFluidPrimary label="แก้ไข" onClick={()=>gotoEditLoanRequestProject(props.location.state.ProjectID)}/></Grid>
                                    : ''
                                }
                                
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
                        <div className="dialog-success">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{successMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                        <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        :
                        <div className="dialog-error">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{errMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </div>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default LoanViewProject
