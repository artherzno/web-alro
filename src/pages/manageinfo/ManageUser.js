import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

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

import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    ButtonFluidPrimary,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonFluidOutlinePrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: '1', b: 'วิพรรษา ดิษสิน', c: 'wipansa.d', d: 'xxxxx', f: '2021-05-07', g: '1', h: '2021-05-07', i: 'ฝ่ายการเงิน', j:'alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx'},
    { a: '2', b: 'วิพรรษา ดิษสิน', c: 'wipansa.d', d: 'xxxxx', f: '2021-05-07', g: '1', h: '2021-05-07', i: 'ฝ่ายการเงิน', j:'alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx'},
    { a: '3', b: 'วิพรรษา ดิษสิน', c: 'wipansa.d', d: 'xxxxx', f: '2021-05-07', g: '1', h: '2021-05-07', i: 'ฝ่ายการเงิน', j:'alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx alro.go.th/xxxxxxxx'},
]

// End All Data for DataGrid ---------------------------------------------//


function ManageUser() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [openPopup, setOpenPopup] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setLoaded(true);
        setOpenPopup(true);
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const gotoAddUser = () => {
        history.push('/manageinfo/adduser');
    }

    const gotoEditUser = () => {
        history.push('/manageinfo/adduser');
    }

    const gotoAddMenu = () => {
        history.push('/manageinfo/addmenu');
    }

    const gotoAddRole = () => {
        history.push('/manageinfo/addrole');
    }

    const gotoManagePermission = () => {
        history.push('/manageinfo/managepermission');
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
                                <h1>จัดการผู้ใช้งาน</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0 txt-right dsp-f jc-flex-end" >
                                <div className="mg-r-10"><ButtonNormalIconStartPrimary label="เพิ่ม role" startIcon={<AddIcon />} onClick={()=>gotoAddRole()} /></div>
                                <div className="mg-r-10"><ButtonNormalIconStartPrimary label="เพิ่มเมนู" startIcon={<AddIcon />} onClick={()=>gotoAddMenu()} /></div>
                                <div className="mg-r-10"><ButtonNormalIconStartPrimary label="จัดการสิทธิ์" startIcon={<SettingsOutlinedIcon />} onClick={()=>gotoManagePermission()} /></div>
                                <div className="mg-l-10"><ButtonNormalIconStartPrimary label="เพิ่มผู้ใช้งาน" startIcon={<AddIcon />} onClick={()=>gotoAddUser()}/></div>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">UserID</TableCell>
                                                <TableCell align="center">OfficerName</TableCell>
                                                <TableCell align="center">UserName</TableCell>
                                                <TableCell align="center">Password</TableCell>
                                                <TableCell align="center">CreateDate</TableCell>
                                                <TableCell align="center">ActiveStatus</TableCell>
                                                <TableCell align="center">ExpireDate</TableCell>
                                                <TableCell align="center">UserRole</TableCell>
                                                <TableCell align="center">MenuAccess</TableCell>
                                                <TableCell align="center">&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={10} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            {/* {
                                                (rowsPerPage > 0
                                                    ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : tableResult
                                                  ).map((row,i) => (
                                                <TableRow key={i}>
                                                        <TableCell align="center">{row.a}</TableCell>
                                                        <TableCell align="center">{row.b}</TableCell>
                                                        <TableCell align="center">{row.c}</TableCell>
                                                        <TableCell align="center">{row.d}</TableCell>
                                                        <TableCell align="center">{row.f}</TableCell>
                                                        <TableCell align="center">{row.g}</TableCell>
                                                        <TableCell align="center">{row.h}</TableCell>
                                                        <TableCell align="center">{row.i}</TableCell>
                                                        <TableCell align="center">{row.j}</TableCell>
                                                        <TableCell align="center" className="tb-w-18em">
                                                            <ButtonNormalIconStartPrimary label="แก้ไข" startIcon={<EditOutlinedIcon />} onClick={()=>gotoEditUser()}/>
                                                            <ButtonNormalIconStartSecondary label="ลบ" startIcon={<DeleteOutlineOutlinedIcon />} onClick={()=>gotoEditUser()}/>
                                                        </TableCell>
                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={tableResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={openPopup}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p className="font-18 txt-black txt-center">เข้าสู่ระบบจัดการผู้ใช้งาน</p>
                        <form  onSubmit={handleSubmit}>
                            <div className="form-input">
                                <label>Username</label>
                                <input autoFocus type="text" name="username" value="" placeholder="" />
                            </div>
                            <div className="form-input">
                                <label>Password</label>
                                <input type="password" name="password" value="" placeholder=""  />
                            </div>
                            <button className="btn btn-blue" onClick={handleClosePopup}>เข้าสู่ระบบ</button>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={handleCancel} />
                        </form>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default ManageUser
