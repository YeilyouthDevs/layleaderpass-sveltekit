export interface HeaderMenuListItem {
    name: string;
    hide?: () => Boolean,
    onClick?: CallableFunction
}