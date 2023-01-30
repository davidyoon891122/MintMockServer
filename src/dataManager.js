const { readFile, writeFile, readFileSync } = require("fs")


const saveInterestList = async (userID, list) => {
  // write Data
  await writeFile(`${userID}.json`, JSON.stringify(list), (err) => {
    if (err) throw err
  })
}

const readInterestList = (userID) => {
  try {
    const list = readFileSync(`${userID}.json`, 'utf-8')
    return JSON.parse(list)
  } catch (err) {
    if (err) throw err
  }
  
}

module.exports = {
  saveInterestList,
  readInterestList
}