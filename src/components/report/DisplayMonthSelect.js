import React, { useState } from 'react'
import { Select } from './select'
import Grid from '@material-ui/core/Grid';
import {MonthSelect,YearSelect} from './index'


const displayList = [{ value: 1, label: "รายปี" },
{ value: 2, label: "รายเดือน" },
{ value: 3, label: "ช่วงวันที่" }]

export const DisplayMonthSelect = ({ onChange = () => { } }) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item>
                    <Select options={displayList} onChange={(event) => {

                        onChange(event)
                        setDisplay(event.target.value)

                    }} emptyLabel="เลือก" label="แสดง" />
                </Grid>

                {parseInt(display) === 1 && <Grid item><YearSelect /></Grid>}
                {parseInt(display) === 2 && <Grid item><MonthSelect /></Grid>}
                {parseInt(display) === 2 && <Grid item><YearSelect /></Grid>}

            </Grid>

        </div>
    )
}