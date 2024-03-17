const mongoose = require('mongoose');

const localUrl = 'mongodb://127.0.0.1:27017/playground';
const onlineUrl =
	'mongodb+srv://sherikovic:A1234a4321@cluster0.ah7ultu.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(localUrl);
const db = mongoose.connection;
db.on('error', (err) => {
	console.error('Connection error:', err);
});
db.once('open', () => {
	console.log('Database connected');
});
