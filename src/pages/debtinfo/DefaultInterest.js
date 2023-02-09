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

import { ButtonExport } from '../../components';

function DefaultInterest() {
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
    const [isLoadingExport, setIsLoadingExport] = useState({});
    const [isLoadingExport2, setIsLoadingExport2] = useState({});
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inputDataSearch, setInputDataSearch] = useState({
        ContractNo: '',
        ProjName: '',
        FullName: ''
    })
    const [inputData, setInputData] = useState({
        OrderDate: moment().format('YYYY-MM-DD'),
    })
    const [tableResult, setTableResult] = useState([
        // {
        //     RecordCode: '0',
        //     ContractNumber: '0001',
        //     Projectname: 'Project Name',
        //     LoanAmount: 1000,
        //     Interest: 100,
        //     Overdue: 10,
        //     IDCard: 1234567890120,
        //     FrontName: 'นาย',
        //     Name: 'เทส',
        //     Sirname: 'ทดสอบ',
        //     IDCARD_AddNo: 11,
        //     IDCARD_AddMoo: 1,
        //     IDCARD_AddrSubDistrictName: 'ห้วยขวาง',
        //     IDCARD_AddrDistrictName: 'ห้วยขวาง',
        //     IDCARD_AddrProvinceName: 'กรุงเทพมหานคร',
        //     LoanNumber: 12345,
        // }
    ])

    const [totalTableResult, setTotalTableResult] = useState(0)
    const [openInfo, setOpenInfo] = useState(true)
    const [searchActive, setSearchActive] = useState(false)

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


    const getSearchDefaultInterest = async (pageNumber, rowPerPageNumber) => {
        setIsLoading(true)

        const formData = new FormData()
        formData.append('Date', '');
        formData.append('ContractNo', inputDataSearch.ContractNo || '');
        formData.append('ProjName', inputDataSearch.ProjName || '');
        formData.append('FullName', inputDataSearch.FullName || '');
        formData.append('Order', '');
        formData.append('Display', '');
        formData.append('ProjMain', '');
        formData.append('ProjSec', '');
        formData.append('LoanType', '');
        formData.append('BorrowerType', '');
        formData.append('LoanPlan', '');
        formData.append('LoanPurpose', '');
        formData.append('LoanType2', '');
        

        formData.append('Page', pageNumber + 1);
        formData.append('PageCount', rowPerPageNumber);
        formData.append('ProvinceID', localStorage.getItem('provinceid'));
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('Username', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        await axios.post(
            `${siteprint}/api/CheckServices/GetContract`, formData , { headers: { "token": token } } 
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
                    console.log(data)
                    setTableResult(data.data)
                    setTotalTableResult(data.totalResult)

                    console.log('tableResult: ',tableResult)
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

        getSearchDefaultInterest(page, rowsPerPage)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, searchActive])



    const handleChangePage = (event, newPage) => {
        console.log('Page: ',page, 'NewPage: ',newPage)
        setPage(newPage);
        // getSearchDefaultInterest(newPage, rowsPerPage)
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        // getSearchDefaultInterest(0, parseInt(event.target.value, 10))
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

    const gotoCarddebtorPrint = (contractNumber, ind) => {
        setIsLoadingExport(prevState => ({
            ...prevState,
            [ind]: true
        }))

        let formData = new FormData(); 
        formData.append('ContractNo', contractNumber)
        formData.append('ProvinceID', localStorage.getItem('provinceid'));
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('Username', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
            url: `${siteprint}/report/pdf/GetContractPdf`, //your url
            method: 'POST',
            data: formData,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();

            setIsLoadingExport(prevState => ({
                ...prevState,
                [ind]: false
            }))
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
                setIsLoading(false)
            }
        });
    }

    const gotoCardInterest2Times = (contractNumber, ind) => {
        setIsLoadingExport2(prevState => ({
            ...prevState,
            [ind]: true
        }))

        let formData = new FormData(); 
        formData.append('ContractNo', contractNumber)
        formData.append('ProvinceID', localStorage.getItem('provinceid'));
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('Username', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))
        axios({
            url: `${siteprint}/report/pdf/GetCardDefaultInterestPdf`, //your url
            method: 'POST',
            data: formData,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();

            setIsLoadingExport2(prevState => ({
                ...prevState,
                [ind]: false
            }))
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
                setIsLoading(false)
            }
        });

        // axios.post(
        //     `${server_hostname}/admin/api/missing2times`, {
        //         LoanNumber: loanNumber || '',
        //         Date: inputData.OrderDate || '',
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
        //             // setTableResult(data.data)
        //         }
        //     }
        // ).catch(err => { console.log(err); history.push('/') })
        // .finally(() => {
        //     if (isMounted.current) {
        //       setIsLoading(false)
        //     }
        //  });
    }

    const getBody = (dataTable) => {
        return (
            dataTable.length ? 
                (rowsPerPage > 0
                    ? dataTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : dataTable
                ).map((cell,i) => (
                <TableRow key={i}>
                    <TableCell align="left">{i+1}</TableCell>
                    <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}}>
                        <ButtonFluidPrimary label="การ์ดลูกหนี้ปกติ" maxWidth="120px" onClick={()=>gotoCarddebtorPrint(cell.contractNo)} />
                        <div style={{height: '10px'}}></div>
                        <ButtonFluidPrimary label="การ์ดดอกเบี้ยผิดนัด2งวด" maxWidth="120px" onClick={()=>gotoCardInterest2Times(cell.loanNumber)} />
                    </TableCell>
                    <TableCell align="left">{cell.contractNo}</TableCell>
                    <TableCell align="left">{cell.projName}</TableCell>
                    <TableCell align="left">{cell.LoanAmount}</TableCell>
                    <TableCell align="left">{cell.interestRate}</TableCell>
                    <TableCell align="left">{cell.Overdue}</TableCell>
                    <TableCell align="left">{cell.idCard}</TableCell>
                    <TableCell align="left">{cell.prefix}</TableCell>
                    <TableCell align="left">{cell.name}</TableCell>
                    <TableCell align="left">{cell.lastName}</TableCell>
                    <TableCell align="left">{cell.no}</TableCell>
                    <TableCell align="left">{cell.moo}</TableCell>
                    {/* <TableCell align="left">{cell.IDCARD_AddrSoiRoad}</TableCell> */}
                    <TableCell align="left">{cell.subDistrict}</TableCell>
                    <TableCell align="left">{cell.district}</TableCell>
                    <TableCell align="left">{cell.province}</TableCell>
                    {/* <TableCell align="left">{cell.IDCARD_Postcode}</TableCell> */}
                    
                </TableRow>
                
            )) 
            : 
            <TableRow>
                <TableCell colSpan={13} align="left">ไม่พบข้อมูล</TableCell>
            </TableRow>
        )
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
                                <h1>การจัดเก็บดอกเบี้ยผิดนัด</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญา" value={inputDataSearch.ContractNo} name="ContractNo" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อโครงการ" value={inputDataSearch.ProjName} name="ProjName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ" value={inputDataSearch.FullName} name="FullName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        {/* <ButtonFluidPrimary label="ค้นหา" onClick={()=> getSearchDefaultInterest(0, rowsPerPage)} />   */}
                                        <ButtonFluidPrimary label="ค้นหา" onClick={()=> setSearchActive(!searchActive)} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่ประมวลผล" name="OrderDate" value={inputData.OrderDate} onChange={(newValue)=>{ handleInputData('OrderDate', moment(newValue).format('YYYY-MM-DD')) }}   />
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
                                                    <TableCell align="left">&nbsp;</TableCell>
                                                    <TableCell align="left">สัญญาเลขที่	</TableCell>
                                                    <TableCell align="left">ชื่อโครงการ	</TableCell>
                                                    <TableCell align="left">จำนวนเงินให้กู้	</TableCell>
                                                    <TableCell align="left">อัตราดอกเบี้ย	</TableCell>
                                                    <TableCell align="left">อัตราค้างชำระ(เพิ่มจากปกติ)	</TableCell>
                                                    <TableCell align="left">เลขบัตรประชาชน	</TableCell>
                                                    <TableCell align="left">คำนำหน้า	</TableCell>
                                                    <TableCell align="left">ชื่อ	</TableCell>
                                                    <TableCell align="left">นามสกุล	</TableCell>
                                                    <TableCell align="left">เลขที่	</TableCell>
                                                    <TableCell align="left">หมู่	</TableCell>
                                                    <TableCell align="left">ตำบล	</TableCell>
                                                    <TableCell align="left">อำเภอ	</TableCell>
                                                    <TableCell align="left">จังหวัด</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    // getBody(tableResult)

                                                    // tableResult.length ? 
                                                    // (rowsPerPage > 0
                                                    //     ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    //     : tableResult
                                                    // ).map((cell,i) => (
                                                    //     <TableRow key={i}>
                                                    //         <TableCell align="left">{i+1}</TableCell>
                                                    //         <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}}>
                                                    //             <ButtonFluidPrimary label="การ์ดลูกหนี้ปกติ" maxWidth="120px" onClick={()=>gotoCarddebtorPrint(cell.contractNo)} />
                                                    //             <div style={{height: '10px'}}></div>
                                                    //             <ButtonFluidPrimary label="การ์ดดอกเบี้ยผิดนัด2งวด" maxWidth="120px" onClick={()=>gotoCardInterest2Times(cell.loanNumber)} />
                                                    //         </TableCell>
                                                    //         <TableCell align="left">{cell.contractNo}</TableCell>
                                                    //         <TableCell align="left">{cell.projName}</TableCell>
                                                    //         <TableCell align="left">{cell.LoanAmount}</TableCell>
                                                    //         <TableCell align="left">{cell.interestRate}</TableCell>
                                                    //         <TableCell align="left">{cell.Overdue}</TableCell>
                                                    //         <TableCell align="left">{cell.idCard}</TableCell>
                                                    //         <TableCell align="left">{cell.prefix}</TableCell>
                                                    //         <TableCell align="left">{cell.name}</TableCell>
                                                    //         <TableCell align="left">{cell.lastName}</TableCell>
                                                    //         <TableCell align="left">{cell.no}</TableCell>
                                                    //         <TableCell align="left">{cell.moo}</TableCell>
                                                    //         {/* <TableCell align="left">{cell.IDCARD_AddrSoiRoad}</TableCell> */}
                                                    //         <TableCell align="left">{cell.subDistrict}</TableCell>
                                                    //         <TableCell align="left">{cell.district}</TableCell>
                                                    //         <TableCell align="left">{cell.province}</TableCell>
                                                    //         {/* <TableCell align="left">{cell.IDCARD_Postcode}</TableCell> */}
                                                            
                                                    //     </TableRow>
                                                        
                                                    // )) 
                                                    // : 
                                                    // <TableRow>
                                                    //     <TableCell colSpan={16} align="left">ไม่พบข้อมูล</TableCell>
                                                    // </TableRow>
                                                    tableResult.length ? 
                                                        (tableResult).map((cell,i) => (
                                                            <TableRow key={i}>
                                                                <TableCell align="left">{i+1}</TableCell>
                                                                <TableCell align="left" style={{minWidth: '200px', width: '10em', padding: '10px'}}>
                                                                    <ButtonExport label="การ์ดลูกหนี้ปกติ" handleButtonClick={() => { gotoCarddebtorPrint(cell.contractNo, i) }} loading={isLoadingExport[i]} />
                                                                    {/* <ButtonFluidPrimary label="การ์ดลูกหนี้ปกติ" maxWidth="120px" onClick={()=>gotoCarddebtorPrint(cell.contractNo)} /> */}
                                                                    <div style={{height: '10px'}}></div>
                                                                    <ButtonExport label="การ์ดดอกเบี้ยผิดนัด2งวด" handleButtonClick={() => { gotoCardInterest2Times(cell.contractNo, i) }} loading={isLoadingExport2[i]} />
                                                                </TableCell>
                                                                <TableCell align="left">{cell.contractNo}</TableCell>
                                                                <TableCell align="left">{cell.projName}</TableCell>
                                                                <TableCell align="left">{cell.LoanAmount}</TableCell>
                                                                <TableCell align="left">{cell.interestRate}</TableCell>
                                                                <TableCell align="left">{cell.Overdue}</TableCell>
                                                                <TableCell align="left">{cell.idCard}</TableCell>
                                                                <TableCell align="left">{cell.prefix}</TableCell>
                                                                <TableCell align="left">{cell.name}</TableCell>
                                                                <TableCell align="left">{cell.lastName}</TableCell>
                                                                <TableCell align="left">{cell.no}</TableCell>
                                                                <TableCell align="left">{cell.moo}</TableCell>
                                                                {/* <TableCell align="left">{cell.IDCARD_AddrSoiRoad}</TableCell> */}
                                                                <TableCell align="left">{cell.subDistrict}</TableCell>
                                                                <TableCell align="left">{cell.district}</TableCell>
                                                                <TableCell align="left">{cell.province}</TableCell>
                                                                {/* <TableCell align="left">{cell.IDCARD_Postcode}</TableCell> */}
                                                                
                                                            </TableRow>
                                                        ))
                                                        : 
                                                        <TableRow>
                                                            <TableCell colSpan={16} align="left">ไม่พบข้อมูล</TableCell>
                                                        </TableRow>
                                                }
                                                
                                                {/* {
                                                    tableResult.length ? 
                                                        (rowsPerPage > 0
                                                            ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : tableResult
                                                        ).map((cell,i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="left">{i+1}</TableCell>
                                                            <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}}>
                                                                <ButtonFluidPrimary label="การ์ดลูกหนี้ปกติ" maxWidth="120px" onClick={()=>gotoCarddebtorPrint(cell.contractNo)} />
                                                                <div style={{height: '10px'}}></div>
                                                                <ButtonFluidPrimary label="การ์ดดอกเบี้ยผิดนัด2งวด" maxWidth="120px" onClick={()=>gotoCardInterest2Times(cell.LoanNumber)} />
                                                            </TableCell>
                                                            <TableCell align="left">{cell.contractNo}</TableCell>
                                                            <TableCell align="left">{cell.projName}</TableCell>
                                                            <TableCell align="left">{cell.LoanAmount}</TableCell>
                                                            <TableCell align="left">{cell.interestRate}</TableCell>
                                                            <TableCell align="left">{cell.Overdue}</TableCell>
                                                            <TableCell align="left">{cell.idCard}</TableCell>
                                                            <TableCell align="left">{cell.prefix}</TableCell>
                                                            <TableCell align="left">{cell.name}</TableCell>
                                                            <TableCell align="left">{cell.lastName}</TableCell>
                                                            <TableCell align="left">{cell.no}</TableCell>
                                                            <TableCell align="left">{cell.moo}</TableCell>
                                                            
                                                            <TableCell align="left">{cell.subDistrict}</TableCell>
                                                            <TableCell align="left">{cell.district}</TableCell>
                                                            <TableCell align="left">{cell.province}</TableCell>
                                                            
                                                            
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={13} align="left">ไม่พบข้อมูล</TableCell>
                                                    </TableRow>
                                                } */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                        component="div"
                                        count={totalTableResult}
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
                
                </div>
            </Fade>
        </div>
    )
}

export default DefaultInterest
