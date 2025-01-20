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
        res.status(400).send({ message: err.message });
        res.status(500).send({ message });
      }
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      res.status(500).send({ message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => res.status(200).send({ message }))
    .catch((err) => {
      if ((err.name = "DocumentNotFoundError")) {
        res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(400).send({ message: err.message });
        res.status(500).send({ message });
      }
    });
};

const addLike = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(itemId, { $inc: { likes: 1 } }, { new: true })
    .then((item) => {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      res.send(item);
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

const deleteLike = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(itemId, { $inc: { likes: -1 } }, { new: true })
    .then((item) => {
      if (err) {
        return res.status(404).send({ message: err.message });
      }
      res.send(item);
    })
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports = { createItem, getItems, deleteItem, addLike, deleteLike };
