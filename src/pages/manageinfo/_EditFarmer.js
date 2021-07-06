import React, { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import {
    MuiLabelHeader,
    MuiTextfield,
    MuiTextfieldEndAdornment,
    MuiCheckbox,
    MuiSelect,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary
} from '../../components/MUIinputs';
import { AuthContext } from '../../App';
import { ErrorMessage } from 'formik';


function EditFarmer(props) {
    const history = useHistory();
    const form = useRef('')
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [provinceIDCardList, setProvinceIDCardList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtIDCardList, setDistrictIDCardList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictIDCardList, setSubDistrictIDCardList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceContactList, setProvinceContactList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtContactList, setDistrictContactList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictContactList, setSubDistrictContactList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLandList, setProvinceLandList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLandList, setDistrictLandList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLandList, setSubDistrictLandList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [inputEditData, setInputEditData] = useState({});
    const [inputData, setInputData] = useState({
        // IDCard: 1234567891017,
        IDCard: '', // 1234567891017,
        file: '',
        LoanFarmerTypeID: '1', // 1,
        FrontName: '', // 'นาย',
        Name: '', // 'จิมมี่',
        Sirname: '', // 'แซ่ฉ่วย',
        BirthDate: '', // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: '', // '2022-12-13',
        IDCARD_AddNo: '', // '123',
        IDCARD_AddMoo: '', // 'หมู่ 4',
        IDCARD_AddrSoiRoad: '', // 'ถ. มิตรภาพ',
        IDCARD_AddrSubdistrictID: 0, // 100102,
        IDCARD_AddrDistrictID: 0, // 1001,
        IDCARD_AddrProvinceID: 0, // 10,
        IDCARD_Postcode: '', // 12345,
        IDCard_Addrzone: '',
        Contact_AddNo: '',
        Contact_AddMoo: '',
        Contact_AddrSoiRoad: '',
        Contact_AddrSubdistrictID: 0,
        Contact_AddrDistrictID: 0,
        Contact_AddrProvinceID: 0,
        Contact_Postcode: '',
        Contact_Addrzone: '',
        FarmerGrade: '',
        Request: '',
        FarmerID: props.location.state.FarmerID,
        Land_AddMoo: '', // "นาย",
        Land_AddrSubdistrictID: 0, // 100101,
        Land_AddrDistrictID: 0, // 1001,    
        Land_AddrProvinceID: 0, // 10,
        DocLand_name: '', // "1234",
        LandType: '', // 0,
        LandNumber: '', // 0,
        LandGroup: '', // 10,
        plang: '', // 0,
        Rai: '', // 0,
        Ngan: '', // 0,
        Wa: '', // 0

        imgUpload: [],
    })

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);


    useEffect(() => {
        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceIDCardList(dataProvinceList)
        setProvinceContactList(dataProvinceList)
        setProvinceLandList(dataProvinceList)

        // Get Data Edit
        async function fetchGetFarmer() {
            console.log('FarmerID',props.location.state.FarmerID)
            const farmerID = props.location.state.FarmerID;
            const res = await fetch(`${server_hostname}/admin/api/get_farmer`, {
                method: 'POST',
                credentials: 'same-origin',
                body: JSON.stringify({
                    "FarmerID": farmerID
                }),
                headers: {
                    // "x-application-secret-key": apiXKey,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "token": token,
                }
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        console.log('ไม่พบข้อมูล');
                    }
                    let resEditData = res.data;
                   console.log(resEditData) 
                    setInputData({
                        ...inputData,
                        IDCard: resEditData.IDCard, // 1234567891017,
                        file: resEditData.file,
                        LoanFarmerTypeID: resEditData.LoanFarmerTypeID, // 1,
                        FrontName: resEditData.FrontName, // 'นาย',
                        Name: resEditData.Name, // 'จิมมี่',
                        Sirname: resEditData.Sirname, // 'แซ่ฉ่วย',
                        BirthDate: resEditData.BirthDate, // '2022-12-11',
                        Tel: resEditData.Tel, // '087-712-8888',
                        IDCardEXP_Date: resEditData.IDCardEXP_Date, // '2022-12-13',
                        IDCARD_AddNo: resEditData.IDCARD_AddNo, // '123',
                        IDCARD_AddMoo: resEditData.IDCARD_AddMoo, // 'หมู่ 4',
                        IDCARD_AddrSoiRoad: resEditData.IDCARD_AddrSoiRoad, // 'ถ. มิตรภาพ',
                        IDCARD_AddrSubdistrictID: resEditData.IDCARD_AddrSubdistrictID, // 100102,
                        IDCARD_AddrDistrictID: resEditData.IDCARD_AddrDistrictID, // 1001,
                        IDCARD_AddrProvinceID: resEditData.IDCARD_AddrProvinceID, // 10,
                        IDCARD_Postcode: resEditData.IDCARD_Postcode, // 12345,
                        IDCard_Addrzone: resEditData.IDCard_Addrzone,
                        Contact_AddNo: resEditData.Contact_AddNo,
                        Contact_AddMoo: resEditData.Contact_AddMoo,
                        Contact_AddrSoiRoad: resEditData.Contact_AddrSoiRoad,
                        Contact_AddrSubdistrictID: resEditData.Contact_AddrSubdistrictID,
                        Contact_AddrDistrictID: resEditData.Contact_AddrDistrictID,
                        Contact_AddrProvinceID: resEditData.Contact_AddrProvinceID,
                        Contact_Postcode: resEditData.Contact_Postcode,
                        Contact_Addrzone: resEditData.Contact_Addrzone,
                        FarmerGrade: resEditData.FarmerGrade,
                        Request: resEditData.Request,

                        // Land_AddMoo: resEditData.land_data[0].Land_AddMoo, // "นาย",
                        // Land_AddrSubdistrictID: resEditData.land_data[0].Land_AddrSubdistrictID, // 100101,
                        // Land_AddrDistrictID: resEditData.land_data[0].Land_AddrDistrictID, // 1001,    
                        // Land_AddrProvinceID: resEditData.land_data[0].Land_AddrProvinceID, // 10,
                        // DocLand_name: resEditData.land_data[0].DocLand_name, // "1234",
                        // LandType: resEditData.land_data[0].LandType, // 0,
                        // LandNumber: resEditData.land_data[0].LandNumber, // 0,
                        // LandGroup: resEditData.land_data[0].LandGroup, // 10,
                        // plang: resEditData.land_data[0].plang, // 0,
                        // Rai: resEditData.land_data[0].Rai, // 0,
                        // Ngan: resEditData.land_data[0].Ngan, // 0,
                        // Wa: resEditData.land_data[0].Wa, // 0

                    })
                    fetchGetDistrict();
                    fetchGetSubDistrict();
                })
                .catch(err => {
                    console.log(err);
                    console.log('ไม่พบข้อมูบ');
                });
        }


        // Check Login
        async function fetchCheckLogin() {
            const res = await fetch(`${server_hostname}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "token": token,
                }
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }

                    fetchGetFarmer();
                })
                .catch(err => {
                    console.log(err);
                    setIsLoaded(true);
                    setErr(true);
                    history.push('/');
                });
        }

        setLoaded(true);
        fetchCheckLogin();

        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }

    }, [])


    // Get District
    async function fetchGetDistrict(proviceID, type) {
        // console.log('fetchGetDistrict:proviceID',proviceID)
        const res = await fetch(`${server_hostname}/admin/api/get_districts`, {
            method: 'POST',
            body: JSON.stringify({ 
                "ProvinceID": proviceID || "",
                "DistrictID": "",
                "AM_NAME": ""
            }),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": token,
            }
        })
        res
            .json()
            .then(res => {
                if (res.code === 0 || res === '' || res === undefined) {
                    console.log('ไม่พบ เขต/อำเภอ');
                }

                if(type === 'IDCARD_AddrProvinceID') {
                    setDistrictIDCardList(res.data)
                    setInputData({
                        ...inputData,
                        IDCARD_AddrProvinceID: proviceID,
                        IDCARD_AddrDistrictID: 0,
                        IDCARD_AddrSubdistrictID: 0
                    })
                } else if(type === 'Contact_AddrProvinceID') {
                    setDistrictContactList(res.data)
                    setInputData({
                        ...inputData,
                        IDCARD_AddrProvinceID: proviceID,
                        IDCARD_AddrDistrictID: 0,
                        IDCARD_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID')   {
                    setDistrictLandList(res.data)
                    setInputData({
                        ...inputData,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                }else {
                    setDistrictIDCardList(res.data)
                    setDistrictContactList(res.data)
                    setDistrictLandList(res.data)
                }

                // if(type==='IDCARD_AddrProvinceID') {
                //     setDistrictIDCardList(res.data)
                //     // Clear District, Sub District
                //     setInputData({
                //         ...inputData,
                //         IDCARD_AddrProvinceID: proviceID,
                //         IDCARD_AddrDistrictID: 0,
                //         IDCARD_AddrSubdistrictID: 0
                //     })
                // } else if(type==='Contact_AddrProvinceID') {
                //     setDistrictContactList(res.data)
                //     // Clear District, Sub District
                //     setInputData({
                //         ...inputData,
                //         Contact_AddrProvinceID: proviceID,
                //         Contact_AddrDistrictID: 0,
                //         Contact_AddrSubdistrictID: 0
                //     })
                // } else {
                //     setDistrictIDCardList(res.data)
                //     setDistrictContactList(res.data)
                // }
                // console.log('district',res.data)
            })
            .catch(err => {
                console.log(err);
                console.log('ไม่พบ เขต/อำเภอ');
            });
    }


    // Get SubDistrict
    async function fetchGetSubDistrict(districtID, type) {
        const res = await fetch(`${server_hostname}/admin/api/get_subdistricts`, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                "ProvinceID": "",
                "DistrictID": districtID || "",
                "SubdistrictID": "",
                "TB_NAME": ""
            }),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": token,
            }
                
        })
        res
            .json()
            .then(res => {
                if (res.code === 0 || res === '' || res === undefined) {
                    console.log('ไม่พบ แขวง/ตำบล');
                }

                if(type === 'IDCARD_AddrDistrictID') {
                    setSubDistrictIDCardList(res.data)
                } else if(type === 'Contact_AddrDistrictID') {
                    setSubDistrictContactList(res.data)
                } else if(type === 'Land_AddrDistrictID')  {
                    setSubDistrictLandList(res.data)
                }else {
                    setSubDistrictIDCardList(res.data)
                    setSubDistrictContactList(res.data)
                    setSubDistrictLandList(res.data)
                }
                // console.log('district',res.data)
                // if(type==='IDCARD_AddrDistrictID') {
                //     setSubDistrictIDCardList(res.data)
                // } else if(type==='Contact_AddrDistrictID') {
                //     setSubDistrictContactList(res.data)
                // } else {
                //     setSubDistrictIDCardList(res.data)
                //     setSubDistrictContactList(res.data)
                // }
            })
            .catch(err => {
                console.log(err);
                console.log('ไม่พบ แขวง/ตำบล');
            });
    }

    const handleUploadImg = (event) => {
        // alert(event.target.files[0].name)
        let imgArr = [];
        for (let i = 0; i < event.target.files.length; i++) {
            console.log(event.target.files[i].name)
            imgArr.push(event.target.files[i].name)
        }
        setInputData({
            ...inputData,
            imgUpload: imgArr
        })
    }

    // Input Text field 
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
                event.target.value = event.target.value.toString().slice(0, 13)
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

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
        
    }

    // Input Relation Province, District, Sub District
    const handleInputDataProvince = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        fetchGetDistrict(event.target.value, event.target.name);
    }
    const handleInputDataDistrict = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        fetchGetSubDistrict(event.target.value, event.target.name);
    }

    const handleValidateNumberOnBlur = (event) => {
        // console.log(event)
        // if(event.target.value.length !== 13) {
        //     event.target.classList.add("error");
        // } else {
        //     event.target.classList.remove("error");
        // }
        let typeNumber = event.target.id.toString().slice(-3);
        if(typeNumber === 'tel') {
            if(event.target.value.length !== 10) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        } else if (typeNumber === 'zip') {
            if(event.target.value.length !== 5) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        } else {
            if(event.target.value.length !== 13) {
                event.target.classList.add("error");
            } else {
                event.target.classList.remove("error");
            }
        }
    }


    // Submit Data
    const handleSubmit = async (event) => {
        event.preventDefault();
        let addFarmerForm = document.getElementById('addFarmerForm');
        let formData = new FormData(addFarmerForm);
        formData.append('FarmerID', props.location.state.FarmerID)
        formData.append('BirthDate', inputData.BirthDate)
        formData.append('IDCardEXP_Date', inputData.IDCardEXP_Date)
        formData.append('file', inputData.imgUpload)

        axios.post(
            `${server_hostname}/admin/api/edit_farmer`, formData, { headers: { "token": token } }
        ).then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0) {
                    setErr(true);
                    setErrMsg('ไม่สามาถแก้ไขข้อมูลได้')
                }else {
                    // history.push('/manageinfo/searchmember')
                    setSuccess(true);
                    setSuccessMsg('บันทึกข้อมูลเรียบร้อย')
                }
            }
        ).catch(err => { console.log(err) })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });
    }

    const cancelData = () => {
        history.push('/manageinfo/searchmember');
    }

    const addFormLandInfo = () => {
        setCountAddLandInfo(countAddLandInfo + 1)
    }

    const handleClosePopup = () => {
        setErr(false);
    };

    const handleGotoSearch = () => {
        setSuccess(false);
        history.push('/manageinfo/searchmember');

    };

    return (
        <div className="search-page">
            <div className="header-nav">
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />
            </div>

            <Fade in={loaded} timeout={800}>
                <div className="fade">
                    <Container maxWidth="sm">
                        <form id="addFarmerForm" className="root" noValidate autoComplete="off">
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page">
                                    <h1>แก้ไขข้อมูลเกษตรกร</h1>
                                </Grid>

                                {/* Paper 1 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="IDCard" value={inputData.IDCard} onInput={handleInputData} onBlur={handleValidateNumberOnBlur} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="ประเภทสมาชิก" id="addmember-type-input" lists={['รายบุคคล', 'สถาบัน']} value={inputData.LoanFarmerTypeID} name="LoanFarmerTypeID" onChange={handleInputData} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" id="addmember-prefix-input" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" id="addmember-name-input" defaultValue="" value={inputData.Name} name="Name" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล" id="addmember-name-input" defaultValue="" value={inputData.Sirname} name="Sirname" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" defaultValue="" name="BirthDate" value={inputData.BirthDate} onChange={(newValue)=>{ setInputData({ ...inputData, BirthDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Date Picker ---------------------------------------------------*/}
                                                <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input" defaultValue="" name="IDCardEXP_Date" value={inputData.IDCardEXP_Date} onChange={(newValue)=>{ setInputData({ ...inputData, IDCardEXP_Date: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel" defaultValue="" placeholder="ตัวอย่าง 0812345678" name="Tel"  value={inputData.Tel} onInput={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* File upload ---------------------------------------------------*/}
                                                <p>อัพโหลดรูปบัตรประชาชน</p>
                                                <MuiUpload imgUpload={inputData.imgUpload} id="addmember-img-upload-input" name="file" onChange={handleUploadImg} onClick={()=>setInputData({...inputData, imgUpload: null})} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 2 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ตามบัตรประชาชน" />
                                                <Divider variant="middle" style={{ margin: '0' }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-idcard-addr1-input" defaultValue="" value={inputData.IDCARD_AddNo} name="IDCARD_AddNo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-idcard-addr2-input" defaultValue="" value={inputData.IDCARD_AddMoo} name="IDCARD_AddMoo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ซอย / ถนนที่" id="addmember-idcard-addr3-input" value={inputData.IDCARD_AddrSoiRoad} name="IDCARD_AddrSoiRoad" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectProvince label="จังหวัด" id="addmember-idcard-province-select" lists={provinceIDCardList}  value={inputData.IDCARD_AddrProvinceID} name="IDCARD_AddrProvinceID" onChange={handleInputDataProvince} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectDistrict label="เขต / อำเภอ" id="addmember-idcard-district-select" lists={districtIDCardList} value={inputData.IDCARD_AddrDistrictID} name="IDCARD_AddrDistrictID" onChange={handleInputDataDistrict}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectSubDistrict label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={subDistrictIDCardList} value={inputData.IDCARD_AddrSubdistrictID} name="IDCARD_AddrSubdistrictID" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-zip" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.IDCARD_Postcode} name="IDCARD_Postcode" onInput={handleInputData} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 3 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2} className="paper-container">
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ที่ติดต่อได้" />
                                                <Divider variant="middle" style={{ margin: '0' }} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Radio Button ---------------------------------------------------*/}
                                                <MuiCheckbox label="ที่อยู่ตามบัตรประชาชน" id="addmember-contact-idcard-checkbox" />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-idcard-addr1-input" defaultValue="" value={inputData.Contact_AddNo} name="Contact_AddNo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-idcard-addr2-input" defaultValue="" value={inputData.Contact_AddMoo} name="Contact_AddMoo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ซอย / ถนนที่" id="addmember-idcard-addr3-input" value={inputData.Contact_AddrSoiRoad} name="Contact_AddrSoiRoad" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectProvince label="จังหวัด" id="addmember-idcard-province-select" lists={provinceContactList}  value={inputData.Contact_AddrProvinceID} name="Contact_AddrProvinceID" onChange={handleInputDataProvince} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectDistrict label="เขต / อำเภอ" id="addmember-idcard-district-select" lists={districtContactList} value={inputData.Contact_AddrDistrictID} name="Contact_AddrDistrictID" onChange={handleInputDataDistrict}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelectSubDistrict label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={subDistrictContactList} value={inputData.Contact_AddrSubdistrictID} name="Contact_AddrSubdistrictID" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember-zip" defaultValue="" placeholder="ตัวอย่าง 10230" value={inputData.Contact_Postcode} name="Contact_Postcode" onInput={handleInputData} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 4 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2} className="paper-container">
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ที่ตั้งที่ดิน" />
                                                    <Divider variant="middle" style={{ margin: '0' }} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiCheckbox label="Alro Land" id="addmember-landinfo-alro-checkbox" />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiTextfield label="หมู่ที่" id="addmember-landinfo-addr1-input" defaultValue="" name="Land_AddMoo"  value={inputData.Land_AddMoo} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputData.Land_AddrProvinceID} name="Land_AddrProvinceID" onChange={handleInputDataProvince} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLandList} value={inputData.Land_AddrDistrictID} name="Land_AddrDistrictID" onChange={handleInputDataDistrict} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLandList} value={inputData.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID" onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiSelect label="ประเภทหนังสือสำคัญ" id="addmember-landinfo-typebook-select" listsValue={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ', 'ส.ป.ก. 4-01', 'โฉนด']} lists={['ส.ป.ก. 4-01, โฉนด, นส 3, นส 3 ก และอื่นๆ', 'ส.ป.ก. 4-01', 'โฉนด']} name="DocLand_name" value={inputData.DocLand_name} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="เลขที่" id="addmember-landinfo-number-input" defaultValue="" name="LandNumber" value={inputData.LandNumber} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="กลุ่ม" id="addmember-landinfo-group-input" defaultValue="" name="LandGroup" value={inputData.LandGroup} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="แปลง" id="addmember-landinfo-field1-input" defaultValue="" name="plang" value={inputData.Plang} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field2-input" defaultValue="" endAdornment="ไร่" name="Rai" value={inputData.Rai} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-field3-input" defaultValue="" endAdornment="งาน" name="Ngan" value={inputData.Ngan} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfieldEndAdornment label="แปลง" id="addmember-landinfo-fieldภ-input" defaultValue="" endAdornment="วา" name="Wa" value={inputData.Wa} />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    {/* <Paper className="paper line-top-green paper">
                                        <Grid item xs={12} md={12}>
                                            {<FormLandInfo />}
                                            {[...Array(countAddLandInfo)].map((_, i) => <FormLandInfo key={i} />)}
                                            <Grid item xs={12} md={12}>
                                                <ButtonFluidPrimary label="+ เพิ่มกิจกรรม / โครงการ" onClick={addFormLandInfo} />
                                            </Grid>
                                        </Grid>
                                    </Paper> */}
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} className="btn-row">
                                {/* Button Row -------------------------------------------------- */}
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
            </Fade>

           
            <Dialog
                open={err || success}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    {
                        success ? 
                        <DialogContentText className="dialog-success">
                            <p className="txt-center txt-black">{successMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />   
                            </Box>
                        </DialogContentText>
                        :
                        <DialogContentText className="dialog-error">
                            <p className="txt-center txt-black">{errMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </DialogContentText>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default EditFarmer;
