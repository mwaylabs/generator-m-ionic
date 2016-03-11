# CORS & Proxying
>When you're working with external APIs while developing in your browser chances are you'll be running into issues with CORS ([Cross-Origin Resource Sharing](http://www.html5rocks.com/en/tutorials/cors/)). The following will introduce some of the most viable options how to cope with CORS-related issues.

### What is CORS?
CORS is a W3C spec for cross-domain communication in the browser. To learn more about CORS either head over to the [HTML5 Rocks Tutorial](http://www.html5rocks.com/en/tutorials/cors/) or this [Ionic Blog article](http://blog.ionic.io/handling-cors-issues-in-ionic/).

If CORS is not correctly set up, your browser will throw errors like this one:
```
XMLHttpRequest cannot load https://echo.getpostman.com/get. The 'Access-Control-Allow-Origin' header contains the invalid value ''. Origin 'http://localhost:3000' is therefore not allowed access.
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
    - PRO: quick setup
    - PRO: completely get around CORS
    - CON: can proxy only one endpoint
    - CON: requires code changes (replace the endpoint with an URL pointing to the proxy, what you might forget when building/deploying)
  - **Disable CORS in Chrome** [[How?](#disable-cors-in-chrome)]
    - PRO: quick setup
    - PRO: completely get around CORS for all endpoints
    - CON: need to start Chrome from the command line
    - CON: insecure browsing in that instance of Chrome

### CORS plugin
1. Head over the the [plugin page](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) and install
2. remove the wild-card URL pattern `*://*/*` for safe and error-free browsing on other sites
3. add your API endpoints as a pattern: e.g. `https://echo.getpostman.com/**/*`
4. enable the plugin   

![image](https://cloud.githubusercontent.com/assets/1370779/13707912/42b0238c-e7ac-11e5-895b-4d5ef4e1d8e5.png)

### Built-in proxy
When you freshly generate a module using the generator, there will be a `Test Proxy` button on the debug page that can be found at `http://localhost:3000/#/main/debug`.

As you can see in the `debug-ctrl.js`

### Disable CORS in Chrome
If all else fails it's still possible to start Chrome with disabled CORS. **Important:** browsing in that instance is not secure! In order to start Chrome without CORS you need to start it from the terminal with `--disable-web-security` and `--user-data-dir`. More info on this in this [stackoverflow question](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome).

If you're using this a lot it's probably useful to **alias** the paths to Chrome or Canary in you `.bash_profile`:
```sh
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
alias canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
```
The it'll be easier to just type:
```sh
canary --disable-web-security --user-data-dir="$HOME/Library/Application Support/Google/Chrome Canary/"
```
You could also alias the whole thing.

The `--user-data-dir` is required in newer versions of Chrome when `--disable-web-security` is used. If you want to keep all your user data when launching with web security disabled just point that argument to the location of your user profile as I did above.
