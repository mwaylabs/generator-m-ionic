# Ionic Cloud Integration (beta)

> [Ionic Cloud](https://ionic.io/cloud) offers powerful tools for managing and scaling cross-platform mobile apps by providing mobile backend services like Push, User Management and others that can be integrated into [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) using its ionic-cloud sub-generator.

In this guide you'll learn how to prepare your Generator-M-Ionic project in order to use it with the [Ionic Cloud](https://ionic.io/cloud). Additionally we'll create a User Tab to sign up and sign in with the [Ionic Users Service](http://docs.ionic.io/services/users/).

## Prepare

1. You need **Ionic Cloud Account**. If you don't have one [register here](https://apps.ionic.io/signup).
2. Install the latest version of the [Ionic CLI](http://ionicframework.com/docs/cli/): `npm install -g ionic`

## Integrate

#### Code generation
When you run `yo m-ionic` you'll be asked if you want to integrate Ionic Cloud into your app.

![image](https://cloud.githubusercontent.com/assets/1370779/18383581/95ff88fc-7686-11e6-8850-24a24ae23070.png)

Alternatively you can run the Ionic Cloud sub-generator at any time in your project:
```sh
yo m-ionic:ionic-cloud
```

Running the sub-generator or selecting Ionic Cloud as an ecosystem during setup will create the following files:

![image](https://cloud.githubusercontent.com/assets/1370779/18383722/10274714-7687-11e6-8b26-fa735ce8044f.png)

- `user.html` - example UI
- `user-ctrl.js` - example implementation of [Ionic User service](http://docs.ionic.io/docs/user-overview)
- `user-ctrl.spec.js` - generic test file

As you can see, the example implementation will be generated into your **main module**. If you want to generate the files into a different module, do so by typing:

```sh
yo m-ionic:ionic-cloud <moduleName>
```
For the rest of this guide, we'll assume that you generated the code into the main module.

#### Project setup
Additionally we need the [ionic-platform-web-client](https://github.com/driftyco/ionic-platform-web-client) bower package to access the [Ionic Platform services](http://docs.ionic.io/docs/) from within our app. The documentation can be found [here](http://docs.ionic.io/docs) and installation is done using this command:
```sh
bower install --save ionic-platform-web-client
```

Afterwards, use the Ionic CLI to register your app with the Ionic Platform. You'll need to sign into your account during this, if the CLI doesn't know your credentials yet.
```sh
ionic io init
```
This creates these these two files:

![image](https://cloud.githubusercontent.com/assets/1370779/14608842/97f99b86-0587-11e6-94d4-3fef774907a4.png)

The first contains your `app_id` and `api_key` that look similar to these:

`.io-config.json`:
```json
{
  "app_id": "7e0db044",
  "api_key": "166ea6b184c5fb5cef5abd93f1a6247271e5c42ccaab825f"
}
```

The *ionic-platform-web-client* needs these two values be copied into the library code, that you just installed using bower (read more about the why and how in these issues https://github.com/driftyco/ionic-platform-web-client/issues/41, https://github.com/driftyco/ionic-platform-web-client/issues/4). I know this is not exactly nice, but we're actively trying to change this. However for now, until Ionic provides a better solution, we're stuck with this.

So in order to get going, run this gulp tasks and your instance of *ionic-platform-web-client* is ready to use:
```sh
gulp ionic-platform # copies app_id & api_key into the ionic-platform-web-client
```
Since we're manipulating library code here, you'll need to run `gulp ionic-platform` every time you're cloning your repository or install your bower dependencies.

#### ionic upload

#### Code integration & adjustments
Now that we have successfully created the sample code and set up the ionic-platform-web-client, we just need to wire everything together in order for the User service example to show up in your app.

`app/.eslintrc`

Add the following line, to the globals section for **correct code-linting**:
```js
//...
  "globals": {
    //...
    "Ionic": true,
    //...
  },
//...
```

`app/main/main.js`

Add a **new route** to your app that will point to the user controller and template:
```js
      //...
      .state('main.user', {
        url: '/user',
        views: {
          // IMPORTANT: the name of the view for the sidemenu
          // starter template is 'pageContent' instead of 'tab-user'
          'tab-user': {
            templateUrl: 'main/templates/user.html',
            controller: 'UserCtrl as ctrl'
          }
        }
      })
//...
```

Depending on which **starter template** you chose you'll need to add a navigation item to one of these files:

`app/main/templates/tabs.html` (if you chose the Tabs starter template)

```html
  <!-- User Tab -->
  <ion-tab title="User" icon-off="ion-ios-person-outline" icon-on="ion-ios-person"
    ui-sref="main.user">
    <ion-nav-view name="tab-user"></ion-nav-view>
  </ion-tab>
```

`app/main/templates/menu.html` (if you chose the Sidemenu starter template)

```html
<!-- ... -->
        <ion-item menu-close ui-sref="main.list">
          List
        </ion-item>
        <!-- add this item -->
        <ion-item menu-close ui-sref="main.user">
          User
        </ion-item>
        <ion-item menu-close ui-sref="main.debug">
          Debug
        </ion-item>
<!-- ... -->
```
#### Test the Ionic Platform sample
Run
```sh
gulp watch # wires the library and example code into the index.html
```
Now navigate to the new `User` tab icon and you're ready to explore the [Ionic Platform User](http://docs.ionic.io/docs/user-overview) service in a simple example.

![image](https://cloud.githubusercontent.com/assets/1370779/14609829/be9cb21a-058b-11e6-9212-d573f053c348.png)


#### Upload to ionic.io
Before you can upload your app to ionic.io, you'll need to create a running build.

Comment the `cordova.js` script in your `index.html`:
```html
<!-- will be a 404 during development -->
<!-- <script src="cordova.js"></script> -->
```
Remember to undo this if you are building or running using `gulp --cordova`.
Then in order to build and see your app run:

```sh
gulp watch-build
```
This will build your app into the `www/` folder and open your browser to view it. If you're confident with the results run:

```sh
ionic upload --note "some change note"
```

Your app is now ready to be used with the [Ionic View App](http://view.ionic.io/).
More about the Ionic Upload service [here](http://docs.ionic.io/docs/io-uploading).


#### More services
The Ionic Platform provides a variety of additional services to enhance your app, like Push, Deploy and Analytics. Make sure to check out the [documentation](http://docs.ionic.io/) so you can start using them in your app.
