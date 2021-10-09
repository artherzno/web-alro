import React from 'react'
import { Select } from './select'

const result = [
    { value: 1, label: "ทั้งหมด" },
    { value: 2, label: "สัญญาปกติ" },
    { value: 3, label: "สัญญาแปลงหนี้" },
    { value: 4, label: "ตั้งหนี้ตามคำพิพากษาศาล" },
    { value: 5, label: "สัญญาปรับปรุงโครงสร้างหนี้" },
    { value: 5, label: "สัญญาชดใช้หนี้แทนเกษตรกร" }
]

export const TypeContractSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={result} emptyLabel="เลือก" label="ประเภทสัญญา" onChange={(event) => {

                const found = result.find(element => element.value.toString() === event.target.value)
                onChange({ ...event, label: found ? found.label : "" })

            }}/>
        </div>
    )
}