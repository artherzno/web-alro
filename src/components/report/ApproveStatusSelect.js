import React from 'react'
import { Select } from './select'

export const ApproveStatusSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทั้งหมด" label="ผลการพิจารณา" />
        </div>
    )
}