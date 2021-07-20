import React, { useEffect, useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';
import moment from 'moment';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield, 
    MuiCheckbox, 
    MuiSelect, 
    MuiSelectObj,
    MuiDatePicker, 
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary,
    ButtonOutlineIconStartGrey,
} from '../../components/MUIinputs';

const data = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '3',
        name: 'Child - 3',
        children: [
          {
            id: '4',
            name: 'Child - 4',
          },
        ],
      },
    ],
  };

function AddUser(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        nROLEID: 0, // 1,   
        FrontName: 'นาย', // "นาย",
        Name: '', // "abc",
        Sirname: '', // "def",    
        cUsername: '', // "yyy",
        cPasswd: '', // "1234",
        bActive: 1, // 0,
        bIndividual: '', // 0,
        ProvinceID: 0, // 10
        ExpireDate: null,
    })

    const [roleList, setRoleList] = useState([])
    const [provinceList, setProvinceList] = useState([])

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);

    useEffect(() => {
        setLoaded(true);
        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceList(dataProvinceList);

        axios.post(
            `${server_hostname}/admin/api/get_admin_role`, '', { headers: { "token": token } } 
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
                    setRoleList(data.data)
                    
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

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      );



    const handleInputData = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        let addUserForm = document.getElementById('addUserForm');
        let formData = new FormData(addUserForm);
        formData.append('ExpireDate', moment(inputData.ExpireDate).format('YYYY-MM-DD'))

        axios.post(
            `${server_hostname}/admin/api/add_member`, formData, { headers: { "token": token } } 
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
                }else {
                    // history.push('/manageinfo/searchmember')
                    setSuccess(true);
                    setSuccessMsg('บันทึกข้อมูลเรียบร้อย')
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
      };

    const postData = () => {
        console.log(inputData)
        history.push('/manageinfo/manageuser');
    }

    const cancelData = () => {
        history.push('/manageinfo/manageuser');
    }

    const gotoManageUser = () => {
        history.push('/manageinfo/manageuser');
    }

    const handleGotoSearch = () => {
        setSuccess(false);
        history.push('/manageinfo/manageuser');

    };

    const handleClosePopup = () => {
        setErr(false);
    };

    return (
        <div className="adduser-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <div style={{position: 'absolute'}}>
                                    <ButtonOutlineIconStartGrey label="ย้อนกลับ" startIcon={<ArrowBackIcon/>} onClick={()=>gotoManageUser()} />
                                </div>
                                <h1>เพิ่มผู้ใช้งาน</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <form className="root" id="addUserForm" noValidate autoComplete="off">
                            <Grid container spacing={2}>

                                {/* Paper 1 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={3}>
                                                    <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ชื่อ" defaultValue="" name="Name" value={inputData.Name} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname" value={inputData.Sirname} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="UserName" defaultValue="" name="cUsername" value={inputData.cUsername} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="Password" defaultValue="" name="cPasswd" value={inputData.cPasswd} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiSelect label="ActiveStatus" listsValue={['1','0']} lists={['Active', 'Non Active']} name="bActive" value={inputData.bActive} onChange={handleInputData}  />
                                               </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiDatePicker label="ExpireDate" name="ExpireDate" value={inputData.ExpireDate} onChange={(newValue)=>{ setInputData({ ...inputData, ExpireDate: moment(newValue).format('YYYY-MM-DD')}) }}  />

                                                </Grid>
                                                {/* <Grid item xs={12} md={12}>
                                                
                                                     <TreeView
                                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                                        defaultExpandIcon={<ChevronRightIcon />}
                                                        multiSelect
                                                        className="treeview"
                                                        defaultExpanded={['1','4','6']}
                                                    >
                                                        <TreeItem nodeId="1" label={<MuiCheckbox label="Administrator" />} className="container">
                                                            <TreeItem nodeId="2" label={<MuiCheckbox label="คณะกรรมการปฏิรูปที่ดินจังหวัด (คปจ.) " />} />
                                                            <TreeItem nodeId="3" label={<MuiCheckbox label="คณะอนุกรรมการ " />}  />
                                                            <TreeItem nodeId="4" label={<MuiCheckbox label="คณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรม(คปก.)" /> } className="container">
                                                                <TreeItem nodeId="5" label={<MuiCheckbox label="ผู้อำนวยการ " />} />
                                                                <TreeItem nodeId="6" label={<MuiCheckbox label="หัวหน้าส่วน " />} className="container">
                                                                    <TreeItem nodeId="7" label={<MuiCheckbox label="กลุ่มยุทธศาสตร์ " />} />
                                                                    <TreeItem nodeId="8" label={<MuiCheckbox label="ฝ่ายการเงิน " />} />
                                                                    <TreeItem nodeId="9" label={<MuiCheckbox label="ฝ่ายบัญชี " />} />
                                                                </TreeItem>
                                                            </TreeItem>
                                                        </TreeItem>
                                                    </TreeView> 
                                                </Grid> */}
                                            </Grid>
                                    </Paper>
                                </Grid>

                                 {/* Paper 2 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">UserRole</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiSelectObj label="" itemName={'nRolename'} itemValue={'nROLEID'} lists={roleList} name="nROLEID" value={inputData.nROLEID} onChange={handleInputData} />
                                            
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                 {/* Paper 3 -------------------------------------------------- */}
                                 <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <h1 className="paper-head-green">พื้นที่</h1>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiSelectObj label="" itemName={'PV_NAME'} itemValue={'ProvinceID'} lists={provinceList} name="ProvinceID" value={inputData.ProvinceID} onChange={handleInputData} />
                                            
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            
                            </Grid>

                            <Grid container spacing={2} className="btn-row">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit}/>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
            </Fade>

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
                            <p className="txt-center txt-black">{successMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                        <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        :
                        <div className="dialog-error">
                            <p className="txt-center txt-black">{errMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
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

export default AddUser;
