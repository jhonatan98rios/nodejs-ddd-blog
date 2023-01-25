export interface ImageProps {
    src: string,
    size: number // Bloquear acima de 5120 (5mb)
}

export class Image {
    public src: string
    public size: number

    constructor({ src, size }:  ImageProps) {
        this.src = src
        this.size = size
    }
}
