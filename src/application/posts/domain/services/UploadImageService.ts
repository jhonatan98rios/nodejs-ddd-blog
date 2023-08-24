import fs from 'fs'
import { Image } from "../models/Image";
import S3StorageProvider from "@posts/infra/storage/S3StorageProvider";
import DiskStorageProvider from "@posts/infra/storage/DiskStorageProvider";
import path from 'path';

type UpdateImageResponse = {
    src: string
    size: number
}

interface FileProps {
    destination: string
    filename: string
    size: number
}

interface IUploadPostService {
    s3StorageProvider: S3StorageProvider,
    diskStorageProvider: DiskStorageProvider
}

export class UploadImageService {

    constructor(private props: IUploadPostService) {}

    /**
    * Upload the image to S3 Bucket and update the Post by slug
    * @param {FileProps} file - A list of data files
    */
    async execute(file: FileProps): Promise<UpdateImageResponse> {

        const imagePath = path.join(file.destination, file.filename)
        const imageBuffer = fs.readFileSync(imagePath)
        const imageDestination = this.props.s3StorageProvider.cdnPath

        await this.props.s3StorageProvider.imageUpload(
            file.filename,
            imageBuffer
        )
        
        await this.props.diskStorageProvider.deleteFile(imagePath)
        
        const banner = new Image({
            src: imageDestination + file.filename,
            size: file.size
        })
        
        return banner
    }
}