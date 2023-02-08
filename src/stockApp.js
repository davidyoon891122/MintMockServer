const router = require('express').Router()
const { parseRequestStringToStockCodeList } = require('./requestParser.js')

// Request CurrentPrice
router.get('/current-price', async (req, res) => {
  const codes = req.query.codes
  console.log(codes)
  if (codes === undefined || codes === null || codes === "") {
    res.status(200).json({
      errorMessage: "Please insert the code name"
    })
    return
  }

  try {
    const result = await parseRequestStringToStockCodeList(codes)

    res.status(200).json({
      result,
      message: "Success"
    })
    return
  } catch (err) {
    res.status(200).json({
      result: [],
      message: "Some error is occured!"
    })
    return
  }
})

module.exports = router