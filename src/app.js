// @ts-check
const express = require('express')
const yahooFinance = require('yahoo-finance2').default
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)
const path = require('path')
const mine = require('mime')

app.use(cors())
app.use(express.json())

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
const { saveInterestList, readInterestList, readMaster, getFileSize }= require('./dataManager.js')
const { fstat } = require('fs')

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
// Request CurrentPrice
app.get('/current-price', async (req, res) => {
  const code = req.query.code
  console.log(code)
  if (code === undefined || code === null || code === "") {
    res.status(200).json({
      errorMessage: "Please insert the code name"
    })
    return
  }
  // @ts-ignore
  const results = await yahooFinance.quote(code)
  console.log(results)

  if (results === undefined || results === null || results === "") {
    res.status(200).json({
      errorMessage: "There is not matched data"
    })
    return
  }

  const currentPrice = results.regularMarketPrice

  res.status(200).json({
    currentPrice,
  })
})

// Request add interestList
app.post('/add-interest-list', (req, res) => {
  const body = req.body

  console.log(body)

  saveInterestList("davidyoon", body)

  res.status(200).json({
    reuslt: [],
    message: "Success"
  })
})

app.get('/interest-list-test',  async (req, res) => {
  try {
    console.log(req.query.userID)
    const list = await readInterestList(req.query.userID)
    console.log(list)
    res.status(200).json({
      result: list,
      message: "Success"
    })
  } catch (err) {
    if (err) console.log(err)
    res.status(200).json({
      result: [],
      message: "Success"
    })
  }
})

app.get('/master', async (req, res) => {
  console.log("client request download a master")
  try {
    const file = "master.json"

    const filename= path.basename(file)
    const mineType = mine.getType(file)

    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', mineType)

    const filestream = await readMaster(file)

    if (filestream !== undefined) {
      filestream.pipe(res)
    }

  } catch (err) {
    console.log(err)
    res.status(200).json({
      result: "",
      message: "Failed"
    })
  }
})

app.get('/bigsize', async (req, res) => {
  console.log("client request download a bigfile")
  try {
    const file = "bigsize.zip"

    const filename= path.basename(file)
    const mineType = mine.getType(file)

    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', mineType)
    const fileSize = getFileSize(file)

    if (fileSize !== undefined) {
      console.log(`fileSize: ${fileSize}`)
      res.setHeader('Content-Length', fileSize)
    }

    const filestream = await readMaster(file)

    if (filestream !== undefined) {
      filestream.pipe(res)
    }

  } catch (err) {
    console.log(err)
    res.status(200).json({
      result: "",
      message: "Failed"
    })
  }
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
