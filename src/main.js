// @ts-check

const app = require('./app')

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`The Express server is listening at port: ${PORT}`)
})
