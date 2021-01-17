import React from 'react';

function InputText(props) {
    return (
        <div className="form-input">
            <label>{props.label}</label>
            <input type={props.type} placeholder={props.placeholder} value={props.value} />
        </div>
    )
}

export default InputText;
