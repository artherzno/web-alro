import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import pdf0 from '../../forms/การขอขยายระยะเวลาการชำระหนี้.pdf'
import pdf1 from '../../forms/การ์ดลูกหนี้รายตัว.pdf'
import pdf2 from '../../forms/ข้อตกลงตอท้ายสัญญากู้ยืมเงิน.pdf'
import pdf3 from '../../forms/คำขอกู้ยืมจากสปก.pdf'
import pdf4 from '../../forms/คำร้องขอคืนเงิน.pdf'
import pdf5 from '../../forms/บัตรสมาชิกผู้กู้.pdf'
import pdf6 from '../../forms/แบบคําร้องขอผ่อนผันการชำระเงิน.pdf'
import pdf7 from '../../forms/แบบคําร้องลดดอกเบี้ย.pdf'
import pdf8 from '../../forms/ใบแจ้งหนี้ล่วงหน้า.pdf'
import pdf9 from '../../forms/ใบเตือนหนี้.pdf'
import pdf10 from '../../forms/ใบสำคัญรับเงิน.pdf'
import pdf11 from '../../forms/ใบเสร็จรับชำระเงินกู้.pdf'
import pdf12 from '../../forms/ใบโอนปรับปรุง.pdf'
import pdf13 from '../../forms/สัญญาการดำเนินคดีศาล.pdf'
import pdf14 from '../../forms/สัญญากู้ยืมเงินจากสปก.pdf'
import pdf15 from '../../forms/สัญญาชดใช้บุคคลภายนอก.pdf'
import pdf16 from '../../forms/สัญญาปรับโครงสร้างหนี้.pdf'
import pdf17 from '../../forms/สัญญาแปลงหนี้ใหม่.pdf'
import pdf18 from '../../forms/หนังสือรับสภาพความรับผิด.pdf'
import pdf19 from '../../forms/หนังสือรับสภาพหนี้.pdf'
import pdf20 from '../../forms/หนังสือสัญญาค้ำประกัน.pdf'
import pdf21 from '../../forms/หนังสือให้ความยินยอมของคู่สมรส.pdf'

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
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

const listForm = [
    'การขอขยายระยะเวลาการชำระหนี้',
    'การ์ดลูกหนี้รายตัว',
    'ข้อตกลงตอท้ายสัญญากู้ยืมเงิน',
    'คำขอกู้ยืมจาก สปก',
    'คำร้องขอคืนเงิน',
    'บัตรสมาชิกผู้กู้',
    'แบบคําร้องขอผ่อนผันการชำระเงิน',
    'แบบคําร้องลดดอกเบี้ย',
    'ใบแจ้งหนี้ล่วงหน้า',
    'ใบเตือนหนี้',
    'ใบสำคัญรับเงิน',
    'ใบเสร็จรับชำระเงินกู้',
    'ใบโอนปรับปรุง',
    'สัญญาการดำเนินคดีศาล',
    'สัญญากู้ยืมเงินจาก สปก',
    'สัญญาชดใช้บุคคลภายนอก',
    'สัญญาปรับโครงสร้างหนี้',
    'สัญญาแปลงหนี้ใหม่',
    'หนังสือรับสภาพความรับผิด',
    'หนังสือรับสภาพหนี้',
    'หนังสือสัญญาค้ำประกัน',
    'หนังสือให้ความยินยอมของคู่สมรส',
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

    const [headModal, setHeadModal] = useState('')
    const [formIndex, setFormIndex] = useState(null)

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



    // const handlePrintPDF = () => {
    //     console.log('PDF - ContractNo:', loanNumber)
    //     setConfirm(false)

    //     let formData = new FormData(); 
    //     formData.append('ContractNo', loanNumber)
    //     formData.append('RoleID', localStorage.getItem('nROLEID'))

    //     axios({
    //     url: `${siteprint}/report/pdf/GetContractDebtPdf`, //your url
    //     method: 'POST',
    //     data: formData,
    //     responseType: 'blob', // important
    //     }).then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.target = '_blank';
    //         // link.setAttribute('download', `พิมพ์สัญญา_${loanNumber.toString()}.pdf`); //or any other extension
    //         document.body.appendChild(link);
    //         link.click();
    //     }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
    //     .finally(() => {
    //         if (isMounted.current) {
    //         setIsLoading(false)
    //         }
    //     });
    // }

    const getViewForm = (val) => {
        setConfirm(true)
        setHeadModal(listForm[val])
        setFormIndex(val)
    }

    const getEmbed = (val) => {
        let pdf = null;

        switch(val) {
            case 0:
                pdf = pdf0
                break;
            case 1:
                pdf = pdf1
                break;
            case 2:
                pdf = pdf2
                break;
            case 3:
                pdf = pdf3
                break;
            case 4:
                pdf = pdf4
                break;
            case 5:
                pdf = pdf5
                break;
            case 6:
                pdf = pdf6
                break;
            case 7:
                pdf = pdf7
                break;
            case 8:
                pdf = pdf8
                break;
            case 9:
                pdf = pdf9
                break;
            case 10:
                pdf = pdf10
                break;
            case 11:
                pdf = pdf11
                break;
            case 12:
                pdf = pdf12
                break;
            case 13:
                pdf = pdf13
                break;
            case 14:
                pdf = pdf14
                break;
            case 15:
                pdf = pdf15
                break;
            case 16:
                pdf = pdf16
                break;
            case 17:
                pdf = pdf17
                break;
            case 18:
                pdf = pdf18
                break;
            case 19:
                pdf = pdf19
                break;
            case 20:
                pdf = pdf20
                break;
            case 21:
                pdf = pdf21
                break;
            default:
              pdf = 0
          }

        return (<embed src={pdf} width="100%" height={(window.innerHeight - 200)+'px'}/>)
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
                    <h3 className="txt-center">รายละเอียดฟอร์ม {headModal}</h3>
                    {
                        getEmbed(formIndex)
                    }
                    <br/>
                    <Box textAlign='center'>
                        <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="140px" startIcon={<PrintIcon />} onClick={handlePrintPDF} style={{justifyContent: 'center'}}   /> */}
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
