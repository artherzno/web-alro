import React,{useEffect,useState} from 'react'
import { Select } from './select'

export const YearSelect = ({ onChange = () => { } }) => {

    const [years, setYears] = useState([])

    useEffect(() =>{

        let max = new Date().getFullYear()
        let min = max - 14
        let years = []

        for (let i = max; i >= min; i--) {
            years.push({ value: i + 543, label: i + 543})

        }


        setYears(years)

    },[])

    return (
        <div>
            <Select options={years} emptyLabel="ทุกปี" label="ปี" onChange={(event) =>{
                
                const found = years.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}