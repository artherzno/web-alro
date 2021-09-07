import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';


import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiTextfield,
    MuiDatePicker,
    MuiCheckbox,
    MuiSelect,
    MuiTextfieldEndAdornment,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable';


// All Data for DataGrid & Table ---------------------------------------------//

const tableResult = [
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
    { a: 'RIET16310/00002', b: '13/07/2020', c: '00058', d: 'เพื่อส่งเสริมการปลูกข้าวหอมมะลิ', f: '00013/2552', g: '13/07/2020', h: '2559/00000303', i: '986.30', j: '13.70', k: '',l: '19', m: 'PNGA0005800013/2552', n: '986.30', o: '986.30'},
]

// End All Data for DataGrid ---------------------------------------------//
 
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
    return -1;
    }
    if (b[orderBy] > a[orderBy]) {
    return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'no', numeric: false, disablePadding: true, label: 'รหัสบันทึก' },
    { id: 'date', numeric: true, disablePadding: false, label: 'วันที่บันทึก' },
    { id: 'pro_code', numeric: true, disablePadding: false, label: 'รหัสโครงการ' },
    { id: 'pro_name', numeric: true, disablePadding: false, label: 'ชื่อโครงการ' },
    { id: 'no_contact', numeric: true, disablePadding: false, label: 'สัญญาเลขที่' },
    { id: 'date_bill', numeric: false, disablePadding: true, label: 'วันที่ใบเสร็จ' },
    { id: 'no_bill', numeric: true, disablePadding: false, label: 'เลขที่ใบเสร็จ' },
    { id: 'money1', numeric: true, disablePadding: false, label: 'เงินต้น' },
    { id: 'money2', numeric: true, disablePadding: false, label: 'ดอกเบี้ย' },
    { id: 'money3', numeric: true, disablePadding: false, label: 'ค่าปรับ' },
    { id: 'item', numeric: false, disablePadding: true, label: 'item' },
    { id: 'mindex', numeric: true, disablePadding: false, label: 'Mindex' },
    { id: 'pcapital', numeric: true, disablePadding: false, label: 'Pcapital' },
    { id: 'pcap1', numeric: true, disablePadding: false, label: 'Pcap_1' },
];
function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
    };

    return (
    <TableHead>
        <TableRow>
        {/* <TableCell padding="checkbox">
            <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
            />
        </TableCell> */}
        {headCells.map((headCell) => (
            <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            >
            <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
            >
                {headCell.label}
                {/* {orderBy === headCell.id ? (
                <span>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                ) : null} */}
            </TableSortLabel>
            </TableCell>
        ))}
        </TableRow>
    </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

function PrintBillBank() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [dense, setDense] = React.useState(false);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
        );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


    useEffect(() => {
        setLoaded(true);
    }, [])

    const gotoAddLoanRequestContact = () => {
        history.push('/loanrequest/loanrequestcontact');
    }


    const handleSubmit = (event) => {
        event.preventDefault();
    
        // if (value === 'best') {
        //   setHelperText('You got it!');
        //   setError(false);
        // } else if (value === 'worst') {
        //   setHelperText('Sorry, wrong answer!');
        //   setError(true);
        // } else {
        //   setHelperText('Please select an option.');
        //   setError(true);
        // }
    };
    
    return (
        <div className="printbillbank-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>พิมพ์ใบเสร็จรับเงินจากธนาคาร</h1>
                            </Grid>


                            <Grid item xs={12} md={12} className="mg-t-20">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="สัญญาเลขที่"   />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        {/* Field Text ---------------------------------------------------*/}
                                        <MuiTextfield label="ชื่อโครงการ" />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <MuiTextfield label="ชื่อ - นามสกุล" />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <p>&nbsp;</p>
                                        <ButtonFluidPrimary label="ค้นหา" />  
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                {/* <div className="table-box mg-t-10">
                                    <MUItable />
                                </div> */}
                                <div className="table-box mg-t-10">
                                    <TableContainer >
                                    <Table aria-label="simple table">
                                        <EnhancedTableHead
                                            // classes={classes}
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={rows.length}
                                        />
                                        
                                        <TableBody>
                                            {stableSort(rows, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const isItemSelected = isSelected(row.name);
                                                    const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={(event) => handleClick(event, row.name)}
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={row.name}
                                                        selected={isItemSelected}
                                                    >
                                                        {/* <TableCell padding="checkbox">
                                                            <Checkbox
                                                            checked={isItemSelected}
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                            />
                                                        </TableCell> */}
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {row.xxx}
                                                        </TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                        <TableCell align="left">{row.xxx}</TableCell>
                                                    </TableRow>
                                                );
                                                })}
                                            {emptyRows > 0 && (
                                                <TableRow style={{ height: emptyRows }}>
                                                        <TableCell colSpan={14} align="left">ไม่พบข้อมูล</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </div>
                                {/* Data Grid --------------------------------*/}
                                    {/* <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                                </div> */}
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>

                                {/* Paper 1 - -------------------------------------------------- */}
                                <Paper className="paper line-top-green paper mg-t-20">
                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่บันทึก" disabled defaultValue="PNGA0001600005/00001" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่บันทึก"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <p>รหัสจังหวัด</p>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                    <Grid item xs={12} md={5}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใบแจ้งหนี้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                        <p>รับเงินผ่านธนาคาร</p>
                                                <Grid container>
                                                    <Grid item xs={12} md={1}>
                                                        <MuiCheckbox label=""  />
                                                    </Grid>
                                                    <Grid item xs={12} md={11}>
                                                        <MuiTextfield label=""  defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="โครงการ"  lists={['00001','00002','00003']} />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ใช้เงินตามแผนปี"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="สัญญาเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่สัญญา"  defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทกู้ยืม"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="หมวดโครงการ"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="ประเภทเงินกู้"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;"  defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="เลขบัตรประจำตัวประชาชน" id="" defaultValue="3-4535-22345-56-0" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiSelect label="คำนำหน้า"  lists={['นาย','นาง','นางสาว']} />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ชื่อ" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="นามสกุล" defaultValue="สมชาย" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่รับเงินกู้" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="จำนวนเงินให้กู้" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="อัตราค่าปรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiDatePicker label="วันที่จัดทำ" defaultValue="2017-05-15" />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={3}>
                                                        <p>&nbsp;</p>
                                                        <ButtonFluidPrimary label="เรียงตามสัญญา" />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <p>&nbsp;</p>
                                                        <ButtonFluidPrimary label="เรียงตามโครงการ" />
                                                    </Grid> */}
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} md={12}>
                                                <Grid container>
                                                    <Grid item xs={12} md={9}>
                                                        <MuiTextfield label="หมายเหตุ" defaultValue="" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เล่มที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ครั้งที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ล่าสุด" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="ใบเสร็จเลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiTextfield label="เลขที่" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ใบเสร็จ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่คำนวณ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ชำระ" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="mg-t-20">
                                                    <Grid item xs={12} md={12}>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">จำนวนเงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">จำนวนเงินต้นที่ต้องชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <ButtonFluidPrimary label="คำนวณเงินชำระ" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">จำนวนเงินที่ชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                                <Grid item xs={12} md={3}>
                                                                    <ButtonFluidPrimary label="คำนวณเงินที่จ่าย" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ค่าปรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">อื่นๆ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={4}>
                                                                    <MuiTextfield label=""  defaultValue="" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={6}>
                                                        <Grid item xs={12} md={12} className="txt-center">
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={12}>
                                                                    <ButtonFluidPrimary maxWidth="270px" label="ประมวลผลก่อนชำระเงิน" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นคงเหลือ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">เงินต้นครบกำหนดชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ดอกเบี้ยครบชำระ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">รวมดอกเบี้ย</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">ค่าปรับค้างรับ</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">รวมต้องชำระทั้งสิ้น</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <MuiTextfieldEndAdornment label="" defaultValue="" endAdornment="บาท"/>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={12} md={4}>
                                                                    <p className="paper-p txt-right">&nbsp;</p>
                                                                </Grid>
                                                                <Grid item xs={12} md={5}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={6}>
                                                                            <ButtonFluidPrimary label="ดูประมวล" />
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <MuiTextfield label="" textAlign="right" defaultValue="0" /> 
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid> */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <MuiDatePicker label="วันที่ประมวล" defaultValue="2017-05-15" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="% ดอกเบี้ย" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={1}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={2}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ผู้ออกใบเสร็จ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ต้นค้างรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ต้นครบชำระ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="&nbsp;" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ดอกเบี้ยค้างรับ" defaultValue="" />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <MuiTextfield label="ดอกเบี้ยครบชำระ" defaultValue="" />
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>

                            </Grid>
                        </Grid>
                    </Container>"
                    <Container maxWidth="sm">
                        <Grid container spacing={2} className="btn-row txt-center mg-t-15">
                            <Grid item xs={12} md={12}>
                                <ButtonFluidPrimary label="บันทึกการแก้ไข" />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <h1 className="txt-red txt-regular">ใบเสร็จนี้พิมพ์แล้ว</h1>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <ButtonFluidOutlinePrimary maxWidth="200px" label="พิมพ์ใบเสร็จแล้ว" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม (ใหม่)" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ButtonFluidPrimary label="แก้" />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <ButtonFluidPrimary label="พิมพ์ใบเสร็จรับเงินลงแบบฟอร์ม (เดิม)" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ButtonFluidPrimary label="แก้" />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </Fade>

        </div>
    )
}

export default PrintBillBank
