const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const mongoURL =
  "mongodb+srv://nyanwinnaing1922002:test1234@mern-cluster.v1weskt.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster";
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", recipeRoutes);
app.use("/api/users", usersRoutes);
