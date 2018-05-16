var express = require("express");
var bodyParser = require("body-parser");
var mongo = require("mongoose");
var session = require('express-session');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var db = mongo.connect("mongodb://localhost:27017/tree", function(err, response){
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to " + db, " + ", response);
    }
});

var app = express();

app.use(session({
    secret: 'session123',
    resave: true,
    saveUninitialized: true,
    cookie:{
        httpOnly:false,
        expires:false
    }
}));
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended: true}));


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    birthday: String,
    age: Number,
    sex: String,
    education: String,
    country: String,
    state: String,
    address: String,
    aboutme: String  
}, { versionKey: false });

var BranchesSchema = new Schema({
    id: String,
    name: String,
    level: Number,
    next: Array,
    previous: Array,
    description: String
}, { versionKey: false });

var UserInfoSchema = new Schema({
    email: String,
    firstname: String,
    lastname: String,
    birthday: String,
    age: Number,
    sex: String,
    education: String,
    country: String,
    state: String,
    address: String,
    aboutme: String
}, { versionKey: false});

var model = mongo.model('users', UsersSchema, 'users');
var branchModel = mongo.model('branches', BranchesSchema, 'branches');
var userInfoModel = mongo.model('user', UserInfoSchema, 'user');

//Register user, save username and password (in hash) in database
app.post("/api/regUser", function(req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            var user = { 
                username: req.body.username, 
                password: hash,
                email: '',
                firstname: '',
                lastname: '',
                birthday: '',
                age: NaN,
                sex: '',
                education: '',
                country: '',
                state: '',
                address: '',
                aboutme: ''
            };
            var mod = new model(user);
            mod.save(function(err, data) {
                if(err){
                    res.send(err);
                } else {
                    res.send({ data: "Register Successfully" });
                }
            });
        });
    });
});

//Verify login password correct or wrong, if correct, save username in session
app.post("/api/verifyUser", function(req, res) {
    model.find({username: req.body.username}, function(err, data) {      
        if (err) {
            res.send(err);
        } else {
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if (result) {
                    req.session.username = data[0].username;
                    req.session.save();
                    res.send({data: req.session.username});
                } else {
                    res.send('false');
                }
            });
        }
    });
});

//Verify username already exist in database or not
app.post("/api/verifyUsername", function(req, res) {
    model.find({ username: req.body.username }, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//Verify user login or not, by checking session if have username
app.get("/api/checkLogin", function (req, res) {
    if(req.session.username) {
        res.send({data: req.session.username});
    } else {
        res.send('false');
    }
});

//Get branches data
app.get("/api/getBranches", function (req, res) {
    branchModel.find(
        {},
        function (err, data) {
            if(err){
                res.send(err);
            } else {
                res.send(data);
            }
        }
    );
});

//User sign out, session destroy
app.get("/api/signOut", function (req, res) {
    req.session.destroy(()=> {
        res.send('false')
    });
});

//Update user info in database
app.post("/api/updateUser", function (req, res) {
    model.find({ username: req.body.username }, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            var user = {
                username: data[0].username,
                password: data[0].password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                birthday: req.body.birthday,
                age: req.body.age,
                sex: req.body.sex,
                education: req.body.education,
                country: req.body.country,
                state: req.body.state,
                address: req.body.address,
                aboutme: req.body.aboutme
            };
            var mod = new model(user);
            mod.save(function(err, data) {
                if(err){
                    res.send(err);
                } else {
                    res.send({ data: "Update Successfully" });
                }
            });
        }
    });    
});

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});