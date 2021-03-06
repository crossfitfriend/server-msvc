/**
 * Created by danh on 3/25/15.
 */
var requests = require('request');
var HttpStatus = require('http-status-codes');
var Q = require('q');
var dbconf = require('../config/db.js');

var dbServiceRootUrl = dbconf.dbServiceProtocol+'://'+dbconf.dbServiceHost+':'+dbconf.dbServicePort

var getCategory = function(id){
    var deffered = Q.defer();
    requests.get(dbServiceRootUrl+"/categories/"+id, function(err, res, body){
        if(err){
            deffered.reject(new Error(err));
        } else if(body == null){
            deffered.reject(new Error("Couldn't find category for id "+id));
        } else{
            deffered.resolve(JSON.parse(body));
        }
    });
    return deffered.promise;
};

exports.getCategory = getCategory;