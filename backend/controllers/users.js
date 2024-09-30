const User = require("../models/user");
const bcrypt = require("bcrypt");
const { clientUrl } = require("../middleware");
const mjml2html = require("mjml");

module.exports.verifyEmail = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		const randomPin = Math.floor(Math.random() * 90000) + 10000;
		const newUser = new User({
			email,
			password: hashedPassword,
			googleId: undefined,
			status: false,
			verCode: randomPin,
			firstname,
			lastname,
			country: "",
			age: undefined,
			bio: "",
			social: { instagram: "", twitter: "" },
		});
		await newUser.save();
		const sgMail = require("@sendgrid/mail");
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		// const fs = require("fs");
		// const renderedTemplate = fs.readFileSync("../emails/templates/index.mjml");
		// console.log("22", renderedTemplate);
		// const html = mjml2html(renderedTemplate);
		const msg = {
			to: email,
			from: "no-reply@roamies.org",
			subject: "Roamies - Please verify your account",
			text: "Thank you for singing up!",
			html: `
        <h1>Thank you for signing up</h1>
        <p>Please use the following code to verify your email address ${randomPin}</p>
      `,
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
	if (user.status === false) {
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
			user.status = true;
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
	const ret = req.query.id
		? await User.findById(req.query.id).populate("trips").populate("events")
		: await User.find({}).populate("trips").populate("events");
	res.json({ objects: ret });
};
