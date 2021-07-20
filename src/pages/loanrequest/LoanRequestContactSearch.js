import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

// import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

function LoanRequestContactSearch() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [tableResult, setTableResult] = useState([])
    const [inputData, setInputData] = useState({
        Name: '', // "",
        IDCard: '', // "1234567889015",
        dCreated: null, // "",    
        order_by: 'Name', // "Name",
        order_desc: 'DESC', // "DESC",
        page_number: 1, // 1,
        page_length: 200, // 200
    })

    useEffect(() => {
        setLoaded(true);

        // Check Login
        async function fetchCheckLogin() {
            const res = await fetch(`${server_hostname}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "token": token
                }
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsLoaded(true);
                    setErr(true);
                    history.push('/');
                });
        }

        setLoaded(true);
        fetchCheckLogin();
    }, [])

    const getSearchApplicantID = () => {
        console.log(inputData.dCreated)

        axios.post(
            `${server_hostname}/admin/api/search_applicant`, {
                Name: inputData.Name, // "",
                IDCard: inputData.IDCard, // "1234567889015",
                dCreated: (inputData.dCreated === 'Invalid date' ? null : inputData.dCreated), // "",    
                order_by: 'Name', // "Name",
                order_desc: 'DESC', // "DESC",
                page_number: 1, // 1,
                page_length: 200,
            }, { headers: { "token": token } } 
        ).then(res => {
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
                    setTableResult(data.data);
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    // Input Text field 
    const handleInputData = (event) => {
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const gotoAddLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
    }

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        // history.push('/manageinfo/searchmember');

    };

    const gotoLoanRequestContact = (id, applicantid, action) => {
        history.push({
            pathname: '/loanrequest/loanrequestcontact',
            state: { 
                FarmerID: id, 
                activeStep: 0,
                completed: {},
                action: action,
                ApplicantID: applicantid,
            }
          });
    }

    return (
        <div className="loanrequestcontactsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ตรวจสอบคำขอกู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ชื่อเกษตรกร" name="Name" value={inputData.Name} onChange={handleInputData}  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="search-by-idc" name="IDCard" value={inputData.IDCard} onChange={handleInputData} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่ยื่นคำขอ" name="dCreated" value={inputData.dCreated === 'Invalid date' ? null : inputData.dCreated} onChange={(newValue)=>{ setInputData({ ...inputData, dCreated: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getSearchApplicantID} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">วันที่ยื่นคำขอ</TableCell>
                                                <TableCell align="center">เลขบัตรประจำตัวประชาชน</TableCell>
                                                <TableCell align="center">ชื่อเกษตรกร</TableCell>
                                                <TableCell align="center">Action</TableCell>
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
                                                            <TableCell align="center">{moment(cell.dCreated).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="center">{cell.IDCard}</TableCell>
                                                            <TableCell align="center">{cell.FrontName} {cell.Name} {cell.Sirname}</TableCell>
                                                            <TableCell align="center">
                                                                {/* <ButtonFluidPrimary label="แก้ไข" maxWidth="80px" onClick={()=>gotoLoanRequestContact(cell.FarmerID,'edit')} /> */}
                                                                <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="80px" onClick={()=>gotoLoanRequestContact(cell.FarmerID, cell.ApplicantID, 'view')} />
                                                            </TableCell>
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

export default LoanRequestContactSearch
