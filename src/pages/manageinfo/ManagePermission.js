import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiRadioButton,
    MuiCheckbox, 
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary,
    ButtonOutlineIconStartGrey,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonNormalIconStartGrey,
} from '../../components/MUIinputs';

const tableResult = [
    { 
        maintitle: 'คำขอกู้ยืมเงิน',
        subtitle: [
            'ค้นหาคำขอกู้ยืมเงิน', 
            'ยื่นคำขอกู้ยืมเงิน', 
            'พิมพ์สัญญากู้ยืมเงิน', 
            'พิมพ์ใบสำคัญการรับเงินของผู้กู้ตามสัญญากู้ยืมเงิน', 
            'บันทึกปิดสัญญาเดิม', 
            'พิมพ์ใบสัญญาแปลงหนี้', 
            'แก้ไขสัญญาฟ้องศาล', 
            'ค้นหาสัญญาทั้งหมด'
        ]
    },{
        maintitle: 'ข้อมูลการให้บริการสินเชื่อ',
        subtitle: [
            'บันทึกใบเสร็จรับเงิน ณ ส.ป.ก.จังหวัด', 
            // 'บันทึกใบเสร็จรับเงิน (ปิดสัญญาแล้ว)', 
            'ตรวจสอบใบเสร็จรับเงิน',
            'แก้ไขใบเสร็จรับเงิน', 
            'Upload file ข้อมูล ธกส.', 
            'พิมพ์ใบเสร็จรับเงินจากธนาคาร'
        ]
    },{
        maintitle: 'ข้อมูลเร่งรัดจัดเก็บหนี้',
        subtitle: [
            'พิมพ์ใบแจ้งหนี้', 
            'ใบเตือนหนี้ค้างชำระ', 
            'บันทึกขอผ่อนผัน', 
            'คำขอขยาย', 
            'เงื่อนไขปรับโครงสร้างหนี้', 
            'รับสภาพหนี้/รับสภาพความผิด'
        ]
    },{
        maintitle: 'รายงาน',
        subtitle: [
            'บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้', 
            'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่', 
            'รายงานการจ่ายเงินกู้', 
            'รายงานคำขอกู้ยืมรายสัญญา', 
            'รายงานการทำสัญญา', 
            'รายงานการทำสัญญาแปลงหนี้', 
            'รายงานสัญญาการดำเนินคดีทางศาล', 
            'รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้', 
            'รายงานการใช้ใบเสร็จรับเงิน'
        ]
    },{
        maintitle: 'จัดการข้อมูลพื้นฐาน',
        subtitle: [
            'จัดการงบประมาณโครงการ', 
            'โครงการขอกู้เงิน', 
            'ค้นหาสมาชิก',
            'จัดการผู้ใช้งาน'
        ]
    }
]

function ManagePermission(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeAllow: '1',
        treeNode6: false,
    })

    useEffect(() => {
        setLoaded(true);
        console.log(inputData.treeNode6)
    }, [inputData.treeNode6])

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      );

      const handleCheckBox = (event) => {
        setInputData({...inputData,
            treeNode6: !event.target.value
        })
        console.log('typeBill ',event.target.value)
    };

    // Radio Button
    const handleChangeTypeAllow = (event) => {
        setInputData({...inputData,
            typeAllow: event.target.value
        })
        console.log('typeAllow ',event.target.value)
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
        <div className="managepermission-page">
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
                                <h1>จัดการสิทธิ์</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}> 
                                <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    multiSelect
                                    className="treeview"
                                    defaultExpanded={['1','4','6']}
                                >
                                        <TreeItem nodeId="2"
                                            label={
                                            <React.Fragment>
                                                <span>คณะกรรมการปฏิรูปที่ดินจังหวัด (คปจ.)</span>
                                            </React.Fragment>} 
                                        />
                                        <TreeItem nodeId="3"
                                            label={
                                            <React.Fragment>
                                                <span>คณะอนุกรรมการ</span>
                                            </React.Fragment>} 
                                        />
                                        <TreeItem nodeId="4" 
                                            label={
                                                <React.Fragment>
                                                    <span>คณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรม</span>
                                                </React.Fragment>} 
                                            className="container"
                                        >
                                            <TreeItem nodeId="5"
                                                label={
                                                <React.Fragment>
                                                    <span>ผู้อำนวยการ</span>
                                                </React.Fragment>} 
                                            />
                                            <TreeItem nodeId="6" 
                                                label={
                                                    <React.Fragment>
                                                        <span>หัวหน้าส่วน</span>
                                                    </React.Fragment>} 
                                                className="container"
                                            >
                                                <TreeItem nodeId="7"
                                                    label={
                                                    <React.Fragment>
                                                        <span>กลุ่มยุทธศาสตร์</span>
                                                    </React.Fragment>} 
                                                />
                                                <TreeItem nodeId="8"
                                                    label={
                                                    <React.Fragment>
                                                        <span>ฝ่ายการเงิน</span>
                                                    </React.Fragment>} 
                                                />
                                                <TreeItem nodeId="9"
                                                    label={
                                                    <React.Fragment>
                                                        <span>ฝ่ายบัญชี</span>
                                                    </React.Fragment>} 
                                                />
                                            </TreeItem>
                                        </TreeItem>
                                </TreeView>
                            
                            </Grid>
                            <Grid item xs={12} md={6}> 
                                
                            <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">เมนูที่เข้าถึงได้</TableCell>
                                                <TableCell align="left">สิทธิ์</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>  {/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={2} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            {/* {
                                                tableResult.map((row,i) => (
                                                    <React.Fragment>
                                                        <TableRow>
                                                                <TableCell align="left" style={{width: '54%'}}><MuiCheckbox label={row.maintitle} /></TableCell>
                                                                <TableCell align="left">
                                                                    <MuiRadioButton label="" lists={['read only','modify']} value={inputData.typeAllow} onChange={handleChangeTypeAllow} type="row" />
                                                                </TableCell>
                                                        </TableRow>
                                                        { row.subtitle.map((rowsub,i)=>(
                                                            <TableRow>
                                                                <TableCell style={{paddingLeft: '3.2em'}}><MuiCheckbox label={rowsub} /></TableCell>
                                                                <TableCell align="left">
                                                                    <MuiRadioButton label="" lists={['read only','modify']} value={inputData.typeAllow} onChange={handleChangeTypeAllow} type="row" />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </React.Fragment>
                                                ))
                                            } */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="btn-row">
                            {/* Button Row -------------------------------------------------- */}
                            <Grid item xs={12} md={6}>
                                <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={postData}/>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default ManagePermission;
