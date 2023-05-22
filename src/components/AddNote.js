import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import "../addNote.css"
import { Link } from "react-router-dom";


const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "----", description: "----", msg: "----", tag: "Default" })

    const handleClick = async(e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.msg, note.tag);
        wait(2)
        document.getElementById("hsd").click()
        
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    function wait(sec) {
        const date = Date.now();
        let currentDate = null;
        do {
          currentDate = Date.now();
        } while (currentDate - date < sec*1000);
      }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="msg" className="form-label">Note Message</label>
                    <input type="text" className="form-control" id="msg" name="msg" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" id="taglabel" className="form-label">Tags(Separated by a comma,Only one tag allowed)</label>
                    <input type="text" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                <Link id="hsd" className="" to="/"></Link>
            </form>
        </div>
    )
}

export default AddNote
