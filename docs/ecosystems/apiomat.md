# ApiOmat Integration (beta)

> [ApiOmat](https://apiomat.com/) is an Enterprise Backend as a Service solution and [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic)'s apiomat sub-generator can generate UIs from your ApiOmat model definitions. From them it creates a form including full validation and a matching controller, so you don't have to do it all yourself.

## Prepare
You need:
1. An **ApiOmat Account**. [Register here](https://apiomat.com/en/sign-up-en/) if you don't have one already.
3. A **working [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) project** with either tabs or a sidemenu navigation.
2. A **model definition** that is located inside your project (e.g. `app/main/assets/Contact.json`) to generate the UI from.

Currently the following fields in the model definition are supported:

```js
{
  "name": "firstName",
  "label": "First Name",
  "type": "String||Number",
  "validation": {
    "min": 3, // for both String and Number
    "max": 5, // for both String and Number
    "regEx": "[A-z0-9._%+-]+@[A-Z0-9.-]+\\.[A-z]{2,}",
    "text": "e.g. Please enter a valid email address" // should always be present
  },
  "mandatory": true // decides whether field is required for submitting
}
```
An example model definition is provided here: [generators/apiomat/Contact.json](https://github.com/mwaylabs/generator-m-ionic/tree/master/generators/apiomat/Contact.json).

## Integrate

#### Code generation
In order to generate your UI from a model definition you'll need to **run the ApiOmat sub-generator** in your project:
```sh
yo m-ionic:apiomat
```
Even if you select the ApiOmat integration during project setup (e.g. `yo m-ionic`), which is listed there only for completeness, running the sub-generator afterwards is necessary.

The sub-generator then asks you for the **path to your model definition** file:

![image](https://cloud.githubusercontent.com/assets/1370779/14824447/4aab339e-0bd6-11e6-8998-c69d0efab47b.png)

Then enter the **module** into which the code should be generated. We'll assume you choose `main` for the rest of this guide:

![image](https://cloud.githubusercontent.com/assets/1370779/14824667/08bd3e0e-0bd7-11e6-9f35-3a61852cce32.png)

This will create the following files:

![image](https://cloud.githubusercontent.com/assets/1370779/14824720/471c1062-0bd7-11e6-8743-6a2b0fd8a0d6.png)

- `apiomat.html` - UI according to model definition
- `apiomat-ctrl.js` - Matching controller for the UI
- `apiomat-ctrl.spec.js` - Generic test file for the controller

#### Code integration
Make the generated UI show up in your app with the following steps:

`app/main/main.js`

Add a **new route** to your app that will point to the user controller and template:
```js
      //...
      .state('main.apiomat', {
        url: '/apiomat',
        views: {
          // IMPORTANT: the name of the view for the sidemenu
          // starter template is 'pageContent' instead of 'tab-apiomat'
          'tab-apiomat': {
            templateUrl: 'main/templates/apiomat.html',
            controller: 'ApiomatCtrl as ctrl'
          }
        }
      })
//...
```

Depending on which **starter template** you chose you'll need to add a navigation item to one of these files:

`app/templates/tabs.html` (if you chose the Tabs starter template)

```html
  <!-- ApiOmat Tab -->
  <ion-tab title="Apiomat" icon-off="ion-ios-cloud-outline" icon-on="ion-ios-cloud"
    ui-sref="main.apiomat">
    <ion-nav-view name="tab-apiomat"></ion-nav-view>
  </ion-tab>
```

`app/templates/menu.html` (if you chose the Sidemenu starter template)

```html
<!-- ... -->
        <ion-item menu-close ui-sref="main.list">
          List
        </ion-item>
        <!-- add this item -->
        <ion-item menu-close ui-sref="main.apiomat">
          User
        </ion-item>
        <ion-item menu-close ui-sref="main.debug">
          Debug
        </ion-item>
<!-- ... -->
```

And last but not least, make the UI look nice and well-balanced with these few lines of Sass:

`app/main/styles/main.scss`

```scss
.apiomat {
  .error-text {
    font-size:14px;
    padding-top:6px;
    padding-bottom:6px;
    border-top-color: #ef473a;
    white-space:normal;
  }
  .spinner {
    position: relative;
    top: 7px;
  }
  .required {
    margin-top:-20px;
  }
}
```

#### View
Run
```sh
gulp watch
```
And play with your newly generated UI with top-notch form validation:

![image](https://cloud.githubusercontent.com/assets/1370779/14847890/5225f902-0c6b-11e6-9080-1830e8e43381.png)


#### Add logic
For now the controller `apiomat-ctrl.js` just collects all the data and prints them to the console when you submit them. Extend the logic to for instance read and send the data to the actual ApiOmat backend.

In future versions of this generator we'll try to generate this part for you as well. Until then you still have to do it yourself.
