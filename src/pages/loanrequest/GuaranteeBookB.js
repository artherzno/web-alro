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
    MuiTextNumber,
    MuiCheckbox,
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
import { set } from 'date-fns';

function GuaranteeBookB() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);
    // const { handleSubmit, control } = useForm();
    
    let server_hostname = auth.hostname;
    let server_spkapi = localStorage.getItem('spkapi');
    let token = localStorage.getItem('token');
    let siteprint = localStorage.getItem('siteprint')
    let provincename = localStorage.getItem('provincename');

    let provinceList = JSON.parse(localStorage.getItem('provincelist')) // [{ProvinceID: 81, PV_NAME: "", PVSCODE: "KABI", PV_REGION: "ใต้", ZoneID: 3}]
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist')) // [{ProvinceID: 0, DistrictID: 0, AM_NAME: ""}] // 
    // const [districtList1, setDistrictList1] = useState(districtList)
    // const [districtList2, setDistrictList2] = useState(districtList)
    // const [districtList3, setDistrictList3] = useState(districtList)
    // const [districtList4, setDistrictList4] = useState(districtList)
    // const [districtList5, setDistrictList5] = useState(districtList)
    // const [districtList6, setDistrictList6] = useState(districtList)
    // const [districtList7, setDistrictList7] = useState(districtList)
    // const [districtList8, setDistrictList8] = useState(districtList)
    // const [districtList9, setDistrictList9] = useState(districtList)
    // const [districtList10, setDistrictList10] = useState(districtList)
    // const [districtList11, setDistrictList11] = useState(districtList)
    // const [districtList12, setDistrictList12] = useState(districtList)
    // const [districtList13, setDistrictList13] = useState(districtList)
    // const [districtList14, setDistrictList14] = useState(districtList)
    // const [districtList15, setDistrictList15] = useState(districtList)
    // const [districtList16, setDistrictList16] = useState(districtList)
    // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist')) // [{ProvinceID: 0, DistrictID: 0, SubdistrictID: 0, TB_NAME: "", POSTAL: 0}] // 
    // const [subdistrictList1, setSubdistrictList1] = useState(subdistrictList)
    // const [subdistrictList2, setSubdistrictList2] = useState(subdistrictList)
    // const [subdistrictList3, setSubdistrictList3] = useState(subdistrictList)
    // const [subdistrictList4, setSubdistrictList4] = useState(subdistrictList)
    // const [subdistrictList5, setSubdistrictList5] = useState(subdistrictList)
    // const [subdistrictList6, setSubdistrictList6] = useState(subdistrictList)
    // const [subdistrictList7, setSubdistrictList7] = useState(subdistrictList)
    // const [subdistrictList8, setSubdistrictList8] = useState(subdistrictList)
    // const [subdistrictList9, setSubdistrictList9] = useState(subdistrictList)
    // const [subdistrictList10, setSubdistrictList10] = useState(subdistrictList)
    // const [subdistrictList11, setSubdistrictList11] = useState(subdistrictList)
    // const [subdistrictList12, setSubdistrictList12] = useState(subdistrictList)
    // const [subdistrictList13, setSubdistrictList13] = useState(subdistrictList)
    // const [subdistrictList14, setSubdistrictList14] = useState(subdistrictList)
    // const [subdistrictList15, setSubdistrictList15] = useState(subdistrictList)
    // const [subdistrictList16, setSubdistrictList16] = useState(subdistrictList)

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
    const [printActive, setPrintActive] = useState(false)

    let searchResultData = {}
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
        GuaranteeBookTypeID: "2",
        Name: '',
        LoanNumber: ''
    })

    const [inputDataSubmit, setInputDataSubmit] = useState({
        GuaranteeBookTypeID: "2",
        LoanID: "",
        PlaceCreate: "",
        ContactDate: null,
        Supporter_IDCard1: "",
        Supporter_IDCard2: "",
        Supporter_IDCard3: "",
        Supporter_IDCard4: "",
        Supporter_IDCard5: "",
        Supporter_IDCard6: "",
        Supporter_IDCard7: "",
        Supporter_IDCard8: "",
        Supporter_IDCard9: "",
        Supporter_IDCard10: "",
        Supporter_IDCard11: "",
        Supporter_IDCard12: "",
        Supporter_IDCard13: "",
        Supporter_IDCard14: "",
        Supporter_IDCard15: "",
        Supporter_IDCard16: "",
        CoupleFrontName: "",
        CoupleName: "",
        CoupleSirname: "",
        CoupleAGE: "",
        CoupleNationality: "",
        CoupleHouseNumber: "",
        CoupleMoo: "",
        CoupleRoad: "",
        CoupleProvince: "",
        CoupleDistrict: "",
        CoupleSubdistrict: "",
        CoupleOtherContact: "",
        WitnessName1: "",
        WitnessAddr1: 'ส.ป.ก.จังหวัด'+provincename,
        WitnessIDCard1: "",
        WitnessIDCardMake1: 'กรมการปกครอง',
        WitnessName2: "",
        WitnessAddr2: 'ส.ป.ก.จังหวัด'+provincename,
        WitnessIDCard2: "",
        WitnessIDCardMake2: 'กรมการปกครอง',
        WitnessName3: "",
        WitnessAddr3: 'ส.ป.ก.จังหวัด'+provincename,
        WitnessIDCard3: "",
        WitnessIDCardMake3: 'กรมการปกครอง',
        WitnessName4: "",
        WitnessAddr4: 'ส.ป.ก.จังหวัด'+provincename,
        WitnessIDCard4: "",
        WitnessIDCardMake4: 'กรมการปกครอง',
        GuaranteeBookType: ""
    })

    const [inputData, setInputData] = useState({
        GuaranteeBookTypeID: '2',
        LoanID: '',
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
        Province1: '', // "มหาสารคาม1",
        District1: '', // "เมือง1",
        Subdistrict1: '', // "ในเมือง1",

        FrontName2: '', // "นาย2",
        Name2: '', // "ชื่อผู้ค้ำ 2",
        Sirname2: '', // "นามสกุลผู้ค้ำ 2",
        AGE2: '', // "22",
        IDCard2: '', // "3309900111111",
        HouseNumber2: '', // "บ้านเลขที่2",
        Moo2: '', // "หมู่ 2",
        Road2: '', // "ถนน 2",
        Province2: '', // "มหาสารคาม2",
        District2: '', // "เมือง2",
        Subdistrict2: '', // "ในเมือง2",

        FrontName3: '', // "นาย3",
        Name3: '', // "ชื่อผู้ค้ำ 3",
        Sirname3: '', // "นามสกุลผู้ค้ำ 3",
        AGE3: '', // "33",
        IDCard3: '', // "3309900111111",
        HouseNumber3: '', // "บ้านเลขที่3",
        Moo3: '', // "หมู่ 3",
        Road3: '', // "ถนน 3",
        Province3: '', // "มหาสารคาม3",
        District3: '', // "เมือง3",
        Subdistrict3: '', // "ในเมือง3",

        FrontName4: '', // "นาย4",
        Name4: '', // "ชื่อผู้ค้ำ 4",
        Sirname4: '', // "นามสกุลผู้ค้ำ 4",
        AGE4: '', // "44",
        IDCard4: '', // "3309900111111",
        HouseNumber4: '', // "บ้านเลขที่4",
        Moo4: '', // "หมู่ 4",
        Road4: '', // "ถนน 4",
        Province4: '', // "มหาสารคาม4",
        District4: '', // "เมือง4",
        Subdistrict4: '', // "ในเมือง4",

        FrontName5: '', // "นาย5",
        Name5: '', // "ชื่อผู้ค้ำ 5",
        Sirname5: '', // "นามสกุลผู้ค้ำ 5",
        AGE5: '', // "55",
        IDCard5: '', // "3309900111111",
        HouseNumber5: '', // "บ้านเลขที่5",
        Moo5: '', // "หมู่ 5",
        Road5: '', // "ถนน 5",
        Province5: '', // "มหาสารคาม5",
        District5: '', // "เมือง5",
        Subdistrict5: '', // "ในเมือง5",

        FrontName6: '', // "นาย6",
        Name6: '', // "ชื่อผู้ค้ำ 6",
        Sirname6: '', // "นามสกุลผู้ค้ำ 6",
        AGE6: '', // "66",
        IDCard6: '', // "3309900111111",
        HouseNumber6: '', // "บ้านเลขที่6",
        Moo6: '', // "หมู่ 6",
        Road6: '', // "ถนน 6",
        Province6: '', // "มหาสารคาม6",
        District6: '', // "เมือง6",
        Subdistrict6: '', // "ในเมือง6",
        
        FrontName7: '', // "นาย7",
        Name7: '', // "ชื่อผู้ค้ำ 7",
        Sirname7: '', // "นามสกุลผู้ค้ำ 7",
        AGE7: '', // "57",
        IDCard7: '', // "3309900111111",
        HouseNumber7: '', // "บ้านเลขที่7",
        Moo7: '', // "หมู่ 7",
        Road7: '', // "ถนน 7",
        Province7: '', // "มหาสารคาม7",
        District7: '', // "เมือง7",
        Subdistrict7: '', // "ในเมือง7",
        
        FrontName8: '', // "นาย8",
        Name8: '', // "ชื่อผู้ค้ำ 8",
        Sirname8: '', // "นามสกุลผู้ค้ำ 8",
        AGE8: '', // "58",
        IDCard8: '', // "3309900111111",
        HouseNumber8: '', // "บ้านเลขที่8",
        Moo8: '', // "หมู่ 8",
        Road8: '', // "ถนน 8",
        Province8: '', // "มหาสารคาม8",
        District8: '', // "เมือง8",
        Subdistrict8: '', // "ในเมือง8",
        
        FrontName9: '', // "นาย9",
        Name9: '', // "ชื่อผู้ค้ำ 9",
        Sirname9: '', // "นามสกุลผู้ค้ำ 9",
        AGE9: '', // "59",
        IDCard9: '', // "3309900111111",
        HouseNumber9: '', // "บ้านเลขที่9",
        Moo9: '', // "หมู่ 9",
        Road9: '', // "ถนน 9",
        Province9: '', // "มหาสารคาม9",
        District9: '', // "เมือง9",
        Subdistrict9: '', // "ในเมือง9",
        
        FrontName10: '', // "นาย10",
        Name10: '', // "ชื่อผู้ค้ำ 10",
        Sirname10: '', // "นามสกุลผู้ค้ำ 10",
        AGE10: '', // "510",
        IDCard10: '', // "33099001111110",
        HouseNumber10: '', // "บ้านเลขที่10",
        Moo10: '', // "หมู่ 10",
        Road10: '', // "ถนน 10",
        Province10: '', // "มหาสารคาม10",
        District10: '', // "เมือง10",
        Subdistrict10: '', // "ในเมือง10",
        
        FrontName11: '', // "นาย11",
        Name11: '', // "ชื่อผู้ค้ำ 11",
        Sirname11: '', // "นามสกุลผู้ค้ำ 11",
        AGE11: '', // "511",
        IDCard11: '', // "3309900111111",
        HouseNumber11: '', // "บ้านเลขที่11",
        Moo11: '', // "หมู่ 11",
        Road11: '', // "ถนน 11",
        Province11: '', // "มหาสารคาม11",
        District11: '', // "เมือง11",
        Subdistrict11: '', // "ในเมือง11",
        
        FrontName12: '', // "นาย12",
        Name12: '', // "ชื่อผู้ค้ำ 12",
        Sirname12: '', // "นามสกุลผู้ค้ำ 12",
        AGE12: '', // "55",
        IDCard12: '', // "3309900111111",
        HouseNumber12: '', // "บ้านเลขที่12",
        Moo12: '', // "หมู่ 12",
        Road12: '', // "ถนน 12",
        Province12: '', // "มหาสารคาม12",
        District12: '', // "เมือง12",
        Subdistrict12: '', // "ในเมือง12",
        
        FrontName13: '', // "นาย13",
        Name13: '', // "ชื่อผู้ค้ำ 13",
        Sirname13: '', // "นามสกุลผู้ค้ำ 13",
        AGE13: '', // "513",
        IDCard13: '', // "3309900111111",
        HouseNumber13: '', // "บ้านเลขที่13",
        Moo13: '', // "หมู่ 13",
        Road13: '', // "ถนน 13",
        Province13: '', // "มหาสารคาม13",
        District13: '', // "เมือง13",
        Subdistrict13: '', // "ในเมือง13",
        
        FrontName14: '', // "นาย14",
        Name14: '', // "ชื่อผู้ค้ำ 14",
        Sirname14: '', // "นามสกุลผู้ค้ำ 14",
        AGE14: '', // "514",
        IDCard14: '', // "3309900111111",
        HouseNumber14: '', // "บ้านเลขที่14",
        Moo14: '', // "หมู่ 14",
        Road14: '', // "ถนน 14",
        Province14: '', // "มหาสารคาม14",
        District14: '', // "เมือง14",
        Subdistrict14: '', // "ในเมือง14",
        
        FrontName15: '', // "นาย15",
        Name15: '', // "ชื่อผู้ค้ำ 15",
        Sirname15: '', // "นามสกุลผู้ค้ำ 15",
        AGE15: '', // "515",
        IDCard15: '', // "3309900111111",
        HouseNumber15: '', // "บ้านเลขที่15",
        Moo15: '', // "หมู่ 15",
        Road15: '', // "ถนน 15",
        Province15: '', // "มหาสารคาม15",
        District15: '', // "เมือง15",
        Subdistrict15: '', // "ในเมือง15",
        
        FrontName16: '', // "นาย16",
        Name16: '', // "ชื่อผู้ค้ำ 16",
        Sirname16: '', // "นามสกุลผู้ค้ำ 16",
        AGE16: '', // "516",
        IDCard16: '', // "3309900111111",
        HouseNumber16: '', // "บ้านเลขที่16",
        Moo16: '', // "หมู่ 16",
        Road16: '', // "ถนน 16",
        Province16: '', // "มหาสารคาม16",
        District16: '', // "เมือง16",
        Subdistrict16: '', // "ในเมือง16",

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

    const [supporterAmount,setSupporterAmount] = useState(0)
    const supporterAmountList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    const [supporterView1, setSupporterView1] = useState(false)
    const [supporterView2, setSupporterView2] = useState(false)
    const [supporterView3, setSupporterView3] = useState(false)
    const [supporterView4, setSupporterView4] = useState(false)
    const [supporterView5, setSupporterView5] = useState(false)
    const [supporterView6, setSupporterView6] = useState(false)
    const [supporterView7, setSupporterView7] = useState(false)
    const [supporterView8, setSupporterView8] = useState(false)
    const [supporterView9, setSupporterView9] = useState(false)
    const [supporterView10, setSupporterView10] = useState(false)
    const [supporterView11, setSupporterView11] = useState(false)
    const [supporterView12, setSupporterView12] = useState(false)
    const [supporterView13, setSupporterView13] = useState(false)
    const [supporterView14, setSupporterView14] = useState(false)
    const [supporterView15, setSupporterView15] = useState(false)
    const [supporterView16, setSupporterView16] = useState(false)

    const [checkActive, setCheckActive] = useState({
        Supporter1: false,
        Supporter2: false,
        Supporter3: false,
        Supporter4: false,
        Supporter5: false,
        Supporter6: false,
        Supporter7: false,
        Supporter8: false,
        Supporter9: false,
        Supporter10: false,
        Supporter11: false,
        Supporter12: false,
        Supporter13: false,
        Supporter14: false,
        Supporter15: false,
        Supporter16: false,
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

    function createData(ind, FrontName, Name, Sirname, LoanNumber, GBookID, LoanID, WarrantBookOwner1, WarrantBookIDCard1,  WarrantBookOwner2, WarrantBookIDCard2, WarrantBookOwner3,  WarrantBookIDCard3, WarrantBookOwner4, WarrantBookIDCard4 ) {
        return {ind, FrontName, Name, Sirname, LoanNumber, GBookID, LoanID, WarrantBookOwner1, WarrantBookIDCard1,  WarrantBookOwner2, WarrantBookIDCard2, WarrantBookOwner3,  WarrantBookIDCard3, WarrantBookOwner4, WarrantBookIDCard4  }
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

        let getGuaranteeBookBLoanNumber = localStorage.getItem('GuaranteeBoookALoanNumber')
        let getGuaranteeBookBLoanID = localStorage.getItem('GuaranteeBoookALoanID')
        if(!!getGuaranteeBookBLoanNumber ) {
            getSearch(getGuaranteeBookBLoanNumber, getGuaranteeBookBLoanID) 
            setInputDataSearch({
                ...inputDataSearch,
                LoanNumber: getGuaranteeBookBLoanNumber
            })
        }

        return () => {
            localStorage.removeItem('GuaranteeBoookALoanNumber')
            localStorage.removeItem('GuaranteeBoookALoanID')
        };

    }, [])
    

    const getProvince = (pvid) => {
        // console.log('province',pvid)
        // console.log(provinceList)
        let result ='';
        for (let i = 0; i < provinceList.length; i++) {
            if (provinceList[i].ProvinceID === parseInt(pvid)) {
                // console.log(provinceList[i])
                result = provinceList[i].PV_NAME
                // setProviceName(provinceList[0][i].PV_NAME);
            }
        }
        return result;
    }

    const getDistrict = (dsid) => {
        // console.log('district',dsid)
        // console.log(districtList)
        let result ='';
        for (let i = 0; i < districtList.length; i++) {
            if (districtList[i].DistrictID === parseInt(dsid)) {
                // console.log(districtList[i])
                result = districtList[i].AM_NAME
                // setProviceName(provinceList[0][i].PV_NAME);
            }
        }
        return result;
    }

    const getSubDistrict = (sdsid) => {
        // console.log('subdistrict',sdsid)
        // console.log(subdistrictList)
        let result ='';
        for (let i = 0; i < subdistrictList.length; i++) {
            if (subdistrictList[i].SubdistrictID === parseInt(sdsid)) {
                // console.log(subdistrictList[i])
                result = subdistrictList[i].TB_NAME
                // setProviceName(provinceList[0][i].PV_NAME);
            }
        }
        return result;
    }

    const getSearch = (valLoanNumber, valLoanID) => {
        setIsLoading(true)
        setRows([])
        setSearchResult([])
        setFormField(false)
        let searchValue = {}

        if(!!valLoanNumber) {
            // alert('test1', valLoanNumber)
            console.log(valLoanNumber)
            searchValue = {
                Username: localStorage.getItem('cUsername'),
                GuaranteeBookTypeID: "2",
                Name: '',
                LoanNumber: valLoanNumber
            }
        } else {
            // alert('test2')
            searchValue = inputDataSearch
        }

        axios.post(
            `${server_hostname}/admin/api/search_GuaranteeBook`, 
            searchValue, 
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
                                    item.WarrantBookOwner1,
                                    item.WarrantBookIDCard1,
                                    item.WarrantBookOwner2,
                                    item.WarrantBookIDCard2,
                                    item.WarrantBookOwner3,
                                    item.WarrantBookIDCard3,
                                    item.WarrantBookOwner4,
                                    item.WarrantBookIDCard4,
                                ))
                        )
                        setSearchResult(data.data)

                        if(!!valLoanNumber) {
                            searchResultData = data.data
                            getView(null,valLoanID,0,1)
                        }
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

    const getDataSupporter = (idcardNum, orderNum) => {
        setIsLoading(true)
        axios.post(
            `${server_hostname}/admin/api/search_farmer`, {
                Name: null,
                Sirname: null,
                IDCard: idcardNum,
                FarmerGrade: null,
                LoanNumber: null,
                order_by: "IDCard",
                order_desc: "DESC",
                page_number: 1,
                page_length: 200,
            }, { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
                console.log(res)
                let data = res.data;
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
                    // console.log(data.data[0].FarmerID)
                    console.log(data.data.length)
                    if(data.data.length === 0) {
                        setErr(true)
                        setErrMsg(`ไม่พบข้อมูลจากเลขบัตรประชาชน ${idcardNum} กรุณาเพิ่มในรายชื่อเกษตรกร`)
                    } else {
                        console.log(data)
                        switch (orderNum) {
                            case 1:
                                setInputData({
                                    // ...inputData,
                                    FrontName1: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name1: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname1: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE1: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard1: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber1: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo1: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road1: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province1: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District1: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict1: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                        
                            case 2:
                                setInputData({
                                    // ...inputData,
                                    FrontName2: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name2: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname2: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE2: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard2: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber2: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo2: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road2: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province2: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District2: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict2: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                    
                            case 3:
                                setInputData({
                                    // ...inputData,
                                    FrontName3: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name3: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname3: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE3: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard3: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber3: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo3: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road3: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province3: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District3: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict3: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                        
                            case 4:
                                setInputData({
                                    // ...inputData,
                                    FrontName4: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name4: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname4: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE4: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard4: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber4: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo4: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road4: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province4: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District4: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict4: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                                
                            case 5:
                                setInputData({
                                    // ...inputData,
                                    FrontName5: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name5: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname5: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE5: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard5: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber5: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo5: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road5: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province5: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District5: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict5: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 6:
                                setInputData({
                                    // ...inputData,
                                    FrontName6: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name6: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname6: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE6: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard6: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber6: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo6: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road6: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province6: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District6: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict6: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 7:
                                setInputData({
                                    // ...inputData,
                                    FrontName7: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name7: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname7: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE7: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard7: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber7: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo7: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road7: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province7: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District7: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict7: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 8:
                                setInputData({
                                    // ...inputData,
                                    FrontName8: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name8: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname8: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE8: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard8: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber8: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo8: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road8: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province8: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District8: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict8: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                            
                            case 9:
                                setInputData({
                                    // ...inputData,
                                    FrontName9: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name9: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname9: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE9: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard9: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber9: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo9: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road9: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province9: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District9: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict9: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 10:
                                setInputData({
                                    // ...inputData,
                                    FrontName10: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name10: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname10: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE10: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard10: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber10: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo10: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road10: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province10: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District10: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict10: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 11:
                                setInputData({
                                    // ...inputData,
                                    FrontName11: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name11: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname11: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE11: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard11: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber11: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo11: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road11: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province11: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District11: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict11: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 12:
                                setInputData({
                                    // ...inputData,
                                    FrontName12: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name12: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname12: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE12: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard12: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber12: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo12: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road12: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province12: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District12: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict12: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 13:
                                setInputData({
                                    // ...inputData,
                                    FrontName13: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name13: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname13: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE13: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard13: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber13: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo13: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road13: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province13: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District13: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict13: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 14:
                                setInputData({
                                    // ...inputData,
                                    FrontName14: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name14: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname14: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE14: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard14: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber14: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo14: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road14: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province14: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District14: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict14: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 15:
                                setInputData({
                                    // ...inputData,
                                    FrontName15: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name15: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname15: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE15: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard15: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber15: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo15: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road15: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province15: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District15: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict15: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;

                            case 16:
                                setInputData({
                                    // ...inputData,
                                    FrontName16: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name16: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname16: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE16: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard16: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber16: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo16: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road16: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province16: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                    District16: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                    Subdistrict16: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                })
                                break;
                            
                            default:
                                break;
                        }

                        
                    }
                }
            }
        ).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }

    const getView = (gbookID,loanID,ind,fromOtherPage) => {
        console.log(gbookID,loanID,ind)
        setIsLoading(true)

        setInputData({
            GuaranteeBookTypeID: '2',
            LoanID: loanID,
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
            Province1: '', // "มหาสารคาม1",
            District1: '', // "เมือง1",
            Subdistrict1: '', // "ในเมือง1",
    
            FrontName2: '', // "นาย2",
            Name2: '', // "ชื่อผู้ค้ำ 2",
            Sirname2: '', // "นามสกุลผู้ค้ำ 2",
            AGE2: '', // "22",
            IDCard2: '', // "3309900111111",
            HouseNumber2: '', // "บ้านเลขที่2",
            Moo2: '', // "หมู่ 2",
            Road2: '', // "ถนน 2",
            Province2: '', // "มหาสารคาม2",
            District2: '', // "เมือง2",
            Subdistrict2: '', // "ในเมือง2",
    
            FrontName3: '', // "นาย3",
            Name3: '', // "ชื่อผู้ค้ำ 3",
            Sirname3: '', // "นามสกุลผู้ค้ำ 3",
            AGE3: '', // "33",
            IDCard3: '', // "3309900111111",
            HouseNumber3: '', // "บ้านเลขที่3",
            Moo3: '', // "หมู่ 3",
            Road3: '', // "ถนน 3",
            Province3: '', // "มหาสารคาม3",
            District3: '', // "เมือง3",
            Subdistrict3: '', // "ในเมือง3",
    
            FrontName4: '', // "นาย4",
            Name4: '', // "ชื่อผู้ค้ำ 4",
            Sirname4: '', // "นามสกุลผู้ค้ำ 4",
            AGE4: '', // "44",
            IDCard4: '', // "3309900111111",
            HouseNumber4: '', // "บ้านเลขที่4",
            Moo4: '', // "หมู่ 4",
            Road4: '', // "ถนน 4",
            Province4: '', // "มหาสารคาม4",
            District4: '', // "เมือง4",
            Subdistrict4: '', // "ในเมือง4",
    
            FrontName5: '', // "นาย5",
            Name5: '', // "ชื่อผู้ค้ำ 5",
            Sirname5: '', // "นามสกุลผู้ค้ำ 5",
            AGE5: '', // "55",
            IDCard5: '', // "3309900111111",
            HouseNumber5: '', // "บ้านเลขที่5",
            Moo5: '', // "หมู่ 5",
            Road5: '', // "ถนน 5",
            Province5: '', // "มหาสารคาม5",
            District5: '', // "เมือง5",
            Subdistrict5: '', // "ในเมือง5",
    
            FrontName6: '', // "นาย6",
            Name6: '', // "ชื่อผู้ค้ำ 6",
            Sirname6: '', // "นามสกุลผู้ค้ำ 6",
            AGE6: '', // "66",
            IDCard6: '', // "3309900111111",
            HouseNumber6: '', // "บ้านเลขที่6",
            Moo6: '', // "หมู่ 6",
            Road6: '', // "ถนน 6",
            Province6: '', // "มหาสารคาม6",
            District6: '', // "เมือง6",
            Subdistrict6: '', // "ในเมือง6",
            
            FrontName7: '', // "นาย7",
            Name7: '', // "ชื่อผู้ค้ำ 7",
            Sirname7: '', // "นามสกุลผู้ค้ำ 7",
            AGE7: '', // "57",
            IDCard7: '', // "3309900111111",
            HouseNumber7: '', // "บ้านเลขที่7",
            Moo7: '', // "หมู่ 7",
            Road7: '', // "ถนน 7",
            Province7: '', // "มหาสารคาม7",
            District7: '', // "เมือง7",
            Subdistrict7: '', // "ในเมือง7",
            
            FrontName8: '', // "นาย8",
            Name8: '', // "ชื่อผู้ค้ำ 8",
            Sirname8: '', // "นามสกุลผู้ค้ำ 8",
            AGE8: '', // "58",
            IDCard8: '', // "3309900111111",
            HouseNumber8: '', // "บ้านเลขที่8",
            Moo8: '', // "หมู่ 8",
            Road8: '', // "ถนน 8",
            Province8: '', // "มหาสารคาม8",
            District8: '', // "เมือง8",
            Subdistrict8: '', // "ในเมือง8",
            
            FrontName9: '', // "นาย9",
            Name9: '', // "ชื่อผู้ค้ำ 9",
            Sirname9: '', // "นามสกุลผู้ค้ำ 9",
            AGE9: '', // "59",
            IDCard9: '', // "3309900111111",
            HouseNumber9: '', // "บ้านเลขที่9",
            Moo9: '', // "หมู่ 9",
            Road9: '', // "ถนน 9",
            Province9: '', // "มหาสารคาม9",
            District9: '', // "เมือง9",
            Subdistrict9: '', // "ในเมือง9",
            
            FrontName10: '', // "นาย10",
            Name10: '', // "ชื่อผู้ค้ำ 10",
            Sirname10: '', // "นามสกุลผู้ค้ำ 10",
            AGE10: '', // "510",
            IDCard10: '', // "33099001111110",
            HouseNumber10: '', // "บ้านเลขที่10",
            Moo10: '', // "หมู่ 10",
            Road10: '', // "ถนน 10",
            Province10: '', // "มหาสารคาม10",
            District10: '', // "เมือง10",
            Subdistrict10: '', // "ในเมือง10",
            
            FrontName11: '', // "นาย11",
            Name11: '', // "ชื่อผู้ค้ำ 11",
            Sirname11: '', // "นามสกุลผู้ค้ำ 11",
            AGE11: '', // "511",
            IDCard11: '', // "3309900111111",
            HouseNumber11: '', // "บ้านเลขที่11",
            Moo11: '', // "หมู่ 11",
            Road11: '', // "ถนน 11",
            Province11: '', // "มหาสารคาม11",
            District11: '', // "เมือง11",
            Subdistrict11: '', // "ในเมือง11",
            
            FrontName12: '', // "นาย12",
            Name12: '', // "ชื่อผู้ค้ำ 12",
            Sirname12: '', // "นามสกุลผู้ค้ำ 12",
            AGE12: '', // "55",
            IDCard12: '', // "3309900111111",
            HouseNumber12: '', // "บ้านเลขที่12",
            Moo12: '', // "หมู่ 12",
            Road12: '', // "ถนน 12",
            Province12: '', // "มหาสารคาม12",
            District12: '', // "เมือง12",
            Subdistrict12: '', // "ในเมือง12",
            
            FrontName13: '', // "นาย13",
            Name13: '', // "ชื่อผู้ค้ำ 13",
            Sirname13: '', // "นามสกุลผู้ค้ำ 13",
            AGE13: '', // "513",
            IDCard13: '', // "3309900111111",
            HouseNumber13: '', // "บ้านเลขที่13",
            Moo13: '', // "หมู่ 13",
            Road13: '', // "ถนน 13",
            Province13: '', // "มหาสารคาม13",
            District13: '', // "เมือง13",
            Subdistrict13: '', // "ในเมือง13",
            
            FrontName14: '', // "นาย14",
            Name14: '', // "ชื่อผู้ค้ำ 14",
            Sirname14: '', // "นามสกุลผู้ค้ำ 14",
            AGE14: '', // "514",
            IDCard14: '', // "3309900111111",
            HouseNumber14: '', // "บ้านเลขที่14",
            Moo14: '', // "หมู่ 14",
            Road14: '', // "ถนน 14",
            Province14: '', // "มหาสารคาม14",
            District14: '', // "เมือง14",
            Subdistrict14: '', // "ในเมือง14",
            
            FrontName15: '', // "นาย15",
            Name15: '', // "ชื่อผู้ค้ำ 15",
            Sirname15: '', // "นามสกุลผู้ค้ำ 15",
            AGE15: '', // "515",
            IDCard15: '', // "3309900111111",
            HouseNumber15: '', // "บ้านเลขที่15",
            Moo15: '', // "หมู่ 15",
            Road15: '', // "ถนน 15",
            Province15: '', // "มหาสารคาม15",
            District15: '', // "เมือง15",
            Subdistrict15: '', // "ในเมือง15",
            
            FrontName16: '', // "นาย16",
            Name16: '', // "ชื่อผู้ค้ำ 16",
            Sirname16: '', // "นามสกุลผู้ค้ำ 16",
            AGE16: '', // "516",
            IDCard16: '', // "3309900111111",
            HouseNumber16: '', // "บ้านเลขที่16",
            Moo16: '', // "หมู่ 16",
            Road16: '', // "ถนน 16",
            Province16: '', // "มหาสารคาม16",
            District16: '', // "เมือง16",
            Subdistrict16: '', // "ในเมือง16",
    
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

        setSupporterAmount(0)

        setSupporterView1(false)
        setSupporterView2(false)
        setSupporterView3(false)
        setSupporterView4(false)
        setSupporterView5(false)
        setSupporterView6(false)
        setSupporterView7(false)
        setSupporterView8(false)
        setSupporterView9(false)
        setSupporterView10(false)
        setSupporterView11(false)
        setSupporterView12(false)
        setSupporterView13(false)
        setSupporterView14(false)
        setSupporterView15(false)
        setSupporterView16(false)

        if(!!fromOtherPage) {
            console.log(searchResultData)
            setDataOwner({
                FrontName: searchResultData[0].FrontName,
                Name: searchResultData[0].Name,
                Sirname: searchResultData[0].Sirname,
                principle: searchResultData[0].principle,
                LoanNumber: searchResultData[0].LoanNumber,
                LoanDate: searchResultData[0].LoanDate,
            })
        } else {
            console.log(searchResult[ind])
            setDataOwner({
                    FrontName: searchResult[ind].FrontName,
                    Name: searchResult[ind].Name,
                    Sirname: searchResult[ind].Sirname,
                    principle: searchResult[ind].principle,
                    LoanNumber: searchResult[ind].LoanNumber,
                    LoanDate: searchResult[ind].LoanDate,
                })

        }
        setFormField(false)
        // setInputData({
        //     ...inputData,
        //     LoanID: loanID,
        // })

        // Add new guaranteebook A
        if(gbookID === null) {
            console.warn('Add GuaranteeBookB')
            let dataView = {
                LoanID: loanID,
                GuaranteeBookTypeID: "2"
            }
                        
            axios.post(
                `${server_hostname}/admin/api/view_GuaranteeApplicant`, 
                dataView, 
                { headers: { "token": token } } 
            ).then(res => {
                    console.log('getView',res)
                    localStorage.removeItem('GuaranteeBoookALoanID')
                    localStorage.removeItem('GuaranteeBoookALoanNumber')

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
                        let result = data.data[0]
                        console.log('view_GuaranteeApplicant',result)
                        setFormField(true)
                        setLoanNumber(result.LoanNumber)

                        for(let i=1; i<=16; i++) {

                            if(i===1 && !(!result.Supporter_IDCard1)) {
                                    console.log('supporter1')
                                    setSupporterView1(true)
                                    getDataSupporter(result.Supporter_IDCard1, 1)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard1: result.Supporter_IDCard1
                                    // })
                                    setSupporterAmount(1)

                            } else if(i===2 && !(!result.Supporter_IDCard2)) {
                                    console.log('supporter2')
                                    setSupporterView2(true)
                                    getDataSupporter(result.Supporter_IDCard2, 2)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard2: result.Supporter_IDCard2
                                    // })
                                    setSupporterAmount(2)

                                    
                            } else if(i===3 && !(!result.Supporter_IDCard3)) {
                                    console.log('supporter3')
                                    setSupporterView3(true)
                                    getDataSupporter(result.Supporter_IDCard3, 3)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard3: result.Supporter_IDCard3
                                    // })
                                    setSupporterAmount(3)

                                    
                            } else if(i===4 && !(!result.Supporter_IDCard4)) {
                                    console.log('supporter4')
                                    setSupporterView4(true)
                                    getDataSupporter(result.Supporter_IDCard4, 4)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard4: result.Supporter_IDCard4
                                    // })
                                    setSupporterAmount(4)

                                    
                            } else if(i===5 && !(!result.Supporter_IDCard5)) {
                                    console.log('supporter5')
                                    setSupporterView5(true)
                                    getDataSupporter(result.Supporter_IDCard5, 5)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard5: result.Supporter_IDCard5
                                    // })
                                    setSupporterAmount(5)
                                    
                            } else if(i===6 && !(!result.Supporter_IDCard6)) {
                                    console.log('supporter6')
                                    setSupporterView6(true)
                                    getDataSupporter(result.Supporter_IDCard6, 6)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard6: result.Supporter_IDCard6
                                    // })
                                    setSupporterAmount(6)

                            } else if(i===7 && !(!result.Supporter_IDCard7)) {
                                    console.log('supporter7')
                                    setSupporterView7(true)
                                    getDataSupporter(result.Supporter_IDCard7, 7)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard7: result.Supporter_IDCard7
                                    // })
                                    setSupporterAmount(7)

                            } else if(i===8 && !(!result.Supporter_IDCard8)) {
                                    console.log('supporter8')
                                    setSupporterView8(true)
                                    getDataSupporter(result.Supporter_IDCard8, 8)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard8: result.Supporter_IDCard8
                                    // })
                                    setSupporterAmount(8)

                            } else if(i===9 && !(!result.Supporter_IDCard9)) {
                                    console.log('supporter9')
                                    setSupporterView9(true)
                                    getDataSupporter(result.Supporter_IDCard9, 9)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard9: result.Supporter_IDCard9
                                    // })
                                    setSupporterAmount(9)
 
                            } else if(i===10 && !(!result.Supporter_IDCard10)) {
                                    console.log('supporter10')
                                    setSupporterView10(true)
                                    getDataSupporter(result.Supporter_IDCard10, 10)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard10: result.Supporter_IDCard10
                                    // })
                                    setSupporterAmount(10)
                                    
                            } else if(i===11 && !(!result.Supporter_IDCard11)) {
                                    console.log('supporter11')
                                    setSupporterView11(true)
                                    getDataSupporter(result.Supporter_IDCard11, 11)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard11: result.Supporter_IDCard11
                                    // })
                                    setSupporterAmount(11)
                                    
                            } else if(i===12 && !(!result.Supporter_IDCard12)) {
                                    console.log('supporter12')
                                    setSupporterView12(true)
                                    getDataSupporter(result.Supporter_IDCard12, 12)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard12: result.Supporter_IDCard12
                                    // })
                                    setSupporterAmount(12)
                                    
                            } else if(i===13 && !(!result.Supporter_IDCard13)) {
                                    console.log('supporter13')
                                    setSupporterView13(true)
                                    getDataSupporter(result.Supporter_IDCard13, 13)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard13: result.Supporter_IDCard13
                                    // })
                                    setSupporterAmount(13)
                                    
                            } else if(i===14 && !(!result.Supporter_IDCard14)) {
                                    console.log('supporter14')
                                    setSupporterView14(true)
                                    getDataSupporter(result.Supporter_IDCard14, 14)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard14: result.Supporter_IDCard14
                                    // })
                                    setSupporterAmount(14)
                                    
                            } else if(i===15 && !(!result.Supporter_IDCard15)) {
                                    console.log('supporter15')
                                    setSupporterView15(true)
                                    getDataSupporter(result.Supporter_IDCard15, 15)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard15: result.Supporter_IDCard15
                                    // })
                                    setSupporterAmount(15)
                                    
                            } else if(i===16 && !(!result.Supporter_IDCard16)) {
                                    console.log('supporter16')
                                    setSupporterView16(true)
                                    getDataSupporter(result.Supporter_IDCard16, 16)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard16: result.Supporter_IDCard16
                                    // })
                                    setSupporterAmount(16)
                                    
                            } 

                        }

                        setInputDataSubmit({
                            ...inputDataSubmit,
                            LoanID: Number(loanID),
                            Supporter_IDCard1: result.Supporter_IDCard1,
                            Supporter_IDCard2: result.Supporter_IDCard2,
                            Supporter_IDCard3: result.Supporter_IDCard3,
                            Supporter_IDCard4: result.Supporter_IDCard4,
                            Supporter_IDCard5: result.Supporter_IDCard5,
                            Supporter_IDCard6: result.Supporter_IDCard6,
                            Supporter_IDCard7: result.Supporter_IDCard7,
                            Supporter_IDCard8: result.Supporter_IDCard8,
                            Supporter_IDCard9: result.Supporter_IDCard9,
                            Supporter_IDCard10: result.Supporter_IDCard10,
                            Supporter_IDCard11: result.Supporter_IDCard11,
                            Supporter_IDCard12: result.Supporter_IDCard12,
                            Supporter_IDCard13: result.Supporter_IDCard13,
                            Supporter_IDCard14: result.Supporter_IDCard14,
                            Supporter_IDCard15: result.Supporter_IDCard15,
                            Supporter_IDCard16: result.Supporter_IDCard16,
                        })

                        setIsLoading(false)
                    }
            })

        } else {

            // Edit guaranteebook A
            console.warn('Edit GuaranteeBookB')
            let dataView = {
                GBookID: gbookID
            }

            axios.post(
                `${server_hostname}/admin/api/view_GuaranteeBook`, 
                dataView, 
                { headers: { "token": token } } 
            ).then(res => {
                    setIsLoading(true)
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
                        let result = data.data[0]
                        console.log('view_GuaranteeBook',result)
                        setFormField(true)
                        setPrintActive(true)
                        setLoanNumber(result.LoanNumber)

                        for(let i=1; i<=16; i++) {

                            if(i===1 && !(!result.Supporter_IDCard1)) {
                                    console.log('supporter1')
                                    setSupporterView1(true)
                                    getDataSupporter(result.Supporter_IDCard1, 1)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard1: result.Supporter_IDCard1
                                    // })
                                    setSupporterAmount(1)
                                    setIsLoading(true)

                            } else if(i===2 && !(!result.Supporter_IDCard2)) {
                                    console.log('supporter2')
                                    setSupporterView2(true)
                                    getDataSupporter(result.Supporter_IDCard2, 2)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard2: result.Supporter_IDCard2
                                    // })
                                    setSupporterAmount(2)
                                    setIsLoading(true)

                                    
                            } else if(i===3 && !(!result.Supporter_IDCard3)) {
                                    console.log('supporter3')
                                    setSupporterView3(true)
                                    getDataSupporter(result.Supporter_IDCard3, 3)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard3: result.Supporter_IDCard3
                                    // })
                                    setSupporterAmount(3)
                                    setIsLoading(true)

                                    
                            } else if(i===4 && !(!result.Supporter_IDCard4)) {
                                    console.log('supporter4')
                                    setSupporterView4(true)
                                    getDataSupporter(result.Supporter_IDCard4, 4)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard4: result.Supporter_IDCard4
                                    // })
                                    setSupporterAmount(4)
                                    setIsLoading(true)

                                    
                            } else if(i===5 && !(!result.Supporter_IDCard5)) {
                                    console.log('supporter5')
                                    setSupporterView5(true)
                                    getDataSupporter(result.Supporter_IDCard5, 5)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard5: result.Supporter_IDCard5
                                    // })
                                    setSupporterAmount(5)
                                    setIsLoading(true)
                                    
                            } else if(i===6 && !(!result.Supporter_IDCard6)) {
                                    console.log('supporter6')
                                    setSupporterView6(true)
                                    getDataSupporter(result.Supporter_IDCard6, 6)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard6: result.Supporter_IDCard6
                                    // })
                                    setSupporterAmount(6)
                                    setIsLoading(true)

                            } else if(i===7 && !(!result.Supporter_IDCard7)) {
                                    console.log('supporter7')
                                    setSupporterView7(true)
                                    getDataSupporter(result.Supporter_IDCard7, 7)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard7: result.Supporter_IDCard7
                                    // })
                                    setSupporterAmount(7)
                                    setIsLoading(true)

                            } else if(i===8 && !(!result.Supporter_IDCard8)) {
                                    console.log('supporter8')
                                    setSupporterView8(true)
                                    getDataSupporter(result.Supporter_IDCard8, 8)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard8: result.Supporter_IDCard8
                                    // })
                                    setSupporterAmount(8)
                                    setIsLoading(true)

                            } else if(i===9 && !(!result.Supporter_IDCard9)) {
                                    console.log('supporter9')
                                    setSupporterView9(true)
                                    getDataSupporter(result.Supporter_IDCard9, 9)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard9: result.Supporter_IDCard9
                                    // })
                                    setSupporterAmount(9)
                                    setIsLoading(true)
 
                            } else if(i===10 && !(!result.Supporter_IDCard10)) {
                                    console.log('supporter10')
                                    setSupporterView10(true)
                                    getDataSupporter(result.Supporter_IDCard10, 10)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard10: result.Supporter_IDCard10
                                    // })
                                    setSupporterAmount(10)
                                    setIsLoading(true)
                                    
                            } else if(i===11 && !(!result.Supporter_IDCard11)) {
                                    console.log('supporter11')
                                    setSupporterView11(true)
                                    getDataSupporter(result.Supporter_IDCard11, 11)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard11: result.Supporter_IDCard11
                                    // })
                                    setSupporterAmount(11)
                                    setIsLoading(true)
                                    
                            } else if(i===12 && !(!result.Supporter_IDCard12)) {
                                    console.log('supporter12')
                                    setSupporterView12(true)
                                    getDataSupporter(result.Supporter_IDCard12, 12)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard12: result.Supporter_IDCard12
                                    // })
                                    setSupporterAmount(12)
                                    setIsLoading(true)
                                    
                            } else if(i===13 && !(!result.Supporter_IDCard13)) {
                                    console.log('supporter13')
                                    setSupporterView13(true)
                                    getDataSupporter(result.Supporter_IDCard13, 13)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard13: result.Supporter_IDCard13
                                    // })
                                    setSupporterAmount(13)
                                    setIsLoading(true)
                                    
                            } else if(i===14 && !(!result.Supporter_IDCard14)) {
                                    console.log('supporter14')
                                    setSupporterView14(true)
                                    getDataSupporter(result.Supporter_IDCard14, 14)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard14: result.Supporter_IDCard14
                                    // })
                                    setSupporterAmount(14)
                                    setIsLoading(true)
                                    
                            } else if(i===15 && !(!result.Supporter_IDCard15)) {
                                    console.log('supporter15')
                                    setSupporterView15(true)
                                    getDataSupporter(result.Supporter_IDCard15, 15)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard15: result.Supporter_IDCard15
                                    // })
                                    setSupporterAmount(15)
                                    setIsLoading(true)
                                    
                            } else if(i===16 && !(!result.Supporter_IDCard16)) {
                                    console.log('supporter16')
                                    setSupporterView16(true)
                                    getDataSupporter(result.Supporter_IDCard16, 16)
                                    // setInputDataSubmit({
                                    //     ...inputDataSubmit,
                                    //     Supporter_IDCard16: result.Supporter_IDCard16
                                    // })
                                    setSupporterAmount(16)
                                    setIsLoading(true)
                                    
                            } 

                        }

                        setInputData({
                            ...inputData,
                            LoanID: Number(loanID),
                            PlaceCreate: !!result.PlaceCreate? result.PlaceCreate : '',
                            ContactDate: result.ContactDate === 'Invalid date' || result.ContactDate === null ? null : moment(result.ContactDate).format('YYYY-MM-DD'),

                            FrontName1: result.FrontName1 || '', // "นาย1",
                            Name1: result.Name1 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname1: result.Sirname1 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE1: result.AGE1 || '', // "11",
                            IDCard1: result.IDCard1 || '', // "3309900111111",
                            HouseNumber1: result.HouseNumber1 || '', // "บ้านเลขที่1",
                            Moo1: result.Moo1 || '', // "หมู่ 1",
                            Road1: result.Road1 || '', // "ถนน 1",
                            Province1: result.Province1 || '', // "มหาสารคาม1",
                            District1: result.District1 || '', // "เมือง1",
                            Subdistrict1: result.Subdistrict1 || '', // "ในเมือง1",

                            
                            FrontName2: result.FrontName2 || '', // "นาย1",
                            Name2: result.Name2 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname2: result.Sirname2 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE2: result.AGE2 || '', // "11",
                            IDCard2: result.IDCard2 || '', // "3309900111111",
                            HouseNumber2: result.HouseNumber2 || '', // "บ้านเลขที่1",
                            Moo2: result.Moo2 || '', // "หมู่ 1",
                            Road2: result.Road2 || '', // "ถนน 1",
                            Province2: result.Province2 || '', // "มหาสารคาม1",
                            District2: result.District2 || '', // "เมือง1",
                            Subdistrict2: result.Subdistrict2 || '', // "ในเมือง1",


                            FrontName3: result.FrontName3 || '', // "นาย1",
                            Name3: result.Name3 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname3: result.Sirname3 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE3: result.AGE3 || '', // "11",
                            IDCard3: result.IDCard3 || '', // "3309900111111",
                            HouseNumber3: result.HouseNumber3 || '', // "บ้านเลขที่1",
                            Moo3: result.Moo3 || '', // "หมู่ 1",
                            Road3: result.Road3 || '', // "ถนน 1",
                            Province3: result.Province3 || '', // "มหาสารคาม1",
                            District3: result.District3 || '', // "เมือง1",
                            Subdistrict3: result.Subdistrict3 || '', // "ในเมือง1",

                            FrontName4: result.FrontName4 || '', // "นาย1",
                            Name4: result.Name4 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname4: result.Sirname4 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE4: result.AGE4 || '', // "11",
                            IDCard4: result.IDCard4 || '', // "3309900111111",
                            HouseNumber4: result.HouseNumber4 || '', // "บ้านเลขที่1",
                            Moo4: result.Moo4 || '', // "หมู่ 1",
                            Road4: result.Road4 || '', // "ถนน 1",
                            Province4: result.Province4 || '', // "มหาสารคาม1",
                            District4: result.District4 || '', // "เมือง1",
                            Subdistrict4: result.Subdistrict4 || '', // "ในเมือง1",

                            FrontName5: result.FrontName5 || '', // "นาย1",
                            Name5: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname5: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE5: result.AGE5 || '', // "11",
                            IDCard5: result.IDCard5 || '', // "3309900111111",
                            HouseNumber5: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo5: result.Moo5 || '', // "หมู่ 1",
                            Road5: result.Road5 || '', // "ถนน 1",
                            Province5: result.Province5 || '', // "มหาสารคาม1",
                            District5: result.District5 || '', // "เมือง1",
                            Subdistrict5: result.Subdistrict5 || '', // "ในเมือง1",

                            FrontName6: result.FrontName6 || '', // "นาย1",
                            Name6: result.Name6 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname6: result.Sirname6 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE6: result.AGE6 || '', // "11",
                            IDCard6: result.IDCard6 || '', // "3309900111111",
                            HouseNumber6: result.HouseNumber6 || '', // "บ้านเลขที่1",
                            Moo6: result.Moo6 || '', // "หมู่ 1",
                            Road6: result.Road6 || '', // "ถนน 1",
                            Province6: result.Province6 || '', // "มหาสารคาม1",
                            District6: result.District6 || '', // "เมือง1",
                            Subdistrict6: result.Subdistrict6 || '', // "ในเมือง1",

                            FrontName7: result.FrontName7 || '', // "นาย1",
                            Name7: result.Name7 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname7: result.Sirname7 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE7: result.AGE7 || '', // "11",
                            IDCard7: result.IDCard7 || '', // "3309900111111",
                            HouseNumber7: result.HouseNumber7 || '', // "บ้านเลขที่1",
                            Moo7: result.Moo7 || '', // "หมู่ 1",
                            Road7: result.Road7 || '', // "ถนน 1",
                            Province7: result.Province7 || '', // "มหาสารคาม1",
                            District7: result.District7 || '', // "เมือง1",
                            Subdistrict7: result.Subdistrict7 || '', // "ในเมือง1",

                            FrontName8: result.FrontName8 || '', // "นาย1",
                            Name8: result.Name8 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname8: result.Sirname8 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE8: result.AGE8 || '', // "11",
                            IDCard8: result.IDCard8 || '', // "3309900111111",
                            HouseNumber8: result.HouseNumber8 || '', // "บ้านเลขที่1",
                            Moo8: result.Moo8 || '', // "หมู่ 1",
                            Road8: result.Road8 || '', // "ถนน 1",
                            Province8: result.Province8 || '', // "มหาสารคาม1",
                            District8: result.District8 || '', // "เมือง1",
                            Subdistrict8: result.Subdistrict8 || '', // "ในเมือง1",

                            FrontName9: result.FrontName9 || '', // "นาย1",
                            Name9: result.Name9 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname9: result.Sirname9 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE9: result.AGE9 || '', // "11",
                            IDCard9: result.IDCard9 || '', // "3309900111111",
                            HouseNumber9: result.HouseNumber9 || '', // "บ้านเลขที่1",
                            Moo9: result.Moo9 || '', // "หมู่ 1",
                            Road9: result.Road9 || '', // "ถนน 1",
                            Province9: result.Province9 || '', // "มหาสารคาม1",
                            District9: result.District9 || '', // "เมือง1",
                            Subdistrict9: result.Subdistrict9 || '', // "ในเมือง1",

                            FrontName10: result.FrontName10 || '', // "นาย1",
                            Name10: result.Name10 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname10: result.Sirname10 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE10: result.AGE10 || '', // "11",
                            IDCard10: result.IDCard10 || '', // "3309900111111",
                            HouseNumber10: result.HouseNumber10 || '', // "บ้านเลขที่1",
                            Moo10: result.Moo10 || '', // "หมู่ 1",
                            Road10: result.Road10 || '', // "ถนน 1",
                            Province10: result.Province10 || '', // "มหาสารคาม1",
                            District10: result.District10 || '', // "เมือง1",
                            Subdistrict10: result.Subdistrict10 || '', // "ในเมือง1",

                            FrontName11: result.FrontName11 || '', // "นาย1",
                            Name11: result.Name11 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname11: result.Sirname11 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE11: result.AGE11 || '', // "11",
                            IDCard11: result.IDCard11 || '', // "3309900111111",
                            HouseNumber11: result.HouseNumber11 || '', // "บ้านเลขที่1",
                            Moo11: result.Moo11 || '', // "หมู่ 1",
                            Road11: result.Road11 || '', // "ถนน 1",
                            Province11: result.Province11 || '', // "มหาสารคาม1",
                            District11: result.District11 || '', // "เมือง1",
                            Subdistrict11: result.Subdistrict11 || '', // "ในเมือง1",

                            FrontName12: result.FrontName12 || '', // "นาย1",
                            Name12: result.Name12 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname12: result.Sirname12 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE12: result.AGE12 || '', // "11",
                            IDCard12: result.IDCard12 || '', // "3309900111111",
                            HouseNumber12: result.HouseNumber12 || '', // "บ้านเลขที่1",
                            Moo12: result.Moo12 || '', // "หมู่ 1",
                            Road12: result.Road12 || '', // "ถนน 1",
                            Province12: result.Province12 || '', // "มหาสารคาม1",
                            District12: result.District12 || '', // "เมือง1",
                            Subdistrict12: result.Subdistrict12 || '', // "ในเมือง1",

                            FrontName13: result.FrontName13 || '', // "นาย1",
                            Name13: result.Name13 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname13: result.Sirname13 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE13: result.AGE13 || '', // "11",
                            IDCard13: result.IDCard13 || '', // "3309900111111",
                            HouseNumber13: result.HouseNumber13 || '', // "บ้านเลขที่1",
                            Moo13: result.Moo13 || '', // "หมู่ 1",
                            Road13: result.Road13 || '', // "ถนน 1",
                            Province13: result.Province13 || '', // "มหาสารคาม1",
                            District13: result.District13 || '', // "เมือง1",
                            Subdistrict13: result.Subdistrict13 || '', // "ในเมือง1",

                            FrontName14: result.FrontName14 || '', // "นาย1",
                            Name14: result.Name14 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname14: result.Sirname14 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE14: result.AGE14 || '', // "11",
                            IDCard14: result.IDCard14 || '', // "3309900111111",
                            HouseNumber14: result.HouseNumber14 || '', // "บ้านเลขที่1",
                            Moo14: result.Moo14 || '', // "หมู่ 1",
                            Road14: result.Road14 || '', // "ถนน 1",
                            Province14: result.Province14 || '', // "มหาสารคาม1",
                            District14: result.District14 || '', // "เมือง1",
                            Subdistrict14: result.Subdistrict14 || '', // "ในเมือง1",

                            FrontName15: result.FrontName15 || '', // "นาย1",
                            Name15: result.Name15 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname15: result.Sirname15 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE15: result.AGE15 || '', // "11",
                            IDCard15: result.IDCard15 || '', // "3309900111111",
                            HouseNumber15: result.HouseNumber15 || '', // "บ้านเลขที่1",
                            Moo15: result.Moo15 || '', // "หมู่ 1",
                            Road15: result.Road15 || '', // "ถนน 1",
                            Province15: result.Province15 || '', // "มหาสารคาม1",
                            District15: result.District15 || '', // "เมือง1",
                            Subdistrict15: result.Subdistrict15 || '', // "ในเมือง1",

                            FrontName16: result.FrontName16 || '', // "นาย1",
                            Name16: result.Name16 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname16: result.Sirname16 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE16: result.AGE16 || '', // "11",
                            IDCard16: result.IDCard16 || '', // "3309900111111",
                            HouseNumber16: result.HouseNumber16 || '', // "บ้านเลขที่1",
                            Moo16: result.Moo16 || '', // "หมู่ 1",
                            Road16: result.Road16 || '', // "ถนน 1",
                            Province16: result.Province16 || '', // "มหาสารคาม1",
                            District16: result.District16 || '', // "เมือง1",
                            Subdistrict16: result.Subdistrict16 || '', // "ในเมือง1",

                            CoupleFrontName: result.CoupleFrontName || '',// "",
                            CoupleName: result.CoupleName || '',// "",
                            CoupleSirname: result.CoupleSirname || '',// "",
                            CoupleAGE: result.CoupleAGE || '',// "",
                            CoupleNationality: result.CoupleNationality || '',// "",
                            CoupleHouseNumber: result.CoupleHouseNumber || '',// "",
                            CoupleMoo: result.CoupleMoo || '',// "",
                            CoupleRoad: result.CoupleRoad || '',// "",
                            CoupleProvince: result.CoupleProvince || '',// "",
                            CoupleDistrict: result.CoupleDistrict || '',// "",
                            CoupleSubdistrict: result.CoupleSubdistrict || '',// "",
                            CoupleOtherContact: result.CoupleOtherContact || '',// "",

                            WitnessName1: result.WitnessName1 || '',// "พยาน1",
                            WitnessAddr1: '',// "ที่อยู่พยาน1",
                            WitnessIDCard1: result.WitnessIDCard1 || '',// "1234567891011",
                            WitnessIDCardMake1: '',// "ออกพยาน1",
                            WitnessName2: result.WitnessName2 || '',// "พยาน2",
                            WitnessAddr2: '',// "ที่อยู่พยาน2",
                            WitnessIDCard2: result.WitnessIDCard2 || '',// "1234567891022",
                            WitnessIDCardMake2: '',// "ออกพยาน2",

                            WitnessName3: result.WitnessName3 || '',// "พยาน1",
                            WitnessAddr3: '',// "ที่อยู่พยาน1",
                            WitnessIDCard3: result.WitnessIDCard3 || '',// "1234567891011",
                            WitnessIDCardMake3: '',// "ออกพยาน1",
                            WitnessName4: result.WitnessName4 || '',// "พยาน2",
                            WitnessAddr4: '',// "ที่อยู่พยาน2",
                            WitnessIDCard4: result.WitnessIDCard4 || '',// "1234567891022",
                            WitnessIDCardMake4: '',// "ออกพยาน2",
                        })


                        setInputDataSubmit({
                            ...inputDataSubmit,
                            LoanID: Number(loanID),
                            PlaceCreate: !!result.PlaceCreate? result.PlaceCreate : '',
                            ContactDate: result.ContactDate === 'Invalid date' || result.ContactDate === null ? null : moment(result.ContactDate).format('YYYY-MM-DD'),

                            Supporter_IDCard1: result.Supporter_IDCard1,
                            Supporter_IDCard2: result.Supporter_IDCard2,
                            Supporter_IDCard3: result.Supporter_IDCard3,
                            Supporter_IDCard4: result.Supporter_IDCard4,
                            Supporter_IDCard5: result.Supporter_IDCard5,
                            Supporter_IDCard6: result.Supporter_IDCard6,
                            Supporter_IDCard7: result.Supporter_IDCard7,
                            Supporter_IDCard8: result.Supporter_IDCard8,
                            Supporter_IDCard9: result.Supporter_IDCard9,
                            Supporter_IDCard10: result.Supporter_IDCard10,
                            Supporter_IDCard11: result.Supporter_IDCard11,
                            Supporter_IDCard12: result.Supporter_IDCard12,
                            Supporter_IDCard13: result.Supporter_IDCard13,
                            Supporter_IDCard14: result.Supporter_IDCard14,
                            Supporter_IDCard15: result.Supporter_IDCard15,
                            Supporter_IDCard16: result.Supporter_IDCard16,

                            CoupleFrontName: result.CoupleFrontName || '',// "",
                            CoupleName: result.CoupleName || '',// "",
                            CoupleSirname: result.CoupleSirname || '',// "",
                            CoupleAGE: result.CoupleAGE || '',// "",
                            CoupleNationality: result.CoupleNationality || '',// "",
                            CoupleHouseNumber: result.CoupleHouseNumber || '',// "",
                            CoupleMoo: result.CoupleMoo || '',// "",
                            CoupleRoad: result.CoupleRoad || '',// "",
                            CoupleProvince: result.CoupleProvince || '',// "",
                            CoupleDistrict: result.CoupleDistrict || '',// "",
                            CoupleSubdistrict: result.CoupleSubdistrict || '',// "",
                            CoupleOtherContact: result.CoupleOtherContact || '',// "",

                            WitnessName1: result.WitnessName1 || '',// "พยาน1",
                            WitnessAddr1: '',// "ที่อยู่พยาน1",
                            WitnessIDCard1: result.WitnessIDCard1 || '',// "1234567891011",
                            WitnessIDCardMake1: '',// "ออกพยาน1",
                            WitnessName2: result.WitnessName2 || '',// "พยาน2",
                            WitnessAddr2: '',// "ที่อยู่พยาน2",
                            WitnessIDCard2: result.WitnessIDCard2 || '',// "1234567891022",
                            WitnessIDCardMake2: '',// "ออกพยาน2",

                            WitnessName3: result.WitnessName3 || '',// "พยาน1",
                            WitnessAddr3: '',// "ที่อยู่พยาน1",
                            WitnessIDCard3: result.WitnessIDCard3 || '',// "1234567891011",
                            WitnessIDCardMake3: '',// "ออกพยาน1",
                            WitnessName4: result.WitnessName4 || '',// "พยาน2",
                            WitnessAddr4: '',// "ที่อยู่พยาน2",
                            WitnessIDCard4: result.WitnessIDCard4 || '',// "1234567891022",
                            WitnessIDCardMake4: '',// "ออกพยาน2",
                        })

                        // let personalForm = document.getElementsByClassName('personalForm');
                        // let personalFormId = document.getElementById('person-')
                        
                        // for (var i=0; i < 4; i++) {
                        //     console.log(i)
                        //     document.getElementById('person-'+(i+1)).style.display = "inline-block"
                        // }

                        setIsLoading(false)
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

    // const getDistrictList = (event) => {
        
    //     switch (event.target.name) {
    //         case 'Province1':
    //             setDistrictList1([])
    //             setSubdistrictList1([])
    //             break;
            
    //         case 'Province2':
    //             setDistrictList2([])
    //             setSubdistrictList2([])
    //             break;

    //         case 'Province3':
    //             setDistrictList3([])
    //             setSubdistrictList3([])
    //             break;
                
    //         case 'Province4':
    //             setDistrictList4([])
    //             setSubdistrictList4([])
    //             break;
                
    //         case 'Province5':
    //             setDistrictList5([])
    //             setSubdistrictList5([])
    //             break;
        
    //         default:
    //             break;
    //     }
    //     console.log(event.target.value)
    //     let pv_id = event.target.value
    //     let districtArr = []
    //     for(let i=0; i<districtList.length; i++) {
    //         if(districtList[i].ProvinceID === pv_id ) {
    //             districtArr.push(districtList[i])
    //         }
    //     }
        
    //     switch (event.target.name) {
    //         case 'Province1':
    //             setDistrictList1(districtArr)
    //             break;
            
    //         case 'Province2':
    //             setDistrictList2(districtArr)
    //             break;

    //         case 'Province3':
    //             setDistrictList3(districtArr)
    //             break;
                
    //         case 'Province4':
    //             setDistrictList4(districtArr)
    //             break;
                
    //         case 'Province5':
    //             setDistrictList5(districtArr)
    //             break;
                
    //         case 'Province6':
    //             setDistrictList6(districtArr)
    //             break;

    //         case 'Province7':
    //             setDistrictList7(districtArr)
    //             break;
            
    //         case 'Province8':
    //             setDistrictList8(districtArr)
    //             break;

    //         case 'Province9':
    //             setDistrictList9(districtArr)
    //             break;
                
    //         case 'Province10':
    //             setDistrictList10(districtArr)
    //             break;
                
    //         case 'Province11':
    //             setDistrictList11(districtArr)
    //             break;

    //         case 'Province12':
    //             setDistrictList12(districtArr)
    //             break;
            
    //         case 'Province13':
    //             setDistrictList13(districtArr)
    //             break;

    //         case 'Province14':
    //             setDistrictList14(districtArr)
    //             break;
                
    //         case 'Province15':
    //             setDistrictList15(districtArr)
    //             break;
                
    //         case 'Province16':
    //             setDistrictList16(districtArr)
    //             break;
        
    //         default:
    //             break;
    //     }
    //     console.log(districtArr)
    // }


    // const getSubDistrictList = (event) => {
    //     switch (event.target.name) {
    //         case 'District1':
    //             setSubdistrictList1([])
    //             break;
            
    //         case 'District2':
    //             setSubdistrictList2([])
    //             break;

    //         case 'District3':
    //             setSubdistrictList3([])
    //             break;
                
    //         case 'District4':
    //             setSubdistrictList4([])
    //             break;
                
    //         case 'District5':
    //             setSubdistrictList5([])
    //             break;

    //         case 'District6':
    //             setSubdistrictList6([])
    //             break;
            
    //         case 'District7':
    //             setSubdistrictList7([])
    //             break;

    //         case 'District8':
    //             setSubdistrictList8([])
    //             break;
                
    //         case 'District9':
    //             setSubdistrictList9([])
    //             break;
                
    //         case 'District10':
    //             setSubdistrictList10([])
    //             break;

    //         case 'District11':
    //             setSubdistrictList11([])
    //             break;
            
    //         case 'District12':
    //             setSubdistrictList12([])
    //             break;

    //         case 'District13':
    //             setSubdistrictList13([])
    //             break;
                
    //         case 'District14':
    //             setSubdistrictList14([])
    //             break;
                
    //         case 'District15':
    //             setSubdistrictList15([])
    //             break;

    //         case 'District16':
    //             setSubdistrictList16([])
    //             break;
        
    //         default:
    //             break;
    //     }
    //     console.log(event.target.value)
    //     let dt_id = event.target.value
    //     let subdistrictArr = []
    //     for(let i=0; i<districtList.length; i++) {
    //         if(subdistrictList[i].DistrictID === dt_id ) {
    //             subdistrictArr.push(subdistrictList[i])
    //         }
    //     }
        
    //     switch (event.target.name) {
    //         case 'District1':
    //             setSubdistrictList1(subdistrictArr)
    //             break;
            
    //         case 'District2':
    //             setSubdistrictList2(subdistrictArr)
    //             break;

    //         case 'District3':
    //             setSubdistrictList3(subdistrictArr)
    //             break;
                
    //         case 'District4':
    //             setSubdistrictList4(subdistrictArr)
    //             break;
                
    //         case 'District5':
    //             setSubdistrictList5(subdistrictArr)
    //             break;
            
    //         case 'District6':
    //             setSubdistrictList6(subdistrictArr)
    //             break;
            
    //         case 'District7':
    //             setSubdistrictList7(subdistrictArr)
    //             break;

    //         case 'District8':
    //             setSubdistrictList8(subdistrictArr)
    //             break;
                
    //         case 'District9':
    //             setSubdistrictList9(subdistrictArr)
    //             break;
                
    //         case 'District10':
    //             setSubdistrictList10(subdistrictArr)
    //             break;
 
    //         case 'District11':
    //             setSubdistrictList11(subdistrictArr)
    //             break;
            
    //         case 'District12':
    //             setSubdistrictList12(subdistrictArr)
    //             break;
            
    //         case 'District13':
    //             setSubdistrictList13(subdistrictArr)
    //             break;

    //         case 'District14':
    //             setSubdistrictList14(subdistrictArr)
    //             break;
                
    //         case 'District15':
    //             setSubdistrictList15(subdistrictArr)
    //             break;
                
    //         case 'District16':
    //             setSubdistrictList16(subdistrictArr)
    //             break;
        
    //         default:
    //             break;
    //     }
    //     console.log(subdistrictArr)
    // }

    const handleSupporterAmount = (e) => {
        console.log('handleSupporterAmount',e.target.value)
        let value = e.target.value
        setSupporterAmount(e.target.value)

        setSupporterView1(false)
        setSupporterView2(false)
        setSupporterView3(false)
        setSupporterView4(false)
        setSupporterView5(false)
        setSupporterView6(false)
        setSupporterView7(false)
        setSupporterView8(false)
        setSupporterView9(false)
        setSupporterView10(false)
        setSupporterView11(false)
        setSupporterView12(false)
        setSupporterView13(false)
        setSupporterView14(false)
        setSupporterView15(false)
        setSupporterView16(false)

        if(value === 1) {
            setSupporterView1(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard2: null,
                Supporter_IDCard3: null,
                Supporter_IDCard4: null,
                Supporter_IDCard5: null,
                Supporter_IDCard6: null,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 2) {
            setSupporterView1(true)
            setSupporterView2(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard3: null,
                Supporter_IDCard4: null,
                Supporter_IDCard5: null,
                Supporter_IDCard6: null,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 3) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard4: null,
                Supporter_IDCard5: null,
                Supporter_IDCard6: null,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 4) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard5: null,
                Supporter_IDCard6: null,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 5) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard6: null,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 6) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard7: null,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 7) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard8: null,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 8) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard9: null,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 9) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard10: null,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 10) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard11: null,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 11) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard12: null,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 12) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setSupporterView12(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard13: null,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 13) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setSupporterView12(true)
            setSupporterView13(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard14: null,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 14) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setSupporterView12(true)
            setSupporterView13(true)
            setSupporterView14(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard15: null,
                Supporter_IDCard16: null,
            })

        } else if(value === 15) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setSupporterView12(true)
            setSupporterView13(true)
            setSupporterView14(true)
            setSupporterView15(true)
            setInputDataSubmit({
                ...inputDataSubmit,
                Supporter_IDCard16: null,
            })

        } else if(value === 16) {
            setSupporterView1(true)
            setSupporterView2(true)
            setSupporterView3(true)
            setSupporterView4(true)
            setSupporterView5(true)
            setSupporterView6(true)
            setSupporterView7(true)
            setSupporterView8(true)
            setSupporterView9(true)
            setSupporterView10(true)
            setSupporterView11(true)
            setSupporterView12(true)
            setSupporterView13(true)
            setSupporterView14(true)
            setSupporterView15(true)
            setSupporterView16(true)

        }
    }


    const handleInputSupporterData = (event, orderNum) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        console.log('orderNum',orderNum)
        let typeNumber = event.target.id.toString().slice(-3);
        if (typeNumber === 'idc') {
            event.target.value = event.target.value.toString().slice(0, 13)
            setInputDataSubmit({
                ...inputDataSubmit,
                [event.target.name]: event.target.value
            })

        }

        if(event.target.value.length < 13) {
            if(event.target.name === 'Supporter_IDCard1') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard1: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard2') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard2: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard3') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard3: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard4') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard4: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard5') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard5: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard6') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard6: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard7') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard7: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard8') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard8: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard9') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard9: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard10') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard10: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard11') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard11: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard12') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard12: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard13') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard13: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard14') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard14: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard15') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard15: event.target.value,
                })
            } else if(event.target.name === 'Supporter_IDCard16') {
                setInputDataSubmit({
                    ...inputDataSubmit,
                    Supporter_IDCard16: event.target.value,
                })
            }

        } else if(event.target.value.length === 13) {
            setIsLoading(true)
            
            axios.post(
                // `${server_hostname}/admin/api/search_supporter_step1`, {"IDCard": event.target.value}, 
                `${server_hostname}/admin/api/search_farmer`, {
                    Name: null,
                    Sirname: null,
                    IDCard: event.target.value,
                    FarmerGrade: null,
                    LoanNumber: null,
                    order_by: "IDCard",
                    order_desc: "DESC",
                    page_number: 1,
                    page_length: 200,
                },
                { headers: { "token": token } } 
            ).then(res => {
                setIsLoading(false)
                    console.log(res)
                    let data = res.data;
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
                        // console.log(data.data[0].FarmerID)
                        console.log(data.data.length)
                        if(data.data.length === 0) {
                            setErr(true)
                            setErrMsg(`ไม่พบข้อมูลจากเลขบัตรประชาชน ${event.target.value} กรุณาเพิ่มในรายชื่อเกษตรกร`)

                            switch (orderNum) {
                                case 1:
                                    setInputData({
                                        ...inputData,
                                        FrontName1: '', // "นาย1",
                                        Name1: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname1: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE1: '', // "11",
                                        HouseNumber1: '', // "บ้านเลขที่1",
                                        Moo1: '', // "หมู่ 1",
                                        Road1: '', // "ถนน 1",
                                        Province1: '', // "มหาสารคาม1",
                                        District1: '', // "เมือง1",
                                        Subdistrict1: '', // "ในเมือง1",
                                    })
                                    break;

                                case 2:
                                    setInputData({
                                        ...inputData,
                                        FrontName2: '', // "นาย1",
                                        Name2: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname2: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE2: '', // "11",
                                        HouseNumber2: '', // "บ้านเลขที่1",
                                        Moo2: '', // "หมู่ 1",
                                        Road2: '', // "ถนน 1",
                                        Province2: '', // "มหาสารคาม1",
                                        District2: '', // "เมือง1",
                                        Subdistrict2: '', // "ในเมือง1",
                                    })
                                    break;
                                    
                                case 3:
                                    setInputData({
                                        ...inputData,
                                        FrontName3: '', // "นาย1",
                                        Name3: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname3: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE3: '', // "11",
                                        HouseNumber3: '', // "บ้านเลขที่1",
                                        Moo3: '', // "หมู่ 1",
                                        Road3: '', // "ถนน 1",
                                        Province3: '', // "มหาสารคาม1",
                                        District3: '', // "เมือง1",
                                        Subdistrict3: '', // "ในเมือง1",
                                    })
                                    break;
                                
                                case 4:
                                    setInputData({
                                        ...inputData,
                                        FrontName4: '', // "นาย1",
                                        Name4: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname4: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE4: '', // "11",
                                        HouseNumber4: '', // "บ้านเลขที่1",
                                        Moo4: '', // "หมู่ 1",
                                        Road4: '', // "ถนน 1",
                                        Province4: '', // "มหาสารคาม1",
                                        District4: '', // "เมือง1",
                                        Subdistrict4: '', // "ในเมือง1",
                                    })
                                    break;
                                case 5:
                                    setInputData({
                                        ...inputData,
                                        FrontName5: '', // "นาย1",
                                        Name5: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname5: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE5: '', // "11",
                                        HouseNumber5: '', // "บ้านเลขที่1",
                                        Moo5: '', // "หมู่ 1",
                                        Road5: '', // "ถนน 1",
                                        Province5: '', // "มหาสารคาม1",
                                        District5: '', // "เมือง1",
                                        Subdistrict5: '', // "ในเมือง1",
                                    })
                                    break;

                                case 6:
                                    setInputData({
                                        ...inputData,
                                        FrontName6: '', // "นาย1",
                                        Name6: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname6: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE6: '', // "11",
                                        HouseNumber6: '', // "บ้านเลขที่1",
                                        Moo6: '', // "หมู่ 1",
                                        Road6: '', // "ถนน 1",
                                        Province6: '', // "มหาสารคาม1",
                                        District6: '', // "เมือง1",
                                        Subdistrict6: '', // "ในเมือง1",
                                    })
                                    break;
                                    
                                case 7:
                                    setInputData({
                                        ...inputData,
                                        FrontName7: '', // "นาย1",
                                        Name7: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname7: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE7: '', // "11",
                                        HouseNumber7: '', // "บ้านเลขที่1",
                                        Moo7: '', // "หมู่ 1",
                                        Road7: '', // "ถนน 1",
                                        Province7: '', // "มหาสารคาม1",
                                        District7: '', // "เมือง1",
                                        Subdistrict7: '', // "ในเมือง1",
                                    })
                                    break;
                                
                                case 8:
                                    setInputData({
                                        ...inputData,
                                        FrontName8: '', // "นาย1",
                                        Name8: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname8: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE8: '', // "11",
                                        HouseNumber8: '', // "บ้านเลขที่1",
                                        Moo8: '', // "หมู่ 1",
                                        Road8: '', // "ถนน 1",
                                        Province8: '', // "มหาสารคาม1",
                                        District8: '', // "เมือง1",
                                        Subdistrict8: '', // "ในเมือง1",
                                    })
                                    break;
                                case 9:
                                    setInputData({
                                        ...inputData,
                                        FrontName9: '', // "นาย1",
                                        Name9: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname9: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE9: '', // "11",
                                        HouseNumber9: '', // "บ้านเลขที่1",
                                        Moo9: '', // "หมู่ 1",
                                        Road9: '', // "ถนน 1",
                                        Province9: '', // "มหาสารคาม1",
                                        District9: '', // "เมือง1",
                                        Subdistrict9: '', // "ในเมือง1",
                                    })
                                    break;

                                case 10:
                                    setInputData({
                                        ...inputData,
                                        FrontName10: '', // "นาย1",
                                        Name10: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname10: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE10: '', // "11",
                                        HouseNumber10: '', // "บ้านเลขที่1",
                                        Moo10: '', // "หมู่ 1",
                                        Road10: '', // "ถนน 1",
                                        Province10: '', // "มหาสารคาม1",
                                        District10: '', // "เมือง1",
                                        Subdistrict10: '', // "ในเมือง1",
                                    })
                                    break;
                                    
                                case 11:
                                    setInputData({
                                        ...inputData,
                                        FrontName11: '', // "นาย1",
                                        Name11: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname11: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE11: '', // "11",
                                        HouseNumber11: '', // "บ้านเลขที่1",
                                        Moo11: '', // "หมู่ 1",
                                        Road11: '', // "ถนน 1",
                                        Province11: '', // "มหาสารคาม1",
                                        District11: '', // "เมือง1",
                                        Subdistrict11: '', // "ในเมือง1",
                                    })
                                    break;
                                
                                case 12:
                                    setInputData({
                                        ...inputData,
                                        FrontName12: '', // "นาย1",
                                        Name12: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname12: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE12: '', // "11",
                                        HouseNumber12: '', // "บ้านเลขที่1",
                                        Moo12: '', // "หมู่ 1",
                                        Road12: '', // "ถนน 1",
                                        Province12: '', // "มหาสารคาม1",
                                        District12: '', // "เมือง1",
                                        Subdistrict12: '', // "ในเมือง1",
                                    })
                                    break;
                                case 13:
                                    setInputData({
                                        ...inputData,
                                        FrontName13: '', // "นาย1",
                                        Name13: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname13: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE13: '', // "11",
                                        HouseNumber13: '', // "บ้านเลขที่1",
                                        Moo13: '', // "หมู่ 1",
                                        Road13: '', // "ถนน 1",
                                        Province13: '', // "มหาสารคาม1",
                                        District13: '', // "เมือง1",
                                        Subdistrict13: '', // "ในเมือง1",
                                    })
                                    break;

                                case 14:
                                    setInputData({
                                        ...inputData,
                                        FrontName14: '', // "นาย1",
                                        Name14: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname14: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE14: '', // "11",
                                        HouseNumber14: '', // "บ้านเลขที่1",
                                        Moo14: '', // "หมู่ 1",
                                        Road14: '', // "ถนน 1",
                                        Province14: '', // "มหาสารคาม1",
                                        District14: '', // "เมือง1",
                                        Subdistrict14: '', // "ในเมือง1",
                                    })
                                    break;
                                    
                                case 15:
                                    setInputData({
                                        ...inputData,
                                        FrontName15: '', // "นาย1",
                                        Name15: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname15: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE15: '', // "11",
                                        HouseNumber15: '', // "บ้านเลขที่1",
                                        Moo15: '', // "หมู่ 1",
                                        Road15: '', // "ถนน 1",
                                        Province15: '', // "มหาสารคาม1",
                                        District15: '', // "เมือง1",
                                        Subdistrict15: '', // "ในเมือง1",
                                    })
                                    break;
                                
                                case 16:
                                    setInputData({
                                        ...inputData,
                                        FrontName16: '', // "นาย1",
                                        Name16: '', // "ชื่อผู้ค้ำ 1",
                                        Sirname16: '', // "นามสกุลผู้ค้ำ 1",
                                        AGE16: '', // "11",
                                        HouseNumber16: '', // "บ้านเลขที่1",
                                        Moo16: '', // "หมู่ 1",
                                        Road16: '', // "ถนน 1",
                                        Province16: '', // "มหาสารคาม1",
                                        District16: '', // "เมือง1",
                                        Subdistrict16: '', // "ในเมือง1",
                                    })
                                    break;
                                
                                default:
                                    break;
                            }
                        } else {
                            console.log(data)
                            switch (orderNum) {
                                case 1:
                                    setInputData({
                                        // ...inputData,
                                        FrontName1: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name1: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname1: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE1: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard1: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber1: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo1: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road1: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province1: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District1: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict1: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                            
                                case 2:
                                    setInputData({
                                        // ...inputData,
                                        FrontName2: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name2: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname2: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE2: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard2: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber2: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo2: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road2: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province2: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District2: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict2: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                        
                                case 3:
                                    setInputData({
                                        // ...inputData,
                                        FrontName3: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name3: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname3: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE3: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard3: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber3: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo3: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road3: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province3: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District3: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict3: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                            
                                case 4:
                                    setInputData({
                                        // ...inputData,
                                        FrontName4: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name4: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname4: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE4: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard4: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber4: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo4: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road4: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province4: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District4: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict4: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                                    
                                case 5:
                                    setInputData({
                                        // ...inputData,
                                        FrontName5: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name5: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname5: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE5: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard5: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber5: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo5: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road5: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province5: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District5: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict5: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 6:
                                    setInputData({
                                        // ...inputData,
                                        FrontName6: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name6: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname6: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE6: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard6: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber6: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo6: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road6: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province6: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District6: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict6: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 7:
                                    setInputData({
                                        // ...inputData,
                                        FrontName7: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name7: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname7: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE7: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard7: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber7: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo7: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road7: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province7: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District7: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict7: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 8:
                                    setInputData({
                                        // ...inputData,
                                        FrontName8: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name8: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname8: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE8: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard8: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber8: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo8: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road8: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province8: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District8: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict8: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                                
                                case 9:
                                    setInputData({
                                        // ...inputData,
                                        FrontName9: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name9: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname9: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE9: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard9: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber9: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo9: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road9: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province9: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District9: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict9: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 10:
                                    setInputData({
                                        // ...inputData,
                                        FrontName10: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name10: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname10: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE10: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard10: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber10: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo10: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road10: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province10: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District10: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict10: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 11:
                                    setInputData({
                                        // ...inputData,
                                        FrontName11: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name11: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname11: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE11: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard11: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber11: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo11: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road11: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province11: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District11: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict11: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 12:
                                    setInputData({
                                        // ...inputData,
                                        FrontName12: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name12: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname12: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE12: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard12: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber12: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo12: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road12: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province12: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District12: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict12: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 13:
                                    setInputData({
                                        // ...inputData,
                                        FrontName13: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name13: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname13: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE13: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard13: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber13: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo13: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road13: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province13: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District13: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict13: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 14:
                                    setInputData({
                                        // ...inputData,
                                        FrontName14: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name14: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname14: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE14: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard14: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber14: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo14: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road14: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province14: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District14: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict14: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 15:
                                    setInputData({
                                        // ...inputData,
                                        FrontName15: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name15: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname15: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE15: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard15: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber15: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo15: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road15: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province15: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District15: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict15: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
    
                                case 16:
                                    setInputData({
                                        // ...inputData,
                                        FrontName16: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                        Name16: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                        Sirname16: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                        AGE16: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                        IDCard16: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                        HouseNumber16: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                        Moo16: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                        Road16: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                        Province16: data.data[0].IDCARD_AddrProvinceID === null ? '' : getProvince(data.data[0].IDCARD_AddrProvinceID), // "มหาสารคาม16",
                                        District16: data.data[0].IDCARD_AddrDistrictID === null ? '' : getDistrict(data.data[0].IDCARD_AddrDistrictID), // "เมือง16",
                                        Subdistrict16: data.data[0].IDCARD_AddrSubdistrictID === null ? '' : getSubDistrict(data.data[0].IDCARD_AddrSubdistrictID), // "ในเมือง16",
                                    })
                                    break;
                                
                                default:
                                    break;
                            }
    
                            
                        }
                    }
                }
            ).catch(err => { console.log(err); })
            .finally(() => {
                if (isMounted.current) {
                setIsLoading(false)
                }
            });

        } 
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
            // if(event.target.name === 'Province1' || event.target.name === 'Province2' || event.target.name === 'Province3' || event.target.name === 'Province4' || event.target.name === 'Province5') {
            //     getDistrictList(event)
            // }
            // if(event.target.name === 'District1' || event.target.name === 'District2' || event.target.name === 'District3' || event.target.name === 'District4' || event.target.name === 'District5') {
            //     getSubDistrictList(event)
            // }
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

    const handleInputDataSubmit = (event) => {

        // console.log('',event)
        let value = event.target.value
        setInputDataSubmit({...inputDataSubmit,
            [event.target.name]: value
        })
        // console.log('inputDataSubmit',event.target.name, event.target.value, event.target.id)
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('inputDataSubmit', inputDataSubmit)

        let guaranteebookb = document.getElementById('guaranteebookb');
        let formData = new FormData(guaranteebookb);  
        
        
        formData.append('GuaranteeBookTypeID', '2')
        formData.append('LoanID', inputData.LoanID)
        formData.append('ContactDate', inputData.ContactDate === 'Invalid date' || inputData.ContactDate === null ? null : moment(inputData.ContactDate).format('YYYY-MM-DD'))
    
        formData.set('Supporter_IDCard1', inputDataSubmit.Supporter_IDCard1 ? inputData.IDCard1 : null)
        formData.set('Supporter_IDCard2', inputDataSubmit.Supporter_IDCard2 ? inputData.IDCard2 : null)
        formData.set('Supporter_IDCard3', inputDataSubmit.Supporter_IDCard3 ? inputData.IDCard3 : null)
        formData.set('Supporter_IDCard4', inputDataSubmit.Supporter_IDCard4 ? inputData.IDCard4 : null)
        formData.set('Supporter_IDCard5', inputDataSubmit.Supporter_IDCard5 ? inputData.IDCard5 : null)
        formData.set('Supporter_IDCard6', inputDataSubmit.Supporter_IDCard6 ? inputData.IDCard6 : null)
        formData.set('Supporter_IDCard7', inputDataSubmit.Supporter_IDCard7 ? inputData.IDCard7 : null)
        formData.set('Supporter_IDCard8', inputDataSubmit.Supporter_IDCard8 ? inputData.IDCard8 : null)
        formData.set('Supporter_IDCard9', inputDataSubmit.Supporter_IDCard9 ? inputData.IDCard9 : null)
        formData.set('Supporter_IDCard10', inputDataSubmit.Supporter_IDCard10 ? inputData.IDCard10 : null)
        formData.set('Supporter_IDCard11', inputDataSubmit.Supporter_IDCard11 ? inputData.IDCard11 : null)
        formData.set('Supporter_IDCard12', inputDataSubmit.Supporter_IDCard12 ? inputData.IDCard12 : null)
        formData.set('Supporter_IDCard13', inputDataSubmit.Supporter_IDCard13 ? inputData.IDCard13 : null)
        formData.set('Supporter_IDCard14', inputDataSubmit.Supporter_IDCard14 ? inputData.IDCard14 : null)
        formData.set('Supporter_IDCard15', inputDataSubmit.Supporter_IDCard15 ? inputData.IDCard15 : null)
        formData.set('Supporter_IDCard16', inputDataSubmit.Supporter_IDCard16 ? inputData.IDCard16 : null)

        console.log('formData',formData)
        console.log('SupporterAmount',supporterAmount)

        axios.post(
            `${server_hostname}/admin/api/update_GuaranteeBook`, 
                // formData
                inputDataSubmit
                , { headers: { "token": token } } 
        ).then(res => {
            setIsLoading(false)
            console.log('Insert',res.data)
            let data = res.data;
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
                setPrintActive(true)
            }
        }).catch(err => { console.log(err); })
        .finally(() => {
            if (isMounted.current) {
                setIsLoading(false)
            }
        });
        


    };

    const handlePrintPDF = () => {
        setIsLoading(true)
        console.log('PDF - ContractNo:', loanNumber)
        console.log('PDF - Username:',localStorage.getItem('provinceid'))

        let formData = new FormData(); 
        formData.append('ContractNo', loanNumber)
        formData.append('UserName', localStorage.getItem('provinceid'))
        formData.append('RoleID', localStorage.getItem('nROLEID'))

        axios({
        url: `${siteprint}/report/pdf/GetGuaranteeBookType2Pdf`, //your url
        method: 'POST',
        data: formData,
        responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            // link.setAttribute('download', `พิมพ์สัญญากู้ยืมเงิน_${loanNumber.toString()}.pdf`); //or any other extension
            document.body.appendChild(link);
            link.click();
            setIsLoading(false)
        }).catch(err => { console.log(err); setErr(true); setErrMsg('ไม่สามารถทำรายการได้'); })
        .finally(() => {
            if (isMounted.current) {
            setIsLoading(false)
            }
        });
    }
    
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

        // window.location.reload()
        
        // history.push('/manageinfo/searchmember');

    };

    return (
        
        <div className="guaranteebookb-page">
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
                                <h1>สร้าง/พิมพ์ หนังสือสัญญาค้ำประกัน ข</h1>
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
                                            <ButtonFluidPrimary label="ค้นหา" onClick={()=>getSearch()} />  
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
                                        <h1 className="txt-green">หนังสือสัญญาค้ำประกัน ข</h1>
                                    </Grid>


                                    <form id="guaranteebookb" className="root" noValidate autoComplete="off" onSubmit={handleSubmit}>
                                        {/* Paper 1 - -------------------------------------------------- */}
                                        <Paper className="paper line-top-green paper mg-t-20">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="หนังสือสัญญาค้ำประกันที่"  name="PlaceCreate" value={inputDataSubmit.PlaceCreate} onChange={handleInputDataSubmit}  />
                                                    </Grid>

                                                    {/* <Grid item xs={12} md={4}>
                                                        <MuiTextfield label="ทำที่"  name="PlaceCreate" value={inputData.PlaceCreate} onChange={handleInputData}  />
                                                    </Grid> */}
                                                    <Grid item xs={12} md={4}>
                                                        <MuiDatePicker label="วันที่ทำสัญญา" name="ContactDate"  value={inputDataSubmit.ContactDate} onChange={(newValue)=>{ setInputDataSubmit({ ...inputDataSubmit, ContactDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
                                                    </Grid>

                                                    <Grid item xs={12} md={4}>
                                                        <MuiSelect label="จำนวนผู้ค้ำประกัน" listsValue={supporterAmountList} lists={supporterAmountList} value={supporterAmount} onChange={handleSupporterAmount}  />
                                                    </Grid>
                                                    
                                                    {/* Guaranteebook 1------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-1" className={`personalForm `+ (supporterView1 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="1. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="1. ข้าพเจ้า" className="txt-green" checked={checkActive.Supporter1} onChange={(event)=>{setCheckActive({Supporter1: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName1" value={inputData.FrontName1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name1" value={inputData.Name1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname1" value={inputData.Sirname1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE1" value={inputData.AGE1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number1-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard1" value={inputDataSubmit.Supporter_IDCard1} onInput={(event)=>{handleInputSupporterData(event,1)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number1-idc" name="IDCard1" value={inputData.IDCard1} onChange={handleInputSupporterData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber1"  value={inputData.HouseNumber1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo1"  value={inputData.Moo1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road1"  value={inputData.Road1} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict1"  value={inputData.Subdistrict1} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District1"  value={inputData.District1} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province1"  value={inputData.Province1} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Guaranteebook 2------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-2" className={`personalForm `+ (supporterView2 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="2. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="2. ข้าพเจ้า" className="txt-green" checked={checkActive.Supporter2} onChange={(event)=>{setCheckActive({Supporter2: event.target.checked}) } } /> */}
                                                            
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName2" value={inputData.FrontName2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name2" value={inputData.Name2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname2" value={inputData.Sirname2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE2" value={inputData.AGE2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number2-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard2" value={inputDataSubmit.Supporter_IDCard2} onInput={(event)=>{handleInputSupporterData(event,2)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number2-idc" name="IDCard2" value={inputData.IDCard2} onChange={handleInputDataSubmit}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber2"  value={inputData.HouseNumber2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo2"  value={inputData.Moo2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road2"  value={inputData.Road2} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict2"  value={inputData.Subdistrict2} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District2"  value={inputData.District2} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province2"  value={inputData.Province2} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 3------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-3" className={`personalForm `+ (supporterView3 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="3. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="3. ข้าพเจ้า" checked={checkActive.Supporter3} onChange={(event)=>{setCheckActive({Supporter3: event.target.checked}) } } /> */}
                                                            
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName3" value={inputData.FrontName3} onChange={handleInputData}  /></Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name3" value={inputData.Name3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname3" value={inputData.Sirname3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE3" value={inputData.AGE3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number3-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard3" value={inputDataSubmit.Supporter_IDCard3} onInput={(event)=>{handleInputSupporterData(event,3)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number3-idc" name="IDCard3" value={inputData.IDCard3} onChange={handleInputDataSubmit}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber3"  value={inputData.HouseNumber3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo3"  value={inputData.Moo3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road3"  value={inputData.Road3} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict3"  value={inputData.Subdistrict3} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District3"  value={inputData.District3} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province3"  value={inputData.Province3} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 4------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-4" className={`personalForm `+ (supporterView4 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="4. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="4. ข้าพเจ้า" checked={checkActive.Supporter4} onChange={(event)=>{setCheckActive({Supporter4: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName4" value={inputData.FrontName4} onChange={handleInputData}  /></Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name4" value={inputData.Name4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname4" value={inputData.Sirname4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE4" value={inputData.AGE4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number4-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard4" value={inputDataSubmit.Supporter_IDCard4} onInput={(event)=>{handleInputSupporterData(event,4)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number4-idc" name="IDCard4" value={inputData.IDCard4} onChange={handleInputDataSubmit}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber4"  value={inputData.HouseNumber4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo4"  value={inputData.Moo4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road4"  value={inputData.Road4} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict4"  value={inputData.Subdistrict4} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District4"  value={inputData.District4} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province4"  value={inputData.Province4} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 5------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-5" className={`personalForm `+ (supporterView5 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="5. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="5. ข้าพเจ้า" checked={checkActive.Supporter5} onChange={(event)=>{setCheckActive({Supporter5: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName5" value={inputData.FrontName5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name5" value={inputData.Name5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname5" value={inputData.Sirname5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE5" value={inputData.AGE5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number5-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard5" value={inputDataSubmit.Supporter_IDCard5} onInput={(event)=>{handleInputSupporterData(event,5)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number5-idc" name="IDCard5" value={inputData.IDCard5} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber5"  value={inputData.HouseNumber5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo5"  value={inputData.Moo5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road5"  value={inputData.Road5} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict5"  value={inputData.Subdistrict5} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District5"  value={inputData.District5} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province5"  value={inputData.Province5} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 6------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-6" className={`personalForm `+ (supporterView6 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="6. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="6. ข้าพเจ้า" checked={checkActive.Supporter6} onChange={(event)=>{setCheckActive({Supporter6: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName6" value={inputData.FrontName6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name6" value={inputData.Name6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname6" value={inputData.Sirname6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE6" value={inputData.AGE6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number6-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard6" value={inputDataSubmit.Supporter_IDCard6} onInput={(event)=>{handleInputSupporterData(event,6)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number6-idc" name="IDCard6" value={inputData.IDCard6} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber6"  value={inputData.HouseNumber6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo6"  value={inputData.Moo6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road6"  value={inputData.Road6} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict6"  value={inputData.Subdistrict6} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District6"  value={inputData.District6} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province6"  value={inputData.Province6} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 7------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-7" className={`personalForm `+ (supporterView7 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="7. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="7. ข้าพเจ้า" checked={checkActive.Supporter7} onChange={(event)=>{setCheckActive({Supporter7: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName7" value={inputData.FrontName7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name7" value={inputData.Name7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname7" value={inputData.Sirname7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE7" value={inputData.AGE7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number7-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard7" value={inputDataSubmit.Supporter_IDCard7} onInput={(event)=>{handleInputSupporterData(event,7)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number7-idc" name="IDCard7" value={inputData.IDCard7} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber7"  value={inputData.HouseNumber7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo7"  value={inputData.Moo7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road7"  value={inputData.Road7} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict7"  value={inputData.Subdistrict7} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District7"  value={inputData.District7} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province7"  value={inputData.Province7} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 8------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-8" className={`personalForm `+ (supporterView8 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="8. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="8. ข้าพเจ้า" checked={checkActive.Supporter8} onChange={(event)=>{setCheckActive({Supporter8: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName8" value={inputData.FrontName8} onChange={handleInputData}  />
                                                                </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name8" value={inputData.Name8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname8" value={inputData.Sirname8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE8" value={inputData.AGE8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number8-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard8" value={inputDataSubmit.Supporter_IDCard8} onInput={(event)=>{handleInputSupporterData(event,8)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number8-idc" name="IDCard8" value={inputData.IDCard8} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber8"  value={inputData.HouseNumber8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo8"  value={inputData.Moo8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road8"  value={inputData.Road8} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict8"  value={inputData.Subdistrict8} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District8"  value={inputData.District8} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province8"  value={inputData.Province8} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 9------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-9" className={`personalForm `+ (supporterView9 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="9. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="9. ข้าพเจ้า" checked={checkActive.Supporter9} onChange={(event)=>{setCheckActive({Supporter9: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName9" value={inputData.FrontName9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name9" value={inputData.Name9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname9" value={inputData.Sirname9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE9" value={inputData.AGE9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number9-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard9" value={inputDataSubmit.Supporter_IDCard9} onInput={(event)=>{handleInputSupporterData(event,9)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number9-idc" name="IDCard9" value={inputData.IDCard9} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber9"  value={inputData.HouseNumber9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo9"  value={inputData.Moo9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road9"  value={inputData.Road9} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict9"  value={inputData.Subdistrict9} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District9"  value={inputData.District9} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province9"  value={inputData.Province9} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 10------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-10" className={`personalForm `+ (supporterView10 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="10. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="10. ข้าพเจ้า" checked={checkActive.Supporter10} onChange={(event)=>{setCheckActive({Supporter10: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName10" value={inputData.FrontName10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name10" value={inputData.Name10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname10" value={inputData.Sirname10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE10" value={inputData.AGE10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number10-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard10" value={inputDataSubmit.Supporter_IDCard10} onInput={(event)=>{handleInputSupporterData(event,10)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number10-idc" name="IDCard10" value={inputData.IDCard10} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber10"  value={inputData.HouseNumber10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo10"  value={inputData.Moo10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road10"  value={inputData.Road10} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict10"  value={inputData.Subdistrict10} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District10"  value={inputData.District10} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province10"  value={inputData.Province10} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 11------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-11" className={`personalForm `+ (supporterView11 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="11. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="11. ข้าพเจ้า" checked={checkActive.Supporter11} onChange={(event)=>{setCheckActive({Supporter11: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName11" value={inputData.FrontName11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name11" value={inputData.Name11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname11" value={inputData.Sirname11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE11" value={inputData.AGE11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number11-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard11" value={inputDataSubmit.Supporter_IDCard11} onInput={(event)=>{handleInputSupporterData(event,11)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number11-idc" name="IDCard11" value={inputData.IDCard11} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber11"  value={inputData.HouseNumber11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo11"  value={inputData.Moo11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road11"  value={inputData.Road11} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict11"  value={inputData.Subdistrict11} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District11"  value={inputData.District11} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province11"  value={inputData.Province11} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Guaranteebook 12------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-12" className={`personalForm `+ (supporterView12 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="12. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="12. ข้าพเจ้า" checked={checkActive.Supporter12} onChange={(event)=>{setCheckActive({Supporter12: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName12" value={inputData.FrontName12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name12" value={inputData.Name12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname12" value={inputData.Sirname12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE12" value={inputData.AGE12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number12-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard12" value={inputDataSubmit.Supporter_IDCard12} onInput={(event)=>{handleInputSupporterData(event,12)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number12-idc" name="IDCard12" value={inputData.IDCard12} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber12"  value={inputData.HouseNumber12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo12"  value={inputData.Moo12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road12"  value={inputData.Road12} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict12"  value={inputData.Subdistrict12} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District12"  value={inputData.District12} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province12"  value={inputData.Province12} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 13------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-13" className={`personalForm `+ (supporterView13 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="13. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="13. ข้าพเจ้า" checked={checkActive.Supporter13} onChange={(event)=>{setCheckActive({Supporter13: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName13" value={inputData.FrontName13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name13" value={inputData.Name13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname13" value={inputData.Sirname13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE13" value={inputData.AGE13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number13-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard13" value={inputDataSubmit.Supporter_IDCard13} onInput={(event)=>{handleInputSupporterData(event,13)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number13-idc" name="IDCard13" value={inputData.IDCard13} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber13"  value={inputData.HouseNumber13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo13"  value={inputData.Moo13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road13"  value={inputData.Road13} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict13"  value={inputData.Subdistrict13} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District13"  value={inputData.District13} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province13"  value={inputData.Province13} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    
                                                    {/* Guaranteebook 14-------------------------------------------*/}
                                                    <Grid item xs={12} md={12} id="person-14" className={`personalForm `+ (supporterView14 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="14. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="14. ข้าพเจ้า" checked={checkActive.Supporter14} onChange={(event)=>{setCheckActive({Supporter14: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName14" value={inputData.FrontName14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name14" value={inputData.Name14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname14" value={inputData.Sirname14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE14" value={inputData.AGE14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number14-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard14" value={inputDataSubmit.Supporter_IDCard14} onInput={(event)=>{handleInputSupporterData(event,14)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number14-idc" name="IDCard14" value={inputData.IDCard14} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber14"  value={inputData.HouseNumber14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo14"  value={inputData.Moo14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road14"  value={inputData.Road14} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict14"  value={inputData.Subdistrict14} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District14"  value={inputData.District14} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province14"  value={inputData.Province14} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 15------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-15" className={`personalForm `+ (supporterView15 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="15. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="15. ข้าพเจ้า" checked={checkActive.Supporter15} onChange={(event)=>{setCheckActive({Supporter15: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName15" value={inputData.FrontName15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name15" value={inputData.Name15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname15" value={inputData.Sirname15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE15" value={inputData.AGE15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number15-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard15" value={inputDataSubmit.Supporter_IDCard15} onInput={(event)=>{handleInputSupporterData(event,15)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number15-idc" name="IDCard15" value={inputData.IDCard15} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber15"  value={inputData.HouseNumber15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo15"  value={inputData.Moo15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road15"  value={inputData.Road15} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict15"  value={inputData.Subdistrict15} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District15"  value={inputData.District15} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province15"  value={inputData.Province15} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 16------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-16" className={`personalForm `+ (supporterView16 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="16. ข้าพเจ้า" />
                                                                {/* <MuiCheckbox label="16. ข้าพเจ้า" checked={checkActive.Supporter16} onChange={(event)=>{setCheckActive({Supporter16: event.target.checked}) } } /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="คำนำหน้า" inputdisabled="input-disabled" defaultValue=""  name="FrontName16" value={inputData.FrontName16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name16" value={inputData.Name16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname16" value={inputData.Sirname16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE16" value={inputData.AGE16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <MuiTextNumber label="เลขบัตรประชาชน" id="number16-idc" placeholder="ตัวอย่าง 3 8517 13368 44 4"  name="Supporter_IDCard16" value={inputDataSubmit.Supporter_IDCard16} onInput={(event)=>{handleInputSupporterData(event,16)}}  />
                                                                {/* <MuiTextfield label="เลขบัตรประชาชน" id="number16-idc" name="IDCard16" value={inputData.IDCard16} onChange={handleInputData}   /> */}
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <p>&nbsp;</p>
                                                                <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber16"  value={inputData.HouseNumber16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo16"  value={inputData.Moo16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road16"  value={inputData.Road16} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="แขวง / ตำบล" inputdisabled="input-disabled" name="Subdistrict16"  value={inputData.Subdistrict16} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="เขต / อำเภอ" inputdisabled="input-disabled" name="District16"  value={inputData.District16} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiTextfield label="จังหวัด" inputdisabled="input-disabled" name="Province16"  value={inputData.Province16} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 0-------------------------------------------
                                                    <div container spacing={2} id="person-0" className={`personalForm `+ (supporterView ?'show' : 'hide')}>
                                                        <Grid item xs={12} md={12} className="mg-t-20">
                                                            <MuiLabelHeader label="0. ข้าพเจ้า" />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName0" value={inputData.FrontName0} onChange={handleInputData} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue=""  name="Name0" value={inputData.Name0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" name="Sirname0" value={inputData.Sirname0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={2}>
                                                            <MuiTextfield label="อายุ" inputdisabled="input-disabled" name="AGE0" value={inputData.AGE0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <MuiTextfield label="เลขบัตรประชาชน" id="number0-idc" name="IDCard0" value={inputData.IDCard0} onChange={handleInputData}   />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <p>&nbsp;</p>
                                                            <p className="txt-cente-v">ดังปรากฏตามสําเนาแนบท้ายสัญญานี้</p>
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="บ้านเลขที่" inputdisabled="input-disabled"  name="HouseNumber0"  value={inputData.HouseNumber0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="หมู่ที่" inputdisabled="input-disabled" name="Moo0"  value={inputData.Moo0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiTextfield label="ซอย / ถนน" inputdisabled="input-disabled" name="Road0"  value={inputData.Road0} onChange={handleInputData} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province0" value={inputData.Province0} onChange={handleInputData} />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList0} name="District0"  value={inputData.District0} onChange={handleInputData}  />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList0} name="Subdistrict0"  value={inputData.Subdistrict0} onChange={handleInputData} />
                                                        </Grid>
                                                    </div> */}

                                                </Grid>
                                        </Paper>

                                        <Paper className="paper line-top-green paper mg-t-20">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ขอทําหนังสือค้ำประกันนี้ไว้ต่อสํานักงานการปฏิรูปที่ดินเพื่อเกษตรกรรม ซึ่งต่อไปในสัญญาเรียกว่า “ส.ป.ก.” ดังต่อไปนี้ " />
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <p>&nbsp;</p>
                                                    <MuiLabelHeader label="ข้อ ๑. ตามที่" />
                                                    {/* <MuiTextfield label="ข้อ ๑. ตามที่"  name="farmerName"  value={inputData.farmerName} onChange={handleInputData}  /> */}
                                                </Grid>
                                                <Grid item xs={12} md={2}>
                                                    <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} value={dataOwner.FrontName} onChange={handleInputDataOwner} />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="ชื่อ" inputdisabled="input-disabled" defaultValue="" value={dataOwner.Name} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiTextfield label="นามสกุล" inputdisabled="input-disabled" defaultValue="" value={dataOwner.Sirname} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="ซึ่งต่อไปในสัญญานี้เรียกว่า “ผู้กู้” ได้กู้เงินของ ส.ป.ก. ไปเป็น" />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <p>จำนวนเงิน</p>
                                                    <MuiTextfieldCurrency label="" inputdisabled="input-disabled" value={dataOwner.principle}  onChange={handleInputDataOwner} /> 
                                                </Grid>
                                                <Grid item xs={1} md={1}>
                                                    <p>&nbsp;</p>
                                                    <p className="paper-p">บาท</p>
                                                </Grid>
                                                <Grid item xs={12} md={3}>
                                                    <MuiTextfield label="ตามสัญญากู้ยืมเงิน" inputdisabled="input-disabled" value={dataOwner.LoanNumber} onChange={handleInputDataOwner}  />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <MuiDatePicker label="ลงวันที่" inputdisabled="input-disabled" value={dataOwner.LoanDate} onChange={(newValue)=>{ setDataOwner({ ...dataOwner, LoanDate: moment(newValue).format('YYYY-MM-DD')}) }}   />
                                                </Grid>


                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ซึ่งต่อไปในสัญญานี้เรียกว่า “สัญญากู้” ตามสําเนาสัญญากู้แนบท้ายสัญญานี้ นั้น ข้าพเจ้าตกลงผูกพันตน เข้าค้ําประกันผู้กู้ ต่อ ส.ป.ก. เต็มตามวงเงินกู้ดังกล่าวข้างต้น รวมทั้งตอกเบี้ยและค่าปรับ ตลอดจนบรรดา ค่าเสียหายที่บังเกิดขึ้นแก่ ส.ป.ก. เนื่องจากการที่ผู้กู้ ไม่ชําระหนี้ให้ถูกต้องตามสัญญากู้ด้วย" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๒. หากผู้กู้ไม่ชําระหนี้ ซึ่งข้าพเจ้าได้ค้ําประกันไว้นี้ให้แก่ ส.ป.ก. ตามข้อผูกพันไม่ว่าจะ เป็นเพราะเหตุใดๆ หรือผู้กู้ ถูกศาลพิพากษาให้เป็นบุคคลล้มละลาย หรือตาย หรือเป็นคนไร้ความสามารถ หรือคนสาบสูญ หรือไปเสียจากถิ่นที่อยู่ หรือ หาตัวไม่พบ เป็นเหตุให้ ส.ป.ก. ไม่ได้รับชําระหนี้ และ ส.ป.ก. ได้มี หนังสือบอกกล่าวให้ชําระหนี้ไปยังข้าพเจ้าโดยชอบแล้ว ข้าพเจ้าตกลงรับผิดชําระหนี้ให้แก่ ส.ป.ภ. แทนผู้กู้ ภายในเวลาที่ระบุไว้ในหนังสือบอกกล่าวโดยมิพักต้องเรียกให้ลูกหนี้ชําระ หนี้ก่อน" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๓. ในกรณีที่ ส.ป.ก. ผ่อนเวลาหรือผ่อนจํานวนเงินในการชําระหนี้ตามสัญญากู้ให้แก่ ผู้กู้ โดยได้แจ้งให้ข้าพเจ้าทราบ และข้าพเจ้าได้ตกลงยินยอมในการผ่อนเวลาหรือผ่อนจํานวนเงินในการชําระหนี้นั้น ให้ถือว่าข้าพเจ้าตกลงมิให้ถือเอาการผ่อน เวลาหรือผ่อนจํานวนเงินในการชําระหนี้ดังกล่าวเป็นเหตุ ปลดเปลื้องความรับผิดของข้าพเจ้า และจะรับผิดในฐานะผู้ค้ำประกัน ตามสัญญานี้ตลอดไปจนกว่าจะมีการ ชําระหนี้พร้อมดอกเบี้ย ค่าปรับและค่าเสียหาย (ถ้ามี) ครบเต็มจํานวน" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ในกรณีการทําข้อตกลงการขยายระยะเวลาชําระหนี้ที่ทําขึ้นภายหลังที่ผู้กู้ผิดนัดชําระ หนี้แล้วไม่ให้ถือว่าเป็นการ ผ่อนเวลา และข้าพเจ้าย่อมไม่หลุดพ้นจากความรับผิดตามสัญญานี้" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๔. ข้าพเจ้าจะไม่เพิกถอนการค้ําประกันไม่ว่ากรณีใดๆ และยินยอมรับผิดชอบตามสัญญานี้ตลอดไปจนกว่าผู้กู้ ได้ชําระหนี้ครบถ้วนตามสัญญากู้แล้ว" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๕. การส่งหนังสือบอกกล่าวหรือทวงถาม หรือการส่งเอกสารใดๆ ถึงข้าพเจ้า ถ้าได้ส่งไปยังที่อยู่ตามที่ปรากฏ ในสัญญานี้แล้วให้ถือว่าได้ส่งถึงข้าพเจ้าโดยชอบ โดยถือว่าที่อยู่ดังกล่าวเป็นภูมิลําเนาของข้าพเจ้า และข้าพเจ้าได้ทราบ ข้อความในหนังสือหรือเอกสารดังกล่าวแล้ว ไม่ว่าจะมีผู้รับไว้หรือไม่ หรือส่ง ไม่ได้เพราะเหตุใดๆ" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หากข้าพเจ้าเปลี่ยนแปลงที่อยู่ตามที่ปรากฏในสัญญานี้ ข้าพเจ้าตกลงจะมีหนังสือ แจ้งเปลี่ยนแปลงไปยัง ส.ป.ก. การละเลยไม่แจ้งเปลี่ยนแปลงที่อยู่ดังกล่าว หาก ส.ป.ก. ได้ส่งหนังสือ บอกกล่าวหรือทวงถาม หรือเอกสารใดๆ ไปยังข้าพเจ้าตามที่อยู่ที่ปรากฏในสัญญานี้ ให้ถือเสมือนว่าข้าพเจ้า ได้ทราบข้อความในหนังสือหรือเอกสารดังกล่าวแล้ว" />
                                                </Grid>

                                                <Grid item xs={12} md={12}>
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้อ ๖. ในกรณีที่ผู้กู้ทําหลักฐานแบบอื่นเปลี่ยนแทนสัญญากู้จาก ส.ป.ก. ที่อ้างในข้อ ๑. เพื่อสะดวกแก่การโอนตาม ความประสงค์ของ ส.ป.ก. ข้าพเจ้ายอมคงค้ำประกันอยู่ตามหนังสือนี้ อนึ่ง ถ้า ส.ป.ก. ประสงค์ให้ข้าพเจ้าเปลี่ยนหนังสือสัญญาค้ำประกันเป็นหลักฐานการค้ําประกันแบบอื่นด้วย ข้าพเจ้าก็จะทํา หลักฐานการค้ําประกันตามแบบอื่นนั้น เปลี่ยนให้ตามความ ประสงค์โดยมิชักช้า" />
                                                    <MuiLabelHeader label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ข้าพเจ้าได้อ่านและเข้าใจข้อความในหนังสือสัญญาค้ำประกันอุบับนี้โดยตลอดแล้ว จึงลงลายมือชื่อไว้เป็นสําคัญ ต่อหน้าพยาน" />
                                                </Grid>
                                                <Divider />
                                                <Grid item xs={12} md={12} className="mg-t-20">
                                                    <MuiLabelHeader label="หมายเหตุ" />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="1. ชื่อพยาน" name="WitnessName1" value={inputData.WitnessName1} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr1" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputDataSubmit}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard1" value={inputData.WitnessIDCard1} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake1" value={'กรมการปกครอง'} onChange={handleInputDataSubmit}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="2. ชื่อพยาน" name="WitnessName2" value={inputData.WitnessName2} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr2" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputDataSubmit}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard2" value={inputData.WitnessIDCard2} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake2" value={'กรมการปกครอง'} onChange={handleInputDataSubmit}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="3. ชื่อพยาน" name="WitnessName3" value={inputData.WitnessName3} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr3" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputDataSubmit}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard3" value={inputData.WitnessIDCard3} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake3" value={'กรมการปกครอง'} onChange={handleInputDataSubmit}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="4. ชื่อพยาน" name="WitnessName4" value={inputData.WitnessName4} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr4" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputDataSubmit}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard4" value={inputData.WitnessIDCard4} onChange={handleInputDataSubmit} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake4" value={'กรมการปกครอง'} onChange={handleInputDataSubmit}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                   
                                    </form>
                                    <Grid container spacing={2} className="btn-row txt-center">
                                        <Grid item xs={12} md={12}>
                                            <ButtonFluidPrimary label="บันทึกข้อมูล" maxWidth="280px" onClick={handleSubmit} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            {
                                                printActive ? 

                                                <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="280px"  startIcon={<PrintIcon />} onClick={()=>{handlePrintPDF()}} />
                                                :
                                                <div style={{opacity: '0.5', display: 'inline-block', width: '280px'}}>
                                                    <ButtonFluidIconStartPrimary label="พิมพ์ PDF" maxWidth="280px"  startIcon={<PrintIcon />} />
                                                </div> 

                                            }
                                            
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

export default GuaranteeBookB
