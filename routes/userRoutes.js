const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import the User model
const User = require('../models/UserSchema');
// const User = require('../models/user'); 

// Get User Profile by ID
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        // Fetch user data by ID and send it as a response
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Current User Profile

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user);
});

// Search Users by Username or Name
router.get('/search', async (req, res) => {
    const searchQuery = req.query.query;
    try {
    // Implement user search logic based on the searchQuery parameter
    // Example: const users = await User.find({ $or: [ { username: searchQuery }, { fullName: searchQuery } ] });
    // Replace the above line with your actual user search logic
    const users = [ /* List of users matching the query */ ];
    res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to add a new user to the database 
router.post('/addUser', async (req, res) => {
  try {
        const userData = req.body;
        // Check to see if the user already exists in the database
        const userExists = await User.findOne({ email: userData.email });
        // Logic if the user does exist (bad request).
        if (userExists){
            return res.status(400).json({ error: "This email is already associated with an account. Please try with a different email. "})
        }
        // Otherwise...
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occured while adding the user');
    }
});


module.exports = router;
