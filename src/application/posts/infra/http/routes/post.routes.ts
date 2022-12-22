import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const postRouter = Router()
const postController = new PostController()

postRouter.post('/', postController.create)
postRouter.get('/', postController.readAll)
postRouter.get('/:slug', postController.readOne)
postRouter.put('/:slug', postController.update)
postRouter.delete('/:slug', postController.delete)

export default postRouter