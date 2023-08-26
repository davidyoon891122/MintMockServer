const router = require('express').Router()
const { 
  getInterestStockList,
  saveInterestList,
  readInterestList,
  addInterestCode,
  removeInterestCode,
 } = require('./stocks')

router.get('/interest-list', async (req, res) => {
  const userId = req.query.userId
  console.log(userId)

  if (userId === undefined || userId === "") {
    res.status(200).json({
      stocks: [],
      message: "Param Input Error"
    })
    return
  }
  try {
    const myInterestStocksJSON = await getInterestStockList(userId)
    res.status(200).json(myInterestStocksJSON)
    return
  } catch (err) {
    if (err) {
      res.status(200).json({
        stocks: [],
        message: "There is not matched data"
      })
      return
    }
  }
})

// Request add interestList
router.post('/add-interest-list', (req, res) => {
  const body = req.body

  console.log(body)

  saveInterestList("davidyoon", body)

  res.status(200).json({
    reuslt: [],
    message: "Success"
  })
})

router.patch('/add', async (req, res) => {
  console.dir(req.body)
  const userId = req.body.userId
  const code = req.body.code
  console.log(`request add stock ${code} to exist jsonfile ${userId}`)

  try {
    await addInterestCode(userId, code)
    res.status(200).json({
      result: [],
      message: "Update success"
    })
    return
  } catch (err) {
    if (err)
    res.status(200).json({
      result: [],
      message: "Failed to add code to list"
    })
  }
})

router.patch('/delete', async (req, res) => {
  console.dir(req.body)
  const userId = req.body.userId
  const code = req.body.code
  console.log(`request delete stock ${code} to exist jsonfile ${userId}`)
  try {
    await removeInterestCode(userId, code)
    res.status(200).json({
      result: [],
      message: "Delete Success"
    })
  } catch (err) {
    if (err) 
    res.status(200).json({
      result: [],
      message: "Failed to delete code from list"
    })
  }
})

module.exports = router