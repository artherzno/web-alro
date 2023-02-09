import React from 'react'
import { Select } from './select'

const result = [
    { value: "1", label: "ปกติ" },
    { value: "2", label: "ชั้นดี" },
    { value: "3", label: "สงสัย" },
    { value: "4", label: "สงสัยจะสูญ" }
]

export const TypeDebtClassSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="ทั้งหมด" label="ชั้นหนี้" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}