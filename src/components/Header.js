import React, { useContext, useState, createContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiLogout} from '@mdi/js'
import { mdiLockReset } from '@mdi/js';

import LogoImg from '../assets/logo-alro.png';
import { AuthContext } from '../App';
import moment from 'moment'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const dataUserContext = createContext();

function Header(props) {
    const auth = useContext(AuthContext)
    const history = useHistory();
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let username = localStorage.getItem('username');
    let provincename = localStorage.getItem('provincename');
    let token = localStorage.getItem('token');


    const { bgColor, status } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(".");
    const [realDate, setRealDate] = useState('')
    const [realDay, setRealDay] = useState('')
    const [realMonth, setRealMonth] = useState('')
    const [realYear, setRealYear] = useState('')
    const [realTime, setRealTime] = useState('')
    const [provinceCheck, setProvinceCheck] = useState(localStorage.getItem('provinceid'));

    // const [setupDialog, setSetupDialog] = useState(false)
    const [setupDialog, setSetupDialog] = useState(false);

    const timer = () => {
        setRealDate(moment().format('Do MMMM YYYY'))
        setRealDay(moment().format('Do'))
        setRealMonth(moment().format('MMMM'))
        setRealYear(moment().format('YYYY'))
        setRealTime(moment().format('HH:mm'))
    }

    const [resetPasswordData, setResetPasswordData] = useState({
        old_password: '',
        new_password: '',
        retype_password: ''
    })
    const[resetEmailMsg, setResetEmailMsg] = useState('')

    // setInterval(() => {
    //     timer()
    // }, 1000);

    useEffect(() => {
        // let getDateTime = setInterval(() => {
        //     timer()
        // }, 1000);
        // console.log('provinceID',localStorage.getItem('provinceid'))
        // console.log('RoleID',localStorage.getItem('nROLEID'))
        const intervalId = setInterval(() => {

            timer()
            setLoadingStatus(ls => ls + ".");
          }, 1000);
      
          return () => clearInterval(intervalId);
    }, [])
    
    const goto = () => {
        history.push('/home');
    }

    const logout = async () => {
        const res = await fetch(`${server_hostname}/admin/api/logout`, {
            method: 'POST',})
        history.push('/');

        res
        .json()
        .then(res => {
          if (res.code === 0 || res === null || res === undefined ) {
            setIsLoaded(true);
            setErr(true);
            setErrMsg(res.message)
          } else {

              setIsLoaded(true);
            //   console.log(res)
              history.push('/');
              // setDataCampaign(data); // from local
          }

        })
        .catch(err => {
        //   console.log(err);
          setIsLoaded(true);
          setErr(true);
          history.push('/');
        });
    }

    const handleOpenDialog = () => {
        setSetupDialog(true)
    }

    const handleCloseDialog = () => {
        setSetupDialog(false)
        setResetPasswordData({
            old_password: '',
            new_password: '',
            retype_password: ''
        })
        setResetEmailMsg('')
    }

    const handleSubmitChangePassword = () => {
        console.log(resetPasswordData)
        axios.post(
            `${server_hostname}/admin/api/setup_password `, 
            resetPasswordData, 
            { headers: { "token": token } } 
        ).then(res => {
                console.log('forget_password',res)
                let data = res.data;
                if(data.code === 0) {
                    // setErr(true);
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            setResetEmailMsg('ไม่สามารถทำรายการได้')
                        } else {
                            setResetEmailMsg([data.message])
                        }
                    } else {
                        setResetEmailMsg(['ไม่สามารถทำรายการได้'])
                    }
                    setResetEmailMsg(data.message)
                } else {
                    console.log('forget_password result',data.message)
                    setResetEmailMsg(data.message)
                    
                }
                setIsLoading(false)
                // getSpkAllProject()
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleChangePassword = (e) => {
        setResetPasswordData({
            ...resetPasswordData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={`header ${bgColor} ${status}`}>
            <div className="logo" onClick={()=>goto()}>
                <img src={LogoImg} alt="สำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม" />
                <p>
                    ระบบสินเชื่อกองทุนการปฏิรูปที่ดินเพื่อเกษตรกรรม<br/>
                    <span>สำนักบริหารกองทุน สำนักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม</span>
                </p>    
            </div>

            { status === 'logged' ? 
                <div className="admin-info">
                    <p>
                        ยินดีต้อนรับ คุณ {username} <br/>
                        {
                            provinceCheck === 'null' ? 
                                <span>หน่วยงานส่วนกลาง วันที่ {realDay} {realMonth} {Number(realYear) + 543} เวลา {realTime} น.</span> 
                            :
                                <span>ส.ป.ก. จังหวัด{provincename} วันที่ {realDay} {realMonth} {Number(realYear) + 543} เวลา {realTime} น.</span>
                        }
                        
                    </p>
                    <Icon path={mdiLockReset}
                        title="Reset Password"
                        size={1}
                        color="#27ae60"
                        onClick={()=>handleOpenDialog()}
                        />
                    <Icon path={mdiLogout}
                        title="Log Out"
                        size={1}
                        color="#27ae60"
                        onClick={()=>logout()}
                        />
                </div> : ''}
            
            <Dialog
                open={setupDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle id="alert-dialog-title"><p>{"เปลี่ยนรหัสผ่าน"}</p></DialogTitle>
                <DialogContent>
                        <form onSubmit={handleSubmitChangePassword}>
                            <div className="form-input">
                                <label>รหัสผ่านเก่า</label>
                                <input autoFocus type="text" name="old_password" placeholder="" onChange={handleChangePassword} />
                            </div>
                            <div className="form-input">
                                <label>รหัสผ่านใหม่</label>
                                <input type="text" name="new_password" placeholder="" onChange={handleChangePassword} />
                            </div>
                            <div className="form-input">
                                <label>รหัสผ่านใหม่ (อีกครั้ง)</label>
                                <input type="text" name="retype_password" placeholder="" onChange={handleChangePassword} />
                            </div>
                            <p className="txt-red txt-center">{resetEmailMsg}</p>
                        </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        ยกเลิก
                    </Button>
                    <Button onClick={handleSubmitChangePassword} color="primary" autoFocus>
                        ยืนยัน
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export { dataUserContext }
export default Header;
