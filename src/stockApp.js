const router = require('express').Router()
const { requestQuote, requestInsights } = require('./requestYahooAPI.js')

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
    const result = await requestQuote(codes)

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


router.get('/insights', async (req, res) => {
  const code = req.query.code
  if (code === undefined || code === "") {
    res.status(200).json({
      message: "Please write the code to search insights"
    })
    return
  }

  const result = await requestInsights(code)
  
  res.status(200).json({
    result,
    message: "Test Success"
  })
})

module.exports = router