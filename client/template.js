module.exports = function renderPage(props) {
  return (
    '<!doctype html lang="en" public="storage">'
    + '<head>'
    + '<meta charSet = "UTF-8" />'
    + '<meta name = "Description" content = "My Portfolio">'
    + '<meta name = "viewport" content = "width=device-width,'
    + 'initial-scale=1, shrink-to-fit=yes" />'
    + '<title> Keisuke Suzuki </title>'
    + '<base href="/">'
    + '<link rel="icon" type="image/png" href="./images/favicon.ico"/>'
    + '<link rel="stylesheet" href="' + props.css + '"/>'
    + '<!-- ios meta tags -->'
    + '<meta name="apple-mobile-web-app-capable" content="yes"/>'
    + '<meta name="apple-mobile-web-app-status-bar-style" content="black"/>'
    + '<meta name="apple-mobile-web-app-title" content="Ksuzuki"/>'
    + '</head>'
    + '<body>'
    + '<div id="app">' + props.html + '</div>'
    + '<script src="/' + props.js + '"></script>'
    + '</body>'
    + '</html>'
);
}
