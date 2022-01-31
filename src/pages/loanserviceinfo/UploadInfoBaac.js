import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiUploadDat,
    MuiDatePicker,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { AuthContext } from '../../App';
import { Divider } from '@material-ui/core';

// import { MUItable } from '../../components/MUItable'

function UploadInfoBaac() {
    const history = useHistory();
    const isMounted = useRef(null);

    const auth = useContext(AuthContext);
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [confirmDatCode1, setConfirmDatCode1] = useState(false)
    const [confirmDatCode9, setConfirmDatCode9] = useState(false)
    const [msgCode9, setMsgCode9] = useState('')

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        fileDatUpload: [],
        uploadDate: moment().format('YYYY-MM-DD'),
    })
    const [headId, setHeadId] = useState(null)

    const [tableResult, setTableResult] = useState([])
    const [rows, setRows] = useState([])
    const [header, setHeader] = useState([])
    const [total, setTotal] = useState([])

    const rowsLabel = [
        'time', 
        'ref1', 
        'ref2',
        // 'ref3',
        'customer',
        'br', 
        'channel',
        'term',
        'sof', 
        'amount',
        'fee',
        'rev', 
        'comm',
    ]

    const headCells = [
        { id: 'time', numeric: false, disablePadding: true, widthCol: '140px', label: 'TIME' },
        { id: 'ref1', numeric: false, disablePadding: false, widthCol: '150px', label: 'REF 1' },
        { id: 'ref2', numeric: false, disablePadding: false, widthCol: '180px', label: 'REF 2' },
        // { id: 'ref3', numeric: false, disablePadding: false, widthCol: '150px', label: 'REF 3' },
        { id: 'customer', numeric: false, disablePadding: false, widthCol: '150px', label: 'CUSTOMER' },
        { id: 'br', numeric: false, disablePadding: false, widthCol: '150px', label: 'BR' },
        { id: 'channel', numeric: false, disablePadding: false, widthCol: '150px', label: 'CHANNEL' },
        { id: 'term', numeric: false, disablePadding: false, widthCol: '150px', label: 'TERM' },
        { id: 'sof', numeric: false, disablePadding: false, widthCol: '180px', label: 'SOF' },
        { id: 'amount', numeric: false, disablePadding: false, widthCol: '180px', label: 'AMOUNT' },
        { id: 'fee', numeric: false, disablePadding: false, widthCol: '150px', label: 'FEE' },
        { id: 'rev', numeric: false, disablePadding: false, widthCol: '150px', label: 'REV.' },
        { id: 'comm', numeric: false, disablePadding: false, widthCol: '150px', label: 'COMM.' },
    ]

    function createData(time,ref1,ref2,/*ref3,*/customer,br,channel,term,sof,amount,fee,rev,comm) {
        return {time,ref1,ref2,/*ref3,*/customer,br,channel,term,sof,amount,fee,rev,comm}
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

    const handleUploadFile = (event) => {
        let fileArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            fileArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            fileDatUpload: fileArr
        })
    }

    const handleRemoveUploadFile = () => {
        setInputData({...inputData, fileDatUpload: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("file-upload-input")
        myFile.type = ''
        myFile.type = 'file'
    }


    const handleSubmit = (event) => {
        setIsLoading(true)
        event.preventDefault();

        let uploadBaacForm = document.getElementById('uploadBaac');
        let formData = new FormData(uploadBaacForm);
        
        axios.post(
            `${server_hostname}/admin/api/check_datinfo`, formData, { headers: { "token": token } } 
        ).then(res => {
                setIsLoading(false)
                
                console.log(res)
                let data = res.data;
                if(data.code === 0) {
                    setConfirmDatCode1(false)
                    setConfirmDatCode9(false)
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
                    // Check status code
                    // console.log('data.code',data.code)
                    if(data.code === 1) {
                        setConfirmDatCode1(true)
                        setConfirmDatCode9(false)
                    } else if(data.code === 9) {
                        setMsgCode9(data.message)
                        setConfirmDatCode9(true)
                        setConfirmDatCode1(false)
                    } else {
                        setConfirmDatCode1(false)
                        setConfirmDatCode9(false)
                    }

                    // console.log(data.data)
                    setHeader(data.data.Header)
                    setTotal(data.data.Total)
                    setTableResult(data.data.Detail)
                    setHeadId(data.head_id)

                    // console.log('data header',data.data.Header)
                    // console.log('data total',data.data.Total)
                    // console.log('data total',data.data.Detail)
                    
                    // setRows(
                    //     data.map((item,i)=>
                    //         createData(
                    //             item.FarmerID,
                    //             item.ApplicantID,
                    //             item.LoanID,
                    //             item.RecordCode === null ? '' : item.RecordCode,
                    //             item.RecDate === null ? '' : item.RecDate,
                    //             !!item.ApplicantDate ? item.ApplicantDate : null,
                    //             item.ApplicantNo === null ? '' : item.ApplicantNo,
                    //             item.ApplicantStatus === null || !item.ApplicantStatus ? 'P' : item.ApplicantStatus,
                    //             item.ProjectID === null ? '' : item.ProjectID,
                    //             item.ProjectName === null ? '' : item.ProjectName,
                    //             item.LoanNumber === null ? '' : item.LoanNumber,
                    //             item.dCreated ? item.dCreated : null,
                    //             item.IDCard === null ? '' : item.IDCard,
                    //             item.FrontName === null ? '' : item.FrontName,
                    //             item.Name === null ? '' : item.Name,
                    //             item.Sirname === null ? '' : item.Sirname,
                    //             item.IDCARD_AddNo === undefined ? '' : item.IDCARD_AddNo +' '+item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo === undefined ? '' : item.IDCARD_AddMoo+' '+item.IDCARD_AddrSoiRoad === undefined ? '' : item.IDCARD_AddrSoiRoad+' '+item.IDCARD_AddrSubdistrictName === undefined ? '' : item.IDCARD_AddrSubdistrictName+' '+item.IDCARD_AddrDistrictName === undefined ? '' : item.IDCARD_AddrDistrictName+' '+item.IDCARD_AddrProvinceName === undefined ? '' : item.IDCARD_AddrProvinceName+' '+item.IDCARD_Postcode  === undefined ? '' : item.IDCARD_Postcode
                    //         )
                    //     )
                    // )

                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    };


    const handleSave = () => {
        setIsLoading(true)
        console.log('head_id',headId)
        
        axios.post(
            `${server_hostname}/admin/api/save_datinfo`, {
                head_id: headId
            }, { headers: { "token": token } } 
        ).then(res => {
                setIsLoading(false)
                
                console.log(res)
                let data = res.data;
                if(data.code === 0) {
                    setConfirmDatCode1(false)
                    setConfirmDatCode9(false)
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
                    // Check status code
                    // console.log('data.code',data.code)
                    setSuccess(true);
                    setSuccessMsg('บันทึกข้อมูลเรียบร้อย')


                }
            }
        ).catch(err => { 
            console.log(err)
            setErr(true);
            setErrMsg('ไม่สามารถทำรายการได้')
        })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    };

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        handleRemoveUploadFile()
        setIsLoading(false)
    };

    const handleCloseTable = () => {
        setConfirmDatCode1(false)
        setConfirmDatCode9(false)
        handleRemoveUploadFile()
    }

    return (
        <div className="uploadinfobaac-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <form id="uploadBaac" className="root" noValidate autoComplete="off">
                    
                    <div className="fade">
                        <Container maxWidth="sm">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page"> 
                                    <h1>โอนข้อมูลจาก ธ.ก.ส. จาก upload</h1>
                                    {/* <h2 className="txt-red mg-t-20 txt-regular">ต้องประมวล ณ วันที่ ก่อน upload file จากธนาคาร</h2> */}
                                </Grid>
                                <Grid item xs={12} md={12} className="mg-t-10">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={7}>
                                            <MuiDatePicker label="วันที่ upload" id="upload-date-input" name="uploadDate" value={inputData.uploadDate} onChange={(newValue)=>{ setInputData({ ...inputData, uploadDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                        </Grid>
                                    </Grid>
                                </Grid> 
                                {/* <Grid item xs={12} md={3}>
                                    <MuiTextfield label="" defaultValue="" />
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <MuiTextfield label="" defaultValue="" />
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <MuiDatePicker label=""  defaultValue="2017-05-15" />
                                </Grid>
                                <Grid item xs={12} md={5} className="txt-center-v">
                                    <p className="txt-red">วันที่รับเงินจากธนาคาร</p>
                                </Grid> */}

                                <Grid item xs={12} md={12}>
                                    {/* <MuiTextfield label="ชื่อ file จากธนาคาร" defaultValue="" /> */}
                                    <p>ชื่อ file จากธนาคาร</p>
                                    <MuiUploadDat fileUpload={inputData.fileDatUpload} id="file-upload-input" name="DAT" onChange={handleUploadFile} onClick={handleRemoveUploadFile} />
                                                    
                                    {/* <p>.\upload\ชื่อ file จากธนาคาร เช่น .\upload\al7111.dat</p> */}
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    {/* <ButtonFluidPrimary label="Check file จากธนาคารว่าเป็นของจังหวัดพังงา หรือไม่" /> */}
                                    <ButtonFluidPrimary label="ตรวจไฟล์จากธนาคาร" onClick={handleSubmit} />
                                </Grid>
                            </Grid>
                        </Container>

                        
                        {
                        isLoading ? 
                            <div className="overlay">
                                <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังอัพโหลดข้อมูล...</p>
                            </div> 
                            : 
                            <React.Fragment>
                                {
                                    confirmDatCode1 || confirmDatCode9 ?
                                        <Container maxWidth={false}>
                                            <Grid container spacing={2}>
        
                                                <Grid item xs={12} md={12} className="result-header mg-t-35 mg-b-20"> 
                                                    {/* <h2>ผลการค้นหา {(tableResult.length).toLocaleString('en-US') || 0} รายการ</h2> */}
                                                    <h2 className="mg-b-15">ผลการ upload file&nbsp;
                                                    {
                                                        confirmDatCode9? <span className="txt-red">{msgCode9}</span> : confirmDatCode1? <span className="txt-green">( ข้อมูลถูกต้อง )</span> : null
                                                    }
                                                    </h2> 
                                                    <Divider/>
                                                </Grid>
        
                                                {/* <Grid item xs={12} md={1}>
                                                    <p>REPORT</p>
                                                </Grid>
                                                <Grid item xs={12} md={8}>
                                                    <p>{!!header.REPORT?header.REPORT:''}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <p>PAGE {!!header.PAGE?header.PAGE:''}</p>
                                                </Grid> */}
        
                                                <Grid item xs={12} md={1}>
                                                    <p>DATE</p>
                                                </Grid>
                                                <Grid item xs={12} md={11}>
                                                    <p>{!!header.Payment_Date?header.Payment_Date.substring(0,2)+'/'+header.Payment_Date.substring(2,4)+'/'+header.Payment_Date.substring(4,8):''}</p>
                                                </Grid>
                                                {/* <Grid item xs={12} md={3}>
                                                    <p>PRINT DATE {!!header.PRINT_DATE?header.PRINT_DATE:''}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <p>PRINT TIME {!!header.PRINT_TIME?header.PRINT_TIME:''}</p>
                                                </Grid> */}
        
                                                <Grid item xs={12} md={1}>
                                                    <p>COMANY</p>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    {/* <p>{`AL27 สำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.)สระแก้ว`}</p> */}
                                                    <p>{!!header.Company_Name?header.Company_Name:''}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <p>BRANCH: {!!header.BRANCH?header.BRANCH:''}</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <p>SWEEP: {!!header.SWEEP?header.SWEEP:''}</p>
                                                </Grid>
        
                                                <Grid item xs={12} md={12}>
                                                    <div className="table-box table-loanrequestprint mg-t-10">
                                                        {/* <MUItable 
                                                            headCells={headCells} 
                                                            rows={rows} 
                                                            rowsLabel={rowsLabel} 
                                                            colSpan={36} 
                                                            hasCheckbox={false} 
                                                            hasAction={true} 
                                                            actionView={false} 
                                                            actionEdit={false} 
                                                            actionDelete={false} 
                                                            tableName={'uploadinfobaac'}
                                                        /> */}
                                                        <TableContainer>
                                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                <TableHead>
                                                                <TableRow>
                                                                    <TableCell align="center">TIME</TableCell>
                                                                    <TableCell align="center" style={{minWidth: '100px'}}>REF 1</TableCell>
                                                                    <TableCell align="center" style={{minWidth: '100px'}}>REF 2</TableCell>
                                                                    {/* <TableCell align="center" style={{minWidth: '100px'}}>REF 3</TableCell> */}
                                                                    <TableCell align="center" style={{minWidth: '200px'}}>CUSTOMER</TableCell>
                                                                    <TableCell align="center">BR</TableCell>
                                                                    {/* <TableCell align="center">CHANNEL</TableCell> */}
                                                                    {/* <TableCell align="center">TERM</TableCell> */}
                                                                    <TableCell align="center">SOF</TableCell>
                                                                    <TableCell align="center">AMOUNT</TableCell>
                                                                    {/* <TableCell align="center">FEE</TableCell> */}
                                                                    {/* <TableCell align="center">REV.</TableCell>
                                                                    <TableCell align="center">COMM.</TableCell> */}
                                                                </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {/* Amount: "0000000400000"
                                                                        Bank_Code: "034"
                                                                        Branch_Code: "0920"
                                                                        Cheque_Bank_Code: "   "
                                                                        Cheque_No: "0000000"
                                                                        Company_Account: "0000000000"
                                                                        Customer_Name: "นางบุญมี จันทรางกูล                               "
                                                                        Kind_of_Transaction: "C"
                                                                        Payment_Date: "15032021"
                                                                        Payment_Time: "084105"
                                                                        Payment_by: "CSH"
                                                                        Record_No: "เกษตรกร รายที่ 1"
                                                                        Record_Type: "D"
                                                                        Reference_Number1: "13670700040497      "
                                                                        Reference_Number2: "002992558620100001  "
                                                                        Reference_Number3: "                    "
                                                                        Sequence_No: "000002"
                                                                        Teller_No: "0000" 
                                                                    */}
                                                                {tableResult.map((row,i) => (
                                                                    <TableRow
                                                                        key={i}
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell align="center">{!!row.Payment_Time?row.Payment_Time.substring(0,2)+':'+row.Payment_Time.substring(2,4)+':'+row.Payment_Time.substring(4,6):''}</TableCell>
                                                                        <TableCell align="center">{!!row.Reference_Number1?row.Reference_Number1 :''}</TableCell>
                                                                        <TableCell align="center">{!!row.Reference_Number2?row.Reference_Number2 :''}</TableCell>
                                                                        {/* <TableCell align="center">{!!row.Reference_Number3?row.Reference_Number3 :''}</TableCell> */}
                                                                        <TableCell align="center">{!!row.Customer_Name?row.Customer_Name :''}</TableCell>
                                                                        <TableCell align="center">{!!row.Branch_Code?row.Branch_Code :''}</TableCell>
                                                                        {/* <TableCell align="center">{!!row.CHANNEL?row.CHANNEL :''}</TableCell> */}
                                                                        {/* <TableCell align="center">{!!row.TERM?row.TERM :''}</TableCell> */}
                                                                        <TableCell align="center">{!!row.Kind_of_Transaction?row.Kind_of_Transaction:''}</TableCell>
                                                                        <TableCell align="center">{!!row.Amount?(Number(row.Amount)/100).toLocaleString() :''}</TableCell>
                                                                        {/* <TableCell align="center">{!!row.FEE?row.FEE :''}</TableCell> */}
                                                                        {/* <TableCell align="center">{!!row.REV?row.REV :''}</TableCell>
                                                                        <TableCell align="center">{!!row.COMM?row.COMM :''}</TableCell> */}
                                                                    </TableRow>
                                                                ))}
                                                                <TableRow>
                                                                    <TableCell align="left" colSpan="3">GRAND TOTAL</TableCell>
                                                                    <TableCell align="center" colSpan="2">&nbsp;</TableCell>
                                                                    <TableCell align="center">{!!total.Total_crebit_Amount?(Number(total.Total_crebit_Amount)/100).toLocaleString():''}</TableCell>
                                                                    <TableCell align="center">FEE</TableCell>
                                                                    {/* <TableCell align="center">REV.</TableCell>
                                                                    <TableCell align="center">COMM.</TableCell> */}
                                                                </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    : null
                                }
                                
                                {
                                    confirmDatCode1 ?
                                        <Container maxWidth="sm">
                                            <Grid container spacing={2} className="mg-t-20">
                                                <Grid item xs={12} md={6}>
                                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={handleCloseTable} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <ButtonFluidPrimary label="ยืนยัน" onClick={handleSave} />
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    : confirmDatCode9 ?
                                        <Container maxWidth="sm">
                                            <Grid container spacing={2} className="mg-t-20">
                                                <Grid item xs={12} md={12} className="txt-center">
                                                    <ButtonFluidOutlinePrimary maxWidth="240px" label="ยกเลิก" onClick={handleCloseTable} />
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    : null
                                }
                                    
                                
        
                                {/* <Container maxWidth="sm">
                                    <Grid container spacing={2} className="mg-t-20">
                                        <Grid item xs={12} md={8}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidColor color="greylight" label="โอนข้อมูลเข้าใบแจ้งหนี้" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="จำนวนรายที่โอน" defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <ButtonFluidColor color="greylight" label="โอนข้อมูลเข้าใบเสร็จรับเงิน" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="" defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidColor color="greylight" label="บันทึกการเพิ่ม" />
                                        </Grid>
                                    </Grid>
                                </Container> */}
                            </React.Fragment>
                        }
                    </div>
                </form>
            </Fade>
            
            <Dialog
                open={err || success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    {
                        success ? 
                        <div className="dialog-success">
                            <p className="txt-center txt-black">{successMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                        <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        :
                        <div className="dialog-error">
                            <p className="txt-center txt-black">{errMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </div>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default UploadInfoBaac
