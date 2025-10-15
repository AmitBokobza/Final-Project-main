const { generateToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/errorHandler");
const { generatePassword, comparePassword } = require("../helpers/bcrypt");
const User = require("../models/mongoDB/User");

// Register new user
const registerUser = async (newUser) => {
  try {
    newUser.password = await generatePassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

//get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

//get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

//login user
const loginUser = async (email, password) => {
  try {
    const userFromDb = await User.findOne({ email });
    console.log("found user");
    
    
    if (!userFromDb) {
      throw createError("Authentication", "User not found");
    }

    const result = comparePassword(password, userFromDb.password)
    console.log(result);
    
    const token = generateToken(userFromDb);
    return token;
  } catch (error) {
    throw createError("Authentication", error.message);
  }
};

//update user
const updateUser = async (id, updatedUser) => {
  try {
    const userFromDb = await User.findById(id);
    if (!userFromDb) {
      throw createError("Authentication", "User doesnt exist");
    }
    let user = await User.findByIdAndUpdate(id, updatedUser);
    return user;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

//change cook status
const changeCookStatus = async (id) => {
  try {
    let userFromDb = await User.findById(id);
    if (!userFromDb) {
      throw createError("Authentication", "User doesnt exist");
    }

    userFromDb.isCook = !userFromDb.isCook;
    await userFromDb.save();
    return userFromDb;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

//delete user
const deleteUser = async (id) => {
  try {
    let userFromDb = await User.findById(id);
    if (!userFromDb) {
      throw createError("Authentication", "User doesnt exist");
    }

    userFromDb = await User.findByIdAndDelete(id);
    return userFromDb;
  } catch (error) {
    throw createError("Mongoose", error.message);
  }
};

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
  updateUser,
  changeCookStatus,
  deleteUser,
};
