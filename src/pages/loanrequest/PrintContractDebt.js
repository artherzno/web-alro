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
    ButtonFluidPrimary,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
    { a: 'RIET16310/00003', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์',},
]

// End All Data for DataGrid ---------------------------------------------//


function PrintContractDebt() {
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

    const gotoEditContactDebt = () => {
        history.push('/loanrequest/editcontractdebt');
    }
    
    const gotoPrintContactDebt = () => {
        history.push('/loanrequest/recordcontractdebt');
    }
    
    return (
        <div className="allcontractsearch-page">
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
                                        <MuiTextfield label="เลขที่สัญญาเดิม" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ชื่อเกษตรกร" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
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

export default PrintContractDebt
