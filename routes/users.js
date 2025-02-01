const router = require("express").Router();
const authorization = require("../middlewares/auth");
const getCurrentUser = require("../controllers/users");
const updateUser = require("../controllers/users");

router.get("/me", authorization, getCurrentUser);
router.patch("/me", authorization, updateUser);

module.exports = router;
