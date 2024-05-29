const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
const mongoURL = process.env.MONGO_DB_LOCAL_URL;
// const mongoURL = process.env.MONGODB_URL;




mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error');
});

db.on('disconnected', (err) => {
    console.log('MongoDB disconnectde');
});

// Export the database connection
module.exports = db;










