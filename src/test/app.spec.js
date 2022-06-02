// @ts-check

const exp = require('constants')
const supertest = require('supertest')
const app = require('../app')
const request = supertest(app)

test('request my-stock', async () => {
  const result = await request.get('/my-stock').accept('application/json')

  if (result.body.length != 0) {
    expect(result.body[0]).toMatchObject({
      stockName: expect.any(String),
      currentPrice: expect.any(Number),
      valueChange: expect.any(Number),
      percentChange: expect.any(Number),
      imageURL: expect.any(String),
    })
  }
})

test('request my-profit', async () => {
  const result = await request.get('/my-profit').accept('application/json')
  console.log(result.body)

  if (result.body.length != 0) {
    expect(result.body[0]).toMatchObject({
      userName: expect.any(String),
      totalAsset: expect.any(Number),
      valueChange: expect.any(Number),
      percentChange: expect.any(Number),
      referenceDay: expect.any(String),
    })
  }
})

test('request dividend-list', async () => {
  const reuslt = await request.get('/dividend-list').accept('application/json')
  console.log(reuslt.body)
  if (reuslt.body.length != 0) {
    expect(reuslt.body[0]).toMatchObject({
      stockName: expect.any(String),
      currentPrice: expect.any(Number),
      percentChange: expect.any(Number),
      imageURL: expect.any(String),
      exDividendDate: expect.any(String),
    })
  }
})

test('request increase-list', async () => {
  const result = await request.get('/increase-list').accept('application/json')
  console.log(result.body)

  if (result.body.length != 0) {
    expect(result.body[0]).toMatchObject({
      stockName: expect.any(String),
      stockCode: expect.any(String),
      percentChange: expect.any(Number),
      currentPrice: expect.any(Number),
      imageURL: expect.any(String),
    })
  }
})
