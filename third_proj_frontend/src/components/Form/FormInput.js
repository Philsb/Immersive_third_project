import React from 'react'

const FormInput = (props) => {
    const block = "form-input";
    const {type, label, name, className} = props;   
    return (
        <div className={`${block}`}>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} required/>
        </div>
    )
}

export default FormInput