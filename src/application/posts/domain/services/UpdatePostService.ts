import AppError from "../../../../shared/errors/AppError";
import { UpdatePostDto } from "../dtos/UpdatePost.dto";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type UpdatePostResponse = {
    updatedPost: Post
}

export class UpdatePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string, updatePostDto: UpdatePostDto): Promise<UpdatePostResponse> {

        const oldPost = await this.postRepository.readOne(slug)
        
        if (!oldPost) {
            throw new AppError('Post not found', 404)
        }

        const { title, subtitle, content, categories, createdAt } = oldPost
        
        const updatedPost = new Post({
            title, subtitle, content, categories, createdAt,
            ...updatePostDto
        })

        console.log("OLD POST")
        console.log(JSON.stringify(oldPost, null, 2))

        console.log("UPDATED POST")
        console.log(JSON.stringify(updatedPost, null, 2))

        await this.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}