const mongoose = require('mongoose');
const todoschema = mongoose.Schema({
    email: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    heading:{
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    doneornot: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    unqid:{
        type:String,
        required:true ,
    }
});

const todomodel = mongoose.model('todo', todoschema);

module.exports = todomodel;