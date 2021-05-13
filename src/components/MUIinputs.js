import React from 'react';
import { withStyles, makeStyles, fade, createMuiTheme } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
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

import IconButton from '@material-ui/core/IconButton';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);

const BlueRadio = withStyles({
    root: {
      color: '#bfbfbf',
      '&$checked': {
        color: '#2284d0',
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const theme = createMuiTheme();
const useStyles = makeStyles({
    label: {
        fontSize: '16px',
        color: '#262626',
        transform: 'scale(1)',
    },labelHeader: {
        fontSize: '18px',
        color: '#262626',
        transform: 'scale(1)',
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
      border: '1px dashed #D9D9D9',
      padding: '20px',
      backgroundColor: '#FAFAFA',
      width: '100%',
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
      backgroundColor: 'transparent',
      border: '1px solid #2284d0',
      color: '#2284d0',
      width: '100%',
    },
    buttonOutlinePrimary: {
      backgroundColor: 'transparent',
      border: '1px solid #2284d0',
      color: '#2284d0',
      minWidth: '190px',
    },
    buttonOutlineGrey: {
      backgroundColor: 'transparent',
      border: '1px solid #E2E2E2',
      color: '#262626',
      minWidth: '190px',
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
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
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
    const { label } = props;
    return (
        <FormControl className={classes.textbox}>
            <InputLabel className={classes.labelHeader}  shrink htmlFor="addmember-type-input">
            {label}
            </InputLabel>&nbsp;
        </FormControl>
        );
}

const MuiLabelHeaderCheckbox = (props) => {
    const classes = useStyles();
    const { label } = props;
    return (
        <FormControl className={classes.textbox}>
            <InputLabel className={classes.label}  shrink htmlFor="addmember-type-input">
            {label}
            </InputLabel>&nbsp;
        </FormControl>
        );
}

const MuiTextfield = (props) => {
    const classes = useStyles();
    const { label, id, defaultValue, type, textAlign } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <BootstrapInput type={type} defaultValue={defaultValue} id={id} inputProps={{style: { textAlign: textAlign }}} />
        </FormControl>
    );
}

const MuiTextfieldMultiLine = (props) => {
    const classes = useStyles();
    const { label, id, defaultValue, type, textAlign, row } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <BootstrapInput type={type} defaultValue={defaultValue} id={id} multiline rows={row} inputProps={{style: { textAlign: textAlign }}} />
        </FormControl>
    );
}

const MuiTextfieldEndAdornment = (props) => {
    const classes = useStyles();
    const { label, id, defaultValue, type, endAdornment, textAlign } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <BootstrapInput type={type} defaultValue={defaultValue} id={id}  endAdornment={<InputAdornment position="end">{endAdornment}</InputAdornment>} inputProps={{style: { textAlign: textAlign }}} />
        </FormControl>
    );
}

const MuiTextNumber = (props) => {
    const classes = useStyles();
    const { label, id, defaultValue, placeholder, value, onInput } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <BootstrapInput type="number" placeholder={placeholder} id={id} value={value} onInput = {onInput} />
        </FormControl>
    );
}

const MuiDatePicker = (props) => {
    const classes = useStyles();
    const { label, id, defaultValue } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <BootstrapInput type="date" defaultValue={defaultValue} id={id} />
        </FormControl>
    );
}

const MuiCheckbox = (props) => {
    const { label, id, value, type } = props;

    return (
        <React.Fragment>
        {
            (type === 'row') ? 
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            // checked={state.checkedB}
                            // onChange={handleChange}
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
                            defaultChecked
                            // checked={state.checkedB}
                            // onChange={handleChange}
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
    const { label, id, lists, value, onChange, type, color } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            { (label) === '' ? '' : <span>&nbsp;</span> }  {/* For spacing */}

            {/* Check row or column */}
            {
                (type === 'row') ? 
                <RadioGroup row aria-label={id} name={id} value={value} onChange={onChange}>
                    {lists.map((item,i)=>
                        (color === 'red') ? 
                            <FormControlLabel key={i} value={(i+1).toString()} control={<Radio />} label={item} />
                            :
                            <FormControlLabel key={i} value={(i+1).toString()} control={<BlueRadio />} label={item} />
                    )}
                </RadioGroup> 
                :
                <RadioGroup aria-label={id} name={id} value={value} onChange={onChange}>
                    {lists.map((item,i)=>
                        (color === 'red') ? 
                            <FormControlLabel key={i} value={(i+1).toString()} control={<Radio />} label={item} />
                            :
                            <FormControlLabel key={i} value={(i+1).toString()} control={<BlueRadio />} label={item} />
                    )}
                </RadioGroup>
            }
        </FormControl>
    );
}

const MuiSelect = (props) => {
    const classes = useStyles();
    const { label, id, lists } = props;

    return (
        <FormControl className={classes.textbox}>
            { 
                (label) === '' ? '' :
                <InputLabel shrink htmlFor={id} className={classes.label}>
                    {label}
                </InputLabel>
            }
            <Select
                labelId={id}
                id={id}
                // value={age}
                // onChange={handleChange}
                input={<BootstrapInput />}
            >
                {lists.map((item,i)=>
                    <MenuItem key={i} value={i+1}>{item}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

const MuiUpload = (props) => {
    const classes = useStyles();
    const { label, imgUpload, id, onChange } = props;

    return (
        <FormControl className={classes.boxDashed}>
            { 
                (label) === '' ? '' : <p>{label}</p>
            }

            <List className={classes.lists}>
                {imgUpload.map((item,i)=>
                    <ListItem key={i}>
                        <ListItemIcon>
                            <AttachFileIcon  class={classes.iconGreen}/>
                        </ListItemIcon>
                        <ListItemText
                            primary={item}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <RemoveCircleOutlineIcon color="secondary"  />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}

            </List>
            <input
                accept="image/*"
                className={classes.inputfile}
                id={id}
                multiple
                type="file"
                onChange={onChange}
            />
            <label htmlFor={id} className="btn-upload">
                <Button variant="contained" className={classes.buttonOutlinePrimary} component="span">
                เลือกไฟล์
                </Button>
            </label>
        </FormControl>
    );
}

const ButtonNormalIconStartPrimary = (props) => {
    const classes = useStyles();
    const { label, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonNormal} edge="end" variant="contained" color="primary" size="large" startIcon={startIcon} onClick={onClick}>{label}</Button>
                                            
    );
}

const ButtonOutlineIconStartGrey = (props) => {
    const classes = useStyles();
    const { label, startIcon, onClick } = props;

    return (
        <Button className={classes.buttonOutlineGrey} edge="end" variant="contained" size="small" startIcon={startIcon} onClick={onClick}>{label}</Button>                                   
    );
}

const ButtonFluidPrimary = (props) => {
    const classes = useStyles();
    const { label, onClick } = props;

    return (
        <Button className={classes.buttonFluid} variant="contained" color="primary" size="large" onClick={onClick}>{label}</Button>
                                            
    );
}

const ButtonFluidOutlinePrimary = (props) => {
    const classes = useStyles();
    const { label, onClick } = props;

    return (
        <Button className={classes.buttonFluidOutlinePrimary} variant="contained" color="primary" size="large" onClick={onClick}>{label}</Button>
                                            
    );
}

export {
    MuiLabelHeader,
    MuiLabelHeaderCheckbox,
    MuiTextfield,
    MuiTextfieldMultiLine,
    MuiTextfieldEndAdornment,
    MuiTextNumber,
    MuiCheckbox,
    MuiDatePicker,
    MuiRadioButton,
    MuiSelect,
    MuiUpload,
    ButtonNormalIconStartPrimary,
    ButtonOutlineIconStartGrey,
    ButtonFluidPrimary,
    ButtonFluidOutlinePrimary,
}