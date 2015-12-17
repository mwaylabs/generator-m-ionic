## Why we build the generator
Building enterprise mobile apps can be a challenge. The generator helps **developing faster and more reliably** by improving efficiency, quality, standardisation, structure, project hand-overs, scalability and other attributes of our projects. In this we try to be **purpose-agnostic** (building enterprise mobile apps quickly and reliably!) not technology-agnostic (not about always using the latest tech!). This project is not a playground for new features, tweaks and ideas, much rather it should be the accumulation of **well established patterns and recipes** that help to build apps quickly and reliably.

### Use for
- projects
- workshops
- prototyping


## Other goals

### Manifest knowledge in code
- enforce standards, best practices, knowledge, experience, ideas, bug-fixes, ...
  - e.g. solve problems once and not on a per project basis

### Share knowledge
- leverage know-how across the team and the open source community to gain new contributors

### Gain knowledge
- develop knowledge to make ourselves valuable contributors to components we use: cordova, ionic, etc.

### Keep it simple and keep it clean
keep everything as simple as possible to minimise maintenance and maximise stability. This means for now we will not include changes that solve project specific problems or any features that are only needed in rare cases. We need to keep our code base simple, clean and adherent to our mission statement in order to increase stability and keep maintenance as low as possible. In the past we ran into issues with minor features that ended up costing us a lot of time. Thus:

- no unnecessary functionality (e.g #98)
- think about maintenance & impact before adding features (e.g #90, #80, #75) especially when it's hard to automate tests (gulp tasks for instance)

### Clean github project
- proper changelogs, roadmaps, versioning, labels
  - e.g. ratchet releases - https://github.com/twbs/ratchet/releases
  - e.g. yeoman generator releases - https://github.com/yeoman/generator/releases
  - e.g. yeoman generator labels - https://github.com/yeoman/generator/labels
- well defined contribution
  - https://github.com/mozilla/localForage/blob/master/CONTRIBUTING.md
  - https://github.com/yeoman/yeoman/blob/master/contributing.md

## Inspiration
- generator-gulp-angular - https://github.com/Swiip/generator-gulp-angular
- generator-gulp-webapp – https://github.com/yeoman/generator-gulp-webapp
- generator-angular - https://github.com/yeoman/generator-angular
- generator-node-gulp -https://github.com/youngmountain/generator-node-gulp
