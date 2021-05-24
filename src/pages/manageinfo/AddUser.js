import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield, 
    MuiCheckbox, 
    MuiSelect, 
    MuiDatePicker, 
    ButtonFluidPrimary, 
    ButtonFluidOutlinePrimary,
    ButtonOutlineIconStartGrey,
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

function AddUser(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        typeMember: '1',
        prefix: undefined,
        name: undefined,
        surname: undefined,
        idNum: '',
        telNum: undefined,
        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const renderTree = (nodes) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
          {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
      );

    // Radio Button

    const handleChangeTypeMember = (event) => {
        setInputData({...inputData,
            typeMember: event.target.value
        })
        console.log('typeMember ',event.target.value)
    };
    // End Radio Button

    // Input ID Number
    const handleIdNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            idNum: event.target.value
        })
        console.log('idNum ',event.target.value)
    }
    // End Input ID Number

    // Input Tel Number
    const handleTelNumber = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,10)
        setInputData({...inputData,
            telNum: event.target.value
        })
    }
    // End Input Tel Number

    const handleUploadImg = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i=0; i<event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({...inputData,
            imgUpload: imgArr
        })
    }

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
        <div className="adduser-page">
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
                                <h1>เพิ่มผู้ใช้งาน</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="sm">
                        <Grid container spacing={2}>

                            {/* Paper 1 -------------------------------------------------- */}
                            <Grid item xs={12} md={12}>
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiSelect label="คำนำหน้า" lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ชื่อ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <MuiTextfield label="นามสกุลชื่อ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="UserName" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiTextfield label="Password" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiSelect label="ActiveStatus" lists={['ActiveStatus1','ActiveStatus2']} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <MuiDatePicker label="ExpireDate" defaultValue="2017-05-24" />
                                            </Grid>
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
                                                >
                                                    <TreeItem nodeId="1" label={<MuiCheckbox label="Administrator" />} className="container">
                                                        <TreeItem nodeId="2" label={<MuiCheckbox label="คณะกรรมการปฏิรูปที่ดินจังหวัด (คปจ.) " />} />
                                                        <TreeItem nodeId="3" label={<MuiCheckbox label="คณะอนุกรรมการ " />}  />
                                                        <TreeItem nodeId="4" label={<MuiCheckbox label="คณะกรรมการปฏิรูปที่ดินเพื่อเกษตรกรรม(คปก.)" /> } className="container">
                                                            <TreeItem nodeId="5" label={<MuiCheckbox label="ผู้อำนวยการ " />} />
                                                            <TreeItem nodeId="6" label={<MuiCheckbox label="หัวหน้าส่วน " />} className="container">
                                                                <TreeItem nodeId="7" label={<MuiCheckbox label="กลุ่มยุทธศาสตร์ " />} />
                                                                <TreeItem nodeId="8" label={<MuiCheckbox label="ฝ่ายการเงิน " />} />
                                                                <TreeItem nodeId="9" label={<MuiCheckbox label="ฝ่ายบัญชี " />} />
                                                            </TreeItem>
                                                        </TreeItem>
                                                    </TreeItem>
                                                </TreeView>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
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

export default AddUser;
