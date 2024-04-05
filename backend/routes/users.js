const router = require("express").Router();
const usersCtls = require("../controllers/users");
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware");
const passport = require("passport");

module.exports = router
	.post("/signupLocal", usersCtls.signupLocal)
	.post("/signupGoogle", usersCtls.signupGoogle)
	.post(
		"/loginLocal",
		checkAuthenticated,
		passport.authenticate("local"),
		usersCtls.loginLocal
	)
	.get(
		"/loginGoogle",
		// checkAuthenticated,
		passport.authenticate("google", { scope: ["profile"] })
		// usersCtls.loginGoogle
	)
	.get("/google/redirect", usersCtls.loginGoogle)
	.post("/logout", checkNotAuthenticated, usersCtls.logout)
	.get("/getusername", usersCtls.getLoggedInUser);
