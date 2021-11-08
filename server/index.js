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
  const filename = req.body.name
  const url = await generateUploadUrl(filename)
  res.send({url})
})

app.listen(8080, ()=>{console.log('Server on')} )