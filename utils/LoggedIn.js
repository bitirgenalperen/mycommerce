module.exports.LoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'You Must Login');
        return res.redirect('/login');
    }
    next();
}