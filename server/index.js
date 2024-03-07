const express = require('express');
const authenticateJWT =  require("./middlewares/authenticateJWT")
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
require('dotenv').config();
const SECRET = process.env.SECRET_KEY;

const app = express();
const port = 3000;

app.use(express.json());


// Mongoose schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// Mongoose model
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

// Mongoose connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    // Landing page
    res.send('Welcome to the eLearning platform');
});



app.post('/admin/signup', (req, res) => {
    // Admin signup page
    const { username, password } = req.body;
    function callback(admin) {
        if (admin) {
            res.status(403).json({ message: 'Admin already exists' });
        }
        else {
            const obj = { username: username, password: password };
            const newAdmin = new Admin(obj);
            newAdmin.save();

            const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
            res.json({
                message: 'Admin created successfully',
                token
            });
        }
    }

    Admin.findOne({ username }).then(callback);
});

app.post('/admin/login', async (req, res) => {
    // Admin login page
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({
            message: "Logged in successfully",
            token
        })
    }
    else {
        res.status(401).send({
            message: "Login failed invalid username/password"
        });
    }
});

app.post('/admin/logout', (req, res) => {
    // Admin logout and destroy the session
});

app.get('/admin/courses', authenticateJWT,(_req, res) => {
    // Admin courses page
    // Display all courses in the database
    res.json({message:"Displays the courses"});
});


app.post('/admin/courses',authenticateJWT, (req, res) => {
    // Add a new course to the database

});

app.put('/admin/courses:courseId', (req, res) => {
    // Update a course in the database
});

app.delete('/admin/courses:courseId', (req, res) => {
    // Delete a course from the database
});

// Port listener for the server to run on defined port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});