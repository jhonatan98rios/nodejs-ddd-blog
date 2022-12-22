import AppError from "../../../../shared/errors/AppError";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

export class DeletePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string): Promise<void> {

        const post = await this.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        await this.postRepository.delete(slug)
    }
}