// simple-expressjs/index.js
const express = require('express')

const { createDividendStockList, createIncreaseStockList, createMyProfit, createMyStockLists } = require("./stocks.js")
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send('Hello');
});

app.get("/my-stock", (req, res) => {
    const myStocksJSON = createMyStockLists(5);
    res.status(200).json(myStocksJSON);
});

app.get("/my-profit", (req, res) => {
  const myProfitJSON = createMyProfit();
  res.status(200).json(myProfitJSON);
})

app.get("/dividend-list", (req, res) => {
  const myDividendsJSON = createDividendStockList(10);
  res.status(200).json(myDividendsJSON);
})

app.get("/increase-list", (req, res) => {
  const myIncreaseStocksJSON = createIncreaseStockList(10);
  res.status(200).json(myIncreaseStocksJSON)
})

app.listen(port, () => {
  console.log('Server is running', port);
});
