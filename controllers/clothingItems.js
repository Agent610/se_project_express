const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/BadRequestError");
const {
  SUCCESS,
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  REQUEST_DENIED,
} = require("../utils/errors");

const createItem = (req, res) => {
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

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) =>
      res
        .status(SUCCESS)
        .send({ message: "Item was found successfully", items })
    )
    .catch(() => {
      res.status(DEFAULT).send({ message: "Default" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(REQUEST_DENIED)
          .send({ message: "You can't delete this" });
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

const addLike = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Error not found" });
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

const deleteLike = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Error not found" });
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
