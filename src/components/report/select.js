import React from 'react'

export const Select = ({ 
    onChange = () => { } ,
    emptyLabel="All",
    isNotEmpty=false,
    options=[],
    label
}) => {

    return (
        <div>
            <div className="form-input">
                {label && <label>{label}</label>}
                {/* <input autoFocus type="text" name="username" value={dataLogin.username} placeholder="" onChange={handleChange} onFocus={() => setErr(false)} /> */}
                <div className="select-wrapper">
                    <select
                        className="select"
                        onChange={onChange}
                    >
                        {isNotEmpty ? null : <option value={''}>{emptyLabel}</option>}
                        {options && options.map(value => {
                            // return <option key={op[idFieldName]} value={op[idFieldName]}>{renderLabel(op)}</option>
                            return <option key={value.value} value={value.value} label={value.label}>{value.label}</option>
                        })}
                    </select>
                </div>
                
            </div>
        </div>
    )
}