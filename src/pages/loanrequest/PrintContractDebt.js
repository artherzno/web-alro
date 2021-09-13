import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function PrintContractDebt() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('ตกลงใช่หรือไม่')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);
    const [formField, setFormField] = useState(false)

    const [inputDataSearch, setInputDataSearch] = useState({
        Username: localStorage.getItem('cUsername'),
        LoanNumber:"",
        Name: "",
        IDCard: "",
        Status: ""
    })

    useEffect(() => {
        setLoaded(true);

        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log('checklogin',res)
                    let data = res.data;
                    if(data.code === 0) {
                        setErr(true);
                        if(Object.keys(data.message).length !== 0) {
                            console.error(data)
                            if(typeof data.message === 'object') {
                                setErrMsg('ไม่สามารถทำรายการได้')
                            } else {
                                setErrMsg([data.message])
                            }
                        } else {
                            setErrMsg(['ไม่สามารถทำรายการได้'])
                        }
                    }
                    // getSpkAllProject()
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();
    }, [])

    const getConvertDebtSearch = (loanID) => {
        setIsLoading(true);
        // setRows([])

        axios.post(
            `${server_spkapi}/GetConvertDebt/GetMain`, {
                Username: inputDataSearch.Username.toString(),
                LoanNumber: inputDataSearch.LoanNumber.toString(),
                Name: inputDataSearch.Name.toString(),
                IDCard: inputDataSearch.IDCard.toString(),
                Status: inputDataSearch.Status.toString()
              }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('GetData',res.data)
            let data = res.data;
            // setInputData(data)
            // console.log('inputData',inputData)
            if(data.code === 0 || res === null || res === undefined) {
                setErr(true);
                if(Object.keys(data.message).length !== 0) {
                    console.error(data)
                    if(typeof data.message === 'object') {
                        setErrMsg('ไม่สามารถทำรายการได้')
                    } else {
                        setErrMsg([data.message])
                    }
                } else {
                    setErrMsg(['ไม่สามารถทำรายการได้'])
                }
            }else {
                setIsLoading(false)
                console.log('get_main',data)
                
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }

    const gotoEditContactDebt = () => {
        history.push('/loanrequest/editcontractdebt');
    }
    
    const gotoPrintContactDebt = () => {
        history.push('/loanrequest/recordcontractdebt');
    }
    
    return (
        <div className="allcontractsearch-page">
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
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>สัญญาแปลงหนี้</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="เลขที่สัญญาเดิม" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ชื่อเกษตรกร" name="Name" value={inputDataSearch.Name} onChange={handleInputDataSearch}/>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" name="IDCard" value={inputDataSearch.IDCard} onChange={handleInputDataSearch} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={getConvertDebtSearch} />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">เลขที่สัญญาเดิม</TableCell>
                                                <TableCell align="left">เลขบัตรประจำตัวประชาชน</TableCell>
                                                <TableCell align="left">ชื่อเกษตรกร</TableCell>
                                                <TableCell align="left" className="tb-w-14em">&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={4} align="left">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                (rowsPerPage > 0
                                                    ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : tableResult
                                                  ).map((row,i) => (
                                                <TableRow key={i}>
                                                        <TableCell align="left">{row.a}</TableCell>
                                                        <TableCell align="left">{row.b}</TableCell>
                                                        <TableCell align="left">{row.c}</TableCell>
                                                    <TableCell align="left" className="tb-w-24em">
                                                            <ButtonNormalIconStartPrimary label="แก้ไข" onClick={()=>gotoEditContactDebt()} />
                                                            <ButtonNormalIconStartPrimary label="ออกสัญญาแปลงหนี้" onClick={()=>gotoPrintContactDebt()}  />
                                                </TableCell>
                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default PrintContractDebt
