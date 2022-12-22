import Database from './adapters/database/MongoDB/connection'
import { Server } from './adapters/http/server'
import * as dotenv from 'dotenv' 

dotenv.config()

const database = new Database({
    user: process.env.DATABASE_USER as string,
    password: process.env.DATABASE_PASS as string
})

const server = new Server(database)
server.listen(3333)