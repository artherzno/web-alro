import React from 'react'
import { Select } from './select'

const typeList = [
    { value: 1, label: "ทั้งหมด"},
    { value:2, label: "ส.ป.ก.จังหวัด" },
    { value:3, label: "ธ.ก.ส." },
    { value: 4, label: "อื่นๆ" }
]

export const TypeBillSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={typeList} emptyLabel="เลือก" label="ประเภทใบเสร็จรับเงิน" />
        </div>
    )
}