// simple-expressjs/index.js
import express from "express"
import { createMyStockLists } from "./stocks.js"
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send('Hello');
});

app.get("/my-stock", (req, res) => {
    const myStocksJSON = createMyStockLists(5)
    res.status(200).json(myStocksJSON)
});

app.listen(port, () => {
  console.log('Server is running', port);
});
