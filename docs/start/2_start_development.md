# Start Development

## In the browser
```sh
gulp watch
```
Prepares everything for development and opens your default browser. Livereloads your application when changing/adding/deleting files to immediately reflect the changes you make. For your convenience any occurring **ESLint or jsonlint errors** will be presented to you on every livereload.

```sh
gulp watch --no-open
```
If you don't want this task to open your browser, just add the `--no-open` option and navigate to `http://localhost:9000` yourself.

## On the device
The [Cordova CLI](https://cordova.apache.org/docs/en/dev/guide/cli/index.html) gets installed locally with the generation of your app.
