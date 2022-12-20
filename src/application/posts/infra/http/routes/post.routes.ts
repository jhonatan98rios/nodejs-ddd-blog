import { Router } from 'express'
import { PostController } from '../controllers/PostController'

const postRouter = Router()
const postController = new PostController()

postRouter.post('/', postController.create)

export default postRouter