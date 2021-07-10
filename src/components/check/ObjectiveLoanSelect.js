import React, { useState } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';

const typeList = [
    { value: 1, label: "1 กู้ยืมเพื่อประกอบเกษตรกรรม" },
    { value: 2, label: "2 กู้ยืมเพื่อค่าชดเชยที่ดิน" },
]

export const ObjectiveLoanSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="วัตถุประสงค์การกู้" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}