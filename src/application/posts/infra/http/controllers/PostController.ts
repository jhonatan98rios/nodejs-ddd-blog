import { Request, Response } from 'express';
import DiskStorageProvider from '../../../../../adapters/storage/DiskStorageProvider';
import S3StorageProvider from '../../../../../adapters/storage/S3StorageProvider';
import { CreatePostService } from "../../../domain/services/CreatePostService"
import { DeletePostService } from '../../../domain/services/DeletePostService';
import { ReadAllPostsService } from '../../../domain/services/ReadAllPostsService';
import { ReadOnePostService } from '../../../domain/services/ReadOnePostService';
import { UpdatePostService } from '../../../domain/services/UpdatePostService';
import { UploadPostService } from '../../../domain/services/UploadPostService';
import { InMemoryPostRepository } from '../../database/inMemoryDB/repositories/PostRepository';
import { MongoDBPostRepository } from '../../database/mongoDB/repositories/PostRepository';

export class PostController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { title, subtitle, content, categories, seo_title, seo_description, seo_keywords } = request.body

        const inMemoryRepository = InMemoryPostRepository.getInstance()
        //const postRepository = new MongoDBPostRepository()

        const createPostService = new CreatePostService(inMemoryRepository)
        const post = await createPostService.execute({
            title, subtitle, content, categories, 
            seo_title, seo_description, seo_keywords
        })

        return response.json(post)
    }

    public async readAll(request: Request, response: Response): Promise<Response> {

        const inMemoryRepository = InMemoryPostRepository.getInstance()
        /* const postRepository = new MongoDBPostRepository() */

        const readAllPostsService = new ReadAllPostsService(inMemoryRepository)
        const posts = await readAllPostsService.execute()
        return response.json(posts)
    }

    public async readOne(request: Request, response: Response): Promise<Response> {
        const { slug } = request.params

        const inMemoryRepository = InMemoryPostRepository.getInstance()
        /* const postRepository = new MongoDBPostRepository() */

        const readOnePostService = new ReadOnePostService(inMemoryRepository)
        const posts = await readOnePostService.execute(slug)
        return response.json(posts)
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { slug } = request.params
        const { title, subtitle, content, categories, seo_title, seo_description, seo_keywords } = request.body
        
        const inMemoryRepository = InMemoryPostRepository.getInstance()
        /* const postRepository = new MongoDBPostRepository() */

        const updatePostService = new UpdatePostService(inMemoryRepository)
        const post = await updatePostService.execute(slug, {
            title, subtitle, content, categories, 
            seo_title, seo_description, seo_keywords
        })

        return response.json(post)
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { slug } = request.params

        const inMemoryRepository = InMemoryPostRepository.getInstance()
        /* const postRepository = new MongoDBPostRepository() */

        const readOnePostService = new DeletePostService(inMemoryRepository)
        const res = await readOnePostService.execute(slug)
        return response.json(res)
    }

    public async imageUpdate(request: Request, response: Response): Promise<Response> {

        const { slug } = request.params
        
        const files = request.files as Express.Multer.File[];

        const inMemoryRepository = InMemoryPostRepository.getInstance()
        /* const postRepository = new MongoDBPostRepository() */
        
        const s3StorageProvider = new S3StorageProvider()
        const diskStorageProvider = new DiskStorageProvider()

        const uploadPostService = new UploadPostService({
            postRepository: inMemoryRepository, 
            s3StorageProvider, 
            diskStorageProvider        
        })
        
        const post = await uploadPostService.execute(slug, files)

        return response.json(post)
    }
}