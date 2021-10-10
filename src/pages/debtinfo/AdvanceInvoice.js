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
import { OverlayLoading } from '../../components';


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
    const [projName, setProjName] = useState("")
    const [farmer, setFarmer] = useState("")
    const [startDateSelect, setStartDateSelect] = useState(null)
    const [printActive, setPrintActive] = useState(false)
    const [selectedData,setSelectedData] = useState({})
    const [isLoading, setIsLoading] = useState(false);


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
                    }
                })
                .catch(err => {
                    console.log(err);
                    history.push('/');
                });
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
            projname: projName,
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
            projname: values.projname,
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
                                            <MuiTextfield label="โครงการที่กู้เงิน" name="projname" onChange={(e) => { setProjName(e.target.value) }} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="farmer" onChange={(e) => { setFarmer(e.target.value) }} />
                                        </Grid>
                                        <Grid item xs={12} md={1}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { getAdvanceInvoiceAll() }} />
                                        </Grid>

                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2} className={`mg-t-10  ${printActive ? '' : 'btn-disabled'}`}>
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




        </div>
    )
}

export default AdvanceInvoice
