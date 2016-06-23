# Husky hooks
> You can configure your project to run linting and tests prior for certain git actions with [husky](https://github.com/typicode/husky). That way you can ensure your quality checks pass before you, for instance, commit or push.

## Setup
... is done quickly.

Make sure your project already has a [Git](https://git-scm.com/) repository. Otherwise just create one with:
```sh
git init
```

Install [husky](https://github.com/typicode/husky) using npm and save it as a dev-dependency:
```sh
npm install husky --save-dev
```
Add a `scripts` property to your `package.json` for all the [hooks](https://github.com/typicode/husky/blob/master/HOOKS.md) you want:
```js
{
  "scripts": {
    "precommit": "gulp linting-throw",
    "prepush": "gulp linting-throw && gulp karma && gulp protractor",
  }
}
```
The above example will run ESLint and JSONLint checks when you `git commit` and additionally Karma tests when you `git push`.

## Additional information on gulp tasks
#### gulp linting-throw
The `gulp linting-throw` task will run linting checks and *throw* an error on failed checks. The `gulp linting` on the other hand will perform checks, report errors on the command line but not throw an error. Thus it would successfully pass the hook even when there's linting issues.
