import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiCheckbox, 
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary,
    ButtonOutlineIconStartGrey,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonNormalIconStartGrey,
} from '../../components/MUIinputs';

const data = {
    id: 'root',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1',
      },
      {
        id: '3',
        name: 'Child - 3',
        children: [
          {
            id: '4',
            name: 'Child - 4',
          },
        ],
      },
    ],
  };

function AddRole(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeMember: '1',
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
        <div className="addrole-page">
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
                                <h1>Role ทั้งหมด</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                {/* <TreeView
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpanded={['root']}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                >
                                    {renderTree(data)}
                                </TreeView> */}
                                    <TreeView
                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                        defaultExpandIcon={<ChevronRightIcon />}
                                        multiSelect
                                        className="treeview"
                                        defaultExpanded={['1','4','6']}
                                        disableSelection
                                    >
                                        <TreeItem nodeId="1" label={<React.Fragment><span>Role ทั้งหมด</span></React.Fragment>} className="container">
                                            <TreeItem nodeId="2"
                                                label={
                                                <React.Fragment>
                                                    <span>คณะกรรมการปฏิรูปที่ดินจังหวัด (คปจ.)</span>
                                                    <div className="tree-button">
                                                        <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                        <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                        <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                        <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                    </div>
                                                </React.Fragment>} 
                                            />
                                            <TreeItem nodeId="3"
                                                label={
                                                <React.Fragment>
                                                    <span>คณะอนุกรรมการ</span>
                                                    <div className="tree-button">
                                                        <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                        <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                        <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                        <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                    </div>
                                                </React.Fragment>} 
                                            />
                                            <TreeItem nodeId="4" 
                                                label={
                                                    <React.Fragment>
                                                        <span>คณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรม</span>
                                                        <div className="tree-button">
                                                            <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                            <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                            <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                            <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                        </div>
                                                    </React.Fragment>} 
                                                className="container"
                                            >
                                                <TreeItem nodeId="5"
                                                    label={
                                                    <React.Fragment>
                                                        <span>ผู้อำนวยการ</span>
                                                        <div className="tree-button">
                                                            <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                            <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                            <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                            <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                        </div>
                                                    </React.Fragment>} 
                                                />
                                                <TreeItem nodeId="6" 
                                                    label={
                                                        <React.Fragment>
                                                            <span>หัวหน้าส่วน</span>
                                                            <div className="tree-button">
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                                <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                                <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                            </div>
                                                        </React.Fragment>} 
                                                    className="container"
                                                >
                                                    <TreeItem nodeId="7"
                                                        label={
                                                        <React.Fragment>
                                                            <span>กลุ่มยุทธศาสตร์</span>
                                                            <div className="tree-button">
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                                <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                                <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                            </div>
                                                        </React.Fragment>} 
                                                    />
                                                    <TreeItem nodeId="8"
                                                        label={
                                                        <React.Fragment>
                                                            <span>ฝ่ายการเงิน</span>
                                                            <div className="tree-button">
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                                <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                                <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                            </div>
                                                        </React.Fragment>} 
                                                    />
                                                    <TreeItem nodeId="9"
                                                        label={
                                                        <React.Fragment>
                                                            <span>ฝ่ายบัญชี</span>
                                                            <div className="tree-button">
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowUpwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('up')}} />
                                                                <ButtonNormalIconStartGrey label="" startIcon={<ArrowDownwardIcon />} onClick={(e)=>{e.stopPropagation(); alert('down')}} />
                                                                <ButtonNormalIconStartPrimary label="" startIcon={<AddIcon />} onClick={(e)=>{e.stopPropagation(); alert('add')}} />
                                                                <ButtonNormalIconStartSecondary label="" startIcon={<DeleteIcon />} onClick={(e)=>{e.stopPropagation(); alert('Delete')}} />
                                                            </div>
                                                        </React.Fragment>} 
                                                    />
                                                </TreeItem>
                                            </TreeItem>
                                        </TreeItem>
                                    </TreeView>
                                </Grid>
                        </Grid>

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

export default AddRole;
