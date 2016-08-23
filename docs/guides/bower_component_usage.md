# Bower component usage
> Find out how we use some of our recommended bower components

## localForage
We recommend using [mozilla/localForage](https://github.com/mozilla/localForage) as a persistence layer for your Ionic apps. There is a separate bower component called [angular-localForage](https://github.com/ocombe/angular-localForage) which provides localForage as an angular service `$localForage` which can be obtained using angular' dependency injection. However we recently started using plain localForage, since it already has a great API that doesn't need any wrapping.

When you want to install `localforage` after you've set up your project, run:
```sh
bower install localforage --save
```
To tell ESLint that `localforage` is a safe global modify your `app/.eslintrc` file accordingly and add `localforage` as an available global variable. If you choose `localforage` during project setup, this will be done for you.

```json
"globals": {
  "angular": true,
  "ionic": true,
  "localforage": true
}
```
`gulp watch` then notices the `localforage` bower package and injects the source file into your `index.html`:
```html
<script src="bower_components/localforage/dist/localforage.js"></script>
```
And then you can use it right away. Since localForage already has an [ES6 Promises API](http://mozilla.github.io/localForage/):

```js
localforage.setItem('key', 'value').then(doSomethingElse);
```

You can simply use it inside angular by transforming it into an [angular 1.x promise](https://docs.angularjs.org/api/ng/service/$q) using `$q.when()`.

```js
$q.when(localforage.setItem('key', 'value'))
  .then(doSomethingElse);
```
