import React from 'react'
import { Select } from './select'


const result = [
    { value: "loan", label: "ลูกหนี้ปกติ" },
    { value: "court", label: "ลูกหนี้ฟ้องศาล" }
]
export const TypeDebtSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="ทั้งหมด" label="ประเภทลูกหนี้" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}