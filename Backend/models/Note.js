const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    title:{
        type: String,
        default:'----'
    },
    description:{
        type: String,
        default:'----'
    },
    msg:{
        type: String,
        default:'----'
    },
    tag:{
        type: String,
        default:'----'
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NoteSchema);