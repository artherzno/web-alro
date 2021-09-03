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
    MuiTextfieldCurrency,
    MuiRadioButton,
    MuiSelectProvince,
    MuiLabelHeader,
    MuiLabelHeaderCheckbox,
    MuiSelectDistrict,
    MuiTextNumber,
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
    MuiSelectSubDistrict,
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

    const [inputData, setInputData] = useState(null)

    let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
    // Get District
    let dataDistrictList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let dataSubdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))
    const [Free_of_debt, setFree_of_debt] = useState('0')

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
        ApplicantID,
        LoanID,
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
            ApplicantID,
            LoanID,
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
        if(val === null || val === '') {
            return null
        } else {
            let yyyy = Number(val.substring(0,4)) + 543
            let mm = val.substring(5,7)
            let dd = val.substring(8,10)
            return dd+'/'+mm+'/'+yyyy
        }
    }

    const test = (val, val2) => {
        console.log(val,val2)
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
                                item.ApplicantID,
                                item.LoanID,
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

    const getLoanDatail = (loanID) => {
        setIsLoading(true);

        axios.post(
            `${server_hostname}/admin/api/get_loandetail`, {
                LoanID: loanID,
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log(res.data)
                let data = res.data;
                setInputData(data)
                console.log('inputData',inputData)
                if(data.code === 0 || res === null || res === undefined) {
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
                    setIsLoading(false)
                    setOpenLoanRequestInfo(true);
                    console.log('get_loandetail',data)
                    // setInputData(data)
                    // console.log('inputData',inputData)

                    // Insert Radio Free_of_debt
                    data.loanrec_data[0].Free_of_debt_Month ? setFree_of_debt('0') : setFree_of_debt('1')
                }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
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

    const sumTable = () => {
        let sum = 0;
        for(let i=0; i<inputData.loandue_data.length; i++) {
            sum += inputData.loandue_data[i].PAYREC
        }
        return sum;
    }

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
                                    <Grid item xs={12} md={3}>
                                        <p>&nbsp;</p>
                                        {
                                            searched ? 
                                            <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                            :
                                            <div style={{opacity: '.5', pointerEvents: 'none'}}>
                                                <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                            </div>
                                            
                                        }
                                    </Grid>
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
                                        actionView={true} 
                                        viewEvent={getLoanDatail}
                                        viewParam={'LoanID'}
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
                        openLoanRequestInfo && !isLoading ?
                        <React.Fragment>
                            <form id="loanrequestprint" className="root" noValidate autoComplete="off">
                                <Container maxWidth="lg">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} className="title-page"> 
                                            <h1 className="txt-green mg-b--20">สัญญากู้ยืมเงินจาก ส.ป.ก.</h1>
                                        </Grid>

                                        {/* Paper 1 - ประเภทเงินกู้ -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={6} className="form-view">
                                                        <MuiRadioButton label="ประเภทเงินกู้" lists={['ระยะสั้น','ระยะปานกลาง','ระยะยาว']} name="LoanPeriodCode"  value={parseInt(inputData.LoanPeriodCode)}  type="row" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="วันที่ทำสัญญา" inputdisabled="input-disabled"  name="LoanDate" value={newOrderDate(inputData.loanrec_data[0].LoanDate)} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}><MuiTextfield label="เลขที่สัญญา" inputdisabled="input-disabled" value={inputData.loanrec_data[0].LoanNumber} /></Grid>
                                                            {/* {
                                                                action === 'add' ? '' : <Grid item xs={12} md={6}><MuiTextfield label="เลขที่สัญญา" inputdisabled="input-disabled" value={loanNumber} /></Grid>
                                                            } */}
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" value={inputData.farmer_data.Name} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" value={inputData.farmer_data.Sirname} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" id="no1-age" inputdisabled="input-disabled" name="AGE" value={inputData.loanrec_data[0].AGE}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมายเลขประจำตัว 13 หลัก" inputdisabled="input-disabled" id="no1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.farmer_data.IDCard}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="สถานที่ออกบัตร อำเภอ/เขต"  inputdisabled="input-disabled" name="IDCardMadeDistrict" value={inputData.loanrec_data[0].IDCardMadeDistrict}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="จังหวัด" name="IDCardMadeProvince"  inputdisabled="input-disabled" value={inputData.loanrec_data[0].IDCardMadeProvince} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="สัญชาติ" name="Nationality"  inputdisabled="input-disabled" value={inputData.loanrec_data[0].Nationality}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield inputdisabled="input-disabled"  label="อยู่บ้านเลขที่"value={inputData.farmer_data.IDCARD_AddNo}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiTextfield inputdisabled="input-disabled"  label="หมู่ที่" value={inputData.farmer_data.IDCARD_AddMoo}    />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield inputdisabled="input-disabled"  label="ถนน/ซอย" value={inputData.farmer_data.IDCARD_AddrSoiRoad}    />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" lists={dataSubdistrictList} value={parseInt(inputData.farmer_data.IDCARD_AddrSubdistrictID)}    />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" lists={dataDistrictList} value={parseInt(inputData.farmer_data.IDCARD_AddrDistrictID)}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" lists={dataProvinceList}  value={parseInt(inputData.farmer_data.IDCARD_AddrProvinceID)}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ประกอบอาชีพเกษตรกรรมอยู่ในเขตปฏิรูปที่ดินอำเภอ" inputdisabled="input-disabled"  name="FarmerInDistrict" value={inputData.loanrec_data[0].FarmerInDistrict}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="จังหวัด" inputdisabled="input-disabled"  name="FarmerInProvince" value={inputData.loanrec_data[0].FarmerInProvince} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ได้ทำสัญญากู้ยืมเงินให้ไว้แก่ ส.ป.ก. โดย" inputdisabled="input-disabled"  name="Officer" value={inputData.loanrec_data[0].Officer} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ตำแหน่งปฏิรูปที่ดินจังหวัด" inputdisabled="input-disabled"   name="OfficerRank" value={inputData.loanrec_data[0].OfficerRank} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ได้รับมอบอำนาจให้ลงนามในสัญญาแทนเลขาธิการ ส.ป.ก. ตามคำสั่ง ส.ป.ก. ที่" inputdisabled="input-disabled"  name="SPK_Order" value={inputData.loanrec_data[0].SPK_Order} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled"  name="LoanDate" value={newOrderDate(inputData.loanrec_data[0].LoanDate)} />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>

                                        {/* Paper 2 - ข้อ1 -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 1</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="ผู้กู้ตกลงกู้ และผู้ให้กู้ตกลงให้กู้เพื่อใช้จ่ายตามวัตถุประสงค์ต่อไปนี้" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ก" name="Loan_Obj1"  inputdisabled="input-disabled"  value={inputData.loanrec_data[0].Loan_Obj1} />
                                                    </Grid>
                                                    <Grid item xs={11} md={3}>
                                                        <p>เป็นเงิน</p>
                                                        <MuiTextfieldCurrency  inputdisabled="input-disabled"  label="" name="Loan_Obj1Amount" value={inputData.loanrec_data[0].Loan_Obj1Amount}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">(หนึ่งหมื่นสองพันสามร้อยบาท)</p>
                                                    </Grid> */}
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ข" name="Loan_Obj2" inputdisabled="input-disabled"  value={inputData.loanrec_data[0].Loan_Obj2} />
                                                    </Grid>
                                                    <Grid item xs={11} md={3}>
                                                        <p>เป็นเงิน</p>
                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" name="Loan_Obj2Amount" value={inputData.loanrec_data[0].Loan_Obj2Amount}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">&nbsp;</p>
                                                    </Grid> */}
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="ค" name="Loan_Obj3" inputdisabled="input-disabled"  value={inputData.loanrec_data[0].Loan_Obj3} />
                                                    </Grid>
                                                    <Grid item xs={11} md={3}>
                                                        <p>เป็นเงิน</p>
                                                        <MuiTextfieldCurrency  inputdisabled="input-disabled" label="" name="Loan_Obj3Amount" value={inputData.loanrec_data[0].Loan_Obj3Amount}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <MuiLabelHeader label="&nbsp;" />
                                                        <p className="paper-p">&nbsp;</p>
                                                    </Grid> */}
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <p className="paper-p txt-right">รวมเป็นเงิน</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={3} className="loanrequestprint-objtotal">
                                                        {/* <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p> */}
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfieldCurrency label="" value={inputData.loanrec_data[0].principle}   />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p className="paper-p">บาท</p>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <p className="paper-p">(ห้าแสนบาท)</p>
                                                    </Grid> */}

                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="ผู้ให้กู้ตกลงให้ผู้กู้ได้รับเงินกู้ตามวรรคแรกในคราวเดียวกันทั้งหมด หรือแบ่งให้เป็นงวดดังต่อไปนี้" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={11} md={7}>
                                                                <p>งวดที่ 1 เป็นเงิน</p>
                                                                <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"   name="Loan_Installment1" value={inputData.loanrec_data[0].Loan_Installment1}   />
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={5}>
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                            </Grid> */}
                                                            <Grid item xs={11} md={7}>
                                                                <p>งวดที่ 2 เป็นเงิน</p>
                                                                <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"   name="Loan_Installment2" value={inputData.loanrec_data[0].Loan_Installment2}   />
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={5}>
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                            </Grid> */}
                                                            <Grid item xs={11} md={7}>
                                                                <p>งวดที่ 3 เป็นเงิน</p>
                                                                <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"   name="Loan_Installment3" value={inputData.loanrec_data[0].Loan_Installment3}   />
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={5}>
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                            </Grid> */}
                                                            <Grid item xs={11} md={7}>
                                                                <p>งวดที่ 4 เป็นเงิน</p>
                                                                <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"   name="Loan_Installment4" value={inputData.loanrec_data[0].Loan_Installment4}   />
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={5}>
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                            </Grid> */}
                                                            <Grid item xs={11} md={7}>
                                                                <p>งวดที่ 5 เป็นเงิน</p>
                                                                <MuiTextfieldCurrency  label="" inputdisabled="input-disabled"   name="Loan_Installment5" value={inputData.loanrec_data[0].Loan_Installment5}   />
                                                            </Grid>
                                                            <Grid item xs={1} md={1}>
                                                                <p>&nbsp;</p>
                                                                <p className="paper-p">บาท</p>
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={5}>
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <p className="paper-p">(หนึี่งแสนบาท)</p>
                                                            </Grid> */}
                                                            <Grid item xs={12} md={12}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={3}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <p className="paper-p">รวมเป็นเงิน</p>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={4} className="loanrequestprint-objtotal">
                                                                        {/* <p className="paper-p txt-right"><span className="txt-green">500,000</span>&nbsp;&nbsp;บาท</p> */}
                                                                        <Grid item xs={12} md={12}>
                                                                            <MuiTextfieldCurrency label="" value={ inputData.loanrec_data[0].Loan_Installment1 + inputData.loanrec_data[0].Loan_Installment2 + inputData.loanrec_data[0].Loan_Installment3 + inputData.loanrec_data[0].Loan_Installment4 + inputData.loanrec_data[0].Loan_Installment5}   />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={1} md={1}>
                                                                        <p className="paper-p">บาท</p>
                                                                    </Grid>
                                                                    {/* <Grid item xs={12} md={3}>
                                                                        <p className="paper-p">(ห้าแสนบาท)</p>
                                                                    </Grid> */}
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="ผู้กู้ยินยอมรับ (เงิน/สิ่งของแทนตัวเงินมูลค่าเท่ากับจำนวนเงินที่ผู้ให้กู้จ่ายให้แก่ผู้กู้)" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="" inputdisabled="input-disabled"   name="Farmer_Accept" value={inputData.loanrec_data[0].Farmer_Accept}  />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>

                                        {/* Paper 3 - ข้อ2 -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 2</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="ผู้กู้สัญญาว่าจะนำเงินกู้รายนี้ไปใช้จ่ายตามวัตถุประสงค์ที่ระบุตามข้อ 1 อย่างแท้จริงและจะปฏิบัติตามระเบียบคณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรมว่าด้วยหลักเกณฑ์ วิธีการ และเงื่อนไข การให้กู้ยืมแก่เกษตรกรและสถาบันเกษตรกรในเขตปฏิรูปที่ดิน และหรือ" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield inputdisabled="input-disabled" label="ตามคำสั่ง ส.ป.ก. ที่" value={inputData.loanrec_data[0].SPK_Order}   />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                <MuiLabelHeader label="&nbsp;" />
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label="&nbsp;" id="loanrequestcontact-step1-no3-no1-farmeraward2-input" defaultValue="" />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled"   name="SPK_OrderDate" value={newOrderDate(inputData.loanrec_data[0].SPK_OrderDate)} />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                        
                                        {/* Paper 4 - ข้อ3 -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 3</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox label="ในการกู้เงินรายนี้ ผู้กู้ได้มอบหลักประกันดังต่อไปนี้" />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield topic="ก." label="อสังหาริมทรัพย์ที่ปราศจากข้อผู้กพันใดๆ คือ" inputdisabled="input-disabled"  name="Guarantee_Property" value={inputData.loanrec_data[0].Guarantee_Property}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiLabelHeaderCheckbox label="นำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" />
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="" inputdisabled="input-disabled" name="LoanContactBook" value={inputData.loanrec_data[0].LoanContactBook}  />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={1} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled" name="Guarantee_PropertyDate" value={newOrderDate(inputData.loanrec_data[0].Guarantee_PropertyDate)}  />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox topic="ข." label="หนังสือสัญญารับรองผูกพันคนรับผิดอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกร"/>
                                                    </Grid>
                                                    <Grid item xs={11} md={2}>
                                                        <p>รวม</p>
                                                        <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" name="Guarantee_Person" value={inputData.loanrec_data[0].Guarantee_Person}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ราย</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญารับรองฯ ที่" />
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="" inputdisabled="input-disabled" name="LoanGuaranteeBook" value={inputData.loanrec_data[0].LoanGuaranteeBook}   />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled" name="LoanGuaranteeBookDate" value={newOrderDate(inputData.loanrec_data[0].LoanGuaranteeBookDate)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeaderCheckbox topic="ค." label="หนังสือสัญญาค้ำประกันของ"/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="(1)" inputdisabled="input-disabled" name="WarrantBookOwner1" value={inputData.loanrec_data[0].WarrantBookOwner1}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="" inputdisabled="input-disabled"  name="WarrantBook1" value={inputData.loanrec_data[0].WarrantBook1}  />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled" name="WarrantBookDate1" value={newOrderDate(inputData.loanrec_data[0].WarrantBookDate1)} />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="(2)" inputdisabled="input-disabled"  name="WarrantBookOwner2" value={inputData.loanrec_data[0].WarrantBookOwner2}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiLabelHeaderCheckbox label="ตามหนังสือสัญญาค้ำประกันที่" />
                                                        <div className="dsp-f">
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="" inputdisabled="input-disabled"  name="WarrantBook2" value={inputData.loanrec_data[0].WarrantBook2}  />
                                                            </Grid>
                                                            {/* <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid> */}
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled" name="WarrantBookDate2" value={newOrderDate(inputData.loanrec_data[0].WarrantBookDate2)} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                        
                                        {/* Paper 5 - ข้อ4 -------------------------------------------------- */}
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={12}>
                                                        <h1 className="paper-head-green">ข้อ 4</h1>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiLabelHeaderCheckbox label="ผู้ให้กู้ตกลงให้มีระยะเวลาปลอดการชำระคืนเงินต้นเป็นเวลา"/>
                                                        <div className="dsp-f">
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={6}>
                                                                    {
                                                                        Free_of_debt === '0' ? 
                                                                        <MuiTextfield label="" inputdisabled="input-disabled" name="Free_of_debt_Month" id="no1-year" value={inputData.loanrec_data[0].Free_of_debt_Month}   />
                                                                        :
                                                                        <MuiTextfield label="" inputdisabled="input-disabled" name="Free_of_debt_Year" id="no2-year" value={inputData.loanrec_data[0].Free_of_debt_Year}   />    
                                                                    }
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiRadioButton label="" inputdisabled="input-disabled"  lists={['เดือน','ปี']}  type="row" name="Free_of_debt" value={Free_of_debt} />
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={11} md={2}>
                                                        <p>รวม</p>
                                                        <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" name="Free_of_debt_Time" value={inputData.loanrec_data[0].Free_of_debt_Time}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งวด</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="เริ่มชำระงวดแรกภายในวันที่" inputdisabled="input-disabled" name="FirstDatePaid" value={newOrderDate(inputData.loanrec_data[0].FirstDatePaid)}  />
                                                    </Grid>
                                                    <Grid item xs={11} md={3}>
                                                        <p>พร้อมทั้งดอกเบี้ยในอัตราร้อยละ</p>
                                                        <MuiTextfieldCurrency  label="" inputdisabled="input-disabled" name="Interest" value={inputData.loanrec_data[0].Interest}   />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ต่อปี</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ครบกำหนดงวดสุดท้ายในวันที่" inputdisabled="input-disabled" name="LastDatePaid" value={newOrderDate(inputData.loanrec_data[0].LastDatePaid)} />
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label="ผู้กู้ต้องชำระให้แก่ผู้ให้กู้ ณ สำนักงานปฏิรูปที่ดินจังหวัด" inputdisabled="input-disabled" name="OfficeProvince" value={inputData.loanrec_data[0].OfficeProvince}   />
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                        </Grid>

                                    </Grid>
                                </Container>
                            
                                <Container maxWidth="sm">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <div className="table">
                                                <h1 className="txt-center">ตารางรายละเอียดการชำระคืนเงินกู้</h1>
                                                <TableContainer className="table-box table-loanrequestprint2 table-summary">
                                                    <Table aria-label="normal table">
                                                        <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" style={{minWidth: '100px'}}>งวดที่</TableCell>
                                                            <TableCell align="center">วัน เดือน ปี ครบกำหนดชำระเงิน</TableCell>
                                                            <TableCell align="center">จำนวนเงินกู้ที่ต้องชำระ (บาท)</TableCell>
                                                        </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {
                                                            inputData.loandue_data.map((row,i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell align="center">{row.ITEM}</TableCell>
                                                                    <TableCell align="center">
                                                                        <MuiTextfield label="" inputdisabled="input-disabled"  value={newOrderDate(row.DUEDATE)} />
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <MuiTextfieldCurrency inputdisabled="input-disabled"  label="" value={row.PAYREC} />
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }

                                                        <TableRow className="box box-grey">
                                                            {/* <TableCell align="right">จำนวนเงินรวม <span className="txt-green">50,000 </span>บาท</TableCell> */}
                                                            <TableCell colSpan="3">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={4}>
                                                                        {/* Field Text ---------------------------------------------------*/}
                                                                        <p className="paper-p txt-right">รวมเป็นเงิน</p>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={6} className="loanrequestprint-loanduetotal">
                                                                        <Grid item xs={12} md={12}>
                                                                            <MuiTextfieldCurrency label="" value={sumTable()}   />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={1} md={1}>
                                                                        <p className="paper-p">บาท</p>
                                                                    </Grid>
                                                                </Grid>
                                                            
                                                            </TableCell>
                                                        </TableRow>
                                                           
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </div>
                                        </Grid>
                                        {/* <Grid item xs={12} md={12}>
                                            <div className="box-button txt-center">
                                                <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่ม" />
                                            </div>
                                        </Grid> */}
                                    </Grid>
                                </Container>
                            
                                <Container maxWidth="lg">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}> 
                                            <p className="mg-t-35">หมายเหตุ</p>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="1. ชื่อพยาน" name="WitnessName" value={inputData.loanrec_data[0].WitnessName}    />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr" value={inputData.loanrec_data[0].WitnessAddr}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man1-idc" name="WitnessIDCard" value={inputData.loanrec_data[0].WitnessIDCard}   />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade" value={inputData.loanrec_data[0].WitnessIDCardMade}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="2. ชื่อพยาน" name="WitnessName2" value={inputData.loanrec_data[0].WitnessName2}    />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr2" value={inputData.loanrec_data[0].WitnessAddr2}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man2-idc" name="WitnessIDCard2" value={inputData.loanrec_data[0].WitnessIDCard2}   />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade2" value={inputData.loanrec_data[0].WitnessIDCardMade2}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="3. ชื่อพยาน" name="WitnessName3" value={inputData.loanrec_data[0].WitnessName3}    />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr3" value={inputData.loanrec_data[0].WitnessAddr3}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man3-idc" name="WitnessIDCard3" value={inputData.loanrec_data[0].WitnessIDCard3}   />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade3" value={inputData.loanrec_data[0].WitnessIDCardMade3}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="4. ชื่อพยาน" name="WitnessName4" value={inputData.loanrec_data[0].WitnessName4}    />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="ที่อยู่" name="WitnessAddr4" value={inputData.loanrec_data[0].WitnessAddr4}   />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <MuiTextfield inputdisabled="input-disabled" label="บัตรประชาชนเลขที่" id="no-man4-idc" name="WitnessIDCard4" value={inputData.loanrec_data[0].WitnessIDCard4}   />
                                        </Grid>
                                        <Grid item xs={12} md={7}>
                                            <MuiTextfield inputdisabled="input-disabled" label="สถานที่ออกบัตร" name="WitnessIDCardMade4" value={inputData.loanrec_data[0].WitnessIDCardMade4}   />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </form>
                        </React.Fragment>
                    : ''
                    }
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
