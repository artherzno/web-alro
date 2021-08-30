import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AdapterMoment from '@material-ui/lab/AdapterMoment';
import OverwriteMomentBE from '../../utils/OverwriteMomentBE'

import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import defaultLocale from "date-fns/locale/th";
import moment from 'moment';

export const DateRange = ({ label,onChange}) => {
    const [value, setValue] = React.useState([null, null]);

    return (
        <div className="form-input">
            {label && <label>{label}</label>}
            <LocalizationProvider dateAdapter={OverwriteMomentBE} >
                <DateRangePicker
                    startText="วันที่เริ่ม"
                    endText="วันที่สิ้นสุด"
                    value={value}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                        setValue(newValue);
                        onChange(newValue)
                    }}
                    renderInput={(startProps, endProps) => {

                        console.log("startProps", startProps)
                        return (

                            <React.Fragment>
                                <input ref={startProps.inputRef} {...startProps.inputProps} value={startProps.inputProps.value ? moment(startProps.inputProps.value, 'DD/MM/YYYY').add(543, 'year').format('DD/MM/YYYY') : '' } placeholder="วันที่เริ่ม" className="input-date" />
                                <Box sx={{ mx: 2 }}> ถึง </Box>
                                <input ref={endProps.inputRef} {...endProps.inputProps} value={ endProps.inputProps.value ? moment(endProps.inputProps.value, 'DD/MM/YYYY').add(543, 'year').format('DD/MM/YYYY') : '' } placeholder="วันที่สิ้นสุด" className="input-date" />
                            </React.Fragment>
                        )
                    }}
                />
            </LocalizationProvider>
        </div>

    );
}

// {...endProps.inputProps }