import React  from "react";
import './inputControl.css'

const InputControl=({label, error, ...props})=>{
    return (
        <div className="input-container">
        {label && <label>{label}</label>}
        <input type="text" className={error ? "input-error" : ""} {...props}  />
        {error && <span className="error-message">{error}</span>}
        </div>
    )
}
export default InputControl;