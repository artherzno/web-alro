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
        GuaranteeBookAt: '',
        GuaranteeBookPlace: '',
        GuaranteeBookDate: null,

        FrontName: '',
        Name: '',
        Sirname: '',

        FrontName1: '',
        Name1: '',
        Sirname1: '',
        age1: '',
        IDCard1: '',
        AddNo1: '', // '123',
        AddMoo1: '', // 'หมู่ 4',
        AddrSoiRoad1: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID1: 0, // 100102,
        AddrDistrictID1: 0, // 1001,
        AddrProvinceID1: 0, // 10,
        Postcode1: '', // 12345,

        FrontName2: '',
        Name2: '',
        Sirname2: '',
        age2: '',
        IDCard2: '',
        AddNo2: '', // '123',
        AddMoo2: '', // 'หมู่ 4',
        AddrSoiRoad2: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID2: 0, // 100102,
        AddrDistrictID2: 0, // 1001,
        AddrProvinceID2: 0, // 10,
        Postcode2: '', // 12345,

        FrontName3: '',
        Name3: '',
        Sirname3: '',
        age3: '',
        IDCard3: '',
        AddNo3: '', // '123',
        AddMoo3: '', // 'หมู่ 4',
        AddrSoiRoad3: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID3: 0, // 100102,
        AddrDistrictID3: 0, // 1001,
        AddrProvinceID3: 0, // 10,
        Postcode3: '', // 12345,

        FrontName4: '',
        Name4: '',
        Sirname4: '',
        age4: '',
        IDCard4: '',
        AddNo4: '', // '123',
        AddMoo4: '', // 'หมู่ 4',
        AddrSoiRoad4: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID4: 0, // 100102,
        AddrDistrictID4: 0, // 1001,
        AddrProvinceID4: 0, // 10,
        Postcode4: '', // 12345,

        FrontName5: '',
        Name5: '',
        Sirname5: '',
        age5: '',
        IDCard5: '',
        AddNo5: '', // '123',
        AddMoo5: '', // 'หมู่ 4',
        AddrSoiRoad5: '', // 'ถ. มิตรภาพ',
        AddrSubdistrictID5: 0, // 100102,
        AddrDistrictID5: 0, // 1001,
        AddrProvinceID5: 0, // 10,
        Postcode5: '', // 12345,

        farmerName: '',
        loanAmount: '',
        loanBook: '',
        loanDate: '',

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

    function createData(FrontName, Name, Sirname, LoanNumber ) {
        return {FrontName, Name, Sirname, LoanNumber }
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
                    setRows(
                        data.data.map((item,i)=>
                            createData(
                                item.FrontName,
                                item.Name,
                                item.Sirname,
                                item.LoanNumber,
                            ))
                    )
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
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="name" value={inputDataSearch.name} onChange={handleInputDataSearch} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            {/* Field Text ---------------------------------------------------*/}
                                            <MuiTextfield label="ค้นหาเลขที่สัญญา" name="LoanNumber" value={inputDataSearch.LoanNumber} onChange={handleInputDataSearch} />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary label="ค้นหา" onClick={getSearch} />  
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <p>&nbsp;</p>
                                            <ButtonFluidPrimary  label="สร้างสัญญา" onClick={()=>gotoAddGuaranteebook()} />
                                        </Grid>
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
                                        <h1 className="txt-green">หนังสือสัญญาค้ำประกัน ก</h1>
                                    </Grid>


                                    <form className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        {/* Paper 1 - -------------------------------------------------- */}
                                        <Paper className="paper line-top-green paper mg-t-20">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หนังสือสัญญาค้ำประกันที่"  name="GuaranteeBookAt" value={inputData.GuaranteeBookAt} onChange={handleInputData}  />
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ทำที่"  name="GuaranteeBookPlace" value={inputData.GuaranteeBookPlace} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiDatePicker label="วันที่ทำสัญญา" name="GuaranteeBookDate"  value={inputData.GuaranteeBookDate} onChange={(newValue)=>{ setInputData({ ...inputData, ContactDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
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
                                                        <MuiTextfield label="อายุ" name="age1" value={inputData.age1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard1" value={inputData.IDCard1} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="AddNo1"  value={inputData.AddNo1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo1"  value={inputData.AddMoo1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad1"  value={inputData.AddrSoiRoad1} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID1" value={inputData.AddrProvinceID1} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID1"  value={inputData.AddrDistrictID1} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID1"  value={inputData.AddrSubdistrictID1} onChange={handleInputData} />
                                                    </Grid>
                                                    <br/>
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
                                                        <MuiTextfield label="อายุ" name="age2" value={inputData.age2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number2-idc" name="IDCard2" value={inputData.IDCard2} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="AddNo2"  value={inputData.AddNo2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo2"  value={inputData.AddMoo2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad2"  value={inputData.AddrSoiRoad2} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID2" value={inputData.AddrProvinceID2} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID2"  value={inputData.AddrDistrictID2} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID2"  value={inputData.AddrSubdistrictID2} onChange={handleInputData} />
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
                                                        <MuiTextfield label="อายุ" name="age3" value={inputData.age3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number3-idc" name="IDCard3" value={inputData.IDCard3} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="AddNo3"  value={inputData.AddNo3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo3"  value={inputData.AddMoo3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad3"  value={inputData.AddrSoiRoad3} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID3" value={inputData.AddrProvinceID3} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID3"  value={inputData.AddrDistrictID3} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID3"  value={inputData.AddrSubdistrictID3} onChange={handleInputData} />
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
                                                        <MuiTextfield label="อายุ" name="age4" value={inputData.age4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number4-idc" name="IDCard4" value={inputData.IDCard4} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="AddNo4"  value={inputData.AddNo4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo4"  value={inputData.AddMoo4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad4"  value={inputData.AddrSoiRoad4} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID4" value={inputData.AddrProvinceID4} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID4"  value={inputData.AddrDistrictID4} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID4"  value={inputData.AddrSubdistrictID4} onChange={handleInputData} />
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
                                                        <MuiTextfield label="อายุ" name="age5" value={inputData.age5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiTextfield label="เลขบัตรประชาชน" id="number5-idc" name="IDCard5" value={inputData.IDCard5} onChange={handleInputData}   />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <p>&nbsp;</p>
                                                        <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="บ้านเลขที่"  name="AddNo5"  value={inputData.AddNo5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หมู่ที่"  name="AddMoo5"  value={inputData.AddMoo5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ซอย / ถนน" name="AddrSoiRoad5"  value={inputData.AddrSoiRoad5} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceList}  name="AddrProvinceID5" value={inputData.AddrProvinceID5} onChange={handleInputData} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtList} name="AddrDistrictID5"  value={inputData.AddrDistrictID5} onChange={handleInputData}  />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล"  lists={subdistrictList} name="AddrSubdistrictID5"  value={inputData.AddrSubdistrictID5} onChange={handleInputData} />
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
                                                    <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ชื่อ" defaultValue=""  name="Name" value={inputData.Name} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="นามสกุล" defaultValue="" name="Sirname" value={inputData.Sirname} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้กู้” ได้กู้เงินของ ส.ป.ก. ไปเป็น" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <p>จำนวนเงิน</p>
                                                    <MuiTextfieldCurrency label="" name="loanAmount" value={inputData.loanAmount}  onChange={handleInputData} /> 
                                                </Grid>
                                                <Grid item xs={1} md={1}>
                                                    <p>&nbsp;</p>
                                                    <p className="paper-p">บาท</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ตามสัญญากู้ยืมเงิน"  name="loanBook" value={inputData.loanBook} onChange={handleInputData}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiDatePicker label="ลงวันที่" name="loanDate"  value={inputData.loanDate} onChange={(newValue)=>{ setInputData({ ...inputData, loanDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
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
