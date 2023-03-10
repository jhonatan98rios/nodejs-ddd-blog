import { IPost } from "@posts/domain/models/Post"
import { AbstractPostRepository } from "@posts/domain/repositories/AbstractPostRepository";

class _InMemoryPostRepository implements AbstractPostRepository {
    
    public posts: IPost[] = []

    async create(post: IPost): Promise<IPost> {
        this.posts.push(post)
        return post
    }

    async readAll(): Promise<IPost[]> {
        return this.posts
    }

    async readOne(slug: string): Promise<IPost | null> {
        const post = this.posts.filter(post => post.slug === slug)[0]
        return post ?? null
    }

    async update(slug: string, post: IPost): Promise<IPost | null> {
        const findIndex = this.posts.findIndex(
            oldPost => oldPost.slug === slug
        )
      
        this.posts[findIndex] = post
        return this.posts[findIndex]
    }

    async delete(slug: string): Promise<string> {
        this.posts.filter(post => post.slug != slug)
        return slug
    }
}


export class InMemoryPostRepository {

    private static instance: _InMemoryPostRepository;

    static getInstance() {
        if (!this.instance) {
            this.instance = new _InMemoryPostRepository()
        }
        return this.instance
    }
}