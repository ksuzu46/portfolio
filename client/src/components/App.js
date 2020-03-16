/**
 * App.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import Page from "./Page";
import "../scss/styles.scss";


export const App = (props) =>
{
    return (
        <div className="page">
            <Page/>
        </div>
    )
};

export default App;


