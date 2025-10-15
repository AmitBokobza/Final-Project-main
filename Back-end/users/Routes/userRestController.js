const express = require("express");
const { createError, handleError } = require("../../utils/errorHandler");
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  changeCookStatus,
  deleteUser,
} = require("./userDataServices");
const returnUser = require("../helpers/returnUser");
const {
  validateRegistration,
  validateLogin,
  validateUpdate,
} = require("../validation/userValidationService");
const auth = require("../../auth/authService");
const router = express.Router();

// create new user.
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;

    const errorMessage = validateRegistration(newUser);
    if (errorMessage != "") {
      throw createError("Validation", errorMessage, 400);
    }

    let user = await registerUser(newUser);

    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    const errorMessage = validateLogin(req.body);
    if (errorMessage != "") {
      throw createError("Validation", errorMessage, 400);
    }

    const token = await loginUser(email, password);
    res.send(token);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

//get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    let userInfo = req.user;
    const { id } = req.params;
    const user = await getUser(id);
    if (!userInfo.isAdmin && userInfo._id != user._id) {
      throw createError(
        "Authorization",
        "Only the account owner or admin can show details",
        403
      );
    }

    res.status(200).send(user);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//get all users
router.get("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isAdmin) {
      throw createError(
        "Authorization",
        "Only admin user can get all users",
        403
      );
    }

    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//update user
router.put("/:id", auth, async (req, res) => {
  let userInfo = req.user;
  const { id } = req.params;
  let updatedUser = req.body;

  try {
    if (userInfo._id != id) {
      throw createError(
        "Authorization",
        "Only user owner can edit profile",
        403
      );
    }

    const errorMessage = validateUpdate(updatedUser);
    if (errorMessage != "") {
      throw createError("Validation", errorMessage, 400);
    }

    let user = await updateUser(id, updatedUser);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// change cook status
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;

  try {
    if (!userInfo.isAdmin && userInfo._id != id) {
      throw createError(
        "Authorization",
        "Only the user or admin can change status",
        403
      );
    }

    let user = await changeCookStatus(id);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//delete user
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const userInfo = req.user;

  try {
    if (!userInfo.isAdmin && userInfo._id != id) {
      throw createError(
        "Authorization",
        "Only the user or admin can delete",
        403
      );
    }

    let user = await deleteUser(id);
    res.status(200).send(returnUser(user));
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});
module.exports = router;
