var mysqlformat=require('mysql');
var mysql = require('../routes/mysql');
var async=require('async');
var stats=[];
var queries=[];
var callback2=function(item,statistic){
    stats[item]=statistic;
}
exports.createUser=function(fullname,email,password,callback) {
    var insertquery = "insert into users(fullname,email,password) values(?,?,?)";
    var params = [fullname, email, password];
    var finalquery = mysqlformat.format(insertquery, params);
    
        mysql.fetchData(function (err, results) {
            if (err) {
                callback({statusCode:404,result:results});

            } else {
                callback({statusCode:200,result:results});
            }
        }, finalquery);
    
};
exports.authenticateUser=function(email,password,callback){
    var query="select *from users where email='"+email+"' and password='"+password+"'";
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
            console.log(results);
        }
    }, query);
    
};
exports.searchUser=function(searchEmail,callback){
    
    var query="select fullname,email from users where email='"+searchEmail+"'";
    console.log(query);
    mysql.fetchData(function(err,results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
            console.log(results);
        }
    },query);
};
exports.getStats=function(email,cb){
    async.parallel({
        name: function(callback) {
            var query="select fullname from users where email='"+email+"'";
            mysql.fetchData(function (err, results) {
                if (err) {
                    callback(null,results);

                } else {
                    callback(null,results[0].fullname);
                                    }
            }, query);
        },
        following: function(callback) {
            var query="select count(*) as following from follow where follower_email='"+email+"'";
            mysql.fetchData(function (err, results) {
                if (err) {
                    callback(null,results);

                } else {
                    callback(null,results[0].following);
                                    }
            }, query);
        },
        followers: function(callback) {
            var query="select count(*) as followers from follow where following_email='"+email+"'";
            mysql.fetchData(function (err, results) {
                if (err) {
                    callback(null,results);

                } else {
                    callback(null,results[0].followers);
                }
            }, query);
        },
        tweetCount: function(callback) {
            var query="select count(*) as tweetCount from tweets where email='"+email+"'";
            mysql.fetchData(function (err, results) {
                if (err) {
                    callback(null,results);

                } else {
                    callback(null,results[0].tweetCount);
                }
            }, query);
        },
    }, function(err, results) {
        // results is now equals to: {one: 'abc\n', two: 'xyz\n'}
        cb(results);
    });
};
exports.updateProfile=function(email,fullname,twitterHandle,gender,birthday,mobile,callback){
    var query="replace into profile values('"+email+"','"+fullname+"','"+twitterHandle+"','"+gender+"','"+birthday+"','"+mobile+"')";
    console.log(query);
    mysql.fetchData(function(err,results) {
        if (err) {
            callback(results);
            console.log(err);

        } else {
            callback(results);
            console.log(results);
        }
    },query);
};
exports.getProfile=function(email,callback){
    var query="select *from profile where email='"+email+"'";
    console.log(query);
    mysql.fetchData(function(err,results) {
        if (err) {
            callback(results);
            console.log(err);

        } else {
            callback(results);
            console.log(results);
        }
    },query);
};