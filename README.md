# HubSpot Local Development Boilerplate

_**Disclaimer**: This is not an official HubSpot project and is in no way affiliated with HubSpot._

![version](https://img.shields.io/badge/version-0.1.0-blue)

## Purpose

The purpose of this project is to make life easier to work with Sass (SCSS) and modern JavaScript when building websites with HubSpot while also utilising the HubSpot CLI. This also includes being able to use SCSS and modern JS inside of HubSpot Modules.

Features include:

- Sass compiler _(SCSS syntax)_.
- JS compiler _(using Babel)_.
- JS bundler _(using Parcel)_.
- CSS and JS code minification.
- CSS Autoprefixer.
- HTML minification.
- Image optimisation.
- CSS and JS code linting and formatting _(using ESLint, Prettier and Stylelint)_.
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

_**Note**: You can add `defaultPortal: <account_name>` the `hubspot.config.yml` file to set which account you'd like to be the default. This allows you to exclude the `--account=` option from your commands, so commands will reference that default portal. I recommend that you set the default portal to be your developer sandbox because any changes to the `dist` folder will be automatically uploaded as you develop. Then you can manually upload to the full customer account via the HubSpot CLI when you are ready, giving you more fine grained control of what gets uploaded to the production/live account._

_**Note**: The `hubspot.config.yml` file has been added to the `.gitignore` file so that it won't be added to your git repo to help keep your Personal Access Keys safe._

### Initial setup

1. Run `npm install` from the project root directory.
2. Set up your Sass (SCSS syntax), JS, images, HubSpot Templates and HubSpot Modules for your project in the `src` folder inside the respective `scss`, `js` and `images` folders. The following folders and files must exist in your `src` folder, otherwise the build tools may fail.

   ```
   src/scss/styles.scss
   src/js/scripts.js
   src/images
   src/modules
   src/templates
   ```

3. Run `npm run build` to build all of your production ready files to the `dist` folder.

### Watching your files for changes

1. Run `npm start` to watch/listen for file changes:

   - Changes to source files (`src` folder) will automatically be transpiled/minified/optimised to the `dist` folder.
   - Changes to files in the `dist` folder will automatically be uploaded to your **default HubSpot portal** into a folder called `website` by default.

   _**Note**: If you want to change the default portal destination folder of `website`, you can edit the `package.json` variable `portalFolder` (see below for example)._

   ```
     "config": {
       "portalFolder": "website"
     }
   ```

_**Note**: Files which are not unsupported by HubSpot won't be uploaded._

### Working with source files

All of the source files will be worked on from the `src` folder.

#### HubSpot HTML templates

HubSpot HTML templates are located in the `src/templates` folder and will be automatically minified to the `dist/templates` folder. You can create subfolders as required to organise your templates (e.g. `src/templates/partials`).

#### HubSpot Modules

HubSpot Modules are located in the `src/modules` folder and all standard module files (i.e. `module.html`, `field.json`, etc.) will be automatically transpiled/minified/optimised to the `dist/modules` folder.

#### <a name="using-sass"></a>Using Sass (SCSS syntax)

- Any `.scss` files added to the `src/scss` folder will be transpiled to separate CSS files in the `dist/css` folder. Use SCSS partials if you want all `.scss` file into one `.css` file.
- The `module.scss` file in your HubSpot module folder will be transpiled to a `module.css` file in the `dist` folder.
- SCSS files can be loaded into other SCSS files using `@use` (recommended) or `@import` (not recommended). To make this easier (especially in HubSpot Modules) you can define '[Load Paths](https://sass-lang.com/documentation/at-rules/use#load-paths)' that Sass will look in when locating modules. For example, if you had a variables SCSS partial at `src/scss/abstracts/_variables.scss` you can specify`src/scss/abstracts` as a load path will allow you to use `@use "variables"` or `@use "variables" as vars`. To define your load paths you can edit the `package.json` variable `sassLoadPaths` (see below for example):

  ```
    "config": {
      "sassLoadPaths": "--load-path=src/scss --load-path=src/scss/abstracts"
    }
  ```

  _**Note**: `--load-path` can be passed multiple times to provide multiple load paths. Earlier load paths will take precedence over later ones._

  _**Note**: Sass modules will always be loaded relative to the current file first, though. Load paths will only be used if no relative file exists that matches the module’s URL._

#### <a name="using-js"></a>Using JavaScript

##### Global JS

The `src/js/scripts.js` file (and any imported ES Modules) will be bundled and transpiled to older JS code in the `dist/js/scripts.js` file.

##### JS in HubSpot Modules

In each HubSpot module folder you will find a `module.js` file where you'll write your modern JS. This file will be transpiled to older JS code into a `module.js` file in the `dist` folder.

_**Note**: The `module.js` file doesn't currently support ES Module bundling using this tool._

## Manually uploading files to HubSpot

You can manually upload your files via the HubSpot CLI tool (i.e. `npx hs upload --portal=<account_name> <src> <dest>`), see below for instructions.

_**Note**: If you set a top-level `defaultPortal` in your `hubspot.config.yml` file, you can exclude the `--portal` flag and your commands will reference the default portal you specified._

_**Note**: Any folder or file you do not wish be uploaded can be specified in the `.hsignore` file._

### Uploading all your production files

The following command will upload all the folders/files from **inside** the `dist` folder to a folder in HubSpot called `website`. If the destination folder doesn't already exist it will be created.

```
npx hs upload --portal=<account_name> dist website
```

### Uploading a single production file

The following command will upload the specified file to the specified destination. If the file already exists it will be overwritten.

```
npx hs upload --portal=<account_name> dist/css/styles.css website/css/styles.css
```

### Upload modes

Files are uploaded to HubSpot as **published** by default, to change this to **draft** you need to add the `--mode=draft` flag.

##### Example 1

```
npx hs upload --portal=<account_name> --mode=draft dist website
```

##### Example 2

```
npx hs upload --portal=<account_name> --mode=draft dist/css/styles.css website/css/styles.css
```

### Uploading local images to the HubSpot File Manager

You can upload your local images files to the File Manager via the HubSpot CLI tool (i.e. `npx hs filemanager upload <src> <dest>`).

The example below will upload all images from the `dist/images` folder and upload them to a folder in the File Manager called `website`.

```
npx hs filemanager upload --portal=<account_name> dist/images website
```
