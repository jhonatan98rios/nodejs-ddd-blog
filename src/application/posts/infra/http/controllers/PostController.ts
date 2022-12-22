import { Request, Response } from 'express';
import { CreatePostService } from "../../../domain/services/CreatePostService"
import { DeletePostService } from '../../../domain/services/DeletePostService';
import { ReadAllPostsService } from '../../../domain/services/ReadAllPostsService';
import { ReadOnePostService } from '../../../domain/services/ReadOnePostService';
import { UpdatePostService } from '../../../domain/services/UpdatePostService';
import { InMemoryPostRepository } from "../../database/inMemoryDB/repositories/PostRepository"
import { MongoDBPostRepository } from '../../database/mongoDB/repositories/PostRepository';

export class PostController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { title, subtitle, content, categories } = request.body

        //const postRepository = new InMemoryPostRepository()
        const postRepository = new MongoDBPostRepository()
        const createPostService = new CreatePostService(postRepository)
        const post = await createPostService.execute({
            title, subtitle, content, categories
        })

        return response.json(post)
    }

    public async readAll(request: Request, response: Response): Promise<Response> {
        const postRepository = new MongoDBPostRepository()
        const readAllPostsService = new ReadAllPostsService(postRepository)
        const posts = await readAllPostsService.execute()
        return response.json(posts)
    }

    public async readOne(request: Request, response: Response): Promise<Response> {

        const { slug } = request.params
        const postRepository = new MongoDBPostRepository()
        const readOnePostService = new ReadOnePostService(postRepository)
        const posts = await readOnePostService.execute(slug)
        return response.json(posts)
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { slug } = request.params
        const { title, subtitle, content, categories } = request.body
        
        const postRepository = new MongoDBPostRepository()
        const updatePostService = new UpdatePostService(postRepository)
        const post = await updatePostService.execute(slug, {
            title, subtitle, content, categories
        })

        return response.json(post)
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const { slug } = request.params
        const postRepository = new MongoDBPostRepository()
        const readOnePostService = new DeletePostService(postRepository)
        readOnePostService.execute(slug)
        return response.status(204).send()
    }
}