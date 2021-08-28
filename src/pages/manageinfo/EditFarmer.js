import React, { useEffect, useState, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Checkbox from '@material-ui/core/Checkbox';


import moment from 'moment';

import Header from '../../components/Header';
import Nav from '../../components/Nav';
import MUIdropdownProvince from '../../components/MUIdropdownProvince';
import MUIdropdownDistrict from '../../components/MUIdropdownDistrict';
import {
    MuiLabelHeader,
    MuiTextfield,
    MuiTextfieldEndAdornment,
    MuiCheckbox,
    MuiSelect,
    MuiSelectObj,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiRadioButton,
    MuiTextNumber,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
    ButtonFluidOutlineSecondary,
} from '../../components/MUIinputs';
import { AuthContext } from '../../App';


function EditFarmer(props) {
    const history = useHistory();
    const form = useRef('')
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let server_production = localStorage.getItem('siteimage');
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [deleteLand, setDeleteLand] = useState(false);
    const [deleteLandID, setDeleteLandID] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [duplicateAddr, setDuplicateAddr] = useState(false);

    const [addressIDCard, setAddressIDCard] = useState('')
    const [alroChecked1, setAlroChecked1] = useState('')
    const [alroChecked2, setAlroChecked2] = useState('')
    const [alroChecked3, setAlroChecked3] = useState('')
    const [alroChecked4, setAlroChecked4] = useState('')
    const [alroChecked5, setAlroChecked5] = useState('')

    const [loaded, setLoaded] = useState(false);
    const [docLandTypeList, setDocLandTypeList] = useState([])
    const [provinceIDCardList, setProvinceIDCardList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtIDCardList, setDistrictIDCardList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictIDCardList, setSubDistrictIDCardList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceContactList, setProvinceContactList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtContactList, setDistrictContactList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictContactList, setSubDistrictContactList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLandList, setProvinceLandList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLandList, setDistrictLandList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLandList, setSubDistrictLandList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLand1List, setProvinceLand1List] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLand1List, setDistrictLand1List] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLand1List, setSubDistrictLand1List] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLand2List, setProvinceLand2List] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLand2List, setDistrictLand2List] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLand2List, setSubDistrictLand2List] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLand3List, setProvinceLand3List] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLand3List, setDistrictLand3List] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLand3List, setSubDistrictLand3List] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLand4List, setProvinceLand4List] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLand4List, setDistrictLand4List] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLand4List, setSubDistrictLand4List] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLand5List, setProvinceLand5List] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLand5List, setDistrictLand5List] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLand5List, setSubDistrictLand5List] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [provinceLandAddList, setProvinceLandAddList] = useState(['กรุณาเลือกจังหวัด']);
    const [districtLandAddList, setDistrictLandAddList] = useState(['กรุณาเลือกจังหวัด']);
    const [subDistrictLandAddList, setSubDistrictLandAddList] = useState(['กรุณาเลือก เขต/อำเภอ']);

    const [inputSelectBirthDate, setInputSelectBirthDate] = useState({
        dd: '00',
        mm: '00',
        yyyy: '0000'
    })

    const [inputSelectExpireDate, setInputSelectExpireDate] = useState({
        dd2: '00',
        mm2: '00',
        yyyy2: '0000'
    })

    const [inputData, setInputData] = useState({
        // IDCard: 1234567891017,
        IDCard: '', // 1234567891017,
        file: '',
        LoanFarmerTypeID: '1', // 1,
        FrontName: 'นาย', // 'นาย',
        Name: '', // 'จิมมี่',
        Sirname: '', // 'แซ่ฉ่วย',
        BirthDate: null, // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: null, // '2022-12-13',
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
        imgUpload: [],
    })

    const [pathIDCard_Image, setPathIDCard_Image] = useState(null);
    const [landData, setLandData] = useState([]);

    
    const [inputDataLandAdd, setInputDataLandAdd] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )

    const [inputDataLand1, setInputDataLand1] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )
    const [inputDataLand2, setInputDataLand2] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )
    const [inputDataLand3, setInputDataLand3] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )
    const [inputDataLand4, setInputDataLand4] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )
    const [inputDataLand5, setInputDataLand5] = useState(
        {  
            Land_AddMoo: '', // "นาย",
            Land_AddrSubdistrictID: 0, // 100101,
            Land_AddrDistrictID: 0, // 1001,    
            Land_AddrProvinceID: 0, // 10,
            DocLand_name: 0, // "docland name",
            DocLand_code: 0, // "1234",
            LandType: '', // 0,
            LandNumber: '', // 0,
            LandGroup: '', // 10,
            Plang: '', // 0,
            Rai: '', // 0,
            Ngan: '', // 0,
            Wa: '', // 0
        },
    )

    const [countAddLandInfo, setCountAddLandInfo] = useState(0);

    useEffect(() => {
        console.log('server_production',server_production)
        // setInputData({
        //     ...inputData,
        //     BirthDate: null,
        //     IDCardEXP_Date: null,
        // })

        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceIDCardList(dataProvinceList)
        setProvinceContactList(dataProvinceList)
        setProvinceLandList(dataProvinceList)

        let dataDocLandTypeList = JSON.parse(localStorage.getItem('doclandtypelist'))
        console.log('dataDocLandTypeList',dataDocLandTypeList)
        setDocLandTypeList(dataDocLandTypeList)

        console.log(inputData.BirthDate)

        const newOrderDate = (val,type) => {
            if(val === null) {
                if(type==='birthdate') {
                    setInputSelectBirthDate({
                        ...inputSelectBirthDate,
                        yyyy: '0000',
                        mm: '00',
                        dd: '00'
                    })
                } else {
                    setInputSelectExpireDate({
                        ...inputSelectBirthDate,
                        yyyy2: '0000',
                        mm2: '00',
                        dd2: '00'
                    })
                }
            } else {
                let newyyyy = Number(val.substring(0,4)) + 543
                let newmm = val.substring(5,7)
                let newdd = val.substring(8,10)
    
                if(type==='birthdate') {
                    setInputSelectBirthDate({
                        ...inputSelectBirthDate,
                        yyyy: newyyyy,
                        mm: newmm,
                        dd: newdd
                    })
                } else {
                    setInputSelectExpireDate({
                        ...inputSelectBirthDate,
                        yyyy2: newyyyy,
                        mm2: newmm,
                        dd2: newdd
                    })
                }

            }
            // return dd+'/'+mm+'/'+yyyy
        }

        // let landDataArr = [];
        const farmerID = props.location.state.FarmerID || 0;
        const getFarmer = () => {
            axios.post(
                `${server_hostname}/admin/api/get_farmer`, { "FarmerID": farmerID }, { headers: { "token": token } } 
            ).then(res => {
                    console.log(res)
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
                    }else {
                        console.log('Get Farmer:',data.data)
                    
                        let resEditData = data.data;
                        setPathIDCard_Image(resEditData.IDCard_PicPatch ? resEditData.IDCard_PicPatch.split('\\').join('/') : '')
                        setLandData(resEditData.land_data || []);

                        if(resEditData.land_data) {

                            for(let i=0; i<data.data.land_data.length; i++) {
                                
                                if(i===0) {
                                    setInputDataLand1({
                                        ...inputDataLand1,
                                        Land_AddMoo: resEditData.land_data[i].Land_AddMoo || '', // "นาย",
                                        Land_AddrSubdistrictID:  resEditData.land_data[i].Land_AddrSubdistrictID || 0, // 100101,
                                        Land_AddrDistrictID: resEditData.land_data[i].Land_AddrDistrictID || 0, // 1001,    
                                        Land_AddrProvinceID: resEditData.land_data[i].Land_AddrProvinceID || 0, // 10,
                                        DocLand_name: resEditData.land_data[i].DocLand_name ||'', // "docland name",
                                        DocLand_code: resEditData.land_data[i].DocLand_code ||'', // "1234",
                                        LandType: resEditData.land_data[i].LandType || '', // 0,
                                        LandNumber: resEditData.land_data[i].LandNumber || '', // 0,
                                        LandGroup: resEditData.land_data[i].LandGroup || '', // 10,
                                        Plang: resEditData.land_data[i].Plang || '', // 0,
                                        Rai: resEditData.land_data[i].Rai || '', // 0,
                                        Ngan: resEditData.land_data[i].Ngan || '', // 0,
                                        Wa: resEditData.land_data[i].Wa || '', // 0
                                    })                            
                                } else if(i===1) {
                                    setInputDataLand2({
                                        ...inputDataLand2,
                                        Land_AddMoo: resEditData.land_data[i].Land_AddMoo || '', // "นาย",
                                        Land_AddrSubdistrictID:  resEditData.land_data[i].Land_AddrSubdistrictID || 0, // 100101,
                                        Land_AddrDistrictID: resEditData.land_data[i].Land_AddrDistrictID || 0, // 1001,    
                                        Land_AddrProvinceID: resEditData.land_data[i].Land_AddrProvinceID || 0, // 10,
                                        DocLand_name: resEditData.land_data[i].DocLand_name ||'', // "docland name",
                                        DocLand_code: resEditData.land_data[i].DocLand_code ||'', // "1234",
                                        LandType: resEditData.land_data[i].LandType || '', // 0,
                                        LandNumber: resEditData.land_data[i].LandNumber || '', // 0,
                                        LandGroup: resEditData.land_data[i].LandGroup || '', // 10,
                                        Plang: resEditData.land_data[i].Plang || '', // 0,
                                        Rai: resEditData.land_data[i].Rai || '', // 0,
                                        Ngan: resEditData.land_data[i].Ngan || '', // 0,
                                        Wa: resEditData.land_data[i].Wa || '', // 0
                                    })   
                                } else if(i===2) {
                                    setInputDataLand3({
                                        ...inputDataLand2,
                                        Land_AddMoo: resEditData.land_data[i].Land_AddMoo || '', // "นาย",
                                        Land_AddrSubdistrictID:  resEditData.land_data[i].Land_AddrSubdistrictID || 0, // 100101,
                                        Land_AddrDistrictID: resEditData.land_data[i].Land_AddrDistrictID || 0, // 1001,    
                                        Land_AddrProvinceID: resEditData.land_data[i].Land_AddrProvinceID || 0, // 10,
                                        DocLand_name: resEditData.land_data[i].DocLand_name ||'', // "docland name",
                                        DocLand_code: resEditData.land_data[i].DocLand_code ||'', // "1234",
                                        LandType: resEditData.land_data[i].LandType || '', // 0,
                                        LandNumber: resEditData.land_data[i].LandNumber || '', // 0,
                                        LandGroup: resEditData.land_data[i].LandGroup || '', // 10,
                                        Plang: resEditData.land_data[i].Plang || '', // 0,
                                        Rai: resEditData.land_data[i].Rai || '', // 0,
                                        Ngan: resEditData.land_data[i].Ngan || '', // 0,
                                        Wa: resEditData.land_data[i].Wa || '', // 0
                                    })   
                                } else if(i===3) {
                                    setInputDataLand4({
                                        ...inputDataLand4,
                                        Land_AddMoo: resEditData.land_data[i].Land_AddMoo || '', // "นาย",
                                        Land_AddrSubdistrictID:  resEditData.land_data[i].Land_AddrSubdistrictID || 0, // 100101,
                                        Land_AddrDistrictID: resEditData.land_data[i].Land_AddrDistrictID || 0, // 1001,    
                                        Land_AddrProvinceID: resEditData.land_data[i].Land_AddrProvinceID || 0, // 10,
                                        DocLand_name: resEditData.land_data[i].DocLand_name ||'', // "docland name",
                                        DocLand_code: resEditData.land_data[i].DocLand_code ||'', // "1234",
                                        LandType: resEditData.land_data[i].LandType || '', // 0,
                                        LandNumber: resEditData.land_data[i].LandNumber || '', // 0,
                                        LandGroup: resEditData.land_data[i].LandGroup || '', // 10,
                                        Plang: resEditData.land_data[i].Plang || '', // 0,
                                        Rai: resEditData.land_data[i].Rai || '', // 0,
                                        Ngan: resEditData.land_data[i].Ngan || '', // 0,
                                        Wa: resEditData.land_data[i].Wa || '', // 0
                                    })   
                                } else if(i===4) {
                                    setInputDataLand5({
                                        ...inputDataLand5,
                                        Land_AddMoo: resEditData.land_data[i].Land_AddMoo || '', // "นาย",
                                        Land_AddrSubdistrictID:  resEditData.land_data[i].Land_AddrSubdistrictID || 0, // 100101,
                                        Land_AddrDistrictID: resEditData.land_data[i].Land_AddrDistrictID || 0, // 1001,    
                                        Land_AddrProvinceID: resEditData.land_data[i].Land_AddrProvinceID || 0, // 10,
                                        DocLand_name: resEditData.land_data[i].DocLand_name ||'', // "docland name",
                                        DocLand_code: resEditData.land_data[i].DocLand_code ||'', // "1234",
                                        LandType: resEditData.land_data[i].LandType || '', // 0,
                                        LandNumber: resEditData.land_data[i].LandNumber || '', // 0,
                                        LandGroup: resEditData.land_data[i].LandGroup || '', // 10,
                                        Plang: resEditData.land_data[i].Plang || '', // 0,
                                        Rai: resEditData.land_data[i].Rai || '', // 0,
                                        Ngan: resEditData.land_data[i].Ngan || '', // 0,
                                        Wa: resEditData.land_data[i].Wa || '', // 0
                                    })   
                                }
                            }
                        }

                        setInputData({
                            ...inputData,
                            IDCard: resEditData.IDCard || '', // 1234567891017,
                            file: resEditData.file || '',
                            LoanFarmerTypeID: resEditData.LoanFarmerTypeID.toString() || '', // 1,
                            FrontName: resEditData.FrontName || '', // 'นาย',
                            Name: resEditData.Name || '', // 'จิมมี่',
                            Sirname: resEditData.Sirname || '', // 'แซ่ฉ่วย',
                            // BirthDate: resEditData.BirthDate || null, // '2022-12-11',
                            BirthDate: newOrderDate(resEditData.BirthDate, 'birthdate'),
                            Tel: resEditData.Tel || '', // '087-712-8888',
                            IDCardEXP_Date: newOrderDate(resEditData.IDCardEXP_Date, 'expiredate'), // '2022-12-13',
                            IDCARD_AddNo: resEditData.IDCARD_AddNo || '', // '123',
                            IDCARD_AddMoo: resEditData.IDCARD_AddMoo || '', // 'หมู่ 4',
                            IDCARD_AddrSoiRoad: resEditData.IDCARD_AddrSoiRoad || '', // 'ถ. มิตรภาพ',
                            IDCARD_AddrSubdistrictID: resEditData.IDCARD_AddrSubdistrictID || 0, // 100102,
                            IDCARD_AddrDistrictID: resEditData.IDCARD_AddrDistrictID || 0, // 1001,
                            IDCARD_AddrProvinceID: resEditData.IDCARD_AddrProvinceID || 0, // 10,
                            IDCARD_Postcode: resEditData.IDCARD_Postcode || '', // 12345,
                            IDCard_Addrzone: resEditData.IDCard_Addrzone || '',
                            Contact_AddNo: resEditData.Contact_AddNo || '',
                            Contact_AddMoo: resEditData.Contact_AddMoo || '',
                            Contact_AddrSoiRoad: resEditData.Contact_AddrSoiRoad || '',
                            Contact_AddrSubdistrictID: resEditData.Contact_AddrSubdistrictID || 0,
                            Contact_AddrDistrictID: resEditData.Contact_AddrDistrictID || 0,
                            Contact_AddrProvinceID: resEditData.Contact_AddrProvinceID || 0,
                            Contact_Postcode: resEditData.Contact_Postcode || '',
                            Contact_Addrzone: resEditData.Contact_Addrzone || '',
                            FarmerGrade: resEditData.FarmerGrade || '',
                            Request: resEditData.Request || '',
    
                        })

                        // Get District
                        let dataDistrictList = JSON.parse(localStorage.getItem('districtlist'))
                        let districtIDCardEditList = [];
                        let districtContactEditList = [];

                        for(let i=0; i<dataDistrictList.length; i++) {
                            if(resEditData.IDCARD_AddrProvinceID === dataDistrictList[i].ProvinceID) {
                                // console.log(dataDistrictList[i].DistrictID,)
                                districtIDCardEditList.push({
                                    "ProvinceID": dataDistrictList[i].ProvinceID,
                                    "DistrictID": dataDistrictList[i].DistrictID,
                                    "AM_NAME": dataDistrictList[i].AM_NAME
                                })
                            }
                        }
                        for(let i=0; i<dataDistrictList.length; i++) {
                            if(resEditData.Contact_AddrProvinceID === dataDistrictList[i].ProvinceID) {
                                // console.log(dataDistrictList[i].DistrictID,)
                                districtContactEditList.push({
                                    "ProvinceID": dataDistrictList[i].ProvinceID,
                                    "DistrictID": dataDistrictList[i].DistrictID,
                                    "AM_NAME": dataDistrictList[i].AM_NAME
                                })
                            }
                        }

                        setDistrictIDCardList(districtIDCardEditList)
                        setDistrictContactList(districtContactEditList)

                         // Get SubDistrict
                        let dataSubDistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))
                        let subdistrictIDCardEditList = [];
                        let subdistrictContactEditList = [];

                        for(let i=0; i<dataSubDistrictList.length; i++) {
                            if(resEditData.IDCARD_AddrDistrictID === dataSubDistrictList[i].DistrictID) {
                                subdistrictIDCardEditList.push({
                                    "ProvinceID": dataSubDistrictList[i].ProvinceID,
                                    "DistrictID": dataSubDistrictList[i].DistrictID,
                                    "SubdistrictID": dataSubDistrictList[i].SubdistrictID,
                                    "TB_NAME": dataSubDistrictList[i].TB_NAME,
                                    "POSTAL": dataSubDistrictList[i].POSTAL
                                })
                            }
                        }
                        for(let i=0; i<dataSubDistrictList.length; i++) {
                            if(resEditData.Contact_AddrDistrictID === dataSubDistrictList[i].DistrictID) {
                                subdistrictContactEditList.push({
                                    "ProvinceID": dataSubDistrictList[i].ProvinceID,
                                    "DistrictID": dataSubDistrictList[i].DistrictID,
                                    "SubdistrictID": dataSubDistrictList[i].SubdistrictID,
                                    "TB_NAME": dataSubDistrictList[i].TB_NAME,
                                    "POSTAL": dataSubDistrictList[i].POSTAL
                                })
                            }
                        }

                        setSubDistrictIDCardList(subdistrictIDCardEditList)
                        setSubDistrictContactList(subdistrictContactEditList)

                        
                    //  fetchGetDistrict();
                    //  fetchGetSubDistrict();
                    }
                }
            ).catch(err => { console.log(err) })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }

        // Check Login
        async function fetchCheckLogin() {
            const res = await fetch(`${server_hostname}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    "token": token
                }
            })
            res
                .json()
                .then(res => {
                    if (res.code === 0 || res === '' || res === undefined) {
                        history.push('/');
                        setErr(true);
                    }
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
        getFarmer();

        // executed when component mounted
      isMounted.current = true;
      return () => {
        // executed when unmount
        isMounted.current = false;
      }

    }, [])


    // Get District
    async function fetchGetDistrict(type, proviceID) {
        console.log('fetchGetDistrict:proviceID',proviceID)
        console.log('fetchGetDistrict:type',type)
        const res = await fetch(`${server_hostname}/admin/api/get_districts`, {
            method: 'POST',
            body: JSON.stringify({ 
                "ProvinceID": proviceID,
                "DistrictID": "",
                "AM_NAME": ""
            }),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": token
            }
        })
        res
            .json()
            .then(res => {
                if (res.code === 0 || res === '' || res === undefined) {
                    console.log('ไม่พบ เขต/อำเภอ');
                }
                // console.log('district',res.data)
                if(type === 'IDCARD_AddrProvinceID') {
                    setDistrictIDCardList(res.data)
                    setSubDistrictIDCardList([])
                    setInputData({
                        ...inputData,
                        IDCARD_AddrProvinceID: proviceID,
                        IDCARD_AddrDistrictID: 0,
                        IDCARD_AddrSubdistrictID: 0
                    })
                } else if(type === 'Contact_AddrProvinceID') {
                    setDistrictContactList(res.data)
                    setSubDistrictContactList([])
                    setInputData({
                        ...inputData,
                        Contact_AddrProvinceID: proviceID,
                        Contact_AddrDistrictID: 0,
                        Contact_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID')   {
                    setDistrictLandList(res.data)
                    setSubDistrictLandList([])
                    setInputData({
                        ...inputData,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_1')   {
                    setDistrictLand1List(res.data)
                    setSubDistrictLand1List([])
                    setInputDataLand1({
                        ...inputDataLand1,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_2')   {
                    setDistrictLand2List(res.data)
                    setSubDistrictLand2List([])
                    setInputDataLand2({
                        ...inputDataLand2,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_3')   {
                    setDistrictLand3List(res.data)
                    setSubDistrictLand3List([])
                    setInputDataLand3({
                        ...inputDataLand3,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_4')   {
                    setDistrictLand4List(res.data)
                    setSubDistrictLand4List([])
                    setInputDataLand4({
                        ...inputDataLand4,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_5')   {
                    setDistrictLand5List(res.data)
                    setSubDistrictLand5List([])
                    setInputDataLand5({
                        ...inputDataLand5,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else if(type === 'Land_AddrProvinceID_0')   {
                    setDistrictLandAddList(res.data)
                    setSubDistrictLandAddList([])
                    setInputDataLandAdd({
                        ...inputDataLandAdd,
                        Land_AddrProvinceID: proviceID,
                        Land_AddrDistrictID: 0,
                        Land_AddrSubdistrictID: 0
                    })
                } else {
                    setDistrictIDCardList(res.data)
                    setDistrictContactList(res.data)
                    // setDistrictLandList(res.data)
                    // setDistrictLand1List(res.data)
                    // setDistrictLand2List(res.data)
                    // setDistrictLand3List(res.data)
                    // setDistrictLand4List(res.data)
                    // setDistrictLand5List(res.data)
                    // setDistrictLandAddList(res.data)
                }

            })
            .catch(err => {
                console.log(err);
                console.log('ไม่พบ เขต/อำเภอ');
            });
    }

    // Get SubDistrict
    async function fetchGetSubDistrict(type, districtID) {
        const res = await fetch(`${server_hostname}/admin/api/get_subdistricts`, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                "ProvinceID": "",
                "DistrictID": districtID,
                "SubdistrictID": "",
                "TB_NAME": ""
            }),
            headers: {
                // "x-application-secret-key": apiXKey,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "token": token
            }
                
        })
        res
            .json()
            .then(res => {
                if (res.code === 0 || res === '' || res === undefined) {
                    console.log('ไม่พบ แขวง/ตำบล');
                }
                // console.log('district',res.data)
                
                if(type === 'IDCARD_AddrDistrictID') {
                    setSubDistrictIDCardList(res.data)
                } else if(type === 'Contact_AddrDistrictID') {
                    setSubDistrictContactList(res.data)
                } else if(type === 'Land_AddrDistrictID')  {
                    setSubDistrictLandList(res.data)
                } else if(type === 'Land_AddrDistrictID_1')  {
                    setSubDistrictLand1List(res.data)
                } else if(type === 'Land_AddrDistrictID_2')  {
                    setSubDistrictLand2List(res.data)
                } else if(type === 'Land_AddrDistrictID_3')  {
                    setSubDistrictLand3List(res.data)
                } else if(type === 'Land_AddrDistrictID_4')  {
                    setSubDistrictLand4List(res.data)
                } else if(type === 'Land_AddrDistrictID_5')  {
                    setSubDistrictLand5List(res.data)
                } else if(type === 'Land_AddrDistrictID_0')  {
                    setSubDistrictLandAddList(res.data)
                } else {
                    setSubDistrictIDCardList(res.data)
                    setSubDistrictContactList(res.data)
                    // setSubDistrictLandList(res.data)
                    // setSubDistrictLand1List(res.data)
                    // setSubDistrictLand2List(res.data)
                    // setSubDistrictLand3List(res.data)
                    // setSubDistrictLand4List(res.data)
                    // setSubDistrictLand5List(res.data)
                    // setSubDistrictLandAddList(res.data)
                }
            })
            .catch(err => {
                console.log(err);
                console.log('ไม่พบ แขวง/ตำบล');
            });
    }

    // Input Relation Province, District, Sub District
    const handleInputDataProvince = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        if(event.target.value > 0) {
            fetchGetDistrict(event.target.name, event.target.value);
        } else {

        }
    }
    
    const handleInputDataDistrict = (event) => {
        setInputData({
            ...inputData,
            [event.target.name]: event.target.value
        })
        if(event.target.value > 0) {
            fetchGetSubDistrict(event.target.name, event.target.value);
        }
    }

    const handleInputDataLandProvince = (event, idname) => {
        console.log(idname)
        let num = idname.slice(-1);
        let name = event.target.name
        console.log('event.target.value',event.target.value)
        if(num === '1') {
            if(event.target.value === 0) {
                setDistrictLand1List([])
                setSubDistrictLand1List([])
                setDistrictLand1List([0])
                setSubDistrictLand1List([0])
            }
            setInputDataLand1({
                ...inputDataLand1,
                [name]: event.target.value
            })
        } else if(num === '2') {
            if(event.target.value === 0) {
                setDistrictLand2List([])
                setSubDistrictLand2List([])
                setDistrictLand2List([0])
                setSubDistrictLand2List([0])
            }
            setInputDataLand2({
                ...inputDataLand2,
                [name]: event.target.value
            })
        } else if(num === '3') {
            if(event.target.value === 0) {
                setDistrictLand3List([])
                setSubDistrictLand3List([])
                setDistrictLand3List([0])
                setSubDistrictLand3List([0])
            }
            
            setInputDataLand3({
                ...inputDataLand3,
                [name]: event.target.value
            })
        } else if(num === '4') {
            if(event.target.value === 0) {
                setDistrictLand4List([])
                setSubDistrictLand4List([])
                setDistrictLand4List([0])
                setSubDistrictLand4List([0])
            }
            setInputDataLand4({
                ...inputDataLand4,
                [name]: event.target.value
            })
        } else if(num === '5') {
            if(event.target.value === 0) {
                setDistrictLand5List([])
                setSubDistrictLand5List([])
                setDistrictLand5List([0])
                setSubDistrictLand5List([0])
            }
            setInputDataLand5({
                ...inputDataLand5,
                [name]: event.target.value
            })
        } else if(num === '0') {
            if(event.target.value === 0) {
                setDistrictLandAddList([])
                setSubDistrictLandAddList([])
                setDistrictLandAddList([0])
                setSubDistrictLandAddList([0])
            }
            setInputDataLandAdd({
                ...inputDataLandAdd,
                [name]: event.target.value
            })
        } 


        if(event.target.value > 0) {
            fetchGetDistrict(idname, event.target.value);
        }
    }
    
    const handleInputDataLandDistrict = (event,idname) => {
        console.log(idname)
        let num = idname.slice(-1);
        let name = event.target.name
        console.log('event.target.value',event.target.value)
        
        if(num === '1') {
            setInputDataLand1({
                ...inputDataLand1,
                [name]: event.target.value
            })
        } else if(num === '2') {
            setInputDataLand2({
                ...inputDataLand2,
                [name]: event.target.value
            })
        } else if(num === '3') {
            setInputDataLand3({
                ...inputDataLand3,
                [name]: event.target.value
            })
        } else if(num === '4') {
            setInputDataLand4({
                ...inputDataLand4,
                [name]: event.target.value
            })
        } else if(num === '5') {
            setInputDataLand5({
                ...inputDataLand5,
                [name]: event.target.value
            })
        } else if(num === '0') {
            setInputDataLandAdd({
                ...inputDataLandAdd,
                [name]: event.target.value
            })
        } 
        if(event.target.value > 0) {
            fetchGetSubDistrict(idname, event.target.value);
        }
    }
    

    const handleUploadImg = (event) => {
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

    const handleRemoveUploadImg = (event) => {
        setInputData({...inputData, imgUpload: null})
        // let myFile = document.querySelector("input[type=file]").files[0];
        let myFile = document.getElementById("addmember-img-upload-input")
        myFile.type = ''
        myFile.type = 'file'
    }

    const handleSelectBirthDate = (event) => {
        let type = event.target.name
        setInputSelectBirthDate({
            ...inputSelectBirthDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
    }

    const handleSelectExpireDate = (event) => {
        let type = event.target.name
        setInputSelectExpireDate({
            ...inputSelectExpireDate,
            [event.target.name]: event.target.value.toString()
        })
        console.log('type',type, 'value', event.target.value)
    }

    // Input Text field 
    const handleInputData = (event) => {
        // console.log('event.target.name',event.target.name)
        if(event.target.type === 'number') {
            console.log('normal0')
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
                console.log('normal2')
                setInputData({
                    ...inputData,
                    [event.target.name]: event.target.value
                })

            }
        } else {
            console.log('normal1')
            setInputData({
                ...inputData,
                [event.target.name]: event.target.value
            })
        }
        // console.log(event)
    }

    const handleInputDataLand1 = (event) => {
        let name = event.target.name
        setInputDataLand1({
            ...inputDataLand1,
            [name]: event.target.value
        })
    }

    const handleInputDataLand2 = (event) => {
        let name = event.target.name
        setInputDataLand2({
            ...inputDataLand2,
            [name]: event.target.value
        })
    }

    const handleInputDataLand3 = (event) => {
        let name = event.target.name
        setInputDataLand3({
            ...inputDataLand3,
            [name]: event.target.value
        })
    }

    const handleInputDataLand4 = (event) => {
        let name = event.target.name
        setInputDataLand4({
            ...inputDataLand4,
            [name]: event.target.value
        })
    }

    const handleInputDataLand5 = (event) => {
        let name = event.target.name
        setInputDataLand5({
            ...inputDataLand5,
            [name]: event.target.value
        })
    }
    const handleInputDataLandAdd = (event) => {
        let name = event.target.name
        // console.log(name, event.target.value)
        setInputDataLandAdd({
            ...inputDataLandAdd,
            [name]: event.target.value
        })
    }

    const handleDuplicateAddr = (event) => {
        const checked = event.target.checked;
        setAddressIDCard(checked)
        if(checked) {
            setDuplicateAddr(true);
            // console.warn(inputData)
        } else {
            setDuplicateAddr(false);
        }
    }

    const handleValidateNumberOnBlur = (event) => {
        console.log(event)
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


    // Submit Data ---------------------------------------------------------------------------//
    const handleSubmit = async (event) => {
        event.preventDefault();
        const myFile = document.querySelector("input[type=file]").files[0];


        let addFarmerForm = document.getElementById('addFarmerForm');
        let formData = new FormData(addFarmerForm);
        formData.append('FarmerID', props.location.state.FarmerID)
        // formData.append('BirthDate', inputData.BirthDate === null || inputData.BirthDate === 'Invalid date' ? null : moment(inputData.BirthDate).format('YYYY-MM-DD'))
        // formData.append('IDCardEXP_Date', inputData.IDCardEXP_Date === null || inputData.IDCardEXP_Date === 'Invalid date' ? null :  moment(inputData.IDCardEXP_Date).format('YYYY-MM-DD'))

        formData.append('BirthDate', Number(inputSelectBirthDate.yyyy.substring(0,4)) - 543+'-'+inputSelectBirthDate.mm+'-'+inputSelectBirthDate.dd)
        formData.append('IDCardEXP_Date', Number(inputSelectExpireDate.yyyy2.substring(0,4)) - 543+'-'+inputSelectExpireDate.mm2+'-'+inputSelectExpireDate.dd2)
        
        formData.delete('dd')
        formData.delete('mm')
        formData.delete('yyyy')
        formData.delete('dd2')
        formData.delete('mm2')
        formData.delete('yyyy2')

        if(duplicateAddr) {
            formData.append('Contact_AddNo', inputData.IDCARD_AddNo)
            formData.append('Contact_AddMoo', inputData.IDCARD_AddMoo)
            formData.append('Contact_AddrSoiRoad', inputData.IDCARD_AddrSoiRoad)
            formData.append('Contact_AddrSubdistrictID', inputData.IDCARD_AddrSubdistrictID)
            formData.append('Contact_AddrDistrictID', inputData.IDCARD_AddrDistrictID)
            formData.append('Contact_AddrProvinceID', inputData.IDCARD_AddrProvinceID)
            formData.append('Contact_Postcode', inputData.IDCARD_Postcode)
            // formData.append('Contact_Addrzone', inputData.IDCARD_Addrzone)
            // formData.append('file', inputData.imgUpload)
        }
    

        axios.post(
            `${server_hostname}/admin/api/edit_farmer`, formData, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
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

    const handleEditLand = async (LandID, i) => {
        // event.preventDefault();
        console.log('LandID',LandID)

        let editFarmerLandForm = document.getElementById('editFarmerLandForm'+(i+1));
        let formData = new FormData(editFarmerLandForm);
        formData.append('FarmerID', props.location.state.FarmerID)
        formData.append('LandID', LandID)

        console.log('DocLand_code',inputDataLand4.DocLand_code)
        console.log('DocLand_name',inputDataLand4.DocLand_name)

        axios.post(
            `${server_hostname}/admin/api/edit_spkland`, formData, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
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

    const handleAddLand = async (LandID, i) => {
        // event.preventDefault();
        console.log('LandID',LandID)

        let addFarmerLandForm = document.getElementById('addFarmerLandForm');
        let formData = new FormData(addFarmerLandForm);
        formData.append('FarmerID', props.location.state.FarmerID)
        formData.append('LandType', 0)


        axios.post(
            `${server_hostname}/admin/api/add_spkland`, formData, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
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


    const handleDeleteLand = async (LandID) => {
        // event.preventDefault();
        console.log('LandID',LandID)

        axios.post(
            `${server_hostname}/admin/api/delete_spkland`, {
                "FarmerID": props.location.state.FarmerID,
                "LandID": LandID
            }, { headers: { "token": token } } 
        ).then(res => {
                console.log(res)
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
                }else {
                    // history.push('/manageinfo/searchmember')
                    setSuccess(true);
                    setSuccessMsg('ลบข้อมูลเรียบร้อย')
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


    const FormLandEdit = (i, LandID, Land_AddMoo, Land_AddrProvinceID, Land_AddrDistrictID, Land_AddrSubdistrictID, DocLand_code, LandNumber, LandGroup, Plang, Rai, Ngan, Wa, handleInputDataLand, districtLandList, subDistrictLandList) => {
        
        // Get District
        let dataDistrictList = JSON.parse(localStorage.getItem('districtlist'))
        let districtList = [];

        for(let i=0; i<dataDistrictList.length; i++) {
            if(Land_AddrProvinceID === dataDistrictList[i].ProvinceID) {
                districtList.push({
                    "ProvinceID": dataDistrictList[i].ProvinceID,
                    "DistrictID": dataDistrictList[i].DistrictID,
                    "AM_NAME": dataDistrictList[i].AM_NAME
                })
            }
        }

         // Get SubDistrict
        let dataSubDistrictList = JSON.parse(localStorage.getItem('subdistrictlist'))
        let subdistrictList = [];

        for(let i=0; i<dataSubDistrictList.length; i++) {
            if(Land_AddrDistrictID === dataSubDistrictList[i].DistrictID) {
                subdistrictList.push({
                    "ProvinceID": dataSubDistrictList[i].ProvinceID,
                    "DistrictID": dataSubDistrictList[i].DistrictID,
                    "SubdistrictID": dataSubDistrictList[i].SubdistrictID,
                    "TB_NAME": dataSubDistrictList[i].TB_NAME,
                    "POSTAL": dataSubDistrictList[i].POSTAL
                })
            }
        }

        return (
                <React.Fragment key={i}>

                    <form id={`editFarmerLandForm${i+1}`} noValidate autoComplete="off">
                        <Grid item xs={12} md={12}>
                            <Paper className="paper line-top-green paper">
                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={2} className="paper-container">
                                        <Grid item xs={12} md={12}>
                                            <span className="txt-black" style={{fontSize: '18px'}}> ที่ตั้งที่ดิน</span>
                                            <span className="txt-green fl-r"> ข้อมูลชุดที่ {i+1}</span>
                                            <Divider variant="middle" style={{ margin: '0' }} />
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                            <span>Alro Land</span>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiTextfield label="หมู่ที่" id={`Land_AddMoo_${i+1}`} defaultValue="" value={Land_AddMoo} name={`Land_AddMoo`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MuiSelectProvince label="จังหวัด" id={`Land_AddrProvinceID_${i+1}`}  lists={provinceLandList}  value={Land_AddrProvinceID} name={`Land_AddrProvinceID`} onChange={(event)=>handleInputDataLandProvince(event, `Land_AddrProvinceID_${i+1}`)}/>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MuiSelectDistrict label="เขต / อำเภอ" id={`Land_AddrDistrictID_${i+1}`}  lists={districtList} value={Land_AddrDistrictID} name={`Land_AddrDistrictID`} onChange={(event)=>handleInputDataLandDistrict(event, `Land_AddrDistrictID_${i+1}`)} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <MuiSelectSubDistrict label="แขวง / ตำบล" id={`Land_AddrSubdistrictID_${i+1}`}  lists={subdistrictList} value={Land_AddrSubdistrictID} name={`Land_AddrSubdistrictID`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <MuiSelectObj label="ประเภทหนังสือสำคัญ" id={`DocLand_code_${i+1}`} itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={DocLand_code} name={`DocLand_code`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="เลขที่"  id={`LandNumber_${i+1}`}  value={LandNumber} name={`LandNumber`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="กลุ่ม" id={`LandGroup_${i+1}`}  value={LandGroup} name={`LandGroup`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfield label="แปลง" id={`Plang_${i+1}`}  value={Plang} name={`Plang`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfieldEndAdornment label="เนื้อที่"  id={`Rai_${i+1}`} value={Rai}  endAdornment="ไร่" name={`Rai`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfieldEndAdornment label="&nbsp;" id={`Ngan_${i+1}`} value={Ngan}  endAdornment="งาน" name={`Ngan`} onChange={handleInputDataLand} />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <MuiTextfieldEndAdornment label="&nbsp;" id={`Wa_${i+1}`} value={Wa}  endAdornment="วา" name={`Wa`} onChange={handleInputDataLand} />
                                        </Grid>
                                        
                                        <Grid item xs={12} md={6}>
                                            <ButtonFluidOutlineSecondary label="ลบข้อมูลที่ตั้งที่ดิน" onClick={()=>{setDeleteLand(true); setDeleteLandID(LandID)}} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <ButtonFluidPrimary label={`บันทึกข้อมูลที่ตั้งที่ดิน (${i+1})`} onClick={()=>handleEditLand(LandID, i)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </form>
                </React.Fragment>
        );
    }

    const handleGotoSearch = () => {
        setSuccess(false);
        history.push('/manageinfo/searchmember');

    };

    const handleReload = () => {
        setErrMsg('')
        setErr(false);
        setSuccess(false);
        setDeleteLand(false);
        window.location.reload();
        // history.push(
        // {
        //     pathname: '/manageinfo/editfarmer',
        //     state: { FarmerID: props.location.state.FarmerID || 0 }
        //   }
        // );

    };

    const handleClosePopup = () => {
        setErr(false);
        setSuccess(false);
        setDeleteLand(false);
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
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} className="title-page">
                                    <h1>แก้ไขข้อมูลเกษตรกร</h1>
                                </Grid>

                            <form id="addFarmerForm" noValidate autoComplete="off">
                                {/* Paper 1 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper mg-t-20">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="IDCard" value={inputData.IDCard} onInput={handleInputData} onBlur={handleValidateNumberOnBlur} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <MuiRadioButton label="ประเภทสมาชิก" lists={['รายบุคคล', 'สถาบัน', 'บุคคลภายนอก']} value={inputData.LoanFarmerTypeID} name="LoanFarmerTypeID" onChange={handleInputData} type="row" />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {/* Field Select ---------------------------------------------------*/}
                                                <MuiSelect label="คำนำหน้า" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName" value={inputData.FrontName} onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="ชื่อ" defaultValue="" value={inputData.Name} name="Name" onChange={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="นามสกุล" defaultValue="" value={inputData.Sirname} name="Sirname" onChange={handleInputData} />
                                            </Grid>

                                            {/* <Grid item xs={12} md={12}>
                                                <Flatpickr
                                                    lang={Thai}
                                                    value={moment}
                                                    options={{
                                                        "locale": Thai
                                                    }}
                                                />
                                            </Grid> */}

                                            <Grid item xs={12} md={12}> <Grid item xs={12} md={12}>
                                                    <p>วัน เดือน ปี เกิด</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectBirthDate.dd} onChange={handleSelectBirthDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectBirthDate.mm} onChange={handleSelectBirthDate} />
                                                        <MuiSelectYear label="" name="yyyy" value={inputSelectBirthDate.yyyy} onChange={handleSelectBirthDate} />
                                                    </div>
                                                    {/* 
                                                        <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" name="BirthDate" value={inputData.BirthDate} onChange={(newValue)=>{ setInputData({ ...inputData, BirthDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                    */}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <Grid item xs={12} md={12}>
                                                    <p>วันหมดอายุบัตรประจำตัวประชาชน</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd2" value={inputSelectExpireDate.dd2} onChange={handleSelectExpireDate} />
                                                        <MuiSelectMonth label="" name="mm2" value={inputSelectExpireDate.mm2} onChange={handleSelectExpireDate} />
                                                        <MuiSelectYear label="" name="yyyy2" value={inputSelectExpireDate.yyyy2} onChange={handleSelectExpireDate} />
                                                    </div>
                                                    {/* <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input"  name="IDCardEXP_Date" value={inputData.IDCardEXP_Date}  onChange={(newValue)=>{ setInputData({ ...inputData, IDCardEXP_Date: moment(newValue).format('YYYY-MM-DD')}) }}  />*/}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                {/* Field Number ---------------------------------------------------*/}
                                                <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel" defaultValue="" placeholder="ตัวอย่าง 0812345678" name="Tel"  value={inputData.Tel} onInput={handleInputData} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <img src={`${server_production}${pathIDCard_Image}`} alt="" style={{width: '100%'}}/>
                                                <span style={{display: 'block'}}>อัพโหลดรูปบัตรประชาชน</span>
                                                <MuiUpload imgUpload={inputData.imgUpload} id="addmember-img-upload-input" name="file" onChange={handleUploadImg} onClick={handleRemoveUploadImg} />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Paper 2 -------------------------------------------------- */}
                                <Grid item xs={12} md={12}>
                                    <Paper className="paper line-top-green paper">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={12}>
                                                <MuiLabelHeader label="ที่อยู่ตามบัตรประชาชน"/>
                                                <Divider variant="middle" style={{ margin: '0' }} />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="บ้านเลขที่" id="addmember-idcard-addr1-input" value={inputData.IDCARD_AddNo} name="IDCARD_AddNo" onChange={handleInputData}  />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                {/* Field Text ---------------------------------------------------*/}
                                                <MuiTextfield label="หมู่ที่" id="addmember-idcard-addr2-input" value={inputData.IDCARD_AddMoo} name="IDCARD_AddMoo" onChange={handleInputData}  />
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
                                                <MuiCheckbox label="ที่อยู่ตามบัตรประชาชน" id="addmember-contact-idcard-checkbox" checked={addressIDCard} onChange={handleDuplicateAddr} />
                                            </Grid>
                                            {
                                                !duplicateAddr ? 
                                                    <React.Fragment>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="บ้านเลขที่" value={inputData.Contact_AddNo} name="Contact_AddNo" onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="หมู่ที่" value={inputData.Contact_AddMoo} name="Contact_AddMoo" onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield label="หมู่ซอย / ถนนที่" value={inputData.Contact_AddrSoiRoad} name="Contact_AddrSoiRoad" onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectProvince label="จังหวัด" lists={provinceContactList}  value={inputData.Contact_AddrProvinceID} name="Contact_AddrProvinceID" onChange={handleInputDataProvince} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectDistrict label="เขต / อำเภอ" lists={districtContactList} value={inputData.Contact_AddrDistrictID} name="Contact_AddrDistrictID" onChange={handleInputDataDistrict}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictContactList} value={inputData.Contact_AddrSubdistrictID} name="Contact_AddrSubdistrictID" onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextNumber label="รหัสไปรษณีย์" id="addmember1-zip" placeholder="ตัวอย่าง 10230" value={inputData.Contact_Postcode} name="Contact_Postcode" onInput={handleInputData} />
                                                        </Grid>
                                                    </React.Fragment>
                                                :
                                                    <React.Fragment>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="บ้านเลขที่" value={''}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="หมู่ที่" value={''} />
                                                        </Grid>
                                                        <Grid item xs={12} md={12}>
                                                            <MuiTextfield disabled label="หมู่ซอย / ถนนที่"  value={''}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="จังหวัด"  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="เขต / อำเภอ"   />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="แขวง / ตำบล" />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield disabled label="รหัสไปรษณีย์" id="addmembe2-zip" defaultValue="" placeholder="ตัวอย่าง 10230" />
                                                        </Grid>
                                                    </React.Fragment>
                                            }
                                           
                                        </Grid>
                                    </Paper>
                                </Grid>

                                <Grid container spacing={2} className="btn-row mg-t-10">
                                    {/* Button Row -------------------------------------------------- */}
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <ButtonFluidPrimary label="บันทึกข้อมูลเกษตรกร" onClick={handleSubmit} />
                                    </Grid>
                                </Grid>

                            </form>
                            
                                {/* Paper 4 -------------------------------------------------- */}
                            
                                {
                                    landData.map((item, i) => {
                                        if(i===0) {
                                            return (
                                                FormLandEdit(i, item.LandID, inputDataLand1.Land_AddMoo, inputDataLand1.Land_AddrProvinceID, inputDataLand1.Land_AddrDistrictID, inputDataLand1.Land_AddrSubdistrictID, inputDataLand1.DocLand_code, inputDataLand1.LandNumber, inputDataLand1.LandGroup, inputDataLand1.Plang, inputDataLand1.Rai, inputDataLand1.Ngan, inputDataLand1.Wa, handleInputDataLand1, districtLand1List, subDistrictLand1List)
                                            )
                                        } else if(i===1) {
                                            return (
                                                FormLandEdit(i, item.LandID, inputDataLand2.Land_AddMoo, inputDataLand2.Land_AddrProvinceID, inputDataLand2.Land_AddrDistrictID, inputDataLand2.Land_AddrSubdistrictID, inputDataLand2.DocLand_code, inputDataLand2.LandNumber, inputDataLand2.LandGroup, inputDataLand2.Plang, inputDataLand2.Rai, inputDataLand2.Ngan, inputDataLand2.Wa, handleInputDataLand2, districtLand2List, subDistrictLand2List)
                                            )
                                        } else if(i===2) {
                                            return (
                                                FormLandEdit(i, item.LandID, inputDataLand3.Land_AddMoo, inputDataLand3.Land_AddrProvinceID, inputDataLand3.Land_AddrDistrictID, inputDataLand3.Land_AddrSubdistrictID, inputDataLand3.DocLand_code, inputDataLand3.LandNumber, inputDataLand3.LandGroup, inputDataLand3.Plang, inputDataLand3.Rai, inputDataLand3.Ngan, inputDataLand3.Wa, handleInputDataLand3, districtLand3List, subDistrictLand3List)
                                            )
                                        } else if(i===3) {
                                            return (
                                                FormLandEdit(i, item.LandID, inputDataLand4.Land_AddMoo, inputDataLand4.Land_AddrProvinceID, inputDataLand4.Land_AddrDistrictID, inputDataLand4.Land_AddrSubdistrictID, inputDataLand4.DocLand_code, inputDataLand4.LandNumber, inputDataLand4.LandGroup, inputDataLand4.Plang, inputDataLand4.Rai, inputDataLand4.Ngan, inputDataLand4.Wa, handleInputDataLand4, districtLand4List, subDistrictLand4List)
                                            )
                                        }  else {
                                            return (
                                                FormLandEdit(i, item.LandID, inputDataLand5.Land_AddMoo, inputDataLand5.Land_AddrProvinceID, inputDataLand5.Land_AddrDistrictID, inputDataLand5.Land_AddrSubdistrictID, inputDataLand5.DocLand_code, inputDataLand5.LandNumber, inputDataLand5.LandGroup, inputDataLand5.Plang, inputDataLand5.Rai, inputDataLand5.Ngan, inputDataLand5.Wa, handleInputDataLand5, districtLand5List, subDistrictLand5List)
                                            )
                                        }
                                    })
                                }

                                {
                                    (landData.length >= 5) ? 
                                        '' 
                                    : 
                                        <form id={`addFarmerLandForm`} noValidate autoComplete="off">
                                            <Grid item xs={12} md={12}>
                                                <Paper className="paper line-top-green paper">
                                                    <Grid item xs={12} md={12}>
                                                        <Grid container spacing={2} className="paper-container">
                                                            <Grid item xs={12} md={12}>
                                                                <span className="txt-black" style={{fontSize: '18px'}}>+ เพิ่มที่ตั้งที่ดิน</span>
                                                                {/* <span className="txt-green fl-r">+ เพิ่มข้อมูลที่ตั้งที่ดิน</span> */}
                                                                <Divider variant="middle" style={{ margin: '0' }} />
                                                            </Grid>

                                                            <Grid item xs={12} md={12}>
                                                                <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                                <span>Alro Land</span>
                                                                {/* <MuiCheckbox label="Alro Land" /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield label="หมู่ที่" id={`Land_AddMoo_0`} defaultValue="" value={inputDataLandAdd.Land_AddMoo} name={`Land_AddMoo`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectProvince label="จังหวัด" id={`Land_AddrProvinceID_0`}  lists={provinceLandList}  value={inputDataLandAdd.Land_AddrProvinceID} name={`Land_AddrProvinceID`} onChange={(event)=>handleInputDataLandProvince(event, `Land_AddrProvinceID_0`)}/>
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" id={`Land_AddrDistrictID_0`}  lists={districtLandAddList} value={inputDataLandAdd.Land_AddrDistrictID} name={`Land_AddrDistrictID`} onChange={(event)=>handleInputDataLandDistrict(event, `Land_AddrDistrictID_0`)} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" id={`Land_AddrSubdistrictID_0`}  lists={subDistrictLandAddList} value={inputDataLandAdd.Land_AddrSubdistrictID} name={`Land_AddrSubdistrictID`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiSelectObj label="ประเภทหนังสือสำคัญ" id={`DocLand_code_0`} itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLandAdd.DocLand_code} name={`DocLand_code`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เลขที่"  id={`LandNumber_0`}  value={inputDataLandAdd.LandNumber} name={`LandNumber`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="กลุ่ม" id={`LandGroup_0`}  value={inputDataLandAdd.LandGroup} name={`LandGroup`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แปลง" id={`Plang_0`}  value={inputDataLandAdd.Plang} name={`Plang`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfieldEndAdornment label="เนื้อที่"  id={`Rai_0`} value={inputDataLandAdd.Rai}  endAdornment="ไร่" name={`Rai`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfieldEndAdornment label="&nbsp;" id={`Ngan_0`} value={inputDataLandAdd.Ngan}  endAdornment="งาน" name={`Ngan`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfieldEndAdornment label="&nbsp;" id={`Wa_0`} value={inputDataLandAdd.Wa}  endAdornment="วา" name={`Wa`} onChange={handleInputDataLandAdd} />
                                                            </Grid>
                                                            
                                                            <Grid item xs={12} md={12}>
                                                                <ButtonFluidPrimary label="บันทึกข้อมูลที่ตั้งที่ดิน" onClick={handleAddLand} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        </form>
        
                                }    

                            </Grid>
                    </Container>
                </div>
            </Fade>

            <Dialog
                open={success}
                onClose={handleClosePopup}
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
                                    <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleReload} color="primary" style={{justifyContent: 'center'}} />
                                
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

            <Dialog
                open={deleteLand}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="xs"
            >
                {/* <DialogTitle id="alert-dialog-title"></DialogTitle> */}
                <DialogContent>
                    
                    <div className="dialog-delete-land">
                        <p className="txt-center txt-black">คุณต้องการลบที่ตั้งที่ดินใช่หรือไม่</p>
                        <br/>
                        <Box textAlign='center'>
                            <ButtonFluidPrimary label="ยกเลิก" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />&nbsp;&nbsp;&nbsp;&nbsp;
                            <ButtonFluidOutlineSecondary label="ลบ" maxWidth="100px" onClick={()=>handleDeleteLand(deleteLandID)} color="primary" style={{justifyContent: 'center'}} />
                        </Box>
                    </div>
                
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default EditFarmer;
