import React from 'react';

import Header from '../components/Header';
import Nav from '../components/Nav';

function ManageInfo() {
    return (
        <div>
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
            Manage Info
        </div>
    )
}

export default ManageInfo;
