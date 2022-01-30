import React from 'react'
import { Select } from './select'

const result = [
    { value: 1, label: "ค้าง" },
    { value: 2, label: "ค้าง+ครบ" },
    { value: 3, label: "ครบ" }
]

export const GroupDebtSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="ทั้งหมด" label="กลุ่มลูกหนี้" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}