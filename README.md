# Phaser 3 TypeScript/Webpack Project Template

A Phaser 3 TypeScript Template

Forked from [phaser3-typescript-template](https://github.com/wtravO/phaser3-typescript-template)

Adds file loader, tsconfigpaths, and removes files that I didn't want.
Photomstorm's original [Phaser 3 TypeScript Project Template](https://github.com/photonstorm/phaser3-typescript-project-template) works, but was really slow to recompile the scripts and source maps didn't work properly with rollup. Many thanks to [wtrav0](https://github.com/wtravO) for the original repository this was forked from, I was having many issues trying to set this up by myself.

### Requirements

We need [Node.js](https://nodejs.org) to install and run scripts.

## Install and run

Run next commands in your terminal:

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies and launch browser with examples.|
| `npm run build:dev` | Builds a unminified copy of your game, with source maps, for debugging purposes. |
| `npm run build:prod` | Builds a minified copy of your game without source maps for production use. |
| `npm start` | Launch browser of choice and navigate to [http://localhost:8080/](http://localhost:8080/). <br> Press `Ctrl + C` in NodeJS terminal to kill **webpack-dev-server** process. |
=======

