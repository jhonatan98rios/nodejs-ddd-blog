import 'module-alias/register'
import Database from './adapters/database/MongoDB/connection'
import { Server } from './adapters/http/server'
import * as dotenv from 'dotenv' 
import { AdminPanel } from './adapters/http/admin'

dotenv.config()

const database = new Database({
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASS!
})

const adminPanel = new AdminPanel()

const server = new Server()

server.connect({ database, adminPanel })
server.listen(3333)