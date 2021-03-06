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
    user_id: Number,
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    birthday: Object,
    gender: String,
    education: String,
    country: String,
    state: String,
    address: String,
    aboutme: String
    
}, {
    versionKey: false
});

var BranchesSchema = new Schema({
    id: String,
    name: String,
    level: Number,
    next: Array,
    previous: Array,
    description: String
}, {
    versionKey: false
});

var CareersSchema = new Schema({
    No: String,
    Name: String,
    CName: String,
    Sub: Array
}, {
    versionKey: false
});

var EarlyedusSchema = new Schema({
    age: String,
    content: Array,
    help: Object,
    alert: Object
}, {
    versionKey: false
});

var StoriesSchema = new Schema({
    name: String,
    num: Number,
    book: String,
    set: Number
}, {
    versionKey: false
});

var UserinfoSchema = new Schema({
    user_id: Number,
    username: String,
    age: Number,
    height: Number,
    weight: Number,
    height_unit : String,
    weight_unit : String
}, {
    versionKey: false
});

var SportsSchema = new Schema({
    sport_id: Number,
    name: String,
    unit: String,
    description: String,
    K: Number
}, {
    versionKey: false
});

var WorkoutSchema = new Schema({
    user_id: Number,
    workout: Object
}, {
    versionKey: false
});

var CountersSchema = new Schema({
    _id: String,
    sequence_value: Number
}, {
    versionKey: false
});

var model = mongo.model('users', UsersSchema, 'users');
var branchModel = mongo.model('branches', BranchesSchema, 'branches');
var careerModel = mongo.model('careers', CareersSchema, 'careers');
var eduModel = mongo.model('earlyedus', EarlyedusSchema, 'earlyedus');
var storyModel = mongo.model('stories', StoriesSchema, 'stories');
var userinfoModel = mongo.model('userinfo', UserinfoSchema, 'userinfo');
var sportsModel = mongo.model('sports', SportsSchema, 'sports');
var workoutModel = mongo.model('workouts', WorkoutSchema, 'workouts');
var counterModel = mongo.model('counters', CountersSchema, 'counters');

//Register user, save username and password (in hash) in database
//Auto increment user_id for user
app.post("/api/regUser", function(req, res) {
    var seq_value;
    counterModel.findOneAndUpdate(
        {_id : "userid"}, 
        {$inc:{sequence_value:1}}, 
        {new: true},
        function(err, doc) {
            if (err) {
                console.log("user counter has err");
            } else {
                seq_value = doc.sequence_value;
            }
        }
    );
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            var user = {
                user_id: seq_value,
                username: req.body.username, 
                password: hash
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
    model.find({ username: req.body.username }, function(err, data) {    
        if (data.length > 0) {
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if (result) {
                    req.session.username = data[0].username;
                    req.session.save();
                    res.send({data: req.session.username});
                } else {
                    res.send('false');
                }
            });
        } else {
            res.send('false');
        }
    });
});

//Verify input password correct or wrong, if correct, user can reset password
app.post("/api/verifyPassword", function(req, res) {
    model.find({ username: req.body.username }, "password", function(err, data) {    
        if (data.length > 0) {
            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                if (result) {
                    res.send('true');
                } else {
                    res.send('false');
                }
            });
        } else {
            res.send('false');
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

//Get users info from database, using session.username
app.get("/api/getUsersInfo", function (req, res) {
    if (req.session.username) {
        model.find({ username: req.session.username }, { _id: false, password: false }, function(err,data) {
            if (data.length > 0) {
                res.send(data[0]);
            } else {
                res.send('false');
            }
        });
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

//Update user info in database. Find the _id of the user first, then findById to update user
app.post("/api/updateUser", function (req, res) {
    model.find({ username: req.body.username }, function(err, data) {
        if (data.length > 0) {
            model.findById(data[0]._id, function (error, user) {
                if (error) {
                    res.send(error);
                } else {
                    if (req.body.email) user.email = req.body.email;
                    if (req.body.firstname) user.firstname = req.body.firstname;
                    if (req.body.lastname) user.lastname = req.body.lastname;
                    if (req.body.birthday) user.birthday = req.body.birthday;
                    if (req.body.gender) user.gender = req.body.gender;
                    if (req.body.education) user.education = req.body.education;
                    if (req.body.country) user.country = req.body.country;
                    if (req.body.state) user.state = req.body.state;
                    if (req.body.address) user.address = req.body.address;
                    if (req.body.aboutme) user.aboutme = req.body.aboutme;
                    user.save(function(er, data2) {
                        if(er){
                            res.send(er);
                        } else {
                            res.send({ data2: "Update Successfully" });
                        }
                    });
                }
            });    
        } else {
            res.send('false');
        }
    });    
});

//Reset password, save username and password (in hash) in database
app.post("/api/resetPassword", function(req, res) {
    model.find({ username: req.body.username }, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            model.findById(data[0]._id, function (error, user) {
                if (error) {
                    res.send(error);
                } else {
                    bcrypt.genSalt(saltRounds, function(er, salt) {
                        bcrypt.hash(req.body.password, salt, function(er, hash) {
                            user.password = hash;
                            user.save(function(erro, data2) {
                                if(erro){
                                    res.send(erro);
                                } else {
                                    res.send({ data2: "Register Successfully" });
                                }
                            });
                        });
                    });
                }
            });
        }
    });
});

//Insert, delete, update and select careers in database
app.post("/api/modifyCareer", function(req, res) {
    if (req.body.order === "insert") {
        careerModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        careerModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        careerModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        careerModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

//Insert, delete, update and select earlyedu in database
app.post("/api/modifyEarlyedu", function(req, res) {
    if (req.body.order === "insert") {
        eduModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        eduModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        eduModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        eduModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

//Insert, delete, update and select story in database
app.post("/api/modifyStory", function(req, res) {
    if (req.body.order === "insert") {
        storyModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        storyModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        storyModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        storyModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

//Insert, delete, update and select userinfo in database
app.post("/api/modifyUserinfo", function(req, res) {
    if (req.body.order === "insert") {
        userinfoModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        userinfoModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        userinfoModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        userinfoModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

//Insert, delete, update and select sports in database
app.post("/api/modifySports", function(req, res) {
    if (req.body.order === "insert") {
        sportsModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        sportsModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        sportsModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        sportsModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

//Insert, delete, update and select workout in database
app.post("/api/modifyWorkout", function(req, res) {
    if (req.body.order === "insert") {
        workoutModel.insertMany(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "delete") {
        workoutModel.deleteMany(req.body.data, function(error) {
            if (error) {
                res.send(error);
            } else {
                res.send("deleted");
            }
        });
    } else if (req.body.order === "update") {
        console.log(req.body);
        workoutModel.update(req.body.data, req.body.new, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else if (req.body.order === "select") {
        workoutModel.find(req.body.data, function(error, doc) {
            if (error) {
                res.send(error);
            } else {
                res.send(doc);
            }
        });
    } else {
        console.log("receive false");
    }
    
});

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});