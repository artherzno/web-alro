import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
// import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Divider } from '@material-ui/core';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiLabelHeader, 
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlineSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';


function LoanRequestContactStep4(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let server_production = localStorage.getItem('siteimage');

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [inputData, setInputData] = useState({
        imgUpload: [],
        ApproveDoc: [],
        ApplicantID: localStorage.getItem('applicantID'),
    });

    const [inputDataImage, setInputDataImage] = useState({
        ApproveDoc_Patch: '', // "1_idcard_1_3671000210854..zip",
    })

    useEffect(() => {
        setLoaded(true);
        console.log('Step4 applicantID', props.ApplicantID)
        console.log('Step4 action:',props.action)
        console.log('Step4 stepper status:',localStorage.getItem('stepperStatus'))

        // Action : view
        if(props.action === 'view' || props.action === 'edit') {

            const getViewApplicantStep2 = () => {
                axios.post(
                    `${server_hostname}/admin/api/view_applicant_step4`, { ApplicantID: props.ApplicantID}, { headers: { "token": token } } 
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
                            let dataImage = data.data[0];
                            setInputDataImage({
                                ...inputDataImage,
                                ApproveDoc_Patch: dataImage.ApproveDoc_Patch || '', // "1_idcard_1_3671000210854..zip",
                            })
                        }
                    }
                ).catch(err => { console.log(err); history.push('/') })
                .finally(() => {
                    if (isMounted.current) {
                      setIsLoading(false)
                    }
                 });
            }
            
            getViewApplicantStep2();
        }
    }, [])

    // ApproveDoc ---------------------------------------------------//
    const handleUploadApproveDoc= (event) => {
        console.log(event.target.name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            ApproveDoc: imgArr
        })
    }
    const handleRemoveUploadApproveDoc = (event) => {
        console.log(event.target.name)
        setInputData({...inputData, ApproveDoc: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("ApproveDoc")
        myFile.type = ''
        myFile.type = 'file'
    }

    // Submit ---------------------------------------------------//
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        let addApplicantStep4 = document.getElementById('addApplicantStep4');
        let formData = new FormData(addApplicantStep4);
        formData.append('ApplicantID', props.ApplicantID || localStorage.getItem('applicantID'))
        // formData.append('ApplicantID', 13999)

        axios.post(
            `${server_hostname}/admin/api/add_applicant_step4`, formData, { headers: { "token": token } } 
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

    const handleGotoSearch = () => {
        setErr(false);
        setSuccess(false);
        history.push('/loanrequest/loanrequestcontactsearch')
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
                        <form id="addApplicantStep4" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                {/* // Action: view */}
                                {
                                    props.action === 'view' ? 
                                    <Grid item xs={12} md={12} className="title-page">
                                        <h1>รายละเอียดการแนบเอกสาร</h1>
                                    </Grid> : ''
                                }

                                <Grid item xs={12} md={12}>
                                    <MuiLabelHeader label="แนบเอกสารพิจารณาอนุมัติการกู้" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {
                                        props.action === 'view' ? 
                                        <React.Fragment>
                                            <p className="paper-p">&nbsp;</p>
                                            {
                                                !inputDataImage.ApproveDoc_Patch ? <p style={{padding: '20px', textAlign: 'center'}}>ไม่พบข้อมูล</p> 
                                                :
                                                <img src={`${server_production}${inputDataImage.ApproveDoc_Patch}`} alt="" style={{width: '100%'}}/>
                                            }
                                            <Divider/>
                                        </React.Fragment> 
                                        : props.action === 'edit' ? 
                                        <React.Fragment>
                                            <p className="paper-p">&nbsp;</p>
                                            {
                                                !inputDataImage.ApproveDoc_Patch ? <p style={{padding: '20px', textAlign: 'center'}}>ไม่พบข้อมูล</p> 
                                                :
                                                <img src={`${server_production}${inputDataImage.ApproveDoc_Patch}`} alt="" style={{width: '100%'}}/>
                                            }
                                            <MuiUpload label="" imgUpload={inputData.ApproveDoc} id="ApproveDoc" name="ApproveDoc" onChange={handleUploadApproveDoc} onClick={handleRemoveUploadApproveDoc} />
                                            <Divider/>
                                        </React.Fragment> 
                                        :
                                        <MuiUpload label="" imgUpload={inputData.ApproveDoc} id="ApproveDoc" name="ApproveDoc" onChange={handleUploadApproveDoc} onClick={handleRemoveUploadApproveDoc} />
                                    }
                                </Grid>
                                
                                <Grid container spacing={2} className="btn-row txt-center">
                                    {/* // Action: view */}
                                    {
                                        props.action === 'view' ? 
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label="ย้อนกลับ" maxWidth="180px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                        </Grid>
                                        : props.action === 'edit' ? 
                                        <React.Fragment>
                                            <Grid item xs={12} md={8}>
                                                <ButtonFluidPrimary label={'บันทึกแก้ไขข้อมูล ขั้นตอนที่4'} onClick={handleSubmit} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>                          
                                                <ButtonFluidOutlinePrimary label="ย้อนกลับ" onClick={handleGotoSearch} />
                                            </Grid>
                                        </React.Fragment>
                                        
                                        :   
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label={'บันทึกข้อมูล ขั้นตอนที่4'} onClick={handleSubmit} />                             
                                            {/* <ButtonFluidOutlineSecondary label="test ถัดไป" maxWidth="100px"  onClick={ props.handleComplete} /> */}
                                        </Grid>
                                    }

                                </Grid>

                            </Grid>
                        </form>
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
                             {
                                props.action === 'edit' ? 
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                                :
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} /> 
                            }
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
                            <ButtonFluidPrimary label="ตกลง" maxWidth="150px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default LoanRequestContactStep4
