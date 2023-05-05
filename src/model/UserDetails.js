const mongoose = require('mongoose');



//lets create a schema
const userCred = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});



//lets create a model
const authModel = mongoose.model('UserCred', userCred);

module.exports = authModel;