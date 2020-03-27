/**
 * index.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"
import "./scss/styles.scss";


if('serviceWorker' in navigator)
{
    window.addEventListener('load', () =>
    {
        navigator.serviceWorker.register('./sw.js').then(registration =>
        {
            console.log('SW registered: ', registration);
        }).catch(registrationError =>
        {
            console.log('SW registration failed: ', registrationError);
        });
    });
}


ReactDOM.render(
    <Router basename="/">
        <App/>
    </Router>,
    document.getElementById('app')
);


