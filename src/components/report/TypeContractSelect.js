import React from 'react'
import { Select } from './select'

const result = [
    { value: 1, label: "สัญญาปกติ" },
    { value: 2, label: "สัญญาแปลงหนี้" },
    { value: 3, label: "ตั้งหนี้ตามคำพิพากษาศาล" },
    { value: 4, label: "สัญญาปรับปรุงโครงสร้างหนี้" },
    { value: 5, label: "สัญญาชดใช้หนี้แทนเกษตรกร" }
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