// simple-expressjs/index.js
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send('Hello');
});

app.get("/test", (req, res) => {
    res.send('Test');
  });

app.get("/res-test", (req, res) => {
    res.status(200).send('response 200');
});

app.get("/res-test404", (req, res) => {
    res.status(404).send('response 404');
});

app.listen(port, () => {
  console.log('Server is running', port);
});
