const { Joi } = require("celebrate");
const validator = require("validator");
const { validate } = require("../models/user");

// Clothing Item

Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  imageUrl: Joi.string().required().custom(validate).messages({
    "string.empty": 'The "imageUrl" field must be filled in',
    "string.uri": 'the "imageUrl" field must be a valid url',
  }),
});

Joi.object().keys({
  name: Joi.string().min(2).max(30),
  avatar: Joi.string().required.imageUrl(),
  email: Joi.string().required.email(),
  password: Joi.string().required().min(8),
});

Joi.object().keys({
  email: Joi.string().required.email(),
  password: Joi.string().required().min(8),
});

Joi.object().keys({
  id: Joi.string().length(24),
});

const validator = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};
