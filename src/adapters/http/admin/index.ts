import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { PostModel } from '@posts/infra/database/mongoDB/models/Post.schema'
import mongoose from 'mongoose'
import * as AdminJSMongoose from '@adminjs/mongoose'

export class AdminPanel {
    private admin: AdminJS
    private adminRouter: any

    constructor() {}

    
    connect(DBConnection: typeof mongoose) {

        AdminJS.registerAdapter({
            Resource: AdminJSMongoose.Resource,
            Database: AdminJSMongoose.Database,
        })

        const postResourceOptions = {
            databases: [DBConnection],
            resource: PostModel.getInstance(),
            options: {
                listProperties: ['title', 'subtitle', 'content', 'categories', 'seo_title', 'seo_description', 'seo_keywords'],
                filterProperties: ['title', 'subtitle', 'content', 'categories', 'seo_title', 'seo_description', 'seo_keywords'],
                editProperties: ['title', 'subtitle', 'content', 'categories', 'seo_title', 'seo_description', 'seo_keywords'],
                showProperties: ['title', 'subtitle', 'content', 'categories', 'seo_title', 'seo_description', 'seo_keywords'],
            },
        }

        const adminOptions = {
            rootPath: "/admin",
            resources: [postResourceOptions],
        };


        this.admin = new AdminJS(adminOptions)
        this.adminRouter = AdminJSExpress.buildRouter(this.admin)

        console.log(`AdminJS connected and running on port: http://localhost:${3333}${this.admin.options.rootPath}`, )
        return [this.admin.options.rootPath, this.adminRouter]
    }


}