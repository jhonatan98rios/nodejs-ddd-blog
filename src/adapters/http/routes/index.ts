import { Router } from 'express';
import postRouter from '../../../application/posts/infra/http/routes/post.routes';

const routes = Router();

routes.use('/post', postRouter);

export default routes;