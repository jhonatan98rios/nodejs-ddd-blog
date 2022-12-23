import AppError from "../../../../shared/errors/AppError";
import { PostDto } from "../../infra/validation/PostValidation.dto";
import { ImageProps, Image } from "../models/Image";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type UpdatePostResponse = {
    updatedPost: Post
}

export class UploadPostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string, files: ImageProps[]): Promise<UpdatePostResponse> {

        const post = await this.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        const images = files.map(file => {
            
            /* Realizar o upload da imagem e adicionar o caminho ao destination */


            /* Deletar a imagem do disco */


            return new Image({
                destination: file.destination,
                filename: file.filename,
                mimetype: file.mimetype,
                size: file.size
            })
        })

        const { title, subtitle, content, categories, createdAt } = post
        
        const updatedPost = new Post({
            title, subtitle, content, categories, createdAt, images
        })

        console.log('updatedPost')
        console.log(JSON.stringify(updatedPost.props, null, 2))

        await this.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}