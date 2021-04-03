import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import Header from '../components/Header';
import BgImg from '../assets/login-bg.jpg';

function LoginPage() {
    const history = useHistory();
    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    });
    const [err, setErr] = useState(false);

    const handleChange = event => {
        setDataLogin({
            ...dataLogin,
            [event.target.name]: event.target.value
        });
    }


    const handleSubmit = event => {
        event.preventDefault();
        if(dataLogin.username === 'admin' && dataLogin.password === '1234') {
            setErr(false);
            alert('A name was submitted: ' + dataLogin.username +', '+dataLogin.password);
            history.push('/searchmember');
        } else {
            setErr(true);
            setDataLogin({
                ...dataLogin,
                username: '',
                password: ''
            })
        }
    }

    return (
        <div className="login-page" style={{backgroundImage: `url(${BgImg})`, backgroundSize: 'cover'}}>
            <Header bgColor="bg-green" status="login" />
            
            <div className="card">
                <p className="font-18">เข้าสู่ระบบสินเชื่อกองทุนการปฏิรูปที่ดินเพื่อเกษตรกรรม</p>
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
                    { err ? <p className="err font-14">username หรือ password ไม่ถูกต้อง</p> : ''}
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
