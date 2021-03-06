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


function LoanRequestContactStep5(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeSpecial: (props.typeSpecial === undefined) ? '1' : props.typeSpecial,
    });
    const [pageSpecialFlow, setPageSpecialFlow] = useState((props.page === undefined) ? 'recordcourtcontract' : props.page);
    const [pageColor, setPageColor] = useState((props.color === undefined) ? 'red' : props.color);


    const handleChangeTypeSpecial = (event) => {
        setInputData({...inputData,
            typeSpecial: event.target.value
        })
        // console.log('typeSpecial ',event.target.value)
        // checkColorLineTop();

        if(event.target.value === '1') {
            setPageColor('red');
            setPageSpecialFlow('recordcourtcontract');
        } else if (event.target.value === '2') {
            setPageColor('yellow')
            setPageSpecialFlow('recorddebtcontract');
        } else if (event.target.value === '3') {
            setPageColor('bluesky')
            setPageSpecialFlow('recorddebtpayment');
        } else if (event.target.value === '4') {
            setPageColor('grey')
            setPageSpecialFlow('recordcourtcontract');
        }
    };

    


    useEffect(() => {
        setLoaded(true);
        // console.log(props.typeSpecial)
    }, [pageColor, pageSpecialFlow])

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

    const gotoSpecialFlow = () => {
        history.push('/loanrequest/'+pageSpecialFlow)
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

                            {/* Paper 1 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                {/* <Paper className="paper line-top-red"> */}

                                <Paper className={"paper mg-t-20 line-top-"+pageColor}>
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <h3  className={"paper-head-"+pageColor}>Special Flow</h3>
                                                <MuiRadioButton label="" id="loanrequestcontact-step3-no2-typeSuitability-input" lists={['ฟ้องศาล','แปลงหนี้', 'ใช้หนี้แทน', 'อื่นๆ']} color={pageColor} value={inputData.typeSpecial} onChange={handleChangeTypeSpecial} type="row" />
                                                
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper  className={"paper mg-t-20 line-top-"+pageColor}>
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
                                { 
                                    (inputData.typeSpecial === '4') ? 
                                        <ButtonFluidColor label="บันทึก" color={pageColor} />
                                    : 
                                        <ButtonFluidColor label="บันทึก" color={pageColor} onClick={()=>{gotoSpecialFlow()}} />
                                }
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactStep5
