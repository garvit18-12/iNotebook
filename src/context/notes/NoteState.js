import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGE1MTY5Y2U4N2NjOGI0ZTE4ODQ4In0sImlhdCI6MTY4NDM1Nzk0MH0.gNJbTFqJnby6sZrv5nbSEJdSvImiWtLAihJFr88D4lc"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, msg, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGE1MTY5Y2U4N2NjOGI0ZTE4ODQ4In0sImlhdCI6MTY4NDM1Nzk0MH0.gNJbTFqJnby6sZrv5nbSEJdSvImiWtLAihJFr88D4lc"
      },
      body: JSON.stringify({ title, description, msg, tag })
    });
    const js = await response.json()
    console.log(js)
    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6460a5169ce87cc8b4e18848",
      "title": title,
      "description": description,
      "msg": msg,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGE1MTY5Y2U4N2NjOGI0ZTE4ODQ4In0sImlhdCI6MTY4NDM1Nzk0MH0.gNJbTFqJnby6sZrv5nbSEJdSvImiWtLAihJFr88D4lc"
      },
    });
    const jso = await response.json()
    console.log(jso)
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  // Edit a Note
  const editNote = async (id, title, description, msg, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGE1MTY5Y2U4N2NjOGI0ZTE4ODQ4In0sImlhdCI6MTY4NDM1Nzk0MH0.gNJbTFqJnby6sZrv5nbSEJdSvImiWtLAihJFr88D4lc"
      },
      body: JSON.stringify({title, description, msg, tag})
    })
    const json = response.json();
    console.log(json) 

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title===""?"----":title;
        notes[index].description = description===""?"----":description;
        notes[index].msg = msg===""?"----":msg;
        notes[index].tag = tag===""?"----":tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  const hideNote = (id)=>{
    
  }

  return (
    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
        {props.children}
      </NoteContext.Provider>
    </>
  )

}
export default NoteState;