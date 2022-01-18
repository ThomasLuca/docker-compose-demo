const express = require('express')
const cors = require('cors')
require('dotenv').config()
const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate an API token from the "API Tokens Tab" in the UI



const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/message', (req, res) => {
  res.status(200).send({"message": "This came from the backend 😶‍🌫️"})
})



const token = 'BLXJ9d4pxqNp6ePuPX3JYpYg5bivgsby8AxhfukvejmTSeCywnSwQ46rU88KGKx8LKrW78V3nmYZkMISy3rPYw=='
const org = 'org'
const bucket = 'buck'

app.get('/influx', (req, res) => {
  
  const client = new InfluxDB({url: 'http://influxdb:8086', token: token})
  const {Point} = require('@influxdata/influxdb-client')
  const writeApi = client.getWriteApi(org, bucket)
  writeApi.useDefaultTags({host: 'host1'})
  let rand = Math.random()*100
  const point = new Point('meme').floatField('BEEPBOP', rand)
  writeApi.writePoint(point)

  writeApi
    .close()
    .then(() => {
        console.log('FINISHED')
        res.send({"message": "Successful influx write"})
    })
    .catch(e => {
        console.error(e)
        console.log('Finished ERROR')
    })
})



app.listen(process.env.PORT, () => {
  console.log(`Express API running at : ${process.env.PORT}`)
})