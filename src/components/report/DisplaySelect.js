import React from 'react'
import { Select } from './select'

export const DisplaySelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="เลือก" label="แสดง"/>
        </div>
    )
}