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
    var items=['tweets','following','followers'];
    userDAO.getStats(email,items,function(result){
        console.log("working"+result);
        console.log(result['tweets']);
        if(result){
            json_responses={
                "statusCode":200,
                "tweetCount":result['tweets'],
                "followingCount":result['following'],
                "followersCount":result['followers']
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