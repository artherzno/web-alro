import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

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
import TablePagination from '@material-ui/core/TablePagination';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiCheckbox,
    MuiSelect,
    MuiLabelHeader,
    MuiTextfieldCurrency,
    MuiTextfieldEndAdornment,
    MuiLabelHeaderCheckbox,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonNormalIconStartPrimary,
    MuiSelectMonth,
} from '../../components/MUIinputs';
import { MUItable } from '../../components/MUItable'

function SummaryNoticeInvoice() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inputDataSearch, setInputDataSearch] = useState({
        FiscalYear: '',
        Month: '',
        WarnNumber: '',
        ProcessDate: moment().format('YYYY-MM-DD')
    })
    const [inputData, setInputData] = useState({
        OrderDate: moment().format('YYYY-MM-DD'),
    })
    const [inputData2, setInputData2] = useState({
        RecCode: '',
        RecDate: moment().format('YYYY-MM-DD'),
        SummaryNumber: '',
        SummaryNo: ''
    })
    const [tableResult, setTableResult] = useState([])
    const [tableResultAll, setTableResultAll] = useState([])
    const [tableTotalResult, setTableTotalResult] = useState([])

    const [openInfo, setOpenInfo] = useState(false)
    const [openInfo2, setOpenInfo2] = useState(false)

    const [openDetail, setOpenDetail] = useState(false)
    const [openSummary, setOpenSummary] = useState(false)

    const [isLoadingExport, setIsLoadingExport] = useState({});
    const [isLoadingExport2, setIsLoadingExport2] = useState({});

    const [rows, setRows] = useState([]);
    const [rowsAll, setRowsAll] = useState([]);
    const headCells = [
        { id: 'วันที่บันทึก', numeric: true, disablePadding: false, widthCol: '160px', label: 'วันที่บันทึก' },
        { id: 'เลขที่ใบสรุป', numeric: false, disablePadding: true,  widthCol: '140px',label: 'เลขที่ใบสรุป' },
        { id: 'ประจำเดือน', numeric: true, disablePadding: false, widthCol: '120px', label: 'ประจำเดือน' },
        { id: 'เลขที่ใบเตือน', numeric: true, disablePadding: false, widthCol: '160px', label: 'เลขที่ใบเตือน' },
        { id: 'วันที่ออกใบเตือน', numeric: true, disablePadding: false, widthCol: '160px', label: 'วันที่ออกใบเตือน' },
        { id: 'งวดชำระ', numeric: true, disablePadding: false,  widthCol: '140px',label: 'งวดชำระ' },
        { id: 'เงินต้นค้างชำระ', numeric: true, disablePadding: false,  widthCol: '140px', label: 'เงินต้นค้างชำระ' },
        { id: 'เงินต้นคงเหลือ', numeric: true, disablePadding: false, widthCol: '140px', label: 'เงินต้นคงเหลือ' },
        { id: 'ดอกเบี้ยต้องชำระ', numeric: true, disablePadding: false,  widthCol: '140px',label: 'ดอกเบี้ยต้องชำระ' },
        { id: 'ดอกเบี้ยค้างชำระ', numeric: true, disablePadding: false,  widthCol: '140px',label: 'ดอกเบี้ยค้างชำระ' },
        { id: 'ดอกเบี้ยครบชำระ', numeric: true, disablePadding: false, widthCol: '140px', label: 'ดอกเบี้ยครบชำระ' },
    ];
    const headCellsAll = [
        { id: 'pv_code', numeric: true, disablePadding: false, widthCol: '110px', label: 'pv_code' },
        { id: 'Mindex', numeric: true, disablePadding: false, widthCol: '160px', label: 'mindex' },
        { id: 'โครงการ', numeric: true, disablePadding: false, widthCol: '110px', label: 'โครงการ' },
        { id: 'ชื่อโครงการ', numeric: true, disablePadding: false, widthCol: '140px', label: 'ชื่อโครงการ' },
        { id: 'ses', numeric: true, disablePadding: false, widthCol: '110px', label: 'คำนำหน้า' },
        { id: 'firstname', numeric: false, disablePadding: true,  widthCol: '140px',label: 'ชื่อ' },
        { id: 'lastname', numeric: true, disablePadding: false, widthCol: '140px', label: 'นามสกุล' },
        { id: 'วันที่ครบชำระ', numeric: true, disablePadding: false, widthCol: '160px', label: 'วันที่ครบชำระ' },
        { id: 'เลขที่สัญญา', numeric: true, disablePadding: false, widthCol: '140px', label: 'เลขที่สัญญา' },
        { id: 'วันที่กู้', numeric: true, disablePadding: false,  widthCol: '140px',label: 'วันที่กู้' },
        { id: 'เงินกู้', numeric: true, disablePadding: false,  widthCol: '140px',label: 'เงินกู้' },
        { id: 'เงินงวดชำระ', numeric: true, disablePadding: false,  widthCol: '140px',label: 'เงินงวดชำระ' },
        { id: 'เงินต้นค้างชำระ', numeric: true, disablePadding: false,  widthCol: '140px', label: 'เงินต้นค้างชำระ' },
        { id: 'เงินต้นคงเหลือ', numeric: true, disablePadding: false, widthCol: '140px', label: 'เงินต้นคงเหลือ' },
        { id: 'ดอกเบี้ยคงเหลือ', numeric: true, disablePadding: false,  widthCol: '140px',label: 'ดอกเบี้ยคงเหลือ' },
        { id: 'ดอกเบี้ยค้าง', numeric: true, disablePadding: false,  widthCol: '140px',label: 'ดอกเบี้ยค้าง' },
        { id: 'ดอกเบี้ย', numeric: true, disablePadding: false, widthCol: '140px', label: 'ดอกเบี้ย' },
        { id: 'ดอกเบี้ยสะสม', numeric: true, disablePadding: false, widthCol: '140px', label: 'ดอกเบี้ยสะสม' },
    ];

    const rowsLabel = [
        'วันที่บันทึก','เลขที่ใบสรุป','ประจำเดือน', 'เลขที่ใบเตือน', 'วันที่ออกใบเตือน', 'งวดชำระ', 'เงินต้นค้างชำระ', 'เงินต้นคงเหลือ', 'ดอกเบี้ยต้องชำระ', 'ดอกเบี้ยค้างชำระ', 'ดอกเบี้ยครบชำระ'
    ]
    const rowsLabelAll = [
        'pv_code','Mindex', 'โครงการ', 'ชื่อโครงการ', 'sex', 'firstname', 'lastname', 'วันที่ครบชำระ', 'เลขที่สัญญา', 'วันที่กู้', 'เงินกู้', 'เงินงวดชำระ', 'เงินต้นค้างชำระ', 'เงินต้นคงเหลือ',  'ดอกเบี้ยคงเหลือ','ดอกเบี้ยค้าง', 'ดอกเบี้ย', 'ดอกเบี้ยสะสม'
    ]

    function createData( id, วันที่บันทึก,เลขที่ใบสรุป,ประจำเดือน, เลขที่ใบเตือน, วันที่ออกใบเตือน, งวดชำระ, เงินต้นค้างชำระ, เงินต้นคงเหลือ, ดอกเบี้ยต้องชำระ, ดอกเบี้ยค้างชำระ, ดอกเบี้ยครบชำระ) {
        return { id, วันที่บันทึก,เลขที่ใบสรุป,ประจำเดือน, เลขที่ใบเตือน, วันที่ออกใบเตือน, งวดชำระ, เงินต้นค้างชำระ, เงินต้นคงเหลือ, ดอกเบี้ยต้องชำระ, ดอกเบี้ยค้างชำระ, ดอกเบี้ยครบชำระ};
    }
    function createDataAll( id, pv_code, Mindex, โครงการ, ชื่อโครงการ, sex, firstname, lastname, วันที่ครบชำระ, เลขที่สัญญา, วันที่กู้, เงินกู้, เงินงวดชำระ, เงินต้นค้างชำระ, เงินต้นคงเหลือ, ดอกเบี้ยคงเหลือ, ดอกเบี้ยค้าง, ดอกเบี้ย, ดอกเบี้ยสะสม) {
        return { id, pv_code, Mindex, โครงการ, ชื่อโครงการ, sex, firstname, lastname, วันที่ครบชำระ, เลขที่สัญญา, วันที่กู้, เงินกู้, เงินงวดชำระ, เงินต้นค้างชำระ, เงินต้นคงเหลือ, ดอกเบี้ยคงเหลือ, ดอกเบี้ยค้าง, ดอกเบี้ย, ดอกเบี้ยสะสม};
    }




    useEffect(() => {
        setLoaded(true);

        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log(res)
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


    const getSearchSummaryNoticeInvoice = () => {
        const month = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
        setIsLoading(true)
        // Fetch API SP_Warning 
        axios.post(
            `${server_hostname}/admin/api/SP_Warning`, {
                WarnNumber: inputDataSearch.WarnNumber || '',
                FiscalYear: parseInt(inputDataSearch.FiscalYear) || '',
                Month: month[parseInt(inputDataSearch.Month - 1)] || '',
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    setIsLoading(false)
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
                    console.log(data)
                    setIsLoading(false)
                    setTableResult(data.data)
                    setRows(data.data.map((item,i)=>
                    // console.log(item.วันที่บันทึก)
                        createData(
                            i,
                            !!item.วันที่บันทึก ? moment(item.วันที่บันทึก).format('DD/MM/') + (Number(moment(item.วันที่บันทึก).format('YYYY')) + 543) : null,
                            item.เลขที่ใบสรุป,
                            item.ประจำเดือน,
                            item.เลขที่ใบเตือน,
                            !!item.วันที่ออกใบเตือน ? moment(item.วันที่ออกใบเตือน).format('DD/MM/') + (Number(moment(item.วันที่ออกใบเตือน).format('YYYY')) + 543) : null,
                            !!item.งวดชำระ ? parseFloat(item.งวดชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.เงินต้นค้างชำระ ? parseFloat(item.เงินต้นค้างชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.เงินต้นคงเหลือ? parseFloat(item.เงินต้นคงเหลือ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยต้องชำระ? parseFloat(item.ดอกเบี้ยต้องชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยค้างชำระ? parseFloat(item.ดอกเบี้ยค้างชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยครบชำระ? parseFloat(item.ดอกเบี้ยครบชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            // item.dCreated === null ? null : moment(item.dCreated).format('DD/MM/YYYY'),
                        )
                    ))
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getSearchSummaryNoticeInvoiceAll = () => {
        // const month = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
        setIsLoading(true)
        // Fetch API SP_WarningAll
        axios.post(
            `${server_hostname}/admin/api/SP_WarningAll`, {
                WarnNumber: tableTotalResult.เลขที่ใบเตือน || '',
                FiscalYear: parseInt(tableTotalResult.FISCALYESR) + 543 || '',
                Month: tableTotalResult.ประจำเดือน || '',
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    setIsLoading(false)
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
                    console.log(data)
                    setIsLoading(false)
                    setOpenSummary(true)
                    setTableResultAll(data.data)
                    setRowsAll(data.data.map((item,i)=>
                    // console.log(item.วันที่บันทึก)
                        createDataAll(
                            i,
                            item.pv_code,
                            item.Mindex,
                            item.รหัสโครงการ,
                            item.ชื่อโครงการ,
                            item.sex,
                            item.firstname,
                            item.lastname,
                            !!item.วันที่ครบกำหนดชำระ ? moment(item.วันที่ครบกำหนดชำระ).format('DD/MM/') + (Number(moment(item.วันที่ครบกำหนดชำระ).format('YYYY')) + 543) : null,
                            item.เลขที่สัญญา,
                            !!item.วันที่กู้ ? moment(item.วันที่กู้).format('DD/MM/') + (Number(moment(item.วันที่กู้).format('YYYY')) + 543) : null,
                            !!item.เงินกู้ ? parseFloat(item.เงินกู้).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.งวดชำระ ? parseFloat(item.งวดชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.เงินต้นค้างชำระ ? parseFloat(item.เงินต้นค้างชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.เงินต้นคงเหลือ? parseFloat(item.เงินต้นคงเหลือ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยคงเหลือ? parseFloat(item.ดอกเบี้ยคงเหลือ).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยค้าง? parseFloat(item.ดอกเบี้ยค้าง).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ย? parseFloat(item.ดอกเบี้ย).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            !!item.ดอกเบี้ยสะสม? parseFloat(item.ดอกเบี้ยสะสม).toLocaleString('en-US', { minimumFractionDigits: 2 }) : 0,
                            // item.dCreated === null ? null : moment(item.dCreated).format('DD/MM/YYYY'),
                        )
                    ))
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const gotoGetSummaryNoticeInvoice1PDF = (noticeInvoiceNumber, ind) => {
            setIsLoadingExport(prevState => ({
                ...prevState,
                [ind]: true
            }))
    
            let formData = new FormData(); 
            formData.append('NoticeInvoiceNo', noticeInvoiceNumber)
            formData.append('ProvinceID', localStorage.getItem('provinceid'));
            formData.append('UserName', localStorage.getItem('provinceid'))
            formData.append('Username', localStorage.getItem('provinceid'))
            formData.append('RoleID', localStorage.getItem('nROLEID'))
    
            axios({
                url: `${siteprint}/report/pdf/GetSummaryNoticeInvoice1Pdf`, //your url
                method: 'POST',
                data: formData,
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
                document.body.appendChild(link);
                link.click();
    
                setIsLoadingExport(prevState => ({
                    ...prevState,
                    [ind]: false
                }))
            }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
            .finally(() => {
                if (isMounted.current) {
                    setIsLoading(false)
                }
            });
    }

    const gotoGetSummaryNoticeInvoice2PDF = (noticeInvoiceNumber, ind) => {
        setIsLoadingExport2(prevState => ({
            ...prevState,
            [ind]: true
        }))

        let formData = new FormData(); 
        formData.append('NoticeInvoiceNo', noticeInvoiceNumber)
        formData.append('ProvinceID', localStorage.getItem('provinceid'));
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('Username', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
            url: `${siteprint}/report/pdf/GetSummaryNoticeInvoice2Pdf`, //your url
            method: 'POST',
            data: formData,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();

            setIsLoadingExport2(prevState => ({
                ...prevState,
                [ind]: false
            }))
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
                setIsLoading(false)
            }
        });
}

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    // Radio Button
    const handleChangeTypeLoan = (event) => {
        setInputData({...inputData,
            typeLoan: event.target.value
        })
        console.log('typeLoan ',event.target.value)
    };
    const handleChangeTypePay = (event) => {
        setInputData({...inputData,
            typePay: event.target.value
        })
        console.log('typePay ',event.target.value)
    };

    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            idNum: event.target.value
        })
        console.log('idNum ',event.target.value)
    }
    // End Input ID Number

    // Input Tel Number
    const handleTelNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,10)
        setInputData({...inputData,
            telNum: event.target.value
        })
    }
    // End Input Tel Number

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleInputData = (name, value) => {
        console.log(name, value)

        setInputData({...inputData, [name]: value})
    }

    const handleInputData2 = (name, value) => {
        console.log(name, value)

        setInputData2({...inputData2, [name]: value})
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

    const gotoSummary = () => {
        setOpenInfo(true);
    }

    const gotoSummary2 = () => {
        setOpenInfo2(true);
    }

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
    }

    const getDatail = (id) => {
        console.log('getDetail: , ',tableResult[id])
        const data = tableResult[id]
        setTableTotalResult(data)
        setOpenDetail(true)
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
                                <h1>สรุปผลการเตือนหนี้ 2 ครั้ง หลังครบกําหนดชําระ 2 เดือน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                     <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ปีงบประมาณ" value={inputDataSearch.FiscalYear} name="FiscalYear" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelectMonth label="เลือกเดือน" name="Month" value={inputDataSearch.Month}  onChange={handleInputDataSearch} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} className="mg-t-10">
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="วันที่ มีผลต่อ ยอดเงิน และ ดอกเบี้ย"  inputdisabled="input-disabled" value={newOrderDate(inputDataSearch.ProcessDate)} name="ProcessDate" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiTextfield label="เลขที่ใบเตือน" value={inputDataSearch.WarnNumber} name="WarnNumber" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={()=> { getSearchSummaryNoticeInvoice() }} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่ประมวลผล" name="OrderDate" value={inputData.OrderDate} onChange={(newValue)=>{ handleInputData('OrderDate', moment(newValue).format('YYYY-MM-DD')) }}   />
                                    </Grid>
                                </Grid>
                            </Grid> */}
                        </Grid>

                        <Grid item xs={12} md={12}> 
                            <div className="table mg-t-20">
                                <div className="table-box table-searchfamer mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={11} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionView={true} 
                                        viewEvent={getDatail}
                                        viewParam={'id'}
                                    />
                                </div>
                            </div>
                        </Grid>
                    </Container>

                { openDetail ?
                    <>
                        <Container maxWidth={false} className="mg-t-20">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <Box className="box-blue">
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">อ้างถึงใบแจ้งหนี้</p>
                                            <p className="box-blue-body">{!!tableTotalResult.อ้างถึงใบแจ้งหนี้ ? tableTotalResult.อ้างถึงใบแจ้งหนี้ : '-'}</p>
                                        
                                            <p className="box-blue-head">ลงวันที่</p>
                                            <p className="box-blue-body">{!!tableTotalResult.วันที่บันทึก ? newOrderDate(tableTotalResult.วันที่บันทึก) : '-' }</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">อ้างถึงใบเตือน</p>
                                            <p className="box-blue-body">{!!tableTotalResult.อ้างถึงใบเตือน ? tableTotalResult.อ้างถึงใบเตือน : '-' }</p>
                                        
                                            <p className="box-blue-head">ลงวันที่</p>
                                            <p className="box-blue-body">{!!tableTotalResult.วันที่ออกใบเตือน ? newOrderDate(tableTotalResult.วันที่ออกใบเตือน) : '-' }</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">เงินครบชำระ</p>
                                            <p className="box-blue-body">{!tableTotalResult.เงินครบชำระ ? '0' : parseFloat(tableTotalResult.เงินครบชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        
                                            <p className="box-blue-head">จำนวนราย</p>
                                            <p className="box-blue-body">{!!tableTotalResult.Person ? tableTotalResult.Person : 0}</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">เงินต้นค้างชำระ</p>
                                            <p className="box-blue-body">{!tableTotalResult.เงินต้นค้างชำระ ? '0' : parseFloat(tableTotalResult.เงินต้นค้างชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                            <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยค้างชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยค้างชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                            <p className="box-blue-body">{!tableTotalResult.เงินต้นคงเหลือ ? '0' : parseFloat(tableTotalResult.เงินต้นคงเหลือ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                            <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยที่ต้องชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยที่ต้องชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        </Box>
                                        <Box className="box-blue-item">
                                            <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                            <p className="box-blue-body">{!tableTotalResult.ดอกเบี้ยครบกำหนดชำระ ? '0' : parseFloat(tableTotalResult.ดอกเบี้ยครบกำหนดชำระ).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>

                        <Container  maxWidth={'lg'}>
                            <Grid container spacing={2} className="btn-row txt-center" style={{margin: 'auto'}}>
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <ButtonFluidPrimary label="ดูสรุปข้อมูล" maxWidth="200px" onClick={getSearchSummaryNoticeInvoiceAll} />
                                </Grid>
                            </Grid>
                        </Container>
                    </>
                    : null
                }

                { openSummary ?
                    <>
                    <Container maxWidth={false} className="mg-t-20">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                            <div className="table mg-t-20">
                                <div className="table-box table-searchfamer mg-t-10">
                                    <MUItable 
                                        headCells={headCellsAll} 
                                        rows={rowsAll} 
                                        rowsLabel={rowsLabelAll} 
                                        colSpan={11} 
                                        hasCheckbox={false} 
                                        hasAction={false} 
                                    />
                                </div>
                            </div>
                                {/* <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">pv_code</TableCell>
                                                    <TableCell align="left">mindex	</TableCell>
                                                    <TableCell align="left">โครงการ	</TableCell>
                                                    <TableCell align="left">ชื่อโครงการ	</TableCell>
                                                    <TableCell align="left">คำนำหน้า</TableCell>
                                                    <TableCell align="left">ชื่อ</TableCell>
                                                    <TableCell align="left">นามสกุล</TableCell>
                                                    <TableCell align="left">วันที่ ครบชำระ</TableCell>
                                                    <TableCell align="left">เลขที่สัญญา</TableCell>
                                                    <TableCell align="left">วันที่กู้</TableCell>
                                                    <TableCell align="left">เงินกู้</TableCell>
                                                    <TableCell align="left">เงินงวดชำระ</TableCell>
                                                    <TableCell align="left">เงินค้างชำระ</TableCell>
                                                    <TableCell align="left">เงินต้นคงเหลือ</TableCell>
                                                    <TableCell align="left">ดอกเบี้ยคงเหลือ</TableCell>
                                                    <TableCell align="left">ดอกเบี้ยค้าง</TableCell>
                                                    <TableCell align="left">ดอกเบี้ย</TableCell>
                                                    <TableCell align="left">ดอกเบี้ยสะสม</TableCell>
                                                    {/* <TableCell align="left" className="sticky tb-w-14em">&nbsp;</TableCell> */}
                                               {/* </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tableResult.length ? 
                                                        (rowsPerPage > 0
                                                            ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : tableResult
                                                        ).map((cell,i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="left">{cell.value1}</TableCell>
                                                            <TableCell align="left">{cell.value2}</TableCell>
                                                            <TableCell align="left">{cell.value3}</TableCell>
                                                            <TableCell align="left">{cell.value4}</TableCell>
                                                            <TableCell align="left">{cell.value5}</TableCell>
                                                            <TableCell align="left">{cell.value6}</TableCell>
                                                            <TableCell align="left">{cell.value7}</TableCell>
                                                            <TableCell align="left">{cell.value8}</TableCell>
                                                            <TableCell align="left">{cell.value9}</TableCell>
                                                            <TableCell align="left">{cell.value10}</TableCell>
                                                            <TableCell align="left">{cell.value11}</TableCell>
                                                            <TableCell align="left">{cell.value12}</TableCell>
                                                            <TableCell align="left">{cell.value13}</TableCell>
                                                            <TableCell align="left">{cell.value14}</TableCell>
                                                            <TableCell align="left">{cell.value15}</TableCell>
                                                            <TableCell align="left">{cell.value16}</TableCell>
                                                            <TableCell align="left">{cell.value17}</TableCell>
                                                            <TableCell align="left">{cell.value18}</TableCell>
                                                            {/* <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}} className="sticky tb-w-14em">
                                                                <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="120px" onClick={()=>gotoSummary(cell.xxx)} />
                                                            </TableCell> */}
                                                            
                                                       {/* </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={13} align="left">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                        component="div"
                                        count={tableResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />/*}
                                </div> */}
                            </Grid>
                            <Grid item xs={12} md={12} className="text-center" style={{margin: 'auto'}}>
                                <ButtonFluidIconStartPrimary label="พิมพ์ใบสรุป" maxWidth="180px" startIcon={<PrintIcon />} onClick={()=> gotoGetSummaryNoticeInvoice1PDF(tableTotalResult.เลขที่ใบเตือน,0)} /> 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonFluidIconStartPrimary label="พิมพ์ใบสรุป" maxWidth="180px" startIcon={<PrintIcon />} onClick={()=> gotoGetSummaryNoticeInvoice2PDF(tableTotalResult.เลขที่ใบเตือน,0)} /> 
                            </Grid>


                            {
                                openInfo ?
                                <React.Fragment>
                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidIconStartPrimary label="พิมพ์ใบสรุป" maxWidth="180px"  startIcon={<PrintIcon />} /> 
                                        <div className="table mg-t-10">
                                            <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">pv_code</TableCell>
                                                            <TableCell align="left">mindex	</TableCell>
                                                            <TableCell align="left">ชื่อโครงการ	</TableCell>
                                                            <TableCell align="left">ชื่อ</TableCell>
                                                            <TableCell align="left">นามสกุล</TableCell>
                                                            <TableCell align="left">วันที่ออกใบเตือน</TableCell>
                                                            <TableCell align="left">เลขที่เตือน</TableCell>
                                                            <TableCell align="left">วันที่ชำระเงิน</TableCell>
                                                            <TableCell align="left">เงินกู้</TableCell>
                                                            <TableCell align="left">เงินต้นค้างชำระ</TableCell>
                                                            <TableCell align="left">เงินค้างงวด</TableCell>
                                                            <TableCell align="left">เงินต้นคงเหลือ</TableCell>
                                                            <TableCell align="left">ดอกเบี้ย</TableCell>
                                                            <TableCell align="left">ดอกเบี้ยสะสม</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            tableResultAll.length ? 
                                                                (rowsPerPage > 0
                                                                    ? tableResultAll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                    : tableResultAll
                                                                ).map((cell,i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell align="left">{cell.value1}</TableCell>
                                                                    <TableCell align="left">{cell.value2}</TableCell>
                                                                    <TableCell align="left">{cell.value3}</TableCell>
                                                                    <TableCell align="left">{cell.value4}</TableCell>
                                                                    <TableCell align="left">{cell.value5}</TableCell>
                                                                    <TableCell align="left">{cell.value6}</TableCell>
                                                                    <TableCell align="left">{cell.value7}</TableCell>
                                                                    <TableCell align="left">{cell.value8}</TableCell>
                                                                    <TableCell align="left">{cell.value9}</TableCell>
                                                                    <TableCell align="left">{cell.value10}</TableCell>
                                                                    <TableCell align="left">{cell.value11}</TableCell>
                                                                    <TableCell align="left">{cell.value12}</TableCell>
                                                                    <TableCell align="left">{cell.value13}</TableCell>
                                                                    <TableCell align="left">{cell.value14}</TableCell>
                                                                    
                                                                </TableRow>
                                                                
                                                            ))
                                                            : 
                                                            <TableRow>
                                                                <TableCell colSpan={13} align="left">ไม่พบข้อมูล</TableCell>
                                                            </TableRow>
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                                component="div"
                                                count={tableResult.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                labelRowsPerPage="แสดงจำนวนแถว"
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} md={12} className="mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="รหัสบันทึก" value={inputData2.RecCode} name="RecCode" onChange={(e)=>handleInputData2(e.target.name, e.target.value)}  />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก" name="RecDate" value={inputData2.RecDate} onChange={(newValue)=>{ handleInputData2('RecDate', moment(newValue).format('YYYY-MM-DD')) }}   />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="เลขที่ใบสรุป" value={inputData2.SummaryNumber} name="SummaryNumber" onChange={(e)=>handleInputData2(e.target.name, e.target.value)}  />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ลำดับที่ใบสรุป" value={inputData2.SummaryNo} name="SummaryNo" onChange={(e)=>handleInputData2(e.target.name, e.target.value)}  />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <p>&nbsp;</p>
                                                <ButtonFluidPrimary label="บันทึก" onClick={gotoSummary2} />  
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                                : null
                            }
                        </Grid>
                    </Container>
                </>
                : null }
                </div>
            </Fade>
        </div>
    )
}

export default SummaryNoticeInvoice
