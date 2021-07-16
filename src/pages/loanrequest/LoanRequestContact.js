import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../../App';

import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import LoanRequestContactStep1 from './LoanRequestContactStep1';
import LoanRequestContactStep2 from './LoanRequestContactStep2';
import LoanRequestContactStep3 from './LoanRequestContactStep3';
import LoanRequestContactStep4 from './LoanRequestContactStep4';
import LoanRequestContactStep5 from './LoanRequestContactStep5';

import {
    MuiRadioButton,
    MuiTextfield,
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary, 
} from '../../components/MUIinputs';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: 'inline-block',
      color: 'red',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));

// Get Step Icon
function getStepIcon(props) {
    const { active, completed } = props;
    const items = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: <AddIcon/>,
    }
    return (
      <div className={(active) ? 'custom-stepper-item active' : (completed) ? 'custom-stepper-item completed' : 'custom-stepper-item'}>
        {completed ? <Check/> : active ? <p className="active">{items[String(props.icon)]}</p> : <p>{items[String(props.icon)]}</p>}
      </div>
    );
  }
  
  getStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    items: PropTypes.string,
  };
  
// Get Step Label
function getSteps() {
    return ['ยื่นคำขอ', 'แนบเอกสาร 1', 'ความเห็นของเจ้าหน้าที่', 'แนบเอกสาร 2', 'Special Flow'];
}

function LoanRequestContact(props) {
    const history = useHistory();
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    console.log(server_hostname)

    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoading, setIsLoading] = useState(false);

    const [activeStep, setActiveStep] = React.useState((props.location.state === undefined) ? 0 : props.location.state.activeStep); // ex. 3
    const [completed, setCompleted] = React.useState((props.location.state === undefined) ? {} : props.location.state.completed); // ex. { 0: true, 1: true, 2:true}
    const steps = getSteps();

    const [open, setOpen] = useState(false);

    const [inputData, setInputData] = useState({
        typePrint: '1',
    })

    // Get Step Content
    function getStepContent(step) {
        // console.log(typeof(props.location.state) === 'undefined' ? 'hello' : 'bye')
        let propsFarmerID = typeof(props.location.state) === 'undefined' ? 0 : props.location.state.FarmerID;
        switch (step) {
            case 0:
            return <LoanRequestContactStep1 FarmerID={propsFarmerID} />;
            case 1:
            return <LoanRequestContactStep2 />;
            case 2:
            return <LoanRequestContactStep3 />;
            case 3:
            return <LoanRequestContactStep4 />;
            case 4:
            return <LoanRequestContactStep5 
                        typeSpecial={(props.location.state === undefined) ? '1' : props.location.state.typeSpecial} 
                        color={(props.location.state === undefined) ? 'red' : props.location.state.color} 
                        page={(props.location.state === undefined) ? 'red' : props.location.state.page}
                    />;
            default:
            return 'Unknown step';
        }
    }

    // Radio Button
    const handleChangeTypePrint = (event) => {
        setInputData({...inputData,
            typePrint: event.target.value
        })
        console.log('typePrint ',event.target.value)
    };
    // End Radio Button

    const handleRequestPrint = () => {
        axios({
            url: `https://${window.location.hostname}/api/api/ExportServices/GetApplicationPdf`, //your url
            method: 'GET',
            data: {
                IDCard: 11111111111
            },
            responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(err => { console.log(err); history.push('/') })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
    }

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoaded(true);
    }, [])

  
    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const gotoAddLoanRequestProject = () => {
        history.push('/manageinfo/loanaddproject');
    }

    return (
        <div className="loanrequestcontact-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="md">
                        <div className={classes.root}>
                            <Stepper alternativeLabel nonLinear activeStep={activeStep} className="custom-stepper-box">
                                {steps.map((label, index) => (
                                    <Step key={label} className="custom-stepper mg-t-20">
                                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                                            <StepLabel StepIconComponent={getStepIcon}>{label}</StepLabel>
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>

                            {/* <div>
                                {allStepsCompleted() ? (
                                <div>
                                    <p className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                    </p>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                                ) : (
                                <div>
                                    <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
                                        </Button>
                                        {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                            <p variant="caption" className={classes.completed}>
                                                Step {activeStep + 1} already completed
                                            </p>
                                            ) : (
                                            <Button variant="contained" color="primary" onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                                            </Button>
                                            ))}
                                    </div>
                                </div>
                                )}
                            </div> */}     

                            {/* Show Stepper Content -----------------------------------------------*/}
                            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
                            {/* End Stepper Content -----------------------------------------------*/}
                            
                            <Container maxWidth="sm">
                                {allStepsCompleted() ? (
                                <div className="mg-t-10 txt-center">
                                    <p className={classes.instructions}>
                                        ยื่นคำขอครบทุกขั้นตอนแล้ว
                                    </p>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                                ) : (
                                    <div className="mg-t-10 txt-center">
                                        {/* <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
                                        </Button> */}
                                        {activeStep !== steps.length && (completed[activeStep] ? (
                                            <p variant="caption" className={classes.completed}>
                                                บันทึกการ { getSteps()[activeStep] } เสร็จแล้ว
                                                <ButtonFluidPrimary label="บันทึกแก้ไข" onClick={handleComplete}/>
                                                {activeStep+' '+completedSteps()}
                                            </p>
                                            ) : (
                                                    <React.Fragment>
                                                        { 
                                                            (activeStep < 4 && activeStep !== 2) ?  
                                                            <Grid container spacing={2} className="btn-row txt-center">
                                                                <Grid item xs={12} md={12}>
                                                                    <ButtonFluidPrimary label={completedSteps() === totalSteps() - 1 ? 'จบการยื่นคำขอ' : 'ถัดไป'} onClick={handleComplete}/> 
                                                                </Grid>
                                                            </Grid>
                                                            : (activeStep === 2) ?
                                                            <Grid container spacing={2} className="btn-row txt-center">
                                                                <Grid item xs={12} md={6}>
                                                                    {/* <ButtonFluidPrimary label="พิมพ์คำขอ" onClick={handleOpenDialog}/>  */}
                                                                    <ButtonFluidPrimary label="พิมพ์คำขอ" onClick={handleRequestPrint}/> 
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <ButtonFluidPrimary label={completedSteps() === totalSteps() - 1 ? 'บันทึกเพื่อจบการยื่นคำขอ' : 'บันทึกข้อมูล'} onClick={handleComplete}/> 
                                                                </Grid>
                                                            </Grid>
                                                            : ''
                                                        }
                                                    </React.Fragment>
                                            ))}
                                    </div>
                                    
                                )}
                                </Container>               
                        </div>
                    </Container>
                </div>
            </Fade>
        
            
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{"พิมพ์คำขอ"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <MuiRadioButton label="" lists={['ทุกหน้า','บางส่วน']} value={inputData.typePrint} onChange={handleChangeTypePrint} />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3} className="txt-center-v txt-right">
                                        <p>ตั้งแต่หน้า</p>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={1} className="txt-center-v txt-center">
                                        <p>ถึง</p>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="" defaultValue="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleCloseDialog} color="primary" autoFocus />
                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleCloseDialog} color="primary" />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withRouter(LoanRequestContact)
