module.exports = function (req, res, next) {
    // 401 - unauthorized
    // 403 - forbidden (authorized user but donot have access)
    
    if (!req.user.isAdmin) return res.status(403).send('access denied.');

    next();
}