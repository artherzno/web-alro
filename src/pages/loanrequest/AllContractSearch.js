import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';
import { useForm, Controller } from 'react-hook-form';

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
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiSelect,
    MuiTextfield,
    MuiDatePicker,
    MuiSelectObjYear,
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = []

// End All Data for DataGrid ---------------------------------------------//


function AllContractSearch() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    const { handleSubmit, control } = useForm();

    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [tableResult, setTableResult] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const headCells = [
        { id: 'xxx_1', numeric: true, disablePadding: true, label: '' },
        { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
        { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
        { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
        { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
    ];

    const rows = [
        { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3},
        { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9},
        { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0},
        { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0},
        { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9},
        { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5},
        { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3},
        { name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0},
        { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0},
        { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0},
        { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0},
        { name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein:37.0},
        { name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0},
    ];

    const rowsLabel = [
        'name', 'calories', 'fat', 'carbs', 'protein'
    ]

    useEffect(() => {
        setLoaded(true);
        getDebtSettlement()
    }, [])

    const getDebtSettlement = () => {
        
        axios({
            url: `${server_spkapi}/DebtSettlement/GetData`, //your url
            method: 'POST',
            data: {
                Username: "sample string 1",
                FarmerName: "sample string 2",
                Date: "2021-08-20T22:21:42.3713316+07:00",
                LoanNumber: "sample string 4",
                ProjectName: "sample string 5",
                StartYear: "2021-08-20T22:21:42.3713316+07:00",
                Type: 7
            }
        }).then(res => {
                console.log(res)
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
                }else {
                    console.log('Get DebtSettlement:',data[0])
                    
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const gotoAddLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
    }
    
    return (
        <div className="allcontractsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>สัญญาทั้งหมด</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่"  />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ค้นหาชื่อโครงการ" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelectObjYear label="ดึงข้อมูลตั้งแต่ปี" valueYaer={10} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiSelect label="จัดเรียงตาม" listsValue={['โครงการ','สัญญา','mindex มากไปน้อย','mindex น้อยไปมาก','วันที่บันทึกข้อมูล']} lists={['โครงการ', 'สัญญา', 'mindex มากไปน้อย','mindex น้อยไปมาก','วันที่บันทึกข้อมูล']} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <MuiSelect label="แสดง" listsValue={['ทั้งหมด','ค้างชำระ','จ่ายเงินครบ']} lists={['ทั้งหมด', 'ค้างชำระ', 'จ่ายเงินครบ']} />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <p>&nbsp;</p>
                                        <ButtonNormalIconStartPrimary label="Export to Excel" startIcon={<i className="far fa-file-excel"></i>} />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {/* <div className="table-box table-allcontractsearch1 mg-t-10">
                                    <MUItable headCells={headCells} rows={rows} rowsLabel={rowsLabel} hasCheckbox={false} hasAction={true} actionView={true} actionEdit={true} actionDelete={true} />
                                </div> */}
                                <div className="table-box table-allcontractsearch1 mg-t-10">
                                <TableContainer >
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">รหัสบันทึก</TableCell>
                                                <TableCell align="center">วันที่บันทึก</TableCell>
                                                <TableCell align="center">เลขคำขอ</TableCell>
                                                <TableCell align="center">รหัสโครงการ</TableCell>
                                                <TableCell align="center">ชื่อโครงการ</TableCell>
                                                <TableCell align="center">เลขที่สัญญา</TableCell>
                                                <TableCell align="center">วันที่กู้</TableCell>
                                                <TableCell align="center">เลขบัตรประชาชน</TableCell>
                                                <TableCell align="center">คำนำหน้า</TableCell>
                                                <TableCell align="center">ชื่อ</TableCell>
                                                <TableCell align="center">นามสกุล</TableCell>
                                                <TableCell align="center">ที่อยู่</TableCell>
                                                <TableCell align="center" className="sticky tb-w-14em">&nbsp;</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>{/* // clear mockup */}
                                            <TableRow>
                                                <TableCell colSpan={13} align="center">ไม่พบข้อมูล</TableCell>
                                            </TableRow>
                                            
                                            {/* {
                                                (rowsPerPage > 0
                                                    ? tableResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : tableResult
                                                  ).map((row,i) => (
                                                <TableRow key={i}>
                                                   <TableCell align="center">{row.a}</TableCell>
                                                        <TableCell align="center">{row.b}</TableCell>
                                                        <TableCell align="center">{row.c}</TableCell>
                                                        <TableCell align="center">{row.d}</TableCell>
                                                        <TableCell align="center">{row.f}</TableCell>
                                                        <TableCell align="center">{row.g}</TableCell>
                                                        <TableCell align="center">{row.h}</TableCell>
                                                        <TableCell align="center">{row.i}</TableCell>
                                                        <TableCell align="center">{row.j}</TableCell>
                                                        <TableCell align="center">{row.k}</TableCell>
                                                        <TableCell align="center">{row.l}</TableCell>
                                                        <TableCell align="center">{row.m}</TableCell>
                                                    <TableCell align="center" className="sticky tb-w-24em">
                                                            <ButtonNormalIconStartPrimary label="แก้ไข" onClick={()=>gotoAddLoanRequestContact()} />
                                                            <ButtonNormalIconStartPrimary label="พิมพ์การ์ดรายสัญญา" />
                                                </TableCell>
                                                </TableRow>
                                            ))} */}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={tableResult.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                        labelRowsPerPage="แสดงจำนวนแถว"
                                    />
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default AllContractSearch
