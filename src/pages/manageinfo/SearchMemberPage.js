import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import { 
    MuiTextfield, 
    MuiTextNumber, 
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary, 
} from '../../components/MUIinputs';

// import Icon from '@material-ui/core/Icon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

function SearchMemberPage(props) {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        name: undefined,
        surname: undefined,
        idNum: '',
        landNum: undefined,
    })

    useEffect(() => {
        setLoaded(true);
    }, [])

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

    const gotoAddMember = () => {
        history.push('/addmember');
    }

    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    {/* Search Condition */}
                    <Container maxWidth="sm">
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ค้นหาสมาชิก</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <ButtonNormalIconStartPrimary label="เพิ่มสมาชิก" startIcon={<PersonAddIcon />} onClick={()=>gotoAddMember()} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper className="paper">
                                    <form className="root" noValidate autoComplete="off">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="name-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล" id="surname-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIdNumber}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="เลขที่ดิน" id="contact-number-input" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="ค้นหา"/>   
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                    
                    {/* Search Result */}
                    <Container maxWidth="md" className="result-box">
                        <Grid item xs={12} md={12} className="result-header"> 
                            <h2>ผลการค้นหา 0 รายการ</h2>
                        </Grid>
                        <Box className="table-no-result">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p={1}
                                m={1}
                                css={{ height: '100%' }}
                            >
                                <Box justifyContent="center" alignItems="center" css={{ textAlign: 'center' }}>
                                    <Box p={1}>
                                        ไม่มีข้อมูล
                                    </Box>
                                    <Box p={1}>
                                        <ButtonNormalIconStartPrimary label="เพิ่มสมาชิก" startIcon={<PersonAddIcon />} onClick={()=>gotoAddMember()} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default SearchMemberPage;
