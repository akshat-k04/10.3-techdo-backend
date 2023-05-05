const mongoose = require('mongoose');
const otpschema = mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: Number,
        required: true,
    },
});

const otpmodel = mongoose.model('otp', otpschema);

module.exports = otpmodel;