import React from 'react'
import { Select } from './select'

const typeList = [
    { value: 1, label: "ทั้งหมด"},
    { value: 1, label: "ลดอัตราดอกเบี้ย" },
    { value: 1, label: "งดคิดอัตราดอกเบี้ย" },
    { value: 1, label: "ขยายเวลาการรับชำระหนี้" }
]

export const LoanTypeSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={typeList} emptyLabel="เลือก" label="ประเภทโครงสร้างหนี้" />
        </div>
    )
}