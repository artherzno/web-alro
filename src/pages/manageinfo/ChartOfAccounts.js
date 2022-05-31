import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    ButtonFluidPrimary,
    MuiTextfieldMultiLine,
    MuiTextfieldNumberInt,
    MuiLabelHeaderCheckbox,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'
import { WindowRounded } from '@material-ui/icons';

// End All Data for DataGrid ---------------------------------------------//


function ChartOfAccounts() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [del, setDel] = useState(false);
    const [delMsg] = useState('ต้องการลบใช่หรือไม่')
    const [openPopup, setOpenPopup] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [tableResult, setTableResult] = useState([])

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

      const headCells = [
        { id: 'BusinessProject', numeric: true, disablePadding: false, widthCol: '100px', label: 'ธุรกิจ/โครงการ' },
        { id: 'ControlCode', numeric: true, disablePadding: false, widthCol: '140px', label: 'รหัสคุม' },
        { id: 'AccountCode', numeric: true, disablePadding: false, widthCol: '140px', label: 'รหัสบัญชี' },
        { id: 'AccountName', numeric: true, disablePadding: false, widthCol: '200px', label: 'ชื่อบัญชี' },
        { id: 'AccountType', numeric: true, disablePadding: false, widthCol: '80px', label: 'ประเภทบัญชี' },
        { id: 'PrintStatement', numeric: true, disablePadding: false, widthCol: '80px', label: 'พิมพ์ออกงบ' },
        { id: 'Explain', numeric: true, disablePadding: false,  widthCol: '160px',label: 'คำอธิบาย' },
    ];

    const rowsLabel = [
        'BusinessProject', 'ControlCode','AccountCode','AccountName','AccountType','PrintStatement','Explain']

    function createData(PBID, BusinessProject, ControlCode,AccountCode,AccountName,AccountType,PrintStatement,Explain) {
        return { 
            PBID, BusinessProject, ControlCode,AccountCode,AccountName,AccountType,PrintStatement,Explain
         };
    }

    const [rows, setRows] = useState([])
    const [inputDataSearch, setInputDataSearch] = useState({
        ControlCode: '',
        AccountCode: '',
        AccountName: '',
    })

    const [inputDataSubmit, setInputDataSubmit] = useState({
        PBID: '',
        BusinessProject: '',

        ControlCode1: '',
        ControlCode2: '',
        ControlCode3: '',
        ControlCode4: '',
        ControlCode5: '',
        ControlCode6: '',
        // ControlCode7: '',

        AccountCode1: '',
        AccountCode2: '',
        AccountCode3: '',
        AccountCode4: '',
        AccountCode5: '',
        AccountCode6: '',

        AccountName1: '',
        AccountName2: '',
        AccountName3: '',
        AccountName4: '',
        AccountName5: '',
        AccountName6: '',
        // AccountName7: '',

        AccountType: '',
        PrintStatement: '',
        Explain: ''
    })

    const [editStatus, setEditStatus] = useState(false)

    useEffect(() => {
        setLoaded(true);

        axios.post(
            `${server_hostname}/admin/api/view_phungbunshe`, '', { headers: { "token": token } } 
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
                    console.log(data.data)
                    setTableResult(data.data)
                    let dataArr = [];
                    for(let i=0; i<data.data.length; i++) {
                        // console.log(data.data[i].ApplicantID)
                        dataArr.push({
                            PBID: data.data[i].PBID,
                            BusinessProject: data.data[i].BusinessProject,
                            ControlCode: data.data[i].ControlCode1+' '+data.data[i].ControlCode2+' '+data.data[i].ControlCode3+' '+data.data[i].ControlCode4+' '+data.data[i].ControlCode5+' '+data.data[i].ControlCode6, // +' '+data.data[i].ControlCode7,
                            AccountCode: data.data[i].AccountCode1+' '+data.data[i].AccountCode2+' '+data.data[i].AccountCode3+' '+data.data[i].AccountCode4+' '+data.data[i].AccountCode5+' '+data.data[i].AccountCode6,
                            AccountName: !!data.data[i].AccountName1?data.data[i].AccountName1 : !!data.data[i].AccountName2?data.data[i].AccountName2 : !!data.data[i].AccountName3?data.data[i].AccountName3: !!data.data[i].AccountName4?data.data[i].AccountName4 : !!data.data[i].AccountName5?data.data[i].AccountName5 : !!data.data[i].AccountName6?data.data[i].AccountName6 : '', // !!data.data[i].AccountName7?data.data[i].AccountName7 : '',
                            // AccountName: !!data.data[i].AccountName1?data.data[i].AccountName1 : !!data.data[i].AccountName2?'- '+data.data[i].AccountName2 : !!data.data[i].AccountName3?' -- '+data.data[i].AccountName3: !!data.data[i].AccountName4?' --- '+data.data[i].AccountName4 : !!data.data[i].AccountName5?' ---- '+data.data[i].AccountName5 : !!data.data[i].AccountName6?' ----- '+data.data[i].AccountName6 : !!data.data[i].AccountName7?' ------ '+data.data[i].AccountName7 : '',
                            AccountType: data.data[i].AccountType,
                            PrintStatement: data.data[i].PrintStatement,
                            Explain: data.data[i].Explain,
                        })
                    }
                    setRows(dataArr)
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });

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



    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const handleSearch = () => {
        setLoaded(true);

        axios.post(
            `${server_hostname}/admin/api/search_phungbunshe`, {
                "ControlCode": inputDataSearch.ControlCode,
                "AccountCode": inputDataSearch.AccountCode,
                "AccountName": inputDataSearch.AccountName
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
                    console.log(data.data)
                    setTableResult(data.data)
                    let dataArr = [];
                    for(let i=0; i<data.data.length; i++) {
                        // console.log(data.data[i].ApplicantID)
                        dataArr.push({
                            PBID: data.data[i].PBID,
                            BusinessProject: data.data[i].BusinessProject,
                            ControlCode: data.data[i].ControlCode1+' '+data.data[i].ControlCode2+' '+data.data[i].ControlCode3+' '+data.data[i].ControlCode4+' '+data.data[i].ControlCode5+' '+data.data[i].ControlCode6, // +' '+data.data[i].ControlCode7,
                            AccountCode: data.data[i].AccountCode1+' '+data.data[i].AccountCode2+' '+data.data[i].AccountCode3+' '+data.data[i].AccountCode4+' '+data.data[i].AccountCode5+' '+data.data[i].AccountCode6,
                            AccountName: !!data.data[i].AccountName1?data.data[i].AccountName1 : !!data.data[i].AccountName2?data.data[i].AccountName2 : !!data.data[i].AccountName3?data.data[i].AccountName3: !!data.data[i].AccountName4?data.data[i].AccountName4 : !!data.data[i].AccountName5?data.data[i].AccountName5 : !!data.data[i].AccountName6?data.data[i].AccountName6 : '', // !!data.data[i].AccountName7?data.data[i].AccountName7 : '',
                            // AccountName: !!data.data[i].AccountName1?data.data[i].AccountName1 : !!data.data[i].AccountName2?'- '+data.data[i].AccountName2 : !!data.data[i].AccountName3?' -- '+data.data[i].AccountName3: !!data.data[i].AccountName4?' --- '+data.data[i].AccountName4 : !!data.data[i].AccountName5?' ---- '+data.data[i].AccountName5 : !!data.data[i].AccountName6?' ----- '+data.data[i].AccountName6 : !!data.data[i].AccountName7?' ------ '+data.data[i].AccountName7 : '',
                            AccountType: data.data[i].AccountType,
                            PrintStatement: data.data[i].PrintStatement,
                            Explain: data.data[i].Explain,
                        })
                    }
                    setRows(dataArr)
                }
            }
        ).catch(err => { console.log(err); history.push('/') })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleInputDataSubmit = (event) => {
        setInputDataSubmit({
            ...inputDataSubmit,
            [event.target.name]: event.target.value
        })
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
        setSuccess(false)
        setErr(false)
        setDel(false)
        window.location.reload();
    };

    const handleCancel = () => {
        setOpenPopup(false);
        setSuccess(false)
        setDel(false)
        setErr(false)
    };


    const editRow = (id) => {
        setEditStatus(true)

        tableResult.filter((result)=>result.PBID === id).map((item)=>
            // console.log(item)

            setInputDataSubmit({
                ...inputDataSubmit,
                PBID: item.PBID,
                BusinessProject: item.BusinessProject,
        
                ControlCode1: item.ControlCode1,
                ControlCode2: item.ControlCode2,
                ControlCode3: item.ControlCode3,
                ControlCode4: item.ControlCode4,
                ControlCode5: item.ControlCode5,
                ControlCode6: item.ControlCode6,
                // ControlCode7: item.ControlCode7,
        
                AccountCode1: item.AccountCode1,
                AccountCode2: item.AccountCode2,
                AccountCode3: item.AccountCode3,
                AccountCode4: item.AccountCode4,
                AccountCode5: item.AccountCode5,
                AccountCode6: item.AccountCode6,
        
                AccountName1: item.AccountName1,
                AccountName2: item.AccountName2,
                AccountName3: item.AccountName3,
                AccountName4: item.AccountName4,
                AccountName5: item.AccountName5,
                AccountName6: item.AccountName6,
                // AccountName7: item.AccountName7,
        
                AccountType: item.AccountType,
                PrintStatement: item.PrintStatement,
                Explain: item.Explain

            })
        )

        setOpenPopup(true)

        // fetchData('edit',null)
    }

    const deleteRow = (id) => {
        setInputDataSubmit({
            inputDataSubmit,
            PBID: id
        })
        setDel(true)
    }

    const handleSubmit = (event,status) => {
        event.preventDefault();
        fetchData(status,null)
        console.log(inputDataSubmit)
    }

    const fetchData = (status, id) => {
        let formData = inputDataSubmit
        if(status ==='delete') {
            formData = { PBID: id }
        }
        axios.post(
            `${server_hostname}/admin/api/${status}_phungbunshe`, formData, { headers: { "token": token } } 
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
                    if(status === 'delete') {
                        setDel(false)
                        window.location.reload()
                    } else {
                        setSuccess(true)
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
                                <h1>ผังบัญชีมาตรฐาน</h1>
                            </Grid>
                            {/* <Grid item xs={12} md={12} className="mg-t-0 txt-right dsp-f jc-flex-end" >
                                <div className="mg-l-10"><ButtonNormalIconStartPrimary label="เพิ่มผู้ใช้งาน" startIcon={<AddIcon />} onClick={()=>gotoAddUser()}/></div>
                            </Grid> */}
                             <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="รหัสคุม" name="ControlCode" value={inputDataSearch.ControlCode} onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="รหัสบัญชี" name="AccountCode" value={inputDataSearch.AccountCode} onChange={handleInputDataSearch} />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อบัญชี" name="AccountName" value={inputDataSearch.AccountName} onChange={handleInputDataSearch}  />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={handleSearch} /> 
                                    </Grid>
                                    <Grid item xs={12} md={3} className="txt-right">
                                        <p>&nbsp;</p>
                                        <ButtonNormalIconStartPrimary label="เพิ่มผังบัญชี" startIcon={<AddIcon />} onClick={()=>{setOpenPopup(true); setEditStatus(false);}} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-b--10"> 
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
                                        hasAction={true} 
                                        actionEdit={true}
                                        editEvent={editRow}
                                        editParam={'PBID'}
                                        actionDelete={true}
                                        deleteEvent={deleteRow}
                                        deleteParam={'PBID'}

                                        rowsPerPageOptionsValue={[5,10,25,50,100,250, {label: 'ทั้งหมด', value: -1}]}
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

            <Dialog
                open={openPopup}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
                fullWidth={true}
            >
                <DialogContent>
                        <form  onSubmit={handleSubmit}>
                    <div id="alert-dialog-description">

                        <Grid item xs={12} md={12} className="title-page txt-center mg-b-20"> 
                            <h1 style={{fontWeight: 'normal'}}>เพิ่มผังบัญชี</h1>
                        </Grid>
                        <Container maxWidth="md">
                            <Grid container spacing={2} className="btn-row">
                                {/* Button Row -------------------------------------------------- */}
                                {/* BusinessProject, ControlCode,AccountCode,AccountName,AccountType,PrintStatement,Explain */}
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ธุรกิจ/โครงการ" defaultValue="" name="BusinessProject" value={inputDataSubmit.BusinessProject} onChange={handleInputDataSubmit} />      
                                </Grid>

                                <Grid item xs={12} md={1}>
                                    <p>รหัสคุม</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode1" value={inputDataSubmit.ControlCode1} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode2" value={inputDataSubmit.ControlCode2} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode3" value={inputDataSubmit.ControlCode3} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode4" value={inputDataSubmit.ControlCode4} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode5" value={inputDataSubmit.ControlCode5} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode6" value={inputDataSubmit.ControlCode6} onChange={handleInputDataSubmit} />      
                                </Grid>
                                {/* <Grid item xs={12} md={1}>
                                    <p>&nbsp;</p>
                                    <MuiTextfieldNumberInt label="" defaultValue="" name="ControlCode7" value={inputDataSubmit.ControlCode7} onChange={handleInputDataSubmit} />      
                                </Grid> */}

                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี1" defaultValue="" name="AccountName1" value={inputDataSubmit.AccountName1} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี2" defaultValue="" name="AccountName2" value={inputDataSubmit.AccountName2} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี3" defaultValue="" name="AccountName3" value={inputDataSubmit.AccountName3} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี4" defaultValue="" name="AccountName4" value={inputDataSubmit.AccountName4} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี5" defaultValue="" name="AccountName5" value={inputDataSubmit.AccountName5} onChange={handleInputDataSubmit} />      
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี6" defaultValue="" name="AccountName6" value={inputDataSubmit.AccountName6} onChange={handleInputDataSubmit} />      
                                </Grid>
                                {/* <Grid item xs={12} md={4}>
                                    <MuiTextfield label="ชื่อบัญชี7" defaultValue="" name="AccountName7" value={inputDataSubmit.AccountName7} onChange={handleInputDataSubmit} />      
                                </Grid> */}

                                <Grid item xs={12} md={3}>
                                    <MuiLabelHeaderCheckbox label="ประเภทบัญชี" />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <MuiTextfield label="" defaultValue="" name="AccountType" value={inputDataSubmit.AccountType} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <MuiLabelHeaderCheckbox label="เลขบัญชี" />
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode1" value={inputDataSubmit.AccountCode1} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode2" value={inputDataSubmit.AccountCode2} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode3" value={inputDataSubmit.AccountCode3} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode4" value={inputDataSubmit.AccountCode4} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode5" value={inputDataSubmit.AccountCode5} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfieldNumberInt label="" defaultValue="" name="AccountCode6" value={inputDataSubmit.AccountCode6} onChange={handleInputDataSubmit} />      
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={3}>
                                    <MuiTextfield label="พิมพ์ออกงบ" defaultValue="" name="PrintStatement" value={inputDataSubmit.PrintStatement} onChange={handleInputDataSubmit} />      
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <MuiTextfieldMultiLine row="3" label="คำอธิบาย" defaultValue="" name="Explain" value={inputDataSubmit.Explain} onChange={handleInputDataSubmit} />      
                                </Grid>

                            </Grid>
                        </Container>
                        <Container maxWidth="xs" className="mg-t-35">
                            <Grid container spacing={2} className="btn-row">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={handleCancel}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {
                                        editStatus ?
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={(e)=>handleSubmit(e,'edit')}/>
                                        :
                                        <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={(e)=>handleSubmit(e,'add')}/>
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                        </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={err || success || del}
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
                        : del ?
                        <div className="dialog-success">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{delMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleCancel} color="secondary" style={{justifyContent: 'center'}} />
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={()=>fetchData('delete',inputDataSubmit.PBID)} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        : err ?
                        <div className="dialog-error">
                            <span className="txt-center txt-black" style={{display: 'block'}}>{errMsg}</span>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </div>
                        : null
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default ChartOfAccounts
