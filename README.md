# HubSpot Local Development (CSS, JavaScript and Images)

_**Disclaimer**: this is not an official HubSpot project and is in no way affiliated with HubSpot._

![version](https://img.shields.io/badge/version-0.0.3-blue)

The purpose of this project was to make life easier when working on CSS and JavaScript files when developing HubSpot websites, with a focus on a modern workflow.

For part of this process we will be using the [HubSpot Local Development Tools](https://designers.hubspot.com/docs/tools/local-development) for downloading/uploading files via the command line. This CLI tool can also be used to work with templates and modules but this isn't what I'm focusing on with this project.

Features include:

- Sass compiler - _SCSS syntax_.
- JS compiler - _using Babel_.
- Live reloading of local CSS, JS files which are swapped out for the remote files on HubSpot, no upload/download necessary, for rapid development - _using Browsersync_.
- Code minification - _on production builds only_.
- Image optimisation.
- CSS and JavaScript source maps - _on development builds only, not production. Note: CSS source maps are inline and JavaScript source maps are their own files_.
- CSS and JavaScript code linting and formatting. Note that linting is set up for use with a code editor that can display problems/errors, they won't be output to the terminal - _using ESLint, Prettier and Stylelint_.
- Deploying files to HubSpot, as draft or published, via the command line - _using Hubspot Local Development Tools_.

_Note: this project was based around the ideas of a tool created by [Ryan Absalom](https://github.com/Absanater). Feel free to check out [Ryan's HubSpot local development tool](https://github.com/Absanater/hubspot-frontend-local) which may fit your needs better._

## Prerequisites

- [Node.js](https://nodejs.org) must be installed - _please note only Node `v10.0.0` has been tested_.

## Setting up HubSpot Local Development Tools

_Note: you can refer to the [Hubspot Local Development Tools documentation](https://designers.hubspot.com/docs/tools/local-development) for more information_.

### Installing the HubSpot CLI tool

As part of the project's `package.json` the `@hubspot/cms/cli` npm package will be installed into the project's developer dependencies, so you don't need to install this yourself.

### Set up your configuration file

The `hubspot.config.yml` configuration file stores your HubSpot API key and Hub ID and is needed to authenticate your HubSpot account access. This is automatically created for you (see below):

1. In your current working directory run `npx hs init` and follow the on screen prompts to create the `hubspot.config.yml` config file. You can choose API key or OAuth for authentication, HubSpot recommend OAuth as it is more secure but for a simpler setup we will use an API key.
1. You will be asked to enter a name for your Hub - _this name is a **local-only** nickname for the HubSpot account to make it easy to reference when using the tools_.
1. Next you will be asked for a Hub ID, this is the account you wish to modify files in - _this can be found by logging into your HubSpot dashboard and clicking on your account menu in the top-right corner_.
1. Enter your API key - _you can log in to HubSpot and [get your API key here](https://app.hubspot.com/l/api-key)_.

_Note: that the `hubspot.config.yml` file has been added to the `.gitignore` file so that it won't be added to your git repo to help keep your API key safe_.

## Project setup

1. In your current working directory run `npm install` to install all the required npm packages.
1. Fill in the needed details in the `config.js` file.

   `previewUrl` - copy the **preview URL** from your browser address bar when you are previewing the **web page** you want to work on. Using the template preview URL or live website URL will not work.

   `filesToWatch` - takes an `array` of directories you want to _watch for changes_ for live reloading.

   `serveStatic` - takes an `array` of local paths you can serve your static files from.

   `rewriteRules` - takes an `array` of `objects` for swapping out HubSpot remote files for your local files. The local files you're using need to have their paths in the `serveStatic` array, then they can simply be referenced by their filename (i.e. `"replace": "style.css"` will be hosted from `https://localhost:3000/style.css`), see example below..

   See `config-sample.js` for an example or see below:

```js
const config = {
  previewUrl:
    'http://hubspot-developers-14se7vi-6398652.hs-sites.com/?hs_preview=JdkZYGUZ-24554045089',
  filesToWatch: ['dist/**'],
  serveStatic: ['dist', 'dist/css', 'dist/js', 'dist/images'],
  rewriteRules: [
    {
      match: /(https:\/\/|\/\/)(.*).hubspot(.*)style.min.css/g,
      replace: 'style.css',
    },
    {
      match: /(https:\/\/|\/\/)(.*).hubspot(.*)scripts.min.js/g,
      replace: 'scripts.js',
    },
    {
      match: /(https:\/\/|\/\/)(.*).hubspot(.*)image.png/g,
      replace: 'image.png',
    },
  ],
};

module.exports = config;
```

## Typical workflow

Now that you have installed the required npm packages and configured the `config.js` file you are ready to start local development!

1. Firstly, set up your SCSS, JS and images for your project in the `src` folder.
1. In your current working directory run `npm run build:dev` and this will:
   - Create a `dist` folder for the files you'll upload to HubSpot.
   - Compile your SCSS and JS with inline sourcemaps.
   - Optimise your images.
1. Now, in future, you can run `npm start` before you start working and this will:
   - Open your specified HubSpot preview page in your browser with any local file overrides you have configured.
   - Watch your files for changes and automatically refresh the browser (live reloading).

### Uploading files to HubSpot

Once you are ready to upload your files to HubSpot you need to get them ready for production. The following command will minify your files, remove source maps and optimise your images.

```
npm run build
```

You can then upload your files via the HubSpot CLI tool (i.e. `npx hs upload <src> <dest>`), see below for instructions.

_**Important**: the `images` folder will not be uploaded because it has been added to the `.hsignore` file. Any folder or file you do not wish be uploaded should be specified in the `.hsignore` file. However, if you wish to upload images to the Design Manager, for images you don't want to be available in HubSpot Files you can take `images` out of the `.hsignore` file. You can then reference to these files in your HUBL templates with `{{ get_asset_url('/images/image.png') }}`._

#### Uploading all your production files

The following command will upload all the folders/files from **inside** the `dist` folder to a folder in HubSpot called `website`. If the destination folder doesn't already exist it will be created.

```
npx hs upload dist website
```

#### Uploading a single production file

The following command will upload the specified file to the specified destination. If the file already exists it will be overwritten.

```
npx hs upload dist/css/style.css website/css/style.css
```

#### Upload modes

Files are uploaded to HubSpot as **published** by default, to change this to **draft** you need to add the `--mode=draft` flag.

Example 1:

```
npx hs upload --mode=draft dist website
```

Example 2:

```
npx hs upload --mode=draft dist/css/style.css website/css/style.css
```

### Uploading local images to the HubSpot File Manager

You can upload your local images files to the File Manager via the HubSpot CLI tool (i.e. `npx hs filemanager upload <src> <dest>`).

The example below will upload all images from `dist/images` and upload them to a folder in the File Manager called `website`.

```
npx hs filemanager upload dist/images website
```

## Things to keep in mind

- The `src` folder is for all your source files and **must include** the `images`, `scss` and `js` folders, otherwise the build tools will fail.

## Changelog

### [0.0.3] - 2020-02-12

#### Added

- JavaScript module bundling.

### [0.0.2] - 2020-01-29

#### Fixed

- CSS source maps now working properly in browser dev tools.

#### Changed

- You can now run `npm run build:dev` initially at the start of the project, then in future you can run `npm start` to watch your files and automatically open the browser with live reloading. This means you don't have to wait for the whole build process so you can quickly get back to work.
- You no longer need to enter the whole HubSpot file URL for the files you wish to swap out for your local ones. I'm now using a regex for the rewrites so as long as your main CSS file is called `style.css` and your main JS file is called `scripts.js` you don't need to worry about it. This also means you can upload files to HubSpot and you don't need to worry about when HubSpot changes the file paths (they do this for caching reasons).

### [0.0.1] - 2020-01-23

- Initial release.
