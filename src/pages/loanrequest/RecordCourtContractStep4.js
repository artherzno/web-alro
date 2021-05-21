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


function RecordCourtContractStep4() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        imgUpload: [],
    });

    useEffect(() => {
        setLoaded(true);
    }, [])

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

                            <Grid item xs={12} md={6}>
                                <MuiLabelHeader label="แนบสัญญาใหม่ที่ลงนาม" />
                            </Grid>
                            <Grid item xs={12} md={6} className="txt-right">
                                <p>เลขที่สัญญาใหม่ 123324/23434</p>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                {/* File upload ---------------------------------------------------*/}
                                <MuiUpload label="" imgUpload={inputData.imgUpload} id="loanrequestcontact-step4-imgupload-input" onChange={handleUploadImg} />
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default RecordCourtContractStep4
