import React from 'react'
import Icon from '@mdi/react'
import { mdiLogout} from '@mdi/js'

import LogoImg from '../assets/logo-alro.png';

function Header(props) {
    const { bgColor, status } = props;

    return (
        <div className={`header ${bgColor} ${status}`}>
            <div className="logo">
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
                    />
                </div> : ''}
        </div>
    )
}

export default Header;
