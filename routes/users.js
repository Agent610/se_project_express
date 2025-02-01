const router = require("express").Router();
const authorization = require("../middlewares/auth");

router.get("/me", getCurrentUserFunction);

router.get("/me", authorization, getCurrentUserFunction);
router.patch("/me", authorization, profile);

module.exports = router;
