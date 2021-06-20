import React, { useState } from 'react'
import { Select } from './select'
import Grid from '@material-ui/core/Grid';
import { MonthSelect, YearSelect, DateRange } from './index'


const displayList = [{ value: 1, label: "รายปี" },
{ value: 2, label: "รายเดือน" },
{ value: 3, label: "ช่วงวันที่" }]

export const DisplayMonthSelect = ({
    onChange = () => { },
    onChangeYear = () => { },
    onChangeMonth = () => { },
    onChangeDate = () => { }
}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item>
                    <Select options={displayList} onChange={(event) => {

                        const found = displayList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : ""})
                        setDisplay(event.target.value)

                    }} emptyLabel="เลือก" label="แสดง" />
                </Grid>

                {parseInt(display) === 1 && <Grid item><YearSelect onChange={onChangeYear} /></Grid>}
                {parseInt(display) === 2 && <Grid item><MonthSelect onChange={onChangeMonth} /></Grid>}
                {parseInt(display) === 2 && <Grid item><YearSelect onChange={onChangeYear} /></Grid>}
                {parseInt(display) === 3 && <Grid item><DateRange onChange={onChangeDate} label="ช่วงเวลา" /></Grid>}

            </Grid>

        </div>
    )
}