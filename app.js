const express = require("express");;
const path = require("path");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


const app = express();
const PORT = 3001;


const compiler = webpack(webpackConfig);
app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
app.use(webpackHotMiddleware(compiler));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "dist")));
app.use("/images", express.static(path.join(__dirname, "public", "images")))
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
})
app.get("/about", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'about.html'));
})

app.listen(PORT, () => {
    console.log(`Server listening on port number ${PORT}`)
})
