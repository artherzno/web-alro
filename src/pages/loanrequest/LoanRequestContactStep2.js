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

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiLabelHeader, 
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlineSecondary,
} from '../../components/MUIinputs';


function LoanRequestContactStep2(props) {
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
        imgUploadIdcard: [],
        imgUploadHomeDoc: [],
        imgUploadPrivilege: [],
        imgUploadOther: [],

        ApplicantID: localStorage.getItem('applicantID'),
        IDCard: '',
        House: '',
        OwnerDoc: '',
        OtherDoc: '',
    });

    useEffect(() => {
        setLoaded(true);
        console.log('applicantID', inputData.ApplicantID)
    }, [])


    // IDCard ---------------------------------------------------//
    const handleUploadIDCard = (event) => {
        console.log(event.target.name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            IDCard: imgArr
        })
    }
    const handleRemoveUploadIDCard = (event) => {
        console.log(event.target.name)
        setInputData({...inputData, IDCard: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("IDCard")
        myFile.type = ''
        myFile.type = 'file'
    }

    // House ---------------------------------------------------//
    const handleUploadHouse = (event) => {
        console.log(event.target.name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            House: imgArr
        })
    }
    const handleRemoveUploadHouse = (event) => {
        console.log(event.target.name)
        setInputData({...inputData, House: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("House")
        myFile.type = ''
        myFile.type = 'file'
    }

    // OwnerDoc ---------------------------------------------------//
    const handleUploadOwnerDoc = (event) => {
        console.log(event.target.name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            OwnerDoc: imgArr
        })
    }
    const handleRemoveUploadOwnerDoc = (event) => {
        console.log(event.target.name)
        setInputData({...inputData, OwnerDoc: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("OwnerDoc")
        myFile.type = ''
        myFile.type = 'file'
    }

    // OtherDoc ---------------------------------------------------//
    const handleUploadOtherDoc = (event) => {
        console.log(event.target.name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            OtherDoc: imgArr
        })
    }
    const handleRemoveUploadOtherDoc = (event) => {
        console.log(event.target.name)
        setInputData({...inputData, OtherDoc: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("OtherDoc")
        myFile.type = ''
        myFile.type = 'file'
    }

    // Submit ---------------------------------------------------//
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
        let addApplicantStep2 = document.getElementById('addApplicantStep2');
        let formData = new FormData(addApplicantStep2);
        // formData.append('ApplicantID', inputData.ApplicantID || 0)
        formData.append('ApplicantID', 13999)

        axios.post(
            `${server_hostname}/admin/api/add_applicant_step2`, formData, { headers: { "token": token } } 
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
                        <form id="addApplicantStep2" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <MuiLabelHeader label="แนบเอกสารคำขอกู้ที่ลงนามแล้ว" />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <MuiUpload label="1. สำเนาบัตรประชาชน"  imgUpload={inputData.IDCard} id="IDCard" name="IDCard" onChange={handleUploadIDCard} onClick={handleRemoveUploadIDCard} />
                                    {/* <MuiUpload label="1. สำเนาบัตรประชาชน" imgUpload={inputData.imgUploadIdcard} onChange={handleUploadImgIdcard} /> */}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <MuiUpload label="2. สำเนาทะเบียนบ้าน"  imgUpload={inputData.House} id="House" name="House" onChange={handleUploadHouse} onClick={handleRemoveUploadHouse} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <MuiUpload label="3. สำเนาเอกสารสิทธิ์" imgUpload={inputData.OwnerDoc} id="OwnerDoc" name="OwnerDoc" onChange={handleUploadOwnerDoc} onClick={handleRemoveUploadOwnerDoc} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <MuiUpload label="4. เอกสารอื่นๆ" imgUpload={inputData.OtherDoc} id="OtherDoc" name="OtherDoc" onChange={handleUploadOtherDoc} onClick={handleRemoveUploadOtherDoc} />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <ButtonFluidPrimary label={'บันทึกข้อมูล ขั้นตอนที่2'} onClick={handleSubmit} /> 
                                    {/* <ButtonFluidOutlineSecondary label="test ถัดไป" maxWidth="100px"  onClick={ props.handleComplete} /> */}
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

export default LoanRequestContactStep2
