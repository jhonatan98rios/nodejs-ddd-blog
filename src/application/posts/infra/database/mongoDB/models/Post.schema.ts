import { Model, model, Schema } from 'mongoose';
import { Image } from '../../../../domain/models/Image';
import { IPost } from '../../../../domain/models/Post';
import { ImageSchema } from './Image.schema'

const PostSchema: Schema = new Schema<IPost, Model<IPost>>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    categories: { type: [String], required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    images: [ ImageSchema ]
});

export type IPostModel = Model<IPost>

export class PostModel {
    static getInstance() {
        return model<IPost>('Post', PostSchema)
    }
}