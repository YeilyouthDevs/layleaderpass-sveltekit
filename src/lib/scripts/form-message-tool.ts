export function genMessage(tagName: string, clazz: string, content: any) {
    return `<${tagName} class="${clazz}">${content}</${tagName}>`
}