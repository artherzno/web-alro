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
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'

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


import api from '../../services/webservice'
import { dateFormatTensiveMenu, formatNumber } from '../../utils/Utilities';
import { ButtonExport, OverlayLoading } from '../../components';
import { getAccount } from '../../utils/Auth';
import { Button, Modal } from '@material-ui/core';
import { Form, Formik } from 'formik';


function AdvanceInvoice(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [loaded, setLoaded] = useState(false);

    const [page, setPage] = useState(0)
    const [pageCount, setPageCount] = useState(10)
    const [resultList, setResultList] = useState([])

    const [startDate, setStartDate] = useState("")
    const [rentno, setRentNo] = useState("")
    const [invoiceno, setInvoiceno] = useState("")
    const [farmer, setFarmer] = useState("")
    const [startDateSelect, setStartDateSelect] = useState(null)
    const [printActive, setPrintActive] = useState(false)
    const [selectedData,setSelectedData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false)
    const [isExporting1, setIsExporting1] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const formikRef = useRef();

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
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        history.push('/');
                    });

            } catch (error) {
                
            }
        }

        setLoaded(true);
        fetchCheckLogin();

        getAdvanceInvoiceAll()

        // executed when component mounted
        isMounted.current = true;
        return () => {
            // executed when unmount
            isMounted.current = false;
        }
    }, [])


    function getAdvanceInvoiceAll() {

        const parameter = {
            start_date: startDate,
            rentno: rentno,
            invoiceno: invoiceno,
            farmer: farmer,
        }
        setIsLoading(true)
        api.getAdvanceInvoiceAll(parameter).then(response => {
            setResultList(response.data)
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    function getAdvanceInvoiceGetTotal(values) {

        const parameter = {
            start_date: moment(values.duedate,"YYYY-MM-DD").add(543,'years').format("YYYY-MM-DD"),
            rentno: values.rentno,
            invoiceno: values.invoiceno,
            farmer: values.idCard,
        }

        setIsLoading(true)
        api.getAdvanceInvoiceGetTotal(parameter).then(response => {
            setSelectedData(response.data.length > 0 ? response.data[0] : {})
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    function exportDebtSettlement() {

        const parameter = new FormData()
        parameter.append('FarmerName', farmer);
        parameter.append('Date', startDate);
        parameter.append('LoanNumber', rentno);
        parameter.append('StartYear', startDate);
        parameter.append('InvoiceNo', invoiceno);

        setIsExporting(true)

        api.exportDebtSettlement(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ใบแจ้งหนี้.xlsx');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    function getAdvanceInvoicePdf(values) {

        const parameter = new FormData()
        parameter.append('invoiceno', values.invoiceno);
        parameter.append('save_date', values.save_date);
        parameter.append('invoice_date', values.invoice_date);

        setIsExporting(true)

        api.getAdvanceInvoicePdf(parameter).then(response => {

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

    function getAdvanceInvoiceLabelPdf() {

        const parameter = new FormData()
        parameter.append('FarmerName', farmer);
        parameter.append('Date', startDate);
        parameter.append('LoanNumber', rentno);
        parameter.append('StartYear', startDate);
        parameter.append('InvoiceNo', invoiceno);

        setIsExporting1(true)

        api.getAdvanceInvoiceLabelPdf(parameter).then(response => {

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

    return (
        <div className="advanceinvoice-page">
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
                                <h1>ใบแจ้งหนี้ล่วงหน้า ก่อนครบกำหนดชำระ 30 วัน</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <form>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} md={3}>

                                            <MuiDatePicker label="วันที่ครบกำหนดชำระหนี้" value={startDateSelect} onChange={(event) => {
                                                setStartDate(moment(event).add(543, 'years').format("YYYY-MM-DD"))
                                                setStartDateSelect(event)

                                            }} />

                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={(e) => { setRentNo(e.target.value) }} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่ใบแจ้งหนี้" name="invoiceno" onChange={(e) => { setInvoiceno(e.target.value) }} />
                                        </Grid>
                                        {/* <Grid item xs={12} md={3}>
                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="farmer" onChange={(e) => { setFarmer(e.target.value) }} />
                                        </Grid> */}
                                        <Grid item xs={12} md={1}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { getAdvanceInvoiceAll() }} />
                                        </Grid>

                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    {/* <Grid item xs={12} md={2} className={`mg-t-10  ${printActive ? '' : 'btn-disabled'}`}> */}
                                    <Grid item xs={12} md={2}>
                                        <ButtonExport label="พิมพ์ใบแจ้งหนี้" handleButtonClick={() => { 
                                            // exportDebtSettlement() 
                                            setShowModal(true)

                                            }} loading={isExporting} />
                                    </Grid>
                                    <Grid item xs={12} md={2} >
                                        <ButtonExport label="พิมพ์ Lable" handleButtonClick={() => { getAdvanceInvoiceLabelPdf() }} loading={isExporting1} />
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
                                        <p className="box-blue-body">{formatNumber(selectedData['เงินครบชำระ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นค้างชำระ</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['เงินต้นค้างชำระ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['ดอกเบี้ยค้างชำระ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['เงินต้นคงเหลือ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['ดอกเบี้ยที่ต้องชำระ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['ดอกเบี้ยครบกำหนดชำระ'])}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">จำนวนเกษตรกร</p>
                                        <p className="box-blue-body">{formatNumber(selectedData['Total'])} ราย</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} className="mg-t-20">
                            <Grid item xs={12} md={12}>

                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow >
                                                <TableCell align="left">
                                                    <Checkbox
                                                        indeterminate={false}
                                                        checked={false}
                                                        onChange={() => { }}
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
                                        <TableBody>

                                            {resultList.length <= 0 && <TableRow>
                                                <TableCell colSpan={14} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>}
                                            {resultList.slice(page * pageCount, page * pageCount + pageCount).map((element, index) => {

                                                const isItemSelected = false

                                                return (
                                                    <TableRow 
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={index}
                                                        selected={isItemSelected}
                                                        hover={true} 
                                                        onClick={() => {
                                                            getAdvanceInvoiceGetTotal(element)
                                                        }}
                                                        >
                                                        <StyledTableCellLine padding="checkbox" align="left">
                                                            <Checkbox
                                                                color="primary"
                                                                checked={isItemSelected}
                                                                inputProps={{ 'aria-labelledby': element.ROWID }}
                                                            />
                                                        </StyledTableCellLine>
                                                        <StyledTableCellLine align="left" id={element.ROWID}>{element.ROWID}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.pv_code}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.pindex}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.projcode}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.projname}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.sex}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.firstname}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.lastname}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.start_date)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{element.rentno}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{dateFormatTensiveMenu(element.rentdate)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{formatNumber(element.principle)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{formatNumber(element.payrec)}</StyledTableCellLine>
                                                    </TableRow>
                                                )
                                            }
                                            )

                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={resultList.length}
                                    rowsPerPage={pageCount}
                                    page={page}
                                    onPageChange={(e, newPage) => {

                                        setPage(newPage)
                                    }}
                                    onRowsPerPageChange={(event) => {


                                        setPage(0)
                                        setPageCount(+event.target.value)
                                    }}
                                />
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
                    <div>พิมพ์ใบแจ้งหนี้</div>
                    <Box mt={1}>
                        <hr />
                    </Box>

                    <Box mt={3}>
                        <Formik
                            enableReinitialize={true}
                            innerRef={formikRef}
                            initialValues={{
                                invoiceno: '',
                                save_date: '',
                                invoice_date:'',
                                rentno:''
                            }}
                            validate={values => {
                                const requires = ['invoiceno', 'save_date', 'invoice_date','rentno']
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
                                getAdvanceInvoicePdf(values)

                            }}
                            render={(formik) => {

                                const { errors, status, values, touched, isSubmitting, setFieldValue, handleChange, handleBlur, submitForm, handleSubmit } = formik
                                return (
                                    <Form>
                                        <MuiDatePicker
                                            name="save_date"
                                            value={values.save_date}
                                            error={errors.save_date}
                                            helperText={errors.save_date}
                                            onChange={(event) => {
                                                setFieldValue("save_date", moment(event).format("YYYY-MM-DD"))
                                            }}
                                            onChangeDate={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="วันที่บันทึก"
                                            label="วันที่บันทึก"
                                        />
                                        <MuiTextfield
                                            name="invoiceno"
                                            value={values.invoiceno}
                                            error={errors.invoiceno}
                                            helperText={errors.invoiceno}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="เลขที่ใบแจ้งหนี้"
                                            label="เลขที่ใบแจ้งหนี้"
                                            requires
                                        />

                                        <MuiTextfield
                                            name="rentno"
                                            value={values.rentno}
                                            error={errors.rentno}
                                            helperText={errors.rentno}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="เลขที่สัญญา"
                                            label="เลขที่สัญญา"
                                            requires
                                        />

                                        <MuiDatePicker
                                            name="invoice_date"
                                            value={values.invoice_date}
                                            error={errors.invoice_date}
                                            helperText={errors.invoice_date}
                                            onChange={(event) => {
                                                setFieldValue("invoice_date", moment(event).format("YYYY-MM-DD"))
                                            }}
                                            onChangeDate={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="วันที่ออกใบแจ้งหนี้"
                                            label="วันที่ออกใบแจ้งหนี้"
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
                            <Button variant="outlined" onClick={() => {

                                setShowModal(false)

                            }}>ยกเลิก</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => {
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

export default AdvanceInvoice
