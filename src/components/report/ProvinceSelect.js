import React,{useEffect,useState} from 'react'
import {Select} from './select'
import api from '../../services/webservice'

export const ProvinceSelect = ({ onChange=() =>{}}) =>{

    const [provinceList, setProvinceList] = useState([])

    useEffect(() =>{

        getProvinceList()
        
    },[])

    function getProvinceList(){

        api.getProvinceList().then(response =>{

            setProvinceList(response.data.data)
        }).catch(error =>{

        })
    }

    return(
        <div>
            <Select options={[{value:"p1",label:"p1"}]} emptyLabel="ทุกจังหวัด" label="จังหวัด"/>
        </div>
    )
}