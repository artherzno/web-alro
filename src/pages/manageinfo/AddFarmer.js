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
import {
    MuiLabelHeader,
    MuiTextfield,
    MuiTextfieldEndAdornment,
    MuiTextfieldNumber,
    MuiCheckbox,
    MuiSelect,
    MuiSelectObj,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiRadioButton,
    MuiRadioButtonStart1,
    MuiTextNumber,
    MuiDatePicker,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiUpload,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary
} from '../../components/MUIinputs';
import { AuthContext } from '../../App';


function AddFarmer(props) {
    const history = useHistory();
    const form = useRef('')
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(['เกิดข้อผิดพลาด '])
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('บันทึกข้อมูลเรียบร้อย')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [duplicateAddr, setDuplicateAddr] = useState(false);

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

    const [checkIDCard, setCheckIDCard] = useState(true);
    const [addressIDCard, setAddressIDCard] = useState('')

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
        LoanFarmerTypeID: '', // 1,
        FrontName: 'นาย', // 'นาย',
        Name: '', // 'จิมมี่',
        Sirname: '', // 'แซ่ฉ่วย',
        BirthDate: null, // '2022-12-11',
        Tel: '', // '087-712-8888',
        IDCardEXP_Date: null, // '2022-12-13',
        IDCardMade: '',
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
        OldName1: '',
        OldSirname1: '',
        OldName2: '',
        OldSirname2: '',
        BankAccount: '',
        BankBranch: '',
        BankName: '',
    })

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
        setInputData({
            ...inputData,
            BirthDate: null,
            IDCardEXP_Date: null,
        })

        let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
        setProvinceIDCardList(dataProvinceList)
        setProvinceContactList(dataProvinceList)
        setProvinceLandList(dataProvinceList)

        let dataDocLandTypeList = JSON.parse(localStorage.getItem('doclandtypelist'))
        setDocLandTypeList(dataDocLandTypeList)

        console.log(inputData.BirthDate)

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
                console.log('district',res.data)
                if(type === 'IDCARD_AddrProvinceID') {
                    setDistrictIDCardList(res.data)
                    setSubDistrictIDCardList([])
                    setInputData({
                        ...inputData,
                        IDCARD_AddrProvinceID: proviceID,
                        IDCARD_AddrDistrictID: 0,
                        IDCARD_AddrSubdistrictID: 0,
                        IDCARD_Postcode: ''
                    })
                } else if(type === 'Contact_AddrProvinceID') {
                    setDistrictContactList(res.data)
                    setSubDistrictContactList([])
                    setInputData({
                        ...inputData,
                        Contact_AddrProvinceID: proviceID,
                        Contact_AddrDistrictID: 0,
                        Contact_AddrSubdistrictID: 0,
                        Contact_Postcode: ''
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
                } else {
                    setDistrictIDCardList(res.data)
                    setDistrictContactList(res.data)
                    setDistrictLandList(res.data)
                    setDistrictLand1List(res.data)
                    setDistrictLand2List(res.data)
                    setDistrictLand3List(res.data)
                    setDistrictLand4List(res.data)
                    setDistrictLand5List(res.data)
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
                    setErr(true)
                } else {
                    console.log('subdistrict',res.data)
                
                    if(type === 'IDCARD_AddrDistrictID') {
                        setInputData({
                            ...inputData,
                            IDCARD_AddrDistrictID: districtID,
                            IDCARD_AddrSubdistrictID: 0,
                            IDCARD_Postcode: ''
                        })
                        setSubDistrictIDCardList(res.data)
                    } else if(type === 'Contact_AddrDistrictID') {
                        setInputData({
                            ...inputData,
                            Contact_AddrDistrictID: districtID,
                            Contact_AddrSubdistrictID: 0,
                            Contact_Postcode: ''
                        })
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
                    } else {
                        setSubDistrictIDCardList(res.data)
                        setSubDistrictContactList(res.data)
                        setSubDistrictLandList(res.data)
                        setSubDistrictLand1List(res.data)
                        setSubDistrictLand2List(res.data)
                        setSubDistrictLand3List(res.data)
                        setSubDistrictLand4List(res.data)
                        setSubDistrictLand5List(res.data)
                    }
                }
                
            })
            .catch(err => {
                console.log(err);
                console.log('ไม่พบ แขวง/ตำบล');
            });
    }

    // Get ZipCode
    async function fetchGetZipCode(type, subdistrictID) {
        const res = await fetch(`${server_hostname}/admin/api/get_subdistricts`, {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
                "ProvinceID": "",
                "DistrictID": "",
                "SubdistrictID": subdistrictID,
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
                console.log('ZipCode',type,res.data[0].POSTAL)
                
                if(type === 'IDCARD_AddrSubdistrictID') {
                    setInputData({
                        ...inputData,
                        IDCARD_AddrSubdistrictID: subdistrictID,
                        IDCARD_Postcode: res.data[0].POSTAL,
                    })
                } else if(type === 'Contact_AddrSubdistrictID') {
                    setInputData({
                        ...inputData,
                        Contact_AddrSubdistrictID: subdistrictID,
                        Contact_Postcode: res.data[0].POSTAL,
                    })
                } else {
                    // setSubDistrictIDCardList(res.data)
                    // setSubDistrictContactList(res.data)
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
        // setInputData({
        //     ...inputData,
        //     [event.target.name]: event.target.value
        // })
        if(event.target.value > 0) {
            fetchGetSubDistrict(event.target.name, event.target.value);
        }
    }

    const handleInputDataSubDistrict = (event) => {
        // setInputData({
        //     ...inputData,
        //     [event.target.name]: event.target.value
        // })
        if(event.target.value > 0) {
            fetchGetZipCode(event.target.name, event.target.value);
        }
    }

    const handleInputDataLandProvince = (event) => {
        let num = event.target.name.slice(-1);
        let name = event.target.name.slice(0, -2)
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
            if(event.target.value === 0) {
                setDistrictLand5List([])
                setSubDistrictLand5List([])
            }
            setInputDataLand5({
                ...inputDataLand5,
                [name]: event.target.value
            })
        } 


        if(event.target.value > 0) {
            fetchGetDistrict(event.target.name, event.target.value);
        }
    }
    
    const handleInputDataLandDistrict = (event) => {
        let num = event.target.name.slice(-1);
        let name = event.target.name.slice(0, -2)
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
        } 
        if(event.target.value > 0) {
            fetchGetSubDistrict(event.target.name, event.target.value);
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
        console.log('event.target.id.toString().slice(-3)',event.target.id.toString().slice(-3))
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

                setCheckIDCard(checkID(value));
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

    const handleInputDataLand1 = (event) => {
        let name = event.target.name.slice(0, -2)
        setInputDataLand1({
            ...inputDataLand1,
            [name]: event.target.value
        })
    }

    const handleInputDataLand2 = (event) => {
        let name = event.target.name.slice(0, -2)
        setInputDataLand2({
            ...inputDataLand2,
            [name]: event.target.value
        })
    }

    const handleInputDataLand3 = (event) => {
        let name = event.target.name.slice(0, -2)
        setInputDataLand3({
            ...inputDataLand3,
            [name]: event.target.value
        })
    }

    const handleInputDataLand4 = (event) => {
        let name = event.target.name.slice(0, -2)
        setInputDataLand4({
            ...inputDataLand4,
            [name]: event.target.value
        })
    }

    const handleInputDataLand5 = (event) => {
        let name = event.target.name.slice(0, -2)
        setInputDataLand5({
            ...inputDataLand5,
            [name]: event.target.value
        })
    }

    const handleDuplicateAddr = (event) => {
        const checked = event.target.checked;
        setAddressIDCard(checked)
        if(checked) {
            setDuplicateAddr(true);
            // fetchGetDistrict('Contact_AddrProvinceID', inputData.IDCARD_AddrProvinceID);
            // fetchGetSubDistrict('Contact_AddrDistrictID', inputData.IDCARD_AddrDistrictID);
            // setInputData({
            //     ...inputData,
            //     Contact_AddNo: inputData.IDCARD_AddNo,
            //     Contact_AddMoo: inputData.IDCARD_AddMoo,
            //     Contact_AddrSoiRoad: inputData.IDCARD_AddrSoiRoad,
            //     Contact_AddrSubdistrictID: inputData.IDCARD_AddrSubdistrictID,
            //     Contact_AddrDistrictID: inputData.IDCARD_AddrDistrictID,
            //     Contact_AddrProvinceID: inputData.IDCARD_AddrProvinceID,
            //     Contact_Postcode: inputData.IDCARD_Postcode,
            //     Contact_Addrzone: inputData.IDCard_Addrzone,
            // });
        } else {
            setDuplicateAddr(false);
            // setInputData({
            //     ...inputData,
            //     Contact_AddNo: '',
            //     Contact_AddMoo: '',
            //     Contact_AddrSoiRoad: '',
            //     Contact_AddrSubdistrictID: 0,
            //     Contact_AddrDistrictID: 0,
            //     Contact_AddrProvinceID: 0,
            //     Contact_Postcode: '',
            //     Contact_Addrzone: '',
            // }) 
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


        // var formData = new FormData;
        // var arr = ['this', 'is', 'an', 'array'];
        // for (var i = 0; i < arr.length; i++) {
        //     formData.append('arr[]', arr[i]);
        // }

        let landDataArr = []
        landDataArr.push(inputDataLand1)
        landDataArr.push(inputDataLand2)
        landDataArr.push(inputDataLand3)
        landDataArr.push(inputDataLand4)
        landDataArr.push(inputDataLand5)

        let addFarmerForm = document.getElementById('addFarmerForm');
        let formData = new FormData(addFarmerForm);
        formData.append('BirthDate', inputData.BirthDate)
        // formData.append('BirthDate', Number(inputSelectBirthDate.yyyy) - 543+'-'+inputSelectBirthDate.mm+'-'+inputSelectBirthDate.dd)
        formData.append('IDCardEXP_Date', inputData.IDCardEXP_Date)
        // formData.append('IDCardEXP_Date', Number(inputSelectExpireDate.yyyy2) - 543+'-'+inputSelectExpireDate.mm2+'-'+inputSelectExpireDate.dd2)
        
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
        }
        
        // if(duplicateAddr) {
        //     formData.append('Contact_AddNo', inputData.IDCARD_AddNo)
        //     formData.append('Contact_AddMoo', inputData.IDCARD_AddMoo)
        //     formData.append('Contact_AddrSoiRoad', inputData.IDCARD_AddrSoiRoad)
        //     formData.append('Contact_AddrSubdistrictID', inputData.IDCARD_AddrSubdistrictID)
        //     formData.append('Contact_AddrDistrictID', inputData.IDCARD_AddrDistrictID)
        //     formData.append('Contact_AddrProvinceID', inputData.IDCARD_AddrProvinceID)
        //     formData.append('Contact_Postcode', inputData.IDCARD_Postcode)
        //     // formData.append('Contact_Addrzone', inputData.IDCARD_Addrzone)
        //     // formData.append('file', inputData.imgUpload)
        // }
        formData.append('land_data', JSON.stringify(landDataArr));
        // for (var i = 0; i < inputData.land_data.length; i++) {
        //     formData.append('land_data[]', inputData.land_data[i]);
        // }

        axios.post(
            `${server_hostname}/admin/api/add_farmer`, formData, { headers: { "token": token } } 
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

    const cancelData = () => {
        history.push('/manageinfo/searchmember');
    }

    const addFormLandInfo = () => {
        setCountAddLandInfo(countAddLandInfo + 1)
    }

    const FormLandInfo = (i) => {
        return (
            <Grid container spacing={2} className="paper-container">
                <Grid item xs={12} md={12}>
                    <MuiLabelHeader label="ที่ตั้งที่ดิน" />
                    <Divider variant="middle" style={{ margin: '0' }} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                    <span>Alro Land</span>
                    {/* <MuiCheckbox label="Alro Land" /> */}
                </Grid>
                <Grid item xs={12} md={12}>
                    <MuiTextfield label="หมู่ที่" defaultValue="" name="Land_AddMoo" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputData.Land_AddrProvinceID} name="Land_AddrProvinceID" onChange={handleInputDataProvince}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLandList} value={inputData.Land_AddrDistrictID} name="Land_AddrDistrictID" onChange={handleInputDataDistrict} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLandList} value={inputData.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID" onChange={handleInputData} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputData.DocLand_name} name="DocLand_name" onChange={handleInputData}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfield label="เลขที่"  defaultValue="" name="LandNumber" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfield label="กลุ่ม" defaultValue="" name="LandGroup" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfield label="แปลง" defaultValue="" name="Plang" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfieldEndAdornment label="เนื้อที่" defaultValue="" endAdornment="ไร่" name="Rai" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfieldEndAdornment label="&nbsp;"  defaultValue="" endAdornment="งาน" name="Ngan" />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MuiTextfieldEndAdornment label="&nbsp;" defaultValue="" unit="wa" endAdornment="วา" name="Wa" />
                </Grid>
            </Grid>
        );
    }

    const handleGotoSearch = () => {
        setSuccess(false);
        history.push('/manageinfo/searchmember');

    };

    const handleClosePopup = () => {
        setErr(false);
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
                                    <h1>เพิ่มข้อมูลสมาชิก</h1>
                                </Grid>

                                <form id="addFarmerForm" className="root" noValidate autoComplete="off">
                                    {/* Paper 1 -------------------------------------------------- */}
                                    <Grid item xs={12} md={12}>
                                        <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    {/* Field Number ---------------------------------------------------*/}
                                                    <MuiTextNumber label="หมายเลขประจำตัว 13 หลัก" id="addmember-idc" defaultValue="" placeholder="ตัวอย่าง 3 8517 13368 44 4" name="IDCard" value={inputData.IDCard} onInput={handleInputData} onBlur={handleValidateNumberOnBlur} />
                                                </Grid>
                                                {
                                                    !checkIDCard ? 
                                                            <p className="txt-red paper-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เลขบัตรประชาชนไม่ถูกต้อง</p> 
                                                    : ''
                                                }
                                                <Grid item xs={12} md={12}>
                                                    <MuiRadioButtonStart1 label="ประเภทสมาชิก" lists={['เกษตรกร', 'สถาบัน', 'บุคคลภายนอก','ผู้ชดใช้']} value={inputData.LoanFarmerTypeID} name="LoanFarmerTypeID" onChange={handleInputData} type="row" />
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
                                                {/* <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="ชื่อ (เก่า)" defaultValue="" value={inputData.OldName1} name="OldName1" onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="นามสกุล (เก่า)" defaultValue="" value={inputData.OldSirname1} name="OldSirname1" onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="ชื่อ (เก่า)" defaultValue="" value={inputData.OldName2} name="OldName2" onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <MuiTextfield label="นามสกุล (เก่า)" defaultValue="" value={inputData.OldSirname2} name="OldSirname2" onChange={handleInputData} />
                                                </Grid> */}

                                                {/* <Grid item xs={12} md={12}>
                                                    <Flatpickr
                                                        lang={Thai}
                                                        value={moment}
                                                        options={{
                                                            "locale": Thai
                                                        }}
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12} md={12}>
                                                    {/* <p>วัน เดือน ปี เกิด</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd" value={inputSelectBirthDate.dd} onChange={handleSelectBirthDate} />
                                                        <MuiSelectMonth label="" name="mm" value={inputSelectBirthDate.mm} onChange={handleSelectBirthDate} />
                                                        <MuiSelectYear label="" limit={0} name="yyyy" value={inputSelectBirthDate.yyyy} onChange={handleSelectBirthDate} />
                                                    </div> */}
                                                    
                                                    <MuiDatePicker label="วัน เดือน ปี เกิด" id="addmember-birthday-input" name="BirthDate" value={inputData.BirthDate} onChange={(newValue)=>{ setInputData({ ...inputData, BirthDate: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                   
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* <p>วันหมดอายุบัตรประจำตัวประชาชน</p>
                                                    <div className="select-date-option">
                                                        <MuiSelectDay label="" name="dd2" value={inputSelectExpireDate.dd2} onChange={handleSelectExpireDate} />
                                                        <MuiSelectMonth label="" name="mm2" value={inputSelectExpireDate.mm2} onChange={handleSelectExpireDate} />
                                                        <MuiSelectYear label="" limit={10} name="yyyy2" value={inputSelectExpireDate.yyyy2} onChange={handleSelectExpireDate} />
                                                    </div> */}
                                                    <MuiDatePicker label="วันหมดอายุบัตรประจำตัวประชาชน" id="addmember-expire-id-card-input"  name="IDCardEXP_Date" value={inputData.IDCardEXP_Date}  onChange={(newValue)=>{ setInputData({ ...inputData, IDCardEXP_Date: moment(newValue).format('YYYY-MM-DD')}) }}  />
                                                </Grid>
                                                {/* <Grid item xs={12} md={12}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" defaultValue="" value={inputData.IDCardMade} name="IDCardMade" onChange={handleInputData} />
                                                </Grid> */}
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ชื่อธนาคาร"  name="BankName"  value={inputData.BankName} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="สาขา" name="BankBranch"  value={inputData.BankBranch} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextNumber label="เลขบัญขี" id="addmember-bnk" name="BankAccount"  value={inputData.BankAccount} onInput={handleInputData} />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    {/* Field Number ---------------------------------------------------*/}
                                                    <MuiTextNumber label="เบอร์โทรศัพท์" id="addmember-tel" defaultValue="" placeholder="ตัวอย่าง 0812345678" name="Tel"  value={inputData.Tel} onInput={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    {/* File upload ---------------------------------------------------*/}
                                                    <p>อัพโหลดรูปบัตรประชาชน</p>
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
                                                    <MuiSelectSubDistrict label="แขวง / ตำบล" id="addmember-idcard-subdistrict-select" lists={subDistrictIDCardList} value={inputData.IDCARD_AddrSubdistrictID} name="IDCARD_AddrSubdistrictID" onChange={handleInputDataSubDistrict}  />
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
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictContactList} value={inputData.Contact_AddrSubdistrictID} name="Contact_AddrSubdistrictID" onChange={handleInputDataSubDistrict}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="รหัสไปรษณีย์" id="addmember1-zip" placeholder="ตัวอย่าง 10230" value={inputData.Contact_Postcode} name="Contact_Postcode" onInput={handleInputData} />
                                                            </Grid>
                                                        </React.Fragment>
                                                    :
                                                        <React.Fragment>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield disabled label="บ้านเลขที่" value={inputData.IDCARD_AddNo} name="Contact_AddNo" onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextfield disabled label="หมู่ที่" value={inputData.IDCARD_AddMoo} name="Contact_AddMoo" onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={12}>
                                                                <MuiTextfield disabled label="หมู่ซอย / ถนนที่" value={inputData.IDCARD_AddrSoiRoad} name="Contact_AddrSoiRoad" onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectProvince disabled inputdisabled="input-disabled" label="จังหวัด" lists={provinceIDCardList}  value={inputData.IDCARD_AddrProvinceID} name="Contact_AddrProvinceID" onChange={handleInputDataProvince} />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectDistrict disabled inputdisabled="input-disabled" label="เขต / อำเภอ" lists={districtIDCardList} value={inputData.IDCARD_AddrDistrictID}  name="Contact_AddrDistrictID" onChange={handleInputDataDistrict}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiSelectSubDistrict disabled inputdisabled="input-disabled" label="แขวง / ตำบล" lists={subDistrictIDCardList} value={inputData.IDCARD_AddrSubdistrictID} name="Contact_AddrSubdistrictID" onChange={handleInputDataSubDistrict}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber disabled inputdisabled="input-disabled" label="รหัสไปรษณีย์" id="addmember1-zip" placeholder="ตัวอย่าง 10230" value={inputData.IDCARD_Postcode} name="Contact_Postcode" onInput={handleInputData} />
                                                            </Grid>
                                                        </React.Fragment>
                                                        // <React.Fragment>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="บ้านเลขที่"  value={''}  />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="หมู่ที่"  value={''}   />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={12}>
                                                        //         <MuiTextfield disabled label="หมู่ซอย / ถนนที่"  value={''}  />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="จังหวัด"  />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="เขต / อำเภอ"   />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="แขวง / ตำบล" />
                                                        //     </Grid>
                                                        //     <Grid item xs={12} md={6}>
                                                        //         <MuiTextfield disabled label="รหัสไปรษณีย์" id="addmembe2-zip" defaultValue="" placeholder="ตัวอย่าง 10230" />
                                                        //     </Grid>
                                                        // </React.Fragment>
                                                }
                                            
                                            </Grid>
                                        </Paper>
                                    </Grid>

                                </form>

                                {
                                    inputData.LoanFarmerTypeID === '3' || inputData.LoanFarmerTypeID === '4' ? '' :
                                    <React.Fragment>
                                        {/* Paper 4 -------------------------------------------------- */}
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <span className="txt-black" style={{fontSize: '18px'}}> เพิ่มที่ตั้งที่ดิน </span>
                                                        <span className="txt-green fl-r"> ข้อมูลชุดที่ 1/5</span>
                                                        <Divider variant="middle" style={{ margin: '0' }} />
                                                    </Grid>

                                                    {/* ที่ตั้งที่ดิน 1.---------------------------------------------------- */}
                                                    <Grid item xs={12} md={12}>
                                                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                        <span>Alro Land</span>
                                                        {/* <MuiCheckbox label="Alro Land" /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมู่ที่" defaultValue="" value={inputDataLand1.Land_AddMoo} name="Land_AddMoo_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputDataLand1.Land_AddrProvinceID} name="Land_AddrProvinceID_1" onChange={handleInputDataLandProvince}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLand1List} value={inputDataLand1.Land_AddrDistrictID} name="Land_AddrDistrictID_1" onChange={handleInputDataLandDistrict} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLand1List} value={inputDataLand1.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLand1.DocLand_code} name="DocLand_code_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขที่"   value={inputDataLand1.LandNumber}  name="LandNumber_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="กลุ่ม"  value={inputDataLand1.LandGroup}  name="LandGroup_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="แปลง"  value={inputDataLand1.Plang}  name="Plang_1" onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="เนื้อที่"  value={inputDataLand1.Rai}  endAdornment="ไร่" name="Rai_1" onChange={handleInputDataLand1} />
                                                    </Grid> */}
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand1.Ngan} unit="Ngan"  endAdornment="งาน" name="Ngan_1" onChange={handleInputDataLand1} />
                                                    </Grid> */}
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;" value={inputDataLand1.Wa} unit="wa"  endAdornment="วา" name="Wa_1" onChange={handleInputDataLand1} />
                                                    </Grid> */}
                                                    <Grid item xs={11} md={3}>
                                                        <p>เนื้อที่</p>
                                                        <MuiTextfieldNumber  label="" name="Rai_1" value={inputDataLand1.Rai}  onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Ngan_1" unit="ngan"  value={inputDataLand1.Ngan}  onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งาน</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Wa_1" unit="wa"  value={inputDataLand1.Wa}  onChange={handleInputDataLand1} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">วา</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Divider /> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <span className="txt-black" style={{fontSize: '18px'}}> เพิ่มที่ตั้งที่ดิน</span>
                                                        <span className="txt-green fl-r"> ข้อมูลชุดที่ 2/5</span>
                                                        <Divider variant="middle" style={{ margin: '0' }} />
                                                    </Grid>

                                                    {/* ที่ตั้งที่ดิน 2.---------------------------------------------------- */}
                                                    <Grid item xs={12} md={12}>
                                                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                        <span>Alro Land</span>
                                                        {/* <MuiCheckbox label="Alro Land" /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมู่ที่" defaultValue="" value={inputDataLand2.Land_AddMoo} name="Land_AddMoo_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputDataLand2.Land_AddrProvinceID} name="Land_AddrProvinceID_2" onChange={handleInputDataLandProvince}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLand2List} value={inputDataLand2.Land_AddrDistrictID} name="Land_AddrDistrictID_2" onChange={handleInputDataLandDistrict} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLand2List} value={inputDataLand2.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLand2.DocLand_code} name="DocLand_code_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขที่"   value={inputDataLand2.LandNumber}  name="LandNumber_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="กลุ่ม"  value={inputDataLand2.LandGroup}  name="LandGroup_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="แปลง"  value={inputDataLand2.Plang}  name="Plang_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="เนื้อที่"  value={inputDataLand2.Rai}  endAdornment="ไร่" name="Rai_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand2.Ngan}  endAdornment="งาน" name="Ngan_2" onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand2.Wa} unit="wa"  endAdornment="วา" name="Wa_2" onChange={handleInputDataLand2} />
                                                    </Grid> */}

                                                    <Grid item xs={11} md={3}>
                                                        <p>เนื้อที่</p>
                                                        <MuiTextfieldNumber  label="" name="Rai_2" value={inputDataLand2.Rai}  onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Ngan_2" unit="ngan"  value={inputDataLand2.Ngan}  onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งาน</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Wa_2" unit="wa"  value={inputDataLand2.Wa}  onChange={handleInputDataLand2} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">วา</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Divider /> 
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <span className="txt-black" style={{fontSize: '18px'}}> เพิ่มที่ตั้งที่ดิน</span>
                                                        <span className="txt-green fl-r"> ข้อมูลชุดที่ 3/5</span>
                                                        <Divider variant="middle" style={{ margin: '0' }} />
                                                    </Grid>

                                                {/* ที่ตั้งที่ดิน 3.---------------------------------------------------- */}
                                                    <Grid item xs={12} md={12}>
                                                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                        <span>Alro Land</span>
                                                        {/* <MuiCheckbox label="Alro Land" /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมู่ที่" defaultValue="" value={inputDataLand3.Land_AddMoo} name="Land_AddMoo_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputDataLand3.Land_AddrProvinceID} name="Land_AddrProvinceID_3" onChange={handleInputDataLandProvince}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLand3List} value={inputDataLand3.Land_AddrDistrictID} name="Land_AddrDistrictID_3" onChange={handleInputDataLandDistrict} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLand3List} value={inputDataLand3.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLand3.DocLand_code} name="DocLand_code_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขที่"   value={inputDataLand3.LandNumber}  name="LandNumber_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="กลุ่ม"  value={inputDataLand3.LandGroup}  name="LandGroup_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="แปลง"  value={inputDataLand3.Plang}  name="Plang_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="เนื้อที่"  value={inputDataLand3.Rai}  endAdornment="ไร่" name="Rai_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand3.Ngan}  endAdornment="งาน" name="Ngan_3" onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand3.Wa} unit="wa" endAdornment="วา" name="Wa_3" onChange={handleInputDataLand3} />
                                                    </Grid> */}


                                                    <Grid item xs={11} md={3}>
                                                        <p>เนื้อที่</p>
                                                        <MuiTextfieldNumber  label="" name="Rai_3" value={inputDataLand3.Rai}  onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Ngan_3" unit="ngan"  value={inputDataLand3.Ngan}  onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งาน</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Wa_3" unit="wa"  value={inputDataLand3.Wa}  onChange={handleInputDataLand3} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">วา</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Divider /> 
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <span className="txt-black" style={{fontSize: '18px'}}> เพิ่มที่ตั้งที่ดิน</span>
                                                        <span className="txt-green fl-r"> ข้อมูลชุดที่ 4/5</span>
                                                        <Divider variant="middle" style={{ margin: '0' }} />
                                                    </Grid>
                                                    
                                                    {/* ที่ตั้งที่ดิน 4.---------------------------------------------------- */}
                                                    <Grid item xs={12} md={12}>
                                                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                        <span>Alro Land</span>
                                                        {/* <MuiCheckbox label="Alro Land" /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมู่ที่" defaultValue="" value={inputDataLand4.Land_AddMoo} name="Land_AddMoo_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputDataLand4.Land_AddrProvinceID} name="Land_AddrProvinceID_4" onChange={handleInputDataLandProvince}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLand4List} value={inputDataLand4.Land_AddrDistrictID} name="Land_AddrDistrictID_4" onChange={handleInputDataLandDistrict} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLand4List} value={inputDataLand4.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLand4.DocLand_code} name="DocLand_code_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขที่"   value={inputDataLand4.LandNumber}  name="LandNumber_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="กลุ่ม"  value={inputDataLand4.LandGroup}  name="LandGroup_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="แปลง"  value={inputDataLand4.Plang}  name="Plang_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="เนื้อที่"  value={inputDataLand4.Rai}  endAdornment="ไร่" name="Rai_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand4.Ngan}  endAdornment="งาน" name="Ngan_4" onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand4.Wa} unit="wa" endAdornment="วา" name="Wa_4" onChange={handleInputDataLand4} />
                                                    </Grid> */}

                                                    <Grid item xs={11} md={3}>
                                                        <p>เนื้อที่</p>
                                                        <MuiTextfieldNumber  label="" name="Rai_4" value={inputDataLand4.Rai}  onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Ngan_4" unit="ngan"  value={inputDataLand4.Ngan}  onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งาน</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Wa_4" unit="wa"  value={inputDataLand4.Wa}  onChange={handleInputDataLand4} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">วา</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Divider /> 
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Paper>

                                    
                                        <Paper className="paper line-top-green paper">
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={2} className="paper-container">
                                                    <Grid item xs={12} md={12}>
                                                        <span className="txt-black" style={{fontSize: '18px'}}>  เพิ่มที่ตั้งที่ดิน</span>
                                                        <span className="txt-green fl-r"> ข้อมูลชุดที่ 5/5</span>
                                                        <Divider variant="middle" style={{ margin: '0' }} />
                                                    </Grid>

                                                    {/* ที่ตั้งที่ดิน 5.---------------------------------------------------- */}
                                                    <Grid item xs={12} md={12}>
                                                        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                        <span>Alro Land</span>
                                                        {/* <MuiCheckbox label="Alro Land" /> */}
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiTextfield label="หมู่ที่" defaultValue="" value={inputDataLand5.Land_AddMoo} name="Land_AddMoo_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectProvince label="จังหวัด" lists={provinceLandList}  value={inputDataLand5.Land_AddrProvinceID} name="Land_AddrProvinceID_5" onChange={handleInputDataLandProvince}/>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectDistrict label="เขต / อำเภอ" lists={districtLand5List} value={inputDataLand5.Land_AddrDistrictID} name="Land_AddrDistrictID_5" onChange={handleInputDataLandDistrict} />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <MuiSelectSubDistrict label="แขวง / ตำบล" lists={subDistrictLand5List} value={inputDataLand5.Land_AddrSubdistrictID} name="Land_AddrSubdistrictID_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <MuiSelectObj label="ประเภทหนังสือสำคัญ" itemName={'DocLand_name'} itemValue={'DocLand_code'} lists={docLandTypeList} value={inputDataLand5.DocLand_code} name="DocLand_code_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="เลขที่"   value={inputDataLand5.LandNumber}  name="LandNumber_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="กลุ่ม"  value={inputDataLand5.LandGroup}  name="LandGroup_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="แปลง"  value={inputDataLand5.Plang}  name="Plang_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="เนื้อที่"  value={inputDataLand5.Rai}  endAdornment="ไร่" name="Rai_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand5.Ngan}  endAdornment="งาน" name="Ngan_5" onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfieldEndAdornment label="&nbsp;"  value={inputDataLand5.Wa} unit="wa" endAdornment="วา" name="Wa_5" onChange={handleInputDataLand5} />
                                                    </Grid> */}


                                                    <Grid item xs={11} md={3}>
                                                        <p>เนื้อที่</p>
                                                        <MuiTextfieldNumber  label="" name="Rai_5" value={inputDataLand5.Rai}  onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">ไร่</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Ngan_5"  unit="ngan" value={inputDataLand5.Ngan}  onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">งาน</p>
                                                    </Grid>

                                                    <Grid item xs={11} md={3}>
                                                        <p>&nbsp;</p>
                                                        <MuiTextfieldNumber  label="" name="Wa_5"  unit="wa" value={inputDataLand5.Wa}  onChange={handleInputDataLand5} />
                                                    </Grid>
                                                    <Grid item xs={1} md={1}>
                                                        <p>&nbsp;</p>
                                                        <p className="paper-p">วา</p>
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Divider /> 
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
                                    </React.Fragment>

                                }
                            </Grid>

                            <Grid container spacing={2} className="btn-row" style={{margin: '15px -14px'}}>
                                {
                                    !checkIDCard ? 
                                    <Grid item xs={12} md={12} className="txt-center"><p className="txt-red paper-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;เลขบัตรประชาชนไม่ถูกต้อง</p> </Grid>
                                    : ''
                                }
                                <Grid item xs={12} md={6}>
                                    <ButtonFluidOutlinePrimary label="ยกเลิก" onClick={cancelData} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    {
                                        !checkIDCard ? 
                                        <div style={{opacity: '0.5', pointerEvents: 'none'}}>
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" />
                                        </div>
                                        : <ButtonFluidPrimary label="บันทึกข้อมูล" onClick={handleSubmit} />
                                    }
                                    
                                </Grid>
                            </Grid>
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
                        <div className="dialog-success">
                            <p className="txt-center txt-black">{successMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                        <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleGotoSearch} color="primary" style={{justifyContent: 'center'}} />
                                    
                            </Box>
                        </div>
                        :
                        <div className="dialog-error">
                            <p className="txt-center txt-black">{errMsg}</p>
                            <br/>
                            <Box textAlign='center'>
                                <ButtonFluidPrimary label="ตกลง" maxWidth="100px" onClick={handleClosePopup} color="primary" style={{justifyContent: 'center'}} />
                            </Box>
                        </div>
                    }
                    
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>
        </div>
    )
}

export default AddFarmer;
