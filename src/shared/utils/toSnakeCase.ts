export function toSnakeCase(data: string) {
    return data
        .replace(/ /g, '_')
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}
