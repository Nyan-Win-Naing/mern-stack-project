const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const recipeRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddlware = require("./middlewares/AuthMiddleware");
const cron = require("node-cron");
const User = require("./models/User");

const nodemailer = require("nodemailer");

const app = express();
app.use(express.static("public"));
const mongoURL =
  "mongodb+srv://nyanwinnaing1922002:test1234@mern-cluster.v1weskt.mongodb.net/?retryWrites=true&w=majority&appName=MERN-Cluster";
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    cron.schedule("*/4 * * * * *", async () => {
      let user = await User.findByIdAndUpdate("688ddff1e7fd254dd9796303", {
        name: "mgmg" + Math.random(),
      });
    });
    console.log("app is running on localhost:" + process.env.PORT);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

app.use("/api/recipes", AuthMiddlware, recipeRoutes);
app.use("/api/users", usersRoutes);

app.get("/set-cookie", (req, res) => {
  // res.setHeader('Set-Cookie', "name=hlaingminthan");
  res.cookie("name", "aungaung");
  res.cookie("important-key", "value", { httpOnly: true });
  return res.send("cookie already set");
});

app.get("/send-email", async (req, res) => {
  // Create a test account or replace with real credentials.
// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9a4ae630c8d69d",
    pass: "152ad1d3a01985"
  }
});


  const info = await transport.sendMail({
    from: 'mgmg@gmail.com',
    to: "hlaingminthan@gmail.com",
    subject: "Hello This is email title",
    html: "<h1>Hello world this is email to hlaingminthan</h1>", // HTML body
  });

  console.log("Message sent:", info.messageId);

  return res.send('email already sent');
});

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
