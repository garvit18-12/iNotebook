import React from 'react'
import { Link } from "react-router-dom";


function DropDown() {
    const triggerWeb=()=>{
        document.getElementById("h").click()
    }
    let current_choice = "All Notes"
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle text-dark bg-white mx-4 my-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {current_choice}
            </button>            
            <button className="btn btn-primary rounded-circle" type="button" id="btnholas" onClick={()=>{triggerWeb()}}>
                +
            </button>            
            <Link id="h" className="d-none" to="/addnote"></Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href='/'>Hidden Notes</a></li>
                <li><a className="dropdown-item" href="/">Recently Deleted</a></li>            </ul>
            
        </div>
    )
}

export default DropDown