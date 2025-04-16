const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const { login, createUser } = require("../controllers/users");
const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const NotFoundError = require("../utils/NotFoundError");

const signInLogic = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const signUpLogic = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    avatar: Joi.string().required().uri(),
  }),
};

router.post("/signin", celebrate(signInLogic), login);
router.post("/signup", celebrate(signUpLogic), createUser);

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The page was not found"));
});

module.exports = router;
