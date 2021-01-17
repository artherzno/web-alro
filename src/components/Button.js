import React from 'react';

function Button(props) {
    return (
        <button type="button" className={`form-button btn btn-${props.color}`}>
            <p>{props.text}</p>
        </button>
    )
}

export default Button;
