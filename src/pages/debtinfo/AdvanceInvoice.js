import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiTextfieldCurrency,
    MuiDatePicker,
    MuiDatePickerValidate,
    MuiSelect,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiTextNumber,
    MuiCheckbox,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

  const columns = [
    { field: 'ROWID', headerName: 'ลำดับ', width: 90, },
    { field: 'pv_code', headerName: 'รหัสจังหวัด', width: 130, },
    { field: 'pindex', headerName: 'ลำดับข้อมูล',  width: 230, },
    { field: 'projcode', headerName: 'รหัสโครงการ',  width: 130, },
    { field: 'projname', headerName: 'ชื่อโครงการ',  width: 150, },
    { field: 'sex', headerName: 'คำนำหน้า', width: 110, },
    { field: 'firstname', headerName: 'ชื่อ', width: 130, },
    { field: 'lastname', headerName: 'นามสกุล', width: 130, },
    { field: 'start_date', headerName: 'วันที่ประมวล', width: 125,},
    { field: 'rentno', headerName: 'เลขที่สัญญา', width: 130,},
    { field: 'duedate', headerName: 'วันที่กู้', width: 100,},
    { field: 'principle', headerName: 'เงินกู้', width: 130,},
    { field: 'payrec', headerName: 'เงินงวดชำระ', width: 130,},
    
  ];

// End All Data for DataGrid ---------------------------------------------//


function AdvanceInvoice(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    const { handleSubmit, control } = useForm();

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
        rentno : '', // "",
        projname : '', //"",
        farmer : '', // ""
    })
    
    const [optionsDay, setOptionsDay] = useState('00');
    const [optionsmonth, setOptionsmonth] = useState('00');
    const [optionsYear, setOptionsYear] = useState('0000');

    // Variable for Checkbox in Table
    const [tableResult, setTableResult] = useState([])
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

    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
    }

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
        // let dateSearch = (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        // setDateSearch(inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        console.log('dateSearch',inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        let searchDate;
        if(inputSelectDate.yyyy === '0000' || inputSelectDate.mm === '00' || inputSelectDate.dd === '00') {
            searchDate = '';
        } else {
            searchDate = inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd
        }
        
        axios({
            url: `${server_spkapi}/AdvanceInvoice/GetTotal`, //your url
            method: 'POST',
            data: {
                start_date: searchDate, // 2561-08-11
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
        // let dateSearch = inputDataSearch.start_date === null ? null : (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        setTableResult([])
        // setDateSearch(inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        console.log('dateSelectSearch',inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd)
        let searchDate;
        if(inputSelectDate.yyyy === '0000' || inputSelectDate.mm === '00' || inputSelectDate.dd === '00') {
            searchDate = '';
        } else {
            searchDate = inputSelectDate.yyyy+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd;
        }
        console.log('dateSearch',searchDate)

        if(searchDate === '' ) {
            setErr(true);
            setErrMsg('กรุณาใส่วันที่')
        } else {
            axios({
                url: `${server_spkapi}/AdvanceInvoice/GetAll`, //your url
                method: 'POST',
                data: {
                    start_date: searchDate, // 2561-08-11
                    rentno : inputDataSearch.rentno,
                    projname : inputDataSearch.projname,
                    farmer : inputDataSearch.farmer
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
                        getAdvanceInvoiceGetTotal()
                    } else {
                        console.log('Get AdvanceInvoice:',data)
                        setTableResult(data)
                        let dataArr = [];
                        for(let i=0; i<data.length; i++) {
                            dataArr.push({
                                id: data[i].ROWID,
                                ROWID: data[i].ROWID,
                                pv_code: data[i].pv_code,
                                pindex: data[i].pindex,
                                projcode: data[i].projcode,
                                projname: data[i].projname,
                                sex: data[i].sex,
                                firstname: data[i].firstname,
                                lastname: data[i].lastname,
                                start_date: (data[i].start_date === null) ? '' : (moment(data[i].start_date).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(data[i].start_date).format('DD/MM/YYYY').substring(6,10)) + 543),
                                rentno: data[i].rentno,
                                duedate: (data[i].duedate === null) ? '' : (moment(data[i].duedate).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(data[i].duedate).format('DD/MM/YYYY').substring(6,10)) + 543),
                                principle: data[i].principle,
                                payrec: data[i].payrec,
                            })
                        }
                        setRows(dataArr)

                        getAdvanceInvoiceGetTotal()
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


    // Select CheckBox in Table
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelecteds = rows.map((n) => n.ROWID);
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

    const handleInputDataSearch = (event) => {
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputDataSearch({
                    ...inputDataSearch,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputDataSearch({
                    ...inputDataSearch,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputDataSearch({
                    ...inputDataSearch,
                    [event.target.name]: event.target.value
                })

            } else {
                setInputDataSearch({
                    ...inputDataSearch,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputDataSearch({
                ...inputDataSearch,
                [event.target.name]: event.target.value
            })
        }
    }


    const handlePrintPDF = () => {
        let printDate = (inputSelectDate.yyyy - 543)+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd
console.log('printDAte',printDate.toString())
        const startDateValue = new FormData()
        startDateValue.append('startDate', printDate.toString());
        let url = `${siteprint}/api/ExportServices/ExportPrintInvoiceAll`; //your url

        axios.post(url, startDateValue,
            {
                headers:
                {
                    'Content-Disposition': "attachment; filename=template.xlsx",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ใบแจ้งหนี้ล่วงหน้าก่อนครบกำหนดชำระ30วัน.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้');  })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    // End Select Checkbox

    
    const handleSubmitSearch = (event) => {
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

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        // history.push('/manageinfo/searchmember');

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
                            <form onSubmit={handleSubmit(handleSubmitSearch)}>
                                <Grid container spacing={2}>
                                    {/* <Grid item xs={12} md={2}><Controller
                                            name="firstName"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <MuiDatePickerValidate
                                                label="First Name"
                                                value={value} 
                                                onChange={onChange}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                            />
                                            )}
                                            rules={{ required: 'First name required' }}
                                        />   
                                    </Grid> */}
                                    <Grid item xs={12} md={3}>
                                        <p>วันที่ครบกำหนดชำระหนี้</p>
                                        <div className="select-date-option">
                                            <MuiSelectDay label="" name="dd" value={inputSelectDate.dd} onChange={handleSelectDate} />
                                            <MuiSelectMonth label="" name="mm" value={inputSelectDate.mm} onChange={handleSelectDate} />
                                            <MuiSelectYear label="" name="yyyy" value={inputSelectDate.yyyy} onChange={handleSelectDate} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="เลขที่สัญญา" name="rentno" value={inputDataSearch.rentno} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="โครงการที่กู้เงิน" name="projname" value={inputDataSearch.projname} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputDataSearch.farmer} name="farmer" onInput = {handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getAdvanceInvoiceGetAll} />
                                    </Grid>

                                </Grid>
                            </form>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2} className={`mg-t-10  ${printActive ? '' : 'btn-disabled'}`}>
                                        <ButtonFluidPrimary label="พิมพ์ใบแจ้งหนี้" onClick={handlePrintPDF} />
                                    </Grid>
                                    <Grid item xs={12} md={2} className="mg-t-10 btn-disabled">
                                        <ButtonFluidPrimary label="พิมพ์ Lable"/>
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


                        <Grid container spacing={2} className="mg-t-20">
                            <Grid item xs={12} md={12}>

                                {/* <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                <Checkbox
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
                                        <TableBody>
                                            {
                                                tableResult.length ? 
                                                    (rowsPerPage > 0
                                                        ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        : tableResult
                                                    ).map((row,i) => { 
                                                        const isItemSelected = isSelected(row.ROWID);
                                                        const labelId = `enhanced-table-checkbox-${i}`;
                                                    
                                                        return(
                                                            <TableRow hover
                                                            onClick={(event) => handleClickSelect(event, row.ROWID)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            key={i}
                                                            selected={isItemSelected}>
                                                                <TableCell padding="checkbox" align="center">
                                                                    <Checkbox
                                                                    color="primary"
                                                                    checked={isItemSelected}
                                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                                />
                                                                </TableCell>
                                                                <TableCell align="center" id={labelId}>{row.ROWID}</TableCell>
                                                            <TableCell align="center">{row.pv_code}</TableCell>
                                                            <TableCell align="center">{row.pindex}</TableCell>
                                                            <TableCell align="center">{row.projcode}</TableCell>
                                                            <TableCell align="center">{row.projname}</TableCell>
                                                            <TableCell align="center">{row.sex}</TableCell>
                                                            <TableCell align="center">{row.firstname}</TableCell>
                                                            <TableCell align="center">{row.lastname}</TableCell>
                                                            <TableCell align="center">{(moment(row.start_date).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(row.start_date).format('DD/MM/YYYY').substring(6,10)) + 543)}</TableCell>
                                                            <TableCell align="center">{row.rentno}</TableCell>
                                                            <TableCell align="center">{(moment(row.rentdate).format('DD/MM/YYYY').substring(0,6))+(parseInt(moment(row.rentdate).format('DD/MM/YYYY').substring(6,10)) + 543)}</TableCell>
                                                            <TableCell align="center">{row.principle === null ? '0' : row.principle.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                                            <TableCell align="center">{row.payrec === null ? '0' : row.payrec.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                                        </TableRow>
                                                    )}
                                                )
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
                                } */}
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
                                                {/* <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" /> */}
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่ใบเตือนหนี้"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="คำนวณสิ้นปีงบประมาณ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* <MuiDatePicker label="วันที่ประมวลผล"  defaultValue="2017-05-24" /> */}
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

            <Dialog
                open={success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{successMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={err}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                
                    <div className="dialog-error">
                        <p className="txt-center txt-black">{errMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
            
        </div>
    )
}

export default AdvanceInvoice
