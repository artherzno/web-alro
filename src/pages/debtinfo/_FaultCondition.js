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
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
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
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" row="3"/>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <p>หนี้ค้างชำระ</p>
                                                <Box className="box box-red-summary">123,456.77</Box>
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
                                    <Grid item xs={12} md={5}>
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพหนี้ รายตัว" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพหนี้ รวม" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพความผิด รายตัว" />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <ButtonFluidPrimary label="พิมพ์ใบรับสภาพความผิด รวม" />
                                    </Grid>
                                </Grid>
                            
                            </Grid>

                            <Grid item xs={12} md={6} style={{position: 'fixed', width: '100%', right: '0'}}>
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <MuiSelect label="ค้นหาสัญญาที่จะหมดอายุความ เดือน"  lists={['เดือน1', 'เดือน2', 'เดือน3']} />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiSelect label="ปี"  lists={[2564, 2563, 2562]} />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <p>&nbsp;</p>
                                                    <ButtonFluidPrimary label="ค้นหา" />  
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                       
                                        <Grid item xs={12} md={12}>
                                        <div className="table">
                                            <TableContainer className="table-box table-recordcloseoldContact1 mg-t-10">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                    <TableRow>
                                                    <TableCell align="left">
                                                        <Checkbox
                                                            color="primary"
                                                            indeterminate={numSelected > 0 && numSelected < rowCount}
                                                            checked={rowCount > 0 && numSelected === rowCount}
                                                            onChange={handleSelectAllClick}
                                                            inputProps={{ 'aria-label': 'select all desserts' }}
                                                        />
                                                    </TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>{/* // clear mockup */}
                                                        <TableRow>
                                                            <TableCell colSpan={5} align="left">ไม่พบข้อมูล</TableCell>
                                                        </TableRow>
                                            
                                                    {/* {
                                                        tableResult.map((row,i) => { 
                                                            const isItemSelected = isSelected(row.id);
                                                            const labelId = `enhanced-table-checkbox-${i}`;
                                                        
                                                            return(
                                                            <TableRow hover
                                                                onClick={(event) => handleClickSelect(event, row.id)}
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={row.id}
                                                                selected={isItemSelected}>
                                                                <TableCell padding="checkbox" align="left">
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={isItemSelected}
                                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="left">{row.a}</TableCell>
                                                                <TableCell align="left">{row.b}</TableCell>
                                                                <TableCell align="left">{row.c}</TableCell>
                                                                <TableCell align="left">{row.d}</TableCell>
                                                            </TableRow>
                                                        )}
                                                        )
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

export default FaultCondition
