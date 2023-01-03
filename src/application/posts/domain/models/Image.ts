export interface ImageProps {
    destination: string,
    filename: string,
    size: number // Bloquear acima de 5120 (5mb)
}

export class Image {
    public destination: string
    public filename: string
    public size: number

    constructor({ destination, filename, size }:  ImageProps) {
        this.destination = destination
        this.filename = filename
        this.size = size
    }
}
