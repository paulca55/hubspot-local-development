# Changelog

## [0.1.0] - 2021-07-16

### Changed

- There was a rewrite of the way the project works in order to align better with HubSpot's CLI and their own best practices (currently in Beta).
- All dev work is carried out in the `src` folder and transpiled/minified/optimised to the `dist` folder.
- The `node-sass` npm package was replaced with the `sass` package.

### Added

- You can now use Sass (SCSS syntax) inside of HubSpot Modules.
- JavaScript used in HubSpot Modules will now be transpiled via Babel. However, this project doesn't currently support ES Module bundling for HubSpot Modules.
- It is now possible to specify a config option of `portalFolder` in the `package.json` file to name the HubSpot portal destination folder. `portalFolder` is set to `website` by default.

## [0.0.3] - 2020-02-12

### Added

- JavaScript module bundling.

## [0.0.2] - 2020-01-29

### Fixed

- CSS source maps now working properly in browser dev tools.

### Changed

- You can now run `npm run build` initially at the start of the project, then in future you can run `npm start` to watch your files and automatically open the browser with live reloading. This means you don't have to wait for the whole build process so you can quickly get back to work.
- You no longer need to enter the whole HubSpot file URL for the files you wish to swap out for your local ones. I'm now using a regex for the rewrites so as long as your main CSS file is called `styles.css` and your main JS file is called `scripts.js` you don't need to worry about it. This also means you can upload files to HubSpot and you don't need to worry about when HubSpot changes the file paths (they do this for caching reasons).

## [0.0.1] - 2020-01-23

- Initial release.
