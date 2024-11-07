const mongoose = require("mongoose");
const dbUrl =
	process.env.MODE === "dev"
		? "mongodb://127.0.0.1:27017/roamies"
		: `mongodb+srv://roamies:${process.env.password}@cluster0.xprjipb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", (err) => {
	console.error("Connection error:", err);
});
db.once("open", () => {
	console.log("Database connected");
});
