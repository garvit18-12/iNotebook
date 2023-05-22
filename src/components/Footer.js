import React from 'react'
import "../footer.css"

const Footer = () => {
    function onc(e){
        
    }
    return (
    <>
        <div id="maindiv">
                <a href="#" className="btn abc btn-outline-primary border-primary-4" onClick={onc}>Notes</a>
                <a href="#" className="btn abc btn-outline-primary border-primary-4" onClick={onc}>To-Do's</a>
        </div>
    </>
    )
}

export default Footer