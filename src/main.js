// @ts-check

const server = require('./app')
const { createMaster } = require('./createMaster')
const PORT = process.env.PORT

server.listen(PORT, async () => {
  console.log(`The Express server is listening at port: ${PORT}`)
  await createMaster()
})
