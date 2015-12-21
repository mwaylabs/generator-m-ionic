# Developing on Windows
The generator should work just like on unix/mac except there's one difference, when running `gulp --cordova` tasks. They need double quotes. So write this:
```sh
gulp --cordova "run android" # will work on windows
```
instead of this:
```sh
gulp --cordova 'run android' # won't work on windows
```
## Common issues
There are some common issues on windows which are unfortunately out of the scope of this project. However you can check out the [issues tagged with 'windows'](https://github.com/mwaylabs/generator-m-ionic/labels/generator%20-%20windows).

For instance:
- `gulp watch` crashes with `Error: watch EPERM` when running `gulp build` in another cmd. This seems to be a common problem with windows. See this [issue](https://github.com/mwaylabs/generator-m/issues/156) for more information.
