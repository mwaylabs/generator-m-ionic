# Ionic Cloud Integration (beta)

> [Ionic Cloud](https://ionic.io/cloud) offers powerful tools for managing and scaling cross-platform mobile apps by providing mobile backend services like Push, User Management and others that can be integrated into [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) using its ionic-cloud sub-generator.

In this guide you'll learn tow things:

- how to prepare your Generator-M-Ionic project in order to use it with the [Ionic Cloud](https://ionic.io/cloud)
- additionally we'll create a working example of the [Ionic Users Service](http://docs.ionic.io/services/users/) to sign up and sign in with it in order test your configuration

## Prepare
You need to:
1. create an **Ionic Cloud Account**, if you don't have one already. [Register here](https://apps.ionic.io/signup).
2. install the latest version of the [Ionic CLI](http://ionicframework.com/docs/cli/):

```sh
npm install -g ionic
```

## Setup

#### Generate files
When you run `yo m-ionic` you'll be asked if you want to integrate Ionic Cloud into your app.

![image](https://cloud.githubusercontent.com/assets/1370779/18383581/95ff88fc-7686-11e6-8850-24a24ae23070.png)

Alternatively you can run the Ionic Cloud sub-generator at any time in your project:
```sh
yo m-ionic:ionic-cloud
```

Running the sub-generator or selecting Ionic Cloud as an ecosystem during setup will create the following files:

![image](https://cloud.githubusercontent.com/assets/1370779/18432239/36750f9e-78e1-11e6-966d-70fd08e8938b.png)

- `ionic.config.json` - ionic configuration file
- `user.html` - example UI for [Ionic Users](http://docs.ionic.io/services/users/)
- `user-ctrl.js` - example controller for [Ionic Users](http://docs.ionic.io/services/users/)
- `user-ctrl.spec.js` - generic test file

As you can see, the example implementation will be generated into your **main module**. If you want to generate the files into a different module, do so by typing:

```sh
yo m-ionic:ionic-cloud <moduleName>
```
For the rest of this guide, we'll assume that you generated the code into the main module.

#### Link project with Ionic Cloud
Now that you have generate a valid `ionic.config.json`, use the Ionic CLI to register your app with Ionic Cloud.
```sh
ionic io init
```
The CLI will ask for your credentials if it doesn't know them yet, register your app and then create a new file containing your Ionic `app_id` and `api_key`:

`.io-config.json`:
```json
{
  "app_id":"667cf3a3",
  "api_key":"30df2610d0fca1f45f1b83982a876090f4f8a67dfd357c65"
}
```
Additionally this will add your `app_id` to the `ionic.config.json` file:
```json
{
  "name": "generator-m-ionic",
  "app_id": "667cf3a3"
}
```
The `app_id` property identifies your app in the Ionic Cloud context. You'll need the `app_id` again a minute, so keep track of it. In order to change the name of your project that it goes by in the Ionic Cloud, change the `name` property to adjust it.

#### Install ionic-cloud library
In order to use the Ionic Cloud services we need to install the [ionic-cloud](https://github.com/driftyco/ionic-cloud) library via npm:
```sh
npm install @ionic/cloud --save
```
Unfortunately ionic-cloud isn't available through [bower](https://bower.io/) and [probably won't be](https://github.com/driftyco/ionic-cloud/issues/43) for a while. So you'll have to include in your `index.html` yourself. We recommend to do the following (analogous to the [Ionic Setup doc](http://docs.ionic.io/setup.html)):
```sh
# copy the ionic.cloud.min.js file into your bower_components/
cp node_modules/@ionic/cloud/dist/bundle/ionic.cloud.min.js app/bower_components/
```
You will have to manually copy this file at every point where you run `bower install` or `npm install`. To get past this, you might consider excluding it from your project's `.gitignore`:
```sh
# exclude from .gitignore
!bower_components/ionic.cloud.min.js
```
Since git has previously excluded all files in `bower_components/` you might need to [forcibly add](http://stackoverflow.com/questions/8006393/force-add-despite-the-gitignore-file) the `ionic.cloud.min.js`.


#### Include and configure ionic-cloud library
Now that you've installed the `ionic-cloud` library you need to add it to your `index.html`. The best place to include the `ionic.cloud.min.js` file is in between the following [two lines](https://github.com/mwaylabs/generator-m-ionic-demo/blob/master/app/index.html#L54-L55) of your `index.html`:
```html
<!-- endbower -->
<script src="bower_components/ionic.cloud.min.js"></script>
<!-- endbuild -->
```
This is right below all your files included via bower and still within the build configuration.

For older browsers like the one in `Android < 4.4.4` you'll need to include a [Promise polyfill as well](http://docs.ionic.io/setup.html#promises). For newer platforms this is not necessary.

The last thing you need in order to configure your installation of `ionic-cloud` is to add `ionic.cloud` as a module dependency in your app's module declaration and initialize the `$ionicCloudProvider` with your `app_id` (which you'll find in the `ionic.config.json` and `.io-config.json`).

After that the beginning of your `main.js` should look similar to this:
```js
'use strict';
 angular.module('main', [
   'ionic',
   'ionic.cloud', // ADD: include ionic.cloud module
   'ngCordova',
   'ui.router',
 ])
 // ADD: initialize $ionicCloudProvider with app_id
.config(function ($ionicCloudProvider) {
  $ionicCloudProvider.init({
    'core': {
      'app_id': '667cf3a3'
    }
  });
})
// ...
```

#### Upload to the Ionic Cloud
At this point your project is fully configured to work with [Ionic Cloud](https://ionic.io/cloud).

To try this out, run:
```sh
gulp watch-build
```
This will build your app into the `www/` folder (just like `gulp build`) and it additionally opens your browser to view it. If you're confident with the results, run the following command which will upload the contents of `www/` to the Ionic Cloud:

```sh
ionic upload --note "first upload"
```
The CLI **might throw an error** after uploading. This is a [known problem](https://github.com/driftyco/ionic-cli/issues/1332) with the Ionic CLI in conjunction with Generator-M-Ionic project's. However **your app will still upload** without any restrictions and you should be able to see it under [https://apps.ionic.io/apps](https://apps.ionic.io/apps):

![image](https://cloud.githubusercontent.com/assets/1370779/18433918/72e84c1c-78ea-11e6-9615-75ccb97431bd.png)

Your app is now ready to be used with the [Ionic View App](http://view.ionic.io/).
More about the Ionic Upload service [here](http://docs.ionic.io/services/deploy/#snapshots).

## Ionic Users example
You have fully configured your project to work with the Ionic Cloud, the only thing left to do is to get that Ionic Users example to run in your app. For that you need to do two things:

1. **Add a new route** in your `main.js` (wiring together the user controller and templae)
2. **Add a navigation item** to point to that route

These tasks differ a little bit, depending on which **starter template** you chose during the setup of you Generator-M-Ionic project.

#### Add a new route
Add a **new route** to your app that will point to the example controller and template for the Ionic Users service:

This is done in your `app/main/main.js`:

Code for Tabs template:
```js
//...
.state('main.user', {
  url: '/user',
  views: {
    'tab-user': {
      templateUrl: 'main/templates/user.html',
      controller: 'UserCtrl as ctrl'
    }
  }
})
//...
```
Code for Sidemenu template:
```js
//...
// Code for SIDEMENU TEMPLATE
.state('main.user', {
  url: '/user',
  views: {
    'pageContent': {
      templateUrl: 'main/templates/user.html',
      controller: 'UserCtrl as ctrl'
    }
  }
})
//...
```

#### Add a navigation item

For Tabs template: `app/main/templates/tabs.html`
```html
<!-- User Tab -->
<ion-tab title="User" icon-off="ion-ios-person-outline" icon-on="ion-ios-person"
  ui-sref="main.user">
  <ion-nav-view name="tab-user"></ion-nav-view>
</ion-tab>
```

For Sidemenu template: `app/main/templates/menu.html`

```html
<!-- menu content -->
<ion-content>
<!-- ... -->
<!-- ADD THIS: User Nav Item-->
<ion-item menu-close ui-sref="main.user">
  User
</ion-item>
<!-- ... -->
```
#### See the Example
Run
```sh
gulp watch
```
Now navigate to the new `User` navigation item and you're ready to explore the [Ionic Cloud User](http://docs.ionic.io/services/users/) service with a simple example. For added insights open your browser's developer tools!

![image](https://cloud.githubusercontent.com/assets/1370779/14609829/be9cb21a-058b-11e6-9212-d573f053c348.png)

#### Upload to Ionic Cloud (with changes)
Again, if you're confident with results. Run the following command to build your app with the new changes into `www/` to prepare it for uploading to the Ionic CLI:
```sh
gulp watch-build
```
Check the results in your browser. If everything works as expected, upload via:
```sh
ionic upload --note 'working ionic user example'
```

#### Yeah! And how to proceed.
Nice.  
You've setup your project to work with the [Ionic Cloud](https://ionic.io/cloud) and integrated the [Ionic Users](http://docs.ionic.io/services/users/) service as your frist service!

The Ionic Cloud provides a variety of additional services to enhance your app, like Push, Deploy and Analytics. Make sure to check out the [documentation](http://docs.ionic.io/) so you can start using them in your app.

Have fun!

#### Troubles?
If you're having problems while trying to use Ionic Cloud with Generator-M-Ionic, open a [new issue](https://github.com/mwaylabs/generator-m-ionic/issues/new) and we'll try to help you out if we can. However our time is limited so please make sure you discover other options as well!
