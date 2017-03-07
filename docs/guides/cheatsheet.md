##### Requirements
Xcode latest. See on [Stackoverflow](http://stackoverflow.com/questions/10335747/how-to-download-xcode-4-5-6-7-8-and-get-the-dmg-or-xip-file) for the latest version.

Android SDK. Use `brew install android-sdk` to install. Then run `android` in terminal and in the Android SDK Manager install the latest Android SDK.

##### Setup
```bash
yarn global add yo gulp bower generator-m-ionic
mkdir myProject
cd myProject
yo m-ionic
```

##### Run in Browser
```bash
gulp watch
```

##### Run in iOS Simulator
```bash
gulp --livereload "emulate ios"
```

##### Run on iOS Device
Plugin iPhone or iPad to Mac, then:
```bash
gulp --cordova "prepare ios"
open platforms/ios/myProject.xcodeproj
```
- In Xcode, at General -> Signing -> Team, login with your Apple ID.
- Check "Automatically manage signing".
```bash
gulp --cordova "run ios --device"
```

##### Run on Android Device
Plugin Android Phone or Tablet to Mac, then:
```bash
gulp --cordova "prepare android"
gulp --cordova "run ios --device"
```

##### Build ipa for iOS Devices
Create file build.json with signing properties: 

```json
{
  "ios": {
    "release": {
      "codeSignIdentity": "iPhone Distribution: M-Way Solutions GmbH",
      "provisioningProfile": "05449459-6787-4d1d-92c9-5c802b2bd7e7",
      "developmentTeam": "12345678ABC",
      "packageType": "enterprise"
    }
  }
}
```
These are properties you have to add on your own. [About iOS signing properties](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/#signing-an-app)  

```bash
gulp --cordova "prepare ios" --no-build
gulp build
gulp --cordova "build ios --device --release" --no-build
```
The .ipa can be found in `platforms/ios/build/device/myProject.ipa`

##### Build apk for Android Devices
Add your keystore file and create file build.json with signing properties: 

```json
{
  "android": {
    "release": {
      "keystore": "mway.keystore",
      "storePassword": "12345678",
      "alias": "mway",
      "password": "12345678",
      "keystoreType": "jks"
    }
  }
}
```
These are properties you have to add on your own. [About Android signing properties](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#signing-an-app)  

```bash
gulp --cordova "prepare android" --no-build
gulp build
gulp --cordova "build android --device --release" --no-build
```
The .apk can be found in `platforms/android/build/outputs/apk/android-release.apk`
