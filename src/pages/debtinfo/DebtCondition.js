import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';

import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiSelect,
    MuiCheckbox,
    ButtonNormalIconStartPrimary,
    MuiTextfieldEndAdornment,
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
    MuiTextfieldMultiLine,
} from '../../components/MUIinputs';

function DebtCondition() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const tableResult = [
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: 'ใบคำขอผ่อนผัน 123', e: 'RIET0055100137/2562', f: '56', g: '00551', h: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', i: '00137/2562', j: '10/05/2019', k: '2287654478986', l: 'นาง', m: 'บัวลี', n: 'บางวิเศษ', o: ''},
    ]
    const tableResult2 = [
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '', d: '10/05/2019', e: '10/05/2019', f: '10/05/2021', g: '5', h: '0.00', i: '0.00'},
    ]

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
        <div className="debtcondition-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>เงื่อนไขปรับโครงสร้างหนี้</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                     <Grid item xs={12} md={3}>
                                        <Box  display="flex" justifyContent="flex-start">
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" />
                                        </Box>  
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}> 
                                <div className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="left">รหัสบันทึก</TableCell>
                                                <TableCell align="left">วันที่บันทึก</TableCell>
                                                <TableCell align="left">เลขคำขอ</TableCell>
                                                <TableCell align="left">อ้างถึง</TableCell>
                                                <TableCell align="left">รหัสสารบัญ</TableCell>
                                                <TableCell align="left">ลำดับ</TableCell>
                                                <TableCell align="left">รหัสโครงการ</TableCell>
                                                <TableCell align="left">ชื่อโครงการ</TableCell>
                                                <TableCell align="left">เลขที่สัญญา</TableCell>
                                                <TableCell align="left">วันที่กู้</TableCell>
                                                <TableCell align="left">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="left">คำนำหน้า</TableCell>
                                                <TableCell align="left">ชื่อ</TableCell>
                                                <TableCell align="left">นามสกุล</TableCell>
                                                <TableCell align="left">ที่อยู่</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={15} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                tableResult.map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="left">{row.a}</TableCell>
                                                        <TableCell align="left">{row.b}</TableCell>
                                                        <TableCell align="left">{row.c}</TableCell>
                                                        <TableCell align="left">{row.d}</TableCell>
                                                        <TableCell align="left">{row.e}</TableCell>
                                                        <TableCell align="left">{row.f}</TableCell>
                                                        <TableCell align="left">{row.g}</TableCell>
                                                        <TableCell align="left">{row.h}</TableCell>
                                                        <TableCell align="left">{row.i}</TableCell>
                                                        <TableCell align="left">{row.j}</TableCell>
                                                        <TableCell align="left">{row.k}</TableCell>
                                                        <TableCell align="left">{row.l}</TableCell>
                                                        <TableCell align="left">{row.m}</TableCell>
                                                        <TableCell align="left">{row.n}</TableCell>
                                                        <TableCell align="left">{row.o}</TableCell>
                                                    </TableRow>
                                                ))
                                            } */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="2563" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="RET" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="ร้อยเอ็ด" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่คำขอ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อ้างถึง"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อ้างถึง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่รับเงินกู้" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiSelect label="รหัสโครงการ"  lists={['00001','00002','00003']} />
                                                            </Grid>
                                                            <Grid item xs={12} md={3}>
                                                                <MuiTextfield label="รหัสโครงการรอง" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield label="ชื่อโครงการรอง"  defaultValue="" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขบัตรประชาชน" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ชื่อ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="นามสกุล" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                
                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfieldMultiLine label="หมายเหตุ" row="3" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiTextfield label="เลขที่คำสั่ง" disabled defaultValue="RIET2343525/00003" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่คำสั่ง" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่เริ่มคำสั่ง" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่สิ้นสุด" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiSelect label="ประเภท" lists={['นาย','นาง','นางสาว']} />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="&nbsp;" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiTextfield label="&nbsp;" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="ลำดับที่" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="ครั้งที่" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="Tps" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="Tps_" defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">จำนวนเงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">จำนวนเงินลดดอก</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">จำนวนเงินลดค่าปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">จำนวนเงินปรับโครงสร้าง</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ยที่เปลี่ยน</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="md">
                        <Grid container spacing={2} className="btn-row txt-center">
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="ยืนยันการเพิ่ม" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกแก้ไข" />
                            </Grid>
                        </Grid>
                    </Container>
                
                    
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}> 
                                <div className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="left">รหัสบันทึก</TableCell>
                                                <TableCell align="left">วันที่บันทึก</TableCell>
                                                <TableCell align="left">คำสั่ง คปจ.</TableCell>
                                                <TableCell align="left">วันที่คำสั่ง</TableCell>
                                                <TableCell align="left">วันที่เริ่มปรับ</TableCell>
                                                <TableCell align="left">วันที่สิ้นสุด</TableCell>
                                                <TableCell align="left">ประเภท</TableCell>
                                                <TableCell align="left">อัตราดอกเบี้ย</TableCell>
                                                <TableCell align="left">จำนวนเงิน</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={9} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                tableResult2.map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="left">{row.a}</TableCell>
                                                        <TableCell align="left">{row.b}</TableCell>
                                                        <TableCell align="left">{row.c}</TableCell>
                                                        <TableCell align="left">{row.d}</TableCell>
                                                        <TableCell align="left">{row.e}</TableCell>
                                                        <TableCell align="left">{row.f}</TableCell>
                                                        <TableCell align="left">{row.g}</TableCell>
                                                        <TableCell align="left">{row.h}</TableCell>
                                                        <TableCell align="left">{row.i}</TableCell>
                                                    </TableRow>
                                                ))
                                            } */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                </div>
            </Fade>
            
        </div>
    )
}

export default DebtCondition
