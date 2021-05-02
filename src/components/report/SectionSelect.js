import React from 'react'
import { Select } from './select'

export const SectionSelect = ({ onChange = () => { } }) => {

    return (
        <div>
            <Select options={[{ value: "p1", label: "p1" }]} emptyLabel="ทุกภาค" label="ภาค" />
        </div>
    )
}