const router = require('express').Router()
const path = require('path')
const mine = require('mime')
const { readMaster, getFileSize }= require('./dataManager.js')


router.get('/', async (req, res) => {
  console.log("client request download a master")
  try {
    const file = "master.json"

    const filename= path.basename(file)
    const mineType = mine.getType(file)

    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', mineType)

    const filestream = await readMaster(file)

    if (filestream !== undefined) {
      filestream.pipe(res)
    }

  } catch (err) {
    console.log(err)
    res.status(200).json({
      result: "",
      message: "Failed"
    })
  }
})

router.get('/bigsize', async (req, res) => {
  console.log("client request download a bigfile")
  try {
    const file = "bigsize.zip"

    const filename= path.basename(file)
    const mineType = mine.getType(file)

    res.setHeader('Content-disposition', 'attachment; filename=' + filename)
    res.setHeader('Content-type', mineType)
    const fileSize = getFileSize(file)

    if (fileSize !== undefined) {
      console.log(`fileSize: ${fileSize}`)
      res.setHeader('Content-Length', fileSize)
    }

    const filestream = await readMaster(file)

    if (filestream !== undefined) {
      filestream.pipe(res)
    }

  } catch (err) {
    console.log(err)
    res.status(200).json({
      result: "",
      message: "Failed"
    })
  }
})

module.exports = router