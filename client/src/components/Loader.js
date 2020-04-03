/**
 * Loader.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import loader from "../../assets/images/loader.svg";


const Loader = () => (
    <div className="loader">
        <img src={ loader } alt="loading..."/>
    </div>
);

export default Loader;