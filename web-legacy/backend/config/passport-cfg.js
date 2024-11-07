const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");

const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = function (app, passport) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new LocalStrategy(
			// we don't have to do password
			// since it defaults to "password" as well
			{
				usernameField: "email",
				passwordField: "password",
			},
			async (email, password, done) => {
				const user = await User.findOne({ email: email });
				if (user === null) {
					return done(null, false, {
						message: "Could not find user with this email!",
					});
				}
				if (user && user.googleId) {
					return done(null, false, {
						message: "User is registered with a different method.",
					});
				}
				try {
					if (await bcrypt.compare(password, user.password)) {
						return done(null, user);
					} else {
						return done(null, false, { message: "Password incorrect!" });
					}
				} catch (e) {
					return done(e);
				}
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				callbackURL: "/auth/google/redirect",
			},
			async (accessToken, refreshToken, profile, done) => {
				try {
					const user = await User.findOne({ email: profile.emails[0].value });
					if (user && !user.googleId) {
						return done(null, false, {
							message:
								"A record for the same email was found, try logging in with a different method!",
						});
					} else if (user && user.googleId) {
						return done(null, user);
					} else {
						const newUser = new User({
							email: profile.emails[0].value,
							firstname: profile.name.givenName,
							lastname: profile.name.familyName,
							password: undefined,
							status: true,
							verCode: 0,
							googleId: profile.id,
							country: "",
							age: undefined,
							bio: "",
							social: { instagram: "", twitter: "" },
						});
						await newUser.save();
						return done(null, newUser, {
							message: "Successfully created a new user!",
						});
					}
				} catch (e) {
					return done(null, false, {
						message:
							"Encountered an error while saving a record for the new user!",
					});
				}
			}
		)
	);

	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			done(null, user);
		});
	});
};
