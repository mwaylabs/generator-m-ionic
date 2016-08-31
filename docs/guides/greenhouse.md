# Greenhouse CI & Relution
Learn how to build and distribute your Ionic app that you've set up with [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) in this 30 minute guide using only free to use features. Build your app in the cloud using [Greenhouse CI](https://app.greenhouseci.com) and deliver them straight to your team members' and customers' devices with [Relution](https://www.relution.io/)! For every push to your repository Greenhouse will build and publish a new version of your app that will then automatically be available through Relution to everyone who needs it. A smooth and stress-free workflow.

## Preparations
What you need:
1. A working **[Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) project**
2. A **[Relution](https://www.relution.io/) Account** - the [free subscription](https://www.relution.io/en/pricing/) suffices
3. A **[Greenhouse CI](https://app.greenhouseci.com) Account** - [free plan](https://greenhouseci.com/pricing.html) is plenty here as well

<p align="center">
  <img width="800" src="res/1_relution_signup.png"><br>
  <i>In your browser: create an account for Relution on  [relution.io](https://www.relution.io/)</i>
</p>

## Prepare your project
There's three alternatives here:
- **Demo project**: Use the Generator-M-Ionic [Demo project on Github](https://github.com/mwaylabs/generator-m-ionic-demo) for now. You'll just need to copy the URL, no cloning with Git or anything: `https://github.com/mwaylabs/generator-m-ionic-demo`
- **New project**: Setup your own [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) project. Checkout the [documentation](https://github.com/mwaylabs/generator-m-ionic#generator-m-ionic) to get started.
- **Existing project**: Use an existing project that you've set up with [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic). It needs to be in a repository that is available on the web.

In any case your Generator-M-Ionic project needs the `greenhouse.sh` build script. The demo project already contains this, so if you chose to build the demo project, you'll have to do nothing. If you create a new project however, you need to select the `Greenhouse & Relution` option in the [Ecosystems Question](./questions.md#ecosystems). And for your existing project you can run the `greenhouse` sub-generator which will generate the `greenhouse.sh` for you:
```sh
yo m-ionic:greenhouse
```
Reading the Generator-M-Ionic [Continuous Integration Guide](./ci.md) sheds some light on the `greenhouse.sh`'s functioning. However it is not necessary to understand that in order to proceed.

## Build your app in Greenhouse
After you've prepared your project, created your Relution and Greenhouse accounts and signed into [app.greenhouseci.com](https://app.greenhouseci.com/#/login) and [live.relution.io](https://live.relution.io/relution/portal/#/login) using your browser, you can now create a new app in Greenhouse.

#### Create a new Greenhouse app
In the Greenhouse project overview, add a new app by clicking the `add a new app` button.
<p align="center">
  <img width="350" src="res/2_gh_create_app.png"><br>
  <i>In your browser: create a new app on [app.greenhouseci.com](https://app.greenhouseci.com/#/login)</i>
</p>

Once you've done that, supply the URL to the repository you want to build as part of the initial project configuration as seen below. The URL for the [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) Demo project is `https://github.com/mwaylabs/generator-m-ionic-demo`.

<p align="center">
  <img width="800" src="res/3_gh_project_conf.png"><br>
  <i>Greenhouse CI: initial project configuration for your new app</i>
</p>

Alternatively if you want to build your own project provide any other URL to a public repository or even add your private repository using [SSH or Basic Auth](http://docs.greenhouseci.com/docs/specify-git-repository). As long as your repository contains a project which was set up with [Generator-M-Ionic](https://github.com/mwaylabs/generator-m-ionic) this guide is right for you. For building other projects follow the [Greenhouse CI Documentation](http://docs.greenhouseci.com/docs).


#### Configure Greenhouse Environment
When you hit `continue`, the setup will jump right to the `Build` configuration. Navigate back to `Environment`. This part is needed to tell Greenhouse how to prepare and build your Generator-M-Ionic app by uploading the `greenhouse.sh` file of your project. If you're interested on what exactly the `greenhouse.sh` does, read the Generator-M-Ionic [Continuous Integration Guide](./ci.md).

<p align="center">
  <img width="800" src="res/4_gh_environment.png"><br>
  <i>Greenhouse CI: go back to `Environment`</i>
</p>

Click the `add` button under `Environment Files`:
<p align="center">
  <img width="250" src="res/5_gh_envfiles.png"><br>
  <i>Greenhouse CI: add an environment file</i>
</p>

Select or drag and drop the `greenhouse.sh` file of your project:

<p align="center">
  <img width="800" src="res/5.1_gh_envfiles.png"><br>
  <i>Greenhouse CI: upload `greenhouse.sh`</i>
</p>

And name it `GH_POST_CLONE_SCRIPT`:
<p align="center">
  <img width="800" src="res/5.2_gh_envfiles.png"><br>
  <i>Greenhouse CI: GH_POST_CLONE_SCRIPT</i>
</p>


## Configure Greenhouse Build
Now that we told the Greenhouse CI how to prepare your project for building by providing the `greenhouse.sh` script of your project, we can now continue and configure the actual `Build`.


First select the branch of your repository that you want to build.
<p align="center">
  <img width="800" src="res/6_gh_build.png"><br>
  <i>Greenhouse CI: Build Configuration - Select Branch</i>
</p>

Greenhouse will then proceed to prepare and discover your project. This might take a while, because it will clone your project, checkout the branch and perform a complete `npm install`, `bower install` and a first `gulp build` to discover which platforms you're building for.

When this is finished you'll be able to complete your build configuration. If you're building for iOS, you will have to upload your provisioning profile as well as signing certificate along with its password.
>Need help with the [provisioning profile](http://docs.greenhouseci.com/docs/building-ios-apps#section-provisioning-profile) and the [signing certificate](http://docs.greenhouseci.com/docs/building-ios-apps#section-signing-certificate)?

<p align="center">
  <img width="800" src="res/6.1_gh_build.png"><br>
  <i>Greenhouse CI: Build Configuration - Complete configuration</i>
</p>

Hitting save will trigger the first full build of your app which will produce the `.ipa` and `.apk` files of your app for iOS and Android respectively.

## Building

You'll be navigated back to the project overview. Pressing `View build` on your project will take you to an overview of your builds for that project.
<p align="center">
  <img width="800" src="res/7_gh_building.png"><br>
  <i>Greenhouse CI: Project overview - building</i>
</p>

For now there's only one build, because you just started your very first complete build.

<p align="center">
  <img width="800" src="res/7.1_gh_building.png"><br>
  <i>Greenhouse CI: Build overview</i>
</p>

By clicking on it you can see details of your build as well as a live log of the actions that are currently being performed.

<p align="center">
  <img width="800" src="res/7.2_gh_building.png"><br>
  <i>Greenhouse CI: Building - live log</i>
</p>

Now that your project has finished building you can download your build artefacts containing the `.ipa` and `.apk` files from the `Overview` tab.

<p align="center">
  <img width="800" src="res/7.3_gh_building.png"><br>
  <i>Greenhouse CI: Building - download build artefacts</i>
</p>

Manually connecting and installing the apps on the devices is a little cumbersome and mostly not desirable. With [Relution](https://www.relution.io/) distributing your app to everybody who needs it and installing it is only a button press away.

## Publishing to Relution
In order to configure your app for distribution with Relution, head back to your project's overview and press that little gear icon towards the top-right.

<p align="center">
  <img width="800" src="res/8_rel_conf.png"><br>
  <i>Greenhouse CI: Project overview, configure via gear icon</i>
</p>

You'll be taken to the project configuration that you know from earlier. Go to the previously unavailable `Publishing` section and select `Relution`. Provide your username, password -this was sent to you via email- and the Relution Server URL: `https://live.relution.io/`. Then hit `save`!

<p align="center">
  <img width="800" src="res/8.1_rel_conf.png"><br>
  <i>Greenhouse CI: Project overview, configure via gear icon</i>
</p>

Go back to your project's overview and hit the `Build` button.

<p align="center">
  <img width="800" src="res/8_rel_conf.png"><br>
  <i>Greenhouse CI: Project overview, build!</i>
</p>

This will start building your app just as before. Only at the end it will no publish your app to Relution making it easily available for testing and delivery purposes! You can see that your build is being published to Relution at the end of the live log of your build.

<p align="center">
  <img width="800" src="res/9_rel_publish.png"><br>
  <i>Greenhouse CI: publishing to Relution</i>
</p>

When you log into [live.relution.io](https://live.relution.io/) using your browser and then navigate to `Apps > App Store`, you'll find the Android and iOS apps you just built.
<p align="center">
  <img width="800" src="res/9.1_rel_publish.png"><br>
  <i>Greenhouse CI: publishing to Relution</i>
</p>

The only thing left to do now, is to get your app on your devices. The Relution app comes to the rescue.

## Install your app via the Relution app
The Relution app is found in the Android Play Store and the iOS App Store and you can think of it as your own personal app store for managing apps.

<p align="center">
  <img width="300" src="res/10_rel_install.jpg"><br>
  <i>Install the Relution app</i>
</p>

After you've installed it, login using your credentials.

<p align="center">
  <img width="300" src="res/11_rel_login.jpg"><br>
  <i>Relution app: login</i>
</p>

Using the side menu, navigate to the `Development` section.
<p align="center">
  <img width="300" src="res/12_rel_menu.jpg"><br>
  <i>Relution app: menu</i>
</p>

This contains all your apps that are currently in the `Development` stage. In our case, this is only the one we just built.

<p align="center">
  <img width="300" src="res/13_rel_app.jpg"><br>
  <i>Relution app: apps in Development</i>
</p>

And tada! Your app is ready to be used on your device!

<p align="center">
  <img width="300" src="res/14_rel_device.jpg"><br>
  <i>Relution app: your app was installed</i>
</p>


## New versions of your app
Now every time code changes are pushed to the master branch of your repository, Greenhouse will fully build your app, publish it to Relution and from there it is delivered straight to everybody's device. Opening the Relution app and installing the new version is the only thing left to do.

With Relution you can register different devices and different users to your organization and assign them different roles so they can see different apps at different stages. For instance apps in `Development` are only visible to the development team until they approve a specific version for `Review` by other stakeholders, who can then in turn approve the app which will move that app to `Production` and make it available for the end-users.

## Further
For further information on how to use Relution, head over to the [relution.io documentation](https://live.relution.io/relution/docs/manual.html) and in order to learn more about how to use the Greenhouse CI head over to their documentation on [docs.greenhouseci.com/docs](http://docs.greenhouseci.com/docs).

## Notes
Granted, the Greenhouse CI integration for Generator-M-Ionic project is a little time-consuming at times and not ideal yet, but it works for now. Nevertheless we're looking to improve the whole process and make it more slick! Feedback is very welcome!
