import React from 'react'

import { alpha, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            'kanit',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    '& .error': {
        borderColor: 'red',
    }
    
}));

const useStyles = makeStyles({
    textbox: {
        width: '100%',
        fontSize: '16px',
      },
});

function MUIdropdownSubDistrict(props) {
    const classes = useStyles();
    const { label, topic, value, name, id, onChange, districtID} = props;

    let dataSubDistrictList = JSON.parse(localStorage.getItem('districtlist'))
    // let lists = dataProvinceList;
    // let districtID = 14;
    let lists = [];

    lists.push({
        "ProvinceID": 0,
        "DistrictID": 0,
        "SubdistrictID": 0,
        "TB_NAME": 'เลือกแขวง/ตำบล'
    })
    for(let i=0; i<dataSubDistrictList.length; i++) {
        if(districtID === dataSubDistrictList[i].DistrictID) {
            lists.push({
                "ProvinceID": dataSubDistrictList[i].ProvinceID,
                "DistrictID": dataSubDistrictList[i].DistrictID,
                "SubdistrictID": dataSubDistrictList[i].SubdistrictID,
                "TB_NAME": dataSubDistrictList[i].AM_NAME,
                "POSTAL": dataSubDistrictList[i].POSTAL
            })
        }
    }

    return (
        <FormControl className={classes.textbox}>
        { 
            (label) === '' ? '' :

            <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
        }
        <Select
            value={value}
            name={name}
            labelId={id}
            id={id}
            input={<BootstrapInput />}
            onChange={onChange}
        >
            {/* <MenuItem value={0}>เลือกเขต/อำเภอ</MenuItem> */}
            {lists.map((item,i)=>
                <MenuItem key={i} value={item.DistrictID}>{item.TB_NAME}</MenuItem>
            )}
        </Select>
    </FormControl>
    )
}

export default MUIdropdownSubDistrict
