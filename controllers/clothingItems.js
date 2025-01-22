const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl });
  req.user._id
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send("An error has occured on the server");
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(500).send("An error has occured on the server");
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send("SUCCESS"))
    .catch((err) => {
      if ((err.name = "DocumentNotFoundError")) {
        res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      }
      res.status(500).send("An error has occured on the server");
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
      if (item) {
        return res.status(404).send({ message: err.message });
      }
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      }
    }, res.status(500).send("An error has occured on the server"));
};

const deleteLike = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (item) {
        return res.status(404).send({ message: err.message });
      }
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
      }
    }, res.status(500).send("An error has occured on the server"));
};

module.exports = { createItem, getItems, deleteItem, addLike, deleteLike };
