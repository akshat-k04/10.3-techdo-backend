express = require('express');
const todomdl = require('./../model/todomodel.js');
const bcrypt = require('bcrypt');



//lets create a router
const todo = express.Router();

// to get user todo 
todo.post('/get',getusertodo) ;

async function getusertodo(req,res){
    let hashmail = req.body.hashmail ;
    let email = req.body.email ;
    bcrypt.compare(email, hashmail, async function (err, result) {
        if (result) {
            let data = await todomdl.find({ email: email });
            res.json({ 'bol': data });
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });
}


// to update the todo 
todo.post('/update', updt);
async function updt(req, res) {
    let hashmail = req.body.hashmail;
    let email = req.body.email;
    bcrypt.compare(email, hashmail, async function (err, result) {
        if (result) {
            let data = {
                "email": req.body.email ,
                "date": req.body.date,
                "heading": req.body.heading,
                "details": req.body.details,
                "doneornot":req.body.doneornot,
                "priority":req.body.priority ,
                "unqid":req.body.unqid
            }
            await todomdl.findOneAndUpdate({ email: email,unqid: req.body.unqid },data);
            res.json({ 'bol': "true" });
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });
}


// to create the todo
todo.post('/add', adder);
async function adder(req, res) {
    let hashmail = req.body.hashmail;
    let email = req.body.email;
    bcrypt.compare(email, hashmail, async function (err, result) {
        if (result) {
            let data = {
                "email": req.body.email,
                "date": req.body.date,
                "heading": req.body.heading,
                "details": req.body.details,
                "doneornot": req.body.doneornot,
                "priority": req.body.priority,
                "unqid": req.body.unqid
            }
            await todomdl.create(data);
            res.json({ 'bol': "true" });
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });
}


// to delete the todo
todo.post('/delete', delt);
async function delt(req, res) {
    let hashmail = req.body.hashmail;
    let email = req.body.email;
    bcrypt.compare(email, hashmail, async function (err, result) {
        if (result) {
            let data = {
                "email": req.body.email,
                "date": req.body.date,
                "heading": req.body.heading,
                "details": req.body.details,
                "doneornot": req.body.doneornot,
                "priority": req.body.priority,
                "unqid": req.body.unqid
            }
            await todomdl.findOneAndDelete(data);
            res.json({ 'bol': "true" });
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });
}


module.exports = todo;
