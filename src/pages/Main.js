import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import Home from './Home';
import SearchMember from './SearchMemberPage';
import ListFarmerPayLoan from './ListFarmerPayLoan'

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/searchmember" component={SearchMember} />
                    <Route path="/listfarmerpayloan" component={ListFarmerPayLoan} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
