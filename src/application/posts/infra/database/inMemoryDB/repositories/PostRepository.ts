import { IPost } from "../../../../domain/entities/Post";
import { PostRepository } from "../../../../domain/repositories/PostRepository";

export class InMemoryPostRepository implements PostRepository {

    public posts: IPost[] = []

    async create(post: IPost): Promise<IPost> {
        this.posts.push(post)
        return post
    }
}