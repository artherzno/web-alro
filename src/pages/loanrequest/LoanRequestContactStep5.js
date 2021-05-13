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
                            <Grid item xs={12}>
                                <Paper className="paper line-top-red paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3} className="paper-container">
                                            <Grid item xs={12}>
                                                <h3 className="paper-head-red">Special Flow</h3>
                                                <MuiRadioButton label="" id="loanrequestcontact-step3-no2-typeSuitability-input" lists={['ฟ้องศาล','แปลงหนี้', 'ใช้หนี้แทน', 'อื่นๆ']} color="red" value={inputData.typeSpecial} onChange={handleChangeTypeSpecial} type="row" />
                                                
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - -------------------------------------------------- */}
                            <Grid item xs={12}>
                                <Paper className="paper line-top-red paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={3} className="paper-container">
                                            <Grid item xs={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วันที่ส่งฟ้อง" id="loanrequestcontact-step5-no2-date-input" defaultValue="2017-05-24" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactStep5
