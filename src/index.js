const express = require('express')
const redis = require('redis')
const { PORT, REDIS_PORT, REDIS_HOST } = process.env

const client = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
})
client.set('visits', 0)

const app = express()

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    if (err) return console.log(err)
    res.send(`Numbers of visits is ${visits}`)
    client.set('visits', Number(visits) + 1)
  })
})

app.listen(PORT, () => console.log(`server on ${PORT}`))
