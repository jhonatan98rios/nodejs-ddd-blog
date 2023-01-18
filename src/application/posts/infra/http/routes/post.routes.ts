import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { validateRequest } from 'zod-express-middleware';
import { CreatePost } from '../../validation/CreatePost.dto';
import { UpdatePost } from '../../validation/UpdatePost.dto';
import multer from 'multer';
import { uploadConfig } from '../../../../../adapters/storage/config';
import { useAuthentication } from '../../../../../adapters/http/middlewares/useAuthentication';

const postRouter = Router()
const postController = new PostController()

const upload = multer(uploadConfig.multer)

postRouter.get('/', postController.readAll)

postRouter.get('/:slug', postController.readOne)

postRouter.post('/', 
    useAuthentication,
    validateRequest({ body: CreatePost }), 
    postController.create
)

postRouter.put('/:slug', 
    useAuthentication,
    validateRequest({ body: UpdatePost }), 
    postController.update
)

postRouter.delete('/:slug', 
    useAuthentication, 
    postController.delete
)

postRouter.put('/images/:slug',
    useAuthentication,
    upload.single('file'),
    postController.imageUpdate
)

postRouter.post('/image/',
    useAuthentication,
    upload.single('file'),
    postController.imageUpload
)

export default postRouter