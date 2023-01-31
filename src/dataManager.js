const { readFile, writeFile, readFileSync, fstat, existsSync, createReadStream, ReadStream } = require("fs")
const path = require('path')


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

const readMaster = async () => {
  try {
    const file = 'master.json'
    if (existsSync(file)) {
 
      const masterFileStream = await createReadStream(file)
      return masterFileStream
    }
  } catch (err) {
    if (err) throw err
  }
}

module.exports = {
  saveInterestList,
  readInterestList,
  readMaster
}