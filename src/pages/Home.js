import React from 'react'

import Header from '../components/Header';
import Nav from '../components/Nav';

function Home() {
    return (
        <div className="home">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />
        </div>
    )
}

export default Home
