import React  from "react";
import './inputControl.css'

const InputControl=({label,...props})=>{
    return (
        <div className="input-container">
        {label && <label>{label}</label>}
        <input type="text" {...props}  />
        </div>

    )
}
export default InputControl;