import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Header from '../components/Header';
import BgImg from '../assets/login-bg.png';
import { AuthContext } from '../App';

function LoginPage() {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const isMounted = useRef(null);

    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [forgotDialog, setForgotDialog] = useState(false);
    const [changeDialog, setChangeDialog] = useState(false);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    let provinceList = [];
    const fetchDataProvince = (token, provinceId) => {
        axios.post(
            `${server_hostname}/admin/api/get_provinces`, {
                "ProvinceID": "",
                "PV_NAME": ""
            }, { headers: { "token": token } } 
        ).then(res => {
                // console.log(res)
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
                    provinceList.push(data.data)
                    
                    for(let i=0; i<provinceList[0].length; i++) {
                        if(provinceList[0][i].ProvinceID === parseInt(provinceId)) {
                            localStorage.setItem('provincename',provinceList[0][i].PV_NAME)
                            // setProviceName(provinceList[0][i].PV_NAME);
                        }
                    }
                    
                    let provinceListJSONString = JSON.stringify(provinceList[0]);
                    localStorage.setItem('provincelist', provinceListJSONString)
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    let districtList = [];
    const fetchDataDistrict = (token) => {
        axios.post(
            `${server_hostname}/admin/api/get_districts`, {
                "ProvinceID": "",
                "DistrictID": "",
                "AM_NAME": ""
            }, { headers: { "token": token } } 
        ).then(res => {
                // console.log(res)
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
                    districtList.push(data.data)
                    // console.log(districtList)
                    let districtListJSONString = JSON.stringify(districtList[0]);
                    localStorage.setItem('districtlist', districtListJSONString)
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }


    let subDistrictList = [];
    const fetchDataSubDistrict = (token) => {
        axios.post(
            `${server_hostname}/admin/api/get_subdistricts`, {
                "ProvinceID": "",
                "DistrictID": "",
                "SubdistrictID": "",
                "TB_NAME": ""
            }, { headers: { "token": token } } 
        ).then(res => {
                // console.log(res)
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
                    subDistrictList.push(data.data)
                    // console.log(subDistrictList)
                    let subDistrictListJSONString = JSON.stringify(subDistrictList[0]);
                    localStorage.setItem('subdistrictlist', subDistrictListJSONString)
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    let docLandTypeList = [];
    const fetchDataDocLandType = (token) => {
        axios.post(
            `${server_hostname}/admin/api/get_doclandtype`, {
                "DocLand_code": "",
                "DocLand_name": ""
            }, { headers: { "token": token } } 
        ).then(res => {
                // console.log(res)
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
                    docLandTypeList.push(data.data)
                    
                    // console.log('DOC_LAND_TYPE', data.data)
                    let docLandTypeListJSONString = JSON.stringify(data.data);
                    localStorage.setItem('doclandtypelist', docLandTypeListJSONString)
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    useEffect(() => {
        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }
    }, [])

    async function fetchDataLogin() {
        const res = await fetch(`${server_hostname}/admin/api/login`, {
            method: 'POST',
            body: JSON.stringify(dataLogin),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'same-origin'
        }); 

        // const res = await fetch(`http://127.0.0.1:3800/spk/api/healthcheck`, {
        //     method: 'GET',})
  
        res
        .json()
        .then(res => {
        if (res.code === 0 || res === null || res === undefined ) {
            setIsLoaded(true);
            setErr(true);
                if(Object.keys(res.message).length !== 0) {
                    setErrMsg([res.message])
                } else {
                    setErrMsg(['Incorrect Username and/or Password!'])
                }
        } else {
            console.log('login:',res);
            setIsLoaded(true);
            localStorage.setItem('token',res.token)
            localStorage.setItem('username',((res.recordset[0].Name === null) ? '' : res.recordset[0].Name)+' '+((res.recordset[0].Sirname === null) ? '' : res.recordset[0].Sirname))
            localStorage.setItem('provinceid',res.recordset.ProvinceID)

            fetchDataDocLandType(res.token);
            fetchDataProvince(res.token, res.recordset[0].ProvinceID)
            fetchDataDistrict(res.token)
            fetchDataSubDistrict(res.token)
            history.push('/home');

        }

        })
        .catch(err => {
            console.log(err);
            setIsLoaded(true);
            setErr(true);
            history.push('/');
        });
    }

    const handleClose = () => {
        setErr(false);
    };

    const handleCloseDialog = () => {
        setForgotDialog(false);
        setChangeDialog(false);
    };

    const handleChange = event => {
        setDataLogin({
            ...dataLogin,
            [event.target.name]: event.target.value
        });
    }


    const handleSubmit = event => {
        event.preventDefault();
        fetchDataLogin();
    }

    return (
        <div className="login-page" style={{backgroundImage: `url(${BgImg})`, backgroundSize: 'cover'}}>
            <Header bgColor="bg-green" status="login" />
            
            <div className="card">
                <p className="font-18">เข้าสู่ระบบสินเชื่อกองทุนการปฏิรูปที่ดินเพื่อเกษตรกรรม </p>
                <form  onSubmit={handleSubmit}>
                    <div className="form-input">
                        <label>Username</label>
                        <input autoFocus type="text" name="username" value={dataLogin.username} placeholder="" onChange={handleChange} onFocus={()=> setErr(false)} />
                    </div>
                    <div className="form-input">
                        <label>Password</label>
                        <input type="password" name="password" value={dataLogin.password} placeholder="" onChange={handleChange}  onFocus={()=> setErr(false)} />
                    </div>
                    <button className="btn btn-blue">เข้าสู่ระบบ</button>
                    <p className="err font-14">
                        { err ? <span >{errMsg}</span> : ''}
                    </p>
                    <div className="login-option">
                        <div className="login-forgot-pwd">
                            <p onClick={()=>setChangeDialog(true)}>เปลี่ยนรหัสผ่าน</p>
                        </div>
                        <div className="login-change-pwd">
                            <p onClick={()=>setForgotDialog(true)}>ลืมรหัสผ่าน</p>
                        </div>
                    </div>
                </form>
            </div>

            <Dialog
                open={forgotDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title"><p>{"กรุณากรอกอีเมลเพื่อรับรหัสผ่านใหม่"}</p></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                    <form  onSubmit={handleSubmit}>
                        <div className="form-input">
                            <input autoFocus type="text" name="changeemail" placeholder="" />
                        </div>
                   </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        ส่งอีเมล
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={changeDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title"><p>{"ลืมรหัสผ่าน"}</p></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    <form  onSubmit={handleSubmit}>
                        <div className="form-input">
                            <label>รหัสผ่านเก่า</label>
                            <input autoFocus type="text" name="oldpassword" placeholder="" onChange={handleChange}  />
                        </div>
                        <div className="form-input">
                            <label>รหัสผ่านใหม่</label>
                            <input type="text" name="newpassowd" placeholder="" onChange={handleChange}/>
                        </div>
                    </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LoginPage;
