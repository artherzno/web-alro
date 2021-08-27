import React, { useContext, useState, createContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiLogout} from '@mdi/js'

import LogoImg from '../assets/logo-alro.png';
import { AuthContext } from '../App';
import moment from 'moment'
import axios from 'axios'

const dataUserContext = createContext();

function Header(props) {
    const auth = useContext(AuthContext)
    const history = useHistory();

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let username = localStorage.getItem('username');
    let provincename = localStorage.getItem('provincename');

    const { bgColor, status } = props;

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

    const timer = () => {
        setRealDate(moment().format('Do MMMM YYYY'))
        setRealDay(moment().format('Do'))
        setRealMonth(moment().format('MMMM'))
        setRealYear(moment().format('YYYY'))
        setRealTime(moment().format('HH:mm'))
    }

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
                    <Icon path={mdiLogout}
                        title="Log Out"
                        size={1}
                        color="#27ae60"
                        onClick={()=>logout()}
                        />
                </div> : ''}
        </div>
    )
}

export { dataUserContext }
export default Header;
