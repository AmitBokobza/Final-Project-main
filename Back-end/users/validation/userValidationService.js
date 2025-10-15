const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");
const updateValidation = require("./Joi/updateValidation");
require("dotenv").config();
const VALIDATOR = process.env.VALIDATOR;

const validateRegistration = (user) => {
  if (VALIDATOR === "JOI") {
    const { error } = registerValidation(user);
    if (error) return error.details.map((detail) => detail.message);

    return "";
  }
};

const validateLogin = (user) => {
  if (VALIDATOR === "JOI") {
    const { error } = loginValidation(user);
    if (error) return error.details.map((detail) => detail.message);

    return "";
  }
};

const validateUpdate = (user) => {
  if (VALIDATOR === "JOI") {
    const { error } = updateValidation(user);
    if (error) return error.details.map((detail) => detail.message);

    return "";
  }
};
module.exports = { validateRegistration, validateLogin, validateUpdate };
