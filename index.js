// simple-expressjs/index.js
import express from "express"
import { createMyStockLists } from "./stocks.js"
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

app.get("/json-test", (req, res) => {
    const resJson = {
        "name": "yoon"
    }
    res.status(200).json(resJson)
});

app.get("/my-stock", (req, res) => {
    createMyStockLists(5)
    

    const resJson = [   
        { 
            "stockName": "AT&T",
            "currentPrice": 2150,
            "sotckQuantity": 0.075269,
            "valueChange": 156,
            "percentChange": 7.82,
        },
        { 
            "stockName": "AT&T",
            "currentPrice": 2150,
            "sotckQuantity": 0.075269,
            "valueChange": 156,
            "percentChange": 7.82,
        },
        { 
            "stockName": "AT&T",
            "currentPrice": 2150,
            "sotckQuantity": 0.075269,
            "valueChange": 156,
            "percentChange": 7.82,
        },
        { 
            "stockName": "AT&T",
            "currentPrice": 2150,
            "sotckQuantity": 0.075269,
            "valueChange": 156,
            "percentChange": 7.82,
        },

    ]
    
    res.status(200).json(resJson)
});

app.listen(port, () => {
  console.log('Server is running', port);
});
