import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/styles';
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
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear, 
    MuiTextfield,
    MuiDatePicker,
    MuiSelect,
    MuiCheckbox,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: 'inline-block',
      color: 'red',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));


// All Data for DataGrid & Table ---------------------------------------------//

const columns = [
    { field: 'ROWID', headerName: 'ลำดับ', width: 90, },
    { field: 'pv_code', headerName: 'รหัสจังหวัด', width: 130, },
    { field: 'nrec', headerName: 'ลำดับข้อมูล',  width: 90, },
    { field: 'projcode', headerName: 'รหัสโครงการ',  width: 130, },
    { field: 'projname', headerName: 'ชื่อโครงการ',  width: 150, },
    { field: 'sex', headerName: 'คำนำหน้า', width: 110, },
    { field: 'firstname', headerName: 'ชื่อ', width: 130, },
    { field: 'lastname', headerName: 'นามสกุล', width: 130, },
    { field: 'start_date', headerName: 'วันที่ประมวล', width: 125,},
    { field: 'rentno', headerName: 'เลขที่สัญญา', width: 130,},
    { field: 'loandate', headerName: 'วันที่กู้', width: 100,},
    { field: 'principle', headerName: 'เงินกู้', width: 130,},
    { field: 'payrec', headerName: 'เงินงวดชำระ', width: 130,},
    { field: 'credit', headerName: 'เงินค้างชำระ', width: 130,},
    { field: 'unpaid', headerName: 'เงินค้างงวด', width: 130,},
    { field: 'bcapital1', headerName: 'เงินต้นคงเหลือ', width: 140,},
    { field: 'binterest1', headerName: 'ดอกเบี้ย', width: 130,},
    { field: 'binterest', headerName: 'ดอกเบี้ย', width: 130,},
    { field: 'sinterest', headerName: 'ดอกเบี้ยสะสม', width: 140,},
    
  ];

// End All Data for DataGrid ---------------------------------------------//


function DebtReminder() {
    const history = useHistory();
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [inputDataSearch, setInputDataSearch] = useState({
        start_date: null, // "2561-08-11",
        item : '', // "",
    })
    const [amountProcess, setAmountProcess] = useState(1)

    // Variable for Checkbox in Table
    const [tableAllResult, setTableAllResult] = useState([])
    const [tableTotalResult, setTableTotalResult] = useState([])
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const [rows, setRows] = useState([])

    const rowCount = rows.length;
    const numSelected = selected.length;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dateSearch, setDateSearch] = useState('0000-00-00');
    const [printActive, setPrintActive] = useState(false)

    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

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

    const getInvoiceGetTotal = () => {
        // let dateSearch = (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        // setDateSearch(inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        console.log('dateSearch',inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        let searchDate;
        if(inputSelectDate.yyyy === '0000' || inputSelectDate.mm === '00' || inputSelectDate.dd === '00') {
            searchDate = '';
        } else {
            searchDate = (inputSelectDate.yyyy-543)+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd
        }
        
        axios({
            url: `${server_spkapi}/Invoice/GetTotal`, //your url
            method: 'POST',
            data: {
                start_date: searchDate, // 2561-08-11
                item: amountProcess,
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


    const getInvoiceGetAll = () => {
        // let dateSearch = inputDataSearch.start_date === null ? null : (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        setTableAllResult([])
        // setDateSearch(inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        console.log('dateSelectSearch',inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        let searchDate;
        if(inputSelectDate.yyyy === '0000' || inputSelectDate.mm === '00' || inputSelectDate.dd === '00') {
            searchDate = '';
        } else {
            searchDate = (inputSelectDate.yyyy-543)+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd;
        }
        console.log('dateSearch',searchDate)

        if(searchDate === '' ) {
            setErr(true);
            setErrMsg('กรุณาใส่วันที่')
        } else {
            axios({
                url: `${server_spkapi}/Invoice/GetAll`, //your url
                method: 'POST',
                data: {
                    start_date: searchDate, // 2561-08-11
                    item: amountProcess,
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
                    } else if(data.length === 0) {
                        setErr(true);
                        setErrMsg(['ไม่พบข้อมูลในตารางใบแจ้งหนี้'])
                        getInvoiceGetTotal()
                    } else {
                        console.log('Get InvoiceAll:',data)
                        setTableAllResult(data)
                        let dataArr = [];
                        for(let i=0; i<data.length; i++) {
                            dataArr.push({
                                id: data[i].ROWID,
                                ROWID: data[i].ROWID,
                                pv_code: data[i].pv_code,
                                nrec: data[i].nrec,
                                projcode: data[i].projcode,
                                projname: data[i].projname,
                                sex: data[i].sex,
                                firstname: data[i].firstname,
                                lastname: data[i].lastname,
                                start_date: (data[i].start_date === null) ? '' : (moment(data[i].start_date).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(data[i].start_date).format('DD/MM/YYYY').substring(6,10)) + 543),
                                rentno: data[i].rentno,
                                loandate: (data[i].loandate === null) ? '' : (moment(data[i].loandate).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(data[i].loandate).format('DD/MM/YYYY').substring(6,10)) + 543),
                                principle: data[i].principle,
                                payrec: data[i].payrec,
                                credit: data[i].credit,
                                unpaid: data[i].unpaid,
                                bcapital1: data[i].bcapital1,
                                binterest1: data[i].binterest1,
                                binterest: data[i].binterest,
                                sinterest: data[i].sinterest,
                            })
                        }
                        setRows(dataArr)

                        getInvoiceGetTotal()
                        setPrintActive(true)
                        
                    }
                }
            ).catch(err => { console.log(err) })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            })
        }
    }


    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
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
        <div className="debtreminder-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ใบเตือนหนี้ครั้งที่ 1, 2</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* <MuiDatePicker label="ตรวจสอบวันที่ประมวล" defaultValue="" /> */}
                                        <p>ตรวจสอบวันที่ประมวล</p>
                                        <div className="select-date-option">
                                            <MuiSelectDay label="" name="dd" value={inputSelectDate.dd} onChange={handleSelectDate} />
                                            <MuiSelectMonth label="" name="mm" value={inputSelectDate.mm} onChange={handleSelectDate} />
                                            <MuiSelectYear label="" name="yyyy" value={inputSelectDate.yyyy} onChange={handleSelectDate} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiSelect label="ประมวลผลเกษตรกรครบกำหนดออกใบเตือน" listsValue={[1,2,]} lists={['ครั้งที่ 1','ครั้งที่ 2']} value={amountProcess} onChange={(e)=>{setAmountProcess(e.target.value)}} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getInvoiceGetAll} />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2} className="mg-t-10">
                                        <ButtonFluidPrimary label="พิมพ์ใบเตือนครั้งที่ 1" />
                                    </Grid>
                                    <Grid item xs={12} md={2} className="mg-t-10">
                                        <ButtonFluidPrimary label="พิมพ์ใบเตือนครั้งที่ 2" />
                                    </Grid>
                                    <Grid item xs={12} md={3} className="mg-t-10">
                                        <ButtonFluidPrimary label="พิมพ์สรุปใบเตือนรายสัญญา" />
                                    </Grid>
                                    <Grid item xs={12} md={3} className="mg-t-10">
                                        <ButtonFluidPrimary label="พิมพ์สรุปใบเตือนรายโครงการ" />
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
                                        <p className="box-blue-body">{!tableTotalResult.unpaid ? '0' : parseFloat(tableTotalResult.unpaid).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงค้าง</p>
                                        <p className="box-blue-body">{!tableTotalResult.credit ? '0' : parseFloat(tableTotalResult.credit).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.pint_1 ? '0' : parseFloat(tableTotalResult.pint_1).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                        <p className="box-blue-body">{!tableTotalResult.bcapital1 ? '0' : parseFloat(tableTotalResult.bcapital1).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.binterest ? '0' : parseFloat(tableTotalResult.binterest).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.pint_2 ? '0' : parseFloat(tableTotalResult.pint_2).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">จำนวนเกษตรกร</p>
                                        <p className="box-blue-body">{!tableTotalResult.Total ? '0' : parseFloat(tableTotalResult.Total).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} className="mg-t-20">
                            <Grid item xs={12} md={12}>
                                {/* Data Grid --------------------------------*/}
                                    <div style={{ }}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            pageSize={10}
                                            autoHeight={true}
                                            disableColumnMenu={true}
                                            checkboxSelection
                                            disableSelectionOnClick
                                            onRowSelected={(e) => console.log(e.api.current.getSelectedRows())}
                                        />
                                    </div>
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
                                                <TableCell align="left">
                                                <Checkbox
                                                    color="primary"
                                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                                    checked={rowCount > 0 && numSelected === rowCount}
                                                    onChange={handleSelectAllClick}
                                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                                />
                                                </TableCell>
                                                <TableCell align="left">ลำดับ</TableCell>
                                                <TableCell align="left">รหัสจังหวัด</TableCell>
                                                <TableCell align="left">ลำดับข้อมูล</TableCell>
                                                <TableCell align="left">รหัสโครงการ</TableCell>
                                                <TableCell align="left">ชื่อโครงการ</TableCell>
                                                <TableCell align="left">คำนำหน้า</TableCell>
                                                <TableCell align="left">ชื่อ</TableCell>
                                                <TableCell align="left">นามสกุล</TableCell>
                                                <TableCell align="left">วันที่ประมวล</TableCell>
                                                <TableCell align="left">เลขที่สัญญา</TableCell>
                                                <TableCell align="left">วันที่กู้</TableCell>
                                                <TableCell align="left">เงินกู้</TableCell>
                                                <TableCell align="left">เงินงวดชำระ</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={14} align="left">ไม่พบข้อมูล</TableCell>
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
                                                            <TableCell padding="checkbox" align="left">
                                                                <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                            </TableCell>
                                                            <TableCell align="left" id={labelId}>{row.id}</TableCell>
                                                            <TableCell align="left">{row.a}</TableCell>
                                                            <TableCell align="left">{row.b}</TableCell>
                                                            <TableCell align="left">{row.c}</TableCell>
                                                            <TableCell align="left">{row.d}</TableCell>
                                                            <TableCell align="left">{row.e}</TableCell>
                                                            <TableCell align="left">{row.f}</TableCell>
                                                            <TableCell align="left">{row.g}</TableCell>
                                                            <TableCell align="left">{row.h}</TableCell>
                                                            <TableCell align="left">{row.i}</TableCell>
                                                            <TableCell align="left">{row.j}</TableCell>
                                                            <TableCell align="left">{row.k}</TableCell>
                                                            <TableCell align="left">{row.l}</TableCell>
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

export default DebtReminder
