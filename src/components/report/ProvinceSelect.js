import React from 'react'
import {Select} from './select'

export const ProvinceSelect = ({ onChange=() =>{}}) =>{

    return(
        <div>
            <Select options={[{value:"p1",label:"p1"}]} emptyLabel="ทุกจังหวัด" label="จังหวัด"/>
        </div>
    )
}