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
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
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
                    disabled={props.loading}
                    onClick={props.handleButtonClick}
                >
                    <Box mr={1}><i className="far fa-file-excel"></i> </Box>Export to Excel
        </Button>
                {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        </div>
        
    )
}


