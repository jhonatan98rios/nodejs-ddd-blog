import { Request, Response } from 'express';
import { CreatePostService } from "../../../domain/services/CreatePostService"
import { InMemoryPostRepository } from "../../database/inMemoryDB/repositories/PostRepository"

export class PostController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { title, subtitle, content, categories } = request.body

        const postRepository = new InMemoryPostRepository()
        const createPostService = new CreatePostService(postRepository)
        const post = await createPostService.execute({
            title,
            subtitle,
            content,
            categories
        })

        console.log('Response: \n')
        console.log(JSON.stringify(post))

        return response.json(post)
        
    }
}