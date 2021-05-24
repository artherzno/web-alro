import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiRadioButton,
    ButtonOutlineIconStartGrey,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonFluidOutlinePrimary,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { StyledTableCell } from '../../components/report/HeaderTable';


function AddMenu(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);

    const [inputData, setInputData] = useState({
        typeMemberStatus: '1',
    })

    // All Data for DataGrid & Table ---------------------------------------------//

    const tableResult = [

        { 
            mainmenu: 'คำขอกู้ยืมเงิน',
            submenu: [
                { a: 'm1-1', b: 'ค้นหาคำขอกู้ยืมเงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-2', b: 'ยื่นคำขอกู้ยืมเงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-3', b: 'พิมพ์สัญญากู้ยืมเงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-4', b: 'พิมพ์ใบสำคัญการรับเงินของผู้กู้ตาม', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-5', b: 'สัญญากู้ยืมเงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-6', b: 'บันทึกปิดสัญญาเดิม', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-7', b: 'พิมพ์ใบสัญญาแปลงหนี้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-8', b: 'แก้ไขสัญญาฟ้องศาล', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm1-9', b: 'ค้นหาสัญญาทั้งหมด', c: 'alro.go.th/xxxxxxxx'},
            ]
        },{ 
            mainmenu: 'ข้อมูลการให้บริการสินเชื่อ',
            submenu: [
                { a: 'm2-1', b: 'บันทึกใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm2-2', b: 'บันทึกใบเสร็จรับเงิน (ปิดสัญญาแล้ว)', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm2-3', b: 'แก้ไขใบเสร็จรับเงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm2-4', b: 'Upload file ข้อมูล ธกส.', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm2-5', b: 'พิมพ์ใบเสร็จรับเงินจากธนาคาร', c: 'alro.go.th/xxxxxxxx'},
            ]
        },{ 
            mainmenu: 'ข้อมูลเร่งรัดจัดเก็บหนี้',
            submenu: [
                { a: 'm3-1', b: 'พิมพ์ใบแจ้งหนี้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm3-2', b: 'ใบเตือนหนี้ค้างชำระ', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm3-3', b: 'บันทึกขอผ่อนผัน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm3-4', b: 'คำขอขยาย', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm3-5', b: 'เงื่อนไขปรับโครงสร้างหนี้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm3-6', b: 'รับสภาพหนี้/รับสภาพความผิด', c: 'alro.go.th/xxxxxxxx'},
            ]
        },{ 
            mainmenu: 'รายงาน',
            submenu: [
                { a: 'm4-1', b: 'บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-2', b: 'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-3', b: 'รายงานการจ่ายเงินกู้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-4', b: 'รายงานคำขอกู้ยืมรายสัญญา', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-5', b: 'รายงานการทำสัญญา', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-6', b: 'รายงานการทำสัญญาแปลงหนี้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-7', b: 'รายงานสัญญาการดำเนินคดีทางศาล', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-8', b: 'รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm4-9', b: 'รายงานการใช้ใบเสร็จรับเงิน', c: 'alro.go.th/xxxxxxxx'},
            ]
        },{ 
            mainmenu: 'จัดการข้อมูลพื้นฐาน',
            submenu: [
                { a: 'm5-1', b: 'จัดการงบประมาณโครงการ', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm5-2', b: 'โครงการขอกู้เงิน', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm5-3', b: 'ค้นหาสมาชิก', c: 'alro.go.th/xxxxxxxx'},
                { a: 'm5-4', b: 'จัดการผู้ใช้งาน', c: 'alro.go.th/xxxxxxxx'},
            ]
        }
    ]

    // End All Data for DataGrid ---------------------------------------------//

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        setLoaded(true);
    }, [])

    // Radio Button

    const handleChangeTypeMemberStatus = (event) => {
        setInputData({...inputData,
            typeMember: event.target.value
        })
        console.log('typeMember ',event.target.value)
    };
    // End Radio Button

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // if (value === 'best') {
        //   setHelperText('You got it!');
        //   setError(false);
        // } else if (value === 'worst') {
        //   setHelperText('Sorry, wrong answer!');
        //   setError(true);
        // } else {
        //   setHelperText('Please select an option.');
        //   setError(true);
        // }
      };

    const postData = () => {
        console.log(inputData)
        history.push('/manageinfo/manageuser');
    }

    const cancelData = () => {
        history.push('/manageinfo/manageuser');
    }

    const gotoManageUser = () => {
        history.push('/manageinfo/manageuser');
    }

    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <div style={{position: 'absolute'}}>
                                    <ButtonOutlineIconStartGrey label="ย้อนกลับ" startIcon={<ArrowBackIcon/>} onClick={()=>gotoManageUser()} />
                                </div>
                                <h1>เมนูทั้งหมด</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>

                            {/* Paper 1 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                            <div className="table-box table-allcontractsearch1 mg-t-20">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">MenuID</TableCell>
                                                <TableCell align="center">MenuName</TableCell>
                                                <TableCell align="center">MenuLink</TableCell>
                                                <TableCell align="center">MenuStatus</TableCell>
                                                <TableCell align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                tableResult.map((row,i) => (
                                                    <React.Fragment >
                                                        <TableRow key={'main-'+i}>
                                                            <TableCell colSpan={5} className="bg-light-green txt-center-v dsp-f">
                                                                    {row.mainmenu}
                                                                    <ButtonNormalIconStartPrimary label="เพิ่มเมนู" startIcon={<AddIcon />} className="mg-l-20" onClick={handleOpenDialog} />
                                                            </TableCell>
                                                        </TableRow>
                                                        {
                                                            tableResult[i].submenu.map((row,i) => (
                                                            <TableRow key={row.a}>
                                                                <TableCell align="center">{i+1}</TableCell>
                                                                <TableCell align="left">{row.b}</TableCell>
                                                                <TableCell align="center">{row.c}</TableCell>
                                                                <TableCell align="center">
                                                                    <MuiRadioButton label="" lists={['on','off']} value={inputData.typeMemberStatus} onChange={handleChangeTypeMemberStatus} type="row" />
                                                                </TableCell>
                                                                <TableCell align="center" className="tb-w-18em">
                                                                    <ButtonNormalIconStartPrimary label="แก้ไข" startIcon={<EditOutlinedIcon />} />
                                                                    <ButtonNormalIconStartSecondary label="ลบ" startIcon={<DeleteOutlineOutlinedIcon />} />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </React.Fragment>
                                            ))
                                            
                                            }
                                            
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        
                        </Grid>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">{"เพิ่มเมนูคำขอกู้ยืมเงิน"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <MuiTextfield label="ชื่อเมนู" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <MuiTextfield label="ลิงค์เมนู" defaultValue="" />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleCloseDialog} color="primary" autoFocus />
                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleCloseDialog} color="primary" />
                </DialogActions>
            </Dialog>
        </div>
        
    )
}

export default AddMenu;
