# Bower Component Usage
> Find out how we use some of our recommended bower components

## localForage
We recommend using [mozilla/localForage](https://github.com/mozilla/localForage) as a persistence layer for your Ionic apps. There is a separate bower component called [angular-localForage](https://github.com/ocombe/angular-localForage) which provides localForage as an angular service `$localForage` which can be obtained using angular' dependency injection. However we recently started using plain localForage, since it already has a great API that doesn't need any wrapping.

When you select `localforage` during the generation of your project, the generator will create your `app/.eslintrc` file accordingly and add `localforage` as an available global variable:

```json
"globals": {
  "angular": true,
  "ionic": true,
  "localforage": true
}
```
Since localForage already has an [ES6 Promises API](http://mozilla.github.io/localForage/):

```js
localforage.setItem('key', 'value').then(doSomethingElse);
```

You can simply use it by transforming it into an [angular 1.x promise](https://docs.angularjs.org/api/ng/service/$q) using `$q.when()` and use it in the angular context.

```js
$q.when(localforage.setItem('key', 'value'))
  .then(doSomethingElse);
```
