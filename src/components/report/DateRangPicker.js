import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import AdapterMoment from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import defaultLocale from "date-fns/locale/th";

export const DateRange = ({ label,onChange}) => {
    const [value, setValue] = React.useState([null, null]);

    return (
        <div className="form-input">
            {label && <label>{label}</label>}
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={defaultLocale}>
                <DateRangePicker
                    startText="วันที่เริ่ม"
                    endText="วันที่สิ้นสุด"
                    value={value}
                    inputFormat="dd MMMM yyyy"
                    onChange={(newValue) => {
                        setValue(newValue);
                        onChange(newValue)
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <input ref={startProps.inputRef} {...startProps.inputProps} placeholder="วันที่เริ่ม" className="input-date" />
                            <Box sx={{ mx: 2 }}> ถึง </Box>
                            <input ref={endProps.inputRef} {...endProps.inputProps} placeholder="วันที่สิ้นสุด" className="input-date" />
                        </React.Fragment>
                    )}
                />
            </LocalizationProvider>
        </div>

    );
}