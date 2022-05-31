const { stocks, stockImageURL } = require('./stockInfo.js')

function createMyStockLists(count) {
  let list = []
  Array.from(Array(count).keys()).forEach((element) => {
    const randomJSON = getRandomMyStockJSON()
    list.push(randomJSON)
  })
  console.log(list)
  return list
}

function createMyProfit() {
  let list = []
  let jsonFormat = {
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
  let list = []
  Array.from(Array(count).keys()).forEach((element) => {
    const randomJSON = getRandomDividendStockJSON()
    list.push(randomJSON)
  })
  console.log(list)
  return list
}

function createIncreaseStockList(count) {
  let list = []
  Array.from(Array(count).keys()).forEach((element) => {
    const randomJSON = getRandomIncreaseStockJSON()
    list.push(randomJSON)
  })
  return list
}

function getRandomNumber(min, max, isInt) {
  if (isInt) {
    return Math.round(Math.random() * (max - min) + min)
  }
  return Math.random() * (max - min) + min
}

function getRandomMyStockJSON() {
  let jsonFormat = {
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
  let jsonFormat = {
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
  let jsonFormat = {
    stockName: 'AT&T',
    stockCode: 'AAA',
    'percentChange:': 4.34,
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

module.exports = {
  createMyStockLists,
  createMyProfit,
  createDividendStockList,
  createIncreaseStockList,
}
