express = require('express');
var cors = require("cors");
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

//import files
const authRouter = require('./src/routes/authRoute');
const otprouter = require('./src/routes/otpRoute.js');
const todorouter = require('./src/routes/todoroute.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

port = process.env.PORT || 3000;
app.listen(port, () => { console.log('server is listening at port 3000') });

app.use("/auth", authRouter);
app.use("/otp", otprouter);
app.use("/todo", todorouter);



const link = 'mongodb+srv://techtechdo:vLo2splBGfEnqrEO@auth.ea6v4bi.mongodb.net/';
mongoose.connect(link)
    .then(function () {
        console.log('db connected');

    })
    .catch(function (err) {
        console.log(err);
    });

