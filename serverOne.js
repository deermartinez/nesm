var express = require('express');
 var path = require('path');
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
// app.get('/', (req, res) => res.send('This is the Home Page for My APP'));
var app = express();
var PORT = 3000;
// var env = require('dotenv').load();
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session());
var models = require("./app/models");
 
//Sync Database
// models.sequelize.sync().then(function() {
 
//    // console.log('Nice! Database looks fine')
 
// }).catch(function(err) {
 
//    // console.log(err, "Something went wrong with the Database Update!")
 
// });
 
app.listen(PORT, function(err) {
 
    if (!err)
        console.log("Local Host running on port 3000");
    else console.log(err)
 
});
app.get('/home', (req, res) => {
 
    res.sendFile(path.join(__dirname + '/index.html'));
 
});
app.get('/Contract', (req, res) => {
 
    res.sendFile(path.join(__dirname + '/Contact.html'));
 
});
