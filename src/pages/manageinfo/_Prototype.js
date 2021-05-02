import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

const useStyles = makeStyles((themeGlobal) => ({
    root: {
      flexGrow: 1,
    },
    iconGreen: themeGlobal.iconGreen,
    iconRoot: themeGlobal.iconRoot,
    paper: themeGlobal.paper,
    headerTop: themeGlobal.headerTop,
    headerResult: themeGlobal.headerResult,
    h1: themeGlobal.h1,
    h2: themeGlobal.h2,
    textbox: themeGlobal.textbox,
    buttonNormal: themeGlobal.buttonNormal,
    buttonFluid: themeGlobal.buttonFluid,
    buttonFluidOutlinePrimary: themeGlobal.buttonFluidOutlinePrimary,
    buttonOutlinePrimary: themeGlobal.buttonOutlinePrimary,
    label: themeGlobal.boostrapInputLabel,
    labelHeader: themeGlobal.boostrapInputLabelHeader,
    tableNoResult: themeGlobal.tableNoResult, 
    inputfile: themeGlobal.inputfile,
    boxDashed: themeGlobal.boxDashed,
    buttonRow: themeGlobal.buttonRow,
  }));

function Prototye() {
    const history = useHistory();
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])
    
    return (
        <div className="search-page">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.headerTop}> 
                                <h1 className={classes.h1}>หัวข้อ</h1>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default Prototye
