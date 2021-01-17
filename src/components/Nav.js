import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    const menu = [{
            title: 'ค้นหาสมาชิก',
            component: 'SearchMemberPage',
            path: '/searchmember'
        },{
            title: 'ยื่นคำขอกู้ยืมเงิน',
            component: 'ApplyLoan',
            path: '/applyloan'
        },{
            title: 'สัญญาทั้งหมด',
            component: 'AllContact',
            path: '/allcontact'
        },{
            title: 'รายงาน',
            component: 'Report',
            path: '/report'
        },{
            title: 'จัดการข้อมูลพื้นฐาน',
            component: 'ManageInfo',
            path: '/manageinfo'
        },{
            title: 'ปิดสัญญาเดิม',
            component: 'CloseContact',
            path: '/closecontact'
        },{
            title: 'ข้อมูลเร่งรัดจัดเก็บหนี้',
            component: 'DebtInfo',
            path: '/debtinfo'
        }
    ]

    return (
        <div className="nav">
            <ul>
               { menu.map((item,i)=><li key={`menu${i}`}><Link to={item.path}>{item.title}</Link></li>) }
            </ul>
        </div>
    )
}

export default Nav;
