import React from 'react';
import axios from 'axios';

import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { createTheme, alpha, styled } from '@material-ui/core/styles';
import { makeStyles, withStyles, } from '@material-ui/styles';
// import { Fade, } from '@material-ui/core';
// import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AdapterMoment from '@material-ui/lab/AdapterMoment'
import OverwriteMomentBE from '../utils/OverwriteMomentBE'
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import FormHelperText from '@material-ui/core/FormHelperText';
import thLocale from 'date-fns/locale/th';

import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import moment from 'moment';
// import { yellow } from '@material-ui/core/colors';

// const BootstrapInput = withStyles((theme) => ({

//     root: {
//         'label + &': {
//             marginTop: theme.spacing(3),
//         },
//     },
//     input: {
//         borderRadius: 4,
//         position: 'relative',
//         backgroundColor: theme.palette.common.white,
//         border: '1px solid #ced4da',
//         fontSize: 16,
//         width: '100%',
//         padding: '10px 5px',
//         transition: theme.transitions.create(['border-color', 'box-shadow']),
//         '&:focus': {
//             borderColor: theme.palette.primary.main,
//         },
//     },
// }))(InputBase);

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


const BlueRadio = withStyles({
    root: {
        color: '#bfbfbf',
        '&$checked': {
            color: '#2284d0',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
    root: {
        color: '#bfbfbf',
        '&$checked': {
            color: '#da2828',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
    root: {
        color: '#bfbfbf',
        '&$checked': {
            color: '#fcbd0a',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const GreyRadio = withStyles({
    root: {
        color: '#bfbfbf',
        '&$checked': {
            color: '#959595',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueskyRadio = withStyles({
    root: {
        color: '#bfbfbf',
        '&$checked': {
            color: '#16c5e5',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const theme = createTheme({});

const useStyles = makeStyles({
    label: {
        fontSize: '16px',
        color: '#262626',
        transform: 'scale(1)',
    }, labelHeader: {
        fontSize: '18px',
        fontWeight: '400',
        color: '#262626',
        transform: 'scale(1)',
        lineHeight: '1.3',
    },
    lists: {
        marginTop: '-10px'
    },
    iconGreen: {
        color: '#27AE60',
        fill: '#27AE60',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        fontSize: '1.5rem',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        flexShrink: '0',
        userSelect: 'none',
    },
    iconRed: {
        color: '#da2828',
        fill: '#da2828',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        fontSize: '1.5rem',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        flexShrink: '0',
        userSelect: 'none',
    },
    boxDashed: {
        border: '1px dashed #D9D9D9 !important',
        padding: '20px !important',
        backgroundColor: '#FAFAFA',
        width: '100%',
    },
    buttonYellow: {
        backgroundColor: '#fcbd0a',
        '&:hover': {
            backgroundColor: '#c49207',
        },
        color: '#000',
    },
    buttonBluesky: {
        backgroundColor: '#16c5e5',
        '&:hover': {
            backgroundColor: '#13a5bf',
        },
        color: '#fff',
    },
    buttonRed: {
        backgroundColor: '#da2828',
        '&:hover': {
            backgroundColor: '#b52020',
        },
        color: '#fff',
    },
    buttonGrey: {
        backgroundColor: '#959595',
    },
    buttonGreyLight: {
        backgroundColor: '#D5D5D5',
        color: '#6E6E6E',
    },
    buttonNormal: {
        fontSize: '16px',
    },
    buttonFluid: {
        width: '100%',
        fontSize: '16px',
    },
    buttonRow: {
        margin: '35px 0',
    },
    buttonFluidOutlinePrimary: {
        backgroundColor: 'transparent !important',
        border: '1px solid #2284d0 !important',
        color: '#2284d0 !important',
        width: '100%',
    },
    buttonOutlinePrimary: {
        backgroundColor: 'transparent !important',
        border: '1px solid #2284d0 !important',
        color: '#2284d0 !important',
        minWidth: '190px',
    },
    buttonFluidOutlineSecondary: {
        backgroundColor: 'transparent !important',
        border: '1px solid #da2828 !important',
        color: '#da2828 !important',
        width: '100%',
    },
    buttonOutlineSecondary: {
        backgroundColor: 'transparent !important',
        border: '1px solid #da2828 !important',
        color: '#da2828 !important',
        minWidth: '190px',
    },
    buttonOutlineGrey: {
        backgroundColor: 'transparent !important',
        border: '1px solid #E2E2E2 !important',
        color: '#262626 !important',
        minWidth: '120px',
    },
    textbox: {
        width: '100%',
        fontSize: '16px',
    },
    inputfile: {
        display: 'none',
    },
    tableNoResult: {
        backgroundColor: '#FAFAFA',
        border: '1px solid #D9D9D9',
        width: '100%',
        height: '20vh',
    },
    boostrapRoot: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    boostrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            //   boxShadow: `${Fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    boostrapInputLabel: {
        fontSize: '16px',
        color: '#262626',
        transform: 'scale(1)',
    },
    boostrapInputLabelHeader: {
        fontSize: '18px',
        color: '#262626',
        transform: 'scale(1)',
    },
});



const MuiLabelHeader = (props) => {
    const classes = useStyles();
    const { topic, label } = props;
    return (
        // <FormControl className={classes.textbox}>
        //     <InputLabel className={classes.labelHeader}  shrink htmlFor={label}>
        //     {label}
        //     </InputLabel>&nbsp;
        // </FormControl>
        <h3 className={classes.labelHeader} ><span className="txt-green">{topic}&nbsp;</span>{label}</h3>
    );
}

const MuiLabelHeaderCheckbox = (props) => {
    const classes = useStyles();
    const { topic, label } = props;
    return (
        <FormControl className={classes.textbox}>
            <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
        </FormControl>
    );
}

const MuiTextfield = (props) => {
    const classes = useStyles();
    const { topic, label, id, value, type, textAlign, disabled, placeholder, onChange, onBlur, name, inputdisabled, error, helperText } = props;

    return (
        <FormControl error className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            {
                (error) ?
                    <TextField error name={name} placeholder={placeholder} helperText={helperText} onChange={onChange} onBlur={onBlur} type={type} disabled={disabled} value={value} id={id} inputProps={{ style: { textAlign: textAlign, padding: '10px 12px' } }} />
                    :
                    <TextField name={name} placeholder={placeholder} onChange={onChange} onBlur={onBlur} type={type} disabled={disabled} value={value} id={id} inputProps={{ style: { textAlign: textAlign, padding: '10px 12px' } }} />
            }
            {/* <BootstrapInput name={name} onChange={onChange} onBlur={onBlur} type={type} disabled={disabled} value={value} id={id} error inputProps={{style: { textAlign: textAlign }}} /> */}

        </FormControl>
    );
}

const MuiTextfieldValidate = (props) => {
    const classes = useStyles();
    const { topic, label, id, value, type, textAlign, disabled, onChange, onBlur, name, inputdisabled, error, helperText } = props;

    return (
        <FormControl error className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }

            <TextField
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                disabled={disabled}
                value={value}
                id={id}
                inputProps={{ style: { textAlign: textAlign, padding: '10px 12px' } }}
                helperText={helperText}
                error={error}
            />

            {/* <BootstrapInput name={name} onChange={onChange} onBlur={onBlur} type={type} disabled={disabled} value={value} id={id} error inputProps={{style: { textAlign: textAlign }}} /> */}

        </FormControl>
    );
}

const MuiTextfieldMultiLine = (props) => {
    const classes = useStyles();
    const { topic, label, id, value, type, textAlign, row, name, onChange, error, inputdisabled } = props;

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            {
                (error) ?
                    <TextField error name={name} onChange={onChange} type={type} value={value} id={id} multiline rows={row} inputProps={{ style: { textAlign: textAlign, padding: '10px 12px' } }} />
                    :
                    <TextField name={name} onChange={onChange} type={type} value={value} id={id} multiline rows={row} inputProps={{ style: { textAlign: textAlign, padding: '10px 12px' } }} />
            }
            {/* <BootstrapInput error name={name} onChange={onChange} type={type} value={value} id={id} multiline rows={row} inputProps={{style: { textAlign: textAlign }}} /> */}
        </FormControl>
    );
}

const MuiTextfieldCurrency = (props) => {
    const classes = useStyles();
    const { topic, label, value, name, onChange, inputdisabled } = props;

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            <NumberFormat
                className="input-currency"
                {...props}
                value={value}
                name={name}
                // mask={mask}
                customInput={TextField}
                // prefix={'$'}
                // format={format || null}
                type="text"
                thousandSeparator={true}
                onValueChange={({ value: v }) => onChange({ target: { name, value: v } })}
            />

            {/* <BootstrapInput name={name} type={type} value={value} id={id} onChange={onChange} endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>} inputProps={{style: { textAlign: textAlign }}} /> */}
        </FormControl>
    );
}

const MuiTextfieldStartAdornment = (props) => {
    const classes = useStyles();
    const { topic, label, id, value, type, startAdornment, textAlign, name, onChange, inputdisabled } = props;

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            <BootstrapInput name={name} type={type} value={value} id={id} onChange={onChange} startAdornment={<InputAdornment position="start">{startAdornment}</InputAdornment>} inputProps={{ style: { textAlign: textAlign } }} />
        </FormControl>
    );
}

const MuiTextfieldEndAdornment = (props) => {
    const classes = useStyles();
    const { topic, label, id, value, type, endAdornment, textAlign, name, onChange, inputdisabled } = props;

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            <BootstrapInput name={name} type={type} value={value} id={id} onChange={onChange} endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>} inputProps={{ style: { textAlign: textAlign } }} />
        </FormControl>
    );
}

const MuiTextNumber = (props) => {
    const classes = useStyles();
    const { topic, label, id, placeholder, value, onInput, name, onBlur, error } = props;

    return (
        <FormControl className={classes.textbox}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            {
                (error) ?
                    <TextField error name={name} type="number" placeholder={placeholder} id={id} value={value} onInput={onInput} onBlur={onBlur} inputProps={{ style: { padding: '10px 12px' } }} />
                    :
                    <TextField name={name} type="number" placeholder={placeholder} id={id} value={value} onInput={onInput} onBlur={onBlur} inputProps={{ style: { padding: '10px 12px' } }} />
            }
            {/* <BootstrapInput name={name} type="number" placeholder={placeholder} id={id} value={value} onInput = {onInput} onBlur={onBlur}  /> */}
        </FormControl>
    );
}

let d = new Date();
const day = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
// const month = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
let fullyear = d.getFullYear() + 543;
let year = [];
year.push('เลือกปี')
for (let i = 0; i <= 10; i++) {
    year.push(fullyear - i);
}

const MuiDatePickerValidate = (props) => {
    const { topic, label, value, yearValue, monthValue, dayValue, onChange, inputdisabled, error, helperText } = props;
    return (
        <React.Fragment >

            <FormControl className={`MuiDatePicker ${inputdisabled}`}>
                {
                    (label) === '' ? '' :
                        <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
                }
                <LocalizationProvider dateAdapter={OverwriteMomentBE} >
                    <DatePicker
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => {

                            console.log("params", params)
                            // const valueDisplay = moment()
                            return <TextField {...params} />
                        }}
                        inputFormat="dd/MM/yyyy"
                        className="MuiDatePicker"
                        helperText={helperText}
                        error={error}
                    />
                </LocalizationProvider>

            </FormControl>
        </React.Fragment>
    )
}

const MuiDatePicker = (props) => {
    const classes = useStyles();
    const { topic, label, name, id, textAlign, value, error, helperText, yearValue, monthValue, dayValue, type, onBlur, onChange, disabled, inputdisabled } = props;
    // let value = '2560-12-01'
    // let dayValue = value.slice(-2);
    // let monthValue = value.slice(5,7);
    // let yearValue = (parseInt(value.slice(0,4)) + 543).toString();

    // console.log(value,'>>>',yearValue,'-',monthValue,'-',dayValue)
    return (


        <React.Fragment >

            <FormControl className={`${classes.textbox} ${inputdisabled}`} error={error}>
                {
                    (label) === '' ? '' :
                        <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
                }
                <LocalizationProvider dateAdapter={OverwriteMomentBE} >
                    <DatePicker
                        value={value}
                        onChange={onChange}
                        renderInput={(params) => {

                            // console.log("params", params)
                            // const valueDisplay = moment()
                            return <TextField {...params} error={error} helperText={props.helperText} inputProps={{ ...params.inputProps, style: { padding: '10px 12px' }, onChange: props.onChangeDate ? props.onChangeDate : () => { }, value: params.inputProps.value ? moment(params.inputProps.value, 'DD/MM/YYYY').add(543, 'year').format('DD/MM/YYYY') : '' }} />
                        }}
                        inputFormat="DD/MM/YYYY"
                        className="MuiDatePicker"
                    />
                </LocalizationProvider>

            </FormControl>

        </React.Fragment>
    );
}

const MuiCheckbox = (props) => {
    const { label, id, type, defaultChecked, name, onChange, checked } = props;
    let checkedValue = checked === '1' || checked ? true : false

    return (
        <React.Fragment>
            {
                (type === 'row') ?
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={name}
                                    defaultChecked={defaultChecked}
                                    checked={checkedValue}
                                    onChange={onChange}
                                    // name="checkedB"
                                    color="primary"
                                    id={id}
                                />
                            }
                            label={label}
                        />
                    </FormGroup>
                    :
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name={name}
                                    defaultChecked={defaultChecked}
                                    checked={checkedValue}
                                    onChange={onChange}
                                    // name="checkedB"
                                    color="primary"
                                    id={id}
                                />
                            }
                            label={label}
                        />
                    </FormGroup>
            }
        </React.Fragment>


    );
}

const MuiRadioButton = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, value, onChange, type, color, name, } = props;

    let radioValue = value;
    if (value === null) {
        radioValue = ''
    }

    return (
        <FormControl className={classes.textbox}>
            {
                (label) === '' ? '' :
                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            {/* { (label) === '' ? '' : <span>&nbsp;</span> }   */}

            {/* Check row or column */}
            {
                (type === 'row') ?
                    <RadioGroup row aria-label={id} name={name} value={radioValue.toString()} onChange={onChange}>
                        {lists.map((item, i) =>
                            (color === 'red') ?
                                <FormControlLabel key={i} value={(i).toString()} control={<RedRadio />} label={item} />
                                : (color === 'yellow') ?
                                    <FormControlLabel key={i} value={(i).toString()} control={<YellowRadio />} label={item} />
                                    : (color === 'grey') ?
                                        <FormControlLabel key={i} value={(i).toString()} control={<GreyRadio />} label={item} />
                                        : (color === 'bluesky') ?
                                            <FormControlLabel key={i} value={(i).toString()} control={<BlueskyRadio />} label={item} />
                                            :
                                            <FormControlLabel key={i} value={(i).toString()} control={<BlueRadio />} label={item} />
                        )}
                    </RadioGroup>
                    :
                    <RadioGroup aria-label={id} name={name} value={radioValue.toString()} onChange={onChange}>
                        {lists.map((item, i) =>
                            (color === 'red') ?
                                <FormControlLabel key={i} value={(i).toString()} control={<RedRadio />} label={item} />
                                : (color === 'yellow') ?
                                    <FormControlLabel key={i} value={(i).toString()} control={<YellowRadio />} label={item} />
                                    : (color === 'grey') ?
                                        <FormControlLabel key={i} value={(i).toString()} control={<GreyRadio />} label={item} />
                                        : (color === 'bluesky') ?
                                            <FormControlLabel key={i} value={(i).toString()} control={<BlueskyRadio />} label={item} />
                                            :
                                            <FormControlLabel key={i} value={(i).toString()} control={<BlueRadio />} label={item} />
                        )}
                    </RadioGroup>
            }
        </FormControl>
    );
}

const MuiSelectDay = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled, startText } = props;

    // console.log('MuiSelectProvince:', lists)

    const dayObj = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];


    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value="00">{startText ? startText : 'วัน'}</MenuItem>
                {dayObj.map((item, i) =>
                    <MenuItem key={i} value={item}>{item}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectMonth = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled, startText } = props;

    // console.log('MuiSelectProvince:', lists)

    // const monthObj = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
    // const monthValueObj = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const monthObj = [
        { name: 'มกราคม', value: '01' },
        { name: 'กุมภาพันธ์', value: '02' },
        { name: 'มีนาคม', value: '03' },
        { name: 'เมษายน', value: '04' },
        { name: 'พฤษภาคม', value: '05' },
        { name: 'มิถุนายน', value: '06' },
        { name: 'กรกฎาคม', value: '07' },
        { name: 'สิงหาคม', value: '08' },
        { name: 'กันยายน', value: '09' },
        { name: 'ตุลาคม', value: '10' },
        { name: 'พฤศจิกายน', value: '11' },
        { name: 'ธันวาคม', value: '12' },
    ]

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value="00">{startText ? startText : 'เดือน'}</MenuItem>
                {monthObj.map((item, i) =>
                    <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectYear = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled, startText, limit, last } = props;

    let fullyear = d.getFullYear() + (limit >= 0 ? (limit + 543) : 548) + (last ? last : 0); // specify limit value of year
    let yearObj = [];
    for (let i = 0; i <= 100; i++) {
        yearObj.push(fullyear - i);
    }

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value="0000">{startText ? startText : 'ปี'}</MenuItem>
                {yearObj.map((item, i) =>
                    <MenuItem key={i} value={item}>{item}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectProvince = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled, startText } = props;

    // console.log('MuiSelectProvince:', lists)

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value={0}>{startText ? startText : 'เลือกจังหวัด'}</MenuItem>
                {lists.map((item, i) =>
                    <MenuItem key={i} value={item.ProvinceID}>{item.PV_NAME}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectDistrict = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled } = props;

    // console.log('MuiSelect:', lists)

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value={0}>เลือกเขต/อำเภอ</MenuItem>
                {lists.map((item, i) =>
                    <MenuItem key={i} value={item.DistrictID}>{item.AM_NAME}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectSubDistrict = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, inputdisabled } = props;

    // console.log('MuiSelect:', lists)

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value={0}>เลือกแขวง/ตำบล</MenuItem>
                {lists.map((item, i) =>
                    <MenuItem key={i} value={item.SubdistrictID}>{item.TB_NAME}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectObjYear = (props) => {
    const classes = useStyles();
    const { topic, label, id, name, value, onChange, valueYaer } = props;

    // e.g. <MuiSelectObjYear label="แผนปี" valueYaer={30} name="ProjectPlanYear" value={inputData.ProjectPlanYear} onChange={handleInputData} />

    let d = new Date();
    let buddhaYear = 543 + 5;

    // Check FiscalYear if month >= October will increase 1 year

    // let monthNow = d.getMonth();
    // if(monthNow >= 9) {
    //     buddhaYear = 544;
    // }
    let fullyear = d.getFullYear() + buddhaYear;
    let yearList = [];
    let countYaerNum = valueYaer || 10;

    for (let i = 0; i < countYaerNum; i++) {
        yearList.push(
            {
                yearname: fullyear - i,
                yearvalue: (fullyear - i) - 2500
            }
        );
    }

    // console.log('MuiSelectOBJYear:', lists, itemName, itemValue)

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
                <MenuItem value={0}>กรุณาเลือก</MenuItem>
                {yearList.map((item, i) =>
                    <MenuItem key={i} value={item.yearvalue}>{item.yearname}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectObjYearValue = (props) => {
    const classes = useStyles();
    const { topic, label, id, name, value, start, end, onChange, valueYaer } = props;

    let d = new Date();
    let buddhaYear = 543;

    // Check FiscalYear if month >= October will increase 1 year

    // let monthNow = d.getMonth();
    // if(monthNow >= 9) {
    //     buddhaYear = 544;
    // }
    let fullyear = d.getFullYear() + buddhaYear;
    let yearList = [];

    yearList.push(
        // {
        //     yearname: fullyear + 1,
        //     yearvalue: (fullyear + 1)-2500
        // },
        {
            yearname: fullyear,
            yearvalue: (fullyear) - 2500
        }, {
        yearname: fullyear - 1,
        yearvalue: (fullyear - 1) - 2500
    }
    );


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
                <MenuItem value={0}>กรุณาเลือก</MenuItem>
                {yearList.map((item, i) =>
                    <MenuItem key={i} value={item.yearvalue}>{item.yearname}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}


const MuiSelectObjYearStart = (props) => {
    const classes = useStyles();
    const { topic, label, id, name, value, onChange, valueStartYaer } = props;

    // e.g. <MuiSelectObjYear label="แผนปี" valueYaer={30} name="ProjectPlanYear" value={inputData.ProjectPlanYear} onChange={handleInputData} />

    let d = new Date();
    let buddhaYear = 543 + 5;

    // Check FiscalYear if month >= October will increase 1 year

    // let monthNow = d.getMonth();
    // if(monthNow >= 9) {
    //     buddhaYear = 544;
    // }
    let fullyear = d.getFullYear() + buddhaYear;
    let yearList = [];
    let countYaerNum = (Number(fullyear) + 1) - valueStartYaer || 10;

    for (let i = 0; i < countYaerNum; i++) {
        let fullYearValue = (fullyear - i) - 2500
        yearList.push(
            {
                yearname: fullyear - i,
                yearvalue: fullYearValue.toString().length === 2 ? fullYearValue : '0' + fullYearValue
            }
        );
    }

    // console.log('MuiSelectOBJYear:', lists, itemName, itemValue)

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
                <MenuItem value={0}>กรุณาเลือก</MenuItem>
                {yearList.map((item, i) =>
                    <MenuItem key={i} value={item.yearvalue}>{item.yearname}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelectObj = (props) => {
    const classes = useStyles();
    const { topic, label, id, lists, name, value, onChange, itemName, itemValue, inputdisabled } = props;

    // console.log('MuiSelectOBJ:', lists, itemName, itemValue)

    return (
        <FormControl className={`${classes.textbox} ${inputdisabled}`}>
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
                <MenuItem value={0}>กรุณาเลือก</MenuItem>
                {lists.map((item, i) =>
                    <MenuItem key={i} value={item[itemValue]}>{item[itemName]}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiSelect = (props) => {
    const classes = useStyles();
    const { topic, label, lists, listsValue, name, id, textAlign, value, error, helperText, onChange } = props;

    // console.log('MuiSelect:', listsValue)

    return (
        <FormControl className={classes.textbox} error>
            {
                (label) === '' ? '' :
                    // <InputLabel shrink htmlFor={id} className={classes.label}>
                    //     {label}
                    // </InputLabel>

                    <label><span className="txt-green">{topic}&nbsp;</span>{label}</label>
            }
            {

                listsValue === undefined ?
                    <Select
                        value={value}
                        error={error}
                        name={name}
                        labelId={id}
                        id={id}
                        input={<BootstrapInput />}
                        onChange={onChange}
                    >
                        {/* <MenuItem value={listsValue[0]}>{lists[0]}</MenuItem> */}
                        {lists.map((item, i) =>
                            <MenuItem key={i} value={i}>{item}</MenuItem>
                        )}
                    </Select>
                    :
                    <Select
                        value={value}
                        error={error}
                        name={name}
                        labelId={id}
                        id={id}
                        input={<BootstrapInput />}
                        onChange={onChange}
                    >
                        {/* <MenuItem value={listsValue[0]}>{lists[0]}</MenuItem> */}
                        {lists.map((item, i) =>
                            <MenuItem key={i} value={listsValue[i]}>{item}</MenuItem>
                        )}
                    </Select>

            }

            {error && <FormHelperText>{helperText}</FormHelperText>}

        </FormControl>
    );

    //     return(
    //         <FormControl fullWidth>
    //             {(label) === '' ? '' : <InputLabel variant="standard" htmlFor="uncontrolled-native">
    //                 {label}
    //   </InputLabel>}

    //             <Select
    //                 labelId={id}
    //                 id={id}
    //                 input={<BootstrapInput />}
    //             >
    //                 {lists.map((item, i) =>
    //                     <MenuItem key={i} value={i + 1}>{item}</MenuItem>
    //                 )}
    //             </Select>
    //         </FormControl>
    //     )
}

const MuiUpload = (props) => {
    const classes = useStyles();
    const { label, imgUpload, id, onChange, name, onClick } = props;

    return (
        <FormControl className={classes.boxDashed}>
            {
                (label) === '' ? '' : <label>{label}</label>
            }
            {
                imgUpload ?
                    <List className={classes.lists}>
                        {imgUpload.map((item, i) =>
                            <ListItem key={i}>
                                <ListItemIcon>
                                    <AttachFileIcon className={classes.iconGreen} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={onClick} >
                                        <RemoveCircleOutlineIcon color="secondary" style={{ color: '#da2828' }} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}

                    </List>
                    : ''
            }
            <input
                accept="image/*"
                className={classes.inputfile}
                id={id}
                multiple
                type="file"
                onChange={onChange}
                name={name}
            />
            <label htmlFor={id} className="btn-upload">
                <Button variant="contained" className={classes.buttonOutlinePrimary} color="primary" component="span">
                    เลือกไฟล์
                </Button>
            </label>
        </FormControl>
    );
}

const ButtonNormalIconStartPrimary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonNormal} edge="end" variant="contained" color="primary" size="large" startIcon={startIcon} onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}

const ButtonNormalIconStartSecondary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonNormal} edge="end" variant="contained" color="secondary" size="large" startIcon={startIcon} onClick={onClick} style={{ maxWidth: maxWidth, backgroundColor: '#da2828' }}>{label}</Button>

    );
}

const ButtonNormalIconStartGrey = (props) => {
    const classes = useStyles();
    const { label, maxWidth, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonNormal} edge="end" variant="contained" color="primary" size="large" startIcon={startIcon} onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}

const ButtonFluidIconStartPrimary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonFluid} edge="end" variant="contained" color="primary" size="large" startIcon={startIcon} onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}


const ButtonOutlineIconStartGrey = (props) => {
    const classes = useStyles();
    const { label, maxWidth, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonOutlineGrey} edge="end" color="primary" variant="contained" size="small" startIcon={startIcon} onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>
    );
}

const ButtonFluidPrimary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, onClick } = props;

    return (
        <Button className={classes.buttonFluid} variant="contained" color="primary" size="large" onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}

const ButtonFluidSecondary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, onClick } = props;

    return (
        <Button className={classes.buttonFluid} variant="contained" color="secondary" size="large" onClick={onClick} style={{ maxWidth: maxWidth, backgroundColor: '#da2828' }}>{label}</Button>

    );
}

const ButtonFluidColor = (props) => {
    const classes = useStyles();
    const { label, maxWidth, onClick, color } = props;
    let bgColor = (color === 'yellow') ? classes.buttonYellow : (color === 'red') ? classes.buttonRed : (color === 'bluesky') ? classes.buttonBluesky : (color === 'grey') ? classes.buttonGrey : (color === 'greylight') ? classes.buttonGrey : '';

    return (
        <Button className={classes.buttonFluid + ' ' + bgColor} variant="contained" color="primary" size="large" onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}


const ButtonFluidOutlinePrimary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, onClick } = props;

    return (
        <Button className={classes.buttonFluidOutlinePrimary} variant="contained" color="primary" size="large" onClick={onClick} style={{ maxWidth: maxWidth }}>{label}</Button>

    );
}

const ButtonFluidOutlineSecondary = (props) => {
    const classes = useStyles();
    const { label, maxWidth, onClick } = props;

    return (
        <Button className={classes.buttonFluidOutlineSecondary} variant="contained" color="secondary" size="large" onClick={onClick} style={{ maxWidth: maxWidth, backgroundColor: '#da2828' }}>{label}</Button>

    );
}

export {
    MuiLabelHeader,
    MuiLabelHeaderCheckbox,
    MuiTextfield,
    MuiTextfieldValidate,
    MuiTextfieldMultiLine,
    MuiTextfieldCurrency,
    MuiTextfieldStartAdornment,
    MuiTextfieldEndAdornment,
    MuiTextNumber,
    MuiCheckbox,
    MuiDatePicker,
    MuiDatePickerValidate,
    MuiRadioButton,
    MuiSelect,
    MuiSelectObj,
    MuiSelectProvince,
    MuiSelectDistrict,
    MuiSelectSubDistrict,
    MuiSelectObjYear,
    MuiSelectObjYearValue,
    MuiSelectObjYearStart,
    MuiSelectDay,
    MuiSelectMonth,
    MuiSelectYear,
    MuiUpload,
    ButtonFluidIconStartPrimary,
    ButtonNormalIconStartPrimary,
    ButtonNormalIconStartSecondary,
    ButtonNormalIconStartGrey,
    ButtonOutlineIconStartGrey,
    ButtonFluidPrimary,
    ButtonFluidSecondary,
    ButtonFluidColor,
    ButtonFluidOutlinePrimary,
    ButtonFluidOutlineSecondary,
}