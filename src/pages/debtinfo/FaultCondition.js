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
import Checkbox from '@material-ui/core/Checkbox';

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


const tableResult = [
    { id: 1, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 2, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 3, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 4, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 5, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 6, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 7, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 8, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 9, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
    { id: 10, a: '00063', b: 'ปรับปรุงที่ดิน40', c: '234355/2540', d: 'RIET'},
]

function FaultCondition() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typeBill: '1',
    })

    // Variable for Checkbox in Table
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const rowCount = tableResult.length;
    const numSelected = selected.length;

    useEffect(() => {
        setLoaded(true);
    }, [])

    // Select CheckBox in Table
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = tableResult.map((n) => n.id);
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };

    const handleClickSelect = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        setSelected(newSelected);
    };

    // End Select Checkbox


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
        <div className="faultcondition-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>รับสภาพหนี้/รับสภาพตามความผิด</h1>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box  display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="ค้นหาเลขที่สัญญา" />
                                </Box>  
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box  display="flex" justifyContent="flex-start">
                                    <MuiTextfield label="เลขประจำตัวประชาชนเกษตรกร" />
                                </Box>  
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="ค้นหา" />  
                            </Grid>
                            {/* <Grid item xs={12} md={7}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <ButtonNormalIconStartPrimary label="เพิ่มคำขอ" startIcon={<AddIcon />} />
                                </Box>  
                            </Grid> */}
                            <Grid item xs={12} md={12}> 
                                <div className="table">
                                    <TableContainer className="table-box table-recordinstallmentpayment1 max-h-250 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="left">รหัสโครงการ</TableCell>
                                                <TableCell align="left">ชื่อโครงการ</TableCell>
                                                <TableCell align="left">เลขที่สัญญา</TableCell>
                                                <TableCell align="left">คำนำหน้า</TableCell>
                                                <TableCell align="left">ชื่อ</TableCell>
                                                <TableCell align="left">นามสกุล</TableCell>
                                                <TableCell align="left">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="left">บ้านเลขที่</TableCell>
                                                <TableCell align="left">หมู่ที่</TableCell>
                                                <TableCell align="left">ถนน</TableCell>
                                                <TableCell align="left">ตำบล</TableCell>
                                                <TableCell align="left">อำเภอ</TableCell>
                                                <TableCell align="left">จังหวัด</TableCell>
                                                <TableCell align="left">เบอร์โทรศัพท์</TableCell>
                                                <TableCell align="left" className="cell-blue">จำนวนเงินให้กู้</TableCell>
                                                <TableCell align="left" className="cell-green">อัตราดอกเบี้ย</TableCell>
                                                <TableCell align="left" className="cell-red">หนี้ค้างชำระ</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={17} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                tableResult.map((row,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="left">{row.a}</TableCell>
                                                        <TableCell align="left">{row.b}</TableCell>
                                                        <TableCell align="left">{row.c}</TableCell>
                                                        <TableCell align="left">{row.d}</TableCell>
                                                        <TableCell align="left">{row.d2}</TableCell>
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

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12} md={3}>
                                                <MuiTextfield label="รหัสจังหวัด" defaultValue="RIET" />
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <MuiDatePicker label="&nbsp;"  defaultValue="สำนักงานการปฏิรูปที่ดินจังหวัดร้อยเอ็ด" />
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
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiDatePicker label="ณ วันที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid> */}
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" row="3"/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p>หนี้ค้างชำระ</p>
                                                <Box className="box box-red-summary">123,456.77</Box>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p>จำนวนดอกเบี้ย</p>
                                                <Box className="box box-black-summary">2,500.77</Box>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p>ยอด ณ วันที่</p>
                                                {/* <Box className="box box-black-summary"> */}
                                                    <MuiDatePicker label=""/>
                                                {/* </Box> */}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <p>รวมเป็นจำนวนเงินทั้งสิ้น</p>
                                                <Box className="box box-red-summary">123,899.00</Box>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12} className="mg-t-20">
                                        <h3 className="txt-red txt-center txt-regular">การทำรายงานหน้านี้ต้องประมวลวัน ณ วันที่ต้องการคำนวณการรับสภาพหนี้</h3>
                                    </Grid>
                                </Grid>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="ชื่อ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="ที่อยู่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="เลขที่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiSelect label="จังหวัด"  lists={['จังหวัด1','จังหวัด2','จังหวัด3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiSelect label="เขต/อำเภอ"  lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiSelect label="แขวง/ตำบล"  lists={['แขวง/ตำบล1','แขวง/ตำบล2','แขวง/ตำบล3']} />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                <Grid container spacing={2} className="btn-row">
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพหนี้ รายตัว" maxWidth="250px" />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพหนี้ รวม" maxWidth="250px" />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพความผิด รายตัว" maxWidth="250px" />&nbsp;&nbsp;&nbsp;&nbsp;
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพความผิด รวม" maxWidth="250px" />
                                </Grid>
                            
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default FaultCondition
