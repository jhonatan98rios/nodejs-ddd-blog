import 'express-async-errors';
import express, { Express } from 'express'
import swaggerUI from 'swagger-ui-express';
import https from 'https'
import http from 'http'
import fs from 'fs'

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

    credentials: {key: string, cert: string}
    httpServer: http.Server
    httpsServer: https.Server
    app: Express
    connection: typeof mongoose | undefined;

    constructor() {

        this.credentials = {
            key: fs.readFileSync('sslcert/selfsigned.key', 'utf8'), 
            cert: fs.readFileSync('sslcert/selfsigned.crt', 'utf8')
        }

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

        this.httpServer = http.createServer(this.app)  
        this.httpsServer = https.createServer(this.credentials, this.app)  
    }
    
    public async connect({ database }: IServer) {
        this.connection = await database.connect()
    }

    public httpsListen(port: number) {
        this.httpsServer.listen(port)

        this.httpsServer.on('listening', () => {
            console.log(`HTTPS Server started on port ${process.env.PORT || port}! 🏆`)
        })

        this.httpsServer.on('error', err => {
            console.log(`Server error: ${err}`)
        })
    }

    public httpListen(port: number) {
        this.httpServer.listen(port)

        this.httpServer.on('listening', () => {
            console.log(`HTTP Server started on port ${process.env.PORT || port}! 🏆`)
        })

        this.httpServer.on('error', err => {
            console.log(`Server error: ${err}`)
        })
    }
}