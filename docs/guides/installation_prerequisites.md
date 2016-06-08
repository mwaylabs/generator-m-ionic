# Installation and Prerequisites

Besides simply installing everything, we recommend having or obtaining a **fair knowledge** of the technologies, so you can understand what you are doing. If you don't know what all this is, our blog article [Generator-M-Ionic: HTML5 mobile app development evolved](http://blog.mwaysolutions.com/2015/09/10/generator-m-ionic-html5-mobile-app-development-evolved/) may be a **good starting point**.

## Node and dependencies
-  **[Nodejs & npm](https://nodejs.org/)** - install via their website
- **[Yo](http://yeoman.io/)**, **[Gulp](http://gulpjs.com/)** and **[Bower](http://bower.io/)** - install via npm

```
npm install --global yo
npm install --global gulp
npm install --global bower
```


## Platform SDKs
In order to run your app on a device, you'll need **Platform SDKs** for the platforms and the versions you are developing for. If you just want to develop in the browser for now, no SDKs are needed. Head over to Cordova Documentation: [Platform Guides](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html) or Cordova CLI: [Requirements](https://github.com/apache/cordova-cli/#requirements) for further instructions.
#### Note
You don't have to install the **Cordova CLI**. It's provided with the generator. We're installing the Cordova CLI locally (not globally) so you can use the one your project was built with rather than the one you have installed on your machine.

## Generator
Everything else you need will be installed using:
```sh
npm install --global generator-m-ionic
```

Everything went well? - Awesome! Get started using the [Get started](../../README.md#get-started) documents in the `README.md`.
