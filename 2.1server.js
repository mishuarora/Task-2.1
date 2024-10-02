const express = require("express");
var nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post('/', (request, response) => {
    const firstname = request.body.fname;
    const lastname = request.body.lname;
    const email = request.body.email;
    const url = 'https://us14.api.mailchimp.com/3.0/lists/c8f19efa18';
    const options = {
        method: "POST",
        auth: "nimi:68a878232cc4d42c583be969990c8486-us14"
    };
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    };
    const jsonData = JSON.stringify(data);

    const req = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });
    req.write(jsonData);
    req.end();
    console.log(firstname, lastname, email);

   
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nnimish50@gmail.com',
            pass: 'rtrx kgis kcgq syvf'
        }
    });

    var mailOptions = {
        from: 'nnimish50@gmail.com',
        to: email, 
        subject: 'Deakin Newsletter',
        text: 'Thank you for signing up to Deakin Newsletter, WELCOME ABOARD!!!!!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});