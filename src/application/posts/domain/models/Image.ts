export interface ImageProps {
    mimetype: string,
    destination: string,
    filename: string,
    size: number // Bloquear acima de 5120 (5mb)
}

export class Image {
    public mimetype: string
    public destination: string
    public filename: string
    public size: number

    constructor({ mimetype, destination, filename, size }:  ImageProps) {
        this.mimetype = mimetype
        this.destination = destination
        this.filename = filename
        this.size = size
    }
}
