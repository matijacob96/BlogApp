const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/blog';
const User = require("./models/user");

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app is listening to PORT ${PORT}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/user/login", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/user/login", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true },
        function(err) {
            if (err) throw err;
            User.find({
                username: req.body.username,
                password: req.body.password
            }, function(err, user) {
                if (err) throw err;
                if (user.length === 1) {
                    return res.status(200).json({
                        status: 'success',
                        data: user
                    })
                } else {
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Login Failed'
                    })
                }
            })
        })
})