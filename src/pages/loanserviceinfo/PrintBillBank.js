import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../../App';

import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

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
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')
    let provincename = localStorage.getItem('provincename');

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [formField, setFormField] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [rows, setRows] = useState([])

    const [inputDataSearch, setInputDataSearch] = useState({
        fromdate: null, //moment().format('YYYY-MM-DD'),
        todate: null,  //moment().format('YYYY-MM-DD'),
        LoanNumber: null,
        filename: null,
    })


    const rowsLabel = [
        // 'no',
        'RecDate', 
        'ProjectCode',
        'ProjectMainName',
        'LoanNumber', 
        'ReceiptDate',
        'ReceiptType',
        'ReceiptNumber', 
        'PrinciplePaid', 
        'InterestPaid', 
        'Fines', 
        'FrontName',
        'Name',
        'Sirname',
        // 'Time', 
        // 'Mindex', 
        // 'pcapital', 
        // 'pcap1', 
        // 'pcap2', 
        // 'pint1', 
        // 'pint2', 
        // 'pcharge', 
    ]

    const headCells = [
        // { id: 'no', numeric: false, disablePadding: true, label: 'รหัสบันทึก' },
        { id: 'RecDate', numeric: true, disablePadding: false, widthCol: '160px', label: 'วันที่บันทึก' },
        { id: 'ProjectCode', numeric: true, disablePadding: false, widthCol: '160px', label: 'รหัสโครงการ' },
        { id: 'ProjectMainName', numeric: true, disablePadding: false, widthCol: '160px', label: 'ชื่อโครงการ' },
        { id: 'LoanNumber', numeric: true, disablePadding: false, widthCol: '160px', label: 'สัญญาเลขที่' },
        { id: 'ReceiptDate', numeric: false, disablePadding: true, widthCol: '160px', label: 'วันที่ใบเสร็จ' },
        { id: 'ReceiptType', numeric: true, disablePadding: false, widthCol: '160px', label: 'ประเภทใบเสร็จ' },
        { id: 'ReceiptNumber', numeric: true, disablePadding: false, widthCol: '160px', label: 'เลขที่ใบเสร็จ' },
        { id: 'PrinciplePaid', numeric: true, disablePadding: false, widthCol: '160px', label: 'เงินต้น' },
        { id: 'InterestPaid', numeric: true, disablePadding: false, widthCol: '160px', label: 'ดอกเบี้ย' },
        { id: 'Fines', numeric: true, disablePadding: false, widthCol: '160px', label: 'ค่าปรับ' },
        { id: 'FrontName', numeric: true, disablePadding: false, widthCol: '120px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: true, disablePadding: false, widthCol: '160px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: true, disablePadding: false, widthCol: '160px', label: 'นามสกุล' },
        // { id: 'Time', numeric: false, disablePadding: true, label: 'item' },
        // { id: 'Mindex', numeric: true, disablePadding: false, label: 'Mindex' },
        // { id: 'pcapital', numeric: true, disablePadding: false, label: 'Pcapital' },
        // { id: 'pcap1', numeric: true, disablePadding: false, label: 'Pcap_1' },
        // { id: 'pcap2', numeric: true, disablePadding: false, label: 'Pcap_2' },
        // { id: 'pint1', numeric: true, disablePadding: false, label: 'Pint_1' },
        // { id: 'pint2', numeric: true, disablePadding: false, label: 'Pint_2' },
        // { id: 'pcharge', numeric: true, disablePadding: false, label: 'Pcharge' },
    ];

    function createData(RecDate, ProjectCode,ProjectMainName,LoanID, LoanNumber, ReceiptDate, ReceiptType, ReceiptNumber, PrinciplePaid, InterestPaid, Fines, Time, Mindex, FrontName, Name, Sirname ) {
        return { RecDate, 
            ProjectCode,
            ProjectMainName,
            LoanID,
            LoanNumber, 
            ReceiptDate,
            ReceiptType,
            ReceiptNumber, 
            PrinciplePaid, 
            InterestPaid, 
            Fines, 
            Time, 
            Mindex,
            FrontName,
            Name,
            Sirname,
        };
    }

    useEffect(() => {
        setLoaded(true);


    }, [])

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let result = ''
        if(!!val) {
            result = moment(val).format('DD/MM/') + (Number(moment(val).format('YYYY')) + 543)
        }
        return result
    }

    const getSearch = () => {
        setIsLoading(true)
        setRows([])
        setSearchResult([])
        setFormField(false)

        axios.post(
            `${server_hostname}/admin/api/search_dattoprint`, 
            inputDataSearch, 
            { headers: { "token": token } } 
        ).then(res => {
                console.log('getSearch',res)
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
                } else {
                    console.log('search result',data.data)

                    if(data.length > 0) {
                        setRows(
                            data.data.map((item,i)=>
                                createData(
                                    // i,
                                    // item.RecDate?moment(item.RecDate).format('DD/MM/YYYY'):'',
                                    newOrderDate(item.RecDate),
                                    item.ProjectCode,
                                    item.ProjectMainName,
                                    item.LoanID,
                                    item.LoanNumber,
                                    // !!item.ReceiptDate?moment(item.ReceiptDate).format('DD/MM/YYYY'):'',
                                    newOrderDate(item.ReceiptDate),
                                    !!item.BankFile?'ธ.ก.ส.':'ส.ป.ก.',
                                    item.ReceiptNumber,
                                    !!item.PrinciplePaid?item.PrinciplePaid:0,
                                    !!item.InterestPaid?item.InterestPaid:0,
                                    !!item.Fines?item.Fines:0,
                                    item.Time,
                                    item.Mindex,
                                    item.FrontName,
                                    item.Name,
                                    item.Sirname,

                                ))
                        )
                        setSearchResult(data.data)
                    } else {
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                    }
                }
                setIsLoading(false)
                // getSpkAllProject()
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

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

    const handlePrintPDF = (contactNo, invoiceNo) => {
        console.log('PDF - ContractNo:', contactNo)
        console.log('PDF - InvoiceNo:', invoiceNo)
        console.log('PDF - UserName:', localStorage.getItem('provinceid'))
        console.log('PDF - RoleID:', localStorage.getItem('nROLEID'))

        // ContractNo
        // InvoiceNo
        // UserName
        // RoleID

        let formData = new FormData(); 
        formData.append('ContractNo',contactNo)
        formData.append('InvoiceNo',invoiceNo)
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
        url: `${siteprint}/report/pdf/GetPrintBillBankPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญา_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const handleClosePopup = () => {
        setErr(false);
        setIsLoading(false)
        
        // history.push('/manageinfo/searchmember');

    };
    
    return (
        <div className="printbillbank-page">
            {
                isLoading ? 
                    <div className="overlay">
                        <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังค้นหาข้อมูล...</p>
                    </div> : 
                    ''
            }
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>พิมพ์ใบเสร็จรับเงิน</h1>
                                {/* <h1>พิมพ์ใบเสร็จรับเงินจากธนาคาร</h1> */}
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="จากวันที่" name="fromdate" value={inputDataSearch.fromdate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, fromdate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="ถึงวันที่" name="todate" value={inputDataSearch.todate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, todate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อไฟล์ธนาคาร" name="filename" value={inputDataSearch.filename} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={()=>getSearch()} />  
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
                                        hasAction={true}  // show action
                                        actionCustom={true} 
                                        customName={"พิมพ์ใบเสร็จ"}
                                        customWidth={"140px"}
                                        customEvent={handlePrintPDF}
                                        customParam1={'LoanNumber'}
                                        customParam2={'ReceiptNumber'}
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

                    <Container maxWidth="lg" style={{display: 'none'}}>
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
                                {/* <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม" /> */}
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

export default PrintBillBank
