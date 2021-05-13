import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box'

import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import { 
    MuiSelect, 
    ButtonNormalIconStartPrimary,
    ButtonOutlineIconStartGrey,
} from '../../components/MUIinputs';


// All Data for DataGrid & Table ---------------------------------------------//

const rows = [
    { 
        id: 1, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 2, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 3, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 4, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: ''
    },
    { 
        id: 5, 
        project_code: '00001', 
        project_year: '2558', 
        project_name: 'กลุ่มการปลูกมันสำปะหลังร่วมใจ58', 
        project_province: 'ฉะเชิงเทรา', 
        subproject_code: '', 
        subproject_name: '',
        loan_type: '',
        loan_period: '',
        loan_objective: '',
        loan_farmer: '',
    },
];

// End All Data for DataGrid ---------------------------------------------//

function LoanRequestProject() {
    const history = useHistory();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const gotoAddLoanRequestProject = () => {
        history.push('/loanaddproject');
    }
    
    return (
        <div className="loanrequestproject-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container>
                        <Grid container spacing={1}>
                            <Grid item xs={12} className="title-page"> 
                                <h1>โครงการขอกู้เงิน</h1>
                            </Grid>
                            <Grid item xs={2}>
                                <Box  display="flex" justifyContent="flex-start">
                                    {/* Field Select ---------------------------------------------------*/}
                                    <MuiSelect label="ปีงบประมาณ" id="loanrequestproject-year-select" lists={['2565','2563','2562']} />
                                </Box>  
                            </Grid>
                            <Grid item xs={10}>
                                <Box  display="flex" justifyContent="flex-end">
                                    <ButtonNormalIconStartPrimary label="เพิ่มโครงการ" startIcon={<AddIcon />} onClick={()=>gotoAddLoanRequestProject()} />
                                </Box>  
                            </Grid>

                            <Grid item xs={12}>
                                <div className="table-box">
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell align="center" className="tb-w-8em">รหัสโครงการ</TableCell>
                                            <TableCell align="center" className="tb-w-8em">แผนปี</TableCell>
                                            <TableCell align="center" className="tb-w-14em">ชื่อโครงการ</TableCell>
                                            <TableCell align="center" className="tb-w-12em">จังหวัด</TableCell>
                                            <TableCell align="center" className="tb-w-12em">รหัสโครงการรอง</TableCell>
                                            <TableCell align="center" className="tb-w-12em">ชื่อโครงการรอง</TableCell>
                                            <TableCell align="center" className="tb-w-12em">ประเภทกู้ยืม</TableCell>
                                            <TableCell align="center" className="tb-w-12em">ระยะเวลากู้ยืม</TableCell>
                                            <TableCell align="center" className="tb-w-12em">วัตถุประสงค์การกู้ยืม</TableCell>
                                            <TableCell align="center" className="tb-w-12em">ประเภทผู้กู้</TableCell>
                                            <TableCell align="center" className="sticky tb-w-14em">&nbsp;</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.id}>
                                                    <TableCell align="center" className="tb-w-8em">{row.project_code}</TableCell>
                                                    <TableCell align="center" className="tb-w-8em">{row.project_year}</TableCell>
                                                    <TableCell align="center" className="tb-w-14em">{row.project_name}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.project_province}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.subproject_code}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.subproject_name}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.loan_type}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.loan_period}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.loan_objective}</TableCell>
                                                    <TableCell align="center" className="tb-w-12em">{row.loan_farmer}</TableCell>
                                                    <TableCell align="center" className="sticky tb-w-14em">
                                                        <ButtonOutlineIconStartGrey label="แก้ไข" startIcon={<EditOutlinedIcon />} onClick={()=>gotoAddLoanRequestProject()}/>
                                                        <ButtonOutlineIconStartGrey label="ลบ" startIcon={<DeleteOutlineOutlinedIcon />} onClick={()=>gotoAddLoanRequestProject()}/>
                                                </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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

export default LoanRequestProject
