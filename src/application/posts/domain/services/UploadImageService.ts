import fs from 'fs'
import S3StorageProvider from "../../../../adapters/storage/S3StorageProvider";
import { ImageProps, Image } from "../models/Image";
import DiskStorageProvider from "../../../../adapters/storage/DiskStorageProvider";

type UpdateImageResponse = {
    src: string
}

interface IUploadPostService {
    s3StorageProvider: S3StorageProvider,
    diskStorageProvider: DiskStorageProvider
}

export class UploadImageService {

    constructor(private props: IUploadPostService) {}

    /**
    * Upload the image to S3 Bucket and update the Post by slug
    * @param {ImageProps[]} files - A list of data files
    */
    async execute(file: ImageProps): Promise<UpdateImageResponse> {

        const imagePath = `${file.destination}\\${file.filename}`
        const imageBuffer = fs.readFileSync(imagePath)
        const imageDestination = this.props.s3StorageProvider.destination

        await this.props.s3StorageProvider.imageUpload(
            file.filename,
            imageBuffer
        )
        
        await this.props.diskStorageProvider.deleteFile(imagePath)       
        
        return { src: imageDestination + file.filename }
    }
}