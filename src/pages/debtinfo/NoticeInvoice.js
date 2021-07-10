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
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiSelect,
    ButtonFluidPrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4'},
]

const columns = [
    { field: 'id', headerAlign: 'center', align: 'center', headerName: 'ลำดับ', width: 100 },
    { field: 'a', headerAlign: 'center', align: 'center', headerName: 'รหัสจังหวัด', width: 100 },
    { field: 'b', headerAlign: 'center', align: 'center', headerName: 'ลำดับข้อมูล', width: 150 },
    { field: 'c', headerAlign: 'center', align: 'center', headerName: 'รหัสโครงการ', type: 'number', width: 130 },
    { field: 'd', headerAlign: 'center', align: 'center', headerName: 'ชื่อโครงการ', width: 130 },
    { field: 'e', headerAlign: 'center', align: 'center', headerName: 'คำนำหน้า', width: 100 },
    { field: 'f', headerAlign: 'center', align: 'center', headerName: 'ชื่อ', width: 130 },
    { field: 'g', headerAlign: 'center', align: 'center', headerName: 'นามสกุล', width: 130 },
    { field: 'h', headerAlign: 'center', align: 'center', headerName: 'วันที่ประมวล', width: 130, type: 'date' },
    { field: 'i', headerAlign: 'center', align: 'center', headerName: 'เลขที่สัญญา', width: 130 },
    { field: 'j', headerAlign: 'center', align: 'center', headerName: 'วันที่กู้', width: 130, type: 'date' },
    { field: 'k', headerAlign: 'center', align: 'center', headerName: 'เงินกู้', width: 100 },
    { field: 'l', headerAlign: 'center', align: 'center', headerName: 'เงินงวดชำระ', width: 100 },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    // },
  ];
  
  const rows = [
    { id: 1, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 2, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 3, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 4, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 5, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 6, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 7, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 8, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 9, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 10, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 11, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
    { id: 12, a: 'RIET', b: 'RIET16310/00002', c: '000003', d: 'ปรับปรุงดิน40', e: 'นาย', f: 'ถาวร', g: 'นุ่มทอง', h: '13/07/2020', i: '00023/2530', j: '13/7/2020', k: '7,500.00', l: '0.00' },
  ];

// End All Data for DataGrid ---------------------------------------------//


function NoticeInvoice() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

    // Variable for Checkbox in Table
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const rowCount = rows.length;
    const numSelected = selected.length;

    useEffect(() => {
        setLoaded(true);
    }, [])


    // Select CheckBox in Table
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.id);
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
        <div className="noticeinvoice-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>รายงานใบเตือนหนี้ค้างชำระ</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="รหัสบันทึกใบเตือน" defaultValue="เงินกู้" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="วันที่บันทึกใบเตือน" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="วันที่ประมวลผล" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="เลขที่ใบแจ้งหนี้" defaultValue="เงินกู้" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="เงินกู้" />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <MuiTextfield label="เลขที่สัญญา" defaultValue="เงินกู้" />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="แสดงสถานะการชำระเงิน" listsValue={['ทั้งหมด','ชำระแล้ว','ยังไม่ชำระ']} lists={['ทั้งหมด','ชำระแล้ว','ยังไม่ชำระ']} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="การเตือน" listsValue={['ครั้งที่ 1','ครั้งที่ 2']} lists={['ครั้งที่ 1','ครั้งที่ 2']}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="จัดเรียงตาม" listsValue={['เลขที่ใบเตือน','วันที่ออกหนังสือเตือน','วันที่รับเงิน']} lists={['เลขที่ใบเตือน','วันที่ออกหนังสือเตือน','วันที่รับเงิน']}   />
                                    </Grid>
                                    <Grid item xs={12} md={6} className="txt-right">
                                        <p>&nbsp;</p>
                                        <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                        
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                <TableCell align="center">วันที่บันทึก</TableCell>
                                                <TableCell align="center">วันที่คำนวณ</TableCell>
                                                <TableCell align="center">รหัสจังหวัด</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">บัตรประชาชน</TableCell>
                                                <TableCell align="center">โครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">วันที่ยืม</TableCell>
                                                <TableCell align="center">ใบเตือน</TableCell>
                                                <TableCell align="center">สัญญาเลขที่</TableCell>
                                                <TableCell align="center">วันครบชำระ</TableCell>
                                                <TableCell align="center">งวดชำระ</TableCell>
                                                <TableCell align="center">เงินต้น</TableCell>
                                                <TableCell align="center">ดอกเบี้ย</TableCell>
                                                <TableCell align="center">ดอกเบี้ยค้างชำระ</TableCell>
                                                <TableCell align="center">ดอกเบี้ยชำระ</TableCell>
                                                <TableCell align="center">Mindex</TableCell>
                                                <TableCell align="center">จำนวนเงินจ่าย</TableCell>
                                                <TableCell align="center">วันที่จ่าย</TableCell>
                                                <TableCell align="center">Ref_id1</TableCell>
                                                <TableCell align="center">Ref_date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={22} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
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
                            <Grid item xs={12} md={3} className="mg-t-10" style={{display: 'none'}}>
                                <ButtonFluidPrimary label="พิมพ์ Label" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10" style={{display: 'none'}}>
                                <ButtonFluidPrimary label="พิมพ์หนังสือใบเตือน Bar" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10" style={{display: 'none'}}>
                                <ButtonFluidPrimary label="พิมพ์หนังสือใบเตือน Bar .ใหม่" />
                            </Grid>
                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                            <Grid item xs={12} md={12} style={{display: 'none'}}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่ใบเตือนหนี้"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="คำนวณสิ้นปีงบประมาณ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ประมวลผล"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินครบชำระ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นค้างชำระ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ลำดับที่ใบเตือนหนี้"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนราย"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นคงเหลือ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยที่ต้องชำระ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยค้างชำระ"  defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>
                    
                    <Container maxWidth={false} style={{display: 'none'}}>
                    {/* Data Grid --------------------------------*/}
                        {/* <div style={{ height: 400, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                        </div> */}
                        <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-35">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                <Checkbox
                                                    color="primary"
                                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                                    checked={rowCount > 0 && numSelected === rowCount}
                                                    onChange={handleSelectAllClick}
                                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                                />
                                                </TableCell>
                                                <TableCell align="center">ลำดับ</TableCell>
                                                <TableCell align="center">รหัสจังหวัด</TableCell>
                                                <TableCell align="center">ลำดับข้อมูล</TableCell>
                                                <TableCell align="center">รหัสโครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">คำนำหน้า</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">นามสกุล</TableCell>
                                                <TableCell align="center">วันที่ประมวล</TableCell>
                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                <TableCell align="center">วันที่กู้</TableCell>
                                                <TableCell align="center">เงินกู้</TableCell>
                                                <TableCell align="center">เงินงวดชำระ</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={14} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                rows.map((row,i) => { 
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
                                                            <TableCell padding="checkbox" align="center">
                                                                <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                            </TableCell>
                                                            <TableCell align="center" id={labelId}>{row.id}</TableCell>
                                                            <TableCell align="center">{row.a}</TableCell>
                                                            <TableCell align="center">{row.b}</TableCell>
                                                            <TableCell align="center">{row.c}</TableCell>
                                                            <TableCell align="center">{row.d}</TableCell>
                                                            <TableCell align="center">{row.e}</TableCell>
                                                            <TableCell align="center">{row.f}</TableCell>
                                                            <TableCell align="center">{row.g}</TableCell>
                                                            <TableCell align="center">{row.h}</TableCell>
                                                            <TableCell align="center">{row.i}</TableCell>
                                                            <TableCell align="center">{row.j}</TableCell>
                                                            <TableCell align="center">{row.k}</TableCell>
                                                            <TableCell align="center">{row.l}</TableCell>
                                                        </TableRow>
                                                    )
                                                })
                                            } */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                    </Container>
                    
                </div>
            </Fade>
            
        </div>
    )
}

export default NoticeInvoice
