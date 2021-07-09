import React, { useState } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';

const typeList = [
    { value: 1, label: "01" },
    { value: 2, label: "26" },
    { value: 3, label: "28" },
    { value: 4, label: "32" },
    { value: 5, label: "36" },
    { value: 6, label: "37" },
    { value: 7, label: "39" },
    { value: 8, label: "40" },
]

export const LoanPlanSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="แผนสินเชื่อปี" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}