// @ts-check
const express = require('express')
const app = express()
const cors = require('cors')
const server = require('http').createServer(app)

app.use(cors())
app.use(express.json())

const { Server } = require('socket.io')
const io = new Server(server)

const sise = io.of('/sise')
const {
  createRandomPrice,
  createRandomPercent,
  createRandomprevPriceRate,
  createRandomIsUp,
} = require('./stocks.js')
const { clearInterval } = require('timers')

const interestRouter = require('./interestApp')
const miniRouter = require('./miniStockApp')
const masterRouter = require('./masterApp')
const stockRouter = require('./stockApp')
app.use('/interest', interestRouter)
app.use('/mini', miniRouter)
app.use('/master', masterRouter)
app.use('/stock', stockRouter)

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
  let count = 0
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
      intervals.length = 0
      console.log(`invervals: ${intervals.length}`)
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
    count += 1 
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
    console.log(`Current sise count with count variable: ${count}`)
    console.log(`Current sise count: ${intervals.length}`)
  })
})

module.exports = server
