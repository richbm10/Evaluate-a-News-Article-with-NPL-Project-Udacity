# Evaluate-a-News-Article-with-NPL-Project
Udacity Evaluate a News Article with NPL Project

Project Description:
The project consists in developing a web application that allows users to run Natural Language Processing (NLP) on articles or blogs found on other websites. Using the Sentiment Analysis api from Aylien (https://docs.aylien.com/textapi/endpoints/#sentiment-analysis), it will give back pertinent information about the article, like whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

Node and express will be the webserver and routing, and webpack will be the build tool of choice. Using webpack, the app will be set up to have dev and prod environments, each with their own set of tools and commands with package.json scripts.

The author of each icon and photo can be accessed by the footer references of the page.
Icons taken from www.flaticon.com.
Photos taken from www.pexels.com.

Objective:
Implement the application using the acquired knowledge of Webpack configuration, for developing in a development and production environments. Also, use different loaders and plugins to enhance productivity and the advantages of Webpack.

Installation:
- npm install: for installing all devDependencies and dependencies of the package.json
- npm install --production: for installing only the dependencies of the package.json

Package scripts:
- start-testing-server: for starting the testing server before running the jest testing
- test: for running the jest tests
- start-server: for starting the application server
- build-dev-app: for building the application using the webpack.dev.js config file
- build-prod-app: for building the application using the webpack.prod.js config file
- build-dev-server-app: for starting the hot reload webpack dev server using the webpack.dev.js config file

Package devDependencies:
- @babel/core
- @babel/preset-env
- babel-loader
- babel-plugin-syntax-async-functions
- babel-plugin-transform-regenerator
- clean-webpack-plugin
- css-loader
- file-loader
- html-webpack-plugin
- jest
- mini-css-extract-plugin
- node-sass
- optimize-css-assets-webpack-plugin
- sass-loader
- style-loader
- terser-webpack-plugin
- url-loader
- webpack
- webpack-cli
- webpack-dev-server
- workbox-webpack-plugin

Package Dependencies:
- aylien_textapi
- babel-polyfill
- body-parser
- cors
- dotenv
- express
- node-fetch