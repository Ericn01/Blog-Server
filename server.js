const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // for using environment variables 
const passport = require('passport'); // User authentithication 

// Importing routes 
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// Import database connection logic 
const connectDB = require('./config/db');

// Connect to your database
connectDB();

// Middlewares 
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cors()); // Frontend and backend will be hosted on different domains, making this necessary
app.use(passport.initialize());

// Implementing the routes
app.use('/api/posts/', postRoutes);
app.use('/api/users/', userRoutes);

// Serve the Svelte application for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Password config 
require('./passport'); // Make sure to specify the correct path to your passport.js file

// Connecting to the port 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});