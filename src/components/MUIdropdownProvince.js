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

function MUIdropdownProvince(props) {
    const classes = useStyles();
    const { label, topic, value, name, id, onChange} = props;

    let dataProvinceList = JSON.parse(localStorage.getItem('provincelist'))
    let lists = dataProvinceList;


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
            <MenuItem value={0}>เลือกจังหวัด</MenuItem>
            {lists.map((item,i)=>
                <MenuItem key={i} value={item.ProvinceID || item.PV_NAME}>{item.PV_NAME}</MenuItem>
            )}
        </Select>
    </FormControl>
    )
}

export default MUIdropdownProvince
