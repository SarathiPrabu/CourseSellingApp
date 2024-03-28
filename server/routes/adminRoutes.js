const express = require('express');
const router = express.Router();
const config = require('../config/config');
const authenticateJWT = require('../middleware/authenticateJWT');

const jwt = require('jsonwebtoken');
const SECRET = config.secretKey;
const {Admin, Course} = require('../models/model');

router.post('/signup', async (req, res) => {
    try {
        const {username, password} = req.body;
        const adminExists = await Admin.exists({username});
        if (adminExists) {
            return res.status(403).json({message: 'Admin already exists'});
        }
        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '1h'});
        res.json({
            message: 'Admin created successfully',
            token
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/me', authenticateJWT, async (req, res) => {
    res.json({
        username: req.user.username
    });
});

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.headers;
        const admin = await Admin.findOne({username, password});

        if (admin) {
            const token = jwt.sign({username, role: 'admin'}, SECRET, {expiresIn: '1h'});
            res.json({
                message: "Logged in successfully",
                token
            });
        } else {
            res.status(401).json({
                message: "Login failed. Invalid username/password"
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/courses', authenticateJWT, async (_req, res) => {
    try {
        const courses = await Course.find();
        res.json({courses});
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/courses', authenticateJWT, async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.json({message: 'Course added successfully', courseId: course.id});
    } catch (error) {
        console.error('Error adding course:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.put('/course/:courseId', authenticateJWT, async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }
        res.json({message: 'Course updated successfully'});
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/course/:courseId', authenticateJWT, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.delete('/courses/:courseId', authenticateJWT, async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.courseId);
        if (!course) {
            return res.status(404).json({message: 'Course not found'});
        }
        res.json({message: 'Course deleted successfully'});
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = router;