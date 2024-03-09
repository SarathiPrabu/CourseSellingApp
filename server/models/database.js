const mongoose = require('mongoose');
const config = require('../config/config');
require('dotenv').config();
// Connect to the database
const connectDB = async () => {
    try {
        const dbURI = config.dbURI;
        await mongoose.connect(dbURI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
module.exports = connectDB;
