const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const func = (string) => {
    return string ? string !== undefined : "NULL"
}
const Users = require('../models/User')

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        Note.deleteMany(notes)
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
], async (req, res) => {
    try {

        const { title, description, msg, tag } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description: func(description), msg: func(msg), tag: func(tag), user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, msg, tag } = req.body;
    // Create a newNote object
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (msg) { newNote.msg = msg };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
    // Find the note to be updated and update it


})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        noer = note.user;
        res.json({ "Success": "Note has been deleted by " + (await Users.findOne({ _id: noer }).select("name")).name });
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }


})

// ROUTE 5: Get All the Notes using: DELETE "/api/notes/deleteallnotes". Login required
router.delete('/deleteallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        notes.forEach(async(n)=>{
            await Note.deleteMany(n)

        })
        res.send({"Success":"Notes Deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router