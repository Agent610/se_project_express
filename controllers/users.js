const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");

// POST / creating a user

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(CREATE).send({
        _id: user._id,
        email: user.email,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.code === ERROR) {
        return res
          .status(REGISTRATION_ERROR)
          .send({ message: "Email is connected with another account" });
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(SUCCESS).send({ message: "Get user", user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else {
        next(err);
      }
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      } else {
        next(err);
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Error: Email and password not entered" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(SUCCESS).send({ token, message: "Login success" });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Entered email or password is incorrect"));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Name or Avatar could not be updated" });
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(SUCCESS).send({ user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        next(new UnauthorizedError("Name or Avatar could not be updated"));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, getCurrentUser, login, updateUser };
