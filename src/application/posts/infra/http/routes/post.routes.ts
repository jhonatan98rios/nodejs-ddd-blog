import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { validateRequest } from 'zod-express-middleware';
import { CreatePost } from '../../validation/CreatePost.dto';
import { UpdatePost } from '../../validation/UpdatePost.dto';
import multer from 'multer';
import { uploadConfig } from '../../../../../adapters/storage/config';
import { useAuthentication } from '../../../../../adapters/http/middlewares/useAuthentication';
import { useAuthorization } from '../../../../../adapters/http/middlewares/useAuthorization';

const postRouter = Router()
const postController = new PostController()

const upload = multer(uploadConfig.multer)

postRouter.get('/', postController.readAll)

postRouter.get('/:slug', postController.readOne)

postRouter.post('/', 
    useAuthentication,
    useAuthorization('write'),
    validateRequest({ body: CreatePost }), 
    postController.create
)

postRouter.put('/:slug', 
    useAuthentication,
    useAuthorization('write'),
    validateRequest({ body: UpdatePost }), 
    postController.update
)

postRouter.delete('/:slug', 
    useAuthentication,
    useAuthorization('write'),
    postController.delete
)

postRouter.put('/images/:slug',
    useAuthentication,
    useAuthorization('write'),
    upload.single('file'),
    postController.imageUpdate
)

postRouter.post('/image/',
    useAuthentication,
    useAuthorization('write'),
    upload.single('file'),
    postController.imageUpload
)

export default postRouter