const express = require('express');
const bodyParser = require('body-parser');
const {createUser, getUsers, updateUser, deleteUser} = require('./controller/usercontroller');
const {multerConfig, uploadProfilePicture} = require('./multer/profile');
const multer = require('multer');

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for parsing URL-encoded bodies
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Route for creating a new user
app.post('/users', createUser);

// Route for updating a user by ID
app.put('/users/:id', updateUser);

// Route for getting all users
app.get('/users', getUsers);

// Route for deleting a user by ID
app.delete('/users/:id', deleteUser);

// Route for uploading a profile picture for a specific user
app.post('/user/profile-picture/:userId', multerConfig.single('profilePicture'), uploadProfilePicture);

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
