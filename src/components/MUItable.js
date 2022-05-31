import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import { useTheme } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

import {  
    ButtonNormalIconStartPrimary,
    ButtonFluidPrimary,
    ButtonFluidSecondary, 
} from './MUIinputs';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon sx={{ fontSize: 24 }}/> : <FirstPageIcon sx={{ fontSize: 24 }}/>}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon sx={{ fontSize: 24 }}/> : <KeyboardArrowLeftIcon sx={{ fontSize: 24 }}/>}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon sx={{ fontSize: 24 }}/> : <KeyboardArrowRightIcon sx={{ fontSize: 24 }}/>}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon sx={{ fontSize: 24 }}/> : <LastPageIcon sx={{ fontSize: 24 }}/>}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


  
const useStyles = makeStyles((theme) => ({
    root: {
      width: 'auto',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: '#f2f2f2',
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

const MUItable = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    let { 
      headCells, 
      rows, 
      rowsLabel, 
      colSpan, 
      hasCheckbox, 
      hasAction, 
      actionAlign,
      actionView, 
      viewEvent, 
      viewParam, 
      viewParam2,
      actionViewRequest, 
      viewRequestEvent, 
      viewRequestParam, 
      viewRequestParam2,
      viewRequestParam3,
      viewRequestParam4,
      actionEditFarmer, 
      editFarmerEvent,
      editFarmerParam,
      actionEdit, 
      editEvent,
      editParam,
      actionEditRequest, 
      editRequestEvent,
      editRequestParam,
      editRequestParam2,
      editRequestParam3,
      editRequestParam4,
      actionDelete, 
      deleteEvent,
      deleteParam,
      actionPrint, 
      printEvent, 
      printParam1, 
      printParam2,
      actionRequest,
      requestEvent,
      requestParam1,
      requestParam2,
      actionCreate,
      actionCreateArr,
      createArrEvent,
      createArrParam,
      createEvent,
      createParam,
      actionCustom,
      customEvent,
      customParam1,
      customParam2,
      customName,
      customWidth,
      tableName,
      loanrequestprintEvent,
      loanrequestprintAction,
      recordcontractdebtEvent,
      recordcontractdebtAction,
      addrecordcourtcontractEvent,
      addrecordcourtcontractAction,
      guaranteebookEvent,
      rowsPerPageOptionsValue,

    } = props;

  useEffect(() => {
    setPage(0)
    setRowsPerPage(5)
  }, [rows])

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
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
  
  function EnhancedTableHead(props) {
    const { headCells, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, hasCheckbox, hasAction } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {
            hasCheckbox ? 
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
            : null
          }
          
          {
            headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                // align={headCell.numeric ? 'right' : 'left'}
                align={'center'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
                style={{ minWidth: headCell.widthCol }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))
          }
          
          {
            hasAction ? 
              <TableCell align="center"  className="sticky">
                Aciton
              </TableCell>
            : null
          }
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
  
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  function EnhancedTableBody (props) {
    const { index, row, rowsLabel, isItemSelected, labelId, hasCheckbox } = props;

    // const loopCreateArrParam = () => {
    //   let rowArr = []
    //   for(let i=0; i<createArrParam.length; i++) {
    //     rowArr.push(row[createArrParam[i]])
    //   }
    //   return rowArr
    // }
    // console.log(loopCreateArrParam)
    

    return (
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={index}
        selected={isItemSelected}
      >
        { 
          hasCheckbox ? 
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </TableCell>
         : null
        }

        {
          rowsLabel.map((item,i)=> {
            // <TableCell align="left"><div dangerouslySetInnerHTML={createMarkup()} /></TableCell>
              return (<TableCell key={i} align="left">{row[item]} </TableCell>)
            }
          )
        }

        {
            hasAction ? 
              <TableCell align={actionAlign==='right'? 'right': actionAlign==='left'? 'left': 'center'}  className="sticky">
                {
                  tableName === 'loanrequestprint' && row['LoanID'] ? 
                    <ButtonFluidPrimary label="แก้ไข" maxWidth="130px" onClick={()=>{loanrequestprintAction('edit'); loanrequestprintEvent(row['ApplicantID'], row['FarmerID'], row['ApplicantNo'], row['LoanID'], row['LoanNumber'])}} />
                  : (tableName === 'loanrequestprint' && row['LoanID'] === '') || (tableName === 'loanrequestprint' && row['LoanID'] === null) ?  
                    <ButtonFluidPrimary label="สร้างสัญญา" maxWidth="130px"  onClick={()=>{loanrequestprintAction('add'); loanrequestprintEvent(row['ApplicantID'], row['FarmerID'], row['ApplicantNo'], row['LoanID'], row['LoanNumber'])}} />
                  : null
                    // (applicantID, farmerID, applicantNo, loanID, loanNumber)
                }
                {
                  tableName === 'recordcontractdebt' && (row['LoanRecType'] !== 'loan') && (row['Status']==='บันทึกชั่วคราว')  ? 
                    <ButtonFluidPrimary label="แก้ไข" maxWidth="130px" onClick={()=>{recordcontractdebtAction('edit'); editEvent(row['LoanID'])}} />
                  : tableName === 'recordcontractdebt' && (row['LoanRecType'] !== 'loan') && (row['Status']==='แปลงหนี้') ? 
                    <ButtonFluidPrimary label="ดูรายละเอียด" maxWidth="130px" onClick={()=>{recordcontractdebtAction('view'); editEvent(row['LoanID'])}} />
                  : tableName === 'recordcontractdebt' && (row['LoanRecType'] === '' || row['LoanRecType'] === null || row['LoanRecType'] === undefined  || row['LoanRecType'] === 'loan' ) ?  
                    <ButtonFluidPrimary label="สร้างสัญญา" maxWidth="130px"  onClick={()=>{recordcontractdebtAction('add'); recordcontractdebtEvent(row['LoanID'])}} />
                  : null
                    // (applicantID, farmerID, applicantNo, loanID, loanNumber)
                }
                {
                  tableName === 'addRecordCourtContract' && (row['LoanRecType'] === 'court') && (row['Status']==='บันทึกชั่วคราว')  ? 
                  <ButtonFluidPrimary label="แก้ไข" maxWidth="130px" onClick={()=>{addrecordcourtcontractAction('edit'); editEvent(row['LoanID'])}} />
                  : tableName === 'addRecordCourtContract' && (row['LoanRecType'] === 'court') && (row['Status']==='คำพิพากษาศาล')   ? 
                    <ButtonFluidPrimary label="ดูรายละเอียด" maxWidth="130px" onClick={()=>{addrecordcourtcontractAction('view'); editEvent(row['LoanID'])}} />
                  : tableName === 'addRecordCourtContract' && (row['LoanRecType'] === '' || row['LoanRecType'] === null || row['LoanRecType'] === undefined  || row['LoanRecType'] !== 'court' ) ?  
                    <ButtonFluidPrimary label="สร้างสัญญา" maxWidth="130px"  onClick={()=>{addrecordcourtcontractAction('add'); addrecordcourtcontractEvent(row['LoanID'])}} />
                  : null
                    // (applicantID, farmerID, applicantNo, loanID, loanNumber)
                }
                {
                  tableName === 'guaranteebook' && row['GBookID'] === null  ? 
                  <ButtonFluidPrimary label="สร้างสัญญา" maxWidth="140px" onClick={()=>{guaranteebookEvent(row['GBookID'],row['LoanID'],row['ind']); }} />
                  : tableName === 'guaranteebook' ?
                  <ButtonFluidPrimary label="แก้ไข" maxWidth="130px" onClick={()=>{guaranteebookEvent(row['GBookID'],row['LoanID'],row['ind']); }} />
                  : null
                }
                {
                  tableName === 'spouseconsentbook' && row['GBookID'] === null  ? 
                  <ButtonFluidPrimary label="สร้างหนังสือให้ความยินยอม" maxWidth="240px" onClick={()=>{guaranteebookEvent(row['GBookID'],row['LoanID'],row['ind']); }} />
                  : tableName === 'spouseconsentbook' ?
                  <ButtonFluidPrimary label="แก้ไข" maxWidth="130px" onClick={()=>{guaranteebookEvent(row['GBookID'],row['LoanID'],row['ind']); }} />
                  : null
                }
                {
                  actionRequest ? 
                  <>
                    {
                      row['FarmerGrade'] === 'N (มีหนี้ค้าง)' ? null :
                      <ButtonFluidPrimary label="ยื่นคำขอ" maxWidth="100px" onClick={()=>requestEvent(row[requestParam1], requestParam2)} />
                      
                    }
                  </>
                  : null
                }
                {
                  actionCreate ? 
                    <ButtonFluidPrimary label="สร้าง" maxWidth="80px" onClick={()=>createEvent(row[createParam])} />
                  : null
                }
                {
                  actionCreateArr ? 
                    <ButtonFluidPrimary label="สร้าง" maxWidth="80px" onClick={()=>createArrEvent(row[createArrParam[0]],row[createArrParam[1]],row[createArrParam[2]],row[createArrParam[3]],row[createArrParam[4]],row[createArrParam[5]],row[createArrParam[6]],row[createArrParam[7]],row[createArrParam[8]],row[createArrParam[9]],row[createArrParam[10]],row[createArrParam[11]],row[createArrParam[12]])} />
                  : null
                }
                {
                  actionView ? 
                    <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="100px" onClick={()=>viewEvent(row[viewParam], row[viewParam2])} />
                  : null
                }
                {
                  actionEdit ? 
                    <ButtonFluidPrimary label="แก้ไข" maxWidth="80px" onClick={()=>editEvent(row[editParam])} />
                  : null
                }
                {
                  actionEditFarmer ? 
                    <ButtonFluidPrimary label="แก้ไขข้อมูลเกษตรกร" maxWidth="180px" onClick={()=>editFarmerEvent(row[editFarmerParam])} />
                  : null
                }
                {
                  actionViewRequest ? 
                    <ButtonFluidPrimary label="ดูข้อมูล" maxWidth="100px" onClick={()=>viewRequestEvent(row[viewRequestParam], row[viewRequestParam2], row[viewRequestParam3], viewRequestParam4)} />
                  : null
                }
                {
                  actionEditRequest ? 
                    <ButtonFluidPrimary label="แก้ไข" maxWidth="80px" onClick={()=>editRequestEvent(row[editRequestParam],row[editRequestParam2],row[editRequestParam3],editRequestParam4)} />
                  : null
                }
                {
                  actionDelete ? 
                    <ButtonFluidSecondary label="ลบ" maxWidth="80px" onClick={()=>deleteEvent(row[deleteParam])} />
                  : null
                }
                {
                  actionPrint ? 
                    <ButtonFluidPrimary label="พิมพ์" maxWidth="80px" onClick={()=>printEvent(row[printParam1], row[printParam2])} />
                  : null
                }
                {
                  actionCustom ? 
                    <ButtonFluidPrimary label={customName} maxWidth={customWidth} onClick={()=>customEvent(row[customParam1], row[customParam2])} />
                  : null
                }
              </TableCell>
            : null
          }
        {/* <TableCell component="th" id={labelId} scope="row" padding="none">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
    );
  }
  

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

  return (
    <div className={classes.root}>
      {/* <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              hasAction={hasAction}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // console.log('row',row)
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return <EnhancedTableBody key={index} index={index} isItemSelected={isItemSelected} row={row} rowsLabel={rowsLabel} labelId={labelId} hasCheckbox={hasCheckbox} hasAction={hasAction}/>;
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={colSpan} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={!!rowsPerPageOptionsValue? rowsPerPageOptionsValue : [5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}

          ActionsComponent={TablePaginationActions}
        />
      {/* </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}

export {
    MUItable
}
