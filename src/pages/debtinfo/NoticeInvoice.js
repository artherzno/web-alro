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
import api from '../../services/webservice'
import { dateFormatTensiveMenu, formatNumber } from '../../utils/Utilities';
import { ButtonExport, ButtonExportExcel, OverlayLoading } from '../../components';
import { getAccount } from '../../utils/Auth';

// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
    { a: 'RIET16310/00002', b: '13/07/2020', c: '13/07/2020', d: '6308/000006', f: '53,071,235.10', g: '00137/ใบแจ้งหนี้ 6/63', h: 'กันยายน', i: '2564', j: '4' },
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

    const [loaded, setLoaded] = useState(true);

    // Variable for Checkbox in Table
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const rowCount = rows.length;
    const numSelected = selected.length;
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(10)
    const [isLoading, setIsLoading] = useState(false);
    const [resultList, setResultList] = useState([])
    const [mDate, setMdate] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [paramFechtData, setParamFechtData] = useState({
        Username: "",
        mDate: "",
        voucher: "",
        mDate: "",
        ref_id1: "",
        ref_id: "",
        farmer: "",
        rentno: "",
        paidstatus: "",
        item: "",
        StartDate: "",
        orderBy: ''
    })
    const [isExporting, setIsExporting] = useState(false)

    useEffect(() => {
        // setLoaded(true);
        // getInvoiceAlert()

    }, [])




    function getInvoiceAlert() {

        setIsLoading(true)
        api.getInvoiceAlert(paramFechtData).then(response => {

            setResultList(response.data.data)
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    function setDataParams(key, value) {

        const paramFechtDataNew = paramFechtData
        paramFechtDataNew[key] = value
        setParamFechtData(paramFechtDataNew)

    }

    function exportNoticeInvoice(){

        const parameter = new FormData()
        parameter.append('mDate', paramFechtData.mDate);
        parameter.append('voucher', paramFechtData.voucher);
        parameter.append('ref_id1', paramFechtData.ref_id1);
        parameter.append('ref_id', paramFechtData.ref_id);
        parameter.append('farmer', paramFechtData.farmer);
        parameter.append('rentno', paramFechtData.rentno);
        parameter.append('paidstatus', paramFechtData.paidstatus);
        parameter.append('item', paramFechtData.item);
        parameter.append('StartDate', paramFechtData.StartDate);
        parameter.append('orderBy', paramFechtData.orderBy);
        
       


        setIsExporting(true)

        api.exportNoticeInvoice(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'รายงานใบเตือนหนี้ค้างชำระ.xlsx');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    return (
        <div className="noticeinvoice-page">

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
                                <h1>รายงานใบเตือนหนี้ค้างชำระ</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="รหัสบันทึกใบเตือน" defaultValue="" onChange={(e) => setDataParams('voucher', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="วันที่บันทึกใบเตือน" value={mDate} defaultValue="" onChange={value => {
                                            setDataParams('mDate', value.format("YYYY-MM-DD"))
                                            setMdate(value)
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="วันที่ประมวลผล" defaultValue="" value={startDate} onChange={value => {
                                            setDataParams('StartDate', value.format("YYYY-MM-DD"))
                                            setStartDate(value)
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="เลขที่ใบแจ้งหนี้" defaultValue="" onChange={(e) => setDataParams('ref_id1', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" onChange={(e) => setDataParams('farmer', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <MuiTextfield label="เลขที่สัญญา" defaultValue="" onChange={(e) => setDataParams('rentno', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => { getInvoiceAlert() }} />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="แสดงสถานะการชำระเงิน" listsValue={['', 'True', 'False']} lists={['ทั้งหมด', 'ชำระแล้ว', 'ยังไม่ชำระ']} onChange={e => setDataParams('paidstatus', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="การเตือน" listsValue={[0, 1, 2]} lists={['ทั้งหมด', 'ครั้งที่ 1', 'ครั้งที่ 2']} onChange={e => setDataParams('item', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="จัดเรียงตาม" listsValue={['', 'ref_id', 'mdate', 'paiddate']} lists={['เลือก', 'เลขที่ใบเตือน', 'วันที่ออกหนังสือเตือน', 'วันที่รับเงิน']} onChange={e => setDataParams('orderBy', e.target.value)} />
                                    </Grid>
                                    <Grid item xs={12} md={2}></Grid>
                                    <Grid item xs={12} md={4} className="txt-right">
                                        <label>&nbsp;</label>
                                        <ButtonExportExcel label="Export to Excel" handleButtonClick={() => { exportNoticeInvoice() }} loading={isExporting} />

                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table-box  mg-t-10">
                                    <TableContainer >
                                        <Table >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">รหัสบันทึก</TableCell>
                                                    <TableCell align="left">วันที่บันทึก</TableCell>
                                                    <TableCell align="left">วันที่คำนวณ</TableCell>
                                                    <TableCell align="left">รหัสจังหวัด</TableCell>
                                                    <TableCell align="left">ชื่อ</TableCell>
                                                    <TableCell align="left">บัตรประชาชน</TableCell>
                                                    <TableCell align="left">โครงการ</TableCell>
                                                    <TableCell align="left">ชื่อโครงการ</TableCell>
                                                    <TableCell align="left">วันที่ยืม</TableCell>
                                                    <TableCell align="left">ใบเตือน</TableCell>
                                                    <TableCell align="left">สัญญาเลขที่</TableCell>
                                                    <TableCell align="left">วันครบชำระ</TableCell>
                                                    <TableCell align="left">งวดชำระ</TableCell>
                                                    <TableCell align="left">เงินต้น</TableCell>
                                                    <TableCell align="left">ดอกเบี้ย</TableCell>
                                                    <TableCell align="left">ดอกเบี้ยค้างชำระ</TableCell>
                                                    <TableCell align="left">ดอกเบี้ยชำระ</TableCell>
                                                    <TableCell align="left">Mindex</TableCell>
                                                    <TableCell align="left">จำนวนเงินจ่าย</TableCell>
                                                    <TableCell align="left">วันที่จ่าย</TableCell>
                                                    <TableCell align="left">Ref_id1</TableCell>
                                                    <TableCell align="left">Ref_date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>{/* // clear mockup */}

                                                {resultList.length <= 0 && <TableRow>
                                                    <TableCell colSpan={22} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>}
                                               
                                                {resultList.slice(page * count, page * count + count).map((element, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell align="left">{element.voucher}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.mdate)}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.start_date)}</TableCell>
                                                            <TableCell align="left">{element.pv_code}</TableCell>
                                                            <TableCell align="left">{element.aname}</TableCell>
                                                            <TableCell align="left">{element.farmer}</TableCell>
                                                            <TableCell align="left">{element.projcode}</TableCell>
                                                            <TableCell align="left">{element.projname}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.rentdate)}</TableCell>
                                                            <TableCell align="left">{element.ref_id}</TableCell>
                                                            <TableCell align="left">{element.rentno}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.duedate)}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.date_e)}</TableCell>
                                                            <TableCell align="left">{formatNumber(element['เงินต้น'])}</TableCell>
                                                            <TableCell align="left">{element['ดอกเบี้ย']}</TableCell>
                                                            <TableCell align="left">{element['ดอกเบี้ยค้งชำระ']}</TableCell>
                                                            <TableCell align="left">{element['ดอกเบี้ยชำระ']}</TableCell>
                                                            <TableCell align="left">{element.mindex}</TableCell>
                                                            <TableCell align="left">{formatNumber(element['เงินต้น'])}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.date_e)}</TableCell>
                                                            <TableCell align="left">{element.ref_id1}</TableCell>
                                                            <TableCell align="left">{dateFormatTensiveMenu(element.ref_date1)}</TableCell>
                                                        </TableRow>
                                                    )
                                                })}

                                               

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={resultList.length}
                                        rowsPerPage={count}
                                        page={page}
                                        onPageChange={(e, newPage) => {
                                            setPage(newPage)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            setPage(0)
                                            setCount(+event.target.value)
                                        }}
                                    />
                                </div>

                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10" style={{ display: 'none' }}>
                                <ButtonFluidPrimary label="พิมพ์ Label" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10" style={{ display: 'none' }}>
                                <ButtonFluidPrimary label="พิมพ์หนังสือใบเตือน Bar" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10" style={{ display: 'none' }}>
                                <ButtonFluidPrimary label="พิมพ์หนังสือใบเตือน Bar .ใหม่" />
                            </Grid>
                            {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                            <Grid item xs={12} md={12} style={{ display: 'none' }}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่ใบเตือนหนี้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="คำนวณสิ้นปีงบประมาณ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ประมวลผล" defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินครบชำระ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นค้างชำระ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ลำดับที่ใบเตือนหนี้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนราย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เงินต้นคงเหลือ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยที่ต้องชำระ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ดอกเบี้ยค้างชำระ" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Container>

                </div>
            </Fade>

        </div>
    )
}

export default NoticeInvoice
