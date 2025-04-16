const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");

const updateUserLogic = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().required().uri(),
  }),
};

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, celebrate(updateUserLogic), updateUser);

module.exports = router;
