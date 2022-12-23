import AppError from "../../../../shared/errors/AppError";
import { PostDto } from "../../infra/validation/PostValidation.dto";
import { Post } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type CreatePostResponse = {
    post: Post
}

export class CreatePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute({ title, subtitle, content, categories }: PostDto): Promise<CreatePostResponse> {

        const post = new Post({ title, subtitle, content, categories })

        const alreadyExists = await this.postRepository.readOne(post.slug)

        if (alreadyExists) {
            throw new AppError('This title is already being used', 409)
        }

        await this.postRepository.create(post.props)
        return { post }
    }
}