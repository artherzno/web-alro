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
    MuiTextfieldCurrency,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiLabelHeaderCheckbox,
    MuiRadioButton,
    MuiTextfieldEndAdornment,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
    MuiSelectDistrict,
    MuiSelectProvince,
    MuiSelectSubDistrict,
    MuiTextNumber,
    MuiSelectObj,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

const listForm = [
    'บัตรสมาชิกผู้กู้',
    'การ์ดลูกหนี้รายตัว',
    'คำขอกู้ยืม/คำขอปรับโครงสร้างหนี้',
    'สัญญากู้ยืม',
    'สัญญาแปลงหนี้',
    'สัญญาการดำเนินคดีทางศาล',
    'สัญญาปรับโครงสร้างหนี้',
    'ข้อตกลงต่อท้ายสัญญากู้ยืม',
    'สัญญาชดใช้หนี้บุคคลภายนอก',
    'ใบสำคัญรับเงิน',
    'ใบเสร็จรับชำระเงินกู้',
    'แบบคำร้องขอผ่อนผันการชำระเงิน',
    'การขยายเวลารับชำระหนี้',
    'การขอลดเงินต้นและดอกเบี้ย',
    'การขอคืนเงิน',
    'แบบการรับสภาพหนี้',
    'ผู้ค้ำประกัน',
    'หนังสือให้ความยินยอมของคู่สมรส',
    'ใบแจ้งหนี้',
    'ใบเตือนหนี้ (ผู้กู้และผู้ค้ำประกัน)',
    'แบบใบโอนปรับปรุงทะเบียนระหว่างปี/สิ้นปี',
    'การรับสภาพความรับผิด',
]						
																
function PrintForm() {
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
    const [confirmMsg, setConfirmMsg] = useState('confirm msg')

    const [loanNumber, setLoanNumber] = useState('')

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
    },[])

    const handlePrintPDF = () => {
        console.log('PDF - ContractNo:', loanNumber)
        setConfirm(false)

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
        url: `${siteprint}/report/pdf/GetContractDebtPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
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

    const getViewForm = (val) => {
        setConfirm(true)
        setLoanNumber(listForm[val])
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)
        // window.location.reload()
        // history.push('/manageinfo/searchmember');

    };

    return (
        <div className="uploadfile-page">
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
                                <h1>พิมพ์แบบฟอร์ม</h1>
                            </Grid>
                            {
                                listForm.map((item,i)=>{
                                    return (
                                        <Grid item xs={12} md={2}>
                                            <ButtonFluidPrimary key={i} label={item} maxWidth="200px" color="primary" style={{justifyContent: 'center'}} onClick={()=>{getViewForm(i)}}/> 
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={confirm}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                <div className="dialog-confirm">
                    <h3 className="txt-center">รายละเอียดฟอร์ม {loanNumber}</h3>
                    <p className="txt-center txt-black">...View PDF File...</p>
                    <br/>
                    <Box textAlign='center'>
                        <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                        <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="140px" startIcon={<PrintIcon />} onClick={handlePrintPDF} style={{justifyContent: 'center'}}   />
                    </Box>
                </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default PrintForm
