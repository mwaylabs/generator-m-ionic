# CORS & Proxying
>When you're working with external APIs while developing in your browser, chances are you'll be running into issues with CORS ([Cross-Origin Resource Sharing](http://www.html5rocks.com/en/tutorials/cors/)). The following will introduce some of the most viable options how to cope with CORS-related issues.

### What is CORS?
CORS is a W3C spec for cross-domain communication in the browser. To learn more about CORS either head over to the [HTML5 Rocks Tutorial](http://www.html5rocks.com/en/tutorials/cors/) or this [Ionic Blog article](http://blog.ionic.io/handling-cors-issues-in-ionic/).

If CORS is not correctly set up, your browser will throw errors like this one:
```
XMLHttpRequest cannot load https://echo.getpostman.com/get. The
'Access-Control-Allow-Origin' header contains the invalid value ''.
Origin 'http://localhost:3000' is therefore not allowed access.
```

### What to do?
When facing issues with CORS, we recommend to proceed in this order. There are more detailed explanations below this initial overview.

1. **Properly implement CORS** in the API.
 - Only possible if you are in charge of the API's development or have some way to provide feedback to the creators. If that's possible: do it and remove the problem at its root. The [HTML5 Rocks Tutorial](http://www.html5rocks.com/en/tutorials/cors/) on CORS is a good starting point if you want to implement it in its intended form.
2. **Bypass CORS**, choosing one of the following options:
  - **CORS plugin** [[How?](#cors-plugin)]. Like [this one](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).
    - PRO: quick setup
    - PRO: can disable CORS for multiple endpoints
    - CON: we had some issues with advanced features of CORS, like custom headers, that we couldn't resolve
  - **Built-in proxy feature** [[How?](#built-in-proxy)] of the generator.
    - PRO: completely get around CORS
    - CON: can proxy only one endpoint
    - CON: requires code changes (replace the endpoint with an URL pointing to the proxy, what you might forget when building/deploying)
  - **Disable CORS in Chrome** [[How?](#disable-cors-in-chrome)]
    - PRO: completely get around CORS for all endpoints
    - CON: need to start Chrome from the command line
    - CON: insecure browsing in that instance of Chrome

### CORS plugin
1. Head over the the [plugin page](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) and **install** it.
2. **Remove** the wild-card pattern `*://*/*` for safe and error-free browsing on other sites.
3. **Add** your API endpoints as a pattern: e.g. `https://echo.getpostman.com/**/*`.
4. **Enable** the plugin.

![image](https://cloud.githubusercontent.com/assets/1370779/13707912/42b0238c-e7ac-11e5-895b-4d5ef4e1d8e5.png)

### Built-in proxy
When you freshly generate a module using the generator, there will be a `Test Proxy` button on the debug page that can be found at `http://localhost:3000/#/main/debug`.

![image](https://cloud.githubusercontent.com/assets/1370779/13710336/34f4ca38-e7b9-11e5-900f-4340051f8a03.png)


As you can see in the `debug-ctrl.js`, the `DebugCtrl` issues a request to this URL when the button is tapped.
```js
this.proxyRequestUrl = Config.ENV.SOME_OTHER_URL + '/get';
```
Depending on the [environment](./environments.md) that is used this will result in either of the two URLs.
```
[GET] http://localhost:3000/proxy/get => for the dev environment (default)
[GET] https://echo.getpostman.com/get => for the prod environment
```
The latter is the actual end point. If you try it with the following watch command you'll get an error on tapping the button:
```sh
gulp watch --no-open --env=prod # load prod environment
```
```
XMLHttpRequest cannot load https://echo.getpostman.com/get. The
'Access-Control-Allow-Origin' header contains the invalid value ''.
Origin 'http://localhost:3000' is therefore not allowed access.
```
And when you run this watch command which defaults to the dev environment, the button click still gives an error:
```sh
gulp watch --no-open # defaults to dev environment
```
```
GET http://localhost:3000/proxy/get 404 (Not Found)
```
Of course, because you have to **configure and start the proxy** first. This is done like this:
```sh
gulp watch --no-open --proxyPath="/proxy" --proxyMapTo="https://echo.getpostman.com"
# this proxies all requests of the pattern
# /proxy/**/* => https://echo.getpostman.com/**/*
```
That's it. That simple. Additionally you might set the proxy as a default for your watch task using [gulp defaults](./gulp_defaults.md), so you don't have to type the URLs every time you start the watch task.
```sh
gulp defaults --set='watch --proxyPath="/proxy" --proxyMapTo="https://echo.getpostman.com"'
```



### Disable CORS in Chrome
If all else fails it's still possible to start Chrome with disabled CORS. **Important:** browsing in that instance is not secure! In order to start Chrome without CORS you need to start it from the terminal with `--disable-web-security` and `--user-data-dir`. More info on this in this [stackoverflow question](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome).

If you're using this a lot it's probably useful to **alias** the paths to Chrome or Canary in you `.bash_profile`:
```sh
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
alias canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
```
Then you can just type:
```sh
canary --disable-web-security --user-data-dir="$HOME/Library/Application Support/Google/Chrome Canary/"
```
You could also alias the whole thing.

The `--user-data-dir` is required in newer versions of Chrome when `--disable-web-security` is used. If you want to keep all your user data when launching with web security disabled just point that argument to the location of your user profile as I did above.
