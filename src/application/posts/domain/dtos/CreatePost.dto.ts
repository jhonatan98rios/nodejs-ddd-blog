export interface CreatePostDto {
    title: string
    subtitle: string
    content: string
    categories: string[]
    createdAt?: Date
}