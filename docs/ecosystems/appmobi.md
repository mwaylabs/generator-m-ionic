# Appmobi
> [Appmobi](https://appmobi.com/) is a Mobile Security as a Service (MSaaS) solution which can be integrated into the generator using the [Appmobi Cordova Plugin](https://github.com/appMobiGithub/cordova-plugin-appmobi).

## Prepare

1. You need an **Appmobi Account**. If you don't have one: [register here](https://cloud.appmobi.com/UI/PublicCloudRegister.html)!
2. [Sign into](https://cloud.appmobi.com/UI/login.html) your account and **create an app**
3. Have your **app details** ready, e.g.:
  - `APP_NAME: 0f50dcbf-5c79-41ee-b038-330de3ee07a7.MyApp`
  - `PROJECT_ID: 5bus7arx`
  - `CONFIG_URL: https://cloud.appmobi.com`

## Integrate
When you run `yo m-ionic` you'll be asked if you want to integrate appmobi into your app. Simply select it and you'll be guided through the process.

![image](https://cloud.githubusercontent.com/assets/1370779/13854363/604d502c-ec6b-11e5-9aab-90ee1986726d.png)

Additionally you can run the Appmobi sub-generator at any time in your project:
```
yo m-ionic:appmobi
```
![image](https://cloud.githubusercontent.com/assets/1370779/13854272/ef6b8194-ec6a-11e5-8587-60c0dc07060a.png)

And **that's it!**

---

Integration is done using the [Appmobi Cordova Plugin](https://github.com/appMobiGithub/cordova-plugin-appmobi) and is the equivalent of running:
```sh
gulp --cordova 'plugin add https://github.com/appMobiGithub/cordova-plugin-appmobi.git
--save
--variable APP_NAME="0f50dcbf-5c79-41ee-b038-330de3ee07a7.MyApp"
--variable PROJECT_ID="5bus7arx"
--variable CONFIG_URL="https://cloud.appmobi.com"'
```

For more information on how to run Generator-M-Ionic's Cordova CLI wrapper consult the generator's [Development Introduction](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/start/development_intro.md).
## Remove
To remove Appmobi integration simply remove the plugin:
```sh
gulp --cordova 'plugin rm cordova-plugin-appmobi --save'
```
