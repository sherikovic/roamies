const User = require("../models/user");
const bcrypt = require("bcrypt");
const { clientUrl } = require("../middleware");

module.exports.getUsers = async (req, res) => {
	const users = await User.find({});
	res.json({ objects: users });
};

module.exports.signup = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;
		if (await User.findOne({ email: email })) {
			return res
				.status(401)
				.json({ message: "User with the same email already exists!" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			email,
			password: hashedPassword,
			firstname,
			lastname,
		});
		await newUser.save();
		req.logIn(newUser, (e) => {
			if (e) {
				return res.status(500).json({
					message:
						"User was created but an error occured while trying to log in.",
					error: e,
				});
			}
			res
				.status(201)
				.json({ message: "User was successfully created and logged in." });
		});
	} catch {
		res
			.status(500)
			.json({ message: "Something went wrong, couldn't create user!" });
	}
};

module.exports.login = (req, res) => {
	res.status(201).json({ message: "Log in succussful", user: req.user });
};

module.exports.googleSuccess = (req, res) => {
	const redirectUrl = req.cookies.redirectUrl;
	res.clearCookie("redirectUrl");
	res.redirect(redirectUrl);
};

module.exports.googleFailure = async (req, res) => {
	res.redirect(
		clientUrl +
			"/signup?redirect=true&error=" +
			encodeURIComponent(
				"A record for the same email was found, try logging in with a different method!"
			)
	);
};

module.exports.logout = async (req, res) => {
	// no need to delete the cookie on the client side since req.logout will remove
	// req.user from passport and thus authentication becomes null
	// on the client side, the cookie is not destroyed but it is invalidated
	// cookie will remain the same while logged in and will change once you log out
	req.logOut(function (err) {
		if (err) {
			return next(err);
		}
		res.json({ message: "User was successfully logged out." });
	});
};

module.exports.getLoggedInUser = async (req, res) => {
	if (req.user) {
		res.status(201).json({ user: req.user });
	} else {
		res.json({ user: null });
	}
};
