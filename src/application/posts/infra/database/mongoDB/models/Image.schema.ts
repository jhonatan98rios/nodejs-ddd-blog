import { Model, Schema } from 'mongoose';
import { Image } from '../../../../domain/models/Image';

export const ImageSchema: Schema = new Schema<Image, Model<Image>>({
    destination: { type: String, required: false },
    filename: { type: String, required: false },
    size: { type: Number, required: false },
});