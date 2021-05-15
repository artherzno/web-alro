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

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    
                    {/* Loan Contact Page */}
                    <Route path="/loanrequestcontactsearch" component={LoanRequestContactSearch} />
                    <Route path="/loanrequestcontact" component={LoanRequestContact} />
                    <Route path="/loanrequestprint" component={LoanRequestPrint} />
                    <Route path="/loanrecivceprint" component={LoanRecivcePrint} />
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
                    <Route path="/searchmember" component={SearchMember} />
                    <Route path="/addmember" component={AddMember} />
                    <Route path="/loanrequestproject" component={LoanRequestProject} />
                    <Route path="/loanaddproject" component={LoanAddProject} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
