import 'module-alias/register'
import Database from './adapters/database/MongoDB/connection'
import { Server } from './adapters/http/server'
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Database({
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASS!,
    collection: process.env.DATABASE_NAME!,
})

const server = new Server()

server.connect({ database })
server.listen(5000)