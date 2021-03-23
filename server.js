const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
// app
const app = express();

//Set up default mongoose connection
const mongoDB = process.env.MONGODB;
// console.log(mongoDB);
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(":) DB CONNECTED SUCCESS");
  })
  .catch((err) => {
    console.log("DB CONNECTION ERR => " + err);
  });

//middlewares
// use the morgan as middleware beacase to see the url on the terminal
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Enter Suuces");
});

// routes
fs.readdirSync("./Routes").map((route) =>
  app.use("/personalAPI", require("./Routes/" + route))
);

app.listen(process.env.PORT, () => {
  console.log(":) SERVER CONNECTED SUCCESSFUL");
});
