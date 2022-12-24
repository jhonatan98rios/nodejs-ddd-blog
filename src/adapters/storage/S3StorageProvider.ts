import aws, { S3 } from 'aws-sdk';
import { uploadConfig } from './config';

import * as dotenv from 'dotenv'
dotenv.config()

export default class S3StorageProvider {
  private client: S3
  public destination: string

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    })
    this.destination = process.env.BUCKET_PATH as string
  }

  public async imageUpload(filename: string, body: Buffer): Promise<void> {
    await this.client.upload({
      Bucket: process.env.BUCKET_NAME as string,
      Key: filename,
      Body: body,
    })
      .promise()
      .catch(err => {
        console.log('Deu erro porra', err)
      })
      .then(res => {
        console.log('Imagem enviada', res)
      })
  }


  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
