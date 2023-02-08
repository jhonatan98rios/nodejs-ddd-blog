import { Model, Schema } from 'mongoose';
import { Image } from '@posts/domain/models/Image';

export const ImageSchema: Schema = new Schema<Image, Model<Image>>({
    src: { type: String, required: false },
    size: { type: Number, required: false },
});