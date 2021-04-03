import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import SearchMember from './SearchMember';
import ApplyLoan from './ApplyLoan';
import AllContact from './AllContact';
import Report from './Report';
import ManageInfo from './ManageInfo';
import CloseContact from './CloseContact';
import DebtInfo from './DebtInfo'

function Container() {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/searchmember" component={SearchMember} />
                    <Route path="/applyloan" component={ApplyLoan} />
                    <Route path="/allcontact" component={AllContact} />
                    <Route path="/report" component={Report} />
                    <Route path="/manageinfo" component={ManageInfo} />
                    <Route path="/closecontact" component={CloseContact} />
                    <Route path="/debtinfo" component={DebtInfo} />
                </Switch>
            </Router>
        </div>
    )
}

export default Container;
