const router = require("express").Router();
//const { GET/users/me } = require("../controllers/users");

router.patch("/me", profile);

module.exports = router;
