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
    MuiUpload,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiCheckbox,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonFluidColor,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

function PayFromOtherBank() {
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
                                <h1>โอนข้อมูลจากธนาคาร</h1>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <p>วันที่นำเข้าข้อมูล</p>
                                <div className="select-date-option">
                                    <MuiSelectDay label="" name="recdatedd" value={'00'} />
                                    <MuiSelectMonth label="" name="recdatemm" value={'00'}  />
                                    <MuiSelectYear label="" name="recdateyyyy" value={'0000'} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiSelect label="ธนาคาร" listsValue={['ธกส.','กสิกร','กรุงไทย','กรุงเทพ']} lists={['ธกส.', 'กสิกร','กรุงไทย','กรุงเทพ']} value={'ธกส.'} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <p>ไฟล์จากธนาคาร</p>
                                <MuiUpload name="file"  />
                                                
                                {/* <MuiTextfield label="ชื่อ file จากธนาคาร" defaultValue="" />
                                <p>.\upload\ชื่อ file จากธนาคาร เช่น .\upload\al7111.dat</p> */}
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="mg-t-35">
                            <Grid item xs={12} md={8}>
                                <p>&nbsp;</p>
                                <ButtonFluidColor color="greylight" label="ตรวจสอบ file" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MuiTextfield label="จำนวนรายที่โอน" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonFluidColor color={'greylight'} label="ยืนยันนำเข้าข้อมูล" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MuiTextfield label="" defaultValue="" />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
            
        </div>
    )
}

export default PayFromOtherBank
