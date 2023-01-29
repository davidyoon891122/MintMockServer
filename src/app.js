// @ts-check
const express = require('express')
const yahooFinance = require('yahoo-finance2').default
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
app.use(cors())

const { Server } = require('socket.io')
const io = new Server(server)

const sise = io.of('/sise')

const {
  createDividendStockList,
  createIncreaseStockList,
  createMyProfit,
  createMyStockLists,
  createInterestList,
  createRandomPrice,
  createRandomPercent,
  createRandomprevPriceRate,
  createRandomIsUp,
} = require('./stocks.js')
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

app.get('/current-price', async (req, res) => {
  const results = await yahooFinance.quote('AAPL')
  const currentPrice = results.regularMarketPrice

  res.status(200).json({
    currentPrice,
  })
})

// SocketIO
io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', (reason) => {
    console.log('disconnected')
  })

  socket.on('message', (message) => {
    io.emit('message', `messsage from the server: ${message}`)
  })

  socket.on('join', (roomName) => {
    console.log(`request join to : ${roomName}`)
    socket.join(roomName)
  })
})

sise.on('connection', (socket) => {
  console.log('Client has connected to sise namespace')
  // @ts-ignore
  let interval
  // @ts-ignore
  const intervals = []
  socket.emit('connectCompletion', 'connected')
  socket.on('disconnect', () => {
    console.log('The client has disconnected')
    // @ts-ignore
    if (interval !== null) {
      // @ts-ignore
      clearInterval(interval)
    }
    if (intervals.length !== 0) {
      // @ts-ignore
      intervals.forEach((interval) => {
        clearInterval(interval)
      })
    }
  })

  socket.on('service', (serviceName) => {
    console.log(`client request ${serviceName}..`)
    socket.emit('service', 'This message is from sise server')
    interval = setInterval(() => {
      console.log('sent sise')
      socket.emit('sise', '10,000')
    }, 1000)
  })

  socket.on('code', (codeName) => {
    console.log(`client request ${codeName}..`)
    socket.emit('service', `${codeName} sise has set!`)

    const siseInterval = setInterval(() => {
      const currentPrice = createRandomPrice(codeName).toFixed(4)
      const percentChange = createRandomPercent(codeName).toFixed(2)
      const prevPriceRate = createRandomprevPriceRate(codeName).toFixed(2)
      const isUp = createRandomIsUp()
      console.log(percentChange, prevPriceRate, isUp)

      socket.emit('sise', {
        code: codeName,
        currentPrice,
        percentChange,
        prevPriceRate,
        isUp,
      })
    }, 1000)
    intervals.push(siseInterval)
  })
})

module.exports = server
