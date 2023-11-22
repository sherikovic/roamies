module.exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(300).json({ message: "User already logged in." })
    }
    next();
}
