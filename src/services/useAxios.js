import { useState, useEffect ,useRef} from "react";
import axios from 'axios'

export default function useAxios (url, body, token, action) {
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(null);

    useEffect(() => {
        
        axios.post( url, body, token  )
        .then(res => {
                console.log(res)
                let data = res.data;
                if(data.code === 0 || res === null || res === undefined) {
                    if(Object.keys(data.message).length !== 0) {
                        console.error(data)
                        if(typeof data.message === 'object') {
                            // setErrMsg('ไม่สามารถทำรายการได้')
                        } else {
                            // setErrMsg([data.message])
                        }
                    } else {
                        setError(['ไม่สามารถทำรายการได้'])
                    }
                }else {
                    console.log(data.data[0])
                    setData(data.data)
                }
            }
        ).catch(err => { console.error(err ); setError(err); })
        .finally(() => {
            if (isMounted.current) {
              setIsLoading(false)
            }
         });

        // executed when component mounted
        isMounted.current = true;
        return () => {
            // executed when unmount
            isMounted.current = false;
        }
    }, [])


    return { data, error, isLoading };
} 