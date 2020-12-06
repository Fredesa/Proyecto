module.exports = {
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signin');
    }, 
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    },
    generatePassword(length){
        var pass = "";
    for (i=0; i < length; i++){
        pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);     
    }
    return pass;
    }
}