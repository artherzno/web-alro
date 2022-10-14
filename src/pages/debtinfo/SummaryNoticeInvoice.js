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
} from '../../components/MUIinputs';

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
        ContractNo: '',
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
    const [tableResult, setTableResult] = useState([{
        value1: 'PBUN',
        value2: 'PBUN0000001',
        value3: '00001',
        value4: 'ทดสอบ 2565',
        value5: 'นาย',
        value6: 'เทส',
        value7: 'ทดสอบ',
        value8: '2022-10-05',
        value9: '0000/0000',
        value10: '2022-10-08',
        value11: 90000,
        value12: 1000.11,
        value13: 2000,
        value14: 3000,
        value15: 4000,
        value16: 5000.55,
        value17: 6000,
        value18: 7000,
    }])
    const [tableResult2, setTableResult2] = useState([{
        value1: 'PBUN',
        value2: 'PBUN0000001',
        value3: 'ทดสอบ 2565',
        value4: 'เทส',
        value5: 'ทดสอบ',
        value6: moment().format('YYYY-MM-DD'),
        value7: 'notice-00001',
        value8: moment().format('YYYY-MM-DD'),
        value9: 90000,
        value10: 1000.11,
        value11: 0,
        value12: 2000,
        value13: 3000,
        value14: 4000,
    }])
    const [tableResult3, setTableResult3] = useState([{
        value1: '??',
        value2: moment().format('YYYY-MM-DD'),
        value3: '0000/0000',
        value4: 'เดือนอะไร',
        value5: '0000/0000',
        value6: moment().format('YYYY-MM-DD'),
        value7: 'summary-00001',
        value8: 8000,
        value9: 9000,
        value10: 1000.11,
        value11: 4000.44,
        value12: 2000,
        value13: 3000,
    }])
    const [tableTotalResult, setTableTotalResult] = useState({
        Invoice: 'invoice-0001',
        InvoiceDate: moment().format('YYYY-MM-DD'),
        Notice: 'notice-0001',
        NoticeDate: moment().format('YYYY-MM-DD'),
        value1: 1000.11,
        value2: 2000,
        value3: 3000,
        value4: 4000,
        value5: 5000.55,
        value6: 6000,
        value7: 7000,

    })
    const [openInfo, setOpenInfo] = useState(false)
    const [openInfo2, setOpenInfo2] = useState(false)


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
        // axios.post(
        //     `${server_hostname}/admin/api/search_approved_applicant`, {
        //         ApplicantNo: parseInt(inputDataSearch.SearchByApplicantNo) || '',
        //         LoanNumber: inputDataSearch.SearchByLoanNumber || '',
        //         Name: inputDataSearch.SearchByName || '',
        //     }, { headers: { "token": token } } 
        // ).then(res => {
        //         console.log(res)
        //         let data = res.data;
        //         if(data.code === 0 || res === null || res === undefined) {
        //             setErr(true);
        //             if(Object.keys(data.message).length !== 0) {
        //                 console.error(data)
        //                 if(typeof data.message === 'object') {
        //                     setErrMsg('ไม่สามารถทำรายการได้')
        //                 } else {
        //                     setErrMsg([data.message])
        //                 }
        //             } else {
        //                 setErrMsg(['ไม่สามารถทำรายการได้'])
        //             }
        //         }else {
        //             console.log(data)
        //             setTableResult(data.data)
        //         }
        //     }
        // ).catch(err => { console.log(err); history.push('/') })
        // .finally(() => {
        //     if (isMounted.current) {
        //       setIsLoading(false)
        //     }
        //  });
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
                                <h1>สรุปผลการเดือนหนี้ 2 ครั้ง หลังครบกําหนดชําระ 2 เดือน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="วันที่ มีผลต่อ ยอดเงิน และ ดอกเบี้ย"  inputdisabled="input-disabled" value={newOrderDate(inputDataSearch.ProcessDate)} name="ProcessDate" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiTextfield label="ค้นหาทุกสัญญา" value={inputDataSearch.ContractNumber} name="ContractNumber" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchSummaryNoticeInvoice} />  
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
                    </Container>

                    <Container maxWidth={false} className="mg-t-20">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Box className="box-blue">
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">อ้างถึงใบแจ้งหนี้</p>
                                        <p className="box-blue-body">{tableTotalResult.Invoice }</p>
                                    
                                        <p className="box-blue-head">ลงวันที่</p>
                                        <p className="box-blue-body">{newOrderDate(tableTotalResult.InvoiceDate) }</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">อ้างถึงใบเตือน</p>
                                        <p className="box-blue-body">{tableTotalResult.Notice }</p>
                                    
                                        <p className="box-blue-head">ลงวันที่</p>
                                        <p className="box-blue-body">{newOrderDate(tableTotalResult.NoticeDate) }</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินครบชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value1 ? '0' : parseFloat(tableTotalResult.value1).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value2 ? '0' : parseFloat(tableTotalResult.value2).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยค้างชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value3 ? '0' : parseFloat(tableTotalResult.value3).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">เงินต้นคงเหลือ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value4 ? '0' : parseFloat(tableTotalResult.value4).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยที่ต้องชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value5 ? '0' : parseFloat(tableTotalResult.value5).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                    <Box className="box-blue-item">
                                        <p className="box-blue-head">ดอกเบี้ยครบกำหนดชำระ</p>
                                        <p className="box-blue-body">{!tableTotalResult.value6 ? '0' : parseFloat(tableTotalResult.value6).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false} className="mg-t-20">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
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
                                                    <TableCell align="left" className="sticky tb-w-14em">&nbsp;</TableCell>
                                                </TableRow>
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
                                                            <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}} className="sticky tb-w-14em">
                                                                <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="120px" onClick={()=>gotoSummary(cell.xxx)} />
                                                            </TableCell>
                                                            
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
                                                            <TableCell align="left">เงินค้างชำระ</TableCell>
                                                            <TableCell align="left">เงินค้างงวด</TableCell>
                                                            <TableCell align="left">เงินต้นคงเหลือ</TableCell>
                                                            <TableCell align="left">ดอกเบี้ย</TableCell>
                                                            <TableCell align="left">ดอกเบี้ยสะสม</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            tableResult2.length ? 
                                                                (rowsPerPage > 0
                                                                    ? tableResult2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                    : tableResult2
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

                                    {
                                        openInfo2 ? 
                                        <Grid item xs={12} md={12}> 
                                            <div className="table mg-t-10">
                                                <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                                    <Table aria-label="normal table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                                <TableCell align="left">วันที่บันทึก</TableCell>
                                                                <TableCell align="left">เลขที่ใบสรุป</TableCell>
                                                                <TableCell align="left">ประจำเดือน</TableCell>
                                                                <TableCell align="left">เลขท่ี่ใบเตือน</TableCell>
                                                                <TableCell align="left">วันที่ออกใบเตือน</TableCell>
                                                                <TableCell align="left">ลำดับที่</TableCell>
                                                                <TableCell align="left">งวดชำระ</TableCell>
                                                                <TableCell align="left">เงินต้นค้างชำระ</TableCell>
                                                                <TableCell align="left">เงินต้นคงเหลือ</TableCell>
                                                                <TableCell align="left">ดอกเบี้ยต้องชำระ</TableCell>
                                                                <TableCell align="left">ดอกเบี้ยค้างชำระ</TableCell>
                                                                <TableCell align="left">ดอกเบี้ยครบชำระ</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                tableResult3.length ? 
                                                                    (rowsPerPage > 0
                                                                        ? tableResult3.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                        : tableResult3
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
                                        : null
                                    }
                                </React.Fragment>
                                : null
                            }
                        </Grid>
                    </Container>
                
                </div>
            </Fade>
        </div>
    )
}

export default SummaryNoticeInvoice
