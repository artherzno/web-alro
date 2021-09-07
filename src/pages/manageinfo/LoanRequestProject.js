import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

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
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiSelect, 
    MuiSelectObj,
    MuiTextfield,
    MuiSelectProvince,
    MuiSelectObjYear,
    MuiSelectObjYearStart,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonFluidPrimary,
    ButtonNormalIconStartGrey,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const rows = [
    { 
        id: 1, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 2, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 3, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 4, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 5, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: '',
    },
];

// End All Data for DataGrid ---------------------------------------------//

function LoanRequestProject() {
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
    const [inputData, setInputData] = useState({
        ProjectMainID: '',
        ProjectMainCode: '',
        ProjectMainName: '',
        ProjectMain_Status: '',
        ProjectPlanYear: '0',
        ProvinceID: '0',
    })

    const [provinceSearch, setProvinceSearch] = useState('0');
    const [provinceList, setProvinceList] = useState(['กรุณาเลือกจังหวัด']);
    const [roleID, setRoleID] = useState(localStorage.getItem('nROLEID'))

    const [tableResult, setTableResult] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [downloadAction, setDownloadAction] = useState(false)


    useEffect(() => {
        setLoaded(true);
        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceList(dataProvinceList)
        console.log(localStorage.getItem('nROLEID'))

        const getSpkAllProject = () => {
            axios.post(
                `${server_hostname}/admin/api/search_spkproject`, '', { headers: { "token": token } } 
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
                        setTableResult(data.data)
                    }
                }
            ).catch(err => { console.log(err); history.push('/') })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

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
        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }
    }, [])

    const handleInputDataProvince = (event) => {
        // console.log('provinceSearch',event.target.value)
        setProvinceSearch(event.target.value)
    }

    // Input Text field  ********************************
    const handleInputData = (event) => {
        console.log('event.target.name',event.target.name)
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else {
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
        }
        console.log(event)
    }

    // Submit Data
    const handleSubmit = async (event) => {
        event.preventDefault();
console.log('submit')
        let searchProject = document.getElementById('searchProject');
        let formData = new FormData(searchProject);

        axios.post(
            `${server_hostname}/admin/api/search_spkproject`, formData, { headers: { "token": token } } 
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
                    if(!data.data.length) {
                        setTableResult([])
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                        setDownloadAction(false)

                    } else {
                        setTableResult(data.data)
                        setDownloadAction(true)

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

    const handleChangePage = (event, newPage) => {
        console.log('newPage', newPage)
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handlePrintPDF = () => {
        console.log('ProjectPlanYear', inputData.ProjectPlanYear)
        console.log('ProjectPlanYear', (inputData.ProjectPlanYear + 2500) - 543)
        console.log('ProvinceID', inputData.ProvinceID)
        // let ProjectPlanYearValue = inputData.ProjectPlanYear === '0' ? null : (inputData.ProjectPlanYear + 2500) - 543;
        let ProjectPlanYearValue = inputData.ProjectPlanYear;
        let ProvinceIDValue;

        if(roleID === '8' || roleID === '9') {
            // localStorage.getItem('provinceid')
            ProvinceIDValue = inputData.ProvinceID === '0' ? null : inputData.ProvinceID;
        } else {
            ProvinceIDValue = parseInt(localStorage.getItem('provinceid'));
        }

        axios({
        url: `${siteprint}/api/ExportServices/ExportLoanProject`, //your url
        method: 'POST',
        data: {
            ProjectPlanYear: ProjectPlanYearValue.toString() ,
            ProvinceID: ProvinceIDValue.toString(),
        },
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `โครงการขอกู้เงินปี25${ProjectPlanYearValue.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
        
    }

    const handlePrintExcel = () => {
        console.log('ProjectPlanYear', inputData.ProjectPlanYear)
        console.log('ProjectPlanYear', (inputData.ProjectPlanYear + 2500) - 543)
        console.log('ProvinceID', inputData.ProvinceID)
        // let ProjectPlanYearValue = inputData.ProjectPlanYear === '0' ? null : (inputData.ProjectPlanYear + 2500) - 543;
        let ProjectPlanYearValue = inputData.ProjectPlanYear;
        let ProvinceIDValue;

        if(roleID === '8' || roleID === '9') {
            // localStorage.getItem('provinceid')
            ProvinceIDValue = inputData.ProvinceID === '0' ? null : inputData.ProvinceID;
        } else {
            ProvinceIDValue = parseInt(localStorage.getItem('provinceid'));
        }
        
        
        const formdata = new FormData()
        formdata.append('ProjectPlanYear', ProjectPlanYearValue.toString());
        formdata.append('ProvinceID', ProvinceIDValue.toString());
        let url = `${siteprint}/api/ExportServices/ExportLoanProject`; //your url

        axios.post(url, formdata,
            {
                headers:
                {
                    'Content-Disposition': "attachment; filename=template.xlsx",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `โครงการขอกู้เงิน_${ProjectPlanYearValue.toString()}.xlsx`);
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้');  })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const gotoAddLoanRequestProject = () => {
        history.push('/manageinfo/loanaddproject');
    }

    const gotoEditLoanRequestProject = (projectID) => {
        history.push({
            pathname: '/manageinfo/loaneditproject',
            state: { 
                ProjectID: projectID,
            }
        });
    }

    const gotoViewLoanRequestProject = (projectID) => {
        history.push({
            pathname: '/manageinfo/loanviewproject',
            state: { 
                ProjectID: projectID,
            }
        });
    };

    const handleClosePopup = () => {
        setErr(false);
    };
    
    return (
        <div className="loanrequestproject-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">

                <form id="searchProject" className="root" noValidate autoComplete="off">
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>โครงการขอกู้เงิน</h1>
                            </Grid>

                                <Grid item xs={12} md={2}>
                                    <Box className="dropdown-projectplanyear" display="flex" justifyContent="flex-start">
                                        <MuiSelectObjYearStart label="ปีงบประมาณ" valueStartYaer={2500} name="ProjectPlanYear" value={inputData.ProjectPlanYear} onChange={handleInputData} />
                                    </Box>  
                                </Grid>
                                {
                                    roleID === '8' || roleID === '9' ?  <Grid item xs={12} md={2}> <MuiSelectProvince label="จังหวัด" lists={provinceList} startText="ทุกจังหวัด" value={inputData.ProvinceID} name="ProvinceID" onChange={handleInputData}/></Grid> : ''
                                }
                               
                                <Grid item xs={12} md={2}>
                                    <p>&nbsp;</p>
                                    <ButtonFluidPrimary label="ค้นหา" onClick={handleSubmit} />
                                </Grid>
                                {
                                    roleID === '8' || roleID === '9' ?  '' : <Grid item xs={12} md={2}></Grid>
                                }

                            <Grid item xs={12} md={6}>
                                    <p>&nbsp;</p>
                                <Box  display="flex" justifyContent="flex-end">
                                    {/* <ButtonNormalIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />} onClick={handlePrintPDF}/> 
                                    &nbsp;&nbsp;&nbsp;&nbsp; */}
                                    {
                                        downloadAction ? 
                                        <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>}  onClick={handlePrintExcel} />
                                        : 
                                        <div style={{opacity: '.75', pointerEvents: 'none'}}>
                                        <ButtonNormalIconStartGrey label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>}/>
                                        </div>
                                        
                                    }&nbsp;&nbsp;&nbsp;&nbsp;
                                    <ButtonNormalIconStartPrimary label="เพิ่มโครงการ" startIcon={<AddIcon />} onClick={()=>gotoAddLoanRequestProject()} />
                                </Box>  
                            </Grid>

                            <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                <h2>ผลการค้นหา {(tableResult.length).toLocaleString('en-US') || 0} รายการ</h2>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box mg-t-10">
                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell align="left" className="tb-w-8em">รหัสโครงการ</TableCell>
                                            <TableCell align="left" className="tb-w-8em">แผนปี</TableCell>
                                            <TableCell align="left" className="tb-w-14em">ชื่อโครงการ</TableCell>
                                            <TableCell align="left" className="tb-w-12em">จังหวัด</TableCell>
                                            <TableCell align="left" className="tb-w-12em">รหัสโครงการหลัก</TableCell>
                                            <TableCell align="left" className="tb-w-12em">ชื่อโครงการหลัก</TableCell>
                                            <TableCell align="left" className="tb-w-12em">รหัสโครงการรอง</TableCell>
                                            <TableCell align="left" className="tb-w-12em">ชื่อโครงการรอง</TableCell>
                                            <TableCell align="left" className="tb-w-12em">ประเภทกู้ยืม</TableCell>
                                            <TableCell align="left" className="tb-w-12em">ระยะเวลากู้ยืม</TableCell>
                                            <TableCell align="left" className="tb-w-12em">วัตถุประสงค์การกู้ยืม</TableCell>
                                            <TableCell align="left" className="tb-w-12em">ประเภทผู้กู้</TableCell>
                                            <TableCell align="left" className="sticky tb-w-24em">&nbsp;</TableCell>
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
                                                            <TableCell align="left" className="tb-w-8em">{cell.ProjectCode}</TableCell>
                                                            <TableCell align="left" className="tb-w-8em">{cell.ProjectPlanYear}</TableCell>
                                                            <TableCell align="left" className="tb-w-14em">{cell.ProjectName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.ProvinceName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.ProjectMainCode}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.ProjectMainName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.ProjectSubCode}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.ProjectSubName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.LoanTypeName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.LoanPeriodName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.LoanObjName}</TableCell>
                                                            <TableCell align="left" className="tb-w-12em">{cell.LoanFarmerTypeName}</TableCell>
                                                            <TableCell align="left" className="sticky tb-w-14em">
                                                            {
                                                                roleID === '8' || roleID === '9' ?  <ButtonNormalIconStartPrimary label="แก้ไข" startIcon={<EditOutlinedIcon />} onClick={()=>gotoEditLoanRequestProject(cell.ProjectID)}/>
                                                                : ''
                                                            }
                                                                <ButtonNormalIconStartPrimary label="รายละเอียด"  onClick={()=>gotoViewLoanRequestProject(cell.ProjectID)}/>
                                                            </TableCell>
                                                    </TableRow>
                                                    
                                                ))
                                                : 
                                                <TableRow>
                                                    <TableCell colSpan={12} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                    {
                                        tableResult.length ? 
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
                                        : 
                                        ''
                                    }
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>

                    </form>
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
                    
                    <DialogContentText className="dialog-error">
                        <p className="txt-center txt-black">{errMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </DialogContentText>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </div>
    )
}

export default LoanRequestProject
