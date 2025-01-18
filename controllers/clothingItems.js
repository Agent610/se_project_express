const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner });
  req.user._id
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Error: Error Message", e });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      res.status(500).send({ message: "An error occured on the server", e });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(item)
    .then((item) => res.status(200).send({ message: "Successfully deleted" }))
    .catch((err) => {
      if ((err.name = "DocumentNotFoundError")) {
        res.status(404).send({ message: "Error not found" });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: "Error: Error Message" });
      }
    });
};

module.exports = { createItem, getItems, deleteItem };
