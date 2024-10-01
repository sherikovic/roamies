const User = require("../models/user");
const bcrypt = require("bcrypt");
const { clientUrl } = require("../middleware");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { randomBytes } = require("node:crypto");

module.exports.verifyEmail = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const randomPin = Math.floor(Math.random() * 90000) + 10000;
		let user = await User.findOne({ email: req.body.email });
		if (!user) {
			user = new User({
				email,
				password: hashedPassword,
				googleId: undefined,
				verified: false,
				verCode: randomPin,
				firstname,
				lastname,
				country: "",
				age: undefined,
				bio: "",
				social: { instagram: "", twitter: "" },
			});
		} else {
			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.email = req.body.email;
			user.password = hashedPassword;
			user.verCode = randomPin;
		}
		await user.save();

		const msg = {
			to: email,
			from: "no-reply@roamies.org",
			template_id: "d-f1fcdee077b84a1ea782f4d7cd66d3ed",
			dynamic_template_data: {
				name: firstname,
				code: randomPin,
			},
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.error(error);
			});
		setTimeout(() => eraseVerCode(email), 900000); // 15 minutes
		res.status(201).json({ message: "Verification email successfully sent!" });
	} catch (e) {
		res.status(500).json({
			message: "Something went wrong while sending the verification email!",
			error: e.name + ": " + e.message,
		});
	}
};

const eraseVerCode = async (email) => {
	const user = await User.findOne({ email: email });
	if (user.verified === false) {
		user.verCode = 0;
		await user.save();
	}
};

module.exports.signup = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user.verCode !== req.body.verCode) {
			return res.status(500).json({ message: "Invalid code!" });
		}
		req.logIn(user, (e) => {
			if (e) {
				return res.status(500).json({
					message:
						"User was created but an error occured while trying to log in.",
					error: e,
				});
			}
			user.verified = true;
			user.verCode = 0;
			user.save();
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
	if (req.body.remember_me) {
		req.session.cookie.maxAge = 1000 * 60 * 60 * 168; // 1 week
	}
	res.status(201).json({ message: "Log in succussful", user: req.user });
};

module.exports.googleSuccess = (req, res) => {
	const redirectUrl = req.cookies.redirectUrl;
	res.clearCookie("redirectUrl");
	return res.redirect(redirectUrl);
};

module.exports.googleFailure = async (req, res) => {
	req.session.destroy((err) => err && console.error(err));
	return res.redirect(
		clientUrl +
			"/signup?redirect=true&error=" +
			encodeURIComponent(
				"A record for the same email was found, use a different email or log in!"
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

module.exports.resetPassword = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		// user.verified = false;
		const token = randomBytes(32).toString("hex");
		user.resetPasswordToken = token;
		user.resetPasswordExpires = Date.now() + 9000000;
		await user.save();
		const resetUrl = `http://localhost:3000/reset-password/${token}`;
		const msg = {
			to: user.email,
			from: "no-reply@roamies.org",
			template_id: "d-edb1ee6a03924e9485fa70816bb47cad",
			dynamic_template_data: {
				name: user.firstname,
				resetUrl,
			},
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log("Email sent");
			})
			.catch((error) => {
				console.error(error);
			});
		res.status(201).json({ message: "Verification email successfully sent!" });
	} catch (e) {}
};

module.exports.getLoggedInUser = async (req, res) => {
	if (req.user) {
		const user = await User.findById(req.user._id)
			.populate("trips")
			.populate("events");
		res.status(201).json({ objects: user });
	} else {
		res.status(401).json({ objects: null });
	}
};

module.exports.getUsers = async (req, res) => {
	const users = req.query
		? await User.find(req.query).populate("trips").populate("events")
		: await User.find({}).populate("trips").populate("events");
	res.status(201).json({ objects: users });

	// const ret = req.query.id
	// 	? await User.findById(req.query.id).populate("trips").populate("events")
	// 	: await User.find({}).populate("trips").populate("events");
	// res.json({ objects: ret });
};
