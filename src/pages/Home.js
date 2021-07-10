import React, { useEffect, useState, useContext, useRef} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/Header';
import Nav from '../components/Nav';
import { AuthContext } from '../App';


function Home() {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const isMounted = useRef(null);

    let server_port = auth.port;
    let server_hostname = auth.hostname;
    let token = localStorage.getItem('token');

    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('เกิดข้อผิดพลาด')
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
    
        const fetchCheckLogin = () => {
            axios.post(
                `${server_hostname}/admin/api/checklogin`,'',
                {
                    headers: { token: token }
                }
            ).then(res => {
                if (res.code === 0 || res === null || res === undefined ) {
                    // history.push('/');
                    setErr(true);
                } 
            }).catch(err => { 
                console.log(err) 
                setIsLoaded(true);
                setErr(true);
                // history.push('/');
            })
            .finally(() => {
                if (isMounted.current) {
                  setIsLoading(false)
                }
             });
        }
        
        setLoaded(true);
        fetchCheckLogin();

        // executed when component mounted
        isMounted.current = true;
        return () => {
            // executed when unmount
            isMounted.current = false;
        }
    }, [])

    return (
        <div className="home">
            <Header bgColor="bg-light-green" status="logged" />
            <Nav />


        </div>
    )
}

export default Home
