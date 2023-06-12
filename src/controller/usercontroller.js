const User = require('../model/user');

// create a new user
const createUser = async (req, res) => {
  try {
    const { username, mobileNo, email, address } = req.body;

    // Check if username already used
    const existingUsername = await User.findOne({where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already used" });
    }

    // Check if email already used
    const existingEmail = await User.findOne({where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email id already used" });
    }

    // Create a new user using the extracted data
    const user = await User.create({ username, mobileNo, email, address });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// update a user
const updateUser = async(req, res)=> {
  try {
    const { id } = req.params;
    const { username, mobileNo, email, address } = req.body;

    // Find the user by their ID using the User model
    const user = await User.findByPk(id);
    // If the user does not exist, return a response with status code 404 (Not Found) and an error message
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Update the user's properties
    user.username = username;
    user.mobileNo = mobileNo;
    user.email = email;
    user.address = address;

    // Save the changes to the user
    await user.save();
    return res.status(201).json({ message: `User ID ${id} updated successfully`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all users
const getUsers = async(req, res)=> {
  try {
    // Retrieve all users using the User model
    const users = await User.findAll();
    return res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a user
const deleteUser= async(req, res)=> {
  try {
    const { id } = req.params;
    // Find the user by their ID using the User model
    const user = await User.findByPk(id);
    // If the user does not exist, return a response with status code 404 (Not Found) and an error message
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Delete the user from the database
    await user.destroy();

    res.status(201).json({ message: `User ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {createUser,getUsers,updateUser,deleteUser};
