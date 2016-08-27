var followDAO=require('../dbServices/followDAO');
exports.getFollowingUsers=function(req,res){
    var email=req.session.email;
    followDAO.getFollowingUsers(email,function(result){
        if(result){
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
exports.getFollowersUsers=function(req,res){
    var email=req.session.email;
    followDAO.getFollowersUsers(email,function(result){
        if(result){
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
}