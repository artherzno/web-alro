import React, { useEffect, useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Nav from '../components/Nav';
import { AuthContext } from '../App';


function Home() {
    const history = useHistory();
    const auth = useContext(AuthContext);

    let server_port = auth.port;
    let server_hostname = auth.hostname;

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
    
        async function fetchCheckLogin() {
            const res = await fetch(`http://${server_hostname}:${server_port}/admin/api/checklogin`, {
                method: 'POST',
                credentials: 'same-origin'})
            res
            .json()
            .then(res => {
                console.log(res.statuscode)
                if (res.code === 0 || res === null || res === undefined ) {
                    history.push('/');
                    setErr(true);
                } 
            })
            .catch(err => {
                console.log(err);
                setIsLoaded(true);
                setErr(true);
                history.push('/');
            });
        }
        
        setLoaded(true);
        fetchCheckLogin();
    }, [history, server_hostname, server_port])

    return (
        <div className="home">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />


        </div>
    )
}

export default Home
