import React, { useState } from 'react'
import { Select } from './select'
import Grid from '@material-ui/core/Grid';
import { ProvinceSelect} from './index'

const typeList = [
    { value: 1, label: "ทั้งหมด" },
    { value: 2, label: "ส.ป.ก.จังหวัด" },
    { value: 3, label: "ธ.ก.ส." },
    { value: 4, label: "อื่นๆ" }
]

export const TypeBillSelect = ({ 
    onChange = () => { } ,
    onChangeProvince = () => { }

}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item>
                    <Select options={typeList} emptyLabel="เลือก" label="ประเภทใบเสร็จรับเงิน" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

                {parseInt(display) === 2 && <Grid item><ProvinceSelect onChange={onChangeProvince}/></Grid>}
            </Grid>

        </div>
    )
}