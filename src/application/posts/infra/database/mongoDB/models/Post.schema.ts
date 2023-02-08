import { Model, model, Schema } from 'mongoose';
import { IPost } from '@posts/domain/models/Post';
import { CategorySchema } from './Category.schema';
import { ImageSchema } from './Image.schema'

const PostSchema: Schema = new Schema<IPost, Model<IPost>>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    categories: [ CategorySchema ],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    banner: ImageSchema,
    seo_title: { type: String, required: true },
    seo_description: { type: String, required: true },
    seo_keywords: { type: String, required: true },
    status: { type: String, required: true },
    language: { type: String, required: true },
});

export type IPostModel = Model<IPost>

export class PostModel {
    static getInstance() {
        return model<IPost>('Post', PostSchema)
    }
}