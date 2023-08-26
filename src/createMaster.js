const axios = require('axios').default
const { writeMaster } = require('./dataManager')

async function createMaster() {
  try {
    const result = await axios.get('https://api.nasdaq.com/api/screener/stocks?tableonly=true&download=true')
    await writeMaster(result.data.data.rows)
  } catch (error) {
    console.log(error)
    if (error) throw error
  }
}

module.exports = {
  createMaster
}