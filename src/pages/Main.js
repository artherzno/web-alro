import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
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
import SearchMember from './manageinfo/SearchMemberPage';
import LoanRequestProject from './manageinfo/LoanRequestProject';
import LoanAddProject from './manageinfo/LoanAddProject';
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

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    
                    {/* Loan Contact Page */}
                    <Route path="/loanrequest/loanrequestcontactsearch" component={LoanRequestContactSearch} />
                    <Route path="/loanrequest/loanrequestcontact" component={LoanRequestContact} />
                    <Route path="/loanrequest/loanrequestprint" component={LoanRequestPrint} />
                    <Route path="/loanrequest/loanrecivceprint" component={LoanRecivcePrint} />
                    <Route path="/loanrequest/recordcloseoldcontact" component={RecordCloseOldContact} />
                    <Route path="/loanrequest/editcontract" component={EditContract} />
                    <Route path="/loanrequest/allcontractsearch" component={AllContractSearch} />
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
                    <Route path="/manageinfo/loanrequestproject" component={LoanRequestProject} />
                    <Route path="/manageinfo/loanaddproject" component={LoanAddProject} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
