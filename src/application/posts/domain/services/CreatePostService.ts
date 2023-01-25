import AppError from "../../../../shared/errors/AppError";
import { CreatePostDto } from "../../infra/validation/CreatePost.dto";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type CreatePostResponse = {
    post: Post
}

export class CreatePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute({ 
        title, subtitle, content, categories, 
        seo_title, seo_description, seo_keywords, banner
    }: CreatePostDto): Promise<CreatePostResponse> {

        const post = new Post({ 
            title, subtitle, content, categories, seo_title, seo_description, seo_keywords, banner
        })

        const alreadyExists = await this.postRepository.readOne(post.slug)

        if (alreadyExists) {
            throw new AppError('This title is already being used', 409)
        }

        await this.postRepository.create(post.props)
        return { post }
    }
}