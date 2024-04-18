const router = require("express").Router();
const usersCtls = require("../controllers/users");
const cors = require("cors");
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware");
const passport = require("passport");

const corsOptions = {
	origin: "https://accounts.google.com",
	methods: ["GET", "POST", "PATCH", "DELETE"],
	allowedHeaders: "Content-Type",
	credentials: true,
};

module.exports = router
	.post("/signupLocal", usersCtls.signup)
	.post("/signupGoogle", usersCtls.signupGoogle)
	.post(
		"/login",
		checkAuthenticated,
		passport.authenticate("local"),
		usersCtls.login
	)
	.post(
		"/google",
		cors(corsOptions),
		passport.authenticate("google", {
			scope: ["profile", "email"],
			prompt: "select_account",
		})
	)
	.post(
		"/google/redirect",
		passport.authenticate("google", { failureRedirect: "/" }),
		usersCtls.google
	)
	.post("/logout", checkNotAuthenticated, usersCtls.logout)
	.get("/getusername", usersCtls.getLoggedInUser)
	.get("/getUsers", usersCtls.getUsers);
