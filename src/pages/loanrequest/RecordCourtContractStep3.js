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
    MuiRadioButton,
    MuiCheckbox,
    ButtonFluidColor,
    ButtonNormalIconStartPrimary,
    MuiTextfieldEndAdornment,
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
    MuiTextfieldMultiLine,
} from '../../components/MUIinputs';
import RecordCourtContract from './RecordCourtContract';

function RecordCourtContractStep3() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeDoc: '1',
    })

    useEffect(() => {
        setLoaded(true);
    }, [])

    // Radio Button
    const handleChangeTypeDoc = (event) => {
        setInputData({...inputData,
            typeDoc: event.target.value
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
        <div className="recordcourtcontract-step-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-red paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="PNGA0001600005/00001" />
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
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="สัญญาเดิม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นค้างเดิม" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยค้างเดิม"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ค่าปรับค้างเดิม"  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="รหัสโครงการรอง" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ชื่อโครงการรอง"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="รหัสโครงการ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ชื่อโครงการ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="บันทึกคำสั่งศาลปี"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่รับเงินกู้"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการหลัก"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทเงินกู้"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทกู้ยืม"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="ประเภทผู้กู้"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                           
                                        </Grid>
                                    </form>
                                </Paper>


                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-red paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="" defaultValue="" />
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
                                                    <Grid item xs={12} md={9}>
                                                        <MuiTextfield label="ที่อยู่" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="เลขที่" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiTextfield label="หมู่" defaultValue="" />
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
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="รหัสไปรษณีย์" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ที่ดิน" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={9}>
                                                        <MuiRadioButton label="&nbsp;" lists={['คำสั่งศาล','แปลงหนี้','กทด.']} value={inputData.typeDoc} onChange={handleChangeTypeDoc} type="row" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-red paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ที่ตั้งที่ดิน หมู่" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiSelect label="แขวง/ตำบล"  lists={['แขวง/ตำบล1','แขวง/ตำบล2','แขวง/ตำบล3']} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="&nbsp;" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiSelect label="เขต/อำเภอ"  lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
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
                                                        <MuiTextfield label="เลขที่ดิน" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="กลุ่ม" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="แปลง" defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiTextfield label="ไร่" defaultValue="0" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiTextfield label="งาน" defaultValue="0" />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiTextfield label="วา" defaultValue="0.00" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                
                                {/* Paper 4 - -------------------------------------------------- */}
                                <Paper className="paper line-top-red paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่ศาลสั่ง" defaultValue="2017-05-15" />
                                                                </Grid>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextfieldMultiLine label="หมายเหตุ" row="3" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiCheckbox label="คำสั่งศาลคิดดอกเบี้ยตามเงินต้นตั้งสัญญา"  />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">เงินต้น<span className="txt-red">ศาล</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย<span className="txt-red">ศาล</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ค่าปรับค้างเดิม</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">เงินต้น <span className="txt-red">สัญญาเดิม</span></p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfield label="" defaultValue=""/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={5}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย <span className="txt-red">สัญญาเดิม</span></p>
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
                            
                                 {/* Paper 5 - -------------------------------------------------- */}
                                <Paper className="paper line-top-red paper mg-t-35">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12} >
                                                <Grid container spacing={2} >
                                                    <Grid item xs={12} md={12}>
                                                        <p className="txt-red">เพิ่มข้อมูลลง DUE ให้เพิ่มต่อเนื่องอย่ากระโดดปี</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="งวด" defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiDatePicker label="วันครบกำหนด"  defaultValue="2017-05-15" />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จำนวนเงินต้น" defaultValue="" />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12} className="txt-center">
                                                 <ButtonFluidColor label="+ เพิ่ม" maxWidth="275px" color="red" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                            </Grid>
                        </Grid>
                    </Container>
                
                </div>
            </Fade>
            
        </div>
    )
}

export default RecordCourtContractStep3
