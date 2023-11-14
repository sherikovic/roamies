const mongoose = require('mongoose');
const elements = require('./elementsDummy');
const Element = require('../models/element');

// establish connection to monogodb
mongoose.connect('mongodb://127.0.0.1:27017/elementsDB');
const db = mongoose.connection;
db.on('error', (err) => { console.error("Connection error:", err) });
db.once('open', () => { console.log("Database connected"); });

const seedDB = async () => {
    // clear the database
    await Element.deleteMany({});
    // loop over the imported data
    // I tried to do this with foreach and map, but the connection.close() throws an error
    // that the connection is not open
    for (let i = 0; i < elements.length; i++) {
        const element = new Element({
            name: elements[i].name,
            description: elements[i].description,
            value: elements[i].value
        });
        await element.save();
    };
};

seedDB().then(() => mongoose.connection.close());
