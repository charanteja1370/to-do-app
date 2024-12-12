require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/index');

//create a server
const server = express();

const PORT = process.env.PORT || 5000;

// Middleware
server.use(bodyParser.json());

// Routes
server.use('/tasks', taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => console.error('MongoDB connection error:', error));