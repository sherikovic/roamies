const User = require("./models/user");

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
	} else {
		res.cookie(
			"redirectUrl",
			process.env.MODE === "dev"
				? "http://localhost:3000"
				: "https://roamies.org"
		);
	}
	next();
};

module.exports.checkIfEmailExists = async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (user && user.status === true) {
		return res
			.status(300)
			.json({ message: "User with the same email already exists!" });
	}
	next();
};

module.exports.clientUrl =
	process.env.MODE === "dev" ? process.env.CLIENT_DEV : process.env.CLIENT_PROD;
