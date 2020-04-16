export type UrlHandlerCallback = (data: any, args?) => void;
export interface AppURL extends Object {
    path: string;
    params: Map<string, string>;
}
export function handleOpenURL(handler: UrlHandlerCallback): void;
