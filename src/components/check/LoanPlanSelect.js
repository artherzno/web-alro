import React, { useState,useEffect } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

export const LoanPlanSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)
    const [typeList,setTypeList] = useState([])

    useEffect(() =>{

        const years = []
        const date = new Date()
        for (let i = 0; i <= 9; i++) {
            const year = date.getFullYear() - i
            const yearStr = moment(year,"YYYY").add(543,'years').format("YYYY")
            years.push({
                label: yearStr,
                value: yearStr
            })
        }

        setTypeList(years)

    },[])

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