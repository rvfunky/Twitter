var userDAO=require('../dbServices/userDAO');
exports.createUser=function(req,res){
    var fullname=req.body.fullname;
    var email=req.body.email;
    var password=req.body.password;
    console.log(fullname);

        userDAO.createUser(fullname, email, password, function (result) {
            if (result) {
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
        })

    
};
