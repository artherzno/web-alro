import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiSelect,
    MuiTextfield,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiSelectObjYearStart,
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = []

// End All Data for DataGrid ---------------------------------------------//


function AllContractSearch() {
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
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);

    const [tableResult, setTableResult] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rows, setRows] = useState([])
    const [openLoanRequestInfo, setOpenLoanRequestInfo] = useState(false)

    let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))

    // const rowsLabel = [
    //     'รหัสบันทึก','วันที่บันทึก', 'Mindex', 'รหัส', 'ชื่อโครงการ','คำนำหน้า','ชื่อ','นามสกุล','ที่อยู่','รหัสไปรษณีย์','เลขบัตรประชาชน','เลขที่สัญญา','วันที่กู้','วันที่สัญญา','หมู่(ที่ดิน)','ตำบล(ที่ดิน)','อำเภอ(ที่ดิน)','ประเภทที่ดิน','เลขที่ดิน','แปลง','ไร่','งาน','วา','วันที่จ่ายเงิน','วันที่รับเงินกู้','เงินกู้','ยอดจ่าย','อัตราดอกเบี้ย','รหัสงาน','ประเภท','แผนปี','สถานะ',
    // ]
    const rowsLabel = [
        'RecordCode',
        'RecDate', 
        'Mindex', 
        'PVSCODE',
        'Projectcode', 
        'ProjectName',
        'FrontName',
        'Name',
        'Sirname',
        'Address',
        'ProvinceID',
        'Contact_Postcode',
        'IDCard',
        'LoanNumber',
        'LoanDate',
        'Land_AddMoo',
        'Land_AddrSubdistrict',
        'Land_AddrDistrict',
        'DocLand_name',
        'LandNumber',
        'Plang',
        'Rai',
        'Ngan',
        'Wa',
        'LastDatePaid',
        'LoanReceiptDate',
        'LoanReceiptDate1',
        'principle',
        'principle1',
        'Interest',
        'ProjectMainCode',
        'LoanPeriodCode',
        'LoanTypeCode',
        'ProjectPlanYear',
        'Status',
    ]

    const headCells = [
        { id: 'RecordCode', numeric: false, disablePadding: true, label: 'รหัสบันทึก' },
        { id: 'RecDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่บันทึก' },
        { id: 'Mindex', numeric: false, disablePadding: false, widthCol: '200px', label: 'MINDEX' },
        { id: 'PVSCODE', numeric: false, disablePadding: false, widthCol: '130px', label: 'รหัสจังหวัด' },
        { id: 'Projectcode', numeric: false, disablePadding: false, widthCol: '140px', label: 'รหัสโครงการ' },
        { id: 'ProjectName', numeric: false, disablePadding: false, widthCol: '200px', label: 'ชื่อโครงการ' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '120px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '200px', label: 'ชื่อเกษตรกร' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '200px', label: 'นามสกุล' },
        { id: 'Address', numeric: false, disablePadding: false, widthCol: '300px', label: 'ที่อยู่' },
        { id: 'ProvinceID', numeric: false, disablePadding: false, widthCol: '140px', label: 'จังหวัด' },
        { id: 'Contact_Postcode', numeric: false, disablePadding: false, widthCol: '140px', label: 'รหัสไปรษณีย์' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '160px', label: 'เลขบัตรประชาชน' },
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '140px', label: 'เลขที่สัญญา' },
        { id: 'LoanDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่กู้' },
        { id: 'Land_AddMoo', numeric: false, disablePadding: false, widthCol: '100px', label: 'หมู่(ที่ดิน)' },
        { id: 'Land_AddrSubdistrict', numeric: false, disablePadding: false, widthCol: '200px', label: 'ตำบล(ที่ดิน)' },
        { id: 'Land_AddrDistrict', numeric: false, disablePadding: false, widthCol: '200px', label: 'อำเภอ(ที่ดิน)' },
        { id: 'DocLand_name', numeric: false, disablePadding: false, widthCol: '160px', label: 'ประเภทที่ดิน' },
        { id: 'LandNumber', numeric: false, disablePadding: false, widthCol: '140px', label: 'เลขที่ดิน' },
        { id: 'Plang', numeric: false, disablePadding: false, widthCol: '80px', label: 'แปลง' },
        { id: 'Rai', numeric: false, disablePadding: false, widthCol: '80px', label: 'ไร่' },
        { id: 'Ngan', numeric: false, disablePadding: false, widthCol: '80px', label: 'งาน' },
        { id: 'Wa', numeric: false, disablePadding: false, widthCol: '80px', label: 'วา' },
        { id: 'LastDatePaid', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่ชำระล่าสุด' },
        { id: 'LoanReceiptDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่รับเงินกู้' },
        { id: 'LoanReceiptDate1', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่จ่ายเงินกู้' },
        { id: 'principle', numeric: false, disablePadding: false, widthCol: '140px', label: 'เงินกู้' },
        { id: 'principle1', numeric: false, disablePadding: false, widthCol: '140px', label: 'ยอดจ่าย' },
        { id: 'Interest', numeric: false, disablePadding: false, widthCol: '140px', label: 'อัตราดอกเบี้ย' },
        { id: 'ProjectMainCode', numeric: false, disablePadding: false, widthCol: '120px', label: 'รหัสงาน' },
        { id: 'LoanPeriodCode', numeric: false, disablePadding: false, widthCol: '140px', label: 'ระยะเวลากู้' },
        { id: 'LoanTypeCode', numeric: false, disablePadding: false, widthCol: '140px', label: 'ประเภทกู้' },
        { id: 'ProjectPlanYear', numeric: false, disablePadding: false, widthCol: '100px', label: 'แผนปี' },
        { id: 'Status', numeric: false, disablePadding: false, widthCol: '140px', label: 'สถานะสัญญา' },
    ];

    const [inputDataSearch, setInputDataSearch] = useState({
        Username: localStorage.getItem('cUsername'),
        // Username: "admin9",
        FarmerName: "",
        Date: null,
        LoanNumber: "",
        ProjectName: "",
        StartYear: "0",
        Type: "2"
    })

    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

    function createData(
        RecordCode,
        RecDate,
        Mindex,
        PVSCODE,
        Projectcode,
        ProjectName,
        FrontName,
        Name,
        Sirname,
        Address,
        ProvinceID,
        Contact_Postcode,
        IDCard,
        LoanNumber,
        LoanDate,
        Land_AddMoo,
        Land_AddrSubdistrict,
        Land_AddrDistrict,
        DocLand_name,
        LandNumber,
        Plang,
        Rai,
        Ngan,
        Wa,
        LastDatePaid,
        LoanReceiptDate,
        LoanReceiptDate1,
        principle,
        principle1,
        Interest,
        ProjectMainCode,
        LoanPeriodCode,
        LoanTypeCode,
        ProjectPlanYear,
        Status,) {
        return { 
            RecordCode,
            RecDate,
            Mindex,
            PVSCODE,
            Projectcode,
            ProjectName,
            FrontName,
            Name,
            Sirname,
            Address,
            ProvinceID,
            Contact_Postcode,
            IDCard,
            LoanNumber,
            LoanDate,
            Land_AddMoo,
            Land_AddrSubdistrict,
            Land_AddrDistrict,
            DocLand_name,
            LandNumber,
            Plang,
            Rai,
            Ngan,
            Wa,
            LastDatePaid,
            LoanReceiptDate,
            LoanReceiptDate1,
            principle,
            principle1,
            Interest,
            ProjectMainCode,
            LoanPeriodCode,
            LoanTypeCode,
            ProjectPlanYear,
            Status,
         };
    }

    const handleSelectDate = (event) => {
        let type = event.target.name
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
        if(event.target.value.toString() === '00' || event.target.value.toString() === '0000') {
            setInsertDateData(false)
        } else {
            setInsertDateData(true)
        }
    }

    useEffect(() => {
        setLoaded(true);
        // getDebtSettlement()
    }, [])

    const getProvinceName = (val) => {
        for(let i=0; i<dataProvinceList.length; i++) {
            if(val === dataProvinceList[i].ProvinceID) {
                return dataProvinceList[i].PV_NAME
            }
        }
    }

    // New order date
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    const test = (val) => {
        alert(val)
    }

    const handlePrintPDF = (val) => {
        console.log('PDF - ContractNo(val):', val)
        let loanNumber = val;
        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)

        axios({
        url: `${siteprint}/report/pdf/GetContractPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const getDebtSettlement = () => {
        setIsLoading(true)

        let contractDate = (inputSelectDate.yyyy === '0000' ? '0000' : inputSelectDate.yyyy - 543)+'-'+inputSelectDate.mm+'-'+inputSelectDate.dd
        let contractType = inputDataSearch.Type === '2' ? '' : inputDataSearch.Type
        let contractStartYear = inputDataSearch.StartYear === '0' ? '' : Number(inputDataSearch.StartYear) + 2500 - 543
        
        axios({
            url: `${server_spkapi}/DebtSettlement/GetData`, //your url
            method: 'POST',
            data: {
                Username: inputDataSearch.Username,
                FarmerName: inputDataSearch.FarmerName,
                Date: contractDate === '0000-00-00' ? '' : contractDate,
                LoanNumber: inputDataSearch.LoanNumber,
                ProjectName: inputDataSearch.ProjectName,
                StartYear: contractStartYear,
                Type: contractType
            }
        }).then(res => {
                // console.log(res)
                let data = res.data;
                if(data.length === 0) {
                    setErr(true);
                    setErrMsg('ไม่พบข้อมูล')
                }else {
                    setRows(
                        data.map((item,i)=>
                            createData(
                                item.RecordCode,
                                item.RecDate ? newOrderDate(item.RecDate) : null,
                                item.Mindex,
                                item.PVSCODE,
                                item.Projectcode,
                                item.ProjectName,
                                item.FrontName,
                                item.Name,
                                item.Sirname,
                                item.Address,
                                item.ProvinceID ? getProvinceName(item.ProvinceID) : null,
                                item.Contact_Postcode,
                                item.IDCard,
                                item.LoanNumber,
                                item.LoanDate ? newOrderDate(item.LoanDate) : null,
                                item.Land_AddMoo,
                                item.Land_AddrSubdistrict,
                                item.Land_AddrDistrict,
                                item.DocLand_name,
                                item.LandNumber,
                                item.Plang,
                                item.Rai,
                                item.Ngan,
                                item.Wa,
                                item.LastDatePaid ? newOrderDate(item.LastDatePaid) : null,
                                item.LoanReceiptDate ? newOrderDate(item.LoanReceiptDate) : null,
                                item.LoanReceiptDate1 ? newOrderDate(item.LoanReceiptDate1) : null,
                                item.principle ? item.principle.toLocaleString('en-US', {minimumFractionDigits: 2}) : null,
                                item.principle1 ? item.principle1.toLocaleString('en-US', {minimumFractionDigits: 2}) : null,
                                item.Interest ? item.Interest.toLocaleString('en-US', {minimumFractionDigits: 2}) : null,
                                item.ProjectMainCode,
                                item.LoanPeriodCode,
                                (item.LoanTypeCode === '01') ? 'รายบุคคล' : (item.LoanTypeCode === '02') ? 'รายโครงการ' : null,
                                (Number(item.ProjectPlanYear) + 2500),
                                item.Status,
                            )
                        ))
                    setIsLoading(false)
                    setSearched(true)

                    
                    
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
        })
    }

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

        setInsertData(true)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const gotoAddLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);

        setIsLoading(false)
        // history.push('/manageinfo/searchmember');

    };
    
    return (
        <div className="allcontractsearch-page">
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
                                <h1>สัญญาทั้งหมด</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="FarmerName" value={inputDataSearch.FarmerName} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <p>ค้นหาตามวันที่สร้างสัญญา</p>
                                        <div className="select-date-option">
                                            <MuiSelectDay label="" name="dd" value={inputSelectDate.dd} onChange={handleSelectDate} />
                                            <MuiSelectMonth label="" name="mm" value={inputSelectDate.mm} onChange={handleSelectDate} />
                                            <MuiSelectYear label="" name="yyyy" value={inputSelectDate.yyyy} onChange={handleSelectDate} />
                                        </div>
                                        {/* <MuiDatePicker label="ค้นหาตามวันที่สร้างสัญญา"  name="Date" value={inputDataSearch.Date}   /> */}
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber}  onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อโครงการ" name="ProjectName" value={inputDataSearch.ProjectName}  onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3} className="dropdown-projectplanyear">
                                        <MuiSelectObjYearStart label="ค้นหาตามปีงบประมาณ" valueStartYaer={2500}  name="StartYear" value={inputDataSearch.StartYear}  onChange={handleInputDataSearch} />
                                    </Grid>
                                    {/* <Grid item xs={12} md={3}>
                                        <MuiSelect label="จัดเรียงตาม" listsValue={['โครงการ','สัญญา','mindex มากไปน้อย','mindex น้อยไปมาก','วันที่บันทึกข้อมูล']} lists={['โครงการ', 'สัญญา', 'mindex มากไปน้อย','mindex น้อยไปมาก','วันที่บันทึกข้อมูล']} />
                                    </Grid> */}
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="แสดง" listsValue={['2','1','0']} lists={['ทั้งหมด', 'ค้างชำระ', 'จ่ายเงินครบ']} name="Type" value={inputDataSearch.Type}  onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        {
                                            insertData || insertDateData ? 
                                            <ButtonFluidPrimary label="ค้นหา" onClick={getDebtSettlement} />  
                                            : 
                                            <div style={{opacity: '.5', pointerEvents: 'none'}}>
                                                <ButtonFluidPrimary label="ค้นหา"/> 
                                            </div> 
                                        }
                                    </Grid>
                                    {/* <Grid item xs={12} md={3}>
                                        <p>&nbsp;</p>
                                        {
                                            searched ? 
                                            <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                            :
                                            <div style={{opacity: '.5', pointerEvents: 'none'}}>
                                                <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                            </div>
                                            
                                        }
                                    </Grid> */}
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={36} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionView={false} 
                                        viewEvent={test}
                                        viewParam={'view'}
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        actionPrint={true} 
                                        printEvent={handlePrintPDF}
                                        printParam1={'LoanNumber'}
                                    />
                                </div>
                                {/* <div className="table-box table-allcontractsearch1 mg-t-10">
                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                <TableCell align="center">วันที่บันทึก</TableCell>
                                                <TableCell align="center">เลขคำขอ</TableCell>
                                                <TableCell align="center">รหัสโครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                <TableCell align="center">วันที่กู้</TableCell>
                                                <TableCell align="center">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="center">คำนำหน้า</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">นามสกุล</TableCell>
                                                <TableCell align="center">ที่อยู่</TableCell>
                                                <TableCell align="center" className="sticky tb-w-14em">&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={13} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={tableResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div> */}
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        isLoading2 ?
                        <div>
                            <p className="txt-center">...Loading...</p>
                        </div>
                        : ''
                    }
                    { 
                        openLoanRequestInfo && !isLoading2 ? 
                        <div>INFO</div>: ''}
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

export default AllContractSearch
