import React, { useState } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';

const typeList = [
    { value: 1, label: "ส เงินกู้ระยะสั้น กำหนดชำระคืนภายใน 1 ปี" },
    { value: 2, label: "ก เงินกู้ระยะกลาง กำหนดชำระคืนภายใน 3 ปี" },
    { value: 3, label: "ย เงินกู้ระยะยาว กำหนดชำระคืน มากกว่า 3 ปี" },
]

export const LoanTypeSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)

    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="ประเภทเงินกู้" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}