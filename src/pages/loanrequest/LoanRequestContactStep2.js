import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiLabelHeader, 
    MuiUpload,
} from '../../components/MUIinputs';


function LoanRequestContactStep2() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        imgUploadIdcard: [],
        imgUploadHomeDoc: [],
        imgUploadPrivilege: [],
        imgUploadOther: [],
    });

    useEffect(() => {
        setLoaded(true);
    }, [])

    const handleUploadImgIdcard = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUploadIdcard: imgArr
        })
    }

    const handleUploadImgHomeDoc = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUploadHomeDoc: imgArr
        })
    }

    const handleUploadImgPrivilege = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUploadPrivilege: imgArr
        })
    }

    const handleUploadImgOther = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUploadOther: imgArr
        })
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

                            <Grid item xs={12} md={12}>
                                <MuiLabelHeader label="แนบเอกสารคำขอกู้ที่ลงนามแล้ว" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* File upload ---------------------------------------------------*/}
                                <MuiUpload label="1. สำเนาบัตรประชาชน" imgUpload={inputData.imgUploadIdcard} id="loanrequestcontact-step2-imgupload-idcard-input" onChange={handleUploadImgIdcard} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* File upload ---------------------------------------------------*/}
                                <MuiUpload label="2. สำเนาทะเบียนบ้าน" imgUpload={inputData.imgUploadHomeDoc} id="loanrequestcontact-step2-imgupload-homedoc-input" onChange={handleUploadImgHomeDoc} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* File upload ---------------------------------------------------*/}
                                <MuiUpload label="3. สำเนาเอกสารสิทธิ์" imgUpload={inputData.imgUploadPrivilege} id="loanrequestcontact-step2-imgupload-home-input" onChange={handleUploadImgPrivilege} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* File upload ---------------------------------------------------*/}
                                <MuiUpload label="4. เอกสารอื่นๆ" imgUpload={inputData.imgUploadOther} id="loanrequestcontact-step2-imgupload-other-input" onChange={handleUploadImgOther} />
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactStep2
