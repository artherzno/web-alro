import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import PropTypes from 'prop-types';
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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiCheckbox,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable';


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

function PrintBillBank() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [rows, setRows] = useState([])

    const [inputDataSearch, setInputDataSearch] = useState({
        startDate: null,
        endDate: null,
        loanNumber: null,
        bankFile: null,
    })


    const rowsLabel = [
        'no',
        'date', 
        'pro_code',
        'pro_name',
        'no_contact', 
        'date_bill',
        'no_bill', 
        'money1', 
        'money2', 
        'money3', 
        'item', 
        'mindex', 
        'pcapital', 
        'pcap1', 
        'pcap2', 
        'pint1', 
        'pint2', 
        'pcharge', 
    ]

    const headCells = [
        { id: 'no', numeric: false, disablePadding: true, label: 'รหัสบันทึก' },
        { id: 'date', numeric: true, disablePadding: false, label: 'วันที่บันทึก' },
        { id: 'pro_code', numeric: true, disablePadding: false, label: 'รหัสโครงการ' },
        { id: 'pro_name', numeric: true, disablePadding: false, label: 'ชื่อโครงการ' },
        { id: 'no_contact', numeric: true, disablePadding: false, label: 'สัญญาเลขที่' },
        { id: 'date_bill', numeric: false, disablePadding: true, label: 'วันที่ใบเสร็จ' },
        { id: 'no_bill', numeric: true, disablePadding: false, label: 'เลขที่ใบเสร็จ' },
        { id: 'money1', numeric: true, disablePadding: false, label: 'เงินต้น' },
        { id: 'money2', numeric: true, disablePadding: false, label: 'ดอกเบี้ย' },
        { id: 'money3', numeric: true, disablePadding: false, label: 'ค่าปรับ' },
        { id: 'item', numeric: false, disablePadding: true, label: 'item' },
        { id: 'mindex', numeric: true, disablePadding: false, label: 'Mindex' },
        { id: 'pcapital', numeric: true, disablePadding: false, label: 'Pcapital' },
        { id: 'pcap1', numeric: true, disablePadding: false, label: 'Pcap_1' },
        { id: 'pcap2', numeric: true, disablePadding: false, label: 'Pcap_2' },
        { id: 'pint1', numeric: true, disablePadding: false, label: 'Pint_1' },
        { id: 'pint2', numeric: true, disablePadding: false, label: 'Pint_2' },
        { id: 'pcharge', numeric: true, disablePadding: false, label: 'Pcharge' },
    ];

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    useEffect(() => {
        setLoaded(true);
    }, [])

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

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
        <div className="printbillbank-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>พิมพ์ใบเสร็จรับเงินจากธนาคาร</h1>
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="จากวันที่" name="startDate" value={inputDataSearch.startDate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, startDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="ถึงวันที่" name="endStart" value={inputDataSearch.endDate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, endDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญา" name="loanNumber" value={inputDataSearch.loanNumber} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อไฟล์ธนาคาร" name="bankFile" value={inputDataSearch.bankFile} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {/* <div className="table-box mg-t-10">
                                    <MUItable />
                                </div> */}
                                <div className="table-box mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={18} 
                                        hasCheckbox={false} 
                                        hasAction={false}  // show action
                                        actionCustom={false} 
                                        tableName={'printbillbank'}
                                    />
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
                                            {/* <Grid item xs={12} md={6}>
                                                <p>รหัสจังหวัด</p>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>*/}
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใบแจ้งหนี้" defaultValue="" />
                                            </Grid>
                                            {/* <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>*/}
                                            <Grid item xs={12} md={3}>
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
                                            {/* 
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid> */}
                                            <Grid item xs={12} md={7}>
                                                <MuiTextfield label="ชื่อโครงการ"  defaultValue="" />
                                            </Grid> 
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            {/* 
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทกู้ยืม"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="หมวดโครงการ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทเงินกู้"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid> */}
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="" defaultValue="3-4535-22345-56-0" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="นามสกุล" defaultValue="สมชาย" />
                                            </Grid>
                                            {/* <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่รับเงินกู้" defaultValue="2017-05-15" />
                                            </Grid> */}
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            {/* <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiDatePicker label="วันที่จัดทำ" defaultValue="2017-05-15" />
                                                    </Grid>
                                                </Grid>
                                            </Grid> */}

                                            <Grid item xs={12} md={12}>
                                                <Grid container>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมายเหตุ" defaultValue="" />
                                                    </Grid>
                                                </Grid>
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
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="mg-t-20">
                                                    <Grid item xs={12} md={12}>
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
                                                                {/* <Grid item xs={12} md={3}>
                                                                    <ButtonFluidPrimary label="คำนวณเงินชำระ" />
                                                                </Grid> */}
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
                                                                {/* <Grid item xs={12} md={3}>
                                                                    <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" />
                                                                </Grid> */}
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
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={6}>
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
                                                                    <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
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
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">&nbsp;</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={6}>
                                                                            <ButtonFluidPrimary label="ดูประมวล" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="" textAlign="right" defaultValue="0" /> 
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ประมวล" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="% ดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ผู้ออกใบเสร็จ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ต้นค้างรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ต้นครบชำระ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ดอกเบี้ยค้างรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ดอกเบี้ยครบชำระ" defaultValue="" />
                                            </Grid> */}
                                        </Grid>
                                    </form>
                                </Paper>

                            </Grid>
                        </Grid>
                    </Container>"
                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="btn-row txt-center mg-t-15">
                            {/* <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="บันทึกการแก้ไข" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <h1 className="txt-red txt-regular">ใบเสร็จนี้พิมพ์แล้ว</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <ButtonFluidOutlinePrimary maxWidth="200px" label="พิมพ์ใบเสร็จแล้ว" />
                            </Grid> */}
                            <Grid item xs={12} md={8}>
                                {/* <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม (ใหม่)" /> */}
                                <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม" />
                            </Grid>
                            {/* <Grid item xs={12} md={4}>
                                <ButtonFluidPrimary label="แก้" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม (เดิม)" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ButtonFluidPrimary label="แก้" />
                            </Grid> */}
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default PrintBillBank
