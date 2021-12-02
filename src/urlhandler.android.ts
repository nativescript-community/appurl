import { AndroidActivityEventData, AndroidActivityNewIntentEventData, AndroidApplication, android as andApp } from '@nativescript/core/application';
import { _handleOpenURL, _handleURL, extractAppURL } from './urlhandler.common';
import { UrlHandlerCallback } from './urlhandler';
export { _handleOpenURL } from './urlhandler.common';

export function handleOpenURL(handler: UrlHandlerCallback): void {
    _handleOpenURL(handler);
}

export function handleIntent(intent: android.content.Intent, args?) {
    const data = intent.getData();
    try {
        const appURL = extractAppURL(data);
        const action = intent.getAction();
        if (appURL != null && (action === android.content.Intent.ACTION_MAIN || action === android.content.Intent.ACTION_VIEW)) {
            try {
                _handleURL(appURL, args);
            } catch (ignored) {
                console.log('error handling url', ignored);
                andApp.on(AndroidApplication.activityResultEvent, () => {
                    _handleURL(appURL, {
                        eventName: AndroidApplication.activityResultEvent,
                    });
                });
            }
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
}
andApp.on(AndroidApplication.activityStartedEvent, function (args: AndroidActivityEventData) {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
        handleIntent(intent, {
            eventName: AndroidApplication.activityStartedEvent,
        });
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
});
andApp.on(AndroidApplication.activityNewIntentEvent, function (args: AndroidActivityNewIntentEventData) {
    const intent: android.content.Intent = args.intent;
    try {
        handleIntent(intent, {
            eventName: AndroidApplication.activityNewIntentEvent,
        });
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
});
