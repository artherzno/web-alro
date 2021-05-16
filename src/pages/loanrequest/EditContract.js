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
    MuiCheckbox,
    MuiRadioButton,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
    ButtonFluidOutlineSecondary,
} from '../../components/MUIinputs';

function EditContract() {
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
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
        { a: 'PNGA0001600005/00001', b: '5 สิงหาคม 2550', c: 'ปน.ศาล55/51', d: 'วช.กลุ่มผู้ปลูกแตงโม'},
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
                                <h1>แก้ไขสัญญาฟ้องศาล</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>

                                <Grid item xs={12} md={12}>
                                    <div className="table">
                                        <TableContainer className="table-box table-recordcloseoldContact1 mg-t-20">
                                            <Table aria-label="normal table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">รหัสบันทึก</TableCell>
                                                    <TableCell align="center">วันที่บันทึก</TableCell>
                                                    <TableCell align="center">Rentno</TableCell>
                                                    <TableCell align="center">Projname</TableCell>
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

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled="true" defaultValue="PNGA0001600005/00001" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="" defaultValue="84" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="" defaultValue="PNGA" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="" defaultValue="PNGA0001600005/2548" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="รหัสโครงการหลัก" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ชื่อโครงการหลัก" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="รหัสโครงการรอง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <MuiTextfield label="ชื่อโครงการรอง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['วัตถุประสงค์การกู้ยืม1','วัตถุประสงค์การกู้ยืม2','วัตถุประสงค์การกู้ยืม3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="หมวดโครงการ"  lists={['หมวดโครงการ1','หมวดโครงการ2','หมวดโครงการ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="ประเภทกู้ยืม"  lists={['ประเภทกู้ยืม1','ประเภทกู้ยืม2','ประเภทกู้ยืม3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="ประเภทเงินกู้"  lists={['ประเภทเงินกู้1','ประเภทเงินกู้2','ประเภทเงินกู้3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="ประเภทเผู้กู้"  lists={['ประเภทเผู้กู้1','ประเภทเผู้กู้2','ประเภทเผู้กู้3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiRadioButton label="&nbsp;" lists={['คำสั่งศาล','เปลี่ยนสัญญา']} value={inputData.typeBill} onChange={handleChangeTypeBill} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="สัญญาเดิม"  defaultValue="" />
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="คำนำหน้า" defaultValue="นาย" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="ชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="นามสกุล" defaultValue="เพ็ชรสู้" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="ที่อยู่" defaultValue="" row="3" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="หมู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="ตำบล" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อำเภอ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="รหัสไปรษณีย์" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ที่ตั้งที่ดิน หมู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiSelect label="ตำบล"  lists={['ตำบล1','ตำบล2','ตำบล3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="อำเภอ"  lists={['อำเภอ1','อำเภอ2','อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทที่ดิน"  lists={['ประเภทที่ดิน1','ประเภทที่ดิน2','ประเภทที่ดิน3']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="กลุ่ม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="แปลง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ไร่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="งาน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="วา" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 4 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <span>&nbsp;</span>
                                                <MuiTextfield label="วันที่ศาลสั่ง" defaultValue="1 มกราคม 2551" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <span className="txt-red">ศาล</span>
                                                <MuiTextfield label="เงินต้น" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <span className="txt-red">ศาล</span>
                                                <MuiTextfield label="ดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <span>&nbsp;</span>
                                                <MuiTextfield label="ค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="1 มกราคม 2551" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ต้นเก่า" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเก่า" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="หนี้คงเหลือ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="19,516.09" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราค่าปรับ" textAlign="right" defaultValue="0.00" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="เงินกู้" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" defaultValue="" row="3" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                <Grid container spacing={2} className="mg-t-20">
                                    <Grid item xs={12} md={6}>
                                        <MuiTextfield label="ค้นหาเลขสัญญา" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={6} className="txt-red">
                                        <span>&nbsp;</span>
                                        <MuiCheckbox label="สถานะจบ"  />
                                    </Grid>
                                </Grid>


                                <Grid container spacing={2} className="btn-row">
                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidPrimary label="ยืนยันการแก้ไข" />
                                    </Grid>
                                    
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidOutlinePrimary label="แก้ไข"/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidOutlineSecondary label="ลบข้อมูล"/>
                                    </Grid>
                                </Grid>
                            
                            </Grid>

                            <Grid item xs={12} md={6} >
                                <div className="mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <ButtonFluidPrimary maxWidth="100px" label="ลบ DUE" />
                                        </Grid>
                                        <Grid item xs={6} className="txt-right">
                                            <ButtonFluidPrimary maxWidth="100px" label="เพิ่ม" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="&nbsp;" textAlign="right" defaultValue="0.00" />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="งวด"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="วันที่ครบกำหนดชำระ"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="จำนวนเงินต้น" textAlign="right" defaultValue="0.00" />
                                        </Grid>
                                        <Grid item xs={12} md={12} className="txt-center">
                                            <p className="txt-red">เพิ่มข้อมูลลง DUE ให้เพิ่มต่อเนื่อง อย่ากระโดดปี</p>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={1}>
                                                    <p className="txt-red">DUE</p>
                                                </Grid>
                                                <Grid item xs={12} md={10} className="txt-center">
                                                    <p className="txt-blue txt-bold">งวดชำระตามสัญญา</p>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-EditContract mg-t-0">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Item</TableCell>
                                                                    <TableCell align="center">Mindex</TableCell>
                                                                    <TableCell align="center">Projcode</TableCell>
                                                                    <TableCell align="center">Projname</TableCell>
                                                                    <TableCell align="center">Renton</TableCell>
                                                                    <TableCell align="center">Duedate</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3,4,5].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="center">1</TableCell>
                                                                            <TableCell align="center">PNGA00031</TableCell>
                                                                            <TableCell align="center">00031</TableCell>
                                                                            <TableCell align="center">วช.กลุ่มผู้ปลูกแตงโม</TableCell>
                                                                            <TableCell align="center">ปน.ศาล154/49</TableCell>
                                                                            <TableCell align="center">1 พฤศจิกายน</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} className="mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={1}>
                                                    <p className="txt-red">DUS</p>
                                                </Grid>
                                                <Grid item xs={12} md={10} className="txt-center">
                                                    <p className="txt-blue txt-bold">งวดชำระจริงและปรับโครงสร้างหนี้</p>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-EditContract mg-t-0">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Item</TableCell>
                                                                    <TableCell align="center">Mindex</TableCell>
                                                                    <TableCell align="center">Projcode</TableCell>
                                                                    <TableCell align="center">Projname</TableCell>
                                                                    <TableCell align="center">Renton</TableCell>
                                                                    <TableCell align="center">Duedate</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3,4,5].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="center">1</TableCell>
                                                                            <TableCell align="center">PNGA00031</TableCell>
                                                                            <TableCell align="center">00031</TableCell>
                                                                            <TableCell align="center">วช.กลุ่มผู้ปลูกแตงโม</TableCell>
                                                                            <TableCell align="center">ปน.ศาล154/49</TableCell>
                                                                            <TableCell align="center">1 พฤศจิกายน</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} className="mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={2}>
                                                    <ButtonFluidPrimary maxWidth="100px" label="ลบ CNN" />
                                                </Grid>
                                                <Grid item xs={12} md={1} className="txt-center-v">
                                                    <p className="txt-red">CNN</p>
                                                </Grid>
                                                <Grid item xs={12} md={6} className="txt-center txt-center-v">
                                                    <p className="txt-blue txt-bold">loan_cnn</p>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-EditContract mg-t-0">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Item</TableCell>
                                                                    <TableCell align="center">Mindex</TableCell>
                                                                    <TableCell align="center">Projcode</TableCell>
                                                                    <TableCell align="center">Projname</TableCell>
                                                                    <TableCell align="center">Renton</TableCell>
                                                                    <TableCell align="center">Duedate</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3,4,5].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="center">1</TableCell>
                                                                            <TableCell align="center">PNGA00031</TableCell>
                                                                            <TableCell align="center">00031</TableCell>
                                                                            <TableCell align="center">วช.กลุ่มผู้ปลูกแตงโม</TableCell>
                                                                            <TableCell align="center">ปน.ศาล154/49</TableCell>
                                                                            <TableCell align="center">1 พฤศจิกายน</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} className="mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12} className="txt-center">
                                                    <p className="txt-blue txt-bold">loan_rcp</p>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-EditContract mg-t-0">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Item</TableCell>
                                                                    <TableCell align="center">Mindex</TableCell>
                                                                    <TableCell align="center">Projcode</TableCell>
                                                                    <TableCell align="center">Projname</TableCell>
                                                                    <TableCell align="center">Renton</TableCell>
                                                                    <TableCell align="center">Duedate</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3,4,5].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="center">1</TableCell>
                                                                            <TableCell align="center">PNGA00031</TableCell>
                                                                            <TableCell align="center">00031</TableCell>
                                                                            <TableCell align="center">วช.กลุ่มผู้ปลูกแตงโม</TableCell>
                                                                            <TableCell align="center">ปน.ศาล154/49</TableCell>
                                                                            <TableCell align="center">1 พฤศจิกายน</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={12} className="mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-EditContract mg-t-0">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">Item</TableCell>
                                                                    <TableCell align="center">Mindex</TableCell>
                                                                    <TableCell align="center">Projcode</TableCell>
                                                                    <TableCell align="center">Projname</TableCell>
                                                                    <TableCell align="center">Renton</TableCell>
                                                                    <TableCell align="center">Duedate</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3,4,5].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="center">1</TableCell>
                                                                            <TableCell align="center">PNGA00031</TableCell>
                                                                            <TableCell align="center">00031</TableCell>
                                                                            <TableCell align="center">วช.กลุ่มผู้ปลูกแตงโม</TableCell>
                                                                            <TableCell align="center">ปน.ศาล154/49</TableCell>
                                                                            <TableCell align="center">1 พฤศจิกายน</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
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

export default EditContract
