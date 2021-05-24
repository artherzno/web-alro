import React from 'react'
import { useHistory } from 'react-router-dom';
import Icon from '@mdi/react'
import { mdiLogout} from '@mdi/js'

import LogoImg from '../assets/logo-alro.png';

function Header(props) {
    const history = useHistory();
    const { bgColor, status } = props;

    const goto = () => {
        history.push('/home');
    }

    const logout = () => {
        history.push('/');
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

export default Header;
