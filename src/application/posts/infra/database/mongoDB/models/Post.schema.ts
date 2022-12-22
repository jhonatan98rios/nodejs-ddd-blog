import { Model, model, Schema } from 'mongoose';
import { IPost } from '../../../../domain/models/Post';

const PostSchema: Schema = new Schema<IPost, Model<IPost>>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    subtitle: { type: String, required: true },
    content: { type: String, required: true },
    categories: { type: [String], required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

export type IPostModel = Model<IPost>

export class PostModel {
    static getInstance() {
        return model<IPost>('Post', PostSchema)
    }
}