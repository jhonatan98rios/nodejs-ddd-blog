import fs from 'fs'
import S3StorageProvider from "../../../../adapters/storage/S3StorageProvider";
import AppError from "../../../../shared/errors/AppError";
import { ImageProps, Image } from "../models/Image";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";
import DiskStorageProvider from "../../../../adapters/storage/DiskStorageProvider";

type UpdatePostResponse = {
    updatedPost: Post
}

interface IUploadPostService {
    postRepository: AbstractPostRepository,
    s3StorageProvider: S3StorageProvider,
    diskStorageProvider: DiskStorageProvider
}

export class UploadPostService {

    constructor(private props: IUploadPostService) {}

    /**
    * Upload the image to S3 Bucket and update the Post by slug
    * @param {string} slug - The slug of the post to update
    * @param {ImageProps[]} file - A list of data files
    */
    async execute(slug: string, file: ImageProps): Promise<UpdatePostResponse> {

        const post = await this.props.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        const imagePath = `${file.destination}\\${file.filename}`
        const imageBuffer = fs.readFileSync(imagePath)
        const imageDestination = this.props.s3StorageProvider.destination

        await this.props.s3StorageProvider.imageUpload(
            file.filename,
            imageBuffer
        )
        
        await this.props.diskStorageProvider.deleteFile(imagePath)

        const banner = new Image({
            destination: imageDestination,
            filename: file.filename,
            size: file.size
        })

        const { title, subtitle, content, categories, createdAt, seo_title, seo_description, seo_keywords } = post
        
        const updatedPost = new Post({
            title, subtitle, content, categories, createdAt, banner, seo_title, seo_description, seo_keywords
        })

        await this.props.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}