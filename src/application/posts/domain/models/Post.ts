import { tagsToImages } from "../../../../shared/utils/toDynamicContent"
import { toSnakeCase } from "../../../../shared/utils/toSnakeCase"
import { CreatePostDto } from "../../infra/validation/CreatePost.dto"
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
    seo_title: string
    seo_description: string
    seo_keywords: string
}

export class Post {
    props: IPost

    constructor(props: CreatePostDto) {
        this.props = {
            ...props,
            slug: toSnakeCase(props.title),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: new Date(),
            images: props.images ?? [],
            seo_title: props.seo_title ?? `Jhonatan Dev Rios | ${props.title}`,
            seo_description: props.seo_description ?? props.subtitle,
            seo_keywords: props.seo_keywords ?? 'tecnologia'
        }

        if (this.props.images) {
            this.content = tagsToImages(this.props.content, this.props.images)
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
        
        this.props.images?.forEach((image, index) => {
            let src = image.destination + image.filename
            this.props.content = this.props.content.replace(`#images[${index}]`, src)
        })
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

    get seo_title(): string {
        return this.seo_title
    }

    set seo_title(seo_title: string) {
        this.seo_title = seo_title
    }

    get seo_description(): string {
        return this.seo_description
    }

    set seo_description(seo_description: string) {
        this.seo_description = seo_description
    }

    get seo_keywords(): string {
        return this.seo_keywords
    }

    set seo_keywords(seo_keywords: string) {
        this.seo_keywords = seo_keywords
    }
}
