import React,{useEffect,useState} from 'react'
import { Select } from './select'
import api from '../../services/webservice'

const sectionType = [
    { value: "p1", label: "p1"}
]

export const SectionSelect = ({ onChange = () => { } }) => {

    const [zoneList, setZoneList] = useState([])

    useEffect(() => {

        getZoneList()

    }, [])

    function getZoneList() {

        api.getZoneList().then(response => {

            const sectionList = []
            response.data.data.forEach(element => {
                sectionList.push({
                    value: element.zone4ID,
                    label: element.nameTH
                })
            });

            setZoneList(sectionList)

        }).catch(error => {

        })
    }

    return (
        <div>
            <Select options={zoneList} emptyLabel="ทุกภาค" label="ภาค" onChange={onChange}/>
        </div>
    )
}