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

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

function RecordBillClose() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typeBill: '1',
    })

    useEffect(() => {
        setLoaded(true);
    }, [])

    const tableResult = [
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
        { a: '00095/2541', b: 'ปรับปรุงที่ดิน40', c: '40', d: '23 มีนาคม 2541'},
    ]

     // Radio Button
     const RecordBillClose = (event) => {
        setInputData({...inputData,
            typeBill: event.target.value
        })
        console.log('typeBill ',event.target.value)
    };
    // End Radio Button

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
        <div className="recordbillclose-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>บันทึกใบเสร็จรับเงิน (ปิดสัญญาแล้ว)</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="PNGA0001600005/00001" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="84" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="PNGA" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="" defaultValue="PNGA0001600005/2548" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ใบแจ้งหนี้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="00016" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="ลูกหนี้รวมต้นกทด.47" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี" defaultValue="48" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="000005/2548" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่สัญญา" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทกู้ยืม" defaultValue="01" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="รายบุคคล" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="หมวดโครงการ" defaultValue="07" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="กองทุนที่ดิน" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทเงินกู้" defaultValue="ย" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="เงินกู้ระยะยาว" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="" defaultValue="3-4535-22345-56-0" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiTextfield label="คำนำหน้า" defaultValue="นาย" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุลชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiTextfield label="ที่ตั้งที่ดิน หมู่" defaultValue="08" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ตำบล" defaultValue="แม่นางขาว" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อำเภอ" defaultValue="คุระบุรี" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ประเภทที่ดิน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่รับเงินกู้" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่จัดทำ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" defaultValue="" row="3" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ครั้งที่" defaultValue="1" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="&nbsp;" defaultValue="2558/0000572" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ใบเสร็จเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่ใบเสร็จ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่คำนวณ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่ชำระ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">จำนวนเงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right txt-red">จำนวนเงินต้นที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณ" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right txt-red">จำนวนเงินที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณ" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้น</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ค่าปรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">อื่นๆ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <ButtonFluidPrimary label="พิมพ์ดูการ์ดก่อนชำระเงิน" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <ButtonFluidPrimary label="ประมวลผลก่อนชำระเงิน" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยค้างปรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">รวมดอกเบี้ย</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ค่าปรับค้างรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">รวมต้องชำระทั้งสิ้น</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>


                                <Grid container spacing={2} className="btn-row">
                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidPrimary label="บันทึกการเพิ่ม" />
                                    </Grid>
                                </Grid>
                            
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className="positionFixed mg-t-20"style={{position: 'fixed'}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <div className="table">
                                            <TableContainer className="table-box table-recordcloseoldContact1">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
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
                                                            </TableRow>
                                                        ))
                                                    }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default RecordBillClose
