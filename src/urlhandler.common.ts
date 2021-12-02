import { AppURL, UrlHandlerCallback } from './urlhandler';
let URL_HANDLER_CB: UrlHandlerCallback;

/**
 * Extract url string param to a nice object
 * @param urlParam to parse
 * @returns AppURL object or null if invalid was used
 */
export function extractAppURL(urlParam: any): AppURL {
    if (!!urlParam) {
        const url = decodeURIComponent(urlParam.toString()).replace('com.android.providers.downloads.documents/document/raw:', ''),
            params = new Map<string, string>(),
            urlWithPath = url.indexOf('//') < url.length - 2,
            urlWithParams = url.indexOf('?') !== -1,
            path = urlWithPath ? url.substring(url.indexOf('//') + 2, urlWithParams ? url.indexOf('?') : url.length) : null,
            parameters = url.substring(url.indexOf('?') + 1).split('&');
        // create JSON object
        if (urlWithParams) {
            for (let i = 0, len = parameters.length; i < len; i++) {
                const paramData = parameters[i].split('=');
                params.set(paramData[0], paramData[1] ? paramData[1] : null);
            }
        }
        return {
            params,
            path,
            toString: () => url
        };
    } else {
        return null;
    }
}

export function _handleOpenURL(handler: UrlHandlerCallback): void {
    URL_HANDLER_CB = handler;
}

export function getCallback(): UrlHandlerCallback {
    if (!URL_HANDLER_CB) {
        URL_HANDLER_CB = function () {
            console.error('No callback provided. Please ensure that you called "handleOpenURL" during application init!');
        };
    }
    return URL_HANDLER_CB;
}

export function _handleURL(appURL, args?) {
    if (!URL_HANDLER_CB) {
        console.error('No callback provided. Please ensure that you called "handleOpenURL" during application init!');
    } else {
        URL_HANDLER_CB(appURL, args);
    }
}
