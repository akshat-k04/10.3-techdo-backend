express = require('express');
const nodemailer = require("nodemailer");
const otpmodel = require('./../model/otpofNum.js');


const router = express.Router();



router.post("/send", sendotp);


async function sendotp(req, res) {
    let otp = Math.floor(
        Math.random() * (999999 - 100000 + 1) + 100000
    );
    console.log(otp);
    // let phone = req.body.phone;
    let email = req.body.email;
    let data = await otpmodel.findOne({ "email": email });
    // let data = "a_khandelwal@ch.iitr.ac.in" ;
    if (data == null || data.email == null || data.email.length == 0) {
        await otpmodel.create({ "email": email, "otp": otp });
    }
    else {
        await otpmodel.findOneAndUpdate({ "email": email }, { "otp": otp });
    }




    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "tech.techdo@gmail.com", // generated ethereal user
            pass: "rqfwkygsfmscwewp", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"clusters-techDo" <tech.techdo@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "OTP VERIFICATION", // Subject line
        // text: "hello user, \n the otp is"+otp, // plain text body
        html: `<b>hello user, \n the otp is ${otp}</b>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.json({ "bol": "done" });
}



module.exports = router;