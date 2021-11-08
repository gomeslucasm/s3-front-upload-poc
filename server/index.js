import express from 'express';
import {generateUploadUrl} from './s3.js'
import bodyParser from 'body-parser'

const app = express();

app.use(
  express.urlencoded({
    extended: false
  })
)

app.use(bodyParser.json());

app.use(express.static('../front'))

app.post('/s3Url', async (req, res) => {
  const name = req.body.name
  console.log('name = ', name)
  const url = await generateUploadUrl(req.body.name)
  res.send({url})
})

app.listen(8080, ()=>{console.log('Server on')} )