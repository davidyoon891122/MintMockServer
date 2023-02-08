const { readInterestList, saveInterestList } = require('./dataManager.js')
const { stocks, stockImageURL } = require('./stockInfo.js')

function getRandomNumber(min, max, isInt) {
  if (isInt) {
    return Math.round(Math.random() * (max - min) + min)
  }
  return Math.random() * (max - min) + min
}

function getRandomMyStockJSON() {
  const jsonFormat = {
    stockName: 'AT&T',
    currentPrice: 2150,
    stockQuantity: 0.075269,
    valueChange: 156,
    percentChange: 7.82,
    imageURL: '',
  }

  jsonFormat.stockName = stocks[Math.floor(Math.random() * stocks.length)]
  jsonFormat.currentPrice = getRandomNumber(0, 30000, true)
  jsonFormat.stockQuantity = Math.random()
  jsonFormat.valueChange = getRandomNumber(0, 10000, true)
  jsonFormat.percentChange = getRandomNumber(0, 30, false)
  jsonFormat.imageURL = stockImageURL[jsonFormat.stockName]

  return jsonFormat
}

function getRandomDividendStockJSON() {
  const jsonFormat = {
    stockName: 'AT&T',
    currentPrice: 2150,
    percentChange: 7.82,
    imageURL: '',
    exDividendDate: '2월 28일',
  }

  jsonFormat.stockName = stocks[Math.floor(Math.random() * stocks.length)]
  jsonFormat.currentPrice = getRandomNumber(0, 30000, true)
  jsonFormat.percentChange = getRandomNumber(0, 30, false)
  jsonFormat.imageURL = stockImageURL[jsonFormat.stockName]
  jsonFormat.exDividendDate = '2월 28일'

  return jsonFormat
}

function getRandomIncreaseStockJSON() {
  const jsonFormat = {
    stockName: 'AT&T',
    stockCode: 'AAA',
    percentChange: 4.34,
    currentPrice: 2150,
    imageURL: '',
  }

  jsonFormat.stockName = stocks[Math.floor(Math.random() * stocks.length)]
  jsonFormat.stockCode = 'AAA'
  jsonFormat.percentChange = getRandomNumber(0, 30, false)
  jsonFormat.currentPrice = getRandomNumber(0, 30000, true)
  jsonFormat.imageURL = stockImageURL[jsonFormat.stockName]

  return jsonFormat
}

function getInterestStockList(userId) {
  try {
    return readInterestList(userId)
  } catch (err) {
    if (err) throw err
  }
  
}

function createMyStockLists(count) {
  const list = []
  Array.from(Array(count).keys()).forEach(() => {
    const randomJSON = getRandomMyStockJSON()
    list.push(randomJSON)
  })
  return list
}

function createMyProfit() {
  const list = []
  const jsonFormat = {
    userName: '관리자',
    totalAsset: getRandomNumber(1000, 10000000, true),
    valueChange: getRandomNumber(0, 10000, true),
    percentChange: getRandomNumber(0, 300, false),
    referenceDay: '20220223',
  }

  list.push(jsonFormat)
  return list
}

function createDividendStockList(count) {
  const list = []
  Array.from(Array(count).keys()).forEach(() => {
    const randomJSON = getRandomDividendStockJSON()
    list.push(randomJSON)
  })

  return list
}

function createIncreaseStockList(count) {
  const list = []
  Array.from(Array(count).keys()).forEach(() => {
    const randomJSON = getRandomIncreaseStockJSON()
    list.push(randomJSON)
  })
  return list
}

function createRandomPrice(code) {
  if (code === 'Apple') {
    return getRandomNumber(142.61, 200.0, true)
  }
  if (code === 'Tesla') {
    return getRandomNumber(154.23, 200.0, true)
  }
  if (code === 'Amazone') {
    return getRandomNumber(90.0, 200.0, true)
  }
  if (code === 'Microsoft') {
    return getRandomNumber(241.67, 300.0, true)
  }
  if (code === 'Uber') {
    return getRandomNumber(30.5, 50.0, true)
  }
  if (code === 'Meta') {
    return getRandomNumber(142.35, 250.0, true)
  }
  return getRandomNumber(90.0, 200.0, true)
}

function createRandomPercent(code) {
  if (code === 'Apple') {
    return getRandomNumber(0.12, 10.0, true)
  }
  if (code === 'Tesla') {
    return getRandomNumber(10.0, 30.0, true)
  }
  if (code === 'Amazone') {
    return getRandomNumber(-30.0, 30.0, true)
  }
  if (code === 'Microsoft') {
    return getRandomNumber(-30.67, 30.0, true)
  }
  if (code === 'Uber') {
    return getRandomNumber(10.5, 30.0, true)
  }
  if (code === 'Meta') {
    return getRandomNumber(-20.35, 30.0, true)
  }

  return getRandomNumber(-90.0, 90.0, true)
}

function createRandomprevPriceRate(code) {
  if (code === 'Apple') {
    return getRandomNumber(142.61, 200.0, true)
  }
  if (code === 'Tesla') {
    return getRandomNumber(154.23, 200.0, true)
  }
  if (code === 'Amazone') {
    return getRandomNumber(90.0, 200.0, true)
  }
  if (code === 'Microsoft') {
    return getRandomNumber(241.67, 300.0, true)
  }
  if (code === 'Uber') {
    return getRandomNumber(30.5, 50.0, true)
  }
  if (code === 'Meta') {
    return getRandomNumber(142.35, 250.0, true)
  }

  return getRandomNumber(90.0, 200.0, true)
}

function createRandomIsUp() {
  const randomNumber = getRandomNumber(0, 10, true)

  if (randomNumber % 2 === 0) {
    return true
  }

  return false
}

const addInterestCode = (userId, code) => {
  try {
    const interestList = readInterestList(userId)
    interestList.stocks.push({
      "code": code
    })
    saveInterestList(userId, interestList)

  } catch (err) {
    console.log(err)
    if (err) throw err
  }
}

module.exports = {
  createMyStockLists,
  createMyProfit,
  createDividendStockList,
  createIncreaseStockList,
  createRandomPrice,
  createRandomPercent,
  createRandomprevPriceRate,
  createRandomIsUp,
  getInterestStockList,
  addInterestCode,
}
