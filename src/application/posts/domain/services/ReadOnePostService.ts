import AppError from "@shared/errors/AppError";
import { IPost } from "../models/Post";
import { AbstractPostRepository } from "../repositories/AbstractPostRepository";

type ReadOnePostResponse = {
    post: IPost | null
}

export class ReadOnePostService {

    constructor(private postRepository: AbstractPostRepository) {}

    async execute(slug: string): Promise<ReadOnePostResponse> {

        const post = await this.postRepository.readOne(slug)

        if (!post) {
            throw new AppError('Post não encontrado', 404)
        }

        return { post }
    }
}