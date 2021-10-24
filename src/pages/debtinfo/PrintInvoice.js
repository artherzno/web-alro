import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../App';

import { makeStyles } from '@material-ui/styles';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../services/webservice'
import moment from 'moment'

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { dateFormatTensiveMenu, formatNumber, formatNumberInt } from '../../utils/Utilities';
import { ButtonExport, OverlayLoading } from '../../components';



// End All Data for DataGrid ---------------------------------------------//


function PrintInvoice() {
    const isMounted = useRef(null);

    let siteprint = localStorage.getItem('siteprint')
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [loaded, setLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [start_date, setStartDate] = useState(null)
    const [startDateSelect, setStartDateSelect] = useState(null)
    const [printList, setPrintList] = useState([])
    const [isExporting, setIsExporting] = useState(false)

    const [page, setPage] = useState(0)
    const [pageCount,setPageCount] = useState(10)

    // Variable for Checkbox in Table
    const [inputSelectDate, setInputSelectDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

    useEffect(() => {
        setLoaded(true);
        getPrintInvoice()
    }, [])

    const handlePrintExcel = () => {
        let printDate = (inputSelectDate.yyyy - 543) + '-' + inputSelectDate.mm + '-' + inputSelectDate.dd
        console.log('printDAte', printDate.toString())
        const startDateValue = new FormData()
        startDateValue.append('startDate', printDate.toString());
        let url = `${siteprint}/api/ExportServices/ExportPrintInvoiceAll`; //your url

        axios.post(url, startDateValue,
            {
                headers:
                {
                    'Content-Disposition': "attachment; filename=template.xlsx",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'template.xlsx');
            document.body.appendChild(link);
            link.click();
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
            .finally(() => {
                if (isMounted.current) {
                    setIsLoading(false)
                }
            });
    }

    function getPrintInvoice() {

        const parameter = {
            start_date: start_date
        }

        setIsLoading(true)

        api.getPrintInvoice(parameter).then(response => {
            setPrintList(response.data)
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
        })
    }

    function getInvoicePayPdf() {

   
        const parameter = new FormData()
        parameter.append('InvoiceNo', start_date || '');


        setIsExporting(true)

        api.getInvoicePayPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'พิมพ์สรุปใบแจ้งหนี้ + ชำระ.pdf');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    function getInvoiceByContactPdf(){

        const parameter = new FormData()
        parameter.append('InvoiceNo', start_date || '');


        setIsExporting(true)

        api.getInvoicePayPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'พิมพ์สรุปใบแจ้งหนี้รายสัญญา.pdf');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })


    }

    function getInvoiceByProjectPdf() {

        const parameter = new FormData()
        parameter.append('InvoiceNo', start_date || '');


        setIsExporting(true)

        api.getInvoiceByProjectPdf(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'พิมพ์สรุปใบแจ้งหนี้รายโครงการ.pdf');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })


    }

    function exportPrintInvoiceAll(){
       
        const parameter = new FormData()
        parameter.append('startDate', start_date || '');


        setIsExporting(true)

        api.exportPrintInvoiceAll(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ใบแจ้งหนี้ > XLS.xlsx');
            document.body.appendChild(link);
            link.click();

            setIsExporting(false)

        }).catch(error => {

            setIsExporting(false)

        })

    }

    return (
        <div className="printinvoice-page">
            <OverlayLoading isLoading={isLoading} />
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">
                                <h1>รายงานใบแจ้งหนี้</h1>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* <MuiTextfield label="ตรวจสอบวันที่ประมวล" defaultValue="Wednesday, September 12" /> */}

                                        <MuiDatePicker label="ตรวจสอบวันที่ประมวล" value={startDateSelect} onChange={(event) => {

                                            setStartDate(moment(event).format("YYYY-MM-DD"))
                                            setStartDateSelect(event)

                                        }} />

                                    </Grid>
                                    {/* <Grid item xs={12} md={2}>
                                        <MuiTextfield label="&nbsp;" defaultValue="เงินกู้" />
                                    </Grid> */}
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => { getPrintInvoice() }} />
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="table-box max-h-300 mg-t-10">
                                    <Paper>
                                        <TableContainer >
                                            <Table aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">รหัสบันทึก</TableCell>
                                                        <TableCell align="left">วันที่บันทึก</TableCell>
                                                        <TableCell align="left">วันที่ประมวล</TableCell>
                                                        <TableCell align="left">เลขที่ใบเตือนหนี้</TableCell>
                                                        <TableCell align="left">จำนวนเงินรวม</TableCell>
                                                        <TableCell align="center">ใบแจ้งหนี้ที่</TableCell>
                                                        <TableCell align="left">ประจำเดือน</TableCell>
                                                        <TableCell align="left">ราย</TableCell>
                                                        <TableCell align="left">No</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>{/* // clear mockup */}

                                                    {printList.length <= 0 ? <TableRow>
                                                        <TableCell colSpan={9} align="left">ไม่พบข้อมูล</TableCell>
                                                    </TableRow> : printList.map((element, index) => {

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell align="left">{element.voucher}</TableCell>
                                                                <TableCell align="left">{dateFormatTensiveMenu(element.mdate)}</TableCell>
                                                                <TableCell align="left">{dateFormatTensiveMenu(element.start_date)}</TableCell>
                                                                <TableCell align="left">{element.ref_id}</TableCell>
                                                                <TableCell align="left">{formatNumber(element.Total)}</TableCell>
                                                                <TableCell align="left">{element.cmonth}</TableCell>
                                                                <TableCell align="left">{element.ref_name}</TableCell>
                                                                <TableCell align="left">{'API ไม่มีค่ามา'}</TableCell>
                                                                <TableCell align="left">{formatNumberInt(element.Num)}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={printList.length}
                                            rowsPerPage={pageCount}
                                            page={page}
                                            onPageChange={(e, newPage) => {

                                               setPage(newPage)
                                            }}
                                            onRowsPerPageChange={(event) => {

                                        
                                                setPage(0)
                                                setPageCount(+event.target.value)
                                            }}
                                        />

                                    </Paper>


                                </div>
                                {/* Data Grid --------------------------------*/}
                                {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <ButtonExport label="พิมพ์สรุปใบแจ้งหนี้ + ชำระ" handleButtonClick={() => { getInvoicePayPdf() }} loading={isExporting} />

                            </Grid>
                            <Grid item xs={12} md={3} >
                                <ButtonExport label="พิมพ์สรุปใบแจ้งหนี้รายสัญญา" handleButtonClick={() => { getInvoiceByContactPdf() }} loading={isExporting} />
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <ButtonExport label="พิมพ์สรุปใบแจ้งหนี้รายโครงการ" handleButtonClick={() => { getInvoiceByProjectPdf() }} loading={isExporting} />
                            </Grid>
                            <Grid item xs={12} md={3} >
                                <ButtonExport label="ใบแจ้งหนี้ > XLS" handleButtonClick={() => { exportPrintInvoiceAll() }} loading={isExporting} />
                            </Grid>
                      
                        </Grid>
                    </Container>

                
                </div>
            </Fade>

        </div>
    )
}

export default PrintInvoice
