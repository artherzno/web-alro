import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiSelect, 
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

function LoanAddProject() {
    const history = useHistory();

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
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>เพิ่มโครงการขอกู้เงิน</h1>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Paper className="paper line-top-green paper">
                                <Grid item xs={12} md={12}>
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="รหัสโครงการชื่อ" id="loanadd-projectcode-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อโครงการ" id="loanadd-projectname-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="แผนปี" id="loanadd-projectplanyear-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="จังหวัด" id="loanadd-province-select" lists={['กรุงเทพมหานคร','นนทบุรี','นครปฐม']} />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="รหัสโครงการหลัก" id="loanadd-projectcode2-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-projectcode2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-projectmainname-input" defaultValue="" />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="รหัสโครงการรอง" id="loanadd-subprojectmaincode1-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-subprojectcode2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-subprojectmainname-input" defaultValue="" />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="ประเภทกู้ยืม" id="loanadd-loantypecode1-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loantypecode2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loantypename-input" defaultValue="" />
                                            </Grid>
                                            
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="ระยะเวลากู้ยืม" id="loanadd-loanperiodcode1-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanperiodcode2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanperiodname-input" defaultValue="" />
                                            </Grid>
                                                                                        
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="วัตถุประสงค์การกู้ยืม" id="loanadd-loanobjid1-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanobjid2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanobjname-input" defaultValue="" />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="ประเภทผู้กู้" id="loanadd-loanfarmertypeid1-select" lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanfarmertypeid2-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;" id="loanadd-loanfarmertypename-input" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid container spacing={2} className="btn-row footer-button">
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={12} md={6}>
                                <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={postData}/>
                            </Grid>
                        </Grid>

                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default LoanAddProject
