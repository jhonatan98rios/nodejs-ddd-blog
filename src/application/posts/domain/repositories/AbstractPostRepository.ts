import { IPost } from "../models/Post";

export abstract class AbstractPostRepository {
    abstract create(post: IPost): Promise<IPost>
    abstract readAll(): Promise<IPost[]>
    abstract readOne(slug: string): Promise<IPost | null>
    abstract update(slug: string, post: IPost): Promise<IPost | null>
    abstract delete(slug: string): Promise<string>
}