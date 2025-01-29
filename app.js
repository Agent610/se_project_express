const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(routes);
app.use(express.json());
app.use("/", mainRouter);
app.use(cors());

app.post("/signin", login);
app.post("/signup", createUser);

app.listen(PORT, () => {});
