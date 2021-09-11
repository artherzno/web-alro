import * as React from 'react';
import Box from '@material-ui/core/Box';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DesktopDatePicker from '@material-ui/lab/DatePicker';
import OverwriteMomentBE from '../../utils/OverwriteMomentBE'

export const DatePicker = () => {
    const [value, setValue] = React.useState(new Date());

    return (
        <LocalizationProvider dateAdapter={OverwriteMomentBE}>
            <DesktopDatePicker
                label="Custom input"
                value={value}
                inputFormat="dd MMMM yyyy"
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <input ref={inputRef} {...inputProps} className="input-date"/>
                        {InputProps?.endAdornment}
                    </Box>
                )}
            />
        </LocalizationProvider>
    );
}