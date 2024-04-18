const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.MODE === "dev" ? 8080 : process.env.PORT;

module.exports = (app) => {
	app.use(bodyParser.json());

	const corsOptions = {
		origin:
			process.env.MODE === "dev"
				? "http://localhost:3000"
				: [/^https?:\/\/(?:.*\.)?roamies\.org$/, "https://accounts.google.com"],
		methods: ["GET", "POST", "PATCH", "DELETE"],
		allowedHeaders: "Content-Type",
		credentials: true,
	};
	app.use(cors(corsOptions));
	app.options("*", cors());

	app.use(
		session({
			secret: process.env.EXPRESS_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				expires: 1000 * 60 * 60 * 24 * 1,
			},
		})
	);

	app.listen(PORT, () => {
		console.log("Serving on Port " + PORT);
	});
};
