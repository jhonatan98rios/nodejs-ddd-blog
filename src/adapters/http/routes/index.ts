import { Router } from 'express';
import postRouter from '../../../application/posts/infra/http/routes/post.routes';
import userRouter from '../../../application/users/infra/http/routes/user.routes';

const routes = Router();

routes.use('/post', postRouter);
routes.use('/user', userRouter)

export default routes;