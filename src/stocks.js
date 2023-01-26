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

function createInterestList() {
  return getInterestStockList()
}

function createRandomPrice(code) {
  if (code === 'Apple') {
    return getRandomNumber(142.61, 200.0, true)
  } else if (code === 'Tesla') {
    return getRandomNumber(154.23, 200.0, true)
  } else if (code === 'Amazone') {
    return getRandomNumber(90.0, 200.0, true)
  } else if (code === 'Microsoft') {
    return getRandomNumber(241.67, 300.0, true)
  } else if (code === 'Uber') {
    return getRandomNumber(30.5, 50.0, true)
  } else if (code === 'Meta') {
    return getRandomNumber(142.35, 250.0, true)
  } else {
    return getRandomNumber(90.0, 200.0, true)
  }
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

function getInterestStockList() {
  let list = [
    {
      stockName: 'Apple',
      stockCode: 'AAPL',
      currentPrice: 142.53,
      percentChange: 2.3,
      prevPriceRate: 1.0,
      isUp: true,
    },
    {
      stockName: 'Tesla',
      stockCode: 'TSLA',
      currentPrice: 152.173,
      percentChange: 5.73,
      prevPriceRate: 8.26,
      isUp: true,
    },
    {
      stockName: 'Amazon',
      stockCode: 'AMZN',
      currentPrice: 97.2655,
      percentChange: 0.96,
      prevPriceRate: 0.94,
      isUp: true,
    },
    {
      stockName: 'Microsoft',
      stockCode: 'MSFL',
      currentPrice: 241.1,
      percentChange: -0.39,
      prevPriceRate: 1.09,
      isUp: false,
    },
    {
      stockName: 'Uber',
      stockCode: 'UBER',
      currentPrice: 29.93,
      percentChange: 0.5,
      prevPriceRate: 1.0,
      isUp: true,
    },
    {
      stockName: 'Meta',
      stockCode: 'META',
      currentPrice: 141.6,
      percentChange: -1.08,
      prevPriceRate: 1.54,
      isUp: false,
    },
  ]

  return list
}

module.exports = {
  createMyStockLists,
  createMyProfit,
  createDividendStockList,
  createIncreaseStockList,
  createInterestList,
  createRandomPrice,
}
