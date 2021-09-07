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
import TablePagination from '@material-ui/core/TablePagination';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiCheckbox,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
]

// End All Data for DataGrid ---------------------------------------------//


function CancelBill() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const gotoAddLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
    }


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
        <div className="cancelbill-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>แก้ไขใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">รหัสบันทึก</TableCell>
                                                <TableCell align="left">วันที่บันทึก</TableCell>
                                                <TableCell align="left">รหัสโครงการ</TableCell>
                                                <TableCell align="left">ชื่อโครงการ</TableCell>
                                                <TableCell align="left">สัญญาเลขที่</TableCell>
                                                <TableCell align="left">วันที่ใบเสร็จ</TableCell>
                                                <TableCell align="left">เลขที่ใบเสร็จ</TableCell>
                                                <TableCell align="left">เงินต้น</TableCell>
                                                <TableCell align="left">ดอกเบี้ย</TableCell>
                                                <TableCell align="left">ค่าปรับ</TableCell>
                                                <TableCell align="left">item</TableCell>
                                                <TableCell align="left">Mindex</TableCell>
                                                <TableCell align="left">Pcapital</TableCell>
                                                <TableCell align="left">Pcap_1</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={14} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                tableResult.map((row,i) => (
                                                <TableRow key={i}>
                                                    <TableCell align="left">{row.a}</TableCell>
                                                    <TableCell align="left">{row.b}</TableCell>
                                                    <TableCell align="left">{row.c}</TableCell>
                                                    <TableCell align="left">{row.d}</TableCell>
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
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
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
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="PNGA0001600005/00001" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="รหัสจังหวัด" defaultValue="2563" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="RET" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="ร้อยเอ็ด" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใบแจ้งหนี้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                        <p>รับเงินผ่านธนาคาร</p>
                                                <Grid container>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiCheckbox label=""  />
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทกู้ยืม"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="" defaultValue="3-4535-22345-56-0" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="นามสกุล" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่รับเงินกู้" defaultValue="2017-05-15" />
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
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่จัดทำ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={9}>
                                                <MuiTextfield label="หมายเหตุ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เล่มที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ครั้งที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ล่าสุด" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใบเสร็จเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ใบเสร็จ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่คำนวณ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ชำระ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={12} className>
                                                <Grid container className="mg-t-20">
                                                    <Grid item xs={12} md={6}>
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
                                                                    <p className="paper-p txt-right">จำนวนเงินต้นที่ต้องชำระ</p>
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
                                                                    <p className="paper-p txt-right">จำนวนเงินที่ชำระ</p>
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
                                                                    <p className="paper-p txt-right">ค้นหาเลขสัญญา</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ผู้ออกใบเสร็จ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12} className="txt-center">
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <ButtonFluidPrimary maxWidth="270px" label="ประมวลผลก่อนชำระเงิน" />
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
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยรับ</p>
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

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                <Grid container spacing={2} className="btn-row txt-center">
                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidPrimary maxWidth="600px" label="บันทึกการแก้ไข" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default CancelBill
