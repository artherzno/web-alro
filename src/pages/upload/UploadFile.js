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
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function UploadFile() {
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
    const [upload, setUpload] = useState(false)
    const [formField, setFormField] = useState(false)

    const [inputDataSearch, setInputDataSearch] = useState({
        LoanNumber: '',
    })
    const [inputDataUpload, setInputDataUpload] = useState([])
    const [loanID, setLoanID] = useState(0)
    const [loanNumber, setLoanNumber] = useState(0)
    const [tableResult, setTableResult] = useState([])
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

    function createData(LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel, LoanRecType) {
        return {LoanID, FarmerGrade, ApplicantID, Status, LoanNumber,dCreated,IDCard, FrontName,Name,Sirname, Tel, LoanRecType }
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
    },[])

    const getSearchUploadFile = () => {
        setIsLoading(true)
        setFormField(false)
        setRows([])

        axios.post(
            `${server_hostname}/admin/api/search_loanrec`, {
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
                    if(!data.length) {
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                    } else {
                        setTableResult(data.data)
                        // setRows(data.data)
                        setRows(
                            data.data.map((item,i)=>
                                createData(
                                    item.LoanID,
                                    item.FarmerGrade,
                                    item.ApplicantID,
                                    item.Status === null ? 'บันทึกชั่วคราว' : item.Status ? 'แปลงหนี้' : 'ปิด',
                                    item.LoanNumber === null ? '' : item.LoanNumber,
                                    item.dCreated ? newOrderDate(item.dCreated) : null,
                                    item.IDCard === null ? '' : item.IDCard,
                                    item.FrontName === null ? '' : item.FrontName,
                                    item.Name === null ? '' : item.Name,
                                    item.Sirname === null ? '' : item.Sirname,
                                    item.Tel === undefined ? '' : item.Tel ,
                                    item.LoanRecType === undefined ? '' : item.LoanRecType,
                                )
                            )
                        )
                    }
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handlePrintPDF = () => {
        console.log('PDF - ContractNo:', loanNumber)
        setConfirm(false)

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)

        axios({
        url: `${siteprint}/report/pdf/GetContractDebtPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `พิมพ์สัญญา_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
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

    const handleUploadImg = (event) => {
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputDataUpload(imgArr)
    }

    const handleRemoveUploadImg = (event) => {
        setInputDataUpload(null)
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("addPDF-upload-input")
        myFile.type = ''
        myFile.type = 'file'
    }

    const handleSubmit = () => {
        setSuccess(true)
    }

    const getViewPDF = (val) => {
        console.log('getViewPDF',val)
        // setLoanID(val)
        setLoanNumber(val)
        setConfirm(true)
    }

    const getUploadPDF = (val) => {
        console.log('getUploadPDF',val)
        // setLoanID(val)
        setLoanNumber(val)
        setUpload(true)
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setUpload(false)
        setIsLoading(false)
        // window.location.reload()
        // history.push('/manageinfo/searchmember');

    };

    const handleClosePopupErr = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setUpload(false)
        setIsLoading(false)

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
                                <h1>Upload file</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" value={inputDataSearch.LoanNumber} name="LoanNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchUploadFile} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(tableResult.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-recordcontractdebt mg-t-10">
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={8} 
                                        hasCheckbox={false} 
                                        hasAction={true} 
                                        actionCreate={false}
                                        actionView={true} 
                                        actionEdit={false} 
                                        actionDelete={false} 
                                        actionCustom={true}
                                        viewEvent={getViewPDF}
                                        viewParam={'LoanNumber'}
                                        customName={'อัพโหลด'}
                                        customWidth={'80px'}
                                        customEvent={getUploadPDF}
                                        customParam1={'LoanNumber'}
                                    />
                                </div>
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
                maxWidth="lg"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                <div className="dialog-confirm">
                    <h3 className="txt-center">รายละเอียดไฟล์ของเลขที่สัญญา {loanNumber}</h3>
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

            <Dialog
                open={upload}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                <div className="dialog-upload">
                    <h3 className="txt-center">อัดโหลดไฟล์ของเลขที่สัญญา {loanNumber}</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} style={{textAlign: 'center'}}>
                            <MuiUpload imgUpload={inputDataUpload} id="addPDF-upload-input" name="file" onChange={handleUploadImg} onClick={handleRemoveUploadImg} />
                        </Grid>
                    </Grid>
                    
                    <br/>
                    <Box textAlign='center'>
                        <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}}/> &nbsp;&nbsp;&nbsp;&nbsp;
                        <ButtonFluidPrimary label="อัพโหลด" maxWidth="140px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}}/> 
                    </Box>
                </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={err}
                onClose={handleClosePopupErr}
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
                            
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopupErr} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default UploadFile
