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
import AddFarmer from './manageinfo/AddFarmer';
import EditFarmer from './manageinfo/EditFarmer';
import SearchMember from './manageinfo/SearchMemberPage';
import LoanRequestProject from './manageinfo/LoanRequestProject';
import LoanAddProject from './manageinfo/LoanAddProject';
import LoanEditProject from './manageinfo/LoanEditProject';
import ManageProjectBudget from './manageinfo/ManageProjectBudget';
import ManageUser from './manageinfo/ManageUser';
import ManagePermission from './manageinfo/ManagePermission';
import AddUser from './manageinfo/AddUser';
import EditUser from './manageinfo/EditUser';
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
import CancelBill from './loanserviceinfo/CancelBill'
import UploadInfoBaac from './loanserviceinfo/UploadInfoBaac'
import PrintBillBank from './loanserviceinfo/PrintBillBank'
import PrintInvoice from './debtinfo/PrintInvoice';
import NoticeInvoice from './debtinfo/NoticeInvoice';
import RecordInstallmentPayment from './debtinfo/RecordInstallmentPayment';
import RecordRequestPayment from './debtinfo/RecordRequestPayment';
import DebtCondition from './debtinfo/DebtCondition';
import FaultCondition from './debtinfo/FaultCondition';
import DebtReminder from './debtinfo/DebtReminder';
import AdvanceInvoice from './debtinfo/AdvanceInvoice';
import RecordCourtContract from './loanrequest/RecordCourtContract';
import RecordDebtContract from './loanrequest/RecordDebtContract';
import RecordDebtPayment from './loanrequest/RecordDebtPayment';
import PrintContractDebt from './loanrequest/PrintContractDebt';
import EditContractDebt from './loanrequest/EditContractDebt';
import RecordContractDebt from './loanrequest/RecordContractDebt';
import BySign from './check/BySign'
import RealPay from './check/RealPay'
import CheckSign from './check/CheckSign'
import ProcessByPerson from './check/ProcessByPerson'
import ProcessLawPerson from './check/ProcessLawPerson'
import CheckBill from './check/CheckBill'
import Installment from './check/Installment'
import CheckBilled from './check/CheckBilled'
import ConditionInterest from './check/ConditionInterest'
import Payment from './check/Payment'


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
                    <Route path="/loanserviceinfo/cancelbill" component={CancelBill} />
                    <Route path="/loanserviceinfo/uploadinfobaac" component={UploadInfoBaac} />
                    <Route path="/loanserviceinfo/printbillbank" component={PrintBillBank} />
                    {/* Debt Info Page */}
                    <Route path="/debtinfo/printinvoice" component={PrintInvoice} />
                    <Route path="/debtinfo/noticeinvoice" component={NoticeInvoice} />
                    <Route path="/debtinfo/advanceinvoice" component={AdvanceInvoice} />
                    <Route path="/debtinfo/debtreminder" component={DebtReminder} />
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
                    {/* Manage Info Page */}ManageProjectBudget
                    <Route path="/manageinfo/manageprojectbudget" component={ManageProjectBudget} />
                    <Route path="/manageinfo/searchmember" component={SearchMember} />
                    <Route path="/manageinfo/addfarmer" component={AddFarmer} />
                    <Route path="/manageinfo/editfarmer" component={EditFarmer} />
                    <Route path="/manageinfo/loanrequestproject" component={LoanRequestProject} />
                    <Route path="/manageinfo/loanaddproject" component={LoanAddProject} />
                    <Route path="/manageinfo/loanEditproject" component={LoanEditProject} />
                    <Route path="/manageinfo/manageuser" component={ManageUser} />
                    <Route path="/manageinfo/adduser" component={AddUser} />
                    <Route path="/manageinfo/edituser" component={EditUser} />
                    <Route path="/manageinfo/addmenu" component={AddMenu} />
                    <Route path="/manageinfo/addrole" component={AddRole} />
                    <Route path="/manageinfo/managepermission" component={ManagePermission} />
                    {/* Manage Check Page */}
                    <Route path="/check/bysign" component={BySign} />
                    <Route path="/check/realpay" component={RealPay} />
                    <Route path="/check/checksign" component={CheckSign} />
                    <Route path="/check/process-by-person" component={ProcessByPerson} />
                    <Route path="/check/process-law-by-person" component={ProcessLawPerson} />
                    <Route path="/check/check-bill" component={CheckBill} />
                    <Route path="/check/installment" component={Installment} />
                    <Route path="/check/check-billed" component={CheckBilled} />
                    <Route path="/check/condition-interest" component={ConditionInterest} />
                    <Route path="/check/payment" component={Payment} />
                    
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
