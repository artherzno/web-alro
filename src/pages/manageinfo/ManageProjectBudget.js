import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiTextfieldMultiLine,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

function ManageProjectBudget() {
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
        <div className="allcontractsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>จัดการงบประมาณโครงการ</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ชื่อกรม" defaultValue="" />
                                                {/* <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="PNGA0001600005/00001" /> */}
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ชื่อหน่วยงาน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ที่อยู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="อำเภอ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" disabled defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" disabled defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="รหัสไปรษณีย์" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="โทรศัพท์" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="เลขที่ผู้เสียภาษี ส.ป.ก." disabled defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="รหัสหน่วยงาน ส.ป.ก." disabled defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="รหัสจังหวัด" disabled defaultValue="" />
                                                {/* <MuiDatePicker label="วันที่สัญญา" defaultValue="2017-05-15" /> */}
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="CompCode" disabled defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ปีงบประมาณ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่เริ่มงบประมาณ" defaultValue="2017-05-15" /> 
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันสิ้นสุดงบประมาณ" defaultValue="2017-05-15" /> 
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ปฏิรูปที่ดินจังหวัด"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ตำแหน่ง" id="" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">แผนเงินกู้ปี ปัจจุบัน</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">แผนรายบุคคล</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">แผนรายโครงการ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">สถานะหนี้ยกมา ปิดบัญชี</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">หนี้ค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ค่าปรับค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นฟ้องศาลคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยฟ้องศาลคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยฟ้องศาลค้างชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={7}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    
                    <Container  maxWidth="sm">
                    <Grid container spacing={2} className="btn-row">
                        {/* Button Row -------------------------------------------------- */}
                        <Grid item xs={12} md={6}>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ButtonFluidPrimary label="บันทึกข้อมูล" />
                        </Grid>
                    </Grid>
                </Container>

                </div>
            </Fade>
            
        </div>
    )
}

export default ManageProjectBudget
