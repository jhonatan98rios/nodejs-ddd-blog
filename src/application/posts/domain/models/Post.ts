import { toSnakeCase } from "../../../../shared/utils/toSnakeCase"
import { PostDto } from "../../infra/validation/PostValidation.dto"
import { Image } from "./Image"

export interface IPost {
    slug: string
    title: string
    subtitle: string
    content: string
    categories: string[]
    createdAt: Date
    updatedAt: Date
    images?: Image[]
}

export class Post {
    props: IPost

    constructor(props: PostDto) {
        this.props = {
            ...props,
            slug: toSnakeCase(props.title),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: new Date(),
            images: props.images ?? []
        }
    }

    get slug(): string {
        return this.props.slug
    }
    
    get title(): string {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
        this.props.slug = toSnakeCase(title)
    }
    
    get subtitle(): string {
        return this.props.subtitle
    }

    set subtitle(subtitle: string) {
        this.props.subtitle = subtitle
    }
    
    get content(): string {
        return this.props.content
    }

    set content(content: string) {
        this.props.content = content
    }
    
    get categories(): string[] {
        return this.props.categories
    }

    set categories(categories: string[]) {
        this.props.categories = categories
    }
    
    get createdAt(): Date {
        return this.props.createdAt
    }
    
    get updatedAt(): Date  {
        return this.props.updatedAt
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt
    }

    get images(): Image[]  {
        return this.props.images ?? []
    }

    set images(images: Image[]) {
        this.props.images = images
    }
}
