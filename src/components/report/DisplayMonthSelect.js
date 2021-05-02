import React from 'react'
import { Select } from './select'

export const DisplayMonthSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="เลือก" label="แสดง" />
        </div>
    )
}