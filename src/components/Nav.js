/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, useEffect, createRef } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
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
        component: 'SearchMemberPage',
        path: '/searchmember',
        submenu: [
            {
                subtitle: 'ยื่นคำขอกู้ยืมเงิน',
                subpath: '/'
            },{
                subtitle: 'พิมพ์สัญญากู้ยืมเงิน',
                subpath: '/'
            },{
                subtitle: 'พิมพ์ใบสำคัญการรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน',
                subpath: '/'
            },{
                subtitle: 'บันทึกปิดสัญญาเดิม',
                subpath: '/'
            },{
                subtitle: 'พิมพ์ใบสัญญาแปลงหนี้',
                subpath: '/'
            },{
                subtitle: 'แก้ไขสัญญาฟ้องศาล',
                subpath: '/'
            },{
                subtitle: 'ค้นหาสัญญาทั้งหมด',
                subpath: '/'
            }
        ]
    },{
        title: 'ข้อมูลการให้บริการสินเชื่อ',
        component: 'SearchMemberPage',
        path: '/searchmember',
        submenu: [
            {
                subtitle: 'บันทึกใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด',
                subpath: '/'
            },{
                subtitle: 'บันทึกใบเสร็จรับเงิน (ปิดสัญญาแล้ว)',
                subpath: '/'
            },{
                subtitle: 'แก้ไขใบเสร็จรับเงิน',
                subpath: '/'
            },{
                subtitle: 'Upload file ข้อมูล ธกส.',
                subpath: '/'
            },{
                subtitle: 'พิมพ์ใบเสร็จรับเงินจากธนาคาร',
                subpath: '/'
            }
        ]
    },
]

export default function Nav() {
  const classes = useStyles();

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
                            { subtitle.map((item,i)=><MenuItem key={i} onClick={handleClose}>{item.subtitle}</MenuItem>)}
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