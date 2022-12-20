import { toSnakeCase } from "../../../../shared/utils/toSnakeCase";
import { CreatePostDto } from "../dtos/CreatePost.dto";
import { IPost } from "../entities/Post";
import { PostRepository } from "../repositories/PostRepository";

type CreatePostResponse = {
    post: IPost
}

export class CreatePostService {

    constructor(private postRepository: PostRepository) {}

    async execute(createPostDto: CreatePostDto): Promise<CreatePostResponse> {

        const { title, subtitle, content, categories } = createPostDto

        const post = await this.postRepository.create({
            slug: toSnakeCase(title),
            title,
            subtitle,
            content,
            categories,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return { post }
    }
}