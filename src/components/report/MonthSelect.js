import React from 'react'
import { Select } from './select'

export const MonthSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทุกเดือน" label="เดือน" />
        </div>
    )
}