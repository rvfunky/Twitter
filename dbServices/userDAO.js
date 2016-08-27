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
                callback(results);

            } else {
                callback(results);
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
exports.getStats=function(email,items,callback){
    // 1st para in async.each() is the array of items
    queries[0]="select count(tweet_id) as statistic from tweets where email='"+email+"'";
    queries[1]="select count(following_email) as statistic from follow where follower_email='"+email+"'";
    queries[2]="select count(follower_email) as statistic from follow where following_email='"+email+"'";
    stats=[];
    async.each(items, function(item,cb){
                // Call an asynchronous function, often a save() to DB
                var query;
                if (item == "tweets") {
                    query = queries[0];
                }
                else if (item == "following") {
                    query = queries[1];
                }
                else  {
                    query = queries[2];
                }
                mysql.fetchData(function (err, results) {
                    if (err) {
                        callback2(results);
                        cb();

                    } else {
                        callback2(item,results[0].statistic);
                        cb();
                    }
                }, query);


        }, function (err) {
            callback(stats);
        }
    );
};
