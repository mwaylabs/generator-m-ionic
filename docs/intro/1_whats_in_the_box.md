# What's in the box
<p align="center">
  <a href="http://yeoman.io/" target="_blank" alt="yeoman" title="yeoman">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041228/c1f91cac-ac7a-11e4-9c85-1a5298e29067.png">
  </a>
  <a href="http://gulpjs.com/" target="_blank" alt="gulp" title="gulp">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9409728/c5332474-481c-11e5-9a6e-74641a0f1782.png">
  </a>
  <a href="http://bower.io/" target="_blank" alt="bower" title="bower">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041250/ef9a78b8-ac7a-11e4-9586-7e7e894e201e.png">
  </a>
  <a href="https://angularjs.org/" target="_blank" alt="angular" title="angular">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041199/5978cb96-ac7a-11e4-9568-829e2ea4312f.png">
  </a>
  <a href="http://ionicframework.com/" target="_blank" alt="ionic" title="ionic">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041296/59c5717a-ac7b-11e4-9d5d-9c5232aace64.png">
  </a>
  <a href="http://cordova.apache.org/" target="_blank" alt="cordova" title="cordova">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/6041269/20ed1196-ac7b-11e4-8707-68fa331f1aeb.png">
  </a>
  <br>
  <br>
  <a href="http://sass-lang.com/" target="_blank" alt="sass" title="sass">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410121/c330a3de-481e-11e5-8a69-ca0c56f6cabc.png">
  </a>
  <a href="http://karma-runner.github.io/" target="_blank" alt="karma" title="karma">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410216/44fef8fc-481f-11e5-8037-2f7f03678f4c.png">
  </a>
  <a href="http://jasmine.github.io/" target="_blank" alt="jasmine" title="jasmine">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410153/ebd46a00-481e-11e5-9864-f00fa8427d17.png">
  </a>
  <a href="https://angular.github.io/protractor/#/" target="_blank" alt="protractor" title="protractor">
    <img height="100" src="https://cloud.githubusercontent.com/assets/1370779/9410114/b99aaa9a-481e-11e5-8655-ebc1e324200d.png">
  </a>
</p>

We use (in the order of appearance):

- **Yeoman** to scaffold your app - http://yeoman.io/
- **Gulp** to run your tasks - http://gulpjs.com/
- **Bower** to manage your client packages - http://bower.io/

and provide the following **technology stack**:

- **Angular** for app structure & logic - https://angularjs.org/
  - **angular-ui-router** - https://github.com/angular-ui/ui-router
- **Ionic** for mobile UIs - http://ionicframework.com/
- **Cordova** and it's **CLI** for accessing phone APIs and building the app - http://cordova.apache.org/
  - **ngCordova** connecting Angular with Cordova http://ngcordova.com/
- **SASS** as the CSS preprocessor of choice - http://sass-lang.com/


an integrated **testing workflow** with:

- **Karma** to run your unit tests - http://karma-runner.github.io/
- **Jasmine** for writing unit & integration tests - http://jasmine.github.io/
- **Protractor** for running and writing integration tests - https://angular.github.io/protractor/#/

a professional **build, development** and **continuous delivery workflow**
- enabled through a powerful collection of **gulp tasks**

and many many **features and tools** for your convenience:

- fine tuned [integration with git](https://github.com/mwaylabs/generator-m-ionic#git-integration)
- broad selection of [sub-generators](https://github.com/mwaylabs/generator-m-ionic#sub-generators)
- sensible defaults for:
  - continuous integration with [Travis CI](https://travis-ci.org/) and [Jenkins CI](https://jenkins-ci.org/)
  - code style checks with [ESLint](http://eslint.org/)
  - configuration files like [.editorconfig](http://editorconfig.org/), [.gitignore](http://git-scm.com/docs/gitignore), [.gitattriubtes](http://git-scm.com/docs/gitattributes) and others


## Learn more
You can read more about **technology choices and ecosystem** and the **benefits of using Generator-M-Ionic** in our blog article [Generator-M-Ionic: HTML5 mobile app development evolved](http://blog.mwaysolutions.com/2015/09/10/generator-m-ionic-html5-mobile-app-development-evolved/) which was published in September 2015.

## Alternatives
There are two major alternatives out there which are similar to the generator in that they also enable HTML5 mobile app development with Ionic. The [Ionic CLI](http://ionicframework.com/getting-started/) and [generator-ionic](https://github.com/diegonetto/generator-ionic). Both of which didn't and to this point still don't suit our needs.

If you want to find out more about **the differences of these tools**, we recently published an article [Generator-M-Ionic and the search for the holy grail](http://blog.mwaysolutions.com/2015/09/21/generator-m-ionic-and-the-search-for-the-holy-grail/) on our company blog concerning that topic. Here's a brief excerpt:
>### Why not use something else?
The former alternative (Ionic CLI) is being developed by Ionic and is a great tool for beginners, but we got stuck on many occasion when we tried to integrate the CLI in our professional workflow. The latter (generator-ionic) was released by an open source member and it quickly grew immensely popular, however it [hasn't been maintained in over 5 months](https://github.com/diegonetto/generator-ionic/commits/master) (as of the writing of this article) and thus its dependencies are [heavily outdated](https://github.com/diegonetto/generator-ionic/blob/master/package.json#L30) and development came to a complete halt. Issues and pull requests are piling up, but nothing seems to happen.

>One of the reasons we started development of Generator-M in the first place was that we felt [Ionic CLI](http://ionicframework.com/getting-started/) was adding too much magic, effectively hiding the whole ecosystem behind a rainbowy cloud. Granted, this makes things easier to begin with, but also keeps you from taking your development to the next level once you mastered the basics. You'll depend on that rainbowy cloud which has limited capabilities. Don't get me wrong. The Ionic CLI is a powerful tool for beginners and thus definitely serves its purpose. It just doesn't meet our demands for professional software development.
