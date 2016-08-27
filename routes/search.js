var userDAO=require('../dbServices/userDAO');
var followDAO=require('../dbServices/followDAO');
var tweetsDAO=require('../dbServices/tweetsDAO');
exports.searchUser=function(req,res) {
    var searchEmail=req.body.data;
    

    userDAO.searchUser(searchEmail,function(result){
        if(result.length>0){
            json_responses = {
                "statusCode": 200,
                "result":result
                 
            }
            res.send(json_responses);
        } else {
            json_responses = {
                "statusCode": 401,
            }
            res.send(json_responses);
        }
    });
};
exports.followUser=function(req,res){
    var followingEmail=req.body.followingEmail;
    var followerEmail=req.session.email;
    console.log(followerEmail+' '+followingEmail);
    followDAO.followUser(followingEmail,followerEmail,function(result){
       if(result){
           json_responses={
               "statusCode":200
           }
           res.send(json_responses);
       } else{
           json_responses={
               "statusCode":401
           }
           res.send(json_responses);
       }
    });
};
exports.searchHashTags=function(req,res){
    var tag=req.body.data;
    tweetsDAO.searchHashTags(tag,function(result){
        if(result) {
            json_responses = {
                "statusCode": 200,
                "result":result
            }
            res.send(json_responses);
        } else{
                json_responses={
                    "statusCode":401
                }
                res.send(json_responses);
            }
    });
}