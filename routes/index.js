const router = require("express").Router();
const { login, createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { Joi, celebrate } = require("celebrate");
const NotFoundError = require("../utils/NotFoundError");

const signIn = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string().required(url),
  }),
};

router.post("/signin", celebrate(signIn), login);
router.post("/signup", celebrate(signUp), createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The page was not found"));
});

module.exports = router;
