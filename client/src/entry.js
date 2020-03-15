/**
 * entry.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require ('./App.js')

module.exports = function render(locals, callback) {
    const html = ReactDOMServer.renderToString(React.createFactory(App))
    callback(null, `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="Description" content="My Portfolio">
    <meta name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=yes" />
    
    <title>Keisuke Suzuki</title>
    <base href="/">
    <link rel="icon" type="image/png" href="./images/favicon.ico" />
    <link rel="stylesheet" href="./app.css" />
    <!-- ios meta tags -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="Ksuzuki" />
</head>

<body>
<div id="app"></div></body>
</html>`)
};