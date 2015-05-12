/**
 * Created by danh on 3/25/15.
 */
var requests = require('request');
var Q = require('q');
var dbconf = require('../config/db.js');
var exercises = require('./exercises');
var categories = require('./categories');

var dbServiceRootUrl = dbconf.dbServiceProtocol+'://'+dbconf.dbServiceHost+':'+dbconf.dbServicePort

var getAchievement = function(id){

    var deffered = Q.defer();
    requests.get(dbServiceRootUrl+"/achievements/"+id, function(err, res, body){
        if(err){
            deffered.reject(new Error(err));
        }else if(body == null){
            deffered.reject(new Error("No achievement was found for id "+id));
        }else{
            //can't use Q.all since it returns a list of values for all deferred requests and I will not know
            //which value is from which promise.
            body = JSON.parse(body);
            exercises.getExercise(body.exercise).then(function (_exercise) {
                body.exercise = _exercise;
            }).then(function () {
                categories.getCategory(body.category).then(function (_category) {
                    body.category = _category;
                    deffered.resolve(body);
                })
            }).catch(function(err){
                    deffered.reject(err);
            });
        }
    });
    return deffered.promise;
};

var getAchievements = function(ids){
    var deffered = Q.defer();
    var promisses = [];
    try {
        ids.forEach(function (id) {
            promisses.push(getAchievement(id));
        });
        Q.all(promisses).then(function (values) {
            deffered.resolve(values);
        });
    } catch(e) {
        deffered.reject(new Error(e));
    }
    return deffered.promise;
};

exports.getAchievement = getAchievement;
exports.getAchievements = getAchievements;