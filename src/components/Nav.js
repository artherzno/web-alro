/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, createRef } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const listmenu = [
    {
        title: 'คำขอกู้ยืมเงิน',
        component: 'LoanRequestPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'ข้อมูลเกษตกร',
                subpath: '/manageinfo/searchmember'
            },
            {
                subtitle: 'ตรวจสอบคำขอกู้ยืมเงิน',
                subpath: '/loanrequest/loanrequestcontactsearch'
            },
            // {
            //     subtitle: 'ยื่นคำขอกู้ยืมเงิน',
            //     subpath: '/loanrequest/loanrequestcontact'
            // },
            {
                subtitle: 'บันทึก / พิมพ์สัญญากู้ยืมเงิน',
                subpath: '/loanrequest/loanrequestprint'
            },{
                subtitle: 'บันทึก / พิมพ์สัญญาใบสำคัญรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน',
                subpath: '/loanrequest/loanrecivceprint'
            },{
                subtitle: 'บันทึกปิดสัญญาเดิม',
                subpath: '/loanrequest/recordcloseoldcontact'
            },{
                subtitle: 'สร้าง / บันทึกสัญญาแปลงหนี้',
                subpath: '/loanrequest/recordcontractdebt'
            },{
                subtitle: 'พิมพ์ใบสัญญาแปลงหนี้',
                subpath: '/loanrequest/printcontractdebt'
            },{
                subtitle: 'สร้าง / บันทึกสัญญาฟ้องศาล',
                subpath: '/loanrequest/addrecordcourtcontract'
            },{
                subtitle: 'แก้ไขสัญญาฟ้องศาล',
                subpath: '/loanrequest/editcontract'
            },
            /*{
                subtitle: 'ค้นหาสัญญาทั้งหมด',
                subpath: '/loanrequest/allcontractsearch'
            }*/
        ]
    },{
        title: 'ข้อมูลการให้บริการสินเชื่อ',
        component: 'CreditInfoPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'บันทึกใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด',
                subpath: '/loanserviceinfo/recordbillalro'
            },
            /*{
                // subtitle: 'บันทึกใบเสร็จรับเงิน (ปิดสัญญาแล้ว)',
                subtitle: 'ตรวจสอบใบเสร็จรับเงิน',
                subpath: '/loanserviceinfo/recordbillclose'
            },*/
            {
                subtitle: 'ยกเลิกใบเสร็จรับเงิน',
                subpath: '/loanserviceinfo/cancelbill'
            },{
                subtitle: 'Upload file ข้อมูล ธกส.',
                subpath: '/loanserviceinfo/uploadinfobaac'
            },{
                subtitle: 'พิมพ์ใบเสร็จรับเงินจากธนาคาร',
                subpath: '/loanserviceinfo/printbillbank'
            },{
                subtitle: 'ชำระเงินจากธนาคารอื่น',
                subpath: '/loanserviceinfo/payfromotherbank'
            },{
                subtitle: 'พิมพ์ใบเสร็จรับเงินจากธนาคารอื่น',
                subpath: '/loanserviceinfo/printbillotherbank'
            }
        ]
    },{
        title: 'ข้อมูลเร่งรัดจัดเก็บหนี้',
        component: 'DebtInfoPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'รายงานใบแจ้งหนี้',
                subpath: '/debtinfo/printinvoice'
            },{
                subtitle: 'รายงานใบเตือนหนี้ค้างชำระ',
                subpath: '/debtinfo/noticeinvoice'
            },{
                subtitle: 'ใบแจ้งหนี้ล่วงหน้า 30 วัน',
                subpath: '/debtinfo/advanceinvoice'
            },{
                subtitle: 'ใบเตือนหนี้ครั้งที่ 1, 2',
                subpath: '/debtinfo/debtreminder'
            },{
                subtitle: 'บันทึกขอผ่อนผัน',
                subpath: '/debtinfo/recordinstallmentpayment'
            },{
                subtitle: 'คำขอขยาย',
                subpath: '/debtinfo/recordrequestpayment'
            },{
                subtitle: 'เงื่อนไขปรับโครงสร้างหนี้',
                subpath: '/debtinfo/debtcondition'
            },{
                subtitle: 'รับสภาพหนี้/รับสภาพความผิด',
                subpath: '/debtinfo/faultcondition'
            }
        ]
    },{
        title: 'ตรวจสอบ',
        component: 'VerifyPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'ตรวจสอบงวดชำระตามสัญญา',
                subpath: '/check/bysign'
            },
            {
                subtitle: 'ตรวจสอบงวดชำระตามจ่ายจริง',
                subpath: '/check/realpay'
            },
            {
                subtitle: 'ตรวจสอบงวดชำระ&บัญชี',
                subpath: '/check/installment'
            },
            {
                subtitle: 'ตรวจสอบใบเสร็จรับเงิน',
                subpath: '/check/check-billed'
            },
            {
                subtitle: 'ตรวจสอบเงื่อนไข&ดอกเบี้ย',
                subpath: '/check/condition-interest'
            },
            {
                subtitle: 'ตรวจสอบสัญญา',
                subpath: '/check/checksign'
            },
            {
                subtitle: 'ตรวจสอบยอดการชำระเงิน',
                subpath: '/check/payment'
            },
            {
                subtitle: 'ตรวจสอบประมวล พิมพ์ลูกหนี้รายตัว',
                subpath: '/check/process-by-person'
            },
            {
                subtitle: 'ตรวจสอบประมวลฟ้องศาล พิมพ์ลูกหนี้รายตัว',
                subpath: '/check/process-law-by-person'
            },
            {
                subtitle: 'ตรวจสอบใบแจ้งหนี้',
                subpath: '/check/check-bill'
            }
        ]
    },{
        title: 'รายงาน',
        component: 'ReportPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้',
                subpath: '/report/listfarmerpayloan'
            },{
                subtitle: 'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่',
                subpath: '/report/listnewfarmerpayloan'
            },{
                subtitle: 'รายงานการจ่ายเงินกู้',
                subpath: '/report/payLoan'
            },{
                subtitle: 'รายงานคำขอกู้ยืมรายสัญญา',
                subpath: '/report/requestloan'
            },{
                subtitle: 'รายงานการทำสัญญา',
                subpath: '/report/listsign'
            },{
                subtitle: 'รายงานการทำสัญญาแปลงหนี้',
                subpath: '/report/convertloan'
            },{
                subtitle: 'รายงานสัญญาการดำเนินคดีทางศาล',
                subpath: '/report/lawsuit'
            },{
                subtitle: 'รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้',
                subpath: '/report/modify'
            },{
                subtitle: 'รายงานการใช้ใบเสร็จรับเงิน',
                subpath: '/report/billed'
            }, {
                subtitle: 'รายงานการชดใช้หนี้แทนเกษตรกร',
                subpath: '/report/compensate'
            }, {
                subtitle: 'รายงานสถานะหนี้เงินรอเรียกคืน',
                subpath: '/report/debtpending'
            }
        ]
    },{
        title: 'จัดการข้อมูลพื้นฐาน',
        component: 'ManageInfoPage',
        path: '/home',
        submenu: [
            {
                subtitle: 'จัดการงบประมาณโครงการ',
                subpath: '/manageinfo/manageprojectbudget'
            },{
                subtitle: 'โครงการขอกู้เงิน',
                subpath: '/manageinfo/loanrequestproject'
            },{
                subtitle: 'จัดการผู้ใช้งาน',
                subpath: '/manageinfo/manageuser'
            }
        ]
    },{
        title: 'สัญญาชดใช้หนี้แทนเกษตรกร',
        component: 'RepaymentContract',
        path: '/home',
        submenu: [
            {
                subtitle: 'ปิดสัญญาและชดใช้หนี้แทน',
                subpath: '/repaymentcontract/closerepaymentcontract'
            },{
                subtitle: 'เพิ่มสัญญาชดใช้หนี้แทน',
                subpath: '/repaymentcontract/addrepaymentcontract'
            }
        ]
    },
]

export default function Nav() {
  const classes = useStyles();
  const history = useHistory();

  function navItem(title, subtitle, key) {

        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const popper = createRef();

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
                return;
            }

            setOpen(false);
        };

        const goto = (subpath) => {
            // console.log(subpath)
            history.push(subpath);
        }

        function handleListKeyDown(event) {
            if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
            }
        }

        // return focus to the button when we transitioned from !open -> open
        const prevOpen = useRef(open);
        useEffect(() => {
            if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
            }

            prevOpen.current = open;
        }, [open]);

        return (
            <div className="nav-item" key={key}>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    endIcon={<ExpandMoreIcon/>}
                >
                { title }
                </Button>
                <Popper ref={popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            { subtitle.map((item,i)=><MenuItem key={i} onClick={(event)=>{handleClose(event); goto(item.subpath)}}>{item.subtitle}</MenuItem>)}
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
            </div>
        );
  }

  return (
        <div className={classes.root}>
            <div className="nav">
                {  listmenu.map((item,key)=> navItem(item.title, item.submenu, key)) }
            </div>
        </div>
  );
}
/*
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
*/