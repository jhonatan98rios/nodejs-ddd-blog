import 'express-async-errors';
import express, { Express } from 'express'
import swaggerUI from 'swagger-ui-express';

import cors from 'cors';
import helmet from 'helmet'
import xss from 'xss-clean'

import routes from '../routes';
import { useAppError } from '../middlewares/useAppError'
import { rateLimiter } from '../middlewares/useRateLimit';
import Database from '@adapters/database/MongoDB/connection';

import swaggerDocs from './swagger.json'
import mongoose from 'mongoose';


interface IServer {
    database: Database
}

export class Server {

    app: Express
    connection: typeof mongoose | undefined;

    constructor() {

        this.app = express()
        this.app.use(express.json())

        this.app.use(cors())
        this.app.use(helmet())
        this.app.use(xss())
        this.app.use(rateLimiter())
        this.app.disable('x-powered-by')

        this.app.use(routes)
        this.app.use(useAppError)
        this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))
        this.app.use('/uploads', express.static('uploads'))           
    }
    
    public async connect({ database }: IServer) {
        this.connection = await database.connect()
    }

    public listen(port: number) {
        this.app.listen(process.env.PORT || port, () => {
            console.log(`Server started on port ${process.env.PORT || port}!`)
        });
    }
}