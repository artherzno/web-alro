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

function GuaranteeBookA() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')

    let provinceList = JSON.parse(localStorage.getItem('provincelist')) // [{ProvinceID: 81, PV_NAME: "", PVSCODE: "KABI", PV_REGION: "ใต้", ZoneID: 3}]
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist')) // [{ProvinceID: 0, DistrictID: 0, AM_NAME: ""}] // 
    const [districtList1, setDistrictList1] = useState([])
    const [districtList2, setDistrictList2] = useState([])
    const [districtList3, setDistrictList3] = useState([])
    const [districtList4, setDistrictList4] = useState([])
    const [districtList5, setDistrictList5] = useState([])
    // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist')) // [{ProvinceID: 0, DistrictID: 0, SubdistrictID: 0, TB_NAME: "", POSTAL: 0}] // 
    const [subdistrictList1, setSubdistrictList1] = useState([])
    const [subdistrictList2, setSubdistrictList2] = useState([])
    const [subdistrictList3, setSubdistrictList3] = useState([])
    const [subdistrictList4, setSubdistrictList4] = useState([])
    const [subdistrictList5, setSubdistrictList5] = useState([])

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
    const [searchResult, setSearchResult] = useState([])
    const [dataOwner, setDataOwner] = useState({
        FrontName: '',
        Name: '',
        Sirname: '',
        principle: '',
        LoanNumber: '',
        LoanDate: '',
    })

    const [inputDataSearch, setInputDataSearch] = useState({
        Username: localStorage.getItem('cUsername'),
        // LoanNumber:"",
        // Rentno: "",
        // Fullname: "",
        // Date: ""
        GuaranteeBookTypeID: "1",
        Name: "ทดสอบ",
        LoanNumber: ''
    })

    const [inputData, setInputData] = useState({
        GuaranteeBookTypeID: '1',
        LoanID: 0,
        PlaceCreate: '',
        ContactDate: moment(),

        FrontName1: '', // "นาย1",
        Name1: '', // "ชื่อผู้ค้ำ 1",
        Sirname1: '', // "นามสกุลผู้ค้ำ 1",
        AGE1: '', // "11",
        IDCard1: '', // "3309900111111",
        HouseNumber1: '', // "บ้านเลขที่1",
        Moo1: '', // "หมู่ 1",
        Road1: '', // "ถนน 1",
        Province1: 0, // "มหาสารคาม1",
        District1: 0, // "เมือง1",
        Subdistrict1: 0, // "ในเมือง1",

        FrontName2: '', // "นาย2",
        Name2: '', // "ชื่อผู้ค้ำ 2",
        Sirname2: '', // "นามสกุลผู้ค้ำ 2",
        AGE2: '', // "22",
        IDCard2: '', // "3309900111111",
        HouseNumber2: '', // "บ้านเลขที่2",
        Moo2: '', // "หมู่ 2",
        Road2: '', // "ถนน 2",
        Province2: 0, // "มหาสารคาม2",
        District2: 0, // "เมือง2",
        Subdistrict2: 0, // "ในเมือง2",

        FrontName3: '', // "นาย3",
        Name3: '', // "ชื่อผู้ค้ำ 3",
        Sirname3: '', // "นามสกุลผู้ค้ำ 3",
        AGE3: '', // "33",
        IDCard3: '', // "3309900111111",
        HouseNumber3: '', // "บ้านเลขที่3",
        Moo3: '', // "หมู่ 3",
        Road3: '', // "ถนน 3",
        Province3: 0, // "มหาสารคาม3",
        District3: 0, // "เมือง3",
        Subdistrict3: 0, // "ในเมือง3",

        FrontName4: '', // "นาย4",
        Name4: '', // "ชื่อผู้ค้ำ 4",
        Sirname4: '', // "นามสกุลผู้ค้ำ 4",
        AGE4: '', // "44",
        IDCard4: '', // "3309900111111",
        HouseNumber4: '', // "บ้านเลขที่4",
        Moo4: '', // "หมู่ 4",
        Road4: '', // "ถนน 4",
        Province4: 0, // "มหาสารคาม4",
        District4: 0, // "เมือง4",
        Subdistrict4: 0, // "ในเมือง4",

        FrontName5: '', // "นาย5",
        Name5: '', // "ชื่อผู้ค้ำ 5",
        Sirname5: '', // "นามสกุลผู้ค้ำ 5",
        AGE5: '', // "55",
        IDCard5: '', // "3309900111111",
        HouseNumber5: '', // "บ้านเลขที่5",
        Moo5: '', // "หมู่ 5",
        Road5: '', // "ถนน 5",
        Province5: 0, // "มหาสารคาม5",
        District5: 0, // "เมือง5",
        Subdistrict5: 0, // "ในเมือง5",

        CoupleFrontName: '',// "",
        CoupleName: '',// "",
        CoupleSirname: '',// "",
        CoupleAGE: '',// "",
        CoupleNationality: '',// "",
        CoupleHouseNumber: '',// "",
        CoupleMoo: '',// "",
        CoupleRoad: '',// "",
        CoupleProvince: '',// "",
        CoupleDistrict: '',// "",
        CoupleSubdistrict: '',// "",
        CoupleOtherContact: '',// "",

        WitnessName1: '',// "พยาน1",
        WitnessAddr1: '',// "ที่อยู่พยาน1",
        WitnessIDCard1: '',// "1234567891011",
        WitnessIDCardMake1: '',// "ออกพยาน1",
        WitnessName2: '',// "พยาน2",
        WitnessAddr2: '',// "ที่อยู่พยาน2",
        WitnessIDCard2: '',// "1234567891022",
        WitnessIDCardMake2: '',// "ออกพยาน2",
    })

    const [rows, setRows] = useState([])

    const rowsLabel = [
        'FrontName',
        'Name', 
        'Sirname',
        'LoanNumber',
    ]

    const headCells = [
        { id: 'FrontName', numeric: false, disablePadding: true, widthCol: '60px', label: 'คำนำหน้า' },
        { id: 'Name', numeric: false, disablePadding: true, widthCol: '160px', label: 'ชื่อ' },
        { id: 'Sirname', numeric: false, disablePadding: true, widthCol: '160px', label: 'นามสกุล' },
        { id: 'LoanNumber', numeric: false, disablePadding: true, widthCol: '100px', label: 'เลขที่สัญญา' },
    ]

    function createData(ind, FrontName, Name, Sirname, LoanNumber, GBookID, LoanID ) {
        return {ind, FrontName, Name, Sirname, LoanNumber, GBookID, LoanID }
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
    }, [])

    const getSearch = () => {
        setIsLoading(true)
        setRows([])
        setSearchResult([])
        setFormField(false)

        axios.post(
            `${server_hostname}/admin/api/search_GuaranteeBook`, 
            inputDataSearch, 
            { headers: { "token": token } } 
        ).then(res => {
                console.log('getSearch',res)
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
                } else {
                    console.log('search result',data.data)

                    if(data.length > 0) {
                        setRows(
                            data.data.map((item,i)=>
                                createData(
                                    i,
                                    item.FrontName,
                                    item.Name,
                                    item.Sirname,
                                    item.LoanNumber,
                                    item.GBookID,
                                    item.LoanID,
                                ))
                        )
                        setSearchResult(data.data)
                    } else {
                        setErr(true);
                        setErrMsg('ไม่พบข้อมูล')
                    }
                }
                setIsLoading(false)
                // getSpkAllProject()
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const getView = (gbookID,loanID,ind) => {
        console.log(gbookID,loanID,ind)
        console.log(searchResult[ind])
        setDataOwner({
                FrontName: searchResult[ind].FrontName,
                Name: searchResult[ind].Name,
                Sirname: searchResult[ind].Sirname,
                principle: searchResult[ind].principle,
                LoanNumber: searchResult[ind].LoanNumber,
                LoanDate: searchResult[ind].LoanDate,
            })
        setFormField(false)
        setInputData({
            ...inputData,
            LoanID: loanID
        })

        if(gbookID === null) {
            setFormField(true)

        } else {

            let dataView = {
                GBookID: gbookID
            }

            axios.post(
                `${server_hostname}/admin/api/view_GuaranteeBook`, 
                dataView, 
                { headers: { "token": token } } 
            ).then(res => {
                    console.log('getView',res)
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
                    } else {
                        console.log('view result',data.data)
                        setFormField(true)
                    }
                    // getSpkAllProject()
                }
            ).catch(err => { console.log(err); })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });
        }
    }

    const getGuaranteeBookSelect = (loanNumber) => {
        
    }

    const gotoAddGuaranteebook = () => {
        setFormField(true)
    }

    const getDistrictList = (event) => {
        
        switch (event.target.name) {
            case 'Province1':
                setDistrictList1([])
                setSubdistrictList1([])
                break;
            
            case 'Province2':
                setDistrictList2([])
                setSubdistrictList2([])
                break;

            case 'Province3':
                setDistrictList3([])
                setSubdistrictList3([])
                break;
                
            case 'Province4':
                setDistrictList4([])
                setSubdistrictList4([])
                break;
                
            case 'Province5':
                setDistrictList5([])
                setSubdistrictList5([])
                break;
        
            default:
                break;
        }
        console.log(event.target.value)
        let pv_id = event.target.value
        let districtArr = []
        for(let i=0; i<districtList.length; i++) {
            if(districtList[i].ProvinceID === pv_id ) {
                districtArr.push(districtList[i])
            }
        }
        
        switch (event.target.name) {
            case 'Province1':
                setDistrictList1(districtArr)
                break;
            
            case 'Province2':
                setDistrictList2(districtArr)
                break;

            case 'Province3':
                setDistrictList3(districtArr)
                break;
                
            case 'Province4':
                setDistrictList4(districtArr)
                break;
                
            case 'Province5':
                setDistrictList5(districtArr)
                break;
        
            default:
                break;
        }
        console.log(districtArr)
    }


    const getSubDistrictList = (event) => {
        switch (event.target.name) {
            case 'District1':
                setSubdistrictList1([])
                break;
            
            case 'District2':
                setSubdistrictList2([])
                break;

            case 'District3':
                setSubdistrictList3([])
                break;
                
            case 'District4':
                setSubdistrictList4([])
                break;
                
            case 'District5':
                setSubdistrictList5([])
                break;
        
            default:
                break;
        }
        console.log(event.target.value)
        let dt_id = event.target.value
        let subdistrictArr = []
        for(let i=0; i<districtList.length; i++) {
            if(subdistrictList[i].DistrictID === dt_id ) {
                subdistrictArr.push(subdistrictList[i])
            }
        }
        
        switch (event.target.name) {
            case 'District1':
                setSubdistrictList1(subdistrictArr)
                break;
            
            case 'District2':
                setSubdistrictList2(subdistrictArr)
                break;

            case 'District3':
                setSubdistrictList3(subdistrictArr)
                break;
                
            case 'District4':
                setSubdistrictList4(subdistrictArr)
                break;
                
            case 'District5':
                setSubdistrictList5(subdistrictArr)
                break;
        
            default:
                break;
        }
        console.log(subdistrictArr)
    }

    const handleInputData = (event) => {
        console.log('event.target.name',event.target.name)
        console.log('hi', event)
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
            if(event.target.name === 'Province1' || event.target.name === 'Province2' || event.target.name === 'Province3' || event.target.name === 'Province4' || event.target.name === 'Province5') {
                getDistrictList(event)
            }
            if(event.target.name === 'District1' || event.target.name === 'District2' || event.target.name === 'District3' || event.target.name === 'District4' || event.target.name === 'District5') {
                getSubDistrictList(event)
            }
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
        }
        // console.log(event)
    }

    const handleInputDataOwner = (event) => {
        setDataOwner({
            ...dataOwner,
            [event.target.name]: event.target.value
        })
    }

    const handleInputDataSearch = (event) => {
        setInputDataSearch({
            ...inputDataSearch,
            [event.target.name]: event.target.value
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        let guaranteebooka = document.getElementById('guaranteebooka');
        let formData = new FormData(guaranteebooka);  
        
        
        formData.append('GuaranteeBookTypeID', '1')
        formData.append('LoanID', inputData.LoanID)
    
        axios.post(
            `${server_hostname}/admin/api/update_GuaranteeBook`, 
                formData
                , { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('Insert',res.data)
            let data = res.data;
            // setInputData(data)
            // console.log('inputData',inputData)
            if(data.code === 0 || res === null || res === undefined) {
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
            }else {
                setIsLoading(false)
                setSuccess(true)
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
                setIsLoading(false)
            }
            });
        


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
        
        <div className="guaranteebooka-page">
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
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} className="title-page"> 
                                <h1>สร้าง/พิมพ์ หนังสือสัญญาค้ำประกัน ก</h1>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth={false}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} >
                                <div className="positionFixed mg-t-20">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            {/* <MuiTextfield label="ค้นหาชื่อ-นามสกุล"  defaultValue="" /> */}
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="Name" value={inputDataSearch.Name} onChange={handleInputDataSearch} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={getSearch} />  
                                        </Grid>
                                        {/* <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary  label="สร้างสัญญา" onClick={()=>gotoAddGuaranteebook()} />
                                        </Grid> */}
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
                                                    hasAction={true}  // show action
                                                    tableName={'guaranteebook'}
                                                    guaranteebookEvent={getView}
                                                    eventParam={['GBookID','LoanID','ind']}
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
                                        <h1 className="txt-green">หนังสือสัญญาค้ำประกัน ก</h1>
                                    </Grid>


                                    <form id="guaranteebooka" className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        {/* Paper 1 - -------------------------------------------------- */}
                                        <Paper className="paper line-top-green paper mg-t-20">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หนังสือสัญญาค้ำประกันที่"  name="PlaceCreate" value={inputData.PlaceCreate} onChange={handleInputData}  />
                                                    </Grid>

                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ทำที่"  name="PlaceCreate" value={inputData.PlaceCreate} onChange={handleInputData}  />
                                                    </Grid> */}
                                                    <Grid item xs={12} md={4}>
                                                        <MuiDatePicker label="วันที่ทำสัญญา" name="ContactDate"  value={inputData.ContactDate} onChange={(newValue)=>{ setInputData({ ...inputData, ContactDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
                                                    </Grid>
                                                    
                                                    {/* Guaranteebook 1------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="1. ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName1" value={inputData.FrontName1} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name1" value={inputData.Name1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname1" value={inputData.Sirname1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="AGE1" value={inputData.AGE1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard1" value={inputData.IDCard1} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="HouseNumber1"  value={inputData.HouseNumber1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="Moo1"  value={inputData.Moo1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="Road1"  value={inputData.Road1} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="Province1" value={inputData.Province1} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList1} name="District1"  value={inputData.District1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList1} name="Subdistrict1"  value={inputData.Subdistrict1} onChange={handleInputData} />
                                                    </Grid>
                                                    


                                                    {/* Guaranteebook 2------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="2. ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName2" value={inputData.FrontName2} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name2" value={inputData.Name2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname2" value={inputData.Sirname2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="AGE2" value={inputData.AGE2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard2" value={inputData.IDCard2} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="HouseNumber2"  value={inputData.HouseNumber2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="Moo2"  value={inputData.Moo2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="Road2"  value={inputData.Road2} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="Province2" value={inputData.Province2} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList2} name="District2"  value={inputData.District2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList2} name="Subdistrict2"  value={inputData.Subdistrict2} onChange={handleInputData} />
                                                    </Grid>



                                                    {/* Guaranteebook 3------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="3. ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName3" value={inputData.FrontName3} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name3" value={inputData.Name3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname3" value={inputData.Sirname3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="AGE3" value={inputData.AGE3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard3" value={inputData.IDCard3} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="HouseNumber3"  value={inputData.HouseNumber3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="Moo3"  value={inputData.Moo3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="Road3"  value={inputData.Road3} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="Province3" value={inputData.Province3} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList3} name="District3"  value={inputData.District3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList3} name="Subdistrict3"  value={inputData.Subdistrict3} onChange={handleInputData} />
                                                    </Grid>



                                                    {/* Guaranteebook 4------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="4. ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName4" value={inputData.FrontName4} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name4" value={inputData.Name4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname4" value={inputData.Sirname4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="AGE4" value={inputData.AGE4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard4" value={inputData.IDCard4} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="HouseNumber4"  value={inputData.HouseNumber4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="Moo4"  value={inputData.Moo4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="Road4"  value={inputData.Road4} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="Province4" value={inputData.Province4} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList4} name="District4"  value={inputData.District4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList4} name="Subdistrict4"  value={inputData.Subdistrict4} onChange={handleInputData} />
                                                    </Grid>

                                                    {/* Guaranteebook 5------------------------------------------- */}
                                                    <Grid item xs={12} md={12} className="mg-t-20">
                                                        <MuiLabelHeader label="5. ข้าพเจ้า" />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName5" value={inputData.FrontName5} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ชื่อ" defaultValue=""  name="Name5" value={inputData.Name5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname5" value={inputData.Sirname5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={2}>
                                                        <MuiTextfield label="อายุ" name="AGE5" value={inputData.AGE5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard5" value={inputData.IDCard5} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="HouseNumber5"  value={inputData.HouseNumber5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="Moo5"  value={inputData.Moo5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="Road5"  value={inputData.Road5} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="Province5" value={inputData.Province5} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList5} name="District5"  value={inputData.District5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList5} name="Subdistrict5"  value={inputData.Subdistrict5} onChange={handleInputData} />
                                                    </Grid>

                                                </Grid>
                                        </Paper>

                                        <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ซึ่งต่อไปในสัญญานี้รวมเรียกว่า “ผู้ค้ำประกัน” ตกลงทําหนังสือสัญญาค้ำประกันไว้ต่อสํานักงานการ ปฏิรูปที่ดินเพื่อเกษตรกรรม ซึ่งต่อไปในสัญญานี้เรียกว่า “ส.ป.ก.” ดังต่อไปนี้" />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <p>&nbsp;</p>
                                                    <MuiLabelHeader label="ข้อ ๑. ตามที่" />
                                                    {/* <MuiTextfield label="ข้อ ๑. ตามที่"  name="farmerName"  value={inputData.farmerName} onChange={handleInputData}  /> */}
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} value={dataOwner.FrontName} onChange={handleInputDataOwner} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ชื่อ" defaultValue="" value={dataOwner.Name} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="นามสกุล" defaultValue="" value={dataOwner.Sirname} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้กู้” ได้กู้เงินของ ส.ป.ก. ไปเป็น" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <p>จำนวนเงิน</p>
                                                    <MuiTextfieldCurrency label="" value={dataOwner.principle}  onChange={handleInputDataOwner} /> 
                                                </Grid>
                                                <Grid item xs={1} md={1}>
                                                    <p>&nbsp;</p>
                                                    <p className="paper-p">บาท</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ตามสัญญากู้ยืมเงิน" value={dataOwner.LoanNumber} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiDatePicker label="ลงวันที่" value={dataOwner.LoanDate} onChange={(newValue)=>{ setDataOwner({ ...dataOwner, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
                                                </Grid>


                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ซึ่งต่อไป ในสัญญานี้เรียกว่า “สัญญากู้” ตามสําเนาสัญญากู้แนบท้ายสัญญานี้นั้น ผู้ค้ำประกันตกลงผูกพันตนเข้าค้ำประกันผู้กู้ ต่อ ส.ป.ก. เต็มตามวงเงินกู้ดังกล่าวข้างต้น รวมทั้งดอกเบี้ย และค่าปรับ ตลอดจนบรรดา ค่าเสียหายที่บังเกิดขึ้นแก่ ส.ป.ก. เนื่อง จากการที่ผู้กู้ไม่ชําระหนี้ให้ถูกต้องตามสัญญากู้ด้วย" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๒. หากผู้กู้ไม่ชําระหนี้ ซึ่งผู้ค้ําประกันได้ค้ําประกันไว้นี้ให้แก่ ส.ป.ก. ตามข้อผูกพันไม่ว่าจะเป็น เพราะเหตุใดๆ หรือผู้กู้ถูกศาลพิพากษาให้เป็นบุคคลล้มละลาย หรือตาย หรือเป็นคนไร้ความสามารถหรือ คนสาบสูญ หรือไปเสียจากถิ่นที่อยู่ หรือหาตัวไม่พบ เป็นเหตุให้ ส.ป.ก. ไม่ได้รับชําระหนี้ และ ส.ป.ก. ได้มีหนังสือบอกกล่าวให้ชําระหนี้ไปยังผู้ค้ำประกันโดยชอบ แล้ว ผู้ค้ําประกันยินยอมตกลงรับผิด ชําระหนี้ให้แก่ ส.ป.ก. แทนผู้กู้ภายในเวลาที่ระบุไว้ในหนังสือบอกกล่าวโดยมิพักต้อง เรียกให้ลูกหนี้ชําระ หนี้ก่อน ทั้งนี้ ส.ป.ก. จะเรียกชําระหนี้ เงินกู้นั้นพร้อมดอกเบี้ยจากผู้ค้ำประกันคนใดคนหนึ่งหรือหลายคน ในบรรดาผู้ค้ำประกันร่วมกัน โดยสิ้นเชิงหรือบางส่วนก็ได้ ตามแต่ ส.ป.ก. จะเลือกบรรดาผู้ค้ำประกันรวมกันยังคงผูกพันอยู่ จนกว่าหนี้เงินกู้ดังกล่าวจะได้ชําระครบถ้วน" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๓. ในกรณีที่ ส.ป.ก. ผ่อนเวลาหรือผ่อนจํานวนเงินในการชําระหนี้ตามสัญญากู้ให้แก่ผู้กู้ โดยได้แจ้งให้ผู้ค้ำประกันทราบและผู้ค้ําประกันได้ตกลงยินยอมในการผ่อนเวลาหรือผ่อนจํานวนเงินในการ ชําระหนี้นั้นให้ถือว่าผู้ค้ำประกัน ตกลงมิให้ถือเอาการผ่อนเวลาหรือผ่อนจํานวนเงินในการชําระหนี้ดังกล่าว เป็นเหตุปลดเปลื้องความรับผิด ของผู้ค้ำประกัน และจะรับผิดในฐานะผู้ค้ําประกันตามสัญญานี้ตลอดไปจนกว่า จะมีการชําระหนี้พร้อมดอกเบี้ย และค่าเสียหาย (ถ้ามี) ครบเต็มจํานวน" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ในกรณีการทําข้อตกลงการขยายระยะเวลาชําระหนี้ที่ทําขึ้นภายหลังที่ผู้กู้ผิดนัดชําระหนี้แล้ว ไม่ให้ถือว่าเป็นการ ผ่อนเวลา และผู้ค้ําประกันย่อมไม่หลุดพ้นจากความรับผิดตามสัญญานี้"/>
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๔. ผู้ค้ําประกันจะไม่เพิกถอนการค้ําประกันไม่ว่ากรณีใดๆ และยินยอมรับผิดชอบตามสัญญานี้ตลอดไป จนกว่าผู้กู้ได้ชําระหนี้ครบถ้วนตามสัญญากู้แล้ว" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๕. การส่งหนังสือบอกกล่าวหรือทวงถาม หรือการส่งเอกสารใดๆ ถึงผู้ค้ําประกัน ถ้าได้ส่งไปยังที่อยู่ของผู้ค้ำประกันตามที่ปรากฏในสัญญานี้แล้วให้ถือว่าได้ส่งถึงผู้ค้ําประกันโดยชอบ โดยถือว่าที่อยู่ดังกล่าวเป็นภูมิลําเนาของผู้ค้ำประกันและผู้ค้ำประกันได้ทราบข้อความในหนังสือหรือเอกสารดังกล่าวแล้ว ไม่ว่าจะมีผู้รับไว้หรือไมหรือส่งไม่ได้ เพราะเหตุใดๆ" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากผู้ค้ำประกันเปลี่ยนแปลงที่อยู่ตามที่ปรากฏในสัญญานี้ ผู้ค้ำประกันตกลงจะมีหนังสือ แจ้งเปลี่ยนแปลงไปยัง ส.ป.ก. การละเลยไม่แจ้งเปลี่ยนแปลงที่อยู่ดังกล่าว หาก ส.ป.ก. ได้ส่งหนังสือ บอกกล่าวหรือทวงถาม หรือเอกสารใดๆ ไปยังผู้ค้ำประกันตามที่อยู่ที่ปรากฏในสัญญานี้ ให้ถือเสมือนว่า ผู้ค้ำประกันได้ทราบข้อความในหนังสือหรือเอกสารดังกล่าว แล้ว" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๖. ในกรณีที่ผู้กู้ทําหลักฐานแบบอื่นเปลี่ยนแทนสัญญากู้จาก ส.ป.ก. ที่อ้างในข้อ ๑.เพื่อสะดวกแก่การโอนตาม ความประสงค์ของ ส.ป.ก. ผู้ค้ำประกันยอมคงค้ำประกันอยู่ตามหนังสือนี้ อนึ่ง ถ้า ส.ป.ก.ประสงค์ให้ผู้ค้ำประกันเปลี่ยนหนังสือ สัญญาค้ำประกันเป็นหลักฐานการค้ำประกันแบบอื่นด้วย ผู้ค้ำประกันก็จะทําหลักฐานการค้ําประกันตามแบบอื่นนั้น เปลี่ยนให้ ตามความประสงค์โดยมิชักช้า" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ผู้ค้ำประกันได้อ่านและเข้าใจข้อความในหนังสือสัญญาค้ำประกันฉบับนี้โดยตลอดแล้ว จึงลงลายมือชื่อไว้เป็นสําคัญ ต่อหน้าพยาน" />
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

export default GuaranteeBookA
