/* eslint-disable jest/require-hook */
const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const myLogger = (req, res, next) => {
  console.log(req.ip.substr(7));
  console.log(req.method);
  next();
}

app.use(myLogger);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/about.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
