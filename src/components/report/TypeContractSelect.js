import React from 'react'
import { Select } from './select'

const result = [
    { value: "loan", label: "ปกติ" },
    { value: "debt", label: "แปลงหนี้" },
    { value: "court", label: "ฟ้องศาล" },
    { value: "misapply", label: "ใช้หนี้แทน" },
    { value: "gttd", label: "กทด" }
]

export const TypeContractSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="ทั้งหมด" label="ประเภทสัญญา" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}