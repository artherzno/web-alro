import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid } from '@material-ui/data-grid';

import PrintIcon from '@material-ui/icons/InsertDriveFile';


import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    ButtonFluidPrimary,
    MuiDatePicker,
    ButtonFluidIconStartPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

// End All Data for DataGrid ---------------------------------------------//


function UserHistory() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [openPopup, setOpenPopup] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [tableResult, setTableResult] = useState([])

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

      const headCells = [
        { id: 'id', numeric: true, disablePadding: false, widthCol: '110px', label: 'ลำดับ' },
        { id: 'userid', numeric: true, disablePadding: false, widthCol: '140px', label: 'รหัสผู้ใช้งาน' },
        { id: 'officername', numeric: true, disablePadding: false, widthCol: '140px', label: 'ชื่อ - นามสกุล' },
        { id: 'username', numeric: true, disablePadding: false, widthCol: '160px', label: 'รายการ (หน้า)' },
        { id: 'dcreated', numeric: true, disablePadding: false, widthCol: '160px', label: 'URL' },
        { id: 'activestatus', numeric: true, disablePadding: false,  widthCol: '110px',label: 'IP' },
        { id: 'expiredate', numeric: true, disablePadding: false,  widthCol: '110px', label: 'LOCATION' },
        { id: 'userrole', numeric: true, disablePadding: false, widthCol: '110px', label: 'AGENT' },
        { id: 'userrole', numeric: true, disablePadding: false, widthCol: '140px', label: 'วันที่ - เวลา' },
    ];

    const rowsLabel = [
        'userid','officername','username','dcreated','activestatus','expiredate','userrole']

    function createData( userid,officername,username,dcreated,activestatus,expiredate,userrole) {
        return { 
            userid,officername,username,dcreated,activestatus,expiredate,userrole
         };
    }

    const [rows, setRows] = useState([])
    const [inputDataSearch, setInputDataSearch] = useState({
        startDate: '',
        endDate: '',
        SearchByName: '',
    })

    useEffect(() => {
        setLoaded(true);
        setOpenPopup(true);

        // axios.post(
        //     `${server_hostname}/admin/api/search_member`, '', { headers: { "token": token } } 
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
        //             console.log(data.data)
        //             setTableResult(data.data)
        //             let dataArr = [];
        //             for(let i=0; i<data.data.length; i++) {
        //                 // console.log(data.data[i].ApplicantID)
        //                 dataArr.push({
        //                     id: data.data[i].nMEMID,
        //                     userid: data.data[i].nMEMID,
        //                     officername: data.data[i].OfficerName,
        //                     username: data.data[i].cUsername,
        //                     createdate: (data.data[i].dCreated === null) ? '' : moment(data.data[i].dCreated).format('DD/MM/YYYY'),
        //                     activestatus: (data.data[i].bActive === true) ? 1 : (data.data[i].bActive === false) ? 0 : data.data[i].bActive,
        //                     expiredate: (data.data[i].ExpireDate === null) ? '' : moment(data.data[i].ExpireDate).format('DD/MM/YYYY'),
        //                     userrole: data.data[i].nRolename,
        //                 })
        //             }
        //             setRows(dataArr)
        //         }
        //     }
        // ).catch(err => { console.log(err); history.push('/') })
        // .finally(() => {
        //     if (isMounted.current) {
        //       setIsLoading(false)
        //     }
        //  });

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
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();

         // executed when component mounted
        isMounted.current = true;
        return () => {
            // executed when unmount
            isMounted.current = false;
        }

    }, [])


    const gotoEditUser = (id) => {
        history.push({
            pathname: '/manageinfo/edituser',
            state: {
                nMEMID: id
            }
        });
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleCancel = () => {
        setOpenPopup(false);
        history.push('/home');
    };

    const handleSubmit = event => {
        event.preventDefault();
        // fetchDataLogin();
        // if(dataLogin.username === 'admin' && dataLogin.password === '1234') {
        //     setErr(false);
        //     alert('A name was submitted: ' + dataLogin.username +', '+dataLogin.password);
        //     history.push('/home');
        // } else {
        //     setErr(true);
        //     setDataLogin({
        //         ...dataLogin,
        //         username: '',
        //         password: ''
        //     })
        // }
    }
    
    return (
        <div className="allcontractsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ประวัติการใช้งาน</h1>
                            </Grid>
                            {/* <Grid item xs={12} md={12} className="mg-t-0 txt-right dsp-f jc-flex-end" >
                                <div className="mg-l-10"><ButtonNormalIconStartPrimary label="เพิ่มผู้ใช้งาน" startIcon={<AddIcon />} onClick={()=>gotoAddUser()}/></div>
                            </Grid> */}
                             <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหา" value={inputDataSearch.SearchByName} name="SearchByName" onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="จากวันที่" name="startDate" value={inputDataSearch.startDate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, startDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiDatePicker label="ถึงวันที่" name="endDate" value={inputDataSearch.endDate} onChange={(newValue)=>{ setInputDataSearch({ ...inputDataSearch, endDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <p>&nbsp;</p>
                                        <div style={{opacity: '0.5', display: 'inline-block'}}>
                                            <ButtonFluidIconStartPrimary label="EXPORT TO EXCEL" startIcon={<PrintIcon />} />
                                        </div> 
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--10"> 
                                <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-userhistory mg-t-10" style={{  }}>
                                    <MUItable 
                                        headCells={headCells} 
                                        rows={rows} 
                                        rowsLabel={rowsLabel} 
                                        colSpan={36} 
                                        hasCheckbox={false} 
                                        hasAction={false} 
                                        actionEdit={false}
                                        editEvent={gotoEditUser}
                                        editParam={'userid'}
                                    />
                                    {/* <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        autoHeight={true}
                                        disableColumnMenu={true}
                                        // checkboxSelection
                                        disableSelectionOnClick
                                    /> */}


                                </div>
                                {/* <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">UserID</TableCell>
                                                <TableCell align="left">OfficerName</TableCell>
                                                <TableCell align="left">UserName</TableCell>
                                                <TableCell align="left">CreateDate</TableCell>
                                                <TableCell align="left">ActiveStatus</TableCell>
                                                <TableCell align="left">ExpireDate</TableCell>
                                                <TableCell align="left">UserRole</TableCell>
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
                                                            <TableCell align="left" className="tb-w-8em">{cell.nMEMID}</TableCell>
                                                            <TableCell align="left" className="tb-w-8em">{cell.OfficerName}</TableCell>
                                                            <TableCell align="left" className="tb-w-14em">{cell.cUsername}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{(cell.dCreated === null) ? '' : moment(cell.dCreated).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{(cell.bActive) ? 1 : 0}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{(cell.ExpireDate === null) ? '' : moment(cell.ExpireDate).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.nRolename}</TableCell>
                                                            <TableCell align="left" className="sticky tb-w-14em">
                                                                <ButtonNormalIconStartPrimary label="แก้ไข" startIcon={<EditOutlinedIcon />} onClick={()=>{gotoEditUser(cell.nMEMID)}} />
                                                                <ButtonNormalIconStartSecondary label="ลบ" startIcon={<DeleteOutlineOutlinedIcon />} />
                                                            </TableCell>
                                                    </TableRow>
                                                    
                                                ))
                                                : 
                                                <TableRow>
                                                    <TableCell colSpan={8} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={tableResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div> */}
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

            {/* <Dialog
                open={openPopup}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogContent>
                        <form  onSubmit={handleSubmit}>
                    <div id="alert-dialog-description">
                        <p className="font-18 txt-black txt-center">เข้าสู่ระบบจัดการผู้ใช้งาน</p>
                            <div className="form-input">
                                <label>Username</label>
                                <input autoFocus type="text" name="username" placeholder="" />
                            </div>
                            <div className="form-input">
                                <label>Password</label>
                                <input type="password" name="password" placeholder=""  />
                            </div>
                            <button className="btn btn-blue" onClick={handleClosePopup}>เข้าสู่ระบบ</button>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={handleCancel} />
                    </div>
                        </form>
                </DialogContent>
            </Dialog> */}

            <Dialog
                open={err || success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    {
                        success ? 
                        <div className="dialog-success">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{successMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        :
                        <div className="dialog-error">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{errMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleCancel} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </div>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default UserHistory
