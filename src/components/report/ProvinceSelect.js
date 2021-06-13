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

            const provinceList = []
            response.data.data.forEach(element => {
                provinceList.push({
                    value: element.provinceID,
                    label: element.nameTH
                })
            });

            setProvinceList(provinceList)
        }).catch(error =>{

        })
    }

    return(
        <div>
            <Select options={provinceList} emptyLabel="ทุกจังหวัด" label="จังหวัด"/>
        </div>
    )
}