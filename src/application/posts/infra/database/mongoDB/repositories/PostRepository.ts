import { IPost } from "@posts/domain/models/Post"
import { AbstractPostRepository } from "@posts/domain/repositories/AbstractPostRepository";
import { PostModel, IPostModel } from "../models/Post.schema";

export class MongoDBPostRepository implements AbstractPostRepository {

    private postModel: IPostModel

    constructor() {
        this.postModel = PostModel.getInstance()
    }

    async create(post: IPost): Promise<IPost> {
        await this.postModel.create(post)
        return post
    }

    async readAll(): Promise<IPost[]> {
        return await this.postModel.find().sort({ createdAt: -1 })
    }

    async readOne(slug: string): Promise<IPost | null> {
        const post = await this.postModel.findOne({ slug })
        return post ?? null
    }

    async update(slug: string, post: IPost): Promise<IPost | null> {
        const updatedPost = await this.postModel.findOneAndUpdate(
            { slug }, post, 
            { new: true, runValidators: true }
        )
        return updatedPost ?? null
    }

    async delete(slug: string): Promise<string> {
        await this.postModel.findOneAndRemove({ slug })
        return slug
    }
}