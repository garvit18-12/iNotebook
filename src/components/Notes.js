import React, { useContext, useRef, useEffect } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import "../Notes.css"
import { useState } from 'react';

const Notes = () => {
    const context = useContext(noteContext);
    let { notes, getNotes , editNote} = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", emsg: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)
    useEffect(() => {
        getNotes()
    })

    

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, emsg: currentNote.msg, etag: currentNote.tag})
    }


    if (notes.length === 0) {
        notes = "Nothing to preview"
    }
    else {
        notes = notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })

    }
    const handleClick = async (e) => {
        editNote(note.id, note.etitle, note.edescription, note.emsg, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        
    }
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emsg" className="form-label">Note Message</label>
                                    <input type="text" value={note.emsg} className="form-control" id="emsg" name="emsg" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" id="taglabel" className="form-label">Tags(Separated by a comma,Only one tag allowed)</label>
                                    <input type="text" id="etag" value={note.etag} name="etag" onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="mdiv" className="row my-3 text-center">
                {notes}
            </div>

        </>
    )
}

export default Notes
