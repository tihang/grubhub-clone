require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

//DEV DEPENDENCY
app.use(morgan("dev"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//IMPORT ROUTES
const RestaurantRoute = require("./routes/Restaurants");
const AuthRoute = require("./routes/Auth");

//INCLUDE ROUTES
app.use("/api/restaurants", RestaurantRoute);
app.use("/api/auth", AuthRoute);

//get keys from config
const Mongo_URI = process.env.Mongo_URI;

mongoose
  .connect(Mongo_URI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// //Server static assets if in porduction
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
