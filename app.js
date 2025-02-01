const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const mainRouter = require("./routes/index");
const login = require("./controllers/users");
const createUser = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(cors());
app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);
app.use("/", mainRouter);
app.use("routes");

app.listen(PORT, () => {});
