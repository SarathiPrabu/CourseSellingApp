const express = require('express');
const config = require('./config/config');
const connectDB = require('./models/database');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Connect to the database
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/admin', adminRoutes);
// app.use('/user', userRoutes);

// Port listener for the server to run on defined port
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});