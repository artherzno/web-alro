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
    let provincename = localStorage.getItem('provincename');

    let provinceList = JSON.parse(localStorage.getItem('provincelist')) // [{ProvinceID: 81, PV_NAME: "", PVSCODE: "KABI", PV_REGION: "ใต้", ZoneID: 3}]
    // Get District
    let districtList = JSON.parse(localStorage.getItem('districtlist')) // [{ProvinceID: 0, DistrictID: 0, AM_NAME: ""}] // 
    const [districtList1, setDistrictList1] = useState(districtList)
    const [districtList2, setDistrictList2] = useState(districtList)
    const [districtList3, setDistrictList3] = useState(districtList)
    const [districtList4, setDistrictList4] = useState(districtList)
    const [districtList5, setDistrictList5] = useState(districtList)
    const [districtList6, setDistrictList6] = useState(districtList)
    const [districtList7, setDistrictList7] = useState(districtList)
    const [districtList8, setDistrictList8] = useState(districtList)
    const [districtList9, setDistrictList9] = useState(districtList)
    const [districtList10, setDistrictList10] = useState(districtList)
    const [districtList11, setDistrictList11] = useState(districtList)
    const [districtList12, setDistrictList12] = useState(districtList)
    const [districtList13, setDistrictList13] = useState(districtList)
    const [districtList14, setDistrictList14] = useState(districtList)
    const [districtList15, setDistrictList15] = useState(districtList)
    const [districtList16, setDistrictList16] = useState(districtList)
    // Get SubDistrict
    let subdistrictList = JSON.parse(localStorage.getItem('subdistrictlist')) // [{ProvinceID: 0, DistrictID: 0, SubdistrictID: 0, TB_NAME: "", POSTAL: 0}] // 
    const [subdistrictList1, setSubdistrictList1] = useState(subdistrictList)
    const [subdistrictList2, setSubdistrictList2] = useState(subdistrictList)
    const [subdistrictList3, setSubdistrictList3] = useState(subdistrictList)
    const [subdistrictList4, setSubdistrictList4] = useState(subdistrictList)
    const [subdistrictList5, setSubdistrictList5] = useState(subdistrictList)
    const [subdistrictList6, setSubdistrictList6] = useState(subdistrictList)
    const [subdistrictList7, setSubdistrictList7] = useState(subdistrictList)
    const [subdistrictList8, setSubdistrictList8] = useState(subdistrictList)
    const [subdistrictList9, setSubdistrictList9] = useState(subdistrictList)
    const [subdistrictList10, setSubdistrictList10] = useState(subdistrictList)
    const [subdistrictList11, setSubdistrictList11] = useState(subdistrictList)
    const [subdistrictList12, setSubdistrictList12] = useState(subdistrictList)
    const [subdistrictList13, setSubdistrictList13] = useState(subdistrictList)
    const [subdistrictList14, setSubdistrictList14] = useState(subdistrictList)
    const [subdistrictList15, setSubdistrictList15] = useState(subdistrictList)
    const [subdistrictList16, setSubdistrictList16] = useState(subdistrictList)

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
        Name: '',
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

        FrontName6: '', // "นาย6",
        Name6: '', // "ชื่อผู้ค้ำ 6",
        Sirname6: '', // "นามสกุลผู้ค้ำ 6",
        AGE6: '', // "66",
        IDCard6: '', // "3309900111111",
        HouseNumber6: '', // "บ้านเลขที่6",
        Moo6: '', // "หมู่ 6",
        Road6: '', // "ถนน 6",
        Province6: 0, // "มหาสารคาม6",
        District6: 0, // "เมือง6",
        Subdistrict6: 0, // "ในเมือง6",
        
        FrontName7: '', // "นาย7",
        Name7: '', // "ชื่อผู้ค้ำ 7",
        Sirname7: '', // "นามสกุลผู้ค้ำ 7",
        AGE7: '', // "57",
        IDCard7: '', // "3309900111111",
        HouseNumber7: '', // "บ้านเลขที่7",
        Moo7: '', // "หมู่ 7",
        Road7: '', // "ถนน 7",
        Province7: 0, // "มหาสารคาม7",
        District7: 0, // "เมือง7",
        Subdistrict7: 0, // "ในเมือง7",
        
        FrontName8: '', // "นาย8",
        Name8: '', // "ชื่อผู้ค้ำ 8",
        Sirname8: '', // "นามสกุลผู้ค้ำ 8",
        AGE8: '', // "58",
        IDCard8: '', // "3309900111111",
        HouseNumber8: '', // "บ้านเลขที่8",
        Moo8: '', // "หมู่ 8",
        Road8: '', // "ถนน 8",
        Province8: 0, // "มหาสารคาม8",
        District8: 0, // "เมือง8",
        Subdistrict8: 0, // "ในเมือง8",
        
        FrontName9: '', // "นาย9",
        Name9: '', // "ชื่อผู้ค้ำ 9",
        Sirname9: '', // "นามสกุลผู้ค้ำ 9",
        AGE9: '', // "59",
        IDCard9: '', // "3309900111111",
        HouseNumber9: '', // "บ้านเลขที่9",
        Moo9: '', // "หมู่ 9",
        Road9: '', // "ถนน 9",
        Province9: 0, // "มหาสารคาม9",
        District9: 0, // "เมือง9",
        Subdistrict9: 0, // "ในเมือง9",
        
        FrontName10: '', // "นาย10",
        Name10: '', // "ชื่อผู้ค้ำ 10",
        Sirname10: '', // "นามสกุลผู้ค้ำ 10",
        AGE10: '', // "510",
        IDCard10: '', // "33099001111110",
        HouseNumber10: '', // "บ้านเลขที่10",
        Moo10: '', // "หมู่ 10",
        Road10: '', // "ถนน 10",
        Province10: 0, // "มหาสารคาม10",
        District10: 0, // "เมือง10",
        Subdistrict10: 0, // "ในเมือง10",
        
        FrontName11: '', // "นาย11",
        Name11: '', // "ชื่อผู้ค้ำ 11",
        Sirname11: '', // "นามสกุลผู้ค้ำ 11",
        AGE11: '', // "511",
        IDCard11: '', // "3309900111111",
        HouseNumber11: '', // "บ้านเลขที่11",
        Moo11: '', // "หมู่ 11",
        Road11: '', // "ถนน 11",
        Province11: 0, // "มหาสารคาม11",
        District11: 0, // "เมือง11",
        Subdistrict11: 0, // "ในเมือง11",
        
        FrontName12: '', // "นาย12",
        Name12: '', // "ชื่อผู้ค้ำ 12",
        Sirname12: '', // "นามสกุลผู้ค้ำ 12",
        AGE12: '', // "55",
        IDCard12: '', // "3309900111111",
        HouseNumber12: '', // "บ้านเลขที่12",
        Moo12: '', // "หมู่ 12",
        Road12: '', // "ถนน 12",
        Province12: 0, // "มหาสารคาม12",
        District12: 0, // "เมือง12",
        Subdistrict12: 0, // "ในเมือง12",
        
        FrontName13: '', // "นาย13",
        Name13: '', // "ชื่อผู้ค้ำ 13",
        Sirname13: '', // "นามสกุลผู้ค้ำ 13",
        AGE13: '', // "513",
        IDCard13: '', // "3309900111111",
        HouseNumber13: '', // "บ้านเลขที่13",
        Moo13: '', // "หมู่ 13",
        Road13: '', // "ถนน 13",
        Province13: 0, // "มหาสารคาม13",
        District13: 0, // "เมือง13",
        Subdistrict13: 0, // "ในเมือง13",
        
        FrontName14: '', // "นาย14",
        Name14: '', // "ชื่อผู้ค้ำ 14",
        Sirname14: '', // "นามสกุลผู้ค้ำ 14",
        AGE14: '', // "514",
        IDCard14: '', // "3309900111111",
        HouseNumber14: '', // "บ้านเลขที่14",
        Moo14: '', // "หมู่ 14",
        Road14: '', // "ถนน 14",
        Province14: 0, // "มหาสารคาม14",
        District14: 0, // "เมือง14",
        Subdistrict14: 0, // "ในเมือง14",
        
        FrontName15: '', // "นาย15",
        Name15: '', // "ชื่อผู้ค้ำ 15",
        Sirname15: '', // "นามสกุลผู้ค้ำ 15",
        AGE15: '', // "515",
        IDCard15: '', // "3309900111111",
        HouseNumber15: '', // "บ้านเลขที่15",
        Moo15: '', // "หมู่ 15",
        Road15: '', // "ถนน 15",
        Province15: 0, // "มหาสารคาม15",
        District15: 0, // "เมือง15",
        Subdistrict15: 0, // "ในเมือง15",
        
        FrontName16: '', // "นาย16",
        Name16: '', // "ชื่อผู้ค้ำ 16",
        Sirname16: '', // "นามสกุลผู้ค้ำ 16",
        AGE16: '', // "516",
        IDCard16: '', // "3309900111111",
        HouseNumber16: '', // "บ้านเลขที่16",
        Moo16: '', // "หมู่ 16",
        Road16: '', // "ถนน 16",
        Province16: 0, // "มหาสารคาม16",
        District16: 0, // "เมือง16",
        Subdistrict16: 0, // "ในเมือง16",

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

    const [supporterView, setSupporterView] = useState({
        supporter1: false,
        supporter2: false,
        supporter3: false,
        supporter4: false,
        supporter5: false,
        supporter6: false,
        supporter7: false,
        supporter8: false,
        supporter9: false,
        supporter10: false,
        supporter11: false,
        supporter12: false,
        supporter13: false,
        supporter14: false,
        supporter15: false,
        supporter16: false,
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
                                    ...inputData,
                                    FrontName1: data.data[0].FrontName === null ? '' : data.data[0].FrontName, // "นาย16",
                                    Name1: data.data[0].Name === null ? '' : data.data[0].Name, // "ชื่อผู้ค้ำ 16",
                                    Sirname1: data.data[0].Sirname === null ? '' : data.data[0].Sirname, // "นามสกุลผู้ค้ำ 16",
                                    AGE1: data.data[0].AGE === null ? '' : data.data[0].AGE, // "516",
                                    IDCard1: data.data[0].IDCard === null ? '' : data.data[0].IDCard, // "3309900111111",
                                    HouseNumber1: data.data[0].IDCARD_AddNo === null ? '' : data.data[0].IDCARD_AddNo, // "บ้านเลขที่16",
                                    Moo1: data.data[0].IDCARD_AddMoo === null ? '' : data.data[0].IDCARD_AddMoo, // "หมู่ 16",
                                    Road1: data.data[0].IDCARD_AddrSoiRoad === null ? '' : data.data[0].IDCARD_AddrSoiRoad, // "ถนน 16",
                                    Province1: data.data[0].IDCARD_AddrProvinceID === null ? 0 : data.data[0].IDCARD_AddrProvinceID, // "มหาสารคาม16",
                                    District1: data.data[0].IDCARD_AddrDistrictID === null ? 0 : data.data[0].IDCARD_AddrDistrictID, // "เมือง16",
                                    Subdistrict1: data.data[0].IDCARD_AddrSubdistrictID === null ? 0 : data.data[0].IDCARD_AddrSubdistrictID, // "ในเมือง16",
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
            LoanID: loanID,
        })

        // Add new guaranteebook A
        if(gbookID === null) {
            let dataView = {
                LoanID: loanID,
                GuaranteeBookTypeID: "1"
            }
                        
            axios.post(
                `${server_hostname}/admin/api/view_GuaranteeApplicant`, 
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
                        let result = data.data[0]
                        console.log('view_GuaranteeApplicant',result)
                        setFormField(true)
                        
                        if(result.Supporter_IDCard1 !== null || result.Supporter_IDCard1 !== '') {
                            setSupporterView({
                                ...supporterView,
                                supporter1: true
                            })
                            getDataSupporter(result.Supporter_IDCard1, 1)
                        }
                    }
            })

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
                        let result = data.data[0]
                        console.log('view_GuaranteeBook',result)
                        setFormField(true)
                        setInputData({
                            ...inputData,
                            LoanID: loanID,
                            PlaceCreate: result.PlaceCreate || '',
                            ContactDate: result.ContactDate === 'Invalid date' || result.ContactDate === null ? null : moment(result.ContactDate).format('YYYY-MM-DD'),

                            FrontName1: result.FrontName1 || '', // "นาย1",
                            Name1: result.Name1 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname1: result.Sirname1 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE1: result.AGE1 || '', // "11",
                            IDCard1: result.IDCard1 || '', // "3309900111111",
                            HouseNumber1: result.HouseNumber1 || '', // "บ้านเลขที่1",
                            Moo1: result.Moo1 || '', // "หมู่ 1",
                            Road1: result.Road1 || '', // "ถนน 1",
                            Province1: result.Province1 || 0, // "มหาสารคาม1",
                            District1: result.District1 || 0, // "เมือง1",
                            Subdistrict1: result.Subdistrict1 || 0, // "ในเมือง1",

                            
                            FrontName2: result.FrontName2 || '', // "นาย1",
                            Name2: result.Name2 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname2: result.Sirname2 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE2: result.AGE2 || '', // "11",
                            IDCard2: result.IDCard2 || '', // "3309900111111",
                            HouseNumber2: result.HouseNumber2 || '', // "บ้านเลขที่1",
                            Moo2: result.Moo2 || '', // "หมู่ 1",
                            Road2: result.Road2 || '', // "ถนน 1",
                            Province2: result.Province2 || 0, // "มหาสารคาม1",
                            District2: result.District2 || 0, // "เมือง1",
                            Subdistrict2: result.Subdistrict2 || 0, // "ในเมือง1",


                            FrontName3: result.FrontName3 || '', // "นาย1",
                            Name3: result.Name3 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname3: result.Sirname3 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE3: result.AGE3 || '', // "11",
                            IDCard3: result.IDCard3 || '', // "3309900111111",
                            HouseNumber3: result.HouseNumber3 || '', // "บ้านเลขที่1",
                            Moo3: result.Moo3 || '', // "หมู่ 1",
                            Road3: result.Road3 || '', // "ถนน 1",
                            Province3: result.Province3 || 0, // "มหาสารคาม1",
                            District3: result.District3 || 0, // "เมือง1",
                            Subdistrict3: result.Subdistrict3 || 0, // "ในเมือง1",

                            FrontName4: result.FrontName4 || '', // "นาย1",
                            Name4: result.Name4 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname4: result.Sirname4 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE4: result.AGE4 || '', // "11",
                            IDCard4: result.IDCard4 || '', // "3309900111111",
                            HouseNumber4: result.HouseNumber4 || '', // "บ้านเลขที่1",
                            Moo4: result.Moo4 || '', // "หมู่ 1",
                            Road4: result.Road4 || '', // "ถนน 1",
                            Province4: result.Province4 || 0, // "มหาสารคาม1",
                            District4: result.District4 || 0, // "เมือง1",
                            Subdistrict4: result.Subdistrict4 || 0, // "ในเมือง1",

                            FrontName5: result.FrontName5 || '', // "นาย1",
                            Name5: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname5: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE5: result.AGE5 || '', // "11",
                            IDCard5: result.IDCard5 || '', // "3309900111111",
                            HouseNumber5: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo5: result.Moo5 || '', // "หมู่ 1",
                            Road5: result.Road5 || '', // "ถนน 1",
                            Province5: result.Province5 || 0, // "มหาสารคาม1",
                            District5: result.District5 || 0, // "เมือง1",
                            Subdistrict5: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName6: result.FrontName5 || '', // "นาย1",
                            Name6: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname6: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE6: result.AGE5 || '', // "11",
                            IDCard6: result.IDCard5 || '', // "3309900111111",
                            HouseNumber6: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo6: result.Moo5 || '', // "หมู่ 1",
                            Road6: result.Road5 || '', // "ถนน 1",
                            Province6: result.Province5 || 0, // "มหาสารคาม1",
                            District6: result.District5 || 0, // "เมือง1",
                            Subdistrict6: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName7: result.FrontName5 || '', // "นาย1",
                            Name7: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname7: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE7: result.AGE5 || '', // "11",
                            IDCard7: result.IDCard5 || '', // "3309900111111",
                            HouseNumber7: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo7: result.Moo5 || '', // "หมู่ 1",
                            Road7: result.Road5 || '', // "ถนน 1",
                            Province7: result.Province5 || 0, // "มหาสารคาม1",
                            District7: result.District5 || 0, // "เมือง1",
                            Subdistrict7: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName8: result.FrontName5 || '', // "นาย1",
                            Name8: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname8: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE8: result.AGE5 || '', // "11",
                            IDCard8: result.IDCard5 || '', // "3309900111111",
                            HouseNumber8: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo8: result.Moo5 || '', // "หมู่ 1",
                            Road8: result.Road5 || '', // "ถนน 1",
                            Province8: result.Province5 || 0, // "มหาสารคาม1",
                            District8: result.District5 || 0, // "เมือง1",
                            Subdistrict8: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName9: result.FrontName5 || '', // "นาย1",
                            Name9: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname9: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE9: result.AGE5 || '', // "11",
                            IDCard9: result.IDCard5 || '', // "3309900111111",
                            HouseNumber9: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo9: result.Moo5 || '', // "หมู่ 1",
                            Road9: result.Road5 || '', // "ถนน 1",
                            Province9: result.Province5 || 0, // "มหาสารคาม1",
                            District9: result.District5 || 0, // "เมือง1",
                            Subdistrict9: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName10: result.FrontName5 || '', // "นาย1",
                            Name10: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname10: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE10: result.AGE5 || '', // "11",
                            IDCard10: result.IDCard5 || '', // "3309900111111",
                            HouseNumber10: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo10: result.Moo5 || '', // "หมู่ 1",
                            Road10: result.Road5 || '', // "ถนน 1",
                            Province10: result.Province5 || 0, // "มหาสารคาม1",
                            District10: result.District5 || 0, // "เมือง1",
                            Subdistrict10: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName11: result.FrontName5 || '', // "นาย1",
                            Name11: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname11: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE11: result.AGE5 || '', // "11",
                            IDCard11: result.IDCard5 || '', // "3309900111111",
                            HouseNumber11: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo11: result.Moo5 || '', // "หมู่ 1",
                            Road11: result.Road5 || '', // "ถนน 1",
                            Province11: result.Province5 || 0, // "มหาสารคาม1",
                            District11: result.District5 || 0, // "เมือง1",
                            Subdistrict11: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName12: result.FrontName5 || '', // "นาย1",
                            Name12: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname12: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE12: result.AGE5 || '', // "11",
                            IDCard12: result.IDCard5 || '', // "3309900111111",
                            HouseNumber12: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo12: result.Moo5 || '', // "หมู่ 1",
                            Road12: result.Road5 || '', // "ถนน 1",
                            Province12: result.Province5 || 0, // "มหาสารคาม1",
                            District12: result.District5 || 0, // "เมือง1",
                            Subdistrict12: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName13: result.FrontName5 || '', // "นาย1",
                            Name13: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname13: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE13: result.AGE5 || '', // "11",
                            IDCard13: result.IDCard5 || '', // "3309900111111",
                            HouseNumber13: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo13: result.Moo5 || '', // "หมู่ 1",
                            Road13: result.Road5 || '', // "ถนน 1",
                            Province13: result.Province5 || 0, // "มหาสารคาม1",
                            District13: result.District5 || 0, // "เมือง1",
                            Subdistrict13: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName14: result.FrontName5 || '', // "นาย1",
                            Name14: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname14: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE14: result.AGE5 || '', // "11",
                            IDCard14: result.IDCard5 || '', // "3309900111111",
                            HouseNumber14: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo14: result.Moo5 || '', // "หมู่ 1",
                            Road14: result.Road5 || '', // "ถนน 1",
                            Province14: result.Province5 || 0, // "มหาสารคาม1",
                            District14: result.District5 || 0, // "เมือง1",
                            Subdistrict14: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName15: result.FrontName5 || '', // "นาย1",
                            Name15: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname15: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE15: result.AGE5 || '', // "11",
                            IDCard15: result.IDCard5 || '', // "3309900111111",
                            HouseNumber15: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo15: result.Moo5 || '', // "หมู่ 1",
                            Road15: result.Road5 || '', // "ถนน 1",
                            Province15: result.Province5 || 0, // "มหาสารคาม1",
                            District15: result.District5 || 0, // "เมือง1",
                            Subdistrict15: result.Subdistrict5 || 0, // "ในเมือง1",

                            FrontName16: result.FrontName5 || '', // "นาย1",
                            Name16: result.Name5 || '', // "ชื่อผู้ค้ำ 1",
                            Sirname16: result.Sirname5 || '', // "นามสกุลผู้ค้ำ 1",
                            AGE16: result.AGE5 || '', // "11",
                            IDCard16: result.IDCard5 || '', // "3309900111111",
                            HouseNumber16: result.HouseNumber5 || '', // "บ้านเลขที่1",
                            Moo16: result.Moo5 || '', // "หมู่ 1",
                            Road16: result.Road5 || '', // "ถนน 1",
                            Province16: result.Province5 || 0, // "มหาสารคาม1",
                            District16: result.District5 || 0, // "เมือง1",
                            Subdistrict16: result.Subdistrict5 || 0, // "ในเมือง1",

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
                
            case 'Province6':
                setDistrictList6(districtArr)
                break;

            case 'Province7':
                setDistrictList7(districtArr)
                break;
            
            case 'Province8':
                setDistrictList8(districtArr)
                break;

            case 'Province9':
                setDistrictList9(districtArr)
                break;
                
            case 'Province10':
                setDistrictList10(districtArr)
                break;
                
            case 'Province11':
                setDistrictList11(districtArr)
                break;

            case 'Province12':
                setDistrictList12(districtArr)
                break;
            
            case 'Province13':
                setDistrictList13(districtArr)
                break;

            case 'Province14':
                setDistrictList14(districtArr)
                break;
                
            case 'Province15':
                setDistrictList15(districtArr)
                break;
                
            case 'Province16':
                setDistrictList16(districtArr)
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

            case 'District6':
                setSubdistrictList6([])
                break;
            
            case 'District7':
                setSubdistrictList7([])
                break;

            case 'District8':
                setSubdistrictList8([])
                break;
                
            case 'District9':
                setSubdistrictList9([])
                break;
                
            case 'District10':
                setSubdistrictList10([])
                break;

            case 'District11':
                setSubdistrictList11([])
                break;
            
            case 'District12':
                setSubdistrictList12([])
                break;

            case 'District13':
                setSubdistrictList13([])
                break;
                
            case 'District14':
                setSubdistrictList14([])
                break;
                
            case 'District15':
                setSubdistrictList15([])
                break;

            case 'District16':
                setSubdistrictList16([])
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
            
            case 'District6':
                setSubdistrictList6(subdistrictArr)
                break;
            
            case 'District7':
                setSubdistrictList7(subdistrictArr)
                break;

            case 'District8':
                setSubdistrictList8(subdistrictArr)
                break;
                
            case 'District9':
                setSubdistrictList9(subdistrictArr)
                break;
                
            case 'District10':
                setSubdistrictList10(subdistrictArr)
                break;
 
            case 'District11':
                setSubdistrictList11(subdistrictArr)
                break;
            
            case 'District12':
                setSubdistrictList12(subdistrictArr)
                break;
            
            case 'District13':
                setSubdistrictList13(subdistrictArr)
                break;

            case 'District14':
                setSubdistrictList14(subdistrictArr)
                break;
                
            case 'District15':
                setSubdistrictList15(subdistrictArr)
                break;
                
            case 'District16':
                setSubdistrictList16(subdistrictArr)
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
        formData.append('ContactDate', inputData.ContactDate === 'Invalid date' || inputData.ContactDate === null ? null : moment(inputData.ContactDate).format('YYYY-MM-DD'))
    
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
                                                    <Grid item xs={12} md={12} id="person-1" className={`personalForm `+ (supporterView.supporter1 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="1. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName1" value={inputData.FrontName1} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number1-idc" name="IDCard1" value={inputData.IDCard1} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province1" value={inputData.Province1} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList1} name="District1"  value={inputData.District1} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList1} name="Subdistrict1"  value={inputData.Subdistrict1} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Guaranteebook 2------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-2" className={`personalForm `+ (supporterView.supporter2 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="2. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName2" value={inputData.FrontName2} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number2-idc" name="IDCard2" value={inputData.IDCard2} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province2" value={inputData.Province2} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList2} name="District2"  value={inputData.District2} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList2} name="Subdistrict2"  value={inputData.Subdistrict2} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 3------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-3" className={`personalForm `+ (supporterView.supporter3 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="3. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName3" value={inputData.FrontName3} onChange={handleInputData} />
                                                            </Grid>
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number3-idc" name="IDCard3" value={inputData.IDCard3} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province3" value={inputData.Province3} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList3} name="District3"  value={inputData.District3} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList3} name="Subdistrict3"  value={inputData.Subdistrict3} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 4------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-4" className={`personalForm `+ (supporterView.supporter4 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="4. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName4" value={inputData.FrontName4} onChange={handleInputData} />
                                                            </Grid>
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number4-idc" name="IDCard4" value={inputData.IDCard4} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province4" value={inputData.Province4} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList4} name="District4"  value={inputData.District4} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList4} name="Subdistrict4"  value={inputData.Subdistrict4} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 5------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-5" className={`personalForm `+ (supporterView.supporter5 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="5. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName5" value={inputData.FrontName5} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number5-idc" name="IDCard5" value={inputData.IDCard5} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province5" value={inputData.Province5} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList5} name="District5"  value={inputData.District5} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList5} name="Subdistrict5"  value={inputData.Subdistrict5} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 6------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-6" className={`personalForm `+ (supporterView.supporter6 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="6. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName6" value={inputData.FrontName6} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number6-idc" name="IDCard6" value={inputData.IDCard6} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province6" value={inputData.Province6} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList6} name="District6"  value={inputData.District6} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList6} name="Subdistrict6"  value={inputData.Subdistrict6} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 7------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-7" className={`personalForm `+ (supporterView.supporter7 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="7. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName7" value={inputData.FrontName7} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number7-idc" name="IDCard7" value={inputData.IDCard7} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province7" value={inputData.Province7} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList7} name="District7"  value={inputData.District7} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList7} name="Subdistrict7"  value={inputData.Subdistrict7} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 8------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-8" className={`personalForm `+ (supporterView.supporter8 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="8. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName8" value={inputData.FrontName8} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number8-idc" name="IDCard8" value={inputData.IDCard8} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province8" value={inputData.Province8} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList8} name="District8"  value={inputData.District8} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList8} name="Subdistrict8"  value={inputData.Subdistrict8} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 9------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-9" className={`personalForm `+ (supporterView.supporter9 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="9. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName9" value={inputData.FrontName9} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number9-idc" name="IDCard9" value={inputData.IDCard9} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province9" value={inputData.Province9} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList9} name="District9"  value={inputData.District9} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList9} name="Subdistrict9"  value={inputData.Subdistrict9} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 10------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-10" className={`personalForm `+ (supporterView.supporter10 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="10. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName10" value={inputData.FrontName10} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number10-idc" name="IDCard10" value={inputData.IDCard10} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province10" value={inputData.Province10} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList10} name="District10"  value={inputData.District10} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList10} name="Subdistrict10"  value={inputData.Subdistrict10} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 11------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-11" className={`personalForm `+ (supporterView.supporter11 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="11. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName11" value={inputData.FrontName11} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number11-idc" name="IDCard11" value={inputData.IDCard11} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province11" value={inputData.Province11} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList11} name="District11"  value={inputData.District11} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList11} name="Subdistrict11"  value={inputData.Subdistrict11} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Guaranteebook 12------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-12" className={`personalForm `+ (supporterView.supporter12 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="12. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName12" value={inputData.FrontName12} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number12-idc" name="IDCard12" value={inputData.IDCard12} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province12" value={inputData.Province12} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList12} name="District12"  value={inputData.District12} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList12} name="Subdistrict12"  value={inputData.Subdistrict12} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 13------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-13" className={`personalForm `+ (supporterView.supporter13 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="13. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName13" value={inputData.FrontName13} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number13-idc" name="IDCard13" value={inputData.IDCard13} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province13" value={inputData.Province13} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList13} name="District13"  value={inputData.District13} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList13} name="Subdistrict13"  value={inputData.Subdistrict13} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    
                                                    {/* Guaranteebook 14-------------------------------------------*/}
                                                    <Grid item xs={12} md={12} id="person-14" className={`personalForm `+ (supporterView.supporter14 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="14. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName14" value={inputData.FrontName14} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number14-idc" name="IDCard14" value={inputData.IDCard14} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province14" value={inputData.Province14} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList14} name="District14"  value={inputData.District14} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList14} name="Subdistrict14"  value={inputData.Subdistrict14} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 15------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-15" className={`personalForm `+ (supporterView.supporter15 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="15. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName15" value={inputData.FrontName15} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number15-idc" name="IDCard15" value={inputData.IDCard15} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province15" value={inputData.Province15} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList15} name="District15"  value={inputData.District15} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList15} name="Subdistrict15"  value={inputData.Subdistrict15} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 16------------------------------------------- */}
                                                    <Grid item xs={12} md={12} id="person-16" className={`personalForm `+ (supporterView.supporter16 ?'show' : 'hide')}>
                                                        <Divider />
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12} md={12} className="mg-t-20">
                                                                <MuiLabelHeader label="16. ข้าพเจ้า" />
                                                            </Grid>
                                                            <Grid item xs={12} md={2}>
                                                                <MuiSelect label="คำนำหน้า" inputdisabled="input-disabled" listsValue={['นาย','นาง','นางสาว']} lists={['นาย', 'นาง', 'นางสาว']} name="FrontName16" value={inputData.FrontName16} onChange={handleInputData} />
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
                                                                <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number16-idc" name="IDCard16" value={inputData.IDCard16} onChange={handleInputData}   />
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
                                                                <MuiSelectProvince label="จังหวัด" inputdisabled="input-disabled" lists={provinceList}  name="Province16" value={inputData.Province16} onChange={handleInputData} />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectDistrict label="เขต / อำเภอ" inputdisabled="input-disabled" lists={districtList16} name="District16"  value={inputData.District16} onChange={handleInputData}  />
                                                            </Grid>
                                                            <Grid item xs={12} md={4}>
                                                                <MuiSelectSubDistrict label="แขวง / ตำบล" inputdisabled="input-disabled" lists={subdistrictList16} name="Subdistrict16"  value={inputData.Subdistrict16} onChange={handleInputData} />
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    {/* Guaranteebook 0-------------------------------------------
                                                    <div container spacing={2} id="person-0" className={`personalForm `+ (supporterView.supporter ?'show' : 'hide')}>
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
                                                            <MuiTextfield label="เลขบัตรประชาชน" inputdisabled="input-disabled" id="number0-idc" name="IDCard0" value={inputData.IDCard0} onChange={handleInputData}   />
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
                                                    <MuiLabelHeader label="ซึ่งต่อไปในสัญญานี้รวมเรียกว่า “ผู้ค้ำประกัน” ตกลงทําหนังสือสัญญาค้ำประกันไว้ต่อสํานักงานการ ปฏิรูปที่ดินเพื่อเกษตรกรรม ซึ่งต่อไปในสัญญานี้เรียกว่า “ส.ป.ก.” ดังต่อไปนี้" />
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
                                                    <MuiTextfield label="1. ชื่อพยาน" name="WitnessName1" value={inputData.WitnessName1} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr1" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard1" value={inputData.WitnessIDCard1} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake1" value={'กรมการปกครอง'} onChange={handleInputData}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="2. ชื่อพยาน" name="WitnessName2" value={inputData.WitnessName2} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr2" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard2" value={inputData.WitnessIDCard2} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake2" value={'กรมการปกครอง'} onChange={handleInputData}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="3. ชื่อพยาน" name="WitnessName3" value={inputData.WitnessName3} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr3" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard3" value={inputData.WitnessIDCard3} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake3" value={'กรมการปกครอง'} onChange={handleInputData}/>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="4. ชื่อพยาน" name="WitnessName4" value={inputData.WitnessName4} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="ที่อยู่" inputdisabled="input-disabled" name="WitnessAddr4" value={`ส.ป.ก.จังหวัด${provincename}`} onChange={handleInputData}/>
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <MuiTextfield label="เลขประจำตัวประชาชน" name="WitnessIDCard4" value={inputData.WitnessIDCard4} onChange={handleInputData} />
                                                </Grid>
                                                <Grid item xs={12} md={7}>
                                                    <MuiTextfield label="สถานที่ออกบัตร" inputdisabled="input-disabled" name="WitnessIDCardMake4" value={'กรมการปกครอง'} onChange={handleInputData}/>
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
