
import React, { useRef, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import MInput from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Moment from 'moment'
import NumberFormat from 'react-number-format';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        marginLeft: 0,
        width: '100%',
    },
    filed: {
        marginTop: -8
    },
    cssLabel: {
        '&$cssFocused': {
            color: theme.palette.primary.dark,
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: theme.palette.primary.dark,
        },
    },
    cssFocused: {},
    notchedOutline: {},
})

const MSelect = (withStyles(styles)((props) => {

    const { field, form: { touched, errors, }, classes, required, ...other } = props
    const isError = Boolean((errors[field.name] && touched[field.name]))



    return (
        <FormControl variant="outlined" className={classes.formControl} error={isError} {...other}>
            <InputLabel ref={ref => {

            }}
                variant="outlined" required={required} htmlFor="age-native-simple">{props.label}</InputLabel>
            <Select
                {...field}
                {...other}
                variant="outlined"
                input={
                    <OutlinedInput
                        labelWidth={200}
                        classes={
                            {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }
                        name="age"
                        id="outlined-age-simple"
                    />
                }
            >
                <MenuItem value="">
                    <div style={{ color: '#B3B3B3' }}>
                        {props.placeholder || props.label}
                    </div>
                </MenuItem>
                {props.children}
            </Select>

            {isError && <FormHelperText>{errors[field.name]}</FormHelperText>}

        </FormControl>
    )
}))

function NumberFormatCustom(props) {
    const { inputRef, onChange, name, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            decimalScale={2}
            onValueChange={values => {
                onChange({
                    target: {
                        value: values.value,
                        name: name
                    },
                });
            }}
            thousandSeparator
            prefix=""
        />
    );
}


const MTextField = withStyles(styles)(
    (props) => {

        const { field, form: { touched, errors, isSubmitting }, classes, onChange, type, InputLabelProps, ...other } = props
        const isError = Boolean((errors[field.name] && touched[field.name]))

        useEffect(() => {
            // document.getElementById(field.name).readOnly = true;
            if (!isError || !isSubmitting) return;

            if (isError) {
                document.getElementById(field.name).focus()
            }
        })

        return (
            <div className={classes.filed}>
                <TextField
                    {...other}
                    id={field.name}
                    InputLabelProps={{
                        classes: {
                            root: classes.cssLabel,
                            focused: classes.cssFocused,
                        },
                        ...InputLabelProps
                    }}
                    type={type === 'password' ? type : (type === 'tax' ? 'number' : 'text')}
                    onWheel={event => { event.preventDefault(); }}
                    InputProps={{
                        inputComponent: type === 'number' ? NumberFormatCustom : 'input',
                        classes: {
                            root: classes.cssOutlinedInput,
                            focused: classes.cssFocused,
                            notchedOutline: classes.notchedOutline,
                        },
                        ...props.InputProps,
                        onChange: event => {

                            var e = event
                            if (props.maxLength) {
                                e.target.value = e.target.value.slice(0, props.maxLength);
                            }

                            if (props.positive && e.target.value.length > 0) {
                                e.target.value = e.target.value.replace('-', "")
                            }
                            if (props.max && e.target.value > props.max) {
                                e.target.value = props.max
                            }
                            if (props.min && e.target.value < props.min) {
                                e.target.value = props.min
                            }


                            field.onChange(e)
                        }
                    }}
                    variant="outlined" {...field} error={isError} helperText={isError && errors[field.name]} />
            </div>

        )
    }
)



const MyTextField = withStyles(styles)(
    (props) => {

        const { classes, onChange, InputLabelProps, ...other } = props
        return (
            <TextField
                InputLabelProps={{
                    classes: {
                        root: classes.cssLabel,
                        focused: classes.cssFocused,
                    },
                    ...InputLabelProps
                }}
                InputProps={{
                    classes: {
                        root: classes.cssOutlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                    },
                    onChange
                }}
                variant="outlined"
                {...other}
            />

        )
    }
)

const Input = withStyles(styles)(
    (props) => {
        const { classes, required, InputLabelProps, ...other } = props;
        const { field, form: { touched, errors, } } = props
        const isError = Boolean((errors[field.name] && touched[field.name]))

        return (

            <FormControl className={classes.formControl} error={isError} >
                <InputLabel required={required} shrink={InputLabelProps.shrink} htmlFor="name-error">{props.label}</InputLabel>
                <MInput {...field}   {...other} />
                {isError && <FormHelperText>{errors[field.name]}</FormHelperText>}

            </FormControl>
        )
    }
)

export {
    MTextField,
    MSelect,
    Input,
    MyTextField,
}