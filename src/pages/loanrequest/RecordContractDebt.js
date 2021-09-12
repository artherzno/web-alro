import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiRadioButton,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function EditContractDebt() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')
    let provincename = localStorage.getItem('provincename');

    // const [action, setAction] = useState('add');
    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState('เมื่อยืนยันสร้างสัญญาเรียบร้อย ไม่สามารถแก้ไขสัญญาได้')
    const [tableResult, setTableResult] = useState([])
    const [formField, setFormField] = useState(false)

    const [provinceList, setprovinceList] = useState(['กรุณาเลือกจังหวัด']);
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))
    const [inputData, setInputData] = useState({
        typeDoc: '1',
    })

    const [inputDataSearch, setInputDataSearch] = useState({
        Name: '',
        Sirname: '',
        IDCard: '',
        LoanID: '',
        LoanNumber: '',
    })

    const [rows, setRows] = useState([])

    const rowsLabel = [
        // 'ApplicantID',
        // 'FarmerGrade',
        'Status', 
        'LoanNumber',
        'dCreated',
        'IDCard', 
        'FrontName',
        'Name',
        'Sirname', 
        'Tel',
    ]

    const headCells = [
        // { id: 'ApplicantID', numeric: false, disablePadding: true, widthCol: '0px', label: 'รหัสบันทึก' },
        // { id: 'FarmerGrade', numeric: false, disablePadding: true, widthCol: '0px', label: 'ระดับเกษตรกร' },
        { id: 'Status', numeric: false, disablePadding: false, widthCol: '150px', label: 'สถานะสัญญา' },
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '150px', label: 'เลขที่สัญญา' },
        { id: 'dCreated', numeric: false, disablePadding: false, widthCol: '150px', label: 'วันที่กู้' },
        { id: 'IDCard', numeric: false, disablePadding: false, widthCol: '180px', label: 'เลขบัตรประชาชน' },
        { id: 'FrontName', numeric: false, disablePadding: false, widthCol: '150px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: false, widthCol: '150px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: false, widthCol: '150px', label: 'นามสกุล' },
        { id: 'Tel', numeric: false, disablePadding: false, widthCol: '150px', label: 'โทรศัพท์' },
    ]

    function createData(FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel) {
        return {FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel }
    }

    // New order date 2021-08-23 to 23/08/2564
    const newOrderDate = (val) => {
        let yyyy = Number(val.substring(0,4)) + 543
        let mm = val.substring(5,7)
        let dd = val.substring(8,10)
        return dd+'/'+mm+'/'+yyyy
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

    

    const getSearchCloseLoanRec = () => {
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/search_close_loanrec`, {
                Name: inputDataSearch.Name,
                Sirname: inputDataSearch.Sirname,
                IDCard: inputDataSearch.IDCard,
                LoanID: inputDataSearch.LoanID,
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
                    console.log(data)
                    setTableResult(data.data)
                    // setRows(data.data)
                    setRows(
                        data.data.map((item,i)=>
                            createData(
                                item.FarmerGrade,
                                item.ApplicantID,
                                item.Statue === null ? '' : !item.Statue ? 'ปิด' : 'เปิด',
                                item.LoanNumber === null ? '' : item.LoanNumber,
                                item.dCreated ? newOrderDate(item.dCreated) : null,
                                item.IDCard === null ? '' : item.IDCard,
                                item.FrontName === null ? '' : item.FrontName,
                                item.Name === null ? '' : item.Name,
                                item.Sirname === null ? '' : item.Sirname,
                                item.Tel === undefined ? '' : item.Tel 
                            )
                        )
                    )
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
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

    // Radio Button
    const handleChangeTypeDoc = (event) => {
        setInputData({...inputData,
            typeDoc: event.target.value
        })
        console.log('typeBill ',event.target.value)
    };
    // End Radio Button

    const openFormField = () => {
        setFormField(true)
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
    
    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        
        // history.push('/manageinfo/searchmember');

    };

    const gotoPrintContractDebt = () => {
        history.push('/loanrequest/PrintContractDebt');
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
                                <h1>สร้าง / บันทึกสัญญาแปลงหนี้</h1>
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาชื่อ" value={inputDataSearch.Name} name="Name" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหานามสกุล" value={inputDataSearch.Sirname} name="Sirname" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" value={inputDataSearch.LoanNumber} name="LoanNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่คำขอกู้ยืมเงิน" value={inputDataSearch.LoanID} name="LoanID" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขบัตรประชาชน" value={inputDataSearch.IDCard} name="IDCard" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchCloseLoanRec} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(tableResult.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-loanrequestprint mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={36} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionCreate={true}
                                        actionView={false} 
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        printParam1={'LoanNumber'}
                                        tableName={'addRecordCourtContract'}
                                        createEvent={openFormField}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        formField ? 
                            <React.Fragment>       
                                <Container maxWidth="lg">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <p className="mg-t-20">สัญญาแปลงหนี้ใหม่จากสัญญากู้ยืมเงินเลขที่ RIET2343525/00003</p>
                                            {/* Paper 1 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper mg-t-10">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="สัญญานี้ทำขึ้นเมื่อวันที่"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ณ สำนักงานการปฏิรูปที่ดินจังหวัด" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ถนน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ตำบล" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="อำเภอ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="จังหวัด" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ระหว่างสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.) โดย" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="จังหวัด" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="ผู้รับมอบอำนาจให้ทำสัญญาแทนตามคำสั่งสำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม ที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="และคำสั่งจังหวัด" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="ที่" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiDatePicker label="ลงวันที่"  defaultValue="2017-05-24" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={1} className="txt-center-v">
                                                            <p>ฝ่ายหนึ่งกับ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ชื่อ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="นามสกุล" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfieldEndAdornment label="อายุ" defaultValue="" endAdornment="ปี"/>
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เลขบัตรประชาชน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="อยู่บ้านเลขที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="ถนน"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            {/* Field Text ---------------------------------------------------*/}
                                                            <MuiTextfield label="หมู่"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelect label="จังหวัด"  lists={['จังหวัด1','จังหวัด2','จังหวัด3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelect label="เขต/อำเภอ"  lists={['เขต/อำเภอ1','เขต/อำเภอ2','เขต/อำเภอ3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiSelect label="แขวง/ตำบล"  lists={['แขวง/ตำบล1','แขวง/ตำบล2','แขวง/ตำบล3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <p>ปรากฏตามสำเนาภาพถ่ายบัตรประจำตัวประชาชนและสำเนาทะเบียนบ้านแนบท้ายสัญญานี้ ซึ่งต่อไปในสัญญานี้เรียกว่า “ลูกหนี้ใหม่” อีกฝ่ายหนึ่ง</p>
                                                        </Grid>
                                                        
                                                    </Grid>
                                                </form>
                                            </Paper>

                                            {/* Paper 2 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper mg-t-20">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เลขที่บันทึก" disabled="true" defaultValue="PNGA0001600005/00001" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="สัญญาเดิม" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เงินต้นค้างเดิม" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ดอกเบี้ยค้างเดิม" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={3}>
                                                                    <MuiTextfield label="ค่าปรับค้างเดิม" defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการรอง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="ชื่อโครงการรอง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="รหัสโครงการ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อโครงการ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;" id="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ใช้เงินตามแผนปี" id="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="จำนวนเงินให้กู้" id="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="โครงการหลัก"  lists={['โครงการหลัก1','โครงการหลัก2','โครงการหลัก3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="วัตถุประสงค์การกู้ยืม"  lists={['วัตถุประสงค์การกู้ยืม1','วัตถุประสงค์การกู้ยืม2','วัตถุประสงค์การกู้ยืม3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทเงินกู้"  lists={['ประเภทเงินกู้1','ประเภทเงินกู้2','ประเภทเงินกู้3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทกู้ยืม"  lists={['ประเภทกู้ยืม1','ประเภทกู้ยืม2','ประเภทกู้ยืม3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="ประเภทผู้กู้"  lists={['ประเภทเผู้กู้1','ประเภทเผู้กู้2','ประเภทเผู้กู้3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="&nbsp;"  defaultValue="" />
                                                        </Grid>
                                                        
                                                    </Grid>
                                                </form>
                                            </Paper>
                                            
                                            {/* Paper 3 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={8}>
                                                            <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <p>&nbsp;</p>
                                                            <ButtonFluidPrimary label="ค้นหา"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect disabled label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield disabled label="ชื่อ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield disabled label="นามสกุล" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={9}>
                                                            <MuiTextfield disabled label="ที่อยู่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield disabled label="เลขที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield disabled label="หมู่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="ตำบล" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="อำเภอ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="จังหวัด" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield disabled label="รหัสไปรษณีย์" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ที่ตั้งที่ดิน" defaultValue="" />
                                                        </Grid>
                                                        {/* <Grid item xs={12} md={4}>
                                                            <MuiRadioButton label="&nbsp;" lists={['คำสั่งศาล','เปลี่ยนสัญญา','กทด.']} value={inputData.typeContract} onChange={handleChangeTypeContract} type="row" />
                                                        </Grid> */}
                                                    </Grid>
                                                </form>
                                            </Paper>

                                            {/* Paper 4 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="ที่ตั้งที่ดิน หมู่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiSelect label="ตำบล"  lists={['ตำบล1','ตำบล2','ตำบล3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiSelect label="อำเภอ"  lists={['อำเภอ1','อำเภอ2','อำเภอ3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiSelect label="ประเภทที่ดิน"  lists={['ประเภทที่ดิน1','ประเภทที่ดิน2','ประเภทที่ดิน3']} />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="&nbsp;" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="เลขที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="กลุ่ม" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={3}>
                                                            <MuiTextfield label="แปลง" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="ไร่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="งาน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={1}>
                                                            <MuiTextfield label="วา" defaultValue="" />
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </Paper>

                                            {/* Paper 5 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper mg-t-35">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2} className="paper-container">
                                                        <Grid item xs={12} md={12} >
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiDatePicker label="วันที่เปลี่ยนสัญญา" defaultValue="2017-05-15" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiDatePicker label="วันที่รับแปลงหนี้" defaultValue="2017-05-15" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={12}>
                                                                                <MuiTextfieldMultiLine label="หมายเหตุ" row="3" defaultValue="" />
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <MuiDatePicker label="" defaultValue="เงินกู้" />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                
                                                                <Grid item xs={12} md={6}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">เงินต้น</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">ค่าปรับ</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">เงินต้น สัญญาเดิม</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">ดอกเบี้ย สัญญาเดิม</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">อัตราค่าปรับ</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">ผลรวมเงินต้น</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={12} md={12}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={5}>
                                                                                <p className="paper-p txt-right">ผลรวมงวดชำระ</p>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={5}>
                                                                                <MuiTextfield label="" defaultValue=""/>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </Paper>
                                        
                                            {/* Paper 6 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green paper mg-t-35">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p className="txt-green">เพิ่มข้อมูลลง DUE ให้เพิ่มต่อเนื่องอย่ากระโดดปี</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="งวด" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiDatePicker label="วันครบกำหนด"  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="จำนวนเงินต้น" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiDatePicker label=""  defaultValue="2017-05-24" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12} className="txt-center">
                                                            <ButtonFluidIconStartPrimary label="เพิ่ม" startIcon={<AddIcon />} maxWidth="275px" />
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </Paper>

                                            {/* Paper 7 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p>ในวันทำสัญญานี้ ลูกหนี้ใหม่ได้มอบหลักประกัน ดังต่อไปนี้</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ก. อสังหาริมทัพย์ที่ปราศจากข้อผูกพันใด ๆ คือ" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="โดยนำมาจำนองไว้กับผู้ให้กู้ตามหนังสือสัญญาจำนองที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                        </Grid>
                                                        <Grid item xs={12} md={8}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <p>ข. หนังสือสัญญารับรองผูกพันตนรับผิดชอบอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. ของเกษตรกรรวม</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                                                                    <MuiTextfield label="" defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={11} md={6} style={{paddingTop: '0'}} className="dsp-f">
                                                                    <span style={{marginTop: '8px'}}>(&nbsp;</span><MuiTextfieldEndAdornment label="" defaultValue="" endAdornment=") ราย"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญารับรองฯ ที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <p>ค. หนังสือสัญญาค้ำประกันของ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="(1)" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="(2)" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ตามหนังสือสัญญาค้ำประกันที่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiDatePicker label="ลงวันที่" defaultValue="2017-05-15" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                    </Grid>
                                                </form>
                                            </Paper>

                                            {/* Paper 8 - -------------------------------------------------- */}
                                            <Paper className="paper line-top-green">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} md={12}>
                                                            <p>หมายเหตุ</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="1. ชื่อพยาน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="2. ชื่อพยาน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="ที่อยู่" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={5}>
                                                            <MuiTextfield label="เลขประจำตัวประชาชน" defaultValue="" />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <MuiTextfield label="สถานที่ออกบัตร" defaultValue="" />
                                                        </Grid>
                                                    </Grid>
                                                </form>
                                            </Paper>

                                        </Grid>

                                    </Grid>
                                </Container>
                                
                                {/* Button row */}
                                <Container maxWidth="sm">
                                    <Grid container spacing={2} className="btn-row">
                                        <Grid item xs={12} md={6}>
                                            <ButtonFluidPrimary label="ยืนยันการเพิ่ม" onClick={()=>gotoPrintContractDebt()} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </React.Fragment>
                        : null
                    }
                </div>
            </Fade>
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
                open={confirm}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{confirmMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            &nbsp;&nbsp;
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

export default EditContractDebt
