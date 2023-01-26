// @ts-check
const express = require('express')
const app = express()
const cors = require("cors")
const http = require("http")
app.use(cors())

const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const sise = io.of("/sise")

const {
  createDividendStockList,
  createIncreaseStockList,
  createMyProfit,
  createMyStockLists,
  createInterestList,
} = require('./stocks.js')
const { Socket } = require('engine.io')
const { clearInterval } = require('timers')

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/my-stock', (req, res) => {
  const myStocksJSON = createMyStockLists(5)
  res.status(200).json(myStocksJSON)
})

app.get('/my-profit', (req, res) => {
  const myProfitJSON = createMyProfit()
  res.status(200).json(myProfitJSON)
})

app.get('/dividend-list', (req, res) => {
  const myDividendsJSON = createDividendStockList(10)
  res.status(200).json(myDividendsJSON)
})

app.get('/increase-list', (req, res) => {
  const myIncreaseStocksJSON = createIncreaseStockList(10)
  res.status(200).json(myIncreaseStocksJSON)
})

app.get('/interest-list', (req, res) => {
  const myInterestStocksJSON = createInterestList()
  res.status(200).json(myInterestStocksJSON)
})

io.on('connection', (socket) => {
  console.log("a user connected");
  
  socket.on('disconnect', (reason) => {
    console.log("disconnected")
  })

  socket.on('message', (message) => {
    io.emit("message", `messsage from the server: ${message}`)
  })

  socket.on('join', (roomName) => {
    console.log(`request join to : ${roomName}`)
    socket.join(roomName)
  })
})

sise.on('connection', (socket) => {
  console.log('Client has connected to sise namespace')
  let interval
  let siseInterval
  socket.emit("connectCompletion", "connected")
  socket.on('disconnect', () => {
    console.log('The client has disconnected')
    if (interval !== null) {
      clearInterval(interval)
    }
    if (siseInterval !== null) {
      clearInterval(siseInterval)
    }
  })

  socket.on('service', (serviceName) => {
    console.log(`client request ${serviceName}..`)
    socket.emit("service", "This message is from sise server")
    interval = setInterval(() => {
      console.log("sent sise")
      socket.emit("sise", "10,000")
    }, 1000)
  })

  socket.on('code', (codeName) => {
    console.log(`client request ${codeName}..`)
    socket.emit("service", `${codeName} sise has set!`)
    siseInterval = setInterval(() => {
      console.log("sent sise")
      socket.emit("sise", {
        code: codeName,
        currentPrice: "10,000"
      })
    }, 1000)
  })
})

module.exports = server
