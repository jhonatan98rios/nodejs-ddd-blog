import { CreatePostDto } from "../dtos/CreatePost.dto";
import { Post } from "../models/Post";
import { PostRepository } from "../repositories/PostRepository";

type CreatePostResponse = {
    post: Post
}

export class CreatePostService {

    constructor(private postRepository: PostRepository) {}

    async execute(createPostDto: CreatePostDto): Promise<CreatePostResponse> {

        const { title, subtitle, content, categories } = createPostDto

        const post = new Post({
            title, subtitle, content, categories
        })
        
        await this.postRepository.create(post.props)

        return { post }
    }
}