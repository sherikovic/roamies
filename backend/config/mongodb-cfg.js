const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://roamies:${process.env.password}@cluster0.xprjipb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", (err) => {
	console.error("Connection error:", err);
});
db.once("open", () => {
	console.log("Database connected");
});
