import { Request, Response } from 'express';
import DiskStorageProvider from '@posts/infra/storage/DiskStorageProvider';
import S3StorageProvider from '@posts/infra/storage/S3StorageProvider';
import { CreatePostService } from "@posts/domain/services/CreatePostService"
import { DeletePostService } from '@posts/domain/services/DeletePostService';
import { ReadAllPostsService } from '@posts/domain/services/ReadAllPostsService';
import { ReadOnePostService } from '@posts/domain/services/ReadOnePostService';
import { UpdatePostService } from '@posts/domain/services/UpdatePostService';
import { UploadImageService } from '@posts/domain/services/UploadImageService';
import { UploadPostService } from '@posts/domain/services/UploadPostService';
import { MongoDBPostRepository } from '@posts/infra/database/mongoDB/repositories/PostRepository';

export class PostController {

    public async create(request: Request, response: Response): Promise<Response> {
        const { title, subtitle, content, categories, seo_title, seo_description, seo_keywords, banner, language } = request.body

        const postRepository = new MongoDBPostRepository()

        const createPostService = new CreatePostService(postRepository)
        const post = await createPostService.execute({
            title, subtitle, content, categories, 
            seo_title, seo_description, seo_keywords,
            banner, language
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
        const { title, subtitle, content, categories, seo_title, seo_description, seo_keywords, banner, language, status } = request.body
        
        const postRepository = new MongoDBPostRepository()

        const updatePostService = new UpdatePostService(postRepository)
        const post = await updatePostService.execute(slug, {
            title, subtitle, content, categories, 
            seo_title, seo_description, seo_keywords,
            banner, language, status
        })

        return response.json(post)
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { slug } = request.params

        const postRepository = new MongoDBPostRepository()

        const readOnePostService = new DeletePostService(postRepository)
        const res = await readOnePostService.execute(slug)
        return response.json(res)
    }

    public async imageUpdate(request: Request, response: Response): Promise<Response> {

        const { slug } = request.params
        
        const file = request.file as Express.Multer.File;

        const postRepository = new MongoDBPostRepository()
        
        const s3StorageProvider = new S3StorageProvider()
        const diskStorageProvider = new DiskStorageProvider()

        const uploadPostService = new UploadPostService({
            postRepository: postRepository, 
            s3StorageProvider, 
            diskStorageProvider        
        })
        
        const post = await uploadPostService.execute(slug, file)

        return response.json(post)
    }

    public async imageUpload(request: Request, response: Response): Promise<Response> {
        
        const file = request.file as Express.Multer.File;
        
        const s3StorageProvider = new S3StorageProvider()
        const diskStorageProvider = new DiskStorageProvider()

        const uploadImageService = new UploadImageService({
            s3StorageProvider, 
            diskStorageProvider        
        })
        
        const post = await uploadImageService.execute(file)

        return response.json(post)
    }
}