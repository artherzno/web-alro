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

function GuaranteeBookB() {
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
        LoanNumber:"",
        Rentno: "",
        Fullname: "",
        Date: ""
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

    function createData(LoanNumber, LoanReceiptDate, ProjectName,ProjectplanYear ) {
        return {LoanNumber, LoanReceiptDate, ProjectName,ProjectplanYear }
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
                                            <MuiTextfield label="ค้นหาชื่อ-นามสกุล" name="Fullname" value={inputDataSearch.Fullname} onChange={handleInputDataSearch} />
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

export default GuaranteeBookB
