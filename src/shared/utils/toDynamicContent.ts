import { Image } from "../../application/posts/domain/models/Image";

export function tagsToImages(content: string, images: Image[] ) {

    let newContent = content
     
    images.forEach((image, index) => {
        let src = image.destination + image.filename
        
        newContent = newContent.replace(
            `#images[${index}]`,
            `<img heigth='700' width='700' src='${src}' alt='imagem-${index}' title=''>`
        )
    })

    return newContent
}
