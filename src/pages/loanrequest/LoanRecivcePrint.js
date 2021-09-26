import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiSelectSubDistrict,
    MuiSelectDistrict,
    MuiSelectProvince,
    MuiTextfieldEndAdornment,
    MuiTextfieldStartAdornment,
    MuiLabelHeaderCheckbox,
    MuiSelect,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
    MuiTextfieldCurrency,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function LoanRecivcePrint() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('ตกลงใช่หรือไม่')
    const [info, setInfo] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);
    const [formField, setFormField] = useState(false)
    const [openPrint, setOpenPrint] = useState(false)

    const [inputDataSearch, setInputDataSearch] = useState({
        Name: '',
        LoanNumber: ''
    })


    const [rows, setRows] = useState([
        // { RecordCode: '1234', RecDate: '2021-08-23', ApplicantNo: 12345, ProjectID: 163, ProjectName: 'test project', LoanNumber: 234, dCreated: '2021-08-22',IDCard: 1234567890123, FrontName: 'นาย', Name: 'ทดสอบ', Sirname: 'สอบทด', IDCARD_AddNo: '134 ม.4',
        // }
    ])
    const [rowsInfo, setRowsInfo] = useState([])
    const [dataInfo, setDataInfo] = useState([])

    const [inputDataShow, setInputDataShow] = useState({
        LoanID: 0,
        FrontName: '',
        Name: '',
        Sirname: '',
        IDCARD_AddNo: '',
        IDCARD_AddMoo: '',
        IDCARD_AddrSubdistrictID: '',
        IDCARD_AddrDistrictID: '',
        IDCARD_AddrProvinceID: '',
    })

    const [inputData, setInputData] = useState({
        LoanID: 0, // Int = 10,
        Time: 0, // Int = 2,
        LoanReceiptDate: null, // Date = "2021-05-09",
        LoanReceiptfrom: '', // String = "xxx",
        LoanReceiptfrom2:'' , // String = "yyy",
        LoanReceiptList: '', // String = "zzz",
        LoanReceiptAmount: 0, // float =  123.12,
        LoanReceiptList1: '', // String = "zzz",
        LoanReceiptAmount1: 0, // float =  123.12,
        LoanReceiptList2: '', // String = "zzz",
        LoanReceiptAmount2: 0, // float = 123.12,
        LoanReceiptList3: '', // String = "zzz",
        LoanReceiptAmount3: 0, // float = 123.12,
        LoanReceiptTotal: 0,
        LoanReceiptNumber: '',
    })

    let sumTable = 
    ((inputData.LoanReceiptAmount === 0 || inputData.LoanReceiptAmount === '' ? 0 : parseFloat((inputData.LoanReceiptAmount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
    (inputData.LoanReceiptAmount1 === 0 || inputData.LoanReceiptAmount1 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
    (inputData.LoanReceiptAmount2 === 0 || inputData.LoanReceiptAmount2 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputData.LoanReceiptAmount3 === 0 || inputData.LoanReceiptAmount3 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})

    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000',
    })


    // Get Province
    let provinceList = JSON.parse(localStorage.getItem('provincelist'))
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))

    const rowsLabel = [
        // 'ApplicantID',
        'RecordCode',
        'RecDate', 
        'ApplicantNo',
        'ProjectID',
        'ProjectName', 
        'LoanNumber',
        'dCreated',
        'IDCard', 
        'FrontName',
        'Name',
        'Sirname', 
        // 'IDCARD_AddNo',
        'IDCARD_AddNo',
    ]

    const headCells = [
        // { id: 'ApplicantID', numeric: false, disablePadding: true, widthCol: '0px', label: 'รหัสบันทึก' },
        { id: 'RecordCode', numeric: false, disablePadding: true, widthCol: '140px', label: 'รหัสบันทึก' },
        { id: 'RecDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่บันทึก' },
        { id: 'ApplicantNo', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขคำขอ' },
        { id: 'ProjectID', numeric: false, disablePadding: false, widthCol: '150px', label: 'รหัสโครงการ' },
        { id: 'ProjectName', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อโครงการ' },
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขที่สัญญา' },
        { id: 'dCreated', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่กู้' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '180px', label: 'เลขบัตรประชาชน' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '150px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '150px', label: 'นามสกุล' },
        { id: 'IDCARD_AddNo', numeric: false, disablePadding: false, widthCol: '250px', label: 'ที่อยู่' },
        // { id: 'IDCARD_AddNo', numeric: false, disablePadding: false, widthCol: '250px', label: 'เลขที่' },
        // { id: 'IDCARD_AddMoo', numeric: false, disablePadding: false, widthCol: '250px', label: 'หมู่' },
        // { id: 'IDCARD_AddrSoiRoad', numeric: false, disablePadding: false, widthCol: '250px', label: 'ซอย / ถนน' },
        // { id: 'IDCARD_AddrSubdistrictID', numeric: false, disablePadding: false, widthCol: '250px', label: 'แขวง / ตำบล' },
        // { id: 'IDCARD_AddrDistrictID', numeric: false, disablePadding: false, widthCol: '250px', label: 'เขต / อำเภอ' },
        // { id: 'IDCARD_AddrProvinceID', numeric: false, disablePadding: false, widthCol: '250px', label: 'จังหวัด' },
    ]

    function createData(LoanID,RecordCode,
        RecDate, 
        ApplicantNo,
        ProjectID,
        ProjectName, 
        LoanNumber,
        dCreated,
        IDCard, 
        FrontName,
        Name,
        Sirname,
        IDCARD_AddMoo,
        IDCARD_AddNo,
        IDCARD_AddrSubdistrictID,
        IDCARD_AddrDistrictID,
        IDCARD_AddrProvinceID,
        // IDCARD_AddrSoiRoad,
        ) {
        return {
            LoanID,
            RecordCode,
            RecDate, 
            ApplicantNo,
            ProjectID,
            ProjectName, 
            LoanNumber,
            dCreated,
            IDCard, 
            FrontName,
            Name,
            Sirname,
            IDCARD_AddMoo,
            IDCARD_AddNo,
            IDCARD_AddrSubdistrictID,
            IDCARD_AddrDistrictID,
            IDCARD_AddrProvinceID,
            // IDCARD_AddrSoiRoad,

        }
    }

    useEffect(() => {
        setLoaded(true);

        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log('checklogin',res)
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
                    }
                    // getSpkAllProject()
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();
    }, [])

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    const handleSelectDate = (event) => {
        let type = event.target.name
        
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
        })
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleInputData = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
    }

    // Re order date 23-08-2564 to 2021-08-23
    const reOrderDateTHtoEN = (val) => {
        // let yyyy = Number(val.substring(6,10)) - 543
        let yyyy = val.substring(6,10)
        let mm = val.substring(3,5)
        let dd = val.substring(0,2)
        if(yyyy === '0000' || mm === '00' || dd === '00') {
            return null
        } else {
            return (Number(yyyy)-543)+'-'+mm+'-'+dd
        }
    }


    const handlePrintPDF = (val) => {
        console.log('PDF - ContractNo(val):', val)
        let loanNumber = inputDataShow.LoanID;
        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)

        axios({
        url: `${siteprint}/report/pdf/GetLoanRecivcePrintPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `ใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const searchLoanRecivcePrint = () => {
        setRows([])
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/search_loanfarmergetmoney`, {
                Name: inputDataSearch.Name,
                LoanNumber: inputDataSearch.LoanNumber,
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log(res)
            let data = res.data;
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
                if(data.data.length === 0) {
                    setErr(true);
                    setErrMsg('ไม่พบข้อมูล')
                }else {
                    // setRows(data.data)
                    setRows(
                        data.data.map((item,i)=>
                            createData(
                                item.LoanID === null ? 0 : item.LoanID,
                                item.RecordCode === null ? '' : item.RecordCode,
                                item.RecDate === null ? '' : item.RecDate,
                                item.ApplicantNo === null ? '' : item.ApplicantNo,
                                item.ProjectID === null ? '' : item.ProjectID,
                                item.ProjectName === null ? '' : item.ProjectName,
                                item.LoanNumber === null ? '' : item.LoanNumber,
                                item.dCreated === null ? newOrderDate(item.dCreated) : null,
                                item.IDCard === null ? '' : item.IDCard,
                                item.FrontName === null ? '' : item.FrontName,
                                item.Name === null ? '' : item.Name,
                                item.Sirname === null ? '' : item.Sirname,
                                item.IDCARD_AddMoo === null ? '' : item.IDCARD_AddMoo,
                                item.IDCARD_AddNo === null ? '' : item.IDCARD_AddNo,
                                item.IDCARD_AddrSubdistrictID === null ? '' : item.IDCARD_AddrSubdistrictID,
                                item.IDCARD_AddrDistrictID === null ? '' : item.IDCARD_AddrDistrictID,
                                item.IDCARD_AddrProvinceID === null ? '' : item.IDCARD_AddrProvinceID,
                                // item.IDCARD_AddrSoiRoad === null ? '' : item.IDCARD_AddrSoiRoad,
                                //item.IDCARD_AddNo 
                                // item.FarmerID,
                                // item.ApplicantID,
                                // item.LoanID,
                                // item.RecordCode === null ? '' : item.RecordCode,
                                // item.RecDate === null ? '' : item.RecDate,
                                // item.ApplicantNo === null ? '' : item.ApplicantNo,
                                // item.ApplicantStatus === null || !item.ApplicantStatus ? 'P' : item.ApplicantStatus,
                                // item.ProjectID === null ? '' : item.ProjectID,
                                // item.ProjectName === null ? '' : item.ProjectName,
                                // item.LoanNumber === null ? '' : item.LoanNumber,
                                // item.dCreated ? newOrderDate(item.dCreated) : null,
                                // item.IDCard === null ? '' : item.IDCard,
                                // item.FrontName === null ? '' : item.FrontName,
                                // item.Name === null ? '' : item.Name,
                                // item.Sirname === null ? '' : item.Sirname,
                                // item.IDCARD_AddNo === undefined ? '' : item.IDCARD_AddNo +' '+item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo+' '+item.IDCARD_AddrSoiRoad === undefined ? '' : item.IDCARD_AddrSoiRoad+' '+item.IDCARD_AddrSubdistrictName === undefined ? '' : item.IDCARD_AddrSubdistrictName+' '+item.IDCARD_AddrDistrictName === undefined ? '' : item.IDCARD_AddrDistrictName+' '+item.IDCARD_AddrProvinceName === undefined ? '' : item.IDCARD_AddrProvinceName+' '+item.IDCARD_Postcode  === undefined ? '' : item.IDCARD_Postcode
                            )
                        )
                    )
                }
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }


    const openInfoDialog = (loanID) => {
        setInfo(true)
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/view_loanfarmergetmoney`, {
                LoanID: loanID
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log(res)
            let data = res.data;
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
                if(data.data.length === 0) {
                    setErr(true);
                    setErrMsg('ไม่พบข้อมูล')
                }else {
                    console.log('data.data',data)
                    setRowsInfo(data.data)
                    setDataInfo(data)
                }
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(
            `${server_hostname}/admin/api/add_loanfarmergetmoney`, {
                
                LoanReceiptDate: reOrderDateTHtoEN(inputSelectDate.dd+'-'+inputSelectDate.mm+'-'+inputSelectDate.yyyy),
                LoanReceiptfrom: inputData.LoanReceiptfrom.toString(),
                LoanReceiptfrom2: inputData.LoanReceiptfrom2.toString(),
                LoanReceiptList: inputData.LoanReceiptList.toString(),
                LoanReceiptAmount: (inputData.LoanReceiptAmount === 0 || inputData.LoanReceiptAmount === '' ? null : parseFloat((inputData.LoanReceiptAmount.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptList1: inputData.LoanReceiptList1.toString(),
                LoanReceiptAmount1: (inputData.LoanReceiptAmount1 === 0 || inputData.LoanReceiptAmount1 === '' ? null : parseFloat((inputData.LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptList2: inputData.LoanReceiptList2.toString(),
                LoanReceiptAmount2: (inputData.LoanReceiptAmount2 === 0 || inputData.LoanReceiptAmount2 === '' ? null : parseFloat((inputData.LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptList3: inputData.LoanReceiptList3.toString(),
                LoanReceiptAmount3: (inputData.LoanReceiptAmount3 === 0 || inputData.LoanReceiptAmount3 === '' ? null : parseFloat((inputData.LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptTotal: (sumTable === 0 || sumTable === '' ? null : parseFloat((sumTable.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanID: inputDataShow.LoanID,
            }, { headers: { "token": token } } 
        ).then(res => {
            console.log(res)
            let data = res.data;
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
                setSuccess(true);
                setSuccessMsg('บันทึกข้อมูลเรียบร้อย')
                setOpenPrint(true)
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
      };



    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setInfo(false)
        setConfirm(false);
        
        // history.push('/manageinfo/searchmember');

    };


    const openFormField = (loanid, frontname, name, sirname, no, moo, subdistrict, district, province) => {
        setFormField(true)
        setInputData({
            LoanID: 0, // Int = 10,
            Time: 0, // Int = 2,
            LoanReceiptDate: null, // Date = "2021-05-09",
            LoanReceiptfrom: '', // String = "xxx",
            LoanReceiptfrom2:'' , // String = "yyy",
            LoanReceiptList: '', // String = "zzz",
            LoanReceiptAmount: 0, // float =  123.12,
            LoanReceiptList1: '', // String = "zzz",
            LoanReceiptAmount1: 0, // float =  123.12,
            LoanReceiptList2: '', // String = "zzz",
            LoanReceiptAmount2: 0, // float = 123.12,
            LoanReceiptList3: '', // String = "zzz",
            LoanReceiptAmount3: 0, // float = 123.12,
            LoanReceiptTotal: 0,
            LoanReceiptNumber: '',
        })

        setInputSelectDate({
            dd: '00',
            mm: '00',
            yyyy: '0000',
        })
        console.warn(loanid, frontname, name, sirname, no, moo, subdistrict, district, province)

        setInputDataShow({
            ...inputDataShow,
            LoanID: loanid,
            FrontName: frontname,
            Name: name,
            Sirname: sirname,
            IDCARD_AddNo: no,
            IDCARD_AddMoo: moo,
            IDCARD_AddrSubdistrictID: subdistrict,
            IDCARD_AddrDistrictID: district,
            IDCARD_AddrProvinceID: province,
        })
    }

    const dialogInfo = (len) => {
        let infoArr = []

        for(let i=0; i<len; i++) {
            infoArr.push(
                <React.Fragment key={i}>
                    <Grid item xs={12} md={12}>
                        <p className="font-18 txt-blue txt-bold">รายการที่ {i+1}</p>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiTextfield label="ใบสำคัญรับเงิน" inputdisabled="input-disabled" value={dataInfo.LoanFarmerGetMoney[i].LoanReceiptNumber}/>
                        
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled"  value={newOrderDate(dataInfo.LoanFarmerGetMoney[i].LoanReceiptDate)} />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled" value={dataInfo.data[i].FrontName} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled" value={dataInfo.data[i].Name} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled" value={dataInfo.data[i].Sirname} />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <MuiTextfield label="บ้านเลขที่"  inputdisabled="input-disabled"  value={dataInfo.data[i].IDCARD_AddNo} />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <MuiTextfield label="หมู่"  inputdisabled="input-disabled"  value={dataInfo.data[i].IDCARD_AddMoo} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" lists={subdistrictList} value={dataInfo.data[i].IDCARD_AddrSubdistrictID === null ? '' : dataInfo.data[i].IDCARD_AddrSubdistrictID} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" lists={districtList} value={dataInfo.data[i].IDCARD_AddrDistrictID === null ? '' : dataInfo.data[i].IDCARD_AddrDistrictID} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" lists={provinceList} value={dataInfo.data[i].IDCARD_AddrProvinceID === null ? '' : dataInfo.data[i].IDCARD_AddrProvinceID}/>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiTextfield label="ได้รับเงินจากกรม"  inputdisabled="input-disabled"  value={dataInfo.data[i].LoanReceiptfrom} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <MuiTextfield label="กระทรวง"  inputdisabled="input-disabled"  value={dataInfo.data[i].LoanReceiptfrom2} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <div className="table">
                            <TableContainer className="table-box table-loanrecivecprint1 table-summary">
                                <Table aria-label="normal table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="center">รายการ</TableCell>
                                        <TableCell align="center">จำนวนเงิน</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">
                                                <p className="font-16">{dataInfo.LoanFarmerGetMoney[i].LoanReceiptList === null ? '-' : '1.'+ dataInfo.LoanFarmerGetMoney[i].LoanReceiptList}</p>  
                                            </TableCell>
                                            <TableCell align="right">
                                                <p>{dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount === null ? '-' : dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="left">
                                                <p className="font-16">{dataInfo.LoanFarmerGetMoney[i].LoanReceiptList1 === null ? '-' : '2.'+ dataInfo.LoanFarmerGetMoney[i].LoanReceiptList1}</p>  
                                            </TableCell>
                                            <TableCell align="right">
                                                <p>{dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount1 === null ? '-' : dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="left">
                                                <p className="font-16">{dataInfo.LoanFarmerGetMoney[i].LoanReceiptList2 === null ? '-' : '3.'+ dataInfo.LoanFarmerGetMoney[i].LoanReceiptList2}</p>  
                                            </TableCell>
                                            <TableCell align="right">
                                                <p>{dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount2 === null ? '-' : dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align="left">
                                                <p className="font-16">{dataInfo.LoanFarmerGetMoney[i].LoanReceiptList3 === null ? '-' : '3.'+ dataInfo.LoanFarmerGetMoney[i].LoanReceiptList3}</p>  
                                            </TableCell>
                                            <TableCell align="right">
                                                <p>{dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount3 === null ? '-' : dataInfo.LoanFarmerGetMoney[i].LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                            </TableCell>
                                        </TableRow>
                                    {/* {
                                        [1,2,3].map((row,i) => (
                                            <TableRow key={i}>
                                                <TableCell align="center">
                                                    <p className="font-16">{i+1}. เพื่อส่งเสริมการปลูก</p>  
                                                </TableCell>
                                                <TableCell align="center">
                                                    <p>10,000.00</p>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    } */}
                                        <TableRow>
                                            <TableCell align="center">
                                                &nbsp;
                                            </TableCell>
                                            <TableCell align="right">
                                                <p>รวม {dataInfo.LoanFarmerGetMoney[i].LoanReceiptTotal === null ? '-' : dataInfo.LoanFarmerGetMoney[i].LoanReceiptTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>

                    
                    <hr style={{width: '100%', margin: '40px 0 10px', borderTop: '2px solid #2284d0'}} />
                </React.Fragment>
            )
        }

        return infoArr
    }

    return (
        <div className="loanrequestprint-page">
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
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                {/* <h1>ใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน</h1> */}
                                <h1>สร้าง / พิมพ์ใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  name="Name" value={inputDataSearch.Name} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา"  name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={searchLoanRecivcePrint}  />  
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table-box table-loanrecivceprint mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={12} 
                                        hasCheckbox={false} 
                                        hasAction={true} // show action
                                        actionView={false} 
                                        actionCreate={false}
                                        createEvent={openFormField}
                                        createParam={'LoanID'}
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        viewEvent={openInfoDialog}
                                        viewParam={'LoanID'}
                                        actionCreateArr={true}
                                        createArrEvent={openFormField}
                                        createArrParam={['LoanID',
                                        'FrontName',
                                        'Name',
                                        'Sirname',
                                        'IDCARD_AddNo',
                                        'IDCARD_AddMoo',
                                        'IDCARD_AddrSubdistrictID',
                                        'IDCARD_AddrDistrictID',
                                        'IDCARD_AddrProvinceID']}
                                        tableName={'loanrecivceprint'}
                                    />
                                </div>
                            </Grid>
                            {/* <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="left">รหัสบันทึก</TableCell>
                                                <TableCell align="left">วันที่บันทึก</TableCell>
                                                <TableCell align="left">เลขคำขอ</TableCell>
                                                <TableCell align="left">รหัสโครงการ</TableCell>
                                                <TableCell align="left">ชื่อโครงการ</TableCell>
                                                <TableCell align="left">เลขที่สัญญา</TableCell>
                                                <TableCell align="left">วันที่กู้</TableCell>
                                                <TableCell align="left">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="left">คำนำหน้า</TableCell>
                                                <TableCell align="left">ชื่อ</TableCell>
                                                <TableCell align="left">นามสกุล</TableCell>
                                                <TableCell align="left">ที่อยู่</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={12} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>
                                            
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid> */}
                        </Grid>
                    </Container>

                    {
                        formField ? 
                        <React.Fragment>
                            <Container maxWidth="lg">
                                <Grid container spacing={2}>
        
                                    {/* Paper 1 - form field -------------------------------------------------- */}
                                    <Grid item xs={12} md={12}>
                                        <Paper className="paper line-top-green paper">
                                            <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ใบสำคัญรับเงิน" name="LoanReceiptNumber" value={inputData.LoanReceiptNumber} onChange={handleInputData} />
                                                        {/* <div className="dsp-f">
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2} className="txt-center txt-f-center">
                                                                <span>/</span>
                                                            </Grid>
                                                            <Grid item xs={12} md={5}>
                                                                <MuiTextfield label=""  defaultValue="" />
                                                            </Grid>
                                                        </div> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <p>ลงวันที่</p>
                                                        <div className="select-date-option">
                                                            <MuiSelectDay label="" name="dd" value={inputSelectDate.dd} onChange={handleSelectDate} />
                                                            <MuiSelectMonth label="" name="mm" value={inputSelectDate.mm} onChange={handleSelectDate} />
                                                            <MuiSelectYear label="" name="yyyy" value={inputSelectDate.yyyy} onChange={handleSelectDate} />
                                                        </div>
                                                        {/* <MuiDatePicker label="ลงวันที่" name="LoanDate" value={inputData.LoanDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputData, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled" value={inputDataShow.FrontName} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled" value={inputDataShow.Name} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled" value={inputDataShow.Sirname} />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiTextfield label="บ้านเลขที่"  inputdisabled="input-disabled" value={inputDataShow.IDCARD_AddNo} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="หมู่"  inputdisabled="input-disabled" value={inputDataShow.IDCARD_AddMoo} />
                                                    </Grid>

                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectSubDistrict inputdisabled="input-disabled" label="แขวง / ตำบล" lists={subdistrictList} value={inputDataShow.IDCARD_AddrSubdistrictID === null ? '' : inputDataShow.IDCARD_AddrSubdistrictID} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectDistrict inputdisabled="input-disabled" label="เขต / อำเภอ" lists={districtList} value={inputDataShow.IDCARD_AddrDistrictID === null ? '' : inputDataShow.IDCARD_AddrDistrictID} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiSelectProvince inputdisabled="input-disabled" label="จังหวัด" lists={provinceList} value={inputDataShow.IDCARD_AddrProvinceID === null ? '' : inputDataShow.IDCARD_AddrProvinceID}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ได้รับเงินจากกรม" name="LoanReceiptfrom" value={inputData.LoanReceiptfrom} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="กระทรวง"  name="LoanReceiptfrom2" value={inputData.LoanReceiptfrom2} onChange={handleInputData}   />
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Paper>
                                    </Grid>
        
                                { /* Paper 2 - Table -------------------------------------------------- */}
                                    <Grid item xs={12} md={12}>
                                        <div className="table">
                                            <TableContainer className="table-box table-loanrecivecprint1 table-summary">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center">รายการ</TableCell>
                                                        <TableCell align="center">จำนวนเงิน</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" name="LoanReceiptList" value={inputData.LoanReceiptList} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount" value={inputData.LoanReceiptAmount.toLocaleString('en-US', {minimumFractionDigits: 2})} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                        {/* <TableRow>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" name="LoanReceiptList1" value={inputData.LoanReceiptList1} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount1" value={inputData.LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" name="LoanReceiptList2" value={inputData.LoanReceiptList2} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount2" value={inputData.LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                <MuiTextfield label="" name="LoanReceiptList3" value={inputData.LoanReceiptList3} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount3" value={inputData.LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow> */}
                                                    {/* {
                                                        [1,2,3].map((row,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="left">
                                                                    <MuiTextfieldStartAdornment label=""  defaultValue="" startAdornment={(i+1)+'. '} />    
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <MuiTextfieldCurrency  label="" />
                                                                </TableCell>
                                                            </TableRow>
                                                        )) 
                                                    }*/}
                                                        {/* <TableRow>
                                                            <TableCell align="left">
                                                                <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่มรายการ" />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <p>รวม 50,000 บาท</p>
                                                            </TableCell>
                                                        </TableRow> */}
                                                        <TableRow>
                                                            <TableCell align="left">
                                                                &nbsp;
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <p>จำนวนเงิน {sumTable.toLocaleString('en-US', {minimumFractionDigits: 2})} บาท</p>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Container>
        
                            <Container  maxWidth="md">
                                <Grid container spacing={2} className="btn-row">
                                    {/* Button Row -------------------------------------------------- */}
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {
                                            openPrint ? 
                                            <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF} />
                                            :
                                            <div style={{opacity: '.5', pointerEvents: 'none'}}> 
                                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />}/>
                                            </div>
                                        }
                                    </Grid>
                                </Grid>
                            </Container>
                    
                        </React.Fragment>
                        : null
                    }
                </div>
            </Fade>


            <Dialog
                open={info}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-info">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>

                            
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                    <p className="font-18" style={{marginTop: '40px'}}>ประวัติออกใบสำคัญ &nbsp;&nbsp;&nbsp;&nbsp; <span className="txt-blue">ทั้งหมด {dataInfo.length} รายการ</span></p>
                                    <hr style={{width: '100%', margin: '20px 0 10px', borderTop: '2px solid #2284d0'}} />
                                    {
                                       dialogInfo(dataInfo.length)
                                    }
                                            
                                    {/* {
                                        rowsInfo.map((item,i)=>
                                            <React.Fragment>
                                                <Grid item xs={12} md={12}>
                                                    <p className="font-18 txt-blue txt-bold">รายการที่ {i+1}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ใบสำคัญรับเงิน" inputdisabled="input-disabled" value={item}/>
                                                    
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={1}>
                                                    <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled" />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled" />
                                                </Grid>
                                                <Grid item xs={12} md={1}>
                                                    <MuiTextfield label="บ้านเลขที่"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <MuiTextfield label="หมู่"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ตำบล"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="อำเภอ"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="จังหวัด"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ได้รับเงินจากกรม"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="กระทรวง"  inputdisabled="input-disabled"  />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <div className="table">
                                                        <TableContainer className="table-box table-loanrecivecprint1 table-summary">
                                                            <Table aria-label="normal table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="left">รายการ</TableCell>
                                                                    <TableCell align="left">จำนวนเงิน</TableCell>
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                {
                                                                    [1,2,3].map((row,i) => (
                                                                        <TableRow key={i}>
                                                                            <TableCell align="left">
                                                                                <p className="font-16">{i+1}. เพื่อส่งเสริมการปลูก</p>  
                                                                            </TableCell>
                                                                            <TableCell align="left">
                                                                                <p>10,000.00</p>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                                    <TableRow>
                                                                        <TableCell align="left">
                                                                            &nbsp;
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <p>รวม 30,000</p>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                        
                                                
                                                <hr style={{width: '100%', margin: '40px 0 10px', borderTop: '2px solid #2284d0'}} />
                                            </React.Fragment>
                                        )
                                    } */}
                                </Grid>
                            </Grid>

                        </Grid>
                    </Container>
                        <Box textAlign='center'>
                            <ButtonFluidOutlinePrimary label="ปิด" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

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

export default LoanRecivcePrint
