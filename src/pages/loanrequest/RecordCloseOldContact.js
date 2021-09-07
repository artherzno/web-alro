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
    MuiSelectObjYearStart,
    MuiTextfieldEndAdornment,
    MuiTextfieldStartAdornment,
    MuiRadioButton,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function RecordCloseOldContact() {
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
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);

    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typeBill: '1',
    })

    const [inputSelectDateRec, setInputSelectDateRec] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

    const [inputDataSearch, setinputDataSearch] = useState({
        Username: localStorage.getItem('cUsername'),
        LoanNumber: "sample string 2",
        Rentno: "sample string 3",
        Fullname: "sample string 4",
        Date: "2021-09-05T16:52:09.5628127+07:00"
})

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

    

     // Radio Button
     const handleChangeTypeBill = (event) => {
        setInputData({...inputData,
            typeBill: event.target.value
        })
        console.log('typeBill ',event.target.value)
    };
    // End Radio Button

    const handleSelectDateRec = (event) => {
        let type = event.target.name
        setInputSelectDateRec({
            ...inputSelectDateRec,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
    }

    const getCloseContactSearch = (loanID) => {
        setIsLoading(true);
        // const formdata = new FormData()
        // formdata.append('Username', inputDataSearch.Username.toString());
        // formdata.append('LoanNumber', inputDataSearch.LoanNumber.toString());
        // formdata.append('Rentno', inputDataSearch.Rentno.toString());
        // formdata.append('Fullname', inputDataSearch.Fullname.toString());
        // formdata.append('Date', inputDataSearch.Date.toString());

        axios.post(
            `${server_spkapi}/CloseContact/GetData`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: inputDataSearch.LoanNumber.toString(),
                Rentno: inputDataSearch.Rentno.toString(),
                Fullname: inputDataSearch.Fullname.toString(),
                Date: inputDataSearch.Date.toString()
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
                    console.log('get_loandetail',data)
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
                                <h1>บันทึกปิดสัญญาเดิม</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} >
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา"  defaultValue="" />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={getCloseContactSearch} />  
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                        <div className="table">
                                            <TableContainer className="table-box table-recordcloseoldContact1 mg-t-10">
                                                <Table aria-label="normal table">
                                                    <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                        <TableCell align="left">&nbsp;</TableCell>
                                                    </TableRow>
                                                    </TableHead>
                                                    <TableBody>{/* // clear mockup */}
                                                        <TableRow>
                                                            <TableCell colSpan={4} align="left">ไม่พบข้อมูล</TableCell>
                                                        </TableRow>
                                            
                                                    {/* {
                                                        tableResult.map((row,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="left">{row.a}</TableCell>
                                                                <TableCell align="left">{row.b}</TableCell>
                                                                <TableCell align="left">{row.c}</TableCell>
                                                                <TableCell align="left">{row.d}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    } */}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <p>วันที่บันทึก</p>
                                                <div className="select-date-option">
                                                    <MuiSelectDay label="" name="dd" value={inputSelectDateRec.dd} onChange={handleSelectDateRec} />
                                                    <MuiSelectMonth label="" name="mm" value={inputSelectDateRec.mm} onChange={handleSelectDateRec} />
                                                    <MuiSelectYear label="" name="yyyy" value={inputSelectDateRec.yyyy} onChange={handleSelectDateRec} />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="45" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="" defaultValue="RIET" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="" defaultValue="RIET23435250039/2540" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiTextfield label="เลขบัตรประชาชน" id="" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่รับเงินกู้"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่จัดทำ"  defaultValue="2017-05-24" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfieldMultiLine label="หมายเหตุ" defaultValue="" row="3" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 2 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            {/* <Grid item xs={12} md={6}>
                                                <MuiTextfield label="ใบเสร็จเลขที่" disabled defaultValue="RIET2343525/00003" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="วันที่ใบเสร็จ"  defaultValue="2017-05-24" />
                                            </Grid> */}
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
                                                        <p className="paper-p txt-right txt-purple">จำนวนเงินต้นที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณเงินชำระ" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right txt-blue">จำนวนเงินที่ชำระ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" />
                                                    </Grid>
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
                                                        <p className="paper-p txt-right">ดอกเบี้ยรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* <MuiRadioButton label="" lists={['คำสั่งศาล','แปลงหนี้','ภทต.']} value={inputData.typeBill} onChange={handleChangeTypeBill} type="row" /> */}
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </Paper>

                                {/* Paper 3 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">ประมวลผลก่อนปรับปรุงหนี้</h1>
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
                                                        <p className="paper-p txt-right">ดอกเบี้ยค้างปรับ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <p className="paper-p txt-right">ดอกเบี้ยในงวด</p>
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
                                                        <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>


                                <Grid container spacing={2} className="btn-row">
                                    <Grid item xs={12} md={12}>
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={()=>{setConfirm(true);}} />
                                    </Grid>
                                </Grid>
                            
                            </Grid>
                        </Grid>
                    </Container>
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

export default RecordCloseOldContact
