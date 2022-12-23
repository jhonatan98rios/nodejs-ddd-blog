import Database from './adapters/database/MongoDB/connection'
import { Server } from './adapters/http/server'
import * as dotenv from 'dotenv' 

dotenv.config()

const database = new Database({
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASS!
})

const server = new Server(database)
server.listen(3333)