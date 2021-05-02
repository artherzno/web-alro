import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import Home from './Home';
import ListFarmerPayLoan from './ListFarmerPayLoan'
import AddMember from './manageinfo/AddMemberPage';
import SearchMember from './manageinfo/SearchMemberPage';

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    
                    {/* Manage Info Page */}
                    <Route path="/addmember" component={AddMember} />
                    <Route path="/searchmember" component={SearchMember} />
                    <Route path="/listfarmerpayloan" component={ListFarmerPayLoan} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
