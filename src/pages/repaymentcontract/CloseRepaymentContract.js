import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
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
    MuiSelect,
    MuiTextNumber,
    MuiDatePicker,
    MuiTextfieldCurrency,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

function CloseRepaymentContract() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inputDataSearch, setInputDataSearch] = useState({
        LoanNumber: '',
    })
    const [inputPayerData, setInputPayerData] = useState('')
    const [loanIDDataArr, setLoanIDDataArr] = useState([])
    const [payerDataArr, setPayerDataArr] = useState([
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
        
    ])
    const [inputData, setInputData] = useState({
        typeLoan: '1',
        typePay: '1',
    })
    const [tableResult, setTableResult] = useState({})
    const [openInfo, setOpenInfo] = useState(false)

    const [payerDataAmount, setPayerDataAmount] = useState(1)
    const payerAmountList = [1,2,3,4,5,6,7,8,9,10];

    const [viewInfo, setViewInfo] = useState([])

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


    const getSearchCloseRepaymentContract = () => {
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/search_for_loanmisapply`, {
                LoanNumber: inputDataSearch.LoanNumber || '',
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
                    if(!!data.length) {
                        setTableResult(data.data)

                        let dataArr = []
                        for(let i=0; i<data.data.length; i++) {
                            dataArr.push(data.data[i].LoanID)
                        }
                        setLoanIDDataArr(dataArr)
                    } else {
                        setErr(true)
                        setErrMsg('ไม่พบข้อมูล')
                        setTableResult({})
                        setOpenInfo(false)
                        setPayerDataArr([
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            
                        ])
                    }
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getPayerData = (ind) => {
        setIsLoading(true)
        // setPayerDataArr([])
        axios.post(
            `${server_hostname}/admin/api/search_for_custFarmer`, {
                IDCard: payerDataArr[ind].IDCard.toString() || '' // 3770600686521, 3102001204322, 1234789123456, 3730600237298 || '',
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
                    // setTableResult(data.data)
                    if(!!data.length) {
                        // setPayerDataArr([...payerDataArr, 
                        //     payerDataArr[ind].fullname = data.data[0].fullname 
                        // ])
                        handlePayerDataArr('fullname',data.data[0].fullname,ind)
                        handlePayerDataArr('FarmerID',data.data[0].FarmerID,ind)
                    } else {
                        handlePayerDataArr('FarmerID','',ind)
                        setErr(true)
                        setErrMsg('ไม่พบข้อมูล')
                    }
                }
            }
        ).catch(err => { console.log(err); })
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

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(payerDataArr)
        let resultArr = []
        for(let i=0; i<payerDataAmount; i++) {
            console.log(payerDataArr[i])
            // Convert decimal to number
            payerDataArr[i].Total = !!payerDataArr[i].Total ? Number(String(payerDataArr[i].Total).replace(/[^\d.]/g, '')) : null
            payerDataArr[i].IDCard = !!payerDataArr[i].IDCard ? Number(String(payerDataArr[i].IDCard).replace(/[^\d.]/g, '')) : null
            payerDataArr[i].Interest = !!payerDataArr[i].Interest ? Number(String(payerDataArr[i].Interest).replace(/[^\d.]/g, '')) : null
            payerDataArr[i].OrderNumber = !!payerDataArr[i].OrderNumber ? Number(String(payerDataArr[i].OrderNumber).replace(/[^\d.]/g, '')) : null
            payerDataArr[i].PaidTime = !!payerDataArr[i].PaidTime ? Number(String(payerDataArr[i].PaidTime).replace(/[^\d.]/g, '')) : null
            // console.log(Object.keys(payerDataArr[i]).length)
            // Assign covert data
            resultArr.push(payerDataArr[i])
        }

        // Validate data
        let validatePayerDataArr = resultArr.some(element => Object.values(element).some(val => val === null || val === ""))
        if(validatePayerDataArr) {
            // Has some data empty 
            setErr(true)
            setErrMsg('กรุณากรอกข้อมูลให้ครบทุกช่อง')
            
        } else {
            // Not data empty

            setIsLoading(true)
            axios.post(
            `${server_hostname}/admin/api/add_loanmisapply`, 
                {
                    LoanID: loanIDDataArr,
                    result: resultArr
                },    
            { headers: { "token": token } } 
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
                    } else {
                        setSuccess(true);
                        setSuccessMsg('บันทึกข้อมูลเรียบร้อย')

                        setTableResult({})
                        setOpenInfo(false)
                        setPayerDataArr([
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
                            
                        ])

                        setPayerDataAmount(1)
                    }
                }
            ).catch(err => { console.log(err); })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        }
    };

    const gotoCloseRepaymentContract = (loanID) => {
        setPayerDataArr([
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            { OrderNumber: '', OrderDate: '', FarmerID: '', fullname: '', Total: '', Interest: '', PaidTime: '', StartPaidDate: '' },
            
        ])

        setOpenInfo(true);
        setInputPayerData({...inputPayerData,
            LoanID: loanID
        })
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        
        // history.push('/manageinfo/searchmember');

    };

    const handlePayerDataArr = (name, value, i) => {
        // console.log(name, value, i)
        let result = [...payerDataArr]
        result[i][name] = value

        setPayerDataArr(result)
    }

    const handlePayerDateDataArr = (name, value, i) => {
        // console.log(name, value, i)
        let setResultValue = [...payerDataArr]
        setResultValue[i][name] = value

        setPayerDataArr(setResultValue)
    }

    const handlePayerDataAmount = (e) => {
        console.log('handlePayerDataAmount',e.target.value)
        setPayerDataAmount(e.target.value)
    }

    const getPayerDataItem = (ind) => {
        let resultArr = []
        for(let i=0; i<=(ind-1); i++) {
            resultArr.push(
                <React.Fragment key={i+1}>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <p className="txt-green">ลำดับที่ {i+1}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiTextfield label="เลขที่คำสั่ง"  name="OrderNumber" value={payerDataArr[i].OrderNumber} onChange={(e)=>{handlePayerDataArr(e.target.name, e.target.value, i)}} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <MuiDatePicker label="วันที่คำสั่ง" name="OrderDate" value={payerDataArr[i].OrderDate} onChange={(e)=>{handlePayerDataArr(e, i)}}  /> */}
                                <MuiDatePicker label="วันที่คำสั่ง" name="OrderDate" value={payerDataArr[i].OrderDate} onChange={(newValue)=>{ handlePayerDateDataArr('OrderDate', moment(newValue).format('YYYY-MM-DD'), i) }}   />
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" name="IDCard" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4"  value={payerDataArr[i].IDCard} onInput={(e)=>{handlePayerDataArr(e.target.name, e.target.value, i)}}   />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="เลือกจากข้อมูลสมาชิก" onClick={()=>{getPayerData(i)}} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <MuiTextfield label="ชื่อ-สกุล ผู้ชดใช้หนี้แทน" inputdisabled="input-disabled" value={payerDataArr[i]?.fullname} /></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        
                        <Grid container spacing={2}>
                        
                            <Grid item xs={1} md={5}>
                                <p className="paper-p txt-right">ชดใช้เงินจำนวน</p>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <MuiTextfieldCurrency label=""   name="Total" value={payerDataArr[i].Total} onChange={(e)=>{handlePayerDataArr(e.target.name, e.target.value, i)}} /> 
                            </Grid>
                            <Grid item xs={1} md={2}>
                                <p className="paper-p">บาท</p>
                            </Grid>

                            <Grid item xs={1} md={5}>
                                <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <MuiTextfieldCurrency label=""   name="Interest" value={payerDataArr[i].Interest} onChange={(e)=>{handlePayerDataArr(e.target.name, e.target.value, i)}} /> 
                            </Grid>
                            <Grid item xs={1} md={2}>
                                <p className="paper-p">% ต่อปี</p>
                            </Grid>

                            <Grid item xs={1} md={5}>
                                <p className="paper-p txt-right">จำนวนงวดที่ผ่อนชำระ</p>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <MuiTextfieldCurrency label=""  name="PaidTime" value={payerDataArr[i].PaidTime} onChange={(e)=>{handlePayerDataArr(e.target.name, e.target.value, i)}} /> 
                            </Grid>
                            <Grid item xs={1} md={2}>
                                <p className="paper-p">งวด</p>
                            </Grid>

                            <Grid item xs={1} md={5}>
                                <p className="paper-p txt-right">เริ่มผ่อนงวดแรกวันที่</p>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                {/* <MuiDatePicker label=""  name="StartPaidDate"  value={payerDataArr[i].StartPaidDate} onChange={(e)=>{handlePayerDataArr(e, i)}}  /> */}
                                <MuiDatePicker label="" name="StartPaidDate" value={payerDataArr[i].StartPaidDate} onChange={(newValue)=>{ handlePayerDateDataArr('StartPaidDate', moment(newValue).format('YYYY-MM-DD'), i) }} /> 
                            </Grid>
                            <Grid item xs={1} md={2}>
                                <p className="paper-p">&nbsp;</p>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Divider variant="middle" style={{ margin: '20px 0', width: '100%' }} />
                </React.Fragment>
            )
        }
        return resultArr
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
                                <h1>ยักยอกเงินไปทั้งสัญญา</h1>{/* <h1>ปิดสัญญาและชดใช้หนี้แทน</h1> */}
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={10}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญาที่ปิดไปแล้วแบบชดใช้หนี้แทน  * ( กรุณาใส่ , (Comma) คั่นเลขที่สัญญา กรณีค้นหามากกว่า 1 รายการ )" value={inputDataSearch.LoanNumber} name="LoanNumber" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchCloseRepaymentContract} />  
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box table-loanrequestprint1 mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                 <TableCell align="center">ลำดับที่</TableCell>
                                                {/* <TableCell align="left">
                                                    <MuiCheckbox label="&nbsp;"  />
                                                </TableCell> */}
                                                <TableCell align="left">สัญญาเลขที่</TableCell>
                                                <TableCell align="left">เลขประจำตัวประชาชน</TableCell>
                                                <TableCell align="left">ชื่อ-สกุล เกษตกร</TableCell>
                                                <TableCell align="left">สัญญาเริ่มต้น</TableCell>
                                                <TableCell align="left">สัญญาสิ้นสุด</TableCell>
                                                <TableCell align="left">วงเงินกู้</TableCell>
                                                <TableCell align="left">เงินต้นคงเหลือ</TableCell>
                                                <TableCell align="left">ดอกเบี้ย</TableCell>
                                                <TableCell align="left">ค่าปรับ</TableCell>
                                                {/* <TableCell align="center" className="sticky" style={{minWidth: '120px', width: '10em'}}>ผู้ชดใช้หนี้แทน</TableCell> */}
                                                {/* <TableCell align="left" className="sticky" style={{minWidth: '120px', width: '10em'}}>&nbsp;</TableCell> */}
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
                                                            <TableCell align="center">{i+1}</TableCell>
                                                            {/* <TableCell align="left">
                                                                <MuiCheckbox label="&nbsp;" onChange={(e)=>{alert(i); console.log(e.target.checked) }} />
                                                            </TableCell> */}
                                                            {/* <TableCell align="left">{cell.RecDate === null ? '' : moment(cell.RecDate).format('DD/MM/YYYY')}</TableCell> */}
                                                            <TableCell align="left">{cell.LoanNumber}</TableCell>
                                                            <TableCell align="left">{cell.IDCard}</TableCell>
                                                            <TableCell align="left">{cell.fullname}</TableCell>
                                                            <TableCell align="left">{!!cell.LoanDate ? moment(cell.LoanDate).format('DD/MM/') + (Number(moment(cell.LastDatePaid).format('YYYY'))+543) : ''}</TableCell>
                                                            <TableCell align="left">{!!cell.LastDatePaid ? moment(cell.LastDatePaid).format('DD/MM/') + (Number(moment(cell.LastDatePaid).format('YYYY'))+543) : ''}</TableCell>
                                                            <TableCell align="left">{(cell.principle).toLocaleString('en-US')}</TableCell>
                                                            <TableCell align="left">{(cell.principle).toLocaleString('en-US')}</TableCell>
                                                            <TableCell align="left">{(cell.Interest).toLocaleString('en-US')}</TableCell>
                                                            <TableCell align="left">{(cell.ChargeRate).toLocaleString('en-US')}</TableCell>
                                                            {/* <TableCell align="left">{(cell.ChargeRate).toLocaleString('en-US')}</TableCell><TableCell align="left" className="sticky" style={{minWidth: '120px', width: '10em'}}>
                                                                <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="100px" onClick={()=>{gotoCloseRepaymentContract(cell.LoanID);}} />
                                                            </TableCell> */}
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={12} align="center">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                        component="div"
                                        count={tableResult.length || 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                    {
                        tableResult.length ? 
                        <Container  maxWidth="md">
                            <Grid container spacing={2} className="btn-row txt-center mt-0">
                                <Grid item xs={12} md={12}>
                                    <ButtonFluidPrimary label="สร้างสัญญา" maxWidth="380px" onClick={()=>{ gotoCloseRepaymentContract() }} />
                                </Grid>
                            </Grid>
                        </Container>
                        : null
                    }
                    {/* <Container  maxWidth="md">
                        <Grid container spacing={2} className="btn-row txt-center">
                            <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="ปุ่มบันทึกข้อมูลผู้ชดใช้หนี้แทน" maxWidth="380px" />
                            </Grid>
                        </Grid>
                    </Container> */}
                    {
                        openInfo ?
                            <React.Fragment>
                                <Container maxWidth="lg">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <Paper className="paper line-top-green paper">
                                                <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                                    <Grid container spacing={2}>
                                                        {/* Right side ----------------------------------- */}

                                                        <Grid item xs={12} md={10}>
                                                            <h1 className="paper-head-green">ข้อมูลผู้ชดใช้หนี้แทน</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="จำนวนผู้ชดใช้หนี้แทน" listsValue={payerAmountList} lists={payerAmountList} value={payerDataAmount} onChange={handlePayerDataAmount}  />
                                                        </Grid>
                                                        {
                                                            getPayerDataItem(payerDataAmount)
                                                        }

                                                        {/* <Grid item xs={12} md={12} className="txt-center mg-t-0">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <ButtonNormalIconStartPrimary label="เพิ่มผู้ชดใช้หนี้แทน" maxWidth="380px"  startIcon={<AddIcon />} onClick={()=>{setPayerDataAmount(payerDataAmount+1); console.log(payerDataArr.length)}} />
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid> */}
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
                            </React.Fragment>
                        : ''
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
                
                    <div className="dialog-error">
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

export default CloseRepaymentContract
