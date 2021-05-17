import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiRadioButton,
    MuiDatePicker,
    MuiTextfield,
    ButtonFluidPrimary,
    ButtonFluidSecondary,
    ButtonFluidColor,
} from '../../components/MUIinputs';


function LoanRequestContactStep5() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeSpecial: '1',
    });

    useEffect(() => {
        setLoaded(true);
    }, [])

    const handleChangeTypeSpecial = (event) => {
        setInputData({...inputData,
            typeSpecial: event.target.value
        })
        console.log('typeSpecial ',event.target.value)
    };

    const checkColorLineTop = () => {
        if(inputData.typeSpecial === '1') {
            return 'red';
        } else if(inputData.typeSpecial === '2'){
            return 'yellow';
        } else if(inputData.typeSpecial === '3'){
            return 'bluesky';
        } else if(inputData.typeSpecial === '4'){
            return 'grey';
        }
    }

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
                                {/* <Paper className="paper line-top-red"> */}

                                <Paper className={"paper mg-t-20 line-top-"+checkColorLineTop()}>
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <h3  className={"paper-head-"+checkColorLineTop()}>Special Flow</h3>
                                                <MuiRadioButton label="" id="loanrequestcontact-step3-no2-typeSuitability-input" lists={['ฟ้องศาล','แปลงหนี้', 'ใช้หนี้แทน', 'อื่นๆ']} color={checkColorLineTop()} value={inputData.typeSpecial} onChange={handleChangeTypeSpecial} type="row" />
                                                
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper  className={"paper mg-t-20 line-top-"+checkColorLineTop()}>
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                {
                                                    inputData.typeSpecial === '1' ? 
                                                    <MuiDatePicker label="วันที่ส่งฟ้อง" id="loanrequestcontact-step5-no2-date-input" defaultValue="2017-05-24" />
                                                    :
                                                    <MuiTextfield label="ผู้ใช้หนี้แทน" defaultValue="" />
                                                }
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <ButtonFluidColor label="บันทึก" color={checkColorLineTop()} />
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactStep5
