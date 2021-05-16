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
import TablePagination from '@material-ui/core/TablePagination';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '163/00071', d: '00551', f: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', g: '00137/2562', h: '10/05/2019', i: '2287654478986', j: 'นาง', k: 'บัวลี', l: 'บางวิเศษ', m: '165 หมู่4 ตำบลหัวช้าง อำเภอจตุรพักตรพิมาน จังหวัดร้อยเอ็ด'},
]

// End All Data for DataGrid ---------------------------------------------//


function AllContractSearch() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setLoaded(true);
    }, [])

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
        <div className="loanrequestproject-page">
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
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาชื่อ-นามสกุล" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ค้นหาเลขที่สัญญา" defaultValue="" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table-box table-allcontractsearch1">
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
                                        <TableBody>
                                            {
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
                                            ))}
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
