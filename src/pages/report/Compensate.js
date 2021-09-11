import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect, SectionSelect, ApproveStatusSelect } from '../../components/report'
import {
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import TablePagination from '@material-ui/core/TablePagination';
import { OverlayLoading } from '../../components'

class Compensate extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            isLoading: false,
            isExporting: false,
            loaded:true,
            dataList: [],
            dateSelect: null,
            OrderNo:"", 
            ContratNo: "",
            DateOrder: "",
            FarmerName: "",
            PayerName: "",
            IDPayer: "",
            page: 0,
            count: 10

        }
    }

    componentDidMount() {


        this.loadData()
    }

    loadData() {

        const { OrderNo, ContratNo, DateOrder, FarmerName, PayerName, IDPayer,  } = this.state

        const parameter = new FormData()
        parameter.append('OrderNo', OrderNo);
        parameter.append('ContratNo', ContratNo);
        parameter.append('DateOrder', DateOrder);
        parameter.append('FarmerName', FarmerName);
        parameter.append('PayerName', PayerName);
        parameter.append('IDPayer', IDPayer);

        this.setState({ isLoading: true })
        api.getCompensate(parameter).then(response => {

            this.setState({
                dataList: response.data.data,
                isLoading: false
            })

        }).catch(error => {
            this.setState({ isLoading: false })
        })
    }

    
    onChange = (state) => (event) => {

        this.setState({
            [state]: event.target.value
        }, () => {

           

        })


    }


    render() {

        const { classes } = this.props;
        const { dataSummary, page, count } = this.state

        return (<div>
            <OverlayLoading isLoading={this.state.isLoading} />
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={this.state.loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page">
                               
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่คำสั่ง" onChange={this.onChange("OrderNo")} />
                                    </Grid>

                                    <Grid item xs={12} md={3}>
                                        <MuiDatePicker label="วันที่คำสั่ง" value={this.state.dateSelect} onChange={(event) => {
                                            this.setState({ DateOrder: moment(event).format("YYYY-MM-DD"), dateSelect: event }, () => {
                                               
                                            })
                                        }} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อ-สกุล ผู้ชดใช้หนี้แทน" onChange={this.onChange("PayerName")} />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่ประจำตัวประชาชนผู้ชดใช้หนี้แทน" onChange={this.onChange("IDPayer")} />
                                    </Grid>



                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} className="mg-t-0">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="เลขที่สัญญาของเกษตรกร" onChange={this.onChange("ContratNo")} />
                                    </Grid>


                                    <Grid item xs={12} md={2}>
                                        <MuiTextfield label="ชื่อ-สกุล เกษตรกร" onChange={this.onChange("FarmerName")} />
                                    </Grid>

                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" onClick={() => {
                                            this.loadData()
                                        }} />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <div>
                            <Box mt={5} mb={5}>
                                <Typography variant="h6" align="center">รายงานการชดใช้หนี้แทนเกษตรกร</Typography>
                            </Box>
                        </div>
           

                        <Box mt={2}>
                            <Paper>
                                <TableContainer>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>

                                                <StyledTableCell align="center" >ลำดับ</StyledTableCell>
                                                <StyledTableCell align="center" >คำสั่งเลขที่</StyledTableCell>
                                                <StyledTableCell align="center" >สัญญาเลขที่</StyledTableCell>
                                                <StyledTableCell align="center" >เลขประจำประชาชน</StyledTableCell>
                                                <StyledTableCell align="center" >ชื่อ-สกุล ผู้ชดใช้หนี้แทน</StyledTableCell>
                                                <StyledTableCell align="center" >จำนวนเงินที่ชดใช้</StyledTableCell>
                                                <StyledTableCell align="center" >อัตตราดอกเบี้ยต่อปี</StyledTableCell>
                                                <StyledTableCell align="center" >จำนวนงวดที่ต้องชำระ</StyledTableCell>
                                                <StyledTableCell align="center" >รายละเอียดการชำระเงิน</StyledTableCell>

                                            </TableRow>
                                          

                                        </TableHead>
                                        <TableBody>
                                            { 
                                                this.state.dataList.slice(page * count, page * count + count).map((data, index) => {

                                                return (
                                                    <TableRow key={index}>
                                                        <StyledTableCellLine align="center">{data.no}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{data.orderNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{data.contratNo}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{data.idCard}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">{data.payerName}</StyledTableCellLine>
                                                        <StyledTableCellLine align="right">{formatNumber(data.amount)}</StyledTableCellLine>
                                                        <StyledTableCellLine align="right">{data.interestRatePerYear}</StyledTableCellLine>
                                                        <StyledTableCellLine align="right">{data.installments}</StyledTableCellLine>
                                                        <StyledTableCellLine align="left">
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                onClick={() =>{
                                                                    this.props.history.push(`/report/payment/detail/${data.contratNo}`)
                                                                }}
                                                            >
                                                                ดูรายละเอียด
                                                            </Button>
                                                        </StyledTableCellLine>

                                                    </TableRow>
                                                )
                                            })}

                                            
                                        </TableBody>
                                    </Table>

                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={this.state.dataList.length}
                                    rowsPerPage={this.state.count}
                                    page={this.state.page}
                                    onPageChange={(e, newPage) => {

                                        this.setState({
                                            page: newPage
                                        })
                                    }}
                                    onRowsPerPageChange={(event) => {

                                        this.setState({
                                            count: +event.target.value,
                                            page: 0
                                        })
                                    }}
                                />
                            </Paper>
                        </Box>

                    </Container>
                </div>
            </Fade>


        </div>)
    }
}

export default withStyles(styles)(Compensate)