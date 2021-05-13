import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Check from '@material-ui/icons/Check';

import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import LoanRequestContactStep1 from './LoanRequestContactStep1';
import LoanRequestContactStep2 from './LoanRequestContactStep2';
import LoanRequestContactStep3 from './LoanRequestContactStep3';
import LoanRequestContactStep4 from './LoanRequestContactStep4';
import LoanRequestContactStep5 from './LoanRequestContactStep5';

import {
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary 
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

// Get Step Content
function getStepContent(step) {
    switch (step) {
        case 0:
        return <LoanRequestContactStep1 />;
        case 1:
        return <LoanRequestContactStep2 />;
        case 2:
        return <LoanRequestContactStep3 />;
        case 3:
        return <LoanRequestContactStep4 />;
        case 4:
        return <LoanRequestContactStep5 />;
        default:
        return 'Unknown step';
    }
}

function LoanRequestContact() {
    const history = useHistory();
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();

    const [loaded, setLoaded] = useState(false);

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
        history.push('/loanaddproject');
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
                                    <Step key={label} className="custom-stepper">
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
                                <div className="mg-t-35 txt-center">
                                    <p className={classes.instructions}>
                                        ยื่นคำขอครบทุกขั้นตอนแล้ว
                                    </p>
                                    <Button onClick={handleReset}>Reset</Button>
                                </div>
                                ) : (
                                    <div className="mg-t-35 txt-center">
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
                                        {activeStep !== steps.length &&
                                            (completed[activeStep] ? (
                                            <p variant="caption" className={classes.completed}>
                                                บันทึกการ { getSteps()[activeStep] } เสร็จแล้ว
                                                <ButtonFluidPrimary label="บันทึกการแก้ไข" onClick={handleComplete}/>
                                            </p>
                                            ) : (
                                                        <ButtonFluidPrimary label={completedSteps() === totalSteps() - 1 ? 'บันทึกเพื่อจบการยื่นคำขอ' : 'บันทึก'} onClick={handleComplete}/>
                                                
                                            ))}
                                    </div>
                                    
                                )}
                                </Container>               
                        </div>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContact
