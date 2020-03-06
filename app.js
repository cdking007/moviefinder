const path = require("path");
const express = require("express");
const app = express();
const request = require("request");

//used to set the engine and template settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));

//used to serve the static files inside the nodejs and expressjs
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/result", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "must provide an search query" });
  }
  request(
    "https://api.themoviedb.org/3/search/movie?api_key=2b8bd35bb1c8bd96b6a789b7cd5c7e7a&query=" +
      req.query.search,
    (error, re, body) => {
      let data = JSON.parse(body);
      res.render("movie", { movies: data });
    }
  );
});

app.use((req, res) => {
  res.status(404).send("page not found");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Started server on port " + port);
});
