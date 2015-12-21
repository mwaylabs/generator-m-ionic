# Why you need it
> Build mobile Cordova/PhoneGap apps quickly with the tools you love:
Yeoman, Gulp, Bower, AngularJS, Ionic & of course Cordova. All in one sexy generator.

## Why we built it
We built the generator because the existing tools didn't quite suit our needs. We at [M-Way Solutions](http://www.mwaysolutions.com/) wanted a tool for HTML5 mobile app development that:
- makes use of the **usual web development tooling** which is already used by web developers worldwide. Especially: [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), [Yeoman](http://yeoman.io/), [Gulp](http://gulpjs.com/), [Bower](http://bower.io/).
- allows us to quickly switch between different projects of different creators.
- uses current up-to-date **industry standards for HTML5 mobile app development** without reinventing the wheel. Namely: [AngularJS](https://angularjs.org/), [Ionic](http://ionicframework.com/), [Cordova](https://cordova.apache.org/) and its CLI
- enables a **professional workflow** for testing, building, continuous delivery and development
of high-quality apps
- is **flexible** so it can evolve over time and can be **enhanced** on a per-project basis for special use-cases

And this generator being the result of these reflections **does just that**.

## Alternatives
There are two major alternatives out there which are similar to the generator in that they also enable HTML5 mobile app development with Ionic. The [Ionic CLI](http://ionicframework.com/getting-started/) and [generator-ionic](https://github.com/diegonetto/generator-ionic). Both of which did not and to this point still don't suit our needs.

If you want to find out more about **the differences of these tools**, we recently published an article [Generator-M-Ionic and the search for the holy grail](http://blog.mwaysolutions.com/2015/09/21/generator-m-ionic-and-the-search-for-the-holy-grail/) on our company blog concerning that topic. Here's a brief excerpt:
>### Why not use something else?
The former alternative (Ionic CLI) is being developed by Ionic and is a great tool for beginners, but we got stuck on many occasion when we tried to integrate the CLI in our professional workflow. The latter (generator-ionic) was released by an open source member and it quickly grew immensely popular, however it [hasn't been maintained in over 5 months](https://github.com/diegonetto/generator-ionic/commits/master) (as of the writing of this article) and thus its dependencies are [heavily outdated](https://github.com/diegonetto/generator-ionic/blob/master/package.json#L30) and development came to a complete halt. Issues and pull requests are piling up, but nothing seems to happen.

>One of the reasons we started development of Generator-M in the first place was that we felt [Ionic CLI](http://ionicframework.com/getting-started/) was adding too much magic, effectively hiding the whole ecosystem behind a rainbowy cloud. Granted, this makes things easier to begin with, but also keeps you from taking your development to the next level once you mastered the basics. You'll depend on that rainbowy cloud which has limited capabilities. Don't get me wrong. The Ionic CLI is a powerful tool for beginners and thus definitely serves its purpose. It just doesn't meet our demands for professional software development.
