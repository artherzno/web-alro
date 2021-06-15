import React, { useState } from 'react'
import { Select } from './select'
import Grid from '@material-ui/core/Grid';
import {ProvinceSelect,SectionSelect} from './index'

const displayList = [{ value: 1, label: "ทั้งประเทศ" },
{ value: 2, label: "รายภาค" },
{ value: 3, label: "รายจังหวัด" }]

export const DisplaySelect = ({ 
    onChange = () => { } ,
    onChangeSection = () => { },
    onChangeProvince= () => { }
}) => {

    const [display,setDisplay] = useState(0)

    

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item>
                    <Select options={displayList} onChange={(event) =>{
                        
                        const found = displayList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} emptyLabel="เลือก" label="แสดง" />
                </Grid>

                {parseInt(display) === 2 && <Grid item><SectionSelect onChange={onChangeSection}/></Grid>}
                {parseInt(display) === 3 && <Grid item><ProvinceSelect onChange={onChangeProvince}/></Grid>}

            </Grid>

        </div>
    )
}