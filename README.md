# HubSpot Local Development (CSS and JavaScript)

The purpose of this project was to make life easier when working on CSS and JavaScript files when developing HubSpot websites, with a focus on a modern workflow.

For part of this process we will be using the [HubSpot Local Development Tools](https://designers.hubspot.com/docs/tools/local-development) (currently in beta) for downloading/uploading files via the command line. This CLI tool can also be used to work with templates and modules but this isn't what I'm focusing on with this project.

Features include:

- Sass compiler - _SCSS syntax_.
- JS compiler - _using Babel_.
- Live reloading of local CSS, JS files which are swapped out for the remote files on HubSpot, no upload/download necessary, for rapid development - _using Browsersync_.
- Code minification on production build.
- CSS and JS source maps.
- CSS and JavaScript code linting and formatting. Note that linting is set up for use with a code editor that can display problems/errors, they won't be output to the terminal - _using ESLint, Prettier and Stylelint_.
- Deploying files (as draft or published) to HubSpot via the command line - _using Hubspot Local Development Tools_.

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
1. Fill in the needed details in the `config.json` file.

   `previewUrl` - copy the **preview URL** from your browser address bar when you are previewing the web page you want to work on. Using the live website URL will not work.

   `filesToWatch` - takes an `array` of directories you want to _watch for changes_ for live reloading.

   `serveStatic` - takes an `array` of local paths you can serve your static files from.

   `rewriteRules` - takes an `array` of `objects` for swapping out HubSpot remote files for your local files. The local files you're using need to have their paths in the `serveStatic` array, then they can simply be referenced by their filename (i.e. `"replace": "style.css"` will be hosted from `https://localhost:3000/style.css`), see example below. **Important**: remote file paths need to be **exactly** as they are seen in the rendered HTML source code (i.e. 'view source' in the browser).

   See `config-sample.json` for an example or see below:

```json
{
  "previewUrl": "http://hubspot-developers-14se7vi-6398652.hs-sites.com/?hs_preview=JdkZYGUZ-24554045089",
  "filesToWatch": ["dist/**"],
  "serveStatic": ["dist", "dist/css", "dist/js", "dist/images"],
  "rewriteRules": [
    {
      "match": "//cdn2.hubspot.net/hub/4793682/hub_generated/template_assets/24436301497/1579162117021/website-folder/style.min.css",
      "replace": "style.css"
    },
    {
      "match": "//cdn2.hubspot.net/hub/4793682/hub_generated/template_assets/84412586096/1579194026666/website-folder/scripts.min.js",
      "replace": "scripts.js"
    },
    {
      "match": "https://cdn2.hubspot.net/hub/4793682/hubfs/image-01.jpg?width=600&amp;height=600&amp;name=image-01.jpg",
      "replace": "image.jpg"
    }
  ]
}
```
