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
            console.log("in reject");
            deffered.reject(new Error(err));
        } else if(res.statusCode < 200 || res.statusCode >300){
            console.log("in bad status code")
            deffered.reject("Returned Status Code is "+res.statusCode);
        } else {
            deffered.resolve(JSON.parse(body));
            console.log("in resolve");
        }
    });
    return deffered.promise;
}

exports.getUser = getUser;