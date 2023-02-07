const yahooFinance = require("yahoo-finance2").default

const parseRequestStringToStockCodeList = async (param) => {
  try {
    const codes = param.split('|')
    console.log(codes)
    const result = await yahooFinance.quote(codes)
    return result
  } catch (err) {
    if (err) throw err
  }
}

module.exports = {
  parseRequestStringToStockCodeList
}