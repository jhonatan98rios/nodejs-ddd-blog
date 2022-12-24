import S3StorageProvider from "../../../../adapters/storage/S3StorageProvider";
import AppError from "../../../../shared/errors/AppError";
import { PostDto } from "../../infra/validation/PostValidation.dto";
import { ImageProps, Image } from "../models/Image";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";
import fs from 'fs'
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
    * @param {ImageProps[]} files - A list of data files
    */
    async execute(slug: string, files: ImageProps[]): Promise<UpdatePostResponse> {

        const post = await this.props.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        const images = await Promise.all(
            files.map(async file => {

                const imagePath = `${file.destination}\\${file.filename}`
                const imageBuffer = fs.readFileSync(imagePath)
                const imageDestination = this.props.s3StorageProvider.destination

                await this.props.s3StorageProvider.imageUpload(
                    file.filename,
                    imageBuffer
                )
                
                await this.props.diskStorageProvider.deleteFile(imagePath)
        
                return  new Image({
                    destination: imageDestination,
                    filename: file.filename,
                    mimetype: file.mimetype,
                    size: file.size
                })
            })
        )

        const { title, subtitle, content, categories, createdAt } = post
        
        const updatedPost = new Post({
            title, subtitle, content, categories, createdAt, images
        })

        console.log('updatedPost')
        console.log(JSON.stringify(updatedPost.props, null, 2))

        await this.props.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}