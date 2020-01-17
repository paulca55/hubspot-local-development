# HubSpot Local Development (CSS and JavaScript)

The purpose of this project was to make life easier when working on CSS and JavaScript files when developing HubSpot websites, with a focus on a modern workflow.

For part of this process we will be using the [HubSpot Local Development Tools](https://designers.hubspot.com/docs/tools/local-development) (currently in beta) for downloading/uploading files via the command line. This CLI tool can also be used to work with templates and modules but this isn't what I'm focussing on with this project.

Features include:

- Sass compiler - _SCSS syntax_.
- JS compiler - _using Babel_.
- CSS and JavaScript code linting and formatting. Note that linting is set up for use with a code editor that can display problems/errors, they won't be output to the terminal - _using ESLint, Prettier and Stylelint_.
- Live reloading of local CSS, JS files which are swapped out for the remote files on HubSpot, no upload/download necessary, for rapid development - _using Browsersync_.
- Deploying files (as draft or published) to HubSpot via the command line - _using Hubspot Local Development Tools_.

## Prerequisites

- [Node.js](https://nodejs.org) must be installed - _please note only Node `v10.0.0` has been tested_.

## Setting up HubSpot Local Development Tools

_Note: you can refer to the [Hubspot Local Development Tools documentation](https://designers.hubspot.com/docs/tools/local-development) for more information_.

### Installing the HubSpot CLI tool

As part of the project's `package.json` the `@hubspot/cms/cli` npm package will be installed into the projects developer dependencies, so you don't need to install this yourself.

### Set up your configuration file

The `hubspot.config.yml` configuration file stores your HubSpot API key and Hub ID and is needed to authenticate your HubSpot account access. This is automatically created for you (see below):

1. In your current working directory run `npx hs init` and follow the on screen prompts to create the `hubspot.config.yml` config file. You can choose API key or OAuth for authentication, HubSpot recommend OAuth as it is more secure but for simplicity we will use API key.
2. You will be asked to enter a name for your Hub - _this name is a **local-only** nickname for the HubSpot account to make it easy to reference when using the tools_.
3. Next you will be asked for a Hub ID, this is the account you wish to modify files in - _this can be found by logging into your HubSpot dashboard and clicking on your account menu in the top-right corner_.
4. Enter your API key - _you can log in to HubSpot and [get your API key here](https://app.hubspot.com/l/api-key)_.

_Note: that the `hubspot.config.yml` file has been added to the `.gitignore` file so that it won't be added to your git repo to help keep your API key safe_.

## Project setup

1. In your current working directory run `npm install` to install all the required npm packages.
2. Fill in the needed details in the `config.json` file.

   `previewUrl` - copy the URL from your browser address bar when you are previewing the web page you want to work on.

   `filesToWatch` - takes an `array` of directories you want to _watch for changes_ for live reloading.

   `serveStatic` - takes an `array` of local paths to serve static files on http://localhost:3000. If a request matches a file in one of these paths then Browsersync will serve it, otherwise it will forward the request on to the proxied live site. This is allows us to mix local assets with remote assets.

   `rewriteRules` - takes an `array` of `objects` for swapping out HubSpot remote files for your local files. Please note remote file paths need to be **exactly** as they are seen in the HTML source code.

   See `config-sample.json` for an example or see below:

```json
{
  "previewUrl": "https://hubspot-developers-14xe7vi-6718602.hs-sites.com/-temporary-slug-578864d2-02f5-4ez1-8755-95647na959de?hs_preview=FMSqDSoy-24451246628",
  "filesToWatch": ["dist/**"],
  "serveStatic": ["dist", "dist/css", "dist/js", "dist/images"],
  "rewriteRules": [
    {
      "match": "//cdn2.hubspot.net/hub/6798683/hub_generated/template_assets/4416301597/1679265117029/website-folder/style.min.css",
      "replace": "style.css"
    },
    {
      "match": "//cdn2.hubspot.net/hub/6798683/hub_generated/template_assets/44452588076/1572188307698/website-folder/scripts.min.js",
      "replace": "scripts.js"
    }
  ]
}
```
