import AppError from "../../../../shared/errors/AppError";
import { PostDto } from "../../infra/validation/PostValidation.dto";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type UpdatePostResponse = {
    updatedPost: Post
}

export class UpdatePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string, updatePostDto: PostDto): Promise<UpdatePostResponse> {

        const post = await this.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }
        
        const updatedPost = new Post(updatePostDto)

        await this.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}