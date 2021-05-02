import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import Home from './Home';
import ListFarmerPayLoan from './report/ListFarmerPayLoan'
import AddMember from './manageinfo/AddMemberPage';
import SearchMember from './manageinfo/SearchMemberPage';
import LoanRequestProject from './manageinfo/LoanRequestProject';

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    
                    {/* Manage Info Page */}
                    <Route path="/searchmember" component={SearchMember} />
                    <Route path="/report/listfarmerpayloan" component={ListFarmerPayLoan} />
                    <Route path="/addmember" component={AddMember} />
                    <Route path="/loanrequestproject" component={LoanRequestProject} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
