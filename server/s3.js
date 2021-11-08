import aws from 'aws-sdk'
import dotenv from 'dotenv'
import { customAlphabet } from 'nanoid'

dotenv.config()

const region = process.env.REGION
const bucketName = process.env.BUCKET_NAME 
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

const ramdomPart = customAlphabet('1234567890abcdef', 20)

const generateRadomFileName = (name) => 
  `${ramdomPart()}${name}` 

const generateUploadUrl = async (dataName) =>  {
  const params ={
    Bucket: bucketName,
    Key: generateRadomFileName(dataName),
    Expires: 60 * 3,
  }
  console.log({params})

  const url =  await s3.getSignedUrlPromise(
    'putObject',
    params
  )
  return url
}
 

export { s3, generateUploadUrl }