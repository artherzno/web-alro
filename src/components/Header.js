import React, { useContext, useState, createContext } from 'react'
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiLogout} from '@mdi/js'

import LogoImg from '../assets/logo-alro.png';
import { AuthContext } from '../App';

const dataUserContext = createContext();

function Header(props) {
    const auth = useContext(AuthContext)
    const history = useHistory();

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    const { bgColor, status } = props;

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);

    const goto = () => {
        history.push('/home');
    }

    const logout = async () => {
        const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/logout`, {
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
              console.log(res)
              history.push('/');
              // setDataCampaign(data); // from local
          }

        })
        .catch(err => {
          console.log(err);
          setIsLoaded(true);
          setErr(true);
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

            { status === 'logged' ? <div className="admin-info">
                <p>
                    ยินดีต้อนรับ คุณกานต์พิชชา<br/>
                    <span>ส.ป.ก. จังหวัดสมุทรปราการ วันที่ 4 มกราคม 2564 เวลา 9.30 น.</span>
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
