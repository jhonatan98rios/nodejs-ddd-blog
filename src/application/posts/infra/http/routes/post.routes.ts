import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import { validateRequest } from 'zod-express-middleware';
import { PostValidation } from '../../validation/PostValidation.dto';


const postRouter = Router()
const postController = new PostController()

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


export default postRouter