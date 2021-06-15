import React from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ProvinceSelect, DisplaySelect, DisplayMonthSelect, MonthSelect, YearSelect, TypeBillSelect } from '../../components/report'
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
import api from '../../services/webservice'

class ListFarmPayLoanTab extends React.Component {

    constructor(props){

        super(props)

        this.state = {
            farmerPayLoanList:[],
            displaySection:"",
            section:0,
            province:0

        }
    }

    componentDidMount() {


        this.loadPayLoan()
    }

    loadPayLoan() {

        const parameter = new FormData()
        parameter.append('Display1', '1');
        parameter.append('Month', '1');
        parameter.append('Year', '2563');
        parameter.append('ReceiptType', '1');
        parameter.append('ALROProvince', '1');
        parameter.append('ZoneProvince', '1');
        parameter.append('Display2', '1');
        parameter.append('StartDate', '2021-05-26');
        parameter.append('EndDate', '2021-05-26');

        api.getPayLoan(parameter).then(response => {

            console.log("response", response.data)

            this.setState({
                farmerPayLoanList: response.data.data
            })

        }).catch(error => {

        })
    }

    render() {

        const { classes} = this.props;

        return (<div>
            <Grid container spacing={2}>

                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplaySelect />
                        </Grid>
                      
                    </Grid>

                </Grid>
                <Grid item/>
                <Grid item>
                    <Grid container spacing={2}>
                        <Grid item>
                            <DisplayMonthSelect />
                        </Grid>
                       
                    </Grid>
                </Grid>

                <Grid item />
                <Grid item>
                    <Grid container spacing={2}>

                        <Grid item>
                            <TypeBillSelect />
                        </Grid>
                        
                    </Grid>
                </Grid>

            </Grid>

            <div>
                <Box mt={5} mb={5}>
                    <Typography variant="h6" align="center">บัญชีรายชื่อเกษตรกรที่ชำระเงินกู้ จังหวัดกรุงเทพ</Typography>
                    <Typography variant="h6" align="center">เดือนมกราคม 2563</Typography>
                    <Typography variant="h6" align="center">ประเภทใบเสร็จรับเงิน ส.ป.ก.จังหวัด</Typography>
                </Box>
            </div>
            <Grid container>
                <Grid item xs>

                </Grid>

                <Grid item>
                    <Button variant="contained" color="primary"><Box mr={1}><i className="far fa-file-excel"></i> </Box>Export to Excel</Button>
                </Grid>
            </Grid>

            <Box mt={2}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center" rowSpan={2}>ลำดับที่</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>บัตรประชาชน</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>สัญญาเลขที่</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชื่อ-นามสกุล</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เลขที่ใบแจ้งหนี้</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}><div><Typography align="center" variant="body2">ว/ด/ป</Typography><Typography align="center" variant="body2">ใบเสร็จ</Typography></div></StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เลขที่ใบเสร็จ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ช่องทางการชำระเงิน</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชำระเงินกู้</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>เงินต้น</StyledTableCell>
                                <StyledTableCell align="center" colSpan={2}> ค้างรับ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ค่าปรับ</StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>ชำระเกิน</StyledTableCell>
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">ค้างรับ</StyledTableCell>
                                <StyledTableCell align="center">รับ</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.farmerPayLoanList.map((farmer,index) =>{

                                return(
                                    <TableRow key={index}>
                                        <StyledTableCellLine component="th" scope="row">
                                            {farmer.no}
                                </StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.idCard}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.contractNo}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.fullName}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.invoiceNo}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.receiptDate}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.receiptNo}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.payChannel}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.payLoan}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.principle}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.overdueAmount}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.amount}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.remaining}</StyledTableCellLine>
                                        <StyledTableCellLine align="center">{farmer.overPaid}</StyledTableCellLine>
                                    </TableRow>
                                )
                            })}
                            
                            
                            <TableRow  >
                                <StyledTableCellLine className={classes.cellSummary} colSpan={8} align="right">รวมทั้งสิ้น</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                               
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                                <StyledTableCellLine className={classes.cellSummary} align="center">xxx</StyledTableCellLine>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>)
    }
}

export default withStyles(styles)(ListFarmPayLoanTab)