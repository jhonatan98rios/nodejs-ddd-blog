import express, { Express } from 'express'
import { useAppError } from '../middlewares/useAppError'
import cors from 'cors';
import routes from '../routes';

export class Server {

    app: Express

    constructor() {
        this.app = express()
        this.app.use(cors())
        this.app.use(express.json());
        this.app.use(routes)
        this.app.use(useAppError)
    }

    public listen(port: number) {
        this.app.listen(process.env.PORT || port, () => {
            console.log(`Server started on port ${process.env.PORT || port}! 🏆`);
        });
    }
}