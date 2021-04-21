import React, { useEffect, useState } from 'react';
import {  } from 'react-router-dom';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

// import Icon from '@material-ui/core/Icon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Header from '../components/Header';
import Nav from '../components/Nav';

const useStyles = makeStyles((themeGlobal) => ({
    root: {
      flexGrow: 1,
    },
    paper: themeGlobal.paper,
    headerTop: themeGlobal.headerTop,
    headerResult: themeGlobal.headerResult,
    h1: themeGlobal.h1,
    h2: themeGlobal.h2,
    textbox: themeGlobal.textbox,
    buttonFluid: themeGlobal.buttonFluid,
    label: themeGlobal.boostrapInputLabel,
    tableNoResult: themeGlobal.tableNoResult, 
  }));

  const BootstrapInput = withStyles((themeGlobal) => ({
    root: themeGlobal.boostrapRoot,
    input: themeGlobal.boostrapInput,
  }))(InputBase);

function SearchMemberPage(props) {
    const classes = useStyles();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className="search-page">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            
            <Fade in={loaded} timeout={1200}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} className={classes.headerTop}> 
                                <h1 className={classes.h1}>ค้นหาสมาชิก</h1>
                            </Grid>
                            <Grid item xs={12}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <Button edge="end" variant="contained" color="primary" size="large" startIcon={<PersonAddIcon />}>เพิ่มสมาชิก</Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <form className={classes.root} noValidate autoComplete="off">
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label} shrink htmlFor="name-input">
                                                    ชื่อ
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="name-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="surname-input">
                                                    นามสกุล
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="surname-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="id-number-input">
                                                    หมายเลขประจำตัว 13 หลัก
                                                    </InputLabel>
                                                    <BootstrapInput placeholder="ตัวอย่าง 3 8517 13368 44 4" defaultValue="" id="id-number-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormControl className={classes.textbox}>
                                                    <InputLabel className={classes.label}  shrink htmlFor="contact-number-input">
                                                    เลขที่ดิน
                                                    </InputLabel>
                                                    <BootstrapInput defaultValue="" id="contact-number-input" />
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button className={classes.buttonFluid} variant="contained" color="primary" size="large">ค้นหา</Button>    
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="md">
                        <Grid item xs={12} className={classes.headerResult}> 
                            <h2 className={classes.h2}>ผลการค้นหา 0 รายการ</h2>
                        </Grid>
                        <Box className={classes.tableNoResult}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p={1}
                                m={1}
                                css={{ height: '100%' }}
                            >
                                <Box alignItems="center">
                                    <Box p={1} justifyContent="center" alignItems="center" css={{ textAlign: 'center' }}>
                                        ไม่มีข้อมูล
                                    </Box>
                                    <Box p={1}>
                                        <Button edge="end" variant="contained" color="primary" size="large" startIcon={<PersonAddIcon />}>เพิ่มสมาชิก</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default SearchMemberPage;
