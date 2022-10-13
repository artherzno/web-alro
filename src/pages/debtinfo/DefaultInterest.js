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
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [inputDataSearch, setInputDataSearch] = useState({
        ContractNo: '',
    })
    const [inputData, setInputData] = useState({
        OrderDate: moment().format('YYYY-MM-DD'),
    })
    const [tableResult, setTableResult] = useState([{
        RecordCode: '0',
        ContractNumber: '0001',
        Projectname: 'Project Name',
        LoanAmount: 1000,
        Interest: 100,
        Overdue: 10,
        IDCard: 1234567890120,
        FrontName: 'นาย',
        Name: 'เทส',
        Sirname: 'ทดสอบ',
        IDCARD_AddNo: 11,
        IDCARD_AddMoo: 1,
        IDCARD_AddrSubDistrictName: 'ห้วยขวาง',
        IDCARD_AddrDistrictName: 'ห้วยขวาง',
        IDCARD_AddrProvinceName: 'กรุงเทพมหานคร',
    }])
    const [openInfo, setOpenInfo] = useState(true)

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


    const getSearchDefaultInterest = () => {
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

    const gotoLoanRequestPrint = () => {
        setOpenInfo(true);
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
                                <h1>การจัดเก็บดอกเบี้ยผิดนัด</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญา" value={inputDataSearch.ContractNo} name="ContractNo" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อโครงการ" value={inputDataSearch.Projectname} name="Projectname" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ" value={inputDataSearch.Name} name="Name" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchDefaultInterest} />  
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
                                                    tableResult.length ? 
                                                        (rowsPerPage > 0
                                                            ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : tableResult
                                                        ).map((cell,i) => (
                                                        <TableRow key={i}>
                                                            <TableCell align="left">{cell.RecordCode}</TableCell>
                                                            <TableCell align="left" style={{minWidth: '140px', width: '10em', padding: '10px'}}>
                                                                <ButtonFluidPrimary label="การ์ดลูกหนี้ปกติ" maxWidth="120px" onClick={()=>gotoLoanRequestPrint(cell.xxx)} />
                                                                <div style={{height: '10px'}}></div>
                                                                <ButtonFluidPrimary label="การ์ดดอกเบี้ยผิดนัด2งวด" maxWidth="120px" onClick={()=>gotoLoanRequestPrint(cell.xxx)} />
                                                            </TableCell>
                                                            <TableCell align="left">{cell.ContractNumber}</TableCell>
                                                            <TableCell align="left">{cell.Projectname}</TableCell>
                                                            <TableCell align="left">{cell.LoanAmount}</TableCell>
                                                            <TableCell align="left">{cell.Interest}</TableCell>
                                                            <TableCell align="left">{cell.Overdue}</TableCell>
                                                            <TableCell align="left">{cell.IDCard}</TableCell>
                                                            <TableCell align="left">{cell.FrontName}</TableCell>
                                                            <TableCell align="left">{cell.Name}</TableCell>
                                                            <TableCell align="left">{cell.Sirname}</TableCell>
                                                            <TableCell align="left">{cell.IDCARD_AddNo}</TableCell>
                                                            <TableCell align="left">{cell.IDCARD_AddMoo}</TableCell>
                                                            {/* <TableCell align="left">{cell.IDCARD_AddrSoiRoad}</TableCell> */}
                                                            <TableCell align="left">{cell.IDCARD_AddrSubDistrictName}</TableCell>
                                                            <TableCell align="left">{cell.IDCARD_AddrDistrictName}</TableCell>
                                                            <TableCell align="left">{cell.IDCARD_AddrProvinceName}</TableCell>
                                                            {/* <TableCell align="left">{cell.IDCARD_Postcode}</TableCell> */}
                                                            
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
                        </Grid>
                    </Container>
                
                </div>
            </Fade>
        </div>
    )
}

export default DefaultInterest
