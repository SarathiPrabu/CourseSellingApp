const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authenticateJWT = require('../middleware/authenticateJWT');

const jwt = require('jsonwebtoken');
const SECRET = config.secretKey;
const {Admin, Course} = require('../models/model');

// Admin routes
router.post('/signup', (req, res) => {
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

router.post('/login', async (req, res) => {
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

router.post('/logout', (req, res) => {
    // Admin logout and destroy the session
});

router.get('/courses', authenticateJWT, async(_req, res) => {
    // Admin courses page
    // Display all courses in the database
    const courses = await Course.find();
    res.json({courses});
});


router.post('/courses',authenticateJWT, async(req, res) => {
    // Add a new course to the database
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'Course added successfully', courseId: course.id});
});

router.put('/courses:courseId', authenticateJWT, async(req, res) => {
    // Update a course in the database
    const course = await Course.findById(req.params.courseId, req.body, {new: true});
    if (!course) {
        res.status(404).json({message: 'Course not found'});
    }
    else {
        res.json({message: 'Course updated successfully'});
    }

});

router.delete('/courses:courseId', (req, res) => {
    // Delete a course from the database
});
module.exports = router;