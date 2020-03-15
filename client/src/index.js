/**
 * index.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import "./styles/scss/styles.scss";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./bundles/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

ReactDOM.render(<App/>, document.getElementById('app'));


