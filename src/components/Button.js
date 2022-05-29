import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles, } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width:'100%'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        width: '100%'
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));


export const ButtonExportExcel = (props) =>{

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={props.loading}
                    onClick={props.handleButtonClick}
                    style={{width:'100%'}}
                >
                    <Box mr={1}><i className="far fa-file-excel"></i> </Box>{props.label || "Export to Excel"}
        </Button>
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
        
    )
}

export const ButtonExport = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={props.loading || props.disabled}
                    onClick={props.handleButtonClick}
                    style={{ width: '100%',...props.style }}
                >
                    <Box mr={1}></Box>{props.label || "Export to Excel"}
                </Button>
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>

    )
}

export const ButtonApp = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={props.loading}
                    onClick={props.handleButtonClick}
                >
                    {props.label}
                </Button>
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>

    )
}

