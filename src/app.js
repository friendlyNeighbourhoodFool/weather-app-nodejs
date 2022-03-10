const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars pckg and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ankit",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ankit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Help message here!",
    title: "Help",
    name: "Ankit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "An address must be provided.",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        location,
        Temp: forecastdata,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMessage: "Help article not found",
    name: "Ankit",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMessage: "Page not found",
    name: "Ankit",
  });
});

app.listen(port, () => {
  console.log("Server is up on port "+port);
});
