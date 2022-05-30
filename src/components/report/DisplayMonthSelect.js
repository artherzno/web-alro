import React, { useState } from 'react'
import { Select } from './select'
import Grid from '@material-ui/core/Grid';
import { MonthSelect, YearSelect, DateRange } from './index'


const displayList = [{ value: 0, label: "รายปี" },
{ value: 3, label: "รายปีงบ" },
{ value: 1, label: "รายเดือน" },
{ value: 2, label: "ช่วงวันที่" }]

const displayList1 = [{ value: 0, label: "รายปี" },
{ value: 1, label: "รายเดือน" },
{ value: 2, label: "ช่วงวันที่" }]

export const DisplayMonthSelect = ({
    onChange = () => { },
    onChangeYear = () => { },
    onChangeYearEnd = () => { },
    onChangeMonth = () => { },
    onChangeDate = () => { },
    onChangeYearBudget = () => { },
    isShowBudgetYear
}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item>
                    <Select options={isShowBudgetYear ? displayList : displayList1} onChange={(event) => {

                        const displays = isShowBudgetYear ? displayList : displayList1
                        const found = displays.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : ""})
                        setDisplay(event.target.value)

                    }} emptyLabel="เลือก" label="แสดง" />
                </Grid>

                {parseInt(display) === 0 && <Grid item><YearSelect label="ปีเริ่มต้น" onChange={onChangeYear} /></Grid>}
                {parseInt(display) === 0 && <Grid item><YearSelect label="ปีสิ้นสุด" onChange={onChangeYearEnd} /></Grid>}
                {parseInt(display) === 1 && <Grid item><MonthSelect onChange={onChangeMonth} /></Grid>}
                {parseInt(display) === 1 && <Grid item><YearSelect onChange={onChangeYear} /></Grid>}
                {parseInt(display) === 2 && <Grid item><DateRange onChange={onChangeDate} label="ช่วงเวลา" /></Grid>}
                {parseInt(display) === 3 && <Grid item><YearSelect label="ปีงบ" onChange={onChangeYearBudget} /></Grid>}

            </Grid>

        </div>
    )
}