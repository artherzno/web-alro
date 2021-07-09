import React, {useEffect, useContext, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom";

import LoginPage from './LoginPage';
import Home from './Home';
import ListFarmerPayLoan from './report/ListFarmerPayLoan'
import ListNewFarmerPayLoan from './report/ListNewFarmerPayLoan'
import PayLoan from './report/PayLoan'
import RequestLoan from './report/RequestLoan'
import ConvertLoan from './report/ConvertLoan'
import ListSign from './report/ListSign'
import LawSuit from './report/LawSuit'
import ModifyLoan from './report/ModifyLoan'
import Billed from './report/Billed'
import AddMember from './manageinfo/AddMemberPage';
import EditMember from './manageinfo/EditMemberPage';
import SearchMember from './manageinfo/SearchMemberPage';
import LoanRequestProject from './manageinfo/LoanRequestProject';
import LoanAddProject from './manageinfo/LoanAddProject';
import ManageUser from './manageinfo/ManageUser';
import ManagePermission from './manageinfo/ManagePermission';
import AddUser from './manageinfo/AddUser';
import AddMenu from './manageinfo/AddMenu';
import AddRole from './manageinfo/AddRole';
import LoanRequestContactSearch from './loanrequest/LoanRequestContactSearch';
import LoanRequestContact from './loanrequest/LoanRequestContact';
import LoanRequestPrint from './loanrequest/LoanRequestPrint';
import LoanRecivcePrint from './loanrequest/LoanRecivcePrint';
import RecordCloseOldContact from './loanrequest/RecordCloseOldContact'
import EditContract from './loanrequest/EditContract'
import AllContractSearch from './loanrequest/AllContractSearch'
import RecordBillAlro from './loanserviceinfo/RecordBillAlro'
import RecordBillClose from './loanserviceinfo/RecordBillClose'
import EditBill from './loanserviceinfo/EditBill'
import UploadInfoBaac from './loanserviceinfo/UploadInfoBaac'
import PrintBillBank from './loanserviceinfo/PrintBillBank'
import PrintInvoice from './debtinfo/PrintInvoice';
import NoticeInvoice from './debtinfo/NoticeInvoice';
import RecordInstallmentPayment from './debtinfo/RecordInstallmentPayment';
import RecordRequestPayment from './debtinfo/RecordRequestPayment';
import DebtCondition from './debtinfo/DebtCondition';
import FaultCondition from './debtinfo/FaultCondition';
import RecordCourtContract from './loanrequest/RecordCourtContract';
import RecordDebtContract from './loanrequest/RecordDebtContract';
import RecordDebtPayment from './loanrequest/RecordDebtPayment';
import PrintContractDebt from './loanrequest/PrintContractDebt';
import EditContractDebt from './loanrequest/EditContractDebt';
import RecordContractDebt from './loanrequest/RecordContractDebt';
import BySign from './check/BySign'
import RealPay from './check/RealPay'

function Main() {
    const history = useHistory();

    useEffect(() => {
        console.warn('hi mainpage')
    }, [])

    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    
                    {/* Loan Request Contact Page */}
                    <Route path="/loanrequest/loanrequestcontactsearch" component={LoanRequestContactSearch} />
                    <Route path="/loanrequest/loanrequestcontact" component={LoanRequestContact} />
                    <Route path="/loanrequest/loanrequestprint" component={LoanRequestPrint} />
                    <Route path="/loanrequest/loanrecivceprint" component={LoanRecivcePrint} />
                    <Route path="/loanrequest/recordcloseoldcontact" component={RecordCloseOldContact} />
                    <Route path="/loanrequest/editcontract" component={EditContract} />
                    <Route path="/loanrequest/editcontractdebt" component={EditContractDebt} />
                    <Route path="/loanrequest/allcontractsearch" component={AllContractSearch} />
                    <Route path="/loanrequest/recordcontractdebt" component={RecordContractDebt} />
                    <Route path="/loanrequest/recordcourtcontract" component={RecordCourtContract} />
                    <Route path="/loanrequest/recorddebtcontract" component={RecordDebtContract} />
                    <Route path="/loanrequest/recorddebtpayment" component={RecordDebtPayment} />
                    <Route path="/loanrequest/printcontractdebt" component={PrintContractDebt} />
                    {/* Loan Service Info Page */}
                    <Route path="/loanserviceinfo/recordbillalro" component={RecordBillAlro} />
                    <Route path="/loanserviceinfo/recordbillclose" component={RecordBillClose} />
                    <Route path="/loanserviceinfo/editbill" component={EditBill} />
                    <Route path="/loanserviceinfo/uploadinfobaac" component={UploadInfoBaac} />
                    <Route path="/loanserviceinfo/printbillbank" component={PrintBillBank} />
                    {/* Debt Info Page */}
                    <Route path="/debtinfo/printinvoice" component={PrintInvoice} />
                    <Route path="/debtinfo/noticeinvoice" component={NoticeInvoice} />
                    <Route path="/debtinfo/recordinstallmentpayment" component={RecordInstallmentPayment} />
                    <Route path="/debtinfo/recordrequestpayment" component={RecordRequestPayment} />
                    <Route path="/debtinfo/debtcondition" component={DebtCondition} />
                    <Route path="/debtinfo/faultcondition" component={FaultCondition} />
                    {/* Report Page */}
                    <Route path="/report/listfarmerpayloan" component={ListFarmerPayLoan} />
                    <Route path="/report/listnewfarmerpayloan" component={ListNewFarmerPayLoan} />
                    <Route path="/report/payLoan" component={PayLoan} />
                    <Route path="/report/requestloan" component={RequestLoan} />
                    <Route path="/report/listsign" component={ListSign} />
                    <Route path="/report/convertloan" component={ConvertLoan} />
                    <Route path="/report/lawsuit" component={LawSuit} />
                    <Route path="/report/modify" component={ModifyLoan} />
                    <Route path="/report/billed" component={Billed} />
                    {/* Manage Info Page */}
                    <Route path="/manageinfo/searchmember" component={SearchMember} />
                    <Route path="/manageinfo/addmember" component={AddMember} />
                    <Route path="/manageinfo/editmember" component={EditMember} />
                    <Route path="/manageinfo/loanrequestproject" component={LoanRequestProject} />
                    <Route path="/manageinfo/loanaddproject" component={LoanAddProject} />
                    <Route path="/manageinfo/manageuser" component={ManageUser} />
                    <Route path="/manageinfo/adduser" component={AddUser} />
                    <Route path="/manageinfo/addmenu" component={AddMenu} />
                    <Route path="/manageinfo/addrole" component={AddRole} />
                    <Route path="/manageinfo/managepermission" component={ManagePermission} />
                    {/* Manage Check Page */}
                    <Route path="/check/bysign" component={BySign} />
                    <Route path="/check/realpay" component={RealPay} />

                </Switch>
            </Router>
        </div>
    )
}

export default Main;
