const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");
const NotFoundError = require("../utils/NotFoundError");

const {
  SUCCESS,
  // BAD_REQUEST,
  // NOT_FOUND,
  // DEFAULT,
  // REQUEST_DENIED,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(err);
      }
    });
};

const getItems = (res, next) => {
  ClothingItem.find({})
    .then((items) =>
      res
        .status(SUCCESS)
        .send({ message: "Item was found successfully", items })
    )
    .catch((err) => {
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new ForbiddenError("You can't delete this"));
      }
      return item
        .deleteOne()
        .then(() => res.status(SUCCESS).send({ message: "Item was deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(err);
      }
    });
};

const addLike = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Error not found"));
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Error not found"));
      }
      return res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request"));
      } else {
        next(err);
      }
    });
};

module.exports = { createItem, getItems, deleteItem, addLike, deleteLike };
