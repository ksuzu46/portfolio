/**
 * Loader.js
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import React from 'react';
import loader from "../../public/images/loader-334px.gif";
import Media from "react-bootstrap/Media";

const Loader = () => (
    <div className="loader">
        <img src={ loader } alt="loading..." />
    </div>
);

export default Loader;