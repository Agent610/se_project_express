const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { Joi, celebrate } = require("celebrate");

const updateUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    avatar: Joi.string().required(url),
  }),
};

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, celebrate(updateUser), updateUser);

module.exports = router;
