
import * as application from '@nativescript/core/application';
import { _handleURL, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export function handleIntent(intent: android.content.Intent, args?) {
    const data = intent.getData();
    try {
        const appURL = extractAppURL(data);
        const action = intent.getAction();
        if (appURL != null &&
            (action === android.content.Intent.ACTION_MAIN
                || action === android.content.Intent.ACTION_VIEW)) {
            try {
                _handleURL(appURL, args);
            } catch (ignored) {
                console.log('error handling url', ignored);
                application.android.on(application.AndroidApplication.activityResultEvent, () => {
                    _handleURL(appURL, {
                        eventName:application.AndroidApplication.activityResultEvent
                    });
                });
            }
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

}
application.android.on(application.AndroidApplication.activityStartedEvent, function(args: application.AndroidActivityEventData) {
    const intent: android.content.Intent = args.activity.getIntent();
    try {
        handleIntent(intent, {
            eventName:application.AndroidApplication.activityStartedEvent
        });
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

});
application.android.on(application.AndroidApplication.activityNewIntentEvent, function(args: application.AndroidActivityNewIntentEventData) {
    const intent: android.content.Intent = args.intent;
    try {
        handleIntent(intent, {
            eventName:application.AndroidApplication.activityNewIntentEvent
        });
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

});
