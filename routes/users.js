const router = require("express").Router();
//const { getUsers, createUser, getUser } = require("../controllers/users");

router.patch("/users/me", profile);

module.exports = router;
