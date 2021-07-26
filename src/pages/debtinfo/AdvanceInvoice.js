import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';

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
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiTextfieldCurrency,
    MuiDatePicker,
    MuiSelect,
    MuiCheckbox,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

  
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

//   ROWID: 1
// duedate: "2018-08-11T00:00:00"
// firstname: "สำรวย"
// lastname: "พรมเวียง"
// payrec: 0
// pindex: "PBUN00045/25600000/00001"
// principle: 20000
// projcode: "00562"
// projname: "ปัจจัยการผลิต60"
// pv_code: "PBUN"
// rentdate: "2017-08-11T00:00:00"
// rentno: "00045/2560"
// sex: "น.ส."
// start_date: "2017-08-15T00:00:00"

  const columns = [
    { field: 'ROWID', headerName: 'ลำดับ', width: 130 },
    { field: 'firstName', headerName: 'รหัสจังหวัด', width: 130 },
    { field: 'firstName', headerName: 'ลำดับข้อมูล', width: 130 },
    { field: 'firstName', headerName: 'รหัสโครงการ', width: 130 },
    { field: 'firstName', headerName: 'ชื่อโครงการ', width: 130 },
    { field: 'firstName', headerName: 'คำนำหน้า', width: 130 },
    { field: 'firstName', headerName: 'ชื่อ', width: 130 },
    { field: 'firstName', headerName: 'นามสกุล', width: 130 },
    { field: 'firstName', headerName: 'วันที่ประมวล', width: 130 },
    { field: 'firstName', headerName: 'เลขที่สัญญา', width: 130 },
    { field: 'firstName', headerName: 'วันที่กู้', width: 130 },
    { field: 'firstName', headerName: 'เงินกู้', width: 130 },
    { field: 'firstName', headerName: 'เงินงวดชำระ', width: 130 },
    
  ];

// End All Data for DataGrid ---------------------------------------------//


function AdvanceInvoice() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [inputDataSearch, setInputDataSearch] = useState({
        start_date: null, // "2561-08-11",
        rentno : '', // "",
        projname : '', //"",
        farmer : '', // ""
    })
    

    // Variable for Checkbox in Table
    const [tableResult, setTableResult] = useState([])
    const [tableTotalResult, setTableTotalResult] = useState([])
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const rowCount = rows.length;
    const numSelected = selected.length;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setLoaded(true);

        // Check Login
        async function fetchCheckLogin() {
            const res = await fetch(`${server_hostname}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "token": token
                }
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsLoaded(true);
                    setErr(true);
                    history.push('/');
                });
        }

        setLoaded(true);
        fetchCheckLogin();

        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }
    }, [])

    const handleChangePage = (event, newPage) => {
        // console.log('newPage', newPage)
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getAdvanceInvoiceGetTotal = () => {
        let dateSearch = (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        console.log('dateSearch',dateSearch)
        
        axios({
            url: `${server_spkapi}/AdvanceInvoice/GetTotal`, //your url
            method: 'POST',
            data: {
                start_date: dateSearch, // 2561-08-11
            }
        }).then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0) {
                    setErr(true);
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            setErrMsg('ไม่สามารถทำรายการได้')
                        } else {
                            setErrMsg([data.message])
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    console.log('Get AdvanceInvoice Total:',data[0])
                    setTableTotalResult(data[0])
                    
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
        })
    }


    const getAdvanceInvoiceGetAll = () => {
        let dateSearch = (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        console.log('dateSearch',dateSearch)
        
        axios({
            url: `${server_spkapi}/AdvanceInvoice/GetAll`, //your url
            method: 'POST',
            data: {
                start_date: dateSearch, // 2561-08-11
                rentno : "",
                projname :"",
                farmer : ""
            }
        }).then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0) {
                    setErr(true);
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            setErrMsg('ไม่สามารถทำรายการได้')
                        } else {
                            setErrMsg([data.message])
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    console.log('Get AdvanceInvoice:',data)
                    setTableResult(data)

                    getAdvanceInvoiceGetTotal()
                    
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
        })
    }


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
        <div className="advanceinvoice-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ใบแจ้งหนี้ล่วงหน้า ก่อนครบกำหนดชำระ 30 วัน</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="วันที่ครบกำหนดชำระหนี้" name="start_date" value={inputDataSearch.start_date === 'Invalid date' ? null : inputDataSearch.start_date} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, start_date: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญา" name="start_date" value={inputDataSearch.start_date} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="โครงการที่กู้เงิน" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getAdvanceInvoiceGetAll} />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2} className="mg-t-10 btn-disabled">
                                        <ButtonFluidPrimary label="พิมพ์ใบแจ้งหนี้" />
                                    </Grid>
                                    <Grid item xs={12} md={2} className="mg-t-10 btn-disabled">
                                        <ButtonFluidPrimary label="พิมพ์ Lable" />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20 mg-b-20">
                                <Divider />
                            </Grid>
                        </Grid>


                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Box className="box-blue">
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินครบชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.เงินครบชำระ ? '0' : parseFloat(tableTotalResult.เงินครบชำระ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.เงินต้นค้างชำระ ? '0' : parseFloat(tableTotalResult.เงินต้นค้างชำระ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยค้างชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยค้างชำระ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                        <p className="box-blue-body">{!tableTotalResult.เงินต้นคงเหลือ ? '0' : parseFloat(tableTotalResult.เงินต้นคงเหลือ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยที่ต้องชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยที่ต้องชำระ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยครบกำหนดชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยครบกำหนดชำระ).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">จำนวนเกษตรกร</p>
                                        <p className="box-blue-body">{!tableTotalResult.Total ? '0' : parseInt(tableTotalResult.Total).toLocaleString('en-US')} ราย</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    <MuiCheckbox label="&nbsp;"  />
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
                                        <TableBody>
                                            {
                                                tableResult.length ? 
                                                    (rowsPerPage > 0
                                                        ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : tableResult
                                                    ).map((cell,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell align="center"></TableCell>
                                                        <TableCell align="center">{cell.ROWID}</TableCell>
                                                        <TableCell align="center">{cell.pv_code}</TableCell>
                                                        <TableCell align="center">{cell.pindex}</TableCell>
                                                        <TableCell align="center">{cell.projcode}</TableCell>
                                                        <TableCell align="center">{cell.projname}</TableCell>
                                                        <TableCell align="center">{cell.sex}</TableCell>
                                                        <TableCell align="center">{cell.firstname}</TableCell>
                                                        <TableCell align="center">{cell.lastname}</TableCell>
                                                        <TableCell align="center">{(moment(cell.start_date).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(cell.start_date).format('DD/MM/YYYY').substring(6,10)) + 543)}</TableCell>
                                                        {/* <TableCell align="center">{moment(cell.start_date).format('DD/MM/YYYY')}</TableCell> */}
                                                        <TableCell align="center">{cell.rentno}</TableCell>
                                                        <TableCell align="center">{(moment(cell.rentdate).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(cell.rentdate).format('DD/MM/YYYY').substring(6,10)) + 543)}</TableCell>
                                                        {/* <TableCell align="center">{cell.rentdate}</TableCell> */}
                                                        <TableCell align="center">{cell.principle === null ? '0' : cell.principle.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                                        <TableCell align="center">{cell.payrec === null ? '0' : cell.payrec.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                                    </TableRow>
                                                    
                                                ))
                                                : 
                                                <TableRow>
                                                    <TableCell colSpan={14} align="center">ไม่พบข้อมูล</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    {
                                        tableResult.length ? 
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                                component="div"
                                                count={tableResult.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                labelRowsPerPage="แสดงจำนวนแถว"
                                            />
                                        : 
                                        ''
                                    }
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

export default AdvanceInvoice
