# ESLint

## Running ESLint in your editor
When you run `gulp watch`, `gulp build` or any build or test related task, you'll notice that ESLint checks are run. This comes in very handy and contributes to your code quality and consistency. However it would be much easier to not even let those errors occur in the first place.

> This guide explains how you set up your editor to perform [ESLint](http://eslint.org/) checks in your editor as you code.

Here are the installation instructions for the plugins you need:
- Sublime - https://github.com/roadhump/SublimeLinter-eslint
- Atom - https://atom.io/packages/linter-eslint
- Webstorm - https://www.jetbrains.com/webstorm/help/using-javascript-code-quality-tools.html#d228115e577

**HINTS**:  
- Generator-M provides a local version of ESLint for you. So you **don't need to install eslint** (neither globally nor locally).
- For Atom and Sublime both plugins require to have a **parent linting plugin** installed.
- It may be necessary that you **disable any other style-checking plugin** like jscs or jshint while working with ESLint.

## Configuring ESLint to suit your needs
You may not be happy with some of the choices we made regarding code styles and linting. If that's the case, you are free to make any changes to the `.eslintrc` files throughout your project.

Here are some good places to start figuring out your own configuration:
- All the **rules** that are built-in and ship with ESLint - http://eslint.org/docs/rules/
- Configuring ESLint - http://eslint.org/docs/user-guide/configuring.html
  - [Environments](http://eslint.org/docs/user-guide/configuring.html#specifying-environments) (like browser, node, ...)
  - [Globals](http://eslint.org/docs/user-guide/configuring.html#specifying-environments) if environments don't suffice
  - [Rules](http://eslint.org/docs/user-guide/configuring.html#configuring-rules), how they are configured.
  - [Extending](http://eslint.org/docs/user-guide/configuring.html#extending-configuration-files) other configuration files
