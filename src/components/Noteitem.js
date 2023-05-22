import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    const dnote = async () => {
        var proceed = window.confirm("Are you sure you want to delete the Note?");
        if (proceed) {
            await deleteNote(note._id)
        }
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="text-center card-body">


                    <h5 className="card-title">{note.title}</h5>
                    <hr></hr>
                    <p className="card-text">{note.description}</p>
                    <hr></hr>
                    <p className="card-text">{note.msg}</p>
                    <hr></hr>
                    <p className="card-text">{note.tag}</p>
                    <i className="fad fa-trash-alt mx-2 fa-lg"style={{color:"#1d6ffc"}} onClick={() => { dnote() }}></i>
                    <i className="fad fa-edit mx-2 fa-lg" style={{color:"#1d6ffc"}} onClick={() => { updateNote(note) }}></i>
                    {/* <i class="fad fa-eye-slash fa-lg" style={{color:"#1d6ffc"}}></i> */}
                </div>
            </div>
        </div>
    )
}

export default Noteitem
