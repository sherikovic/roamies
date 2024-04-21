module.exports.checkAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return res.status(300).json({ message: "User already logged in." });
	}
	next();
};

module.exports.checkNotAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(300).json({ message: "User already logged out." });
};

module.exports.setRedirectUrl = (req, res, next) => {
	if (req.query.redirect_url) {
		res.cookie("redirectUrl", req.query.redirect_url);
	}
	console.log(req.query.redirect_url);
	next();
};
