# Guideline to opening issues
Although we do a lot of testing on our core features, we depend on the community to test it on different machines, environments and possibly in ways we haven't thought of.

## What's your need?
If you want to open an issue your need will fall into one of those three categories:
- You have an **idea, how things could be better** and possibly want to **contribute code**? - Head over to our [Contribution Guide](https://github.com/mwaylabs/generator-m-ionic/tree/master/docs/contribute/contribution_guide.md).
- You have an **issue with one of the features** and it doesn't work the way you thought it would? - Keep reading this document!
- Something completely different? - [Open an issue](https://github.com/mwaylabs/generator-m-ionic/issues/new) and let's get talking.

## Something's not working right!
There's many things that can go wrong, so in order to help you effectively and efficiently, take the following steps to rule out the most common problems.

#### Rule out npm/bower issues
Sometimes with the installation of the npm and bower packages just something goes wrong. We've had many cases where we were frantically looking for why things weren't working and then it was just some random error with the installed packages or npm or bower cache.
```sh
# delete node_modules and app/bower_components folder
rm -rf node_modules
rm -rf app/bower_components

# clear the caches
npm cache clean
bower cache clean

# install everything and pay attention to errors!!!
npm install
bower install
```
No errors during installation?
- No errors! - Good, proceed reading.
- Errors! - You've run into an issue with npm or bower. Start googling and look for similar problems.

#### Still not working
We'll need the following from you:

- **Detailed description**
  - how did you set up your Generator-M-Ionic project, which options did you choose?
  - what changes did you introduce after setup?
  - what you are trying to do and what's going wrong?
  - which commands are you running, what errors do they produce?
  - what measures have you taken to fix it yourself and what was the result?
- Provide a **demo repository** on Github that we can clone!
- Which **Operating System** are you using and which **version**?
- Details about your **node environment**:

```sh
# post the result of the following commands
node -v # node version
npm -v # npm version
npm list -g generator-m-ionic # generator version
gulp --cordova ' -v' # local Cordova CLI version, mind the space in ' -v'
```

The more information you provide right from the start, the better we can help you!

Thank you for reading :) - You're now ready to
[open a new issue](https://github.com/mwaylabs/generator-m-ionic/issues/new)!
