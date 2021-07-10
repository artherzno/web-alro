import React, { useState } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';

const typeList = [
    { value: 1, label: "01 เกษตรผสมผสาน" },
    { value: 2, label: "02 เกษตรเชิงเดี่ยว" },
    { value: 3, label: "03 ไร่นาสวนผสม" },
    { value: 4, label: "04 ประมง" },
    { value: 5, label: "05 ปศุสัตว์" },
    { value: 6, label: "06 อื่นๆ" },
]

export const SecondProjectSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="โครงการรอง" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}