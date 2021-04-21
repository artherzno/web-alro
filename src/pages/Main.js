import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import Home from './Home';
import SearchMember from './SearchMemberPage';

function Main() {
    return (
        <div className="main">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/home" component={Home} />
                    <Route path="/searchmember" component={SearchMember} />
                </Switch>
            </Router>
        </div>
    )
}

export default Main;
