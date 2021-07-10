import React, { useState,useEffect } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';

const typeList = [
    { value: 1, label: "โครงการ" },
    { value: 2, label: "สัญญา" },
    { value: 3, label: "mindex" },
    { value: 4, label: "สัญญาปี" }
]

export const SortCheck = ({
    onChange = () => { },
    bill=false,
    interest=false,

}) => {

    const [display, setDisplay] = useState(0)

    useEffect(() =>{

        if(bill){
            typeList.push({ value: 5, label: "ใบเสร็จ"})
            typeList.push({ value: 6, label: "ใบเสร็จ อ้างอิง" })
        }else if(interest){
            typeList.push({ value: 5, label: "type5" })
        }

    },[])

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="จัดเรียงตาม" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}