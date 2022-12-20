import { IPost } from "../entities/Post";

export abstract class PostRepository {
    abstract create(post: IPost): Promise<IPost>
}