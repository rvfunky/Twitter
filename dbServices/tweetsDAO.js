var mysql = require('../routes/mysql');
exports.insertTweet=function(tweetData,email,callback){
    var query="insert into tweets(tweet,email) values('"+tweetData+"','"+email+"')";
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
        }
    }, query);
}
exports.getTweets=function(email,callback){
    var query="select u.fullname,u.email,t.tweet from users u,tweets t where u.email in (select following_email from follow where follower_email='"+email+"') and t.email=u.email";
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
        }
    }, query);

};
exports.searchHashTags=function (key,callback) {
    var query="select u.fullname,u.email,t.tweet from users u, tweets t where t.tweet like '%"+key+"%' and t.email=u.email";
    console.log(query);
    mysql.fetchData(function (err, results) {
        if (err) {
            callback(results);

        } else {
            callback(results);
        }
    }, query);

}