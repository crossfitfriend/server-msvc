/**
 * Created by danh on 3/25/15.
 */
var express = require('express');
var HttpStatus = require('http-status-codes');
var app = express();
var bodyParser = require('body-parser');
var Q = require('q');
var users = require('./users');
var achievements = require('./achievements');
var exercises = require('./exercises');

app.use(bodyParser.json());

app.listen(3000, function(){
    console.log("Listening on port 3000");
});

app.get('/achievements/:email', function(request, response){
    users.getUser(request.params.email).then(function(user){
        console.log("user = "+user);
        achievements.getAchievements(user.achievements).then(function(_achievements){
            user.achievements = _achievements;
            response.json(user);
        }).catch(function(err){
            response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({Error: err});
        });
    }).catch(function(err){
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({Error: err});
    });
});
