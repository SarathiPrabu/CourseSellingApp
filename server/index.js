
import express from 'express';

const jwt = require('jsonwebtoken');
const SECRET = 'SECRET_KEY';

const mongoose = require('mongoose');
const env = require('dotenv');

const app = express();
const port = 3000;

app.use(express.json());


// Mongoose schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true},
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
const db = env.process.MONGO_URI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
};

app.get('/', (req, res) => {
    // Landing page
    res.send('Welcome to the eLearning platform');
});

app.get('/admin/signup', (req, res) => {
    // Admin signup page
});

app.post('/admin/login', (req, res) => {
   // Admin login page
});

app.post('/admin/logout', (req, res) => {
    // Admin logout and destroy the session
});

app.get('/admin/courses', (_req, _res) => {
    // Admin courses page
    // Display all courses in the database
});


app.post('/admin/courses', (req, res) => {
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