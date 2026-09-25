const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

type ConfirmedKeys = {
  accessKey: string
  secretAccessKey: string
}

export function getAccessKeys(): ConfirmedKeys {
  if (!accessKey || !secretAccessKey) {
    console.log('No AWS-keys found! Check your .env file.')
    process.exit(1)
  }
  return { accessKey, secretAccessKey }
}