import { IPost } from "../models/Post";

export abstract class PostRepository {
    abstract create(post: IPost): Promise<IPost>
}