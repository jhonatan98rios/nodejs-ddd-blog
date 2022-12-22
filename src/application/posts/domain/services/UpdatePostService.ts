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

        const post = await this.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        const { title, subtitle, content, categories, createdAt } = post
        
        const updatedPost = new Post({
            title, subtitle, content, categories, createdAt,
            ...updatePostDto
        })

        await this.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}