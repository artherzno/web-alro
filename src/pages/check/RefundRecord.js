import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

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
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

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
} from '../../components/MUIinputs';

function RefundRecord() {
    const history = useHistory();
    const location = useLocation();
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


    const [inputData, setInputData] = useState({
        BookNumber: '', // บันทึกเลขที่หนังสือ
        RefundDate: '', // วันที่ยื่นคำร้องขอคืนเงิน
        RefundProcessDate: '', // วันที่ดำเนินการคืนเงิน
        RefundAmount: '', // จำนวนเงินที่คืน
        LoanNumber: location.state?.LoanNumber || '', // ตามสัญญาเลขที่ *ดึงเลขที่สัญญามาแสดง auto
        Bank: '', // โอนผ่านบัญชีธนาคารเลขที่ *ดึงจากข้อมูลเลขที่บัญชีเกษตรกรมาแสดง auto
        Refunder: '', // ชื่อผู้คืนเงิน *ชื่อเจ้าหน้าที่ผู้คืนเงิน
    })


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

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(payerDataArr)
        console.log(inputData)
        setErrMsg('ไม่สามารถทำรายการได้')
        setErr(true)
    }

    const handleInputData = (name, value) => {
        console.log(name, value)

        setInputData({...inputData, [name]: value})
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        
        // history.push('/manageinfo/searchmember');

    };


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
                                <h1>บันทึกขอคืนเงิน</h1>
                            </Grid>
                        </Grid>
                    </Container>
                    
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="บันทึกเลขที่หนังสือ"  name="BookNumber" value={inputData.BookNumber} onChange={(e)=>{handleInputData(e.target.name, e.target.value)}} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ตามสัญญาเลขที่"  name="LoanNumber" value={inputData.LoanNumber} onChange={(e)=>{handleInputData(e.target.name, e.target.value)}} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ยื่นคำร้องขอคืนเงิน" name="RefundDate" value={inputData.RefundDate} onChange={(newValue)=>{ handleInputData('RefundDate', moment(newValue).format('YYYY-MM-DD')) }}   />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ดำเนินการคืนเงิน" name="RefundProcessDate" value={inputData.RefundProcessDate} onChange={(newValue)=>{ handleInputData('RefundProcessDate', moment(newValue).format('YYYY-MM-DD')) }}   />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนเงินที่คืน" inputdisabled="input-disabled" name="RefundAmount" value={inputData.RefundAmount} onChange={(e)=>{handleInputData(e.target.name, e.target.value)}} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="โอนผ่านบัญชีธนาคารเลขที่" inputdisabled="input-disabled" name="Bank" value={inputData.Bank} onChange={(e)=>{handleInputData(e.target.name, e.target.value)}} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ชื่อผู้คืนเงิน" inputdisabled="input-disabled" name="Refunder" value={inputData.Refunder} onChange={(e)=>{handleInputData(e.target.name, e.target.value)}} />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Btn Row */}
                    <Container  maxWidth="md">
                        <Grid container spacing={2} className="btn-row txt-center">
                            <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="380px" onClick={(e)=>{ handleSubmit(e) }} />
                            </Grid>
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

export default RefundRecord