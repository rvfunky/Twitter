var tweetsDAO=require('../dbServices/tweetsDAO');
var userDAO=require('../dbServices/userDAO');
var async = require("async");

exports.insertTweet=function(req,res){
    var tweetData=req.body.tweetData;
    var email=req.session.email;
    tweetsDAO.insertTweet(tweetData,email,function(result){
      if(result){
          json_responses = {
              "statusCode": 200,
          }
          res.send(json_responses);
      } else {
          json_responses = {
              "statusCode": 401,
          }
          res.send(json_responses);
      }
       
    });
}
exports.insertRetweet=function(req,res){
    var email=req.session.email;
    var tweetData=req.body.tweet;
    var origTweeter=req.body.o_tweeter_name;
    tweetsDAO.insertRetweet(tweetData,email,origTweeter,function (result) {
        if(result) {
            json_responses = {
                "statusCode": 200,
            }
        }else{
            json_responses = {
                "statusCode": 401,
                }
            }
            res.send(json_responses);
    })
}
exports.getTweets=function(req,res){
    var email=req.session.email;
    tweetsDAO.getTweets(email,function(result){
        if(result){
            json_responses={
                "statusCode":200,
                "result":result
            }
            res.send(json_responses);
        }else{
            json_responses={
                "statusCode":401
            }
            res.send(json_responses);
        }

    });
}
exports.getStats=function(req,res){
    var email=req.session.email;
    userDAO.getStats(email,function(results){
            if(results){
            console.log(results);
            json_responses={
                "statusCode":200,
                "stats":results
            }
            res.send(json_responses);
        }else{
            json_responses={
                "statusCode":401
            }
            res.send(json_responses);
        }

    });

}