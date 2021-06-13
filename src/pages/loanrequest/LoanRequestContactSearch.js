import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
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

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

function LoanRequestContactSearch() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const tableResult = [
        { a: '01/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '02/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '03/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '04/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '05/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '06/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '07/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '08/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '09/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '10/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '11/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
        { a: '12/07/2020', b: '3 8517 13368 44 4', c: 'นางชญาภา สลิลโรจน์' },
    ]


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
        <div className="loanrequestcontactsearch-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>คำขอกู้ยืมเงิน</h1>
                            </Grid>

                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ชื่อเกษตรกร" id="loanrequestcontactsearch-farmername-input" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="loanrequestcontactsearch-farmerid-input" defaultValue="" />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        {/* Field Date Picker ---------------------------------------------------*/}
                                        <MuiDatePicker label="วันที่ยื่นคำขอ" id="loanrequestcontactsearch-date-input" defaultValue="2017-05-24" />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <div className="table">
                                    <TableContainer className="table-box mg-t-10">
                                        <Table aria-label="normal table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell align="center">วันที่ยื่นคำขอ</TableCell>
                                                <TableCell align="center">เลขบัตรประจำตัวประชาชน</TableCell>
                                                <TableCell align="center">ชื่อเกษตรกร</TableCell>
                                                <TableCell align="center">Action</TableCell>
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
                                                        <TableCell align="center">
                                                            <ButtonNormalIconStartPrimary label="แก้ไข" onClick={()=>gotoAddLoanRequestContact()} />
                                                            <ButtonNormalIconStartPrimary label="ดูข้อมูล" onClick={()=>gotoAddLoanRequestContact()} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
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
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>
        </div>
    )
}

export default LoanRequestContactSearch
