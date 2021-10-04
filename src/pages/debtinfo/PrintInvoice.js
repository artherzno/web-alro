import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

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
import api from '../../services/webservice'
import moment from 'moment'

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { dateFormatTensiveMenu, formatNumber, formatNumberInt } from '../../utils/Utilities';



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


function PrintInvoice() {
    const history = useHistory();
    const classes = useStyles();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoading, setIsLoading] = useState(false);
    const [start_date, setStartDate] = useState(null)
    const [startDateSelect, setStartDateSelect] = useState(null)
    const [printList, setPrintList] = useState([])

    const [page, setPage] = useState(0)
    const [pageCount,setPageCount] = useState(10)

    // Variable for Checkbox in Table
    const [selected, setSelected] = React.useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const rowCount = rows.length;
    const numSelected = selected.length;
    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

    useEffect(() => {
        setLoaded(true);
        getPrintInvoice()
    }, [])

    const handlePrintExcel = () => {
        let printDate = (inputSelectDate.yyyy - 543) + '-' + inputSelectDate.mm + '-' + inputSelectDate.dd
        console.log('printDAte', printDate.toString())
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
            link.setAttribute('download', 'template.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
            .finally(() => {
                if (isMounted.current) {
                    setIsLoading(false)
                }
            });
    }

    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type', type, 'value', event.target.value)
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

    function getPrintInvoice() {

        const parameter = {
            start_date: start_date
        }

        api.getPrintInvoice(parameter).then(response => {
            setPrintList(response.data)
        }).catch(error => {

        })
    }

    return (
        <div className="printinvoice-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">
                                <h1>รายงานใบแจ้งหนี้</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* <MuiTextfield label="ตรวจสอบวันที่ประมวล" defaultValue="Wednesday, September 12" /> */}

                                        <MuiDatePicker label="ตรวจสอบวันที่ประมวล" value={startDateSelect} onChange={(event) => {

                                            setStartDate(moment(event).format("YYYY-MM-DD"))
                                            setStartDateSelect(event)

                                        }} />

                                    </Grid>
                                    {/* <Grid item xs={12} md={2}>
                                        <MuiTextfield label="&nbsp;" defaultValue="เงินกู้" />
                                    </Grid> */}
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => { getPrintInvoice() }} />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-10">
                                    <Paper>
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">รหัสบันทึก</TableCell>
                                                        <TableCell align="left">วันที่บันทึก</TableCell>
                                                        <TableCell align="left">วันที่ประมวล</TableCell>
                                                        <TableCell align="left">เลขที่ใบเตือนหนี้</TableCell>
                                                        <TableCell align="left">จำนวนเงินรวม</TableCell>
                                                        <TableCell align="center">ใบแจ้งหนี้ที่</TableCell>
                                                        <TableCell align="left">ประจำเดือน</TableCell>
                                                        <TableCell align="left">ราย</TableCell>
                                                        <TableCell align="left">No</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>{/* // clear mockup */}

                                                    {printList.length <= 0 ? <TableRow>
                                                        <TableCell colSpan={9} align="left">ไม่พบข้อมูล</TableCell>
                                                    </TableRow> : printList.map((element, index) => {

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell align="left">{element.voucher}</TableCell>
                                                                <TableCell align="left">{dateFormatTensiveMenu(element.mdate)}</TableCell>
                                                                <TableCell align="left">{dateFormatTensiveMenu(element.start_date)}</TableCell>
                                                                <TableCell align="left">{element.ref_id}</TableCell>
                                                                <TableCell align="left">{formatNumber(element.Total)}</TableCell>
                                                                <TableCell align="left">{element.cmonth}</TableCell>
                                                                <TableCell align="left">{element.ref_name}</TableCell>
                                                                <TableCell align="left">{'API ไม่มีค่ามา'}</TableCell>
                                                                <TableCell align="left">{formatNumberInt(element.Num)}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={printList.length}
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

                                    </Paper>


                                </div>
                                {/* Data Grid --------------------------------*/}
                                {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10">
                                <ButtonFluidPrimary label="พิมพ์สรุปใบแจ้งหนี้ + ชำระ" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10">
                                <ButtonFluidPrimary label="พิมพ์สรุปใบแจ้งหนี้รายสัญญา" />
                            </Grid>
                            <Grid item xs={12} md={3} className="mg-t-10">
                                <ButtonFluidPrimary label="พิมพ์สรุปใบแจ้งหนี้รายโครงการ" />
                            </Grid>
                            <Grid item xs={12} md={2} className="mg-t-10">
                                <ButtonFluidPrimary label="ใบแจ้งหนี้ > XLS" onClick={handlePrintExcel} />
                            </Grid>
                      
                        </Grid>
                    </Container>

                
                </div>
            </Fade>

        </div>
    )
}

export default PrintInvoice
