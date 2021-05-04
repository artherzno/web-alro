import React from 'react'
import { Select } from './select'

export const LoanTypeSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทั้งหมด" label="ประเภทโครงสร้างหนี้" />
        </div>
    )
}