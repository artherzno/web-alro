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

import api from '../../services/webservice'
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
import { ButtonExport, OverlayLoading } from '../../components';
import { getAccount } from '../../utils/Auth';
import { Button, Modal, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';


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
    { field: 'projcode', headerName: 'รหัสโครงการ', width: 130, },
    { field: 'projname', headerName: 'ชื่อโครงการ', width: 150, },
    { field: 'sex', headerName: 'คำนำหน้า', width: 110, },
    { field: 'firstname', headerName: 'ชื่อ', width: 130, },
    { field: 'lastname', headerName: 'นามสกุล', width: 130, },
    { field: 'start_date', headerName: 'วันที่ประมวล', width: 125, },
    { field: 'rentno', headerName: 'เลขที่สัญญา', width: 130, },
    { field: 'loandate', headerName: 'วันที่กู้', width: 100, },
    { field: 'principle', headerName: 'เงินกู้', width: 130, },
    { field: 'payrec', headerName: 'เงินงวดชำระ', width: 130, },
    { field: 'credit', headerName: 'เงินค้างชำระ', width: 130, },
    { field: 'unpaid', headerName: 'เงินค้างงวด', width: 130, },
    { field: 'bcapital1', headerName: 'เงินต้นคงเหลือ', width: 140, },
    { field: 'binterest1', headerName: 'ดอกเบี้ย', width: 130, },
    { field: 'binterest', headerName: 'ดอกเบี้ย', width: 130, },
    { field: 'sinterest', headerName: 'ดอกเบี้ยสะสม', width: 140, },

];

// End All Data for DataGrid ---------------------------------------------//


function DebtReminder() {
    const history = useHistory();
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    const formikRef = useRef();
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
        item: '', // "",
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

    const [startDateSelect, setStartDateSelect] = useState(null)
    const [startDateSearch, setStartDateSearch] = useState('')
    const [isExporting, setIsExporting] = useState(false)
    const [isExporting1, setIsExporting1] = useState(false)
    const [isExporting2, setIsExporting2] = useState(false)
    const [isExporting3, setIsExporting3] = useState(false)
    const [isExporting4, setIsExporting4] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [numPrint, setNumPrint] = useState(1)


    useEffect(() => {
        setLoaded(true);

        // Check Login
        async function fetchCheckLogin() {
            try {

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

            } catch (error) {

            }
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
        console.log('dateSearch', inputSelectDate.yyyy + '-' + inputSelectDate.mm + '-' + inputSelectDate.dd)
        let searchDate;
        if (inputSelectDate.yyyy === '0000' || inputSelectDate.mm === '00' || inputSelectDate.dd === '00') {
            searchDate = '';
        } else {
            searchDate = (inputSelectDate.yyyy - 543) + '-' + inputSelectDate.mm + '-' + inputSelectDate.dd
        }

        setIsLoading(true);

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
            if (data.code === 0) {
                setErr(true);
                if (Object.keys(data.message).length !== 0) {
                    console.error(data)
                    if (typeof data.message === 'object') {
                        setErrMsg('ไม่สามารถทำรายการได้')
                    } else {
                        setErrMsg([data.message])
                    }
                } else {
                    setErrMsg(['ไม่สามารถทำรายการได้'])
                }
            } else {
                console.log('Get AdvanceInvoice Total:', data[0])
                setTableTotalResult(data[0])

            }

            setIsLoading(false);
        }

        ).catch(err => { console.log(err) })
            .finally(() => {


                setIsLoading(false);
            })
    }


    const getInvoiceGetAll = () => {
        // let dateSearch = inputDataSearch.start_date === null ? null : (parseInt(inputDataSearch.start_date.substring(0,4)) + 543)+(inputDataSearch.start_date.substring(4,10));
        setTableAllResult([])

        setIsLoading(true);

        console.log("startDateSearch", startDateSearch)
        axios({
            url: `${server_spkapi}/Invoice/GetAll`, //your url
            method: 'POST',
            data: {
                start_date: startDateSearch, // 2561-08-11
                item: amountProcess,
            }
        }).then(res => {
            console.log(res)
            let data = res.data;
            if (data.code === 0) {
                setErr(true);
                if (Object.keys(data.message).length !== 0) {
                    console.error(data)
                    if (typeof data.message === 'object') {
                        setErrMsg('ไม่สามารถทำรายการได้')
                    } else {
                        setErrMsg([data.message])
                    }
                } else {
                    setErrMsg(['ไม่สามารถทำรายการได้'])
                }
            } else if (data.length === 0) {
                setErr(true);
                setErrMsg(['ไม่พบข้อมูลในตารางใบแจ้งหนี้'])
                getInvoiceGetTotal()
            } else {
                console.log('Get InvoiceAll:', data)
                setTableAllResult(data)
                let dataArr = [];
                for (let i = 0; i < data.length; i++) {
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
                        start_date: (data[i].start_date === null) ? '' : (moment(data[i].start_date).format('DD/MM/YYYY').substring(0, 6)) + (parseInt(moment(data[i].start_date).format('DD/MM/YYYY').substring(6, 10)) + 543),
                        rentno: data[i].rentno,
                        loandate: (data[i].loandate === null) ? '' : (moment(data[i].loandate).format('DD/MM/YYYY').substring(0, 6)) + (parseInt(moment(data[i].loandate).format('DD/MM/YYYY').substring(6, 10)) + 543),
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

            setIsLoading(false);
        }
        ).catch(err => { console.log(err) })
            .finally(() => {
                setIsLoading(false)
            })
    }


    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
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

    function getDebtReminder_O1pdf(values) {

        const parameter = new FormData()
        parameter.append('BookNo', values.BookNo);
        parameter.append('BookDate', values.BookDate);
        // const account = getAccount()
        // parameter.append('UserName', account.username);

        setIsExporting(true)

        api.getDebtReminder_O1pdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    function getDebtReminder_O2pdf(values) {

        const parameter = new FormData()
        parameter.append('BookNo', values.BookNo);
        parameter.append('BookDate', values.BookDate);
        // const account = getAccount()
        // parameter.append('UserName', account.username);

        setIsExporting1(true)

        api.getDebtReminder_O2pdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting1(false)

        }).catch(error => {

            setIsExporting1(false)

        })

    }

    function getDebtReminder_ByContractpdf() {

        const parameter = new FormData()
        parameter.append('ProDate', amountProcess);
        parameter.append('ProTime', startDateSearch);
        const account = getAccount()
        parameter.append('UserName', account.username);

        setIsExporting2(true)

        api.getDebtReminder_ByContractpdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting2(false)

        }).catch(error => {

            setIsExporting2(false)

        })

    }

    function getDebtReminder_ByProjectpdf() {



        const parameter = new FormData()
        parameter.append('ProDate', amountProcess);
        parameter.append('ProTime', startDateSearch);

        const account = getAccount()
        parameter.append('UserName', account.username);


        setIsExporting3(true)

        api.getDebtReminder_ByProjectpdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank'
            document.body.appendChild(link);
            link.click();

            setIsExporting3(false)

        }).catch(error => {

            setIsExporting3(false)

        })

    }

    return (
        <div className="debtreminder-page">
            <OverlayLoading isLoading={isLoading} />
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

                                        <MuiDatePicker label="ตรวจสอบวันที่ประมวล" value={startDateSelect} onChange={(event) => {

                                            setStartDateSearch(moment(event).format("YYYY-MM-DD"))
                                            setStartDateSelect(event)

                                        }} />

                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiSelect label="ประมวลผลเกษตรกรครบกำหนดออกใบเตือน" listsValue={[1, 2,]} lists={['ครั้งที่ 1', 'ครั้งที่ 2']} value={amountProcess} onChange={(e) => { setAmountProcess(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getInvoiceGetAll} />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2} >
                                        <ButtonExport label="พิมพ์ใบเตือนครั้งที่ 1" handleButtonClick={() => {
                                            // getDebtReminder_O1pdf() 
                                            setShowModal(true)
                                            setNumPrint(1)

                                        }} loading={isExporting} />
                                        <ButtonExport label="พิมพ์ใบเตือนครั้งที่ 1 (ผู้ค้ำประกัน)" handleButtonClick={() => {
                                            // getDebtReminder_O1pdf() 
                                            setShowModal(true)
                                            setNumPrint(1)

                                        }} loading={isExporting} />
                                    </Grid>
                                    <Grid item xs={12} md={2} >
                                        <ButtonExport label="พิมพ์ใบเตือนครั้งที่ 2" handleButtonClick={() => { 
                                            // getDebtReminder_O2pdf() 
                                            setShowModal(true)
                                            setNumPrint(2)

                                            }} loading={isExporting1} />
                                        <ButtonExport label="พิมพ์ใบเตือนครั้งที่ 2 (ผู้ค้ำประกัน)" handleButtonClick={() => {
                                            // getDebtReminder_O2pdf() 
                                            setShowModal(true)
                                            setNumPrint(2)

                                        }} loading={isExporting1} />
                                    </Grid>
                                    <Grid item xs={12} md={3} >
                                        <ButtonExport label="พิมพ์สรุปใบเตือนรายสัญญา" handleButtonClick={() => { getDebtReminder_ByContractpdf() }} loading={isExporting2} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <ButtonExport label="พิมพ์สรุปใบเตือนรายโครงการ" handleButtonClick={() => { getDebtReminder_ByProjectpdf() }} loading={isExporting3} />
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
                                        <p className="box-blue-body">{!tableTotalResult.unpaid ? '0' : parseFloat(tableTotalResult.unpaid).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงค้าง</p>
                                        <p className="box-blue-body">{!tableTotalResult.credit ? '0' : parseFloat(tableTotalResult.credit).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.pint_1 ? '0' : parseFloat(tableTotalResult.pint_1).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                        <p className="box-blue-body">{!tableTotalResult.bcapital1 ? '0' : parseFloat(tableTotalResult.bcapital1).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.binterest ? '0' : parseFloat(tableTotalResult.binterest).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.pint_2 ? '0' : parseFloat(tableTotalResult.pint_2).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">จำนวนเกษตรกร</p>
                                        <p className="box-blue-body">{!tableTotalResult.Total ? '0' : parseFloat(tableTotalResult.Total).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} className="mg-t-20">
                            <Grid item xs={12} md={12}>
                                {/* Data Grid --------------------------------*/}
                                <div style={{}}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        autoHeight={true}
                                        disableColumnMenu={true}
                                        // checkboxSelection
                                        disableSelectionOnClick
                                        onRowSelected={(e) => console.log(e.api.current.getSelectedRows())}
                                    />
                                </div>
                            </Grid>


                        </Grid>
                    </Container>


                </div>
            </Fade>

            <Modal
                open={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>พิมพ์ใบเตือนครั้งที่ {numPrint}</div>
                    <Box mt={1}>
                        <hr />
                    </Box>
                    
                    <Box mt={3}>
                        <Formik
                            enableReinitialize={true}
                            innerRef={formikRef}
                            initialValues={{
                                BookNo: '',
                                BookDate: '',

                            }}
                            validate={values => {
                                const requires = ['BookNo','BookDate']
                                let errors = {};
                                requires.forEach(field => {
                                    if (!values[field]) {
                                        errors[field] = 'Required';
                                    }
                                });


                                return errors;
                            }}
                            onSubmit={(values, actions) => {

                                setShowModal(false)
                                if(numPrint === 1){
                                    getDebtReminder_O1pdf(values)
                                }else{
                                    getDebtReminder_O2pdf(values)
                                }

                            }}
                            render={(formik) => {

                                const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik
                                return (
                                    <Form>
                                        <MuiTextfield
                                            name="BookNo"
                                            value={values.BookNo}
                                            error={errors.BookNo}
                                            helperText={errors.BookNo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="เลขที่ใบเตือน"
                                            label="เลขที่ใบเตือน"
                                            requires
                                        />

                                        <MuiDatePicker
                                            name="BookDate"
                                            value={values.BookDate}
                                            error={errors.BookDate}
                                            helperText={errors.BookDate}
                                            onChange={(event) => {
                                                setFieldValue("BookDate", moment(event).format("YYYY-MM-DD"))
                                            }}
                                            onChangeDate={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="วันที่ออกใบเตือน"
                                            label="วันที่ออกใบเตือน"
                                        />

                                    </Form>
                                )
                            }}
                        />
                    </Box>

                    <Box mt={2} mb={2}>
                        <hr />
                    </Box>
                    
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button variant="outlined" onClick={() =>{
                                
                                setShowModal(false)

                            }}>ยกเลิก</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() =>{
                                formikRef.current.handleSubmit()
                               
                            }}>ยืนยัน</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </div>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export default DebtReminder
