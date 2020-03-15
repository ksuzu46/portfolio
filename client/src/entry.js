/**
 * entry.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import { render } from 'react-dom';
import reactDOMServer from 'react-dom/server';
import App from "./App";


if(typeof document !== 'undefined')
{
    render(<App/>, document.getElementById('app')
    );
}

export default (locals) =>
{
    const assets = Object.keys(locals.webpackStats.compilation.assets);
    const css = assets.filter(value => value.match(/\.css$/));
    const js = assets.filter(value => value.match(/\.js$/));
    
    return locals.template({
        html: reactDOMServer.renderToStaticMarkup(React.createFactory(<App/>)),
        css,
        js,
        ...locals
    });
};