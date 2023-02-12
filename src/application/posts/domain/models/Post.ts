import { toSnakeCase } from "@shared/utils/toSnakeCase"
import { CreatePostDto } from "@posts/infra/validation/CreatePost.dto"
import { Category } from "./Category"
import { Image } from "./Image"

export interface IPost {
    slug: string
    title: string
    subtitle: string
    content: string
    categories: Category[]
    createdAt: Date
    updatedAt: Date
    banner: Image
    seo_title: string
    seo_description: string
    seo_keywords: string
    status: string
    language: string
}

export class Post {
    props: IPost

    constructor(props: CreatePostDto) {
        this.props = {
            ...props,
            slug: toSnakeCase(props.title),
            createdAt: props.createdAt ?? new Date(),
            updatedAt: new Date(),
            seo_title: props.seo_title ?? `Jhonatan Dev Rios | ${props.title}`,
            seo_description: props.seo_description ?? props.subtitle,
            seo_keywords: props.seo_keywords ?? 'tecnologia',
            status: props.status ?? 'dev'
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
    
    get categories(): Category[] {
        return this.props.categories
    }

    set categories(categories: Category[]) {
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

    get banner(): Image {
        return this.props.banner
    }

    set banner(banner: Image) {
        this.props.banner = banner
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

    get status(): string {
        return this.status
    }

    set status(status: string) {
        this.status = status
    }

    get language(): string {
        return this.language
    }

    set language(language: string) {
        this.language = language
    }
}
