import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginPage from './LoginPage';
import SearchMemberPage from './SearchMemberPage';

function Container() {
    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/search" component={SearchMemberPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default Container;
