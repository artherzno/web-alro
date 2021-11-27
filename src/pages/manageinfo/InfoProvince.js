import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../App';

import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';

import PrintIcon from '@material-ui/icons/Print';

import Header from '../../components/Header';
import Nav from '../../components/Nav';

import {
    MuiTextfield,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiSelectObjYearStart,
    MuiTextfieldEndAdornment,
    MuiTextfieldCurrency,
    MuiTextfieldStartAdornment,
    MuiRadioButton,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiLabelHeader,
    MuiSelect,
    MuiTextfieldMultiLine,
    ButtonFluidPrimary,
    ButtonFluidIconStartPrimary,
    ButtonFluidSecondary,
    ButtonFluidOutlinePrimary,
    ButtonNormalIconStartPrimary,
} from '../../components/MUIinputs';

import { MUItable } from '../../components/MUItable'

function InfoProvince () {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    let provinceList =  [{
        ProvinceID: 81, PV_NAME: "", PVSCODE: "KABI", PV_REGION: "ใต้", ZoneID: 3
    }]//JSON.parse(localStorage.getItem('provincelist'))
    // Get District
    let districtList = [{ProvinceID: 0, DistrictID: 0, AM_NAME: ""}] // JSON.parse(localStorage.getItem('districtlist'))
     // Get SubDistrict
    let subdistrictList = [{ProvinceID: 0, DistrictID: 0, SubdistrictID: 0, TB_NAME: "", POSTAL: 0}] // JSON.parse(localStorage.getItem('subdistrictlist'))

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [confirm, setConfirm] = useState(false)
    const [confirmMsg, setConfirmMsg] = useState('ตกลงใช่หรือไม่')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [insertData, setInsertData] = useState(false);
    const [insertDateData, setInsertDateData] = useState(false);
    const [searched, setSearched] = useState(false);
    const [formField, setFormField] = useState(false)
    const [loanNumber, setLoanNumber] = useState(null)

    const [inputDataSearch, setInputDataSearch] = useState({
        Username: localStorage.getItem('provinceid'),
        ProvinceID:"",
        ProvinceName: "",
        ProvinceNameShort: "",
        SectorName: "",
        Code: "",
    })

    const [inputData, setInputData] = useState({
        GuaranteeBookAt: '',
        GuaranteeBookPlace: '',
        GuaranteeBookDate: null,

        FrontNameMate: '',
        NameMate: '',
        SirnameMate: '',

        FrontName: '',
        Name: '',
        Sirname: '',
        age: '',
        IDCard: '',
        AddNo: '', // '123',
        AddMoo: '', // 'หมู่ 4',
        AddrSoiRoad: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID: 0, // 100102,
        AddrDistrictID: 0, // 1001,
        AddrProvinceID: 0, // 10,
        Postcode: '', // 12345,

        farmerName: '',
        loanAmount: '',
        loanBook: '',
        loanDate: '',

        other: '',

        WitnessName: '',
        WitnessAddr: '',
        WitnessIDCard: '',
        WitnessIDCardMade: '',
        WitnessName2: '',
        WitnessAddr2: '',
        WitnessIDCard2: '',
        WitnessIDCardMade2: '',
    })

    const [rows, setRows] = useState([])
    const [getSelectData, setGetSelectData] = useState([])
    const [getProcessBeforePayData, setGetProcessBeforePayData] = useState([])

    const rowsLabel = [
        'ProvinceID', 'ProvinceName', 'Code', 'SectorName', 'ProvinceNameShort'
    ]

    const headCells = [
        { id: 'ProvinceID', numeric: false, disablePadding: true, widthCol: '60px', label: 'รหัส' },
        { id: 'ProvinceName', numeric: false, disablePadding: true, widthCol: '160px', label: 'ชื่อ' },
        { id: 'Code', numeric: false, disablePadding: true, widthCol: '100px', label: 'Pvscode' },
        { id: 'SectorName', numeric: false, disablePadding: true, widthCol: '160px', label: 'ภาค' },
        { id: 'ProvinceNameShort', numeric: false, disablePadding: true, widthCol: '160px', label: 'Pvzip' },
    ]

    function createData(ProvinceID, ProvinceName, Code, SectorName, ProvinceNameShort ) {
        return {ProvinceID, ProvinceName, Code, SectorName, ProvinceNameShort}
    }

    useEffect(() => {
        setLoaded(true);

        const checkLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`, '', { headers: { "token": token } } 
            ).then(res => {
                    console.log('checklogin',res)
                    let data = res.data;
                    if(data.code === 0) {
                        setErr(true);
                        if(Object.keys(data.message).length !== 0) {
                            console.error(data)
                            if(typeof data.message === 'object') {
                                setErrMsg('ไม่สามารถทำรายการได้')
                            } else {
                                setErrMsg([data.message])
                            }
                        } else {
                            setErrMsg(['ไม่สามารถทำรายการได้'])
                        }
                    }
                    // getSpkAllProject()
                }
            ).catch(err => { console.log(err);  history.push('/'); })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        checkLogin();

        let data = require('../../datamockup/Province_JSON.json'); 
        let dataArr = []
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            // console.log(`Name: ${obj.PV_NAME}, ${obj.PV_NAME}`);
            dataArr.push(createData(obj.ProvinceID,obj.PV_NAME,obj.PVSCODE,obj.PV_REGION, obj.PVZIP))
        }
        setRows(dataArr)

    }, [])

    const getSearch = () => {

    }

    const getGuaranteeBookSelect = (loanNumber) => {
        
    }

    const gotoAddGuaranteebook = () => {
        setFormField(true)
    }



    const handleInputData = (event) => {
        // console.log('event.target.name',event.target.name)
        if(event.target.type === 'number') {
            let typeNumber = event.target.id.toString().slice(-3);
            if(typeNumber === 'tel') {
                event.target.value = event.target.value.toString().slice(0, 10)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'zip') {
                event.target.value = event.target.value.toString().slice(0, 5)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            } else if (typeNumber === 'idc') {
                let value = event.target.value.toString().slice(0, 13)

                setInputData({
                    ...inputData,
                    [event.target.name]: value
                })

                function checkID(id) {
                    let sum=0
                    for(let i=0; i < 12; i++)
                        sum += parseFloat(id.charAt(i))*(13-i);
                    if((11-sum%11)%10!==parseFloat(id.charAt(12))) return false;
                    return true;

                }

                // setCheckIDCard(checkID(value));
                console.log(checkID(value))

            } else {
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
        }
        // console.log(event)
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();    
    
        // axios.post(
        //     `${server_spkapi}/CloseContact/Insert`, 
        //         dataSend
        //         , { headers: { "token": token } } 
        // ).then(res => {
        //     setIsLoading(false)
        //     console.log('Insert',res.data)
        //     let data = res.data;
        //     // setInputData(data)
        //     // console.log('inputData',inputData)
        //     if(data.code === 0 || res === null || res === undefined) {
        //         setErr(true);
        //         if(Object.keys(data.message).length !== 0) {
        //             console.error(data)
        //             if(typeof data.message === 'object') {
        //                 setErrMsg('ไม่สามารถทำรายการได้')
        //             } else {
        //                 setErrMsg([data.message])
        //             }
        //         } else {
        //             setErrMsg(['ไม่สามารถทำรายการได้'])
        //         }
        //     }else {
        //         setIsLoading(false)
        //         setSuccess(true)
        //     }
        // }).catch(err => { console.log(err); })
        // .finally(() => {
        //     if (isMounted.current) {
        //         setIsLoading(false)
        //     }
        //     });
        


    };
    
    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)
        
        // history.push('/manageinfo/searchmember');

    };

    const handleClosePopupSuccess = () => {
        setErr(false);
        setSuccess(false);
        setConfirm(false);
        setIsLoading(false)

        window.location.reload()
        
        // history.push('/manageinfo/searchmember');

    };



    return (
        
        <div className="loanrequestprint-page">
            {
                isLoading ? 
                    <div className="overlay">
                        <p style={{margin: 'auto', fontSize: '20px'}}>...กำลังค้นหาข้อมูล...</p>
                    </div> : 
                    ''
            }
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>
            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>ข้อมูลจังหวัด</h1>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MuiTextfield label="รหัสจังหวัด" name="ProvinceID" value={inputDataSearch.ProvinceID} onChange={handleInputDataSearch} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MuiTextfield label="Code" name="Code" value={inputDataSearch.Code} onChange={handleInputDataSearch} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MuiTextfield label="ชื่อภาค" name="SectorName" value={inputDataSearch.SectorName} onChange={handleInputDataSearch} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <MuiTextfield label="ชื่อย่อ" name="ProvinceNameShort" value={inputDataSearch.ProvinceNameShort} onChange={handleInputDataSearch} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MuiTextfield label="จังหวัด" name="ProvinceName" value={inputDataSearch.ProvinceName} onChange={handleInputDataSearch} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <p>&nbsp;</p>
                                <ButtonFluidPrimary label="ค้นหา" onClick={getSearch} />  
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <p>&nbsp;</p>
                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" startIcon={<PrintIcon />}/>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} >
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12} className="result-header mg-t-20 mg-b--20"> 
                                            <h2>ผลการค้นหา {(rows.length).toLocaleString('en-US') || 0} รายการ</h2>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <div className="table-box table-loanrecivceprint mg-t-10">
                                                <MUItable 
                                                    headCells={headCells} 
                                                    rows={rows} 
                                                    rowsLabel={rowsLabel} 
                                                    colSpan={12} 
                                                    hasCheckbox={false} 
                                                    hasAction={false}  // show action
                                                    actionCustom={true} 
                                                    customName={"ดูสัญญาเดิม"}
                                                    customWidth={"140px"}
                                                    customEvent={getGuaranteeBookSelect}
                                                    customParam1={'LoanNumber'}
                                                    tableName={'recordcloseoldcontract'}
                                                />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>

                        {
                            formField ? 
                                <Grid item xs={12} md={12}>
                                    <Grid item xs={12} md={12} className="title-page"> 
                                        <h1 className="txt-green">ข้อมูลจังหวัด</h1>
                                    </Grid>


                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        {/* Paper 1 - -------------------------------------------------- */}
                                        <Paper className="paper line-top-green paper mg-t-20">
                                                <Grid container spacing={2}>

                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="เขียนที่"  name="GuaranteeBookPlace" value={inputData.GuaranteeBookPlace} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiDatePicker label="วันที่" name="GuaranteeBookDate"  value={inputData.GuaranteeBookDate} onChange={(newValue)=>{ setInputData({ ...inputData, ContactDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
                                                    </Grid>
                                                    
                                                    {/* Guaranteebook 1------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name" value={inputData.Name} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={3}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname" value={inputData.Sirname} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="age" value={inputData.age} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="สัญชาติ" name="nationality" value={inputData.nationality} onChange={handleInputData}  />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard" value={inputData.IDCard} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid> */}
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="อยู่บ้านเลขที่"  name="AddNo"  value={inputData.AddNo} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo"  value={inputData.AddMoo} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad"  value={inputData.AddrSoiRoad} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID" value={inputData.AddrProvinceID} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID"  value={inputData.AddrDistrictID} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID"  value={inputData.AddrSubdistrictID} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-center" style={{fontSize: '18px'}}>เป็นคู่สมรสของ</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name" value={inputData.Name} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname" value={inputData.Sirname} onChange={handleInputData}  />
                                                    </Grid>

                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="ขอทําหนังสือฉบับนี้ไว้แก่ สํานักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.) เพื่อเป็นหลักฐานว่า บรรดานิติกรรมทั้งหลาย เช่น สัญญา กู้ยืมเงินจาก ส.ป.ก. หนังสือสัญญารับรองผูกพันตนรับผิดอย่างลูกหนี้ร่วมกันต่อ ส.ป.ก. หนังสือสัญญาค้ำประกัน หนังสือสัญญาจํานอง อื่น ๆ (ระบุ)" />
                                                    
                                                        <MuiTextfield label=""  name="other"  value={inputData.other} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-center" style={{fontSize: '18px'}}>ซึ่ง</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name" value={inputData.Name} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname" value={inputData.Sirname} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="คู่สมรสของข้าพเจ้าได้ทําไว้กับสํานักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม (ส.ป.ก.) ในเวลานี้หรือเวลาใดเวลาหนึ่งในภายหน้า ข้าพเจ้าขอให้ความยินยอมด้วยกับการทํา นิติกรรมดังกล่าวเหล่านั้นและให้ถือว่าบรรดานิติกรรมที่ทําขึ้นเหล่านั้นมีผลสมบูรณ์ ผูกพันข้าพเจ้าด้วยทุกประการ" />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เพื่อเป็นหลักฐาน ข้าพเจ้าจึงได้ลงลายมือชื่อไว้เป็นสําคัญต่อหน้าพยาน" />
                                                    </Grid>

                                                <Divider />
                                                <Grid item xs={12} md={12} className="mg-t-20">
                                                    <MuiLabelHeader label="หมายเหตุ" />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="1. ชื่อพยาน" name="WitnessName" value={inputData.WitnessName} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" name="WitnessAddr" value={inputData.WitnessAddr} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard" value={inputData.WitnessIDCard} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" name="WitnessIDCardMade" value={inputData.WitnessIDCardMade} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="2. ชื่อพยาน" name="WitnessName2" value={inputData.WitnessName2} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" name="WitnessAddr2" value={inputData.WitnessAddr2} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard2" value={inputData.WitnessIDCard2} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" name="WitnessIDCardMade2" value={inputData.WitnessIDCardMade2} onChange={handleInputData}/>
                                                </Grid>
                                                </Grid>
                                        </Paper>
                                   
                                    </form>
                                    <Grid container spacing={2} className="btn-row txt-center">
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="380px" onClick={handleSubmit} />
                                        </Grid>
                                    </Grid>
                                
                                </Grid>
                            : null
                        }
                        </Grid>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={success}
                onClose={handleClosePopupSuccess}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{successMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopupSuccess} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={confirm}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>

                    <div className="dialog-success">
                        <p className="txt-center txt-black">{confirmMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidOutlinePrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            &nbsp;&nbsp;
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={err}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                
                    <div className="dialog-error">
                        <p className="txt-center txt-black">{errMsg}</p>
                        <br/>
                        <Box textAlign='center'>
                            
                            <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default InfoProvince
