import { Model, Schema } from 'mongoose';
import { Category } from '@posts/domain/models/Category';

export const CategorySchema: Schema = new Schema<Category, Model<Category>>({
    label:  { type: String, required: true },
    path: { type: String, required: true },
});