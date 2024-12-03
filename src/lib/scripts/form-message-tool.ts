interface GenMessageOption {
    tagName?: string;
    class?: string;
    message?: string;
}

export function genMessage(args: GenMessageOption) {
    return `<${args.tagName || 'p'}${(args.class ? ' class="' + args.class + '"' : '')}>${args.message}</${args.tagName || 'p'}>`
}