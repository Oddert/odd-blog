# Oddert Odd Blog

A lightweight content managment system designed as a plug-and-play blog / portfolio site.

> Work in progress. Development halted when auther remembered CMS's have already been invented, and the portfolio site rebuild could no longer wait on this. Will return to it in the near future.

## Live Demo
[https://oddert-odd-blog.glitch.me/](https://oddert-odd-blog.glitch.me/)

## Installation
You will need to setup a mongodb server and connect it via an .env file
```
$ git clone https://github.com/Oddert/odd-blog.git
$ cd odd-blog
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm start
```

## Scripts
| script | command | action
|--------|---------|----------|
| start | node app.js | runs the server |
| server | nodemon app.js | runs the server with auto restart |
| sass | sass --watch public/scss:public/css | runs the sass compiler and watches for changes |
| dev | concurrently "npm run server" "npm run sass" | runs commands 'server' and 'sass'