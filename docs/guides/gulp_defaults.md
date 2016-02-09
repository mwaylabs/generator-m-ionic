# gulp defaults
>Define default flags for each gulp task to spare you some tedious typing. Choose to share with your team or allow everyone to have their own.

You may have noticed that the Generator-M-Ionic supplies an extended amount of gulp tasks and flags to modify the behavior of these tasks. Depending on your project specifics you may find yourself always typing the same flags for the same tasks over and over again. With the `gulp defaults` task you can spare yourself some typing. Here's how it works:

For instance we use `gulp watch --no-open` a lot.

## Setting a Default
Running the following command will create a new `gulp/.gulp_settings.json` file and save your default flags in it. **Note**: the `.gulp_settings.json` file will be ignored by git, so these settings are only applied locally to your machine. If you want these settings to be part of the repository and share it with your team, simply remove the according line from the `.gitignore` and add `.gulp_setting.json` to your commit.

```sh
gulp defaults --set='watch --no-open'
```

What if you still want use a different set of flags from time to time? No worries, we though of that too!
You can add any amount of **additional command line flags**, they will be merged with your defaults. In the next example `gulp watch` will run with both the `--env-prod` from the command line *and* the `--no-open` flag from your defaults.

```sh
gulp watch --env=prod ## the --no-open flag will be merged
```

You can also **overwrite** your task's defaults by explicitly setting the flag to a different value. The value that is explicitly set, will always win:

```sh
gulp watch --open # will run with --open despite defaults
```

## Clearing a Default
If one of the defaults is no longer required, running the following command will get rid of it:

```sh
gulp defaults --clear=watch
```

## Printing all Defaults
By running `gulp defaults` without a 'set' or 'clear' flag, a comprehensive list of all the defaults that are defined in the `.gulp_settings.json` is shown.

```sh
gulp defaults
```
