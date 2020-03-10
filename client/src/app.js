/**
 * app.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Page from "./components/Page";
import "./styles/scss/styles.scss";


const App = () => (
    <Page/>
);

ReactDOM.render(<App/>, document.getElementById('app'));


