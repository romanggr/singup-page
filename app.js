const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https")


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})


app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };


    const JSONData = JSON.stringify(data);
    const url = "https://us13.api.mailchimp.com/3.0/lists/3540d106be";
    const options = {
        method: "POST",
        auth: "romanggr:e25ea82fb13a08a0fe13c5026ea5d335"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else { res.sendFile(__dirname + "/failure.html") }



        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(JSONData);
    request.end();

});




app.listen(process.env.PORT || 3000, function () {
    console.log("server run on port 3000");
})

app.post("/failure", function (req, res) {
    res.redirect("/")
})

//e25ea82fb13a08a0fe13c5026ea5d335-us13  apikey

//3540d106be                             id