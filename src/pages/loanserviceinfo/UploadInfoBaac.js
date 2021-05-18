import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiCheckbox,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonFluidColor,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

function UploadInfoBaac() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

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
    return (
        <div className="uploadinfobaac-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>โอนข้อมูลจาก ธ.ก.ส. จาก upload</h1>
                                <h2 className="txt-red mg-t-20 txt-regular">ต้องประมวล ณ วันที่ ก่อน upload file จากธนาคาร</h2>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-10">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={7}>
                                        <MuiDatePicker label=""  defaultValue="2017-05-15" />
                                    </Grid>
                                </Grid>
                            </Grid> 
                            <Grid item xs={12} md={3}>
                                <MuiTextfield label="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <MuiTextfield label="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <MuiDatePicker label=""  defaultValue="2017-05-15" />
                            </Grid>
                            <Grid item xs={12} md={5} className="txt-center-v">
                                <p className="txt-red">วันที่รับเงินจากธนาคาร</p>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <MuiTextfield label="ชื่อ file จากธนาคาร" defaultValue="" />
                                <p>.\upload\ชื่อ file จากธนาคาร เช่น .\upload\al7111.dat</p>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="mg-t-35">
                            <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="Check file จากธนาคารว่าเป็นของจังหวัดพังงา หรือไม่" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <p>&nbsp;</p>
                                <ButtonFluidColor color="greylight" label="โอนข้อมูลเข้าใบแจ้งหนี้" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MuiTextfield label="จำนวนรายที่โอน" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonFluidColor color="greylight" label="โอนข้อมูลเข้าใบเสร็จรับเงิน" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MuiTextfield label="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <ButtonFluidColor color="greylight" label="บันทึกการเพิ่ม" />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
            
        </div>
    )
}

export default UploadInfoBaac
