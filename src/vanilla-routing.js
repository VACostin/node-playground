/* eslint-disable jest/require-hook */
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`A request was made: ${req.url}`);
  if (req.url === "/home" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(`${__dirname}/index.html`).pipe(res);
  } else if (req.url === "/contact-me") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(`${__dirname}/contact-me.html`).pipe(res);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(`${__dirname}/about.html`).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    fs.createReadStream(`${__dirname}/404.html`).pipe(res);
  }
});

server.listen(3000, "127.0.0.1");
console.log("Listening to port 3000");
