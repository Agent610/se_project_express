const router = require("express").Router();
const { Joi, celebrate } = require("celebrate");
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingItems");

const createItemLogic = {
  body: Joi.object().keys(),
  name: Joi.string().required(),
  weather: Joi.string().valid("hot", "warm", "cold").required(),
  imageUrl: Joi.string().required().uri(),
};

const itemIdLogic = {
  params: Joi.object().keys({
    itemId: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  }),
};
router.post("/", auth, celebrate(createItemLogic), createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, celebrate(itemIdLogic), deleteItem);
router.put("/:itemId/likes", auth, celebrate(itemIdLogic), addLike);
router.delete("/:itemId/likes", auth, celebrate(itemIdLogic), deleteLike);

module.exports = router;
