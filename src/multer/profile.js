const multer = require('multer');
const fs = require('fs');
const User = require('../model/user');

 // Directory path for profile pictures
const profilePictureDir = './upload/profilePictures';

// Create the directory if it doesn't exist
if (!fs.existsSync(profilePictureDir)) {
  fs.mkdirSync(profilePictureDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, profilePictureDir); // Set the destination directory for storing uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`); // Set the filename for the uploaded file
  }
});

const multerConfig = multer({
  storage: storage, // Set the storage configuration for multer
  limits: {
    fileSize: 1024 * 1024 * 4 // Set the file size limit to 4 MB
  }
});

const uploadProfilePicture = async (req, res) => {
  const userId = req.params.userId; // Get the user ID from the request parameters
  const profilePicture = req.file?.path; // Get the path of the uploaded profile picture

  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({
      message: 'Profile picture missing',
    });
  }

  try {
    const user = await User.findOne({ where: { id: userId } }); // Find the user by ID

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (profilePicture) {
      user.profilePicture = profilePicture; // Update the user's profile picture field with the new path
      await user.save(); // Save the user in the database

      return res.status(200).json({ message: 'Profile picture uploaded successfully', profilePicture });
    } else {
      return res.status(400).json({
        message: 'Failed to upload profile picture',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

module.exports = { multerConfig, uploadProfilePicture };
