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
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiLabelHeader,
    MuiTextfieldEndAdornment,
    MuiLabelHeaderCheckbox,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

function LoanRequestPrint() {
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
    

    // Radio Button
    const handleChangeTypeLoan = (event) => {
        setInputData({...inputData,
            typeLoan: event.target.value
        })
        console.log('typeLoan ',event.target.value)
    };
    const handleChangeTypePay = (event) => {
        setInputData({...inputData,
            typePay: event.target.value
        })
        console.log('typePay ',event.target.value)
    };

    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            idNum: event.target.value
        })
        console.log('idNum ',event.target.value)
    }
    // End Input ID Number

    // Input Tel Number
    const handleTelNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,10)
        setInputData({...inputData,
            telNum: event.target.value
        })
    }
    // End Input Tel Number

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
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>พิมพ์สัญญากู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" id="loanrequestprint-search-input" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" id="loanrequestprint-searchcontactnum-input" defaultValue="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="false">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1">
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1 className="txt-green mg-b--20">สัญญากู้ยืมเงินจาก ส.ป.ก.</h1>
                            </Grid>

                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MuiRadioButton label="ประเภทเงินกู้" id="" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} value={inputData.typeLoan} onChange={handleChangeTypeLoan} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="อายุ" id="" defaultValue=""  />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIdNumber}  />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="สถานที่ออกบัตร อำเภอ/เขต" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="จังหวัด" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="สัญชาติ" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อยู่บ้านเลขที่" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ถนน/ซอย" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ตำบล/แขวง" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อำเภอ/เขต" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="จังหวัด" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ประกอบอาชีพเกษตรกรรมอยู่ในเขตปฏิรูปที่ดินอำเภอ" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="จังหวัด" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ได้ทำสัญญากู้ยืมเงินให้ไว้แก่ ส.ป.ก. โดย" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ตำแหน่งปฏิรูปที่ดินจังหวัด" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - ข้อ1 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ข้อ 1</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ผู้กู้ตกลงกู้ และผู้ให้กู้ตกลงให้กู้เพื่อใช้จ่ายตามวัตถุประสงค์ต่อไปนี้" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ก" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfieldEndAdornment label="เป็นเงิน" id="" defaultValue="12,300" textAlign="right" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeader label="&nbsp;" />
                                                <p className="paper-p">(หนึ่งหมื่นสองพันสามร้อยบาท)</p>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ข" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfieldEndAdornment label="เป็นเงิน" id="" defaultValue="" textAlign="right" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeader label="&nbsp;" />
                                                <p className="paper-p">&nbsp;</p>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ค" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfieldEndAdornment label="เป็นเงิน" id="" defaultValue="" textAlign="right" endAdornment="บาท"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeader label="&nbsp;" />
                                                <p className="paper-p">&nbsp;</p>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <p className="paper-p txt-right">รวมเป็นเงิน</p>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p className="paper-p">(ห้าแสนบาท)</p>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ผู้ให้กู้ตกลงให้ผู้กู้ได้รับเงินกู้ตามวรรคแรกในคราวเดียวกันทั้งหมด หรือแบ่งให้เป็นงวดดังต่อไปนี้" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 1 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 1 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 2 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 3 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 4 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={7}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfieldEndAdornment label="งวดที่ 5 เป็นเงิน" id="" defaultValue="100,000" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={2}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <p className="paper-p">รวมเป็นเงิน</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <p className="paper-p">(ห้าแสนบาท)</p>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ผู้กู้ยินยอมรับ (เงิน/สิ่งของแทนตัวเงินมูลค่าเท่ากับจำนวนเงินที่ผู้ให้กู้จ่ายให้แก่ผู้กู้)" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="" id="" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 3 - ข้อ2 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ข้อ 2</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ผู้กู้สัญญาว่าจะนำเงินกู้รายนี้ไปใช้จ่ายตามวัตถุประสงค์ที่ระบุตามข้อ 1 อย่างแท้จริงและจะปฏิบัติตามระเบียบคณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรมว่าด้วยหลักเกณฑ์ วิธีการ และเงื่อนไข การให้กู้ยืมแก่เกษตรกรและสถาบันเกษตรกรในเขตปฏิรูปที่ดิน และหรือ" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="ครั้งที่" id="loanrequestcontact-step3-no1-farmeraward1-input" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="&nbsp;" id="loanrequestcontact-step1-no3-no1-farmeraward2-input" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                            
                            {/* Paper 4 - ข้อ3 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ข้อ 3</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeaderCheckbox label="ในการกู้เงินรายนี้ ผู้กู้ได้มอบหลักประกันดังต่อไปนี้" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield topic="ก." label="อสังหาริมทรัพย์ที่ปราศจากข้อผู้กพันใดๆ คือ" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiLabelHeaderCheckbox label="นำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid item xs={12} md={3}>
                                                    <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeaderCheckbox topic="ข." label="หนังสือสัญญารับรองผูกพันคนรับผิดอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกร"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfieldEndAdornment label="รวม" id="" defaultValue="" textAlign="right" endAdornment="ราย"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญารับรองฯ ที่" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Grid item xs={12} md={4}>
                                                    <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeaderCheckbox topic="ค." label="หนังสือสัญญาค้ำประกันของ"/>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="(1)" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Grid item xs={12} md={12}>
                                                    <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="(2)" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <Grid item xs={12} md={12}>
                                                    <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                            
                            {/* Paper 5 - ข้อ4 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ข้อ 4</h1>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiLabelHeaderCheckbox label="ผู้ให้กู้ตกลงให้มีระยะเวลาปลอดการชำระคืนเงินต้นเป็นเวลา"/>
                                                <div className="dsp-f">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="" id="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiRadioButton label="" id="" lists={['เดือน','ปี']} value={inputData.typePay} onChange={handleChangeTypePay} type="row" />
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfieldEndAdornment label="รวม" id="" defaultValue="" textAlign="right" endAdornment="งวด"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfieldEndAdornment label="พร้อมทั้งดอกเบี้ยในอัตราร้อยละ" id="" defaultValue="" textAlign="right" endAdornment="ต่อปี"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด" id="" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                    <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">งวดที่</TableCell>
                                                <TableCell align="center">วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                <TableCell align="center">จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                [1,2,3,4,5].map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center">{i+1}</TableCell>
                                                        <TableCell align="center">
                                                            <MuiDatePicker label="" id="" defaultValue="2017-05-24" />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            { 
                                                                i === 0 ? 
                                                                    <MuiTextfield label="" id="" defaultValue=""/>
                                                                    :
                                                                    <MuiTextfieldEndAdornment label="" id="" defaultValue="" endAdornment={<CloseIcon  className="table-item-del"/>}/>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                                <TableRow className="box box-grey">
                                                    <TableCell>&nbsp;</TableCell>
                                                    <TableCell>&nbsp;</TableCell>
                                                    <TableCell align="right">จำนวนเงินรวม <span className="txt-green">50,000 </span>บาท</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="box-button txt-center">
                                    <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                
                    <Container maxWidth="lg">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}> 
                                <p className="mg-t-35">หมายเหตุ</p>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="1. ชื่อพยาน" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="ที่อยู่" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextNumber label="บัตรประชาชนเลขที่" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="สถานที่ออกบัตร" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="2. ชื่อพยาน" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="ที่อยู่" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextNumber label="บัตรประชาชนเลขที่" id="" defaultValue="" />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                {/* Field Text ---------------------------------------------------*/}
                                <MuiTextfield label="สถานที่ออกบัตร" id="" defaultValue="" />
                            </Grid>
                        </Grid>
                    </Container>
                        
                    <Container maxWidth="lg">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1 className="txt-green mg-b--20">ข้อตกลงต่อท้ายสัญญากู้ยืมเงิน</h1>
                            </Grid>

                            {/* Paper 1 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiLabelHeaderCheckbox label="ตามคำสั่ง ส.ป.ก. ที่" />
                                                <div className="dsp-f">
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                        <span>/</span>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="" id="" defaultValue="" />
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="โดย" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ตำแหน่งปฏิรูปที่ดินจังหวัด" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ลงวันที่" id="" defaultValue="2017-05-24" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                            {/* Paper 2 - -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ข้อ 2</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="แบ่งเป็นเงินต้นค้างชำระ จำนวน" id="" defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="แบ่งเป็นเงินต้นค้างชำระ จำนวน" id="" defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfieldEndAdornment label="ดอกเบี้ยค้างชำระ จำนวน" id="" defaultValue="" textAlign="right" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfieldEndAdornment label="ชำระเงินต้นค้างชำระพร้อมดอกเบี้ยในอัตราร้อยละ" id="" defaultValue="" textAlign="right" endAdornment="ต่อปี"/>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfieldEndAdornment label="รวมทั้งดอกเบี้ยค้างชำระคืนให้แก่ผู้ให้กู้ภายในเวลา" id="" defaultValue="" textAlign="right" endAdornment="ปี"/>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfieldEndAdornment label="แบ่งเป็นงวดละ" id="" defaultValue="" textAlign="right" endAdornment="เดือน"/>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfieldEndAdornment label="รวม" id="" defaultValue="" textAlign="right" endAdornment="งวด"/>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiDatePicker label="เริ่มชำระงวดแรกภายในวันที่" id="" defaultValue="2017-05-24" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiDatePicker label="ครบกำหนดงวดสุดท้ายในวันที่" id="" defaultValue="2017-05-24" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด" id="" defaultValue="" />
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                    <TableContainer className="table-box table-loanrequestprint3 table-summary">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" rowSpan={2}>งวดที่</TableCell>
                                                    <TableCell align="center" rowSpan={2}>วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                    <TableCell align="center" colSpan={2}>จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="center">เงินต้นค้างชำระ</TableCell>
                                                    <TableCell align="center">ดอกเบี้ยค้างชำระ</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {
                                                [1,2,3,4,5].map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center">{i+1}</TableCell>
                                                        <TableCell align="center">
                                                            <MuiDatePicker label="" id="" defaultValue="2017-05-24" />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <MuiTextfield label="" id="" defaultValue=""/>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            { 
                                                                i === 0 ? 
                                                                    <MuiTextfield label="" id="" defaultValue=""/>
                                                                    :
                                                                    <MuiTextfieldEndAdornment label="" id="" defaultValue="" endAdornment={<CloseIcon  className="table-item-del"/>}/>
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                                <TableRow>
                                                    <TableCell>&nbsp;</TableCell>
                                                    <TableCell align="right">รวม</TableCell>
                                                    <TableCell align="right">30,000</TableCell>
                                                    <TableCell align="right">30,000</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="box-button txt-center">
                                    <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                
                <Container maxWidth="lg">
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}> 
                            <p className="mg-t-35">หมายเหตุ</p>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="1. ชื่อพยาน" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="ที่อยู่" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextNumber label="บัตรประชาชนเลขที่" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="สถานที่ออกบัตร" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="2. ชื่อพยาน" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="ที่อยู่" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextNumber label="บัตรประชาชนเลขที่" id="" defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={7}>
                            {/* Field Text ---------------------------------------------------*/}
                            <MuiTextfield label="สถานที่ออกบัตร" id="" defaultValue="" />
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

export default LoanRequestPrint
