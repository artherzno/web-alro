import React, { useEffect, useState } from 'react'
import { Select } from './select'
import api from '../../services/webservice'

export const MonthSelect = ({ onChange = () => { } }) => {

    const [monthList, setMonthList] = useState([])

    useEffect(() => {

        getMonthList()

    }, [])

    function getMonthList() {

        api.getMonthList().then(response => {

            const monthList = []
            response.data.data.forEach(element => {
                monthList.push({
                    value: element.id,
                    label: element.nameTH
                })
            });

            setMonthList(monthList)
        }).catch(error => {

        })
    }

    return (
        <div>
            <Select options={monthList} emptyLabel="ทุกเดือน" label="เดือน" onChange={onChange}/>
        </div>
    )
}