import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { validateRequest } from 'zod-express-middleware';
import { CreatePost } from '../../validation/CreatePost.dto';
import { UpdatePost } from '../../validation/UpdatePost.dto';
import multer from 'multer';
import { uploadConfig } from '../../../../../adapters/storage/config';

const postRouter = Router()
const postController = new PostController()

const upload = multer(uploadConfig.multer)

postRouter.post('/', 
    validateRequest({ body: CreatePost }), 
    postController.create
)

postRouter.get('/', postController.readAll)

postRouter.get('/:slug', postController.readOne)

postRouter.put('/:slug', 
    validateRequest({ body: UpdatePost }), 
    postController.update
)

postRouter.delete('/:slug', postController.delete)

postRouter.put('/images/:slug',
    upload.single('file'),
    postController.imageUpdate
)

postRouter.post('/image/',
    upload.single('file'),
    postController.imageUpload
)

export default postRouter