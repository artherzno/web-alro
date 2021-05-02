import React from 'react'
import { Select } from './select'

export const YearSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทุกปี" label="ปี" />
        </div>
    )
}