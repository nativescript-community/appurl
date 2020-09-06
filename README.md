# NativeScript URL Handler Plugin  ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

this is a direct fork/rewrite of [nativescript-urlhandler](https://github.com/hypery2k/nativescript-urlhandler) by [Martin Reinhardt](https://github.com/hypery2k)
It did not seem to be maintained anymore and was not working as expected


[npm-image]:http://img.shields.io/npm/v/@nativescript-community/appurl.svg
[npm-url]:https://npmjs.org/package/@nativescript-community/appurl
[downloads-image]:http://img.shields.io/npm/dm/@nativescript-community/appurl.svg
# Usage

Just add App links to your app, see iOS and Android instructions below, and register a handler for the URL data.

See this example for Angular:
```typescript
import { Component, OnInit } from "@angular/core";
import { handleOpenURL, AppURL } from '@nativescript-community/appurl';

@Component({
  selector: "gr-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor() {
    } 
    
    ngOnInit(){
        handleOpenURL((appURL: AppURL) => {
            console.log('Got the following appURL', appURL);
        });
     }
}

```
And for pure NativeScript:
```javascript
var handleOpenURL = require("@nativescript-community/appurl").handleOpenURL;

handleOpenURL(function(appURL) {
  console.log('Got the following appURL', appURL);
});

```
Or as TypeScript:
```typescript
import { handleOpenURL, AppURL } from '@nativescript-community/appurl';

handleOpenURL((appURL: AppURL) => {
  console.log('Got the following appURL', appURL);
});

```

>Note: see `demo` app for sample usage. Start by adding handleOpenURL in app main!


## Installation

```bash
$ tns plugin add @nativescript-community/appurl
```

Or if you want to use the development version (nightly build), which maybe not stable!:

```bash
$ tns plugin add @nativescript-community/appurl@next
```


### Android

Replace *myapp* with your desired scheme and set launchMode to *singleTask*
```xml
<activity android:name="com.tns.NativeScriptActivity" ... android:launchMode="singleTask"...>
        ...
    <intent-filter>
    <data android:scheme="myapp" /> 
    <action android:name="android.intent.action.VIEW" /> 
    <category android:name="android.intent.category.DEFAULT" /> 
    <category android:name="android.intent.category.BROWSABLE" /> 
    </intent-filter>
```

For example:

```xml
<activity android:name="com.tns.NativeScriptApplication" android:label="@string/app_name" android:launchMode="singleTask">
  <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
  <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" /> 
      <data android:scheme="myapp" android:host="__PACKAGE__" />
  </intent-filter>
</activity>

```

The android:launchMode="singleTask" tells the Android operating system to launch the app with a new instance of the activity, or use an existing one. Without this your app will launch multiple instances of itself which is no good.

### iOS

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.yourcompany.myapp</string>
    </dict>
    <dict>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>myapp</string>
        </array>
    </dict>
</array>
```

# FAQ

## Callback handling

The "handleOpenURL" callback must be called before application initialization, otherwise you'll see this error in the console:

```
    No callback provided. Please ensure that you called "handleOpenURL" during application init!
``` 

## Webpack

### TypeScript Config

If your Webpack Build is failing, try adapting your tsconfig to this:

```
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "noEmitHelpers": true,
        "noEmitOnError": true,
        "lib": [
            "es6",
            "dom",
            "es2015.iterable"
        ],
        "baseUrl": ".",
        "paths": {
            "*": [
                "./node_modules/@nativescript/core/*",
                "./node_modules/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "platforms",
        "**/*.aot.ts"
    ]
```
