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
}, { versionKey: false });

var BranchesSchema = new Schema({
    id: String,
    name: String,
    level: Number,
    next: Array,
    previous: Array,
    description: String
}, { versionKey: false });

var model = mongo.model('users', UsersSchema, 'users');
var branchModel = mongo.model('branches', BranchesSchema, 'branches');

app.post("/api/regUser", function(req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            var user = {username: req.body.username, password: hash};
            var mod = new model(user);
            mod.save(function(err, data) {
                if(err){
                    res.send(err);
                } else {
                    res.send({ data: "新用户注册成功!!" });
                }
            });
        });
    });
});

app.post("/api/verifyUser", function(req, res) {
    model.find({username: req.body.username}, function(err, data) {      
        if (err) {
            res.send(err);
        } else {
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if (result) {
                    req.session.username = data[0].username;
                    if (req.session.count) req.session.count ++;
                    else req.session.count = 1;
                    req.session.save();
                    res.send({data: req.session.username});
                } else {
                    res.send('false');
                }
            });
        }
    });
});

app.post("/api/verifyUsername", function(req, res) {
    model.find({username: req.body.username}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.get("/api/checkLogin", function (req, res) {
    if(req.session.username) {
        res.send({data: req.session.username});
    } else {
        res.send('false');
    }
});

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

app.get("/api/signOut", function (req, res) {
    req.session.destroy(()=> {
        res.send('false')
    });
});

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});