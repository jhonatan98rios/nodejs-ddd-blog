export interface CategoryProps {
    label: string
    path: string
}

export class Category {

    public label: string
    public path: string

    constructor({ label, path}: CategoryProps) {
        this.label = label
        this.path = path
    }
}
