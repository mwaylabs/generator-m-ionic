# HTML or JADE
[Jade vs HTML: Why it matters](http://vstark.net/2014/10/18/jade-vs-html/) A nice article that explains reasons why to choose Jade over HTML.

# Usefull links
[Jade Chrome's extension](https://chrome.google.com/webstore/detail/copy-html-in-jade/ooimannacmnfehchhnahaaglimfjfedo) allows you to copy and paste from HTML to Jade.

[HTML 2 Jade](http://html2jade.org/) Converts any HTML to Jade

# JADE integration
> [JADE](http://jade-lang.com/) is tightly integrated into the Generator-M-Ionic's workflow. Learn how to use it to your advantage!

With the creation of every module comes a set of sample `.jade` files in the module's `templates` folder.

Every modules's `.jade` file gets compiled by the `gulp jade` task which is run automatically by `gulp watch`, `gulp build` or any of the sort. The compiled `.html` files then get copied into your cordova `www`.
