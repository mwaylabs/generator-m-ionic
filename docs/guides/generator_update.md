# Generator Update (experimental)

> **This feature is highly experimental!**  
> We're exploring ways that can make upgrading your project to a new version of the generator easier. We're very happy to get feedback from you, but please be careful with what you are doing. The full discussion with many different ideas on how to achieve an update can be found in [this issue](https://github.com/mwaylabs/generator-m-ionic/issues/158).


## Considerations
When you are trying to upgrade your project there's many things to consider that stem from a complex technology stack, how you work on your project, whether and how you use git and many other factors. So depending on these topics there might be better ways of how to perform an update. Please feel free to explore them and share them with us.

Additional considerations that play a role on how easy an update is:
- What version are you **upgrading from** (that's the version of the generator you used when you called `yo m-ionic` for your project the first time)?
- Which version are you **upgrading to** (most likely the latest one)
- **What changes** were introduced to the generator in between those two versions?
  - only gulp file update, new features and subgenerators?
  - or possibly larger, less isolated changes that affect many aspects of the generator?
- Did you change any of the **generator's core files** after project setup or just add new stuff?
  - gulp tasks, config files like `.eslintrc` and the `index.html` would be core files for instance. Basically everything that is generated on the first run of `yo m-ionic`

## Additional/alternative measures
- Consulting the [Changelog](https://github.com/mwaylabs/generator-m-ionic/releases) and the changes between the two version in the [generator repository](https://github.com/mwaylabs/generator-m-ionic-demo/compare/1.6.0...1.7.0) and especially the [demo repository](https://github.com/mwaylabs/generator-m-ionic/compare/1.6.0...1.7.0) **can be enormously helpful**.
- You might want to simply create a new project with `yo m-ionic` and piece by piece copy your stuff


## Current implementation

#### Versions <1.8.0
If you're upgrading from an version of the generator that is smaller than 1.8.0. You'll need to do two things:
```sh
# install yeoman-test as a devDependency (in your project folder)
npm i yeoman-test --save-dev
```
And save the following [gulp file](https://github.com/mwaylabs/generator-m-ionic/blob/dev/generators/app/templates/gulp/update.js) as `gulp/update.js` in your project.

#### Perform experimental update
First of all we recommend switching to a new git branch (just to be sure).
```sh
git checkout -b update
```
Before you perform the next step.

**Read this carefully.** This will do the following:
- temporarily install the new generator version locally
- take the contents of your `.yo-rc.json` (the choices you made when running `yo m-ionic` to set up your project)
- pass these answers into the new generator version
- run the generator on top of your current project
- **overwrite all files** that the generator generated in the first place with the new ones
- thus very very likely **break your code**

=> **It's up to you** to make sense of these changes and differentiate between changes we made and possible changes you made, and reapply them when necessary.

**This will not**:
- delete any files that became obsolete with the new version (doesn't happen often)
- take into consideration any of the changes you made to the core files (how would we know?). They will be overwritten.
- manipulate any other files, and magically make your code work
- re-run any sub-generators you used

There's still some things that could go wrong:
- your `.yo-rc.json` is missing some answers (because they weren't available when you set up the project). To remedy this, just add the desired values for those answers.

**If you are lucky** and additionally:
- the version you're updating form is not too old
- you didn't drastically change any of the generator's core files
- you're smart, used git properly, know your project and all that
- then ...

... updating might be very simple.

No promises!

Then, **after careful consideration** of all of this, run:
```sh
# update to version 1.8.0
gulp experimental-update --to=1.8.0
# wait
git diff
```

Good luck and please **give some feedback** in [this issue](https://github.com/mwaylabs/generator-m-ionic/issues/158)!
