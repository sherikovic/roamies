const router = require("express").Router();
const usersCtls = require("../controllers/users");
const {
	checkAuthenticated,
	checkNotAuthenticated,
	setRedirectUrl,
	checkIfEmailExists,
} = require("../middleware");
const passport = require("passport");

module.exports = router
	.post("/verifyEmail", checkIfEmailExists, usersCtls.verifyEmail)
	.post("/signup", usersCtls.signup)
	.post(
		"/login",
		checkAuthenticated,
		passport.authenticate("local"),
		usersCtls.login
	)
	.get(
		"/google",
		setRedirectUrl,
		passport.authenticate("google", {
			scope: ["profile", "email"],
			prompt: "select_account",
		})
	)
	.get(
		"/google/redirect",
		passport.authenticate("google", {
			failureRedirect: "/auth/google/login/failure",
		}),
		usersCtls.googleSuccess
	)
	.get("/google/login/failure", usersCtls.googleFailure)
	.post("/logout", checkNotAuthenticated, usersCtls.logout)
	.get("/getLoggedInUser", usersCtls.getLoggedInUser)
	.get("/getUsers", usersCtls.getUsers);
