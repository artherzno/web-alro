import React, { useState,useEffect } from 'react'
import { Select } from '../report/select'
import Grid from '@material-ui/core/Grid';
import api from '../../services/webservice'

// const typeList = [
//     { value: 1, label: "01 ปรับปรุงสิทธิ" },
//     { value: 2, label: "02 สกป." },
//     { value: 3, label: "03 พัฒนารายได้" },
//     { value: 4, label: "04 มิยาซาวา" },
//     { value: 5, label: "05 เจบิค" },
//     { value: 6, label: "06 พิเศษอื่นๆ" },
//     { value: 7, label: "07 กองทุนที่ดิน" },
// ]

export const MainProjectSelect = ({
    onChange = () => { },

}) => {

    const [display, setDisplay] = useState(0)

    const [typeList, setTypeList] = useState([])

    useEffect(() => {

        getSpkMainProject()

    }, [])

    function getSpkMainProject() {

        api.getSpkMainProject().then(response => {

            const typeList = []
            response.data.data.forEach(element => {

                typeList.push({
                    value: element.ProjectMainCode,
                    label: element.ProjectMainName
                })
            });

            setTypeList(typeList)
        }).catch(error => {

        })
    }
    
    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Select options={typeList} emptyLabel="เลือก" label="โครงการหลัก" onChange={(event) => {

                        const found = typeList.find(element => element.value.toString() === event.target.value)
                        onChange({ ...event, label: found ? found.label : "" })
                        setDisplay(event.target.value)

                    }} />
                </Grid>

            </Grid>

        </div>
    )
}