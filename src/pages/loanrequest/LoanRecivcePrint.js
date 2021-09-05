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


    const [inputData, setInputData] = useState({
        LoanID: 0, // Int = 10,
        Time: 0, // Int = 2,
        LoanReceiptDate: null, // Date = "2021-05-09",
        LoanReceiptfrom: '', // String = "xxx",
        LoanReceiptfrom2:'' , // String = "yyy",
        LoanReceiptList1: '', // String = "zzz",
        LoanReceiptAmount1: 0, // float =  123.12,
        LoanReceiptList2: '', // String = "zzz",
        LoanReceiptAmount2: 0, // float = 123.12,
        LoanReceiptList3: '', // String = "zzz",
        LoanReceiptAmount3: 0, // float = 123.12,
    })

    let sumTable = 
    ((inputData.LoanReceiptAmount1 === 0 || inputData.LoanReceiptAmount1 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) + 
    (inputData.LoanReceiptAmount2 === 0 || inputData.LoanReceiptAmount2 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))) +
    (inputData.LoanReceiptAmount3 === 0 || inputData.LoanReceiptAmount3 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join('')))).toLocaleString('en-US', {minimumFractionDigits: 2})

    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000',
    })

    const [rows, setRows] = useState([
        { RecordCode: '1234', RecDate: '2021-08-23', ApplicantNo: 12345, ProjectID: 163, ProjectName: 'test project', LoanNumber: 234, dCreated: '2021-08-22',IDCard: 1234567890123, FrontName: 'นาย', Name: 'ทดสอบ', Sirname: 'สอบทด', IDCARD_AddNo: '134 ม.4',
        }
    ])

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
    ]

    function createData(FarmerID, ApplicantID, LoanID,RecordCode, RecDate, ApplicantNo, ProjectID,ProjectName, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, IDCARD_AddNo) {
        return {FarmerID, ApplicantID, LoanID, RecordCode, RecDate, ApplicantNo, ProjectID,ProjectName, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, IDCARD_AddNo }
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

    const handleSelectDate = (event) => {
        let type = event.target.name
        
        setInputSelectDate({
            ...inputSelectDate,
            [event.target.name]: event.target.value.toString()
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
        let yyyy = Number(val.substring(6,10)) - 543
        let mm = val.substring(3,5)
        let dd = val.substring(0,2)
        return yyyy+'-'+mm+'-'+dd
    }


    const handlePrintPDF = (val) => {
        console.log('PDF - ContractNo(val):', val)
        let loanNumber = val;
        let formData = new FormData(); 
        formData.append('ContractNo', 11111111111/*loanNumber*/)

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


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(
            `${server_hostname}/admin/api/add_loanfarmergetmoney`, {
                LoanID: inputData.LoanID,
                Time: inputData.Time,
                LoanReceiptDate: reOrderDateTHtoEN(inputSelectDate.dd+'-'+inputSelectDate.mm+'-'+inputSelectDate.yyyy),
                LoanReceiptfrom: inputData.LoanReceiptfrom.toString(),
                LoanReceiptfrom2: inputData.LoanReceiptfrom2.toString(),
                LoanReceiptList1: inputData.LoanReceiptList1.toString(),
                LoanReceiptAmount1: (inputData.LoanReceiptAmount1 === 0 || inputData.LoanReceiptAmount1 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount1.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptList2: inputData.LoanReceiptList2.toString(),
                LoanReceiptAmount2: (inputData.LoanReceiptAmount2 === 0 || inputData.LoanReceiptAmount2 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount2.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
                LoanReceiptList3: inputData.LoanReceiptList3.toString(),
                LoanReceiptAmount3: (inputData.LoanReceiptAmount3 === 0 || inputData.LoanReceiptAmount3 === '' ? 0 : parseFloat((inputData.LoanReceiptAmount3.toLocaleString('en-US', {minimumFractionDigits: 2})).split(',').join(''))),
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

    const openInfoDialog = () => {
        setInfo(true)
    }

    const openFormField = () => {
        setFormField(true)
    }

    return (
        <div className="loanrequestprint-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา"  defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                                <div className="table-box table-loanrequestprint mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={12} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionView={true} 
                                        actionCreate={true}
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        viewEvent={openInfoDialog}
                                        createEvent={openFormField}
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
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell colSpan={12} align="center">ไม่พบข้อมูล</TableCell>
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
                                                        <MuiTextfield label="ใบสำคัญรับเงิน" />
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
                                                        <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={1}>
                                                        {/* Field Select ---------------------------------------------------*/}
                                                        <MuiTextfield label="บ้านเลขที่"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="หมู่"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="ตำบล"   inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="อำเภอ"  inputdisabled="input-disabled"  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        {/* Field Text ---------------------------------------------------*/}
                                                        <MuiTextfield label="จังหวัด"  inputdisabled="input-disabled"  />
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
                                                            <TableCell align="center">
                                                                <MuiTextfield label="" name="LoanReceiptList1" value={inputData.LoanReceiptList1} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount1" value={inputData.LoanReceiptAmount1} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center">
                                                                <MuiTextfield label="" name="LoanReceiptList2" value={inputData.LoanReceiptList2} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount2" value={inputData.LoanReceiptAmount2} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center">
                                                                <MuiTextfield label="" name="LoanReceiptList3" value={inputData.LoanReceiptList3} onChange={handleInputData}  />    
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <MuiTextfieldCurrency  label="" name="LoanReceiptAmount3" value={inputData.LoanReceiptAmount3} onChange={handleInputData} />
                                                            </TableCell>
                                                        </TableRow>
                                                    {/* {
                                                        [1,2,3].map((row,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldStartAdornment label=""  defaultValue="" startAdornment={(i+1)+'. '} />    
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <MuiTextfieldCurrency  label="" />
                                                                </TableCell>
                                                            </TableRow>
                                                        )) 
                                                    }*/}
                                                        {/* <TableRow>
                                                            <TableCell align="center">
                                                                <ButtonFluidPrimary maxWidth="500px" label="+ เพิ่มรายการ" />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <p>รวม 50,000 บาท</p>
                                                            </TableCell>
                                                        </TableRow> */}
                                                        <TableRow>
                                                            <TableCell align="center">
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
                                        <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF} />
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
                                    <p className="font-18" style={{marginTop: '40px'}}>ประวัติออกใบสำคัญ &nbsp;&nbsp;&nbsp;&nbsp; <span className="txt-blue">ทั้งหมด 3 รายการ</span></p>
                                    <hr style={{width: '100%', margin: '20px 0 10px', borderTop: '2px solid #2284d0'}} />
                                            
                                    {
                                        [1,2,3].map((item,i)=>
                                            <React.Fragment>
                                                <Grid item xs={12} md={12}>
                                                    <p className="font-18 txt-blue txt-bold">รายการที่ {i+1}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ใบสำคัญรับเงิน" inputdisabled="input-disabled" />
                                                    
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ลงวันที่" inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={1}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="คำนำหน้า"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="ชื่อ"  inputdisabled="input-disabled" />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="นามสกุล"  inputdisabled="input-disabled" />
                                                </Grid>
                                                <Grid item xs={12} md={1}>
                                                    {/* Field Select ---------------------------------------------------*/}
                                                    <MuiTextfield label="บ้านเลขที่"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="หมู่"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="ตำบล"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="อำเภอ"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="จังหวัด"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="ได้รับเงินจากกรม"  inputdisabled="input-disabled"  />
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    {/* Field Text ---------------------------------------------------*/}
                                                    <MuiTextfield label="กระทรวง"  inputdisabled="input-disabled"  />
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
                                                                {
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
                                                                }
                                                                    <TableRow>
                                                                        <TableCell align="center">
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
                                    }
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
        </div>
    )
}

export default LoanRecivcePrint
