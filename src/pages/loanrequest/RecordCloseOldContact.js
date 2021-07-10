import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
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
    MuiRadioButton,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';

function RecordCloseOldContact() {
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
     const handleChangeTypeBill = (event) => {
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
                                <h1>บันทึกปิดสัญญาเดิม</h1>
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
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="45" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="RIET" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="" defaultValue="RIET23435250039/2540" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="เลขบัตรประชาชน" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่รับเงินกู้"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่จัดทำ"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" defaultValue="" row="3" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ใบเสร็จเลขที่" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่ใบเสร็จ"  defaultValue="2017-05-24" />
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
                                                        <p className="paper-p txt-right txt-purple">จำนวนเงินต้นที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณเงินชำระ" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right txt-blue">จำนวนเงินที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" />
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
                                                        <p className="paper-p txt-right">ดอกเบี้ยรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="" lists={['คำสั่งศาล','แปลงหนี้','ภทต.']} value={inputData.typeBill} onChange={handleChangeTypeBill} type="row" />
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ประมวลผลก่อนปรับปรุงหนี้</h1>
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
                                                        <p className="paper-p txt-right">ดอกเบี้ยในงวด</p>
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
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" />
                                    </Grid>
                                </Grid>
                            
                            </Grid>

                            <Grid item xs={12} md={6}  style={{position: 'fixed', width: '100%', right: '0'}}>
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" />  
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <div className="table">
                                            <TableContainer className="table-box table-recordcloseoldContact1 mg-t-10">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                        <TableCell align="center">&nbsp;</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>{/* // clear mockup */}
                                                        <TableRow>
                                                            <TableCell colSpan={4} align="center">ไม่พบข้อมูล</TableCell>
                                                        </TableRow>
                                            
                                                    {/* {
                                                        tableResult.map((row,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="center">{row.a}</TableCell>
                                                                <TableCell align="center">{row.b}</TableCell>
                                                                <TableCell align="center">{row.c}</TableCell>
                                                                <TableCell align="center">{row.d}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    } */}
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

export default RecordCloseOldContact
