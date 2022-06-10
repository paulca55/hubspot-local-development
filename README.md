# HubSpot Local Development Boilerplate

![version](https://img.shields.io/badge/version-1.0.0-blue)

_**Disclaimer**: This is not an official HubSpot project and is in no way affiliated with HubSpot._

_**Note**: This project has only been tested on MacOS._

## Purpose

The purpose of this project is to allow developers to work completely within their favourite code editor when working with HubSpot websites, modules and themes, thus improving the developer experience.

Features include:

- JavaScript bundler to allow using ES Modules and modern JavaScript in your source code - _(global JavaScript only, modules are not supported)_.
- Sass compiler - _SCSS syntax_.
- CSS and JS code linting and formatting - _(using ESLint, Prettier and Stylelint)_.
- Deploy files to HubSpot via the command line _(using [HubSpot Local Development Tools](https://designers.hubspot.com/docs/tools/local-development))_.

## Prerequisites

- [Node.js](https://nodejs.org) must be installed on your computer - _please note only Node `v14.17.2` has been tested_.

## Getting Started

### Setting up HubSpot Local Development Tools

_**Note**: Some of the instructions below were taken from the HubSpot Developer Docs, you can refer to the [HubSpot Local Development Tools documentation](https://designers.hubspot.com/docs/tools/local-development) for more information_.

#### Installing the HubSpot CLI

As part of the project's `package.json` the HubSpot CLI npm package will be installed into the project's developer dependencies, so you don't need to install this yourself.

#### Set up your configuration file

Using the command line, navigate to the root directory of the project and run `npx hs init`. This command will walk you through the following steps.

1. Firstly, you’ll be guided to create a personal CMS access key to enable authenticated access to your account via the local development tools. You’ll be prompted to press `Enter` when you’re ready to open the **Personal CMS Access Key** page in your default browser. This page will allow you to view or generate your personal access key, if necessary. Copy your access key and paste it in the terminal.
2. Next, you’ll enter a name for the account, this name is only seen and used by you. For example, you might use `sandbox` if you're using a developer sandbox or `production` if you’re using a full customer account. This name can't contain spaces and will be used when running commands (e.g. `npx hs upload --account=<name> <src> <dest>`).

Once you've completed these steps, you'll see a success message confirming that a configuration file, `hubspot.config.yml`, has been created in your current directory.

_**Note**: The `hubspot.config.yml` file supports multiple portal entries. The easiest way to add more portals after you already have a `hubspot.config.yml` file is to use `npx hs auth`._

_**Note**: You can add `defaultPortal: <account_name>` the `hubspot.config.yml` file to set which account you'd like to be the default. This allows you to exclude the `--account=` option from your commands, so commands will reference that default portal. I recommend that you set the default portal to be your developer sandbox because any changes to the `src` folder will be automatically uploaded as you develop. Then you can manually upload to the full customer account via the HubSpot CLI when you are ready, giving you more fine grained control of what gets uploaded to the production/live account._

_**Note**: The `hubspot.config.yml` file has been added to the `.gitignore` file so that it won't be added to your git repo to help keep your Personal Access Keys safe._

### Initial setup

1. Run `npm install` from the project root directory.
2. Set up your CSS (SCSS), JS, images, HubSpot Templates and HubSpot Modules for your project in the `src` folder inside the respective `css`, `js`, `images`, `templates` and `modules` folders. The following folders and files must exist in your `src` folder, otherwise the build tools may fail.

   ```
   src/js-modules/scripts.js
   ```

3. If you are building a HubSpot theme you will need to use the `fields.json` and `theme.json` files in the `src` folder. It's also recommended to have all your theme overrides in the `theme-overrides.scss` which is located in the `src/css` folder.
4. Run `npm run build` to transpile/combine your source JS/SCSS files to their production ready versions.

### Watching your files for changes

1. Run `npm start` to watch/listen for CSS/JS file changes:

   - Changes to files in the `src` folder will automatically be uploaded to your **default HubSpot portal** into a folder called `website` by default.

   _**Note**: If you want to change the default portal destination folder of `website`, you can edit the `package.json` variable `portalFolder` (see below for example)._

   ```
     "config": {
       "portalFolder": "website"
     }
   ```

_**Note**: Files which are not unsupported by HubSpot won't be uploaded (e.g. *.scss files aren't supported so you are only left with the *.css files on HubSpot)._

### Working with source files

#### HubSpot HTML templates

HubSpot HTML templates are located in the `src/templates` folder. You can create subfolders as required to organise your templates (e.g. `src/templates/partials`).

#### HubSpot Modules

HubSpot Modules are located in the `src/modules` folder.

#### Using CSS (SCSS)

##### Global CSS

SCSS partials (e.g. `_base.scss`) inside of `src/css` will be transpiled to the global `src/css/styles.css` file (as long as they have been imported properly). SCSS files that aren't prefixed with an underscore (e.g. `blog.scss`) will have a separate CSS file created in the same folder (e.g. `blog.css`).

##### CSS in HubSpot Modules

In each HubSpot module folder you will need to create a `module.scss` file where you'll write your CSS (SCSS) for that module. A `module.css` file will then automatically be created if you are already watching files for changes, or when you run the build command.

##### Using `@use` instead of `@import`

Using `@import` to import Sass variables, functions and mixins makes them globally accessible and can cause issues and the [Sass team discourages this usage](https://sass-lang.com/documentation/at-rules/import).

You can now use the `@use` command in your SCSS files which address those issues.

`src/css/abstracts/_variables.scss` file

```scss
$primary-color: 'bada55';
```

`src/modules/module/_module.scss` file

```scss
@use '../../css/abstracts/variables' as vars;

.module {
  background-color: vars.$primary-color;
}
```

Using the relative path above can be a bit of a pain, so if you look in the `package.json` file for the `scss` npm script, there is a flag in the command called `-load-path=src/css/abstracts`. This path is where Sass will look for the files you are specifiying in the `@use`, which means you don't need the full relative path.

`src/modules/module/_module.scss` file

```scss
@use 'variables' as vars;

.module {
  background-color: vars.$primary-color;
}
```

#### Using JavaScript

##### Global JS

The `js-modules/scripts.js` file (and any imported ES Modules) will be bundled and transpiled to older JavaScript code in the global `src/js/scripts.js` file.

##### JS in HubSpot Modules

In each HubSpot module folder you will find a `module.js` file where you'll write your JavaScript for that module.

_**Note**: The `module.js` file doesn't currently support transpiling to older JavaScript code, so the code you write is what gets ran in the browser._

_**Note**: The `module.js` file doesn't currently support ES Module bundling using this tool._

## Manually uploading files to HubSpot

You can manually upload your files via the HubSpot CLI tool (i.e. `npx hs upload --portal=<account_name> <src> <dest>`), see below for instructions.

_**Note**: If you set a top-level `defaultPortal` in your `hubspot.config.yml` file, you can exclude the `--portal` flag and your commands will reference the default portal you specified._

_**Note**: Any folder or file you do not wish be uploaded can be specified in the `.hsignore` file._

### Uploading all your production files

The following command will upload all the folders/files from **inside** the `src` folder to a folder in HubSpot called `website`. If the destination folder doesn't already exist it will be created.

```
npx hs upload --portal=<account_name> src website
```

### Uploading a single production file

The following command will upload the specified file to the specified destination. If the file already exists it will be overwritten.

```
npx hs upload --portal=<account_name> src/css/styles.css website/css/styles.css
```

### Upload modes

Files are uploaded to HubSpot as **published** by default, to change this to **draft** you need to add the `--mode=draft` flag.

##### Example 1

```
npx hs upload --portal=<account_name> --mode=draft src website
```

##### Example 2

```
npx hs upload --portal=<account_name> --mode=draft src/css/styles.css website/css/styles.css
```

### Uploading local images to the HubSpot File Manager

You can upload your local images files to the File Manager via the HubSpot CLI tool (i.e. `npx hs filemanager upload <src> <dest>`).

The example below will upload all images from the `src/images` folder and upload them to a folder in the File Manager called `website`.

```
npx hs filemanager upload --portal=<account_name> src/images website
```
