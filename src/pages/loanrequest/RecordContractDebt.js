import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiRadioButton,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';

function EditContractDebt() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typeContract: '2',
    })

    useEffect(() => {
        setLoaded(true);
    }, [])

     // Radio Button
     const handleChangeTypeContract = (event) => {
        setInputData({...inputData,
            typeContract: event.target.value
        })
        console.log('typeContract ',event.target.value)
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

    const gotoPrintContractDebt = () => {
        history.push('/loanrequest/PrintContractDebt');
    }

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
                                <h1>สร้าง / บันทึกสัญญาแปลงหนี้</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <p className="mg-t-20">สัญญาแปลงหนี้ใหม่จากสัญญากู้ยืมเงินเลขที่ RIET2343525/00003</p>
                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-10">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="สัญญานี้ทำขึ้นเมื่อวันที่"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ณ สำนักงานการปฏิรูปที่ดินจังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ถนน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ตำบล" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อำเภอ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ระหว่างสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.) โดย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ผู้รับมอบอำนาจให้ทำสัญญาแทนตามคำสั่งสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม ที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="และคำสั่งจังหวัด" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ที่" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={1} className="txt-center-v">
                                                <p>ฝ่ายหนึ่งกับ</p>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ชื่อ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="นามสกุล" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfieldEndAdornment label="อายุ" defaultValue="" endAdornment="ปี"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขบัตรประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อยู่บ้านเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ถนน"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="จังหวัด"  lists={['จังหวัด1','จังหวัด2','จังหวัด3']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="เขต/อำเภอ"  lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="แขวง/ตำบล"  lists={['แขวง/ตำบล1','แขวง/ตำบล2','แขวง/ตำบล3']} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <p>ปรากฏตามสำเนาภาพถ่ายบัตรประจำตัวประชาชนและสำเนาทะเบียนบ้านแนบท้ายสัญญานี้ ซึ่งต่อไปในสัญญานี้เรียกว่า “ลูกหนี้ใหม่” อีกฝ่ายหนึ่ง</p>
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled="true" defaultValue="PNGA0001600005/00001" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="สัญญาเดิม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นค้างเดิม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยค้างเดิม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ค่าปรับค้างเดิม" defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="รหัสโครงการรอง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ชื่อโครงการรอง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="รหัสโครงการ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ชื่อโครงการ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการหลัก"  lists={['โครงการหลัก1','โครงการหลัก2','โครงการหลัก3']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['วัตถุประสงค์การกู้ยืม1','วัตถุประสงค์การกู้ยืม2','วัตถุประสงค์การกู้ยืม3']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทเงินกู้"  lists={['ประเภทเงินกู้1','ประเภทเงินกู้2','ประเภทเงินกู้3']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทกู้ยืม"  lists={['ประเภทกู้ยืม1','ประเภทกู้ยืม2','ประเภทกู้ยืม3']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทผู้กู้"  lists={['ประเภทเผู้กู้1','ประเภทเผู้กู้2','ประเภทเผู้กู้3']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>
                                
                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={8}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p>&nbsp;</p>
                                                <ButtonFluidPrimary label="ค้นหา"  />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect disabled label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield disabled label="ชื่อ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield disabled label="นามสกุล" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <MuiTextfield disabled label="ที่อยู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield disabled label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield disabled label="หมู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield disabled label="ตำบล" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield disabled label="อำเภอ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield disabled label="จังหวัด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield disabled label="รหัสไปรษณีย์" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue="" />
                                            </Grid>
                                            {/* <Grid item xs={12} md={4}>
                                                <MuiRadioButton label="&nbsp;" lists={['คำสั่งศาล','เปลี่ยนสัญญา','กทด.']} value={inputData.typeContract} onChange={handleChangeTypeContract} type="row" />
                                            </Grid> */}
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 4 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ที่ตั้งที่ดิน หมู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="ตำบล"  lists={['ตำบล1','ตำบล2','ตำบล3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="อำเภอ"  lists={['อำเภอ1','อำเภอ2','อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="ประเภทที่ดิน"  lists={['ประเภทที่ดิน1','ประเภทที่ดิน2','ประเภทที่ดิน3']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="กลุ่ม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="แปลง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="ไร่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="งาน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="วา" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 5 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่เปลี่ยนสัญญา" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่รับแปลงหนี้" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfieldMultiLine label="หมายเหตุ" row="3" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="" defaultValue="เงินกู้" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">เงินต้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ค่าปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">เงินต้น สัญญาเดิม</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย สัญญาเดิม</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">อัตราค่าปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ผลรวมเงินต้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ผลรวมงวดชำระ</p>
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
                            
                                {/* Paper 6 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <p className="txt-green">เพิ่มข้อมูลลง DUE ให้เพิ่มต่อเนื่องอย่ากระโดดปี</p>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="งวด" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiDatePicker label="วันครบกำหนด"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="จำนวนเงินต้น" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiDatePicker label=""  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12} className="txt-center">
                                                <ButtonFluidIconStartPrimary label="เพิ่ม" startIcon={<AddIcon />} maxWidth="275px" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 7 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <p>ในวันทำสัญญานี้ ลูกหนี้ใหม่ได้มอบหลักประกัน ดังต่อไปนี้</p>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ก. อสังหาริมทัพย์ที่ปราศจากข้อผูกพันใด ๆ คือ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="โดยนำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <p>ข. หนังสือสัญญารับรองผูกพันตนรับผิดชอบอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกรรวม</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                                                        <MuiTextfield label="" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={11} md={6} style={{paddingTop: '0'}} className="dsp-f">
                                                        <span style={{marginTop: '8px'}}>(&nbsp;</span><MuiTextfieldEndAdornment label="" defaultValue="" endAdornment=") ราย"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ตามหนังสือสัญญารับรองฯ ที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <p>ค. หนังสือสัญญาค้ำประกันของ</p>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="(1)" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="(2)" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 8 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <p>หมายเหตุ</p>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="1. ชื่อพยาน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="ที่อยู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="เลขประจำตัวประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="สถานที่ออกบัตร" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="2. ชื่อพยาน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="ที่อยู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="เลขประจำตัวประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="สถานที่ออกบัตร" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                            </Grid>

                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="btn-row">
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="ยืนยันการเพิ่ม" onClick={()=>gotoPrintContractDebt()} />
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

export default EditContractDebt
