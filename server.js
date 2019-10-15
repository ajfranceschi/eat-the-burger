const express = require("express");
const exphbs = require("express-handlebars");
// const routes = require('controllers/routes');
const dotenv = require("dotenv");
const connection = require('./config/connection');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(route);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
