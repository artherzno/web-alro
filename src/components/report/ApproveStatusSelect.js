import React from 'react'
import { Select } from './select'

const result = [
    { value: 1, label: "อยู่ระหว่างพิจารณา" },
    { value: 2, label: "อนุมัติ" },
    { value: 3, label: "ไม่อนุมัติ" }
]

export const ApproveStatusSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="ทั้งหมด" label="ผลการพิจารณา" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}