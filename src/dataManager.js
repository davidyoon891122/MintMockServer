const { readFile, writeFile, readFileSync, fstat, existsSync, createReadStream, ReadStream, statSync } = require("fs")
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

const readMaster = async (fileName) => {
  try {
    const file = fileName
    if (existsSync(file)) {
 
      const masterFileStream = await createReadStream(file)
      return masterFileStream
    } else {
      throw new Error()
    }
  } catch (err) {
    if (err) throw err
  }
}

const getFileSize = (fileName) => {
  if (existsSync(fileName)) {
    const fileStat = statSync(fileName)

    return fileStat.size
  }
}

module.exports = {
  saveInterestList,
  readInterestList,
  readMaster,
  getFileSize
}