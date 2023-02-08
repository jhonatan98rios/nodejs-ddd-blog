import aws, { S3 } from 'aws-sdk';
import { uploadConfig } from './config';

import * as dotenv from 'dotenv'
import { AbstractCloudStorageProvider } from 'application/posts/domain/providers/AbstractStorageProvider';
dotenv.config()

export default class S3StorageProvider implements AbstractCloudStorageProvider<S3> {
  public client: S3
  public destination: string

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    })
    this.destination = process.env.BUCKET_PATH as string
  }

  /**
  * upload the image to S3 Bucket
  * @param {string} filename - The name of file to upload
  * @param {Buffer} body - Bufferized image file
  */
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
  }

  /**
  * Remove the image of S3 Bucket
  * @param {string} filename - The name of file to delete
  */
  public async deleteFile(filename: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filename,
      })
      .promise();
  }
}
