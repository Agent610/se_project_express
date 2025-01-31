const { response } = require("express");
const User = require("../models/user");
const {
  SUCCESS,
  CREATE,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  REGISTRATION_ERROR,
  ERROR,
  INCORRECT,
} = require("../utils/errors");

// POST / creating a user

const createUser = (req, res) => {
  const { password, name, avatar, email } = req.body;
  User.create({ password, name, avatar, email })
    .then((user) => res.status(CREATE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Bad request user not found" });
        return res
          .status(ERROR)
          .send({ message: "Same user information was entered" });
        return res
          .status(REGISTRATION_ERROR)
          .send({ message: "Error in registration" });
      }
      return res.status(DEFAULT).send({ message: "Default" });
    });
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send({ message: "Get user", user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError")
        return res.status(BAD_REQUEST).send({ message: "Bad request" });
      return res.status(DEFAULT).send({ message: "Default" });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(SUCCESS).send({ message: "Login success" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "LoginFailed") {
        return res
          .status(INCORRECT)
          .send({ message: "Entered email or password is incorrect" });
      }
      res.status(DEFAULT).send({ message: "Default" });
    });
};

module.exports = { createUser, getCurrentUser };
