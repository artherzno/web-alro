import React, { useState, useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    async function fetchDataLogin() {
        const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/login`, {
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
        //   history.push('/error');
            setErrMsg(res.message)
        } else {

            setIsLoaded(true);
            console.log(document.cookie)
            history.push('/home');
            // setDataCampaign(data); // from local
        }

        })
        .catch(err => {
            console.log(err);
            setIsLoaded(true);
            setErr(true);
        });
    }

    const handleClose = () => {
        setErr(false);
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
        <div className="login-page" style={{backgroundImage: `url(${BgImg})`, backgroundSize: 'cover'}}>
            <Header bgColor="bg-green" status="login" />
            
            <div className="card">
                <p className="font-18">เข้าสู่ระบบสินเชื่อกองทุนการปฏิรูปที่ดินเพื่อเกษตรกรรม {auth.username}</p>
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
                    { err ? <p className="err font-14">{errMsg}</p> : ''}
                </form>
            </div>

            {/* <Dialog
                open={err}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    )
}

export default LoginPage;
