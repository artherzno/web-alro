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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
import AddIcon from '@material-ui/icons/Add';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiTextNumber,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function TransferDebt() {
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
    const [showSum, setShowSum] = useState(false)
    const [printActive, setPrintActive] = useState(false)

    const [inputDataSearch, setInputDataSearch] = useState({
        IDCard: '',
        LoanNumber: '',
        LoanCourtNumber: '',
    })

    const [loanData, setLoanData] = useState({
        LoanNumber: '',
        LoanDate: moment().format('YYYY-MM-DD'),
    })

    const [loantransfer, setLoantransfer] = useState([
            {
                "nOrder": 1,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ลูกหนี้ตามคำพิพากษาฯ - เงินต้น",
                "AccountCode": "01-01-06-01-01-01",
                "DrAmount": null,
                "CrAmount": null
            },
            {
                "nOrder": 2,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ลูกหนี้ตามคำพิพากษาฯ - ดอกเบี้ย",
                "AccountCode": "01-01-06-01-01-02",
                "DrAmount": null,
                "CrAmount": null
            },
            {
                "nOrder": 3,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ค่าใช้จ่ายในการปรับลดมูลค่าหนี้ตามคำพิพากษาศาล",
                "AccountCode": "05-03-01-01-01-01",
                "DrAmount": null,
                "CrAmount": null
            },
            
            {
                "nOrder": 4,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ลูกหนี้เงินกู้",
                "AccountCode": "01-01-06-01-01-01",
                "DrAmount": null,
                "CrAmount": null
            },
            {
                "nOrder": 5,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ดอกเบี้ยค้างรับ",
                "AccountCode": "01-01-07-01-01-02",
                "DrAmount": null,
                "CrAmount": null
            },
            {
                "nOrder": 6,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ดอกเบี้ยเงินกู้รับ",
                "AccountCode": "04-02-02-01-01-01",
                "DrAmount": null,
                "CrAmount": null
            },
            {
                "nOrder": 7,
                "LoanID": null,
                "Old_LoanID": null,
                "List": "ส่วนเกินทุนจากคำพิพากษา",
                "AccountCode": "04-02-03-04-01-01",
                "DrAmount": null,
                "CrAmount": null
            }
        ])
    const [inputDataUpload, setInputDataUpload] = useState([])
    const [loanID, setLoanID] = useState(0)
    const [loanNumber, setLoanNumber] = useState(0)
    const [tableResultLoan, setTableResultLoan] = useState([])
    const [tableResultLoanCourt, setTableResultLoanCourt] = useState([])
    const [sumLoanValue, setSumLoanValue] = useState(0)
    const [sumLoanCourtValue, setSumLoanCourtValue] = useState(0)
    const [diffDebt, setDiffDebt] = useState(0)
    const [rows, setRows] = useState([])

    const rowsLabelLoan = [
        'LoanNumber',
        'CreateDate',
        'PrincipleBalance',
        'PendingInterest',
        'DueInterest', 
        'Total',
    ]

    const headCellsLoan = [
        { id: 'LoanNumber', numeric: false, disablePadding: false, widthCol: '150px', label: 'สัญญาเดิมเลขที่' },
        { id: 'CreateDate', numeric: false, disablePadding: false, widthCol: '150px', label: 'ปิดสัญญาเดิมวันที่' },
        { id: 'PrincipleBalance', numeric: false, disablePadding: false, widthCol: '150px', label: 'เงินต้น' },
        { id: 'PendingInterest', numeric: false, disablePadding: false, widthCol: '180px', label: 'ตอกเบี้ยค้างรับ' },
        { id: 'DueInterest', numeric: false, disablePadding: false, widthCol: '150px', label: 'ดอกเบี้ยรับ' },
        { id: 'Total', numeric: false, disablePadding: false, widthCol: '150px', label: 'รวม' }
    ]

    function createDataLoan(LoanNumber, CreateDate, PrincipleBalance, PendingInterest, DueInterest, Total) {
        return {LoanNumber, CreateDate, PrincipleBalance, PendingInterest, DueInterest, Total}
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
                                // setErrMsg([data.message])
                                setErrMsg('ไม่สามารถทำรายการได้')
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

    const getSearchTransferDebt = () => {
        setIsLoading(true)
        setFormField(false)
        setShowSum(false)
        setPrintActive(false)
        setRows([])

        axios.post(
            `${server_hostname}/admin/api/search_for_loantransfer`, 
            {
                LoanNumber: inputDataSearch.LoanNumber,
                LoanCourtNumber: inputDataSearch.LoanCourtNumber,
                IDCard: inputDataSearch.IDCard
            }, 
            // {
            //     "IDCard": "3430300783761",
            //     "LoanNumber": "00262/2554",
            //     "LoanCourtNumber": "ปน.ศาล00262/2554"
            // },
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
                            // setErrMsg([data.message])
                            setErrMsg('ไม่สามารถทำรายการได้')
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    console.log(data.loandata)
                    if(!data.loandata.length) {
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                    } else {
                        setTableResultLoan(data.loandata)
                        setSumLoanValue((data.loandata[0].PrincipleBalance === null ? 0 : data.loandata[0].PrincipleBalance) + (data.loandata[0].PendingInterest === null ? 0 : data.loandata[0].PendingInterest) + (data.loandata[0].DueInterest === null ? 0 : data.loandata[0].DueInterest))
                        console.log((data.loandata[0].PrincipleBalance === null ? 0 : data.loandata[0].PrincipleBalance) + (data.loandata[0].PendingInterest === null ? 0 : data.loandata[0].PendingInterest) + (data.loandata[0].DueInterest === null ? 0 : data.loandata[0].DueInterest))
                        // setRows(
                        //     data.loandata.map((item,i)=>
                        //         createDataLoan(
                        //             item.LoanNumber === null ? '' : item.LoanNumber,
                        //             item.CreateDate ? newOrderDate(item.CreateDate) : null,
                        //             item.PrincipleBalance === null ? '' : item.PrincipleBalance.toLocaleString('en-US'),
                        //             item.PendingInterest === null ? '' : item.PendingInterest.toLocaleString('en-US'),
                        //             item.DueInterest === null ? '' : item.DueInterest.toLocaleString('en-US'),
                        //             ((item.PrincipleBalance === null ? 0 : item.PrincipleBalance) + (item.PendingInterest === null ? 0 : item.PendingInterest) + (item.DueInterest === null ? 0 : item.DueInterest)).toLocaleString('en-US'),
                        //         )
                        //     )
                        // )

                        setTableResultLoanCourt(data.loanCourtdata)
                        setSumLoanCourtValue((data.loanCourtdata[0].principle === null ? 0 : data.loanCourtdata[0].principle) + (data.loanCourtdata[0].OldInterest === null ? 0 : data.loanCourtdata[0].OldInterest))
                        console.log((data.loanCourtdata[0].principle === null ? 0 : data.loanCourtdata[0].principle) + (data.loanCourtdata[0].OldInterest === null ? 0 : data.loanCourtdata[0].OldInterest))
                        // setRows(
                        //     data.loandata.map((item,i)=>
                        //         createDataLoan(
                        //             item.LoanNumber === null ? '' : item.LoanNumber,
                        //             item.CreateDate ? newOrderDate(item.CreateDate) : null,
                        //             item.PrincipleBalance === null ? '' : item.PrincipleBalance.toLocaleString('en-US'),
                        //             item.PendingInterest === null ? '' : item.PendingInterest.toLocaleString('en-US'),
                        //             item.DueInterest === null ? '' : item.DueInterest.toLocaleString('en-US'),
                        //             ((item.PrincipleBalance === null ? 0 : item.PrincipleBalance) + (item.PendingInterest === null ? 0 : item.PendingInterest) + (item.DueInterest === null ? 0 : item.DueInterest)).toLocaleString('en-US'),
                        //         )
                        //     )
                        // )

                        setDiffDebt((data.loanCourtdata[0].principle === null ? 0 : data.loanCourtdata[0].principle) + (data.loanCourtdata[0].OldInterest === null ? 0 : data.loanCourtdata[0].OldInterest) - ((data.loandata[0].PrincipleBalance === null ? 0 : data.loandata[0].PrincipleBalance) + (data.loandata[0].PendingInterest === null ? 0 : data.loandata[0].PendingInterest) + (data.loandata[0].DueInterest === null ? 0 : data.loandata[0].DueInterest)))
                        // setDiffDebt(((data.loandata[0].PrincipleBalance === null ? 0 : data.loandata[0].PrincipleBalance) + (data.loandata[0].PendingInterest === null ? 0 : data.loandata[0].PendingInterest) + (data.loandata[0].DueInterest === null ? 0 : data.loandata[0].DueInterest)) - (data.loanCourtdata[0].principle === null ? 0 : data.loanCourtdata[0].principle) + (data.loanCourtdata[0].OldInterest === null ? 0 : data.loanCourtdata[0].OldInterest))
                        
                        setShowSum(true)
                    }
                }
            }
        ).catch(err => { 
            console.log(err);
            setErr(true)
        })
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

    const handleIDCard = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputDataSearch({...inputDataSearch,
            IDCard: event.target.value
        })
    }


    const handleSubmit = () => {
        console.log(loantransfer)

        axios.post(
            `${server_hostname}/admin/api/add_loantransfer`, 
            {
                "loantransfer": loantransfer
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
                            // setErrMsg([data.message])
                            setErrMsg('ไม่สามารถทำรายการได้')
                        }
                    } else {
                        setErrMsg(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    setSuccess(true)
                    setPrintActive(true)
                }
            }
        ).catch(err => { 
            console.log(err); 
            setErr(true)
        })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handlePrintPDF = () => {
        console.log('PDF - LoanID:', tableResultLoanCourt[0].LoanID)
        setConfirm(false)

        let formData = new FormData(); 
        formData.append('LoanID', tableResultLoanCourt[0].LoanID)
        // formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
        url: `${siteprint}/report/pdf/GetTranferDebtPdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
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

    const handleExportTransferDebt = () => {
        setFormField(true)
        setLoantransfer([
            {
                "nOrder": 1,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ลูกหนี้ตามคำพิพากษาฯ - เงินต้น",
                "AccountCode": "01-01-06-01-01-01",
                "DrAmount": tableResultLoanCourt[0].principle,
                "CrAmount": null
            },
            {
                "nOrder": 2,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ลูกหนี้ตามคำพิพากษาฯ - ดอกเบี้ย",
                "AccountCode": "01-01-06-01-01-02",
                "DrAmount": tableResultLoanCourt[0].OldInterest,
                "CrAmount": null
            },
            {
                "nOrder": 3,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ค่าใช้จ่ายในการปรับลดมูลค่าหนี้ตามคำพิพากษาศาล",
                "AccountCode": "05-03-01-01-01-01",
                "DrAmount": diffDebt < 0 ? -(diffDebt) : null,
                "CrAmount": null
            },
            
            {
                "nOrder": 4,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ลูกหนี้เงินกู้",
                "AccountCode": "01-01-06-01-01-01",
                "DrAmount": null,
                "CrAmount": tableResultLoan[0].PrincipleBalance
            },
            {
                "nOrder": 5,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ดอกเบี้ยค้างรับ",
                "AccountCode": "01-01-07-01-01-02",
                "DrAmount": null,
                "CrAmount": tableResultLoan[0].PendingInterest
            },
            {
                "nOrder": 6,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ดอกเบี้ยเงินกู้รับ",
                "AccountCode": "04-02-02-01-01-01",
                "DrAmount": null,
                "CrAmount": tableResultLoan[0].DueInterest
            },
            {
                "nOrder": 7,
                "LoanID": tableResultLoanCourt[0].LoanID,
                "Old_LoanID": tableResultLoanCourt[0].Old_LoanID,
                "List": "ส่วนเกินทุนจากคำพิพากษา",
                "AccountCode": "04-02-02-01-01-01",
                "DrAmount": null,
                "CrAmount": diffDebt > 0 ? diffDebt : null
            }
        ])
    }

    const handleAccountCode = (e, idx) => {
        console.log(e.target.value.toString().slice(0, 17), idx)
        let accountCodeArr = [...loantransfer]
        accountCodeArr[idx][e.target.name] = e.target.value.toString().slice(0, 17)

        setLoantransfer(accountCodeArr)
        // setLoantransfer({
        //     ...loantransfer,
        //     [idx]: e.target.value
        // })
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
                                <h1>โอนหนี้</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญาเดิม" placeholder="00000/0000"  value={inputDataSearch.LoanNumber} name="LoanNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญาฟ้องศาล" placeholder="ปน.ศาล00000/0000" value={inputDataSearch.LoanCourtNumber} name="LoanCourtNumber" onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <MuiTextNumber label="เลขบัตรประจำตัวประชาชน" id="id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputDataSearch.IDCard} onInput = {handleIDCard}  /> 
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchTransferDebt} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหาสัญญาเดิม {(tableResultLoan.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-recordcontractdebt mg-t-10">
                                    {/* <MUItable 
                                        headCells={headCellsLoan} 
                                        rows={rows} 
                                        rowsLabel={rowsLabelLoan} 
                                        colSpan={6} 
                                        hasCheckbox={false} 
                                        hasAction={false} 
                                    /> */}
                                    <TableContainer >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center" className="tb-w-8em">สัญญาเดิมเลขที่</TableCell>
                                                <TableCell align="center" className="tb-w-8em">ปิดสัญญาเดิมวันที่</TableCell>
                                                <TableCell align="center" className="tb-w-14em">เงินต้น</TableCell>
                                                <TableCell align="center" className="tb-w-12em">ดอกเบี้ยค้างรับ</TableCell>
                                                <TableCell align="center" className="tb-w-12em">ดอกเบี้ยรับ</TableCell>
                                                <TableCell align="center" className="tb-w-12em">รวม</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tableResultLoan.length ? 
                                                        tableResultLoan.map((cell,i) => (
                                                        <TableRow key={i}>
                                                                <TableCell align="center" className="tb-w-8em">{cell.LoanNumber}</TableCell>
                                                                <TableCell align="center" className="tb-w-8em">{cell.CreateDate ? (moment(cell.CreateDate).format('DD/MM/') + (Number(moment(cell.CreateDate).format('YYYY'))+543)) : ''}</TableCell>
                                                                <TableCell align="center" className="tb-w-14em">{cell.PrincipleBalance === null ? '' : cell.PrincipleBalance.toLocaleString('en-US')}</TableCell>
                                                                <TableCell align="center" className="tb-w-12em">{cell.OverdueInterest === null ? '' : cell.OverdueInterest.toLocaleString('en-US')}</TableCell>
                                                                {/* <TableCell align="center" className="tb-w-12em">{cell.PendingInterest === null ? '' : cell.PendingInterest.toLocaleString('en-US')}</TableCell>  // Edit by P'numnoit 26/8/2022 */}
                                                                <TableCell align="center" className="tb-w-12em">{cell.DueInterest === null ? '' : cell.DueInterest.toLocaleString('en-US')}</TableCell>
                                                                <TableCell align="center" className="tb-w-12em">{((cell.PrincipleBalance === null ? 0 : cell.PrincipleBalance) + (cell.PendingInterest === null ? 0 : cell.PendingInterest) + (cell.DueInterest === null ? 0 : cell.DueInterest)).toLocaleString('en-US')}</TableCell>
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหาสัญญาฟ้องศาล {(tableResultLoanCourt.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-recordcontractdebt mg-t-10">
                                    {/* <MUItable 
                                        headCells={headCellsLoan} 
                                        rows={rows} 
                                        rowsLabel={rowsLabelLoan} 
                                        colSpan={6} 
                                        hasCheckbox={false} 
                                        hasAction={false} 
                                    /> */}
                                    <TableContainer >
                                        <Table aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center" className="tb-w-8em">สัญญาฟ้องศาลเลขที่</TableCell>
                                                <TableCell align="center" className="tb-w-8em">ย้อนคำนวณค่าปรับถึงวันที่ปิดสัญญาเดิม</TableCell>
                                                <TableCell align="center" className="tb-w-14em">เงินต้น</TableCell>
                                                <TableCell align="center" className="tb-w-12em">ดอกเบี้ย</TableCell>
                                                <TableCell align="center" className="tb-w-12em">รวม</TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    tableResultLoanCourt.length ? 
                                                        tableResultLoanCourt.map((cell,i) => (
                                                        <TableRow key={i}>
                                                                <TableCell align="center" className="tb-w-8em">{cell.LoanNumber}</TableCell>
                                                                <TableCell align="center" className="tb-w-8em">{cell.CreateDate  ? (moment(cell.CreateDate).format('DD/MM/') + (Number(moment(cell.CreateDate).format('YYYY'))+543)) : ''}</TableCell>
                                                                <TableCell align="center" className="tb-w-14em">{cell.principle === null ? '' : cell.principle.toLocaleString('en-US')}</TableCell>
                                                                <TableCell align="center" className="tb-w-12em">{cell.OldInterest === null ? '' : cell.OldInterest.toLocaleString('en-US')}</TableCell>
                                                                <TableCell align="center" className="tb-w-12em">{((cell.principle === null ? 0 : cell.principle) + (cell.OldInterest === null ? 0 : cell.OldInterest)).toLocaleString('en-US')}</TableCell>
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                            
                            {
                                showSum ? 
                                <Grid item xs={12} md={12} className="mg-t-10" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                    <span className="txt-right">ผลต่างยอดเงินตามคำพิพากษา { diffDebt > 0 ? ' มากว่า(>) ' : ' น้อยกว่า(<) '} ยอดเงินสัญญาที่ปิด = </span>
                                    <h1>{(diffDebt > 0 ? diffDebt : -(diffDebt)).toLocaleString('en-US')}</h1>
                                    {/* <h1 style={diffDebt > 0 ? {color: '#1f8a4b'} : diffDebt < 0 ? { color: 'red'} : null}>{(diffDebt).toLocaleString('en-US')}</h1> */}
                                    <ButtonFluidPrimary maxWidth="200px" label="ออกใบโอนหนี้" onClick={handleExportTransferDebt} />  
                                </Grid>
                                : null
                            }

                            {
                                formField ? 
                                <Grid item xs={12} md={12} className="mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="เลขที่ใบโอนหนี้" value={loanData.LoanNumber} onChange={(e)=>setLoanData({...loanData, LoanNumber: e.target.value})} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่บันทึก" name="LoanReceiptDate" value={loanData.LoanDate} onChange={(newValue)=>{ setLoanData({ ...loanData, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                        </Grid>
                                    </Grid>
                                    <div className="table-box table-recordcontractdebt mg-t-10">
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" className="tb-w-8em">รายการ</TableCell>
                                                    <TableCell align="center" className="tb-w-8em">รหัสบัญขี</TableCell>
                                                    <TableCell align="center" className="tb-w-14em">DR.</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">CR.</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        loantransfer.length ? 
                                                            loantransfer.map((cell,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="left" className="tb-w-8em">{cell.List}</TableCell>
                                                                {/* <TableCell align="center" className="tb-w-8em">{cell.AccountCode}</TableCell> */}
                                                                <TableCell align="center" className="tb-w-8em">
                                                                    <MuiTextfield label="" value={loantransfer[i].AccountCode} name="AccountCode" onChange={(e)=> handleAccountCode(e,i)}  />
                                                                </TableCell>
                                                                <TableCell align="center" className="tb-w-14em">{!!cell.DrAmount ? (cell.DrAmount).toLocaleString('en-US') : cell.DrAmount}</TableCell>
                                                                <TableCell align="center" className="tb-w-12em">{!!cell.CrAmount ? (cell.CrAmount).toLocaleString('en-US') : cell.CrAmount}</TableCell>
                                                            </TableRow>
                                                            
                                                        ))
                                                        : 
                                                        <TableRow>
                                                            <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
                                                        </TableRow>
                                                    }
                                                    <TableRow>
                                                        <TableCell align="left" className="tb-w-8em">{''}</TableCell>
                                                        <TableCell align="center" className="tb-w-8em">{''}</TableCell>
                                                        <TableCell align="center" className="tb-w-14em">{(sumLoanCourtValue + (diffDebt < 0 ? -(diffDebt) : 0 )).toLocaleString('en-US')}</TableCell>
                                                        <TableCell align="center" className="tb-w-12em">{(sumLoanValue + (diffDebt > 0 ? diffDebt : 0 )).toLocaleString('en-US')}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </div>
                                    <div className="txt-center mg-t-20">
                                        <ButtonFluidPrimary label="บันทึก" maxWidth="200px" onClick={handleSubmit} color="primary" style={{justifyContent: 'center'}}/> 
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        
                                        {
                                            printActive ?
                                            <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="200px" startIcon={<PrintIcon />} onClick={handlePrintPDF}  />
                                            :
                                            <div style={{opacity: '0.5', pointerEvents: 'none', display: 'inline'}}>
                                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="200px" startIcon={<PrintIcon />} />
                                            </div>
                                        }
                                    </div>
                                </Grid>
                                : null
                            }
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

export default TransferDebt
