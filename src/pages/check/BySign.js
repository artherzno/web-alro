import React from 'react'
import { DatePicker, SortCheck, DisplayCheck, MainProjectSelect, SecondProjectSelect, LoanTypeSelect, LoanderTypeSelect, ObjectiveLoanSelect, LoanPlanSelect } from '../../components/check'
import { YearSelect} from '../../components/report'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import {
    MuiTextfield,
    MuiDatePicker,
    ButtonFluidPrimary,
} from '../../components/MUIinputs';
import { StyledTableCell, StyledTableCellLine, styles } from '../../components/report/HeaderTable'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/styles';
import TablePagination from '@material-ui/core/TablePagination';
import moment from 'moment'
import { formatNumber } from '../../utils/Utilities'
import { ButtonExportExcel } from '../../components'
import api from '../../services/webservice'
import { OverlayLoading } from '../../components'

class BySign extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            isLoading: false,
            loaded:true,
            isExporting:false,
            dateSelect:null,
            Date:"",
            ContractNo:"",
            ProjName:"",
            RetrieveYear:"",
            Order:"",
            Display:"",
            Name:"",
            SirName:"",
            data:[],
            page:0,
            count:10,
            totalResult: 0,
            dataSummary: {},
        }
    }

    componentDidMount(){

        this.loadData(this.state.page, this.state.count)
    }

    loadData(page, count) {

        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, Name, SirName} = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear||"");
        parameter.append('Order', Order);
        parameter.append('Name', Name);
        parameter.append('SirName', SirName);
        parameter.append('Display', Display);

        parameter.append('Page', page + 1);
        parameter.append('PageCount', count);


        this.setState({ isLoading: true })
        api.getContractPayment(parameter).then(response => {

            this.setState({
                data: response.data.data,
                dataSummary: response.data.dataSummary,
                isLoading: false,
                page: page,
                totalResult: response.data.totalResult
            })

        }).catch(error => {

            this.setState({ isLoading: false })
        })
    }

    exportExcel(){

        
        const { Date, ContractNo, ProjName, RetrieveYear, Order, Display, Name, SirName } = this.state

        const parameter = new FormData()
        parameter.append('Date', Date);
        parameter.append('ContractNo', ContractNo);
        parameter.append('ProjName', ProjName);
        parameter.append('RetrieveYear', RetrieveYear||'');
        parameter.append('Order', Order);
        parameter.append('Display', Display);
        parameter.append('Name', Name);
        parameter.append('SirName', SirName);
        
        this.setState({
            isExporting: true
        })


        api.exportContractPayment(parameter).then(response => {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ตรวจสอบงวดชำระตามสัญญา.xlsx');
            document.body.appendChild(link);
            link.click();

            this.setState({
                isExporting: false
            })

        }).catch(error => {

            this.setState({
                isExporting: false
            })

        })
    }

    onChange = (state) => (event) =>{

        this.setState({
            [state]:event.target.value
        },() =>{
            
        

        })

        
    }

    render() {

        const { classes } = this.props;
        const { data, page, count, dataSummary} = this.state


        return (
            <div>
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
                                    <h1>ตรวจสอบงวดชำระตามสัญญา</h1>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <MuiDatePicker label="วันที่" value={this.state.dateSelect} onChange={(event) =>{
                                                this.setState({ Date: moment(event).format("YYYY-MM-DD"), dateSelect:event},() =>{
                                                   
                                                })
                                            }}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="เลขที่สัญญา" onChange={this.onChange("ContractNo")}/>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <MuiTextfield label="ค้นหาชื่อโครงการ" onChange={this.onChange("ProjName")}/>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <YearSelect label="ดึงข้อมูลตั้งแต่ปีพ.ศ" onChange={this.onChange("RetrieveYear")} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={() => { this.loadData(0, this.state.count)}}/>
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={12} className="mg-t-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <SortCheck onChange={this.onChange("Order")}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <DisplayCheck onChange={this.onChange("Display")}/>
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="ชื่อ" onChange={this.onChange("Name")} />
                                        </Grid>
                                        <Grid item xs={12} md={3}>
                                            <MuiTextfield label="นามสกุล" onChange={this.onChange("SirName")} />
                                        </Grid>

                                        <Grid item xs={12} md={2}>
                                            <ButtonExportExcel handleButtonClick={() => { this.exportExcel() }} loading={this.state.isExporting} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        
                            <Box mt={2}>
                               <Paper>
                                    <TableContainer >
                                        <Table className={classes.table} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell align="center">รหัสบันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">Rid_it</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่บันทึก</StyledTableCell>
                                                    <StyledTableCell align="center">Mindex</StyledTableCell>
                                                    <StyledTableCell align="center">ลำดับ</StyledTableCell>
                                                    <StyledTableCell align="center">รหัสโครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">ชื่อโครงการ</StyledTableCell>
                                                    <StyledTableCell align="center">Prentno</StyledTableCell>
                                                    <StyledTableCell align="center">เลขที่สัญญา</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่ครบชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">ยอดชำระ</StyledTableCell>
                                                    <StyledTableCell align="center">Rate_r</StyledTableCell>
                                                    <StyledTableCell align="center">Pv_code</StyledTableCell>
                                                    <StyledTableCell align="center">วันที่แก้ไข</StyledTableCell>
                                                    <StyledTableCell align="center">Code</StyledTableCell>
                                                </TableRow>

                                            </TableHead>
                                            <TableBody>
                                                {data.map((element, index) => {

                                                    return (
                                                        <TableRow key={index}>
                                                            <StyledTableCellLine align="left">{element.saveCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.ridIt}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.recordingDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.mindex}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.orders}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.id}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.projName}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.prentno}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.contractNo}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.dueDate}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{formatNumber(element.amount)}</StyledTableCellLine>
                                                            <StyledTableCellLine align="right">{element.rateR}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.pvCode}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.dateE}</StyledTableCellLine>
                                                            <StyledTableCellLine align="left">{element.code}</StyledTableCellLine>


                                                        </TableRow>
                                                    )
                                                })}


                                                <TableRow>
                                                    <StyledTableCellLine colSpan={10} align="center" className={`${classes.cellBlue} ${classes.cellSummary}`}>
                                                        รวมทั้งสิ้น
                                                    </StyledTableCellLine>
                                                    <StyledTableCellLine align="right" className={`${classes.cellBlue} ${classes.cellSummary}`}>{formatNumber(dataSummary.amount)}</StyledTableCellLine>
                                                    <StyledTableCellLine align="left" colSpan={4} className={`${classes.cellBlue} ${classes.cellSummary}`}></StyledTableCellLine>

                                                </TableRow>

                                            </TableBody>
                                        </Table>



                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={this.state.totalResult}
                                        rowsPerPage={this.state.count}
                                        page={this.state.page}
                                        onPageChange={(e, newPage) => {

                                            this.loadData(newPage, this.state.count)
                                        }}
                                        onRowsPerPageChange={(event) => {

                                            this.setState({
                                                count: +event.target.value,
                                                page: 0
                                            }, () => {

                                                this.loadData(0, this.state.count)

                                            })
                                        }}
                                    />
                               </Paper>
                            </Box>

                        </Container>
                    </div>
                </Fade>
            </div>
        )
    }
}

export default withStyles(styles)(BySign)