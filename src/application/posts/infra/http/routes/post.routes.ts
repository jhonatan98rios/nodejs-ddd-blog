import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { validateRequest } from 'zod-express-middleware';
import { PostValidation } from '../../validation/PostValidation.dto';
import multer from 'multer';
import { uploadConfig } from '../../../../../adapters/storage/config';

const postRouter = Router()
const postController = new PostController()

const upload = multer(uploadConfig.multer)

postRouter.post('/', 
    validateRequest({ body: PostValidation }), 
    postController.create
)

postRouter.get('/', postController.readAll)

postRouter.get('/:slug', postController.readOne)

postRouter.put('/:slug', 
    validateRequest({ body: PostValidation }), 
    postController.update
)

postRouter.delete('/:slug', postController.delete)

postRouter.put('/images/:slug',
    upload.array('file', 4),
    postController.imageUpdate
)

export default postRouter