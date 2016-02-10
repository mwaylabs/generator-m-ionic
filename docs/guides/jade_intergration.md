# JADE integration
> [JADE](http://jade-lang.com/) is tightly integrated into the Generator-M-Ionic's workflow. Learn how to use it to your advantage!

With the creation of every module comes a set of sample `.jade` files in the module's `templates` folder.

Every modules's `.jade` file gets compiled by the `gulp jade` task which is run automatically by `gulp watch`, `gulp build` or any of the sort. The compiled `.html` files then get copied into your cordova `www`.
