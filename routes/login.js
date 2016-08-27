var userDAO=require('../dbServices/userDAO');
exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    userDAO.authenticateUser(email,password,function(result){
        if(result.length>0){
            req.session.email=email;
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
exports.redirectToUserMainPage=function(req,res){
    if(req.session.email) {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("userMainPage.ejs");
    }
    else{
        res.redirect('/');
    }
};
exports.logout = function(req,res)
{
    console.log("entered logout");
    req.session.destroy();
    res.redirect('/');
};