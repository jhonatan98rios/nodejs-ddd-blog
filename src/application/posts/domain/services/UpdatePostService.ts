import AppError from "../../../../shared/errors/AppError";
import { UpdatePostDto } from "../../infra/validation/UpdatePost.dto";
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

        const { title, subtitle, content, categories, createdAt, banner, seo_title, seo_description, seo_keywords } = post
        
        const updatedPost = new Post({
            title: updatePostDto.title ?? title, 
            subtitle: updatePostDto.subtitle ?? subtitle, 
            content: updatePostDto.content ?? content, 
            categories: updatePostDto.categories ?? categories, 
            createdAt: updatePostDto.createdAt ?? createdAt, 
            banner: updatePostDto.banner ?? banner, 
            seo_title: updatePostDto.seo_title ?? seo_title, 
            seo_description: updatePostDto.seo_description ?? seo_description, 
            seo_keywords: updatePostDto.seo_keywords ?? seo_keywords
        })

        await this.postRepository.update(slug, updatedPost.props)
        
        return { updatedPost }
    }
}