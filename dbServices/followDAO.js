var mysql = require('../routes/mysql');
var mysqlformat=require('mysql');
exports.followUser=function (followingEmail,followerEmail,callback) {
    var insertquery = "insert into follow(follower_email,following_email) values(?,?)";
    var params = [followerEmail,followingEmail];
    var finalquery = mysqlformat.format(insertquery, params);
    mysql.fetchData(function(err,results){
        if(results){
            callback(results);
        }
        else{
            callback(results);
        }
    },finalquery);
}
exports.getFollowingUsers=function(email,callback){
    var query="select u.fullname,f.following_email from users u,follow f where f.follower_email='"+email+"' and u.email=f.following_email;";
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
        }
    }, query);
}
exports.getFollowersUsers=function(email,callback){
    var query="select u.fullname,f.follower_email from users u,follow f where following_email='"+email+"' and u.email=f.follower_email";
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
        }
    }, query);
}