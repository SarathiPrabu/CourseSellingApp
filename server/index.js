const express = require('express');
// const mongoose = require('mongoose');
const config = require('./config/config');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// // Mongoose connection
// const dbURI = config.dbURI;
// mongoose.connect(dbURI)
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/admin', adminRoutes);

// app.use('/user', userRoutes);


// Port listener for the server to run on defined port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});