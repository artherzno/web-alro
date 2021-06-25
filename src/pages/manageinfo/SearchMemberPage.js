import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

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
import { AuthContext } from '../../App';

import Cookies from 'js-cookie';


function SearchMemberPage(props) {
    const history = useHistory();
    const auth = useContext(AuthContext);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [tableResult, setTableResult] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [loaded, setLoaded] = useState(false);
    const [inputData, setInputData] = useState({
        Name: null,
        Sirname: null,
        IDCard: null,
        FarmerGrade: null,
        LoanNumber: null,
        order_by: "IDCard",
        order_desc: "DESC",
        page_number: 1,
        page_length: null,
    })

    useEffect(() => {
        console.log(document.cookie)
        async function fetchCheckLogin() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin'})
            res
            .json()
            .then(res => {
                console.log(res.statuscode)
                if (res.code === 0 || res === null || res === undefined ) {
                    history.push('/');
                    setErr(true);
                } 
            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
                setErr(true);
                history.push('/');
            });
        }
        
        setLoaded(true);
        fetchCheckLogin();

        console.log(tableResult)

    }, [history, server_hostname, server_port, tableResult])

    async function fetchSearchFarmer() {
        console.warn('Cookie', document.cookie)
        const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/search_farmer`, {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }); 

        res
        .json()
        .then(res => {
        if (res.code === 0 || res === null || res === undefined ) {
            setIsLoaded(true);
            setErr(true);
        //   history.push('/error');
            setErrMsg(res.message)
        } else {
            setHasData(true);
            setIsLoaded(true);
            setTableResult(res.data);
            console.log(res.data);

            // history.push('/home');
            // setDataCampaign(data); // from local
        }

        })
        .catch(err => {
            console.log(err);
            setIsLoaded(true);
            setErr(true);
        });
    }

    const handleChangeName = (event) => {
        setInputData({...inputData,
            Name: event.target.value
        })
        console.log('Name ',event.target.value)
    };
    
    const handleChangeSurname = (event) => {
        setInputData({...inputData,
            Sirname: event.target.value
        })
        console.log('Sirname ',event.target.value)
    };

    // Input ID Number
    const handleIDCard = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            IDCard: event.target.value
        })
        console.log('idNum ',event.target.value)
    }
    // End Input ID Number
 
    const handleChangeLoanNumber = (event) => {
        setInputData({...inputData,
            LoanNumber: event.target.value
        })
        console.log('LoanNumber ',event.target.value)
    };

    const handleChangePage = (event, newPage) => {
        console.log('newPage', newPage)
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Link another page
    const gotoAddMember = () => {
        history.push('/manageinfo/addmember');
    }

    const gotoEditMember = () => {
        history.push('/manageinfo/editmember');
    }

    const gotoLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
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
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ค้นหาเกษตกร</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <ButtonNormalIconStartPrimary label="เพิ่มเกษตรกร" startIcon={<PersonAddIcon />} onClick={()=>gotoAddMember()} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper className="paper mg-t-0">
                                    <form className="root" noValidate autoComplete="off">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="name-input" defaultValue="" onChange={handleChangeName} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล" id="surname-input" defaultValue="" onChange={handleChangeSurname}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="id-number-input" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" value={inputData.idNum} onInput = {handleIDCard}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="เลขที่ดิน" id="contact-number-input" defaultValue="" onChange={handleChangeLoanNumber} />
                                            </Grid>
                                            <Grid item xs={12} md={12} className="txt-center">
                                                <ButtonFluidPrimary label="ค้นหา" onClick={()=>fetchSearchFarmer()} />   
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
                            <h2>ผลการค้นหา {tableResult.length || 0} รายการ</h2>
                        </Grid>
                        
                        { 
                            err ? 
                                <p className="err font-14">{errMsg}</p> 
                            : 
                                hasData ? 
                                    <Grid item xs={12} md={12}>
                                            <div className="table-box table-allcontractsearch1 mg-t-10">
                                                <TableContainer >
                                                    <Table aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center">ลำดับ</TableCell>
                                                                <TableCell align="center">ชื่อ นามสกุล</TableCell>
                                                                <TableCell align="center">
                                                                    เกรด
                                                                    <Tooltip title={<div>Y ไม่มีหนี้ค้าง<br />N มีหนี้ค้าง</div>} arrow placement="right">
                                                                        <IconButton>
                                                                            <InfoOutlinedIcon />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </TableCell>
                                                                <TableCell align="center">ยื่นคำขอ</TableCell>
                                                                <TableCell align="center">แก้ไขข้อมูล</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {
                                                                tableResult.length ? 
                                                                    (rowsPerPage > 0
                                                                        ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                        : tableResult
                                                                    ).map((cell,i) => (
                                                                    <TableRow key={i}>
                                                                        <TableCell align="center">{cell.FarmerID}</TableCell>
                                                                        <TableCell align="left">{cell.FrontName} {cell.Name} {cell.SirName}</TableCell>
                                                                        <TableCell align="center">{cell.FarmerGrade || '-'}</TableCell>
                                                                        <TableCell align="center">{
                                                                            cell.FarmerGrade ? 
                                                                                '-' 
                                                                            : 
                                                                                <ButtonFluidPrimary label="ยื่นคำขอ" maxWidth="120px" onClick={()=>gotoLoanRequestContact()} />
                                                                        }</TableCell>
                                                                        <TableCell align="center">
                                                                            <ButtonFluidPrimary label="แก้ไขข้อมูล" maxWidth="120px" onClick={()=>gotoEditMember()} />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                
                                                            ))
                                                            : 
                                                            <TableRow>
                                                                <TableCell colSpan={5} align="center">ไม่พบข้อมูล</TableCell>
                                                            </TableRow>
                                                        }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {
                                                    tableResult.length ? 
                                                        <TablePagination
                                                            rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                                            component="div"
                                                            count={tableResult.length}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                            labelRowsPerPage="แสดงจำนวนแถว"
                                                        />
                                                    : 
                                                    ''
                                                }
                                            </div>
                                            {/* Data Grid --------------------------------*/}
                                                {/* <div style={{ height: 400, width: '100%' }}>
                                                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                            </div> */}
                                        </Grid>
                                    
                                : 
                                    <Box className="table-no-result">
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            p={1}
                                            m={1}
                                            css={{ height: '100%' }}
                                        >
                                            <Box justifyContent="center" textAlign='center' alignItems="center" css={{ textAlign: 'center' }}>
                                                <Box p={1}>
                                                    ไม่มีข้อมูล
                                                </Box>
                                                <Box p={1}>
                                                    <ButtonNormalIconStartPrimary label="เพิ่มเกษตรกร" startIcon={<PersonAddIcon />} onClick={()=>gotoAddMember()} />
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                        }
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default SearchMemberPage;
