import AppError from "@shared/errors/AppError";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type DeletePostResponse = {
    deletedPost: string
}

export class DeletePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string): Promise<DeletePostResponse> {

        const post = await this.postRepository.readOne(slug)
        
        if (!post) {
            throw new AppError('Post not found', 404)
        }

        const deletedPost = await this.postRepository.delete(slug)

        return { deletedPost }
    }
}