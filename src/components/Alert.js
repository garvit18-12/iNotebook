import React from 'react'
import "../Alert.css"

const Alert = (props) => {
    return (
        <div id="mddiv" className='text-center w-100'>
            <div id="al" className="alert d-none alert-primary w-25 rounded-pill" style={{width: "75px"}} role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert;
