import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiTextfieldEndAdornment,
    MuiTextfieldStartAdornment,
    MuiLabelHeaderCheckbox,
    MuiSelect,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';

function LoanRecivcePrint() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typePay: '1',
    })

    useEffect(() => {
        setLoaded(true);
    }, [])

    const tableResult = [
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
        { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
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
        <div className="loanrequestprint-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา"  defaultValue="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                <TableCell align="center">วันที่บันทึก</TableCell>
                                                <TableCell align="center">เลขคำขอ</TableCell>
                                                <TableCell align="center">รหัสโครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                <TableCell align="center">วันที่กู้</TableCell>
                                                <TableCell align="center">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="center">คำนำหน้า</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">นามสกุล</TableCell>
                                                <TableCell align="center">ที่อยู่</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                tableResult.map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center">{row.a}</TableCell>
                                                        <TableCell align="center">{row.b}</TableCell>
                                                        <TableCell align="center">{row.c}</TableCell>
                                                        <TableCell align="center">{row.d}</TableCell>
                                                        <TableCell align="center">{row.f}</TableCell>
                                                        <TableCell align="center">{row.g}</TableCell>
                                                        <TableCell align="center">{row.h}</TableCell>
                                                        <TableCell align="center">{row.i}</TableCell>
                                                        <TableCell align="center">{row.j}</TableCell>
                                                        <TableCell align="center">{row.k}</TableCell>
                                                        <TableCell align="center">{row.l}</TableCell>
                                                        <TableCell align="center">{row.m}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>

                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeaderCheckbox label="ใบสำคัญรับเงิน" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ตำบล"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อำเภอ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="จังหวัด"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ได้รับเงินจากกรม"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="กระทรวง"  defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrecivecprint1 table-summary">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รายการ</TableCell>
                                                <TableCell align="center">จำนวนเงิน</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                [1,2].map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center">
                                                            <MuiTextfieldStartAdornment label=""  defaultValue="" startAdornment={(i+1)+'. '} />    
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            { 
                                                                i === 0 ? 
                                                                    <MuiTextfield label=""  defaultValue=""/>
                                                                    :
                                                                    <MuiTextfieldEndAdornment label=""  defaultValue="" endAdornment={<CloseIcon  className="table-item-del"/>}/>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                                <TableRow>
                                                    <TableCell align="center">
                                                        <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่มรายการ" />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <p>รวม 50,000 บาท</p>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center">
                                                        &nbsp;
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <p>จำนวนเงิน ................</p>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container  maxWidth="md">
                        <Grid container spacing={2} className="btn-row">
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} />
                            </Grid>
                        </Grid>
                    </Container>
                
                </div>
            </Fade>
        </div>
    )
}

export default LoanRecivcePrint
