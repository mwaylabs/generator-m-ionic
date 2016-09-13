# Why you need Generator-M-Ionic
<p align="center">
  <img width="175" src="https://raw.githubusercontent.com/mwaylabs/generator-m-ionic/master/docs/resources/logo.png">
</p>
> **Advanced workflows for rock-solid Ionic apps**: develop, prototype, build, test and deliver high quality apps with Yeoman, Gulp, Bower, Angular, Cordova and of course Ionic. All in one sexy generator.

## Why we built it
We at [M-Way Solutions](http://www.mwaysolutions.com/) wanted a single tool that allows us to quickly create compelling prototypes for impressing our customers ***AND*** that later scales with complex project requirements like testing, quality assurance, and continuous integration. Therefore it should:
- **Provide useful workflows**
 - for development, testing, quality assurance, building, continuous integration
 - for complex project requirements like managing different sets and versions of APIs, app icons and splash screens
- **Embed nicely into ecosystem**
  - integrates nicely into different solutions like [Ionic Platform](https://ionic.io/platform) or our own [Relution](https://www.relution.io/en/)
  - use technology stack many developers already know: [Git](https://git-scm.com/), [Yeoman](http://yeoman.io/), [Bower](http://bower.io/), [Gulp](http://gulpjs.com/), [Cordova](https://cordova.apache.org/), ...
- **Standardize project setup**
  - tame and wire together an ever-changing and **complex frontend technology stack**
  - give a default **project & file structure**
  - come with **sensible default configurations** for development tools like [Git](https://git-scm.com/), [ESLint](http://eslint.org/) and others
  - is still easily modified to suit **different project requirements**
  - make app development more **approachable** for newcomers
  - simplify **project handovers**

And this generator being the result of these reflections **does just that**. The best part? You can start using it right away!

## Alternatives
There are two major alternatives out there which are similar to the generator in that they also enable HTML5 mobile app development with Ionic. The [Ionic CLI](http://ionicframework.com/getting-started/) and [generator-ionic](https://github.com/diegonetto/generator-ionic). Both of which did not and to this point still don't suit our needs.

If you want to find out more about **the differences of these tools**, in late 2015 we published an article [Generator-M-Ionic and the search for the holy grail](http://blog.mwaysolutions.com/2015/09/21/generator-m-ionic-and-the-search-for-the-holy-grail/) on our company blog concerning that topic. Here's a brief excerpt:
>### Why not use something else?
The former alternative (Ionic CLI) is being developed by Ionic and is a great tool for beginners, but we got stuck on many occasion when we tried to integrate the CLI in our professional workflow. The latter (generator-ionic) was released by an open source member and it quickly grew immensely popular, however it [hasn't been maintained in over 5 months](https://github.com/diegonetto/generator-ionic/commits/master) (as of the writing of this article) and thus its dependencies are [heavily outdated](https://github.com/diegonetto/generator-ionic/blob/master/package.json#L30) and development came to a complete halt. Issues and pull requests are piling up, but nothing seems to happen.

>One of the reasons we started development of Generator-M in the first place was that we felt [Ionic CLI](http://ionicframework.com/getting-started/) was adding too much magic, effectively hiding the whole ecosystem behind a rainbowy cloud. Granted, this makes things easier to begin with, but also keeps you from taking your development to the next level once you mastered the basics. You'll depend on that rainbowy cloud which has limited capabilities. Don't get me wrong. The Ionic CLI is a powerful tool for beginners and thus definitely serves its purpose. It just doesn't meet our demands for professional software development.
