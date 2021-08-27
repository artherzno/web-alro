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

import { MUItable } from '../../components/MUItable'

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
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [tableResult, setTableResult] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rows, setRows] = useState([]);

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

    const headCells = [
        { id: 'FarmerID', numeric: false, disablePadding: true, label: 'ลำดับ' },
        { id: 'Name', numeric: true, disablePadding: false, label: 'ชื่อ นามสกุล' },
        { id: 'FarmerGrade', numeric: true, disablePadding: false, label: 'เกรด (Y = ไม่มีหนี้ค้าง, N = มีหนี้ค้าง)' },
    ];

    const rowsLabel = [
        'FarmerID', 'Name', 'FarmerGrade'
    ]

    function createData( FarmerID, Name, FarmerGrade,) {
        return { 
            FarmerID,
            Name,
            FarmerGrade,
         };
    }

    useEffect(() => {
        // console.log(document.cookie)
        async function fetchCheckLogin() {
            const res = await fetch(`${server_hostname}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "token": token
                }
            })
            res
            .json()
            .then(res => {
                // console.log(res.statuscode)
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

        // console.log(tableResult)

    }, [])

    async function fetchSearchFarmer() {
        setTableResult([])
        setIsLoading(true)
        // console.warn('Cookie', document.cookie)
        const res = await fetch(`${server_hostname}/admin/api/search_farmer`, {
            method: 'POST',
            body: JSON.stringify(inputData),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": token
            }
        }); 

        res
        .json()
        .then(res => {
            setIsLoading(false)

            if (res.code === 0 || res === null || res === undefined ) {
                setIsLoaded(true);
                setErr(true);
            //   history.push('/error');
                if(Object.keys(res.message).length !== 0) {
                    setErrMsg([res.message])
                } else {
                    setErrMsg(['ไม่สามารถทำรายการได้'])
                }
            } else {
                setHasData(true);
                setIsLoaded(true);
                // setTableResult(res.data);
                console.log(res.data);
                setRows(res.data.map((item,i)=>
                    createData(
                        item.FarmerID,
                        item.FrontName+' '+item.Name+' '+item.Sirname,
                        item.FarmerGrade ? item.FarmerGrade : '-'
                    )
                ))

                // history.push('/home');
                // setDataCampaign(data); // from local
            }

        })
        .catch(err => {
            console.log(err);
            setIsLoaded(true);
            setErr(true);
            history.push('/');
        });
    }

    const handleChangeName = (event) => {
        setInputData({...inputData,
            Name: event.target.value
        })
        // console.log('Name ',event.target.value)
    };
    
    const handleChangeSurname = (event) => {
        setInputData({...inputData,
            Sirname: event.target.value
        })
        // console.log('Sirname ',event.target.value)
    };

    // Input ID Number
    const handleIDCard = (event) => {
        // Check digit tel number
        event.target.value = event.target.value.toString().slice(0,13)
        setInputData({...inputData,
            IDCard: event.target.value
        })
        // console.log('idNum ',event.target.value)
    }
    // End Input ID Number
 
    const handleChangeLoanNumber = (event) => {
        setInputData({...inputData,
            LoanNumber: event.target.value
        })
        // console.log('LoanNumber ',event.target.value)
    };

    const handleChangePage = (event, newPage) => {
        // console.log('newPage', newPage)
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Link another page
    const gotoAddMember = () => {
        history.push('/manageinfo/addfarmer');
    }

    const gotoEditMember = (id) => {
        history.push(
        {
            pathname: '/manageinfo/editfarmer',
            state: { FarmerID: id || 0 }
          }
        );
    }

    const gotoLoanRequestContact = (id, action) => {
        history.push({
            pathname: '/loanrequest/loanrequestcontact',
            state: { 
                FarmerID: id, 
                activeStep: 0,
                completed: {},
                action: action,
            }
          });
    }

    return (
        <div className="search-page">
            {
                isLoading ? 
                <div className="overlay">
                    <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังค้นหาข้อมูล...</p>
                </div> : 
                ''
            }
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
                                                <MuiTextfield label="เลขที่สัญญา" id="contact-number-input" defaultValue="" onChange={handleChangeLoanNumber} />
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
                            <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                        </Grid>
                        
                        <div className="table-box table-allcontractsearch1 mg-t-10">
                            <MUItable 
                                headCells={headCells} 
                                rows={rows} 
                                rowsLabel={rowsLabel} 
                                colSpan={36} 
                                hasCheckbox={false} 
                                hasAction={true} 
                                actionEdit={true}
                                editEvent={gotoEditMember}
                                editParam={'FarmerID'}
                                actionRequest={true} 
                                requestEvent={gotoLoanRequestContact}
                                requestParam1={'FarmerID'}
                                requestParam2={'add'}
                            />
                        </div>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default SearchMemberPage;
