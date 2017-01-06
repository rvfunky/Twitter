/**
 * Created by raghu on 1/2/17.
 */
var userDAO=require('../dbServices/userDAO');
exports.updateProfile=function (req,res) {
    console.log(req.body);
    userDAO.updateProfile(req.session.email,req.body.fullname,req.body.twitterHandle,req.body.gender,req.body.birthday,req.body.mobile,function(result){
        if (result) {
            json_responses = {
                "statusCode": 200,
                "result" : result
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
exports.getProfile=function (req,res) {
    userDAO.getProfile(req.session.email,function (result) {
        if (result) {
            json_responses = {
                "statusCode": 200,
                "result" : result
            }
            res.send(json_responses);
        } else {
            json_responses = {
                "statusCode": 401,
            }
            res.send(json_responses);
        }
    })
}