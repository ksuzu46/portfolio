/**
 * index.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"
import "./scss/styles.scss";


if(process.env.NODE_ENV === 'production')
{
    const OfflinePluginRuntime = require('offline-plugin/runtime');
    OfflinePluginRuntime.install();
}

ReactDOM.render(
    <Router>
        <App/>
    </Router>,
    document.getElementById('app')
);


