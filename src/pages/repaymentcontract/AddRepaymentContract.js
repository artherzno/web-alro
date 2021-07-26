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

function AddRepaymentContract() {
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
        typeLoan: '1',
        typePay: '1',
    })
    const [tableResult, setTableResult] = useState({})
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


    const getSearchAddRepaymentContract = () => {
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
                                <h1>เพิ่มสัญญาชดใช้หนี้แทน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญาที่ต้องปิด" value={inputDataSearch.ContractNo} name="SearchByName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchAddRepaymentContract} />  
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
                                                <TableCell align="center">
                                                    <MuiCheckbox label="&nbsp;"  />
                                                </TableCell>
                                                <TableCell align="center">เลขที่สัญญาที่ชดใช้หนี้แทน</TableCell>
                                                <TableCell align="center">เลขประจำตัวประชาชน</TableCell>
                                                <TableCell align="center">ชื่อ-สกุล เกษตกร</TableCell>
                                                <TableCell align="center">สัญญาเริ่มต้น</TableCell>
                                                <TableCell align="center">สัญญาสิ้นสุด</TableCell>
                                                <TableCell align="center">วงเงินกู้</TableCell>
                                                <TableCell align="center">เงินต้นคงเหลือ</TableCell>
                                                <TableCell align="center">ดอกเบี้ย</TableCell>
                                                <TableCell align="center">ค่าปรับ</TableCell>
                                                <TableCell align="center">ผู้ชดใช้หนี้แทน</TableCell>
                                                <TableCell align="center" className="sticky" style={{minWidth: '120px', width: '10em'}}>&nbsp;</TableCell>
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
                                                            <TableCell align="center">{cell.RecordCode}</TableCell>
                                                            <TableCell align="center">{cell.RecDate === null ? '' : moment(cell.RecDate).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="center">{cell.ApplicantNo}</TableCell>
                                                            <TableCell align="center">{cell.ProjectID === 0 ? '' : cell.ProjectID}</TableCell>
                                                            <TableCell align="center">{cell.ProjectName}</TableCell>
                                                            <TableCell align="center">{cell.LoanNumber}</TableCell>
                                                            <TableCell align="center">{cell.dCreated === null ? '' : moment(cell.dCreated).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="center">{cell.IDCard}</TableCell>
                                                            <TableCell align="center">{cell.FrontName}</TableCell>
                                                            <TableCell align="center">{cell.Name}</TableCell>
                                                            <TableCell align="center">{cell.Sirname}</TableCell>
                                                            <TableCell align="center">{cell.IDCARD_AddNo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddMoo} {cell.IDCARD_AddrSoiRoad} {cell.IDCARD_AddrDistrictName} {cell.IDCARD_AddrProvinceName} {cell.IDCARD_Postcode}</TableCell>
                                                            <TableCell align="center" className="sticky" style={{minWidth: '120px', width: '10em'}}>
                                                                <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="100px" onClick={()=>gotoLoanRequestPrint(cell.xxx)} />
                                                            </TableCell>
                                                        </TableRow>
                                                        
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={13} align="center">ไม่พบข้อมูล</TableCell>
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

                    <Container  maxWidth="md">
                        <Grid container spacing={2} className="btn-row txt-center">
                            <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="ปุ่มบันทึกข้อมูลผู้ชดใช้หนี้แทน" maxWidth="380px" />
                            </Grid>
                        </Grid>
                    </Container>
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

                                                        <Grid item xs={12} md={12}>
                                                            <h1 className="paper-head-green">ข้อมูลผู้ชดใช้หนี้แทน</h1>
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <p className="txt-green">ลำดับที่ 1</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiTextfield label="เลขที่คำสั่ง"  />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <MuiDatePicker label="วันที่คำสั่ง" />
                                                                </Grid>
                                                                <Grid item xs={12} md={7}>
                                                                    <MuiTextfield label="ชื่อ-สกุล ผู้ชดใช้หนี้แทน"  />
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <p>&nbsp;</p>
                                                                    <ButtonFluidPrimary label="เลือกจากข้อมูลสมาชิก" />
                                                                </Grid>
                                                                <Grid item xs={12} md={12}>
                                                                    <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4"  />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>

                                                        {/* Right side ----------------------------------- */}
                                                        <Grid item xs={12} md={6}>
                                                            
                                                            <Grid container spacing={2}>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">การชดใช้หนี้</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiSelect label="" listsValue={['0','เงินต้นหรือดอกเบี้ย คงที่','เงินต้นและอัตราดอกเบี้ย เป็น %','เงินต้นและดอกเบี้ย คงที่']} lists={['กรุณาเลือก','เงินต้นหรือดอกเบี้ย คงที่','เงินต้นและอัตราดอกเบี้ย เป็น %','เงินต้นและดอกเบี้ย คงที่']} />
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">&nbsp;</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">เงินต้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldCurrency label=""  /> 
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">อัตราดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldCurrency label=""  /> 
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">% ต่อปี</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">เริ่มคำนวณดอกเบี้ยตั้งแต่วันที่</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiDatePicker label="" />
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">รวมเป็นเงินต้องชดใช้จำนวน</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldCurrency label=""  /> 
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">บาท</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">จำนวนงวดที่ผ่อนชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldCurrency label=""  /> 
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">งวด</p>
                                                                </Grid>

                                                                <Grid item xs={1} md={5}>
                                                                    <p className="paper-p txt-right">เริ่มผ่อนงวดแรกวันที่</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiDatePicker label="" />
                                                                </Grid>
                                                                <Grid item xs={1} md={2}>
                                                                    <p className="paper-p">&nbsp;</p>
                                                                </Grid>

                                                            </Grid>
                                                        </Grid>
                                                    
                                                        <Divider />

                                                        <Grid item xs={12} md={12} className="txt-center mg-t-20">
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12} md={12}>
                                                                        <ButtonNormalIconStartPrimary label="เพิ่มผู้ชดใช้หนี้แทน" maxWidth="380px"  startIcon={<AddIcon />}  />
                                                                    </Grid>
                                                                </Grid>
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
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="380px" />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </React.Fragment>
                        : ''
                    }
                
                </div>
            </Fade>
        </div>
    )
}

export default AddRepaymentContract
