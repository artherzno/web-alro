import React from 'react'
import { Select } from './select'

export const TypeBillSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทุกปี" label="ประเภทใบเสร็จรับเงิน" />
        </div>
    )
}