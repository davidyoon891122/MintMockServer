const router = require('express').Router()
const { 
  createMyStockLists,
  createMyProfit,
  createDividendStockList,
  createIncreaseStockList
 } = require('./stocks')


router.get('/my-stock', (req, res) => {
  const myStocksJSON = createMyStockLists(5)
  res.status(200).json(myStocksJSON)
})

router.get('/my-profit', (req, res) => {
  const myProfitJSON = createMyProfit()
  res.status(200).json(myProfitJSON)
})

router.get('/dividend-list', (req, res) => {
  const myDividendsJSON = createDividendStockList(10)
  res.status(200).json(myDividendsJSON)
})

router.get('/increase-list', (req, res) => {
  const myIncreaseStocksJSON = createIncreaseStockList(10)
  res.status(200).json(myIncreaseStocksJSON)
})

module.exports = router