/**
 * Created by danh on 3/25/15.
 */
var requests = require('request');
var Q = require('q');
var dbconf = require('../config/db.js');

var dbServiceRootUrl = dbconf.dbServiceProtocol+'://'+dbconf.dbServiceHost+':'+dbconf.dbServicePort

var getUser = function(email){
    var deffered = Q.defer();
    requests.get(dbServiceRootUrl+"/users/"+email, function(err, res, body){
        if(err){
            deffered.reject(new Error(err));
        } else {
            deffered.resolve(JSON.parse(body));
        }
    });
    return deffered.promise;
}

exports.getUser = getUser;