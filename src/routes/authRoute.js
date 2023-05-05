express = require('express');
const authmdl = require('./../model/UserDetails');
const bcrypt = require('bcrypt') ;
const otpmodel = require('./../model/otpofNum.js');


//lets create a router
const authRouter = express.Router();

//route for user existance 
authRouter.post("/check", checkExistance) ;

async function checkExistance(req, res) {
    let num = req.body.email;
    let data = await authmdl.findOne({ email: num });
    console.log(req.body);

    if (data) {
        //console.log('if login');
        res.json({ 'bol': "true" });
    }
    else {
        //console.log('else login');

        res.json({ 'bol': "false" });
    }
}


//routes for login
authRouter.post("/login", checkPassword);

async function checkPassword(req, res) {
    let pass = req.body.password;
    let num = req.body.email;
    let data = await authmdl.findOne({ email: num });
    // console.log(data) ;
    bcrypt.compare(pass, data.password, async function (err, result) {
        if (result) {
            const salt = await bcrypt.genSalt(9);
            let hashmail = await bcrypt.hash(req.body.email, salt);
            res.json({ 'bol': hashmail });
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });

}


//routes for signup
authRouter.post("/signup", addUser);

async function addUser(req, res) {
    let data = req.body;
    let otp = req.body.otp ;
    let otpdetails = await otpmodel.findOne({email: data.email}) ;
    if(otp==otpdetails.otp){
        const salt = await bcrypt.genSalt(9);

        let hashpass = await bcrypt.hash(req.body.password, salt);
        let dat = {
            'name': req.body.name,
            'email': req.body.email,
            'password': hashpass
        }
        await authmdl.create(dat);
        // console.log(dat);
        res.json({ "bol": "true" });
    }
    else {
        res.json({ "bol": "false" });
    }
    
}


//routes for forgetpassword/changePassword/change data
authRouter.post("/forgetPassword", changedata);

async function changedata(req, res) {
    let data = req.body;
    let otp = req.body.otp;
    let otpdetails = await otpmodel.findOne({ "email": data.email });
    if (otp == otpdetails.otp) {
        const salt = await bcrypt.genSalt(9);
        let hashpass = await bcrypt.hash(req.body.password, salt);
        let number = req.body.email;
        await authmdl.findOneAndUpdate({ email: number }, {password:hashpass});
        res.json({ 'bol': 'true' });
    }
    else {
        res.json({ "bol": "false" });
    }


    


}


//made for profile buildup
authRouter.post("/getdata", getdatta);

async function getdatta(req, res) {


    let hshml = req.body.hashmail;
    let email = req.body.email ;
    bcrypt.compare(email, hshml, async function (err, result) {
        if (result) {
            let data = await authmdl.findOne({ email: email });
            if (data) {

                res.json({
                    'name': data.name,
                    'email': data.email
                });

            }
            else {
                res.json({ 'bol': false });
            }
        }
        else {
            res.json({ 'bol': 'false' });
        }
    });
    
    

}


module.exports = authRouter;