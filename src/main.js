// @ts-check

const server  = require('./app')

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
