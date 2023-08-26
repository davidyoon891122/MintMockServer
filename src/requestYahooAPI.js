const yahooFinance = require("yahoo-finance2").default

const requestQuote = async (param) => {
  try {
    const codes = param.split('|')
    console.log(codes)
    const result = await yahooFinance.quote(codes)
    return result
  } catch (err) {
    if (err) throw err
  }
}

const requestInsights = async (param) => {
  try {
    const result = await yahooFinance.insights(param)
    return result
  } catch (err) {
    if (err) throw err
  }
}

module.exports = {
  requestQuote,
  requestInsights
}